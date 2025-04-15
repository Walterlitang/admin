<template>
  <div class="edit-container">
    <el-form v-loading="loading" ref="pram" :model="pram" :rules="rules" label-width="100px" @submit.native.prevent>
      <el-form-item label="标题：" prop="title">
        <el-input v-model="pram.title"  placeholder="请输入标题" style="width: 300px"></el-input>
      </el-form-item>
          <el-row>
            <el-form-item label="轮播图：" prop="imageUrl">
              <el-upload
                class="avatar-uploader"
                action
                :show-file-list="false"
                :http-request="handleUploadForm"
                :headers="myHeaders"
                :before-upload="beforeIconUpload">
                <img v-if="pram.imageUrl" :src="baseURL + pram.imageUrl" class="icon" alt="" style="width: 400px;height: 200px">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="排序" prop="sort">
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
      <el-form-item label="链接地址：" prop="linkAddress">
        <el-row :gutter="10">
          <el-col :span="4">
            <el-select v-model="protocol" clearable placeholder="请选择协议" style="width: 100%;">
              <el-option
                  v-for="item in protocols"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="16">
            <el-input v-model="address" placeholder="请输入链接地址" style="width: 400px;"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
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
import {saveRow} from "@/api/carouselImage";

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
      protocol: 'http://', // 默认选中的协议
      address: '', // 链接地址
      protocols: [
        { value: 'http://', label: 'http://' },
        { value: 'https://', label: 'https://' },
      ],
      loading: false,
      titleStatus: false,
      pram: {
        id:null,
        sort: null,
        code: 'carousel_image',
        name: '轮播图',
        imageUrl: '',
        title: '',
        status: 1,
        linkAddress: '',
      },
      rules: {
        imageUrl: [{required: true, message: '请上传轮播图', trigger: ['blur', 'change']}],
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
      const url = this.editData.linkAddress
      // 使用正则表达式匹配协议部分（https:// 或 http://）
      const protocolMatch = url.match(/^(https?:\/\/)/i);

      // 提取协议部分（前半部分）
      const protocol = protocolMatch ? protocolMatch[0] : null;

      // 提取剩余部分（后半部分）
      const rest = protocol ? url.slice(protocol.length) : url;
      this.address = rest
      this.protocol = protocol
    },
    handlerSave() {
      this.$refs.pram.validate(valid => {
        this.pram.linkAddress = this.protocol + this.address
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
      const isIMAGE = ['image/jpg', 'image/jpeg','image/gif', 'image/png'].includes(file.type);
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
        this.pram.imageUrl = res;
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
