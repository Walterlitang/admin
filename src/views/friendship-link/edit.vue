<template>
  <div class="edit-container">
    <el-form v-loading="saveLoading" ref="form" :model="form" :rules="rules" label-width="100px" @submit.native.prevent>
      <el-form-item label="图片：" prop="icon">
        <el-upload
            class="avatar-uploader"
            action
            :show-file-list="false"
            :http-request="handleUploadForm"
            :headers="myHeaders"
            :before-upload="beforeIconUpload">
          <img v-if="form.icon" :src="baseURL + form.icon" class="icon" alt="" style="width: 200px">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="标题：" prop="title">
        <el-input v-model="form.title" placeholder="标题" maxlength="30" style="width: 300px;"></el-input>
      </el-form-item>
      <el-form-item label="所属分类：" prop="cid">
        <el-cascader v-model="form.cid" :options="classificationList" style="width: 300px;"
                     :props="{checkStrictly:true,value:'id',label:'name',children:'child',emitPath:false}" filterable
                     clearable>
        </el-cascader>
      </el-form-item>
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
            <el-input v-model="address" placeholder="请输入链接地址"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="排序：" prop="sort">
        <el-input-number :step="1" :min="0" :max="99" v-model="form.sort" style="width: 300px;"></el-input-number>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-switch v-model="form.status" :active-value="1" :inactive-value="0"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button v-loading="saveLoading" element-loading-background="rgba(0, 0, 0, 0.3)" type="primary"
                   @click="handlerSubmit" v-has-permi="['admin:friendshipLink:save']">保存
        </el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {getTree, saveOrUpdate} from "@/api/friendshipLink";
import {upload} from "@/api/upload";
import {getToken} from "@/utils/auth";

export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    isCreate: {
      type: Number,
      required: true
    },
    editData: {
      type: Object,
      default: () => {
        return {}
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
        {value: 'http://', label: 'http://'},
        {value: 'https://', label: 'https://'},
      ],
      form: {
        id: null,
        linkAddress: '',
        title: '',
        status: null,
        cid: null,
        sort: 0,
        icon: ''
      },
      classificationList: [],
      rules: {
        cid: [{required: true, message: '请选择所属分类', trigger: ['blur']}],
        // linkAddress: [{required: true, message: '请填写链接地址', trigger: ['blur']}],
      },
      roles: [],
      saveLoading: false,
      formLoading: false,
      myHeaders: {"X-Token": getToken()},
    }
  },
  mounted() {
    if (this.isCreate === 1) {
      this.getDetail();
    }
    this.getClassificationList();
  },
  methods: {
    getDetail() {
      this.form = this.editData
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
    getClassificationList() {
      this.saveLoading = true;
      getTree(this.pram).then((res) => {
        this.classificationList = res
      }).finally(() => {
        this.saveLoading = false
      })
    },
    handlerSubmit() {
      if (this.saveLoading) {
        return;
      }
      this.$refs.form.validate(valid => {
        if (this.address) {
          this.form.linkAddress = this.protocol + this.address
        }
        if (!valid) return;
        this.saveLoading = true;
        saveOrUpdate(this.form).then(() => {
          this.$message.success('保存成功');
          this.close();
        }).finally(() => {
          this.saveLoading = false
        })
      })
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
        this.form.icon = res;
        loading.close();
        this.$message.success("上传成功");
      } catch (error) {
        loading.close();
      }
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

    close() {
      this.$emit('hideEditDialog');
    },
  }
}
</script>

<style>
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

.icon {
  width: 150px;
  height: 150px;
  display: block;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}

</style>
