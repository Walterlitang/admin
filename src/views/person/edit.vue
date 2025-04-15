<template>
  <div class="edit-container">
    <el-form v-loading="loading" ref="pram" :model="pram" :rules="rules" label-width="120px" @submit.native.prevent>
      <el-row>
        <el-form-item label="头像：" prop="profilePicture">
          <el-upload
              class="avatar-uploader"
              action
              :show-file-list="false"
              :http-request="handleUploadForm"
              :headers="myHeaders"
              :before-upload="beforeIconUpload">
            <img v-if="pram.profilePicture" :src="baseURL + pram.profilePicture" class="icon" alt=""
                 style="width: 150px;height: 200px">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="pram.name" placeholder="请输入姓名" style="width: 300px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="咨询师分类：" prop="type">
            <el-select v-model="pram.type" style="width: 300px" placeholder="请选择">
              <el-option
                  v-for="item in personList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="简介：" prop="introduction">
        <el-input v-model="pram.introduction" type="textarea" :rows="4" maxlength="300"
                  placeholder="请输入简介"></el-input>
      </el-form-item>
      <el-form-item label="详细资料：" prop="details">
        <Tinymce v-model="pram.details"></Tinymce>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="排序" prop="sort">
            <el-input-number :step="1" :min="1" :max="99" v-model="pram.sort"
                             style="margin-right: 10px"></el-input-number>
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

  </div>
</template>

<script>
import {getToken} from "@/utils/auth";
import {upload} from "@/api/upload";
import {saveRow} from "@/api/person";
import Tinymce from "@/components/Tinymce/index.vue";

export default {
  components: {Tinymce},
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
    personList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      titleStatus: false,
      pram: {
        id: null,
        sort: null,
        name: '',
        profilePicture: '',
        introduction: '',
        details: '',
        type: ''
      },
      rules: {
        profilePicture: [{required: true, message: '请上传头像', trigger: ['blur', 'change']}],
        name: [{required: true, message: '请填写姓名', trigger: ['blur', 'change']}],
        type: [{required: true, message: '请选择分类', trigger: ['blur', 'change']}],
        introduction: [{required: true, message: '请填写简介', trigger: ['blur', 'change']}],
        details: [{required: true, message: '请填写详细资料', trigger: ['blur', 'change']}],
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
      this.pram = this.editData;
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
      const isIMAGE = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'].includes(file.type);
      const isLt2M = file.size / 1024 / 1024 < 10;

      if (!isIMAGE) {
        this.$message.error('上传图标只能是 JPG、PNG、JPEG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图标大小不能超过 10MB!');
      }
      return isIMAGE && isLt2M;
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
        this.pram.profilePicture = res;
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
  width: 150px;
  height: 200px;
  line-height: 200px;
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
  width: 150px;
  height: 200px;
  display: block;
}

.image {
  width: 275px;
  height: 530px;
  display: block;
}

.btn-box {
  margin-top: 20px;
  float: right;
}
</style>
