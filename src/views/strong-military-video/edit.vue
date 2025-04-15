<template>
  <div  class="edit-container">
    <el-form v-loading="loading" ref="pram" :model="pram" :rules="rules" label-width="100px" @submit.native.prevent>
      <el-form-item label="标题：" prop="title">
        <el-input v-model="pram.title"  placeholder="请输入标题" style="width: 300px;"></el-input>
      </el-form-item>
          <el-row>
            <el-form-item label="视频：" prop="videoUrl">
              <el-upload
                  class="avatar-uploader"
                  action=""
                  :show-file-list="false"
                  :http-request="handleUploadForm"
                  :headers="myHeaders"
                  :before-upload="beforeIconUpload">
                <video v-if="pram.videoUrl" :src="baseURL + pram.videoUrl" style="height: 300px;"
                       class="video" controls>
                </video>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-row>

          <el-row>
            <el-col :span="12">

              <el-form-item label="排序：" prop="sort">
                <el-input-number :step="1" :min="1" :max="99" v-model="pram.sort" style="margin-right: 10px"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="状态：" prop="status">
                <el-switch class="custom-active-left" v-model="pram.status" active-text="显示"
                           inactive-text="隐藏" :active-value="1" :inactive-value="0"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button type="primary" @click="handlerSave('pram')" v-has-Permi="['admin:carouselImage:save']">保存
            </el-button>
            <el-button @click="close">取消</el-button>
          </el-form-item>
    </el-form>
<!--    <div class="btn-box">-->
<!--      <el-button type="primary" @click="handlerSave('pram')" v-has-Permi="['admin:carouselImage:save']">保存-->
<!--      </el-button>-->
<!--      <el-button @click="close">取消</el-button>-->
<!--    </div>-->

  </div>
</template>

<script>
import {getToken} from "@/utils/auth";
import {upload} from "@/api/upload";
import {saveRow} from "@/api/video";

export default {
  props: {
    isCreate: {
      type: Number,
      required: true
    },
    editData: {
      type: Object,
      default: () => {
        return {rules: []}
      }
    },
    baseURL: {
      type: String,
      default: () => {
        return ''
      }
    },
  },
  data() {
    return {
      loading: false,
      titleStatus: false,
      pram: {
        id:null,
        sort: null,
        code: 'carousel_image',
        name: '轮播图',
        videoUrl: '',
        title: '',
        status: 1,
      },
      rules: {
        videoUrl: [{required: true, message: '请上传视频', trigger: ['blur', 'change']}],
        sort: [{required: true, message: '请填写排序', trigger: ['blur', 'change']}],
        title: [{required: true, message: '请填写标题', trigger: ['blur', 'change']}],
      },
      myHeaders: {"X-Token": getToken()},
    }
  },
  mounted() {
    if (this.isCreate === 1) {
      this.titleStatus = true
      this.getProjectDetail();
    }
  },
  methods: {
    close() {
      this.$emit('hideEditDialog');
    },
    getProjectDetail() {
      // 使用解构赋值简化代码
      this.pram =  this.editData;
    },
    handlerSave() {
      this.$refs.pram.validate(valid => {
        if (!valid) return;
        this.loading = true;
        saveRow(this.pram).then(() => {
          this.$message.success('保存成功');
          this.close();
        }).finally(() => {
          this.loading = false
        })
      })
    },
    beforeIconUpload(file) {
      const isVideo = file.type === 'video/mp4'; // 或其他视频格式
      const isLt2M = file.size / 1024 / 1024 < 500;

      if (!isVideo) {
        this.$message.error('上传的文件只能是视频格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传视频大小不能超过 500MB!');
      }
      return isVideo && isLt2M;
    },
    async handleUploadForm(param) {
      const formData = new FormData();
      formData.append("file", param.file);
      let loading = this.$loading({
        lock: true,
        text: "上传中，请稍候...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      try {
        const res = await upload(formData);
        this.pram.videoUrl = res;
        loading.close();
        this.$message.success("上传成功");
      } catch (error) {
        loading.close();
      }
    },
  }
}
</script>
<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 70px;
  height: 70px;
  line-height: 70px;
  text-align: center;
}

.avatar-uploader-image {
  font-size: 28px;
  color: #8c939d;
  width: 275px;
  height: 530px;
  line-height: 530px;
  text-align: center;
}

.icon {
  width: 70px;
  height: 70px;
  display: block;
}

.image {
  width: 275px;
  height: 530px;
  display: block;
}
.btn-box{
  margin-top:20px;
  float:right;
}
</style>
