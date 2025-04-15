<template>
  <div class="edit-container">
    <el-form v-loading="formLoading" ref="form" :model="form" :rules="rules" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="联系人：" prop="contactPerson">
            <el-input v-model="form.contactPerson" maxlength="10" placeholder="联系人"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话：" prop="contactPhoneNumber">
            <el-input v-model="form.contactPhoneNumber" maxlength="13" placeholder="联系电话"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="备案号：" prop="recordNumber">
            <el-input v-model="form.recordNumber" placeholder="备案号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="主办单位：" prop="theOrganizer">
            <el-input v-model="form.theOrganizer" placeholder="主办单位"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="部队编号：" prop="unitNumber">
        <el-input v-model="form.unitNumber" placeholder="部队编号"></el-input>
      </el-form-item>
      <el-form-item label="首长信箱说明：" prop="chiefMailboxInstructions">
        <el-input type="textarea" v-model="form.chiefMailboxInstructions" maxlength="1000"
                  placeholder="首长信箱说明"></el-input>
      </el-form-item>
      <el-form-item label="纪委信箱说明：" prop="disciplineMailboxInstructions">
        <el-input type="textarea" v-model="form.disciplineMailboxInstructions" maxlength="1000"
                  placeholder="纪委信箱说明"></el-input>
      </el-form-item>
      <el-form-item label="背景颜色：" prop="background">
        <div class="color-picker-wrapper">
          <el-color-picker
              v-model="form.background"
              show-alpha
              :predefine="predefineColors"
              @change="handleColorChange"
          />
          <span class="color-preview" :style="{background: form.background}"></span>
          <el-input
              v-model="form.background"
              placeholder="请输入颜色值或选择颜色,初始颜色为：#d7e8e2"
              style="width: 400px; margin-left: 10px;"
          />
          <div style="margin-left: 20px;color: green">初始颜色为：#d7e8e2</div>
        </div>
      </el-form-item>
      <el-form-item label="logo：" prop="logo">
        <el-upload
            class="avatar-uploader"
            action
            :show-file-list="false"
            :http-request="handleUploadForm"
            :headers="myHeaders"
            :before-upload="beforeIconUpload">
          <img v-if="form.logo" :src="baseURL + form.logo" class="logo" alt="">
          <i v-else class="el-icon-plus logo-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="背景图片：" prop="backgroundImage">
        <el-upload
            class="avatar-uploader"
            action
            :show-file-list="false"
            :http-request="backgroundImageForm"
            :headers="myHeaders"
            :before-upload="beforeIconUpload">
          <img v-if="form.backgroundImage" :src="baseURL + form.backgroundImage" class="backgroundImage" alt="">
          <i v-else class="el-icon-plus backgroundImage-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button v-loading="saveLoading" element-loading-background="rgba(0, 0, 0, 0.3)" type="primary"
                   @click="handlerSubmit" v-has-permi="['admin:website:save']">保存
        </el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {detail, save} from "@/api/website";
import {getToken} from "@/utils/auth";
import {upload} from "@/api/upload";

export default {
  props: {
    id: {
      default: null
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
      form: {
        id: null,
        contactPerson: '',
        contactPhoneNumber: '',
        chiefMailboxInstructions: '',
        disciplineMailboxInstructions: '',
        recordNumber: '',
        theOrganizer: '',
        unitNumber: '',
        logo: '',
        backgroundImage: '',
        background: '#d7e8e2' // 新增颜色字段
      },
      rules: {
        contactPerson: [{required: true, message: '请填联系人', trigger: ['blur']}],
        contactPhoneNumber: [{required: true, message: '请填联系人电话', trigger: ['blur']}],
        chiefMailboxInstructions: [{required: true, message: '请填首长信箱说明', trigger: ['blur']}],
        disciplineMailboxInstructions: [{required: true, message: '请填纪委信箱说明', trigger: ['blur']}],
        recordNumber: [{required: true, message: '请填备案号', trigger: ['blur']}],
        theOrganizer: [{required: true, message: '请填主办单位', trigger: ['blur']}],
        unitNumber: [{required: true, message: '请填部队编号', trigger: ['blur']}],
        logo: [{required: true, message: '请上传logo', trigger: ['blur']}],
        backgroundImage: [{required: true, message: '请上传背景图片', trigger: ['blur']}],
        background: [{required: true, message: '请选择背景颜色', trigger: 'change'}]
      },
      myHeaders: {"X-Token": getToken()},
      saveLoading: false,
      formLoading: false,
      predefineColors: [
        '#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1',
        '#1e90ff', '#c71585', '#FFFFFF', '#000000'
      ]
    }
  },
  mounted() {
    if (this.id) {
      this.getDetail();
    }
  },
  methods: {
    handleColorChange(color) {
      // 将颜色对象转换为HEXA字符串
      this.form.backgroundColor = color.hex || ''
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
        this.form.logo = res;
        loading.close();
        this.$message.success("上传成功");
      } catch (error) {
        loading.close();
      }
    },
    async backgroundImageForm(param) {
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
        this.form.backgroundImage = res;
        loading.close();
        this.$message.success("上传成功");
      } catch (error) {
        loading.close();
      }
    },
    getDetail() {
      this.formLoading = true
      detail(this.id).then(res => {
        this.form = res
      }).finally(() => {
        this.formLoading = false;
      })
    },

    handlerSubmit() {
      if (this.saveLoading || this.formLoading) {
        return;
      }

      this.$refs.form.validate(valid => {
        if (valid) {
          const loading = this.$loading({
            text: '提交中'
          })

          let formData = JSON.parse(JSON.stringify(this.form));
          this.saveLoading = true;

          save(formData).then(() => {
            this.$message.success('保存成功');
            this.close();
          }).finally(() => {
            loading.close();
          });
        } else {
          return false
        }

      });
    },
    close() {
      this.$emit('hideEditDialog')
    }
  }
}
</script>
<style lang="scss" scoped>
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

.logo-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.logo {
  width: 600px;
  height: 100px;
  display: block;
}

.backgroundImage-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.backgroundImage {
  width: 600px;
  height: 300px;
  display: block;
}

.color-picker-wrapper {
  display: flex;
  align-items: center;

  .color-preview {
    width: 30px;
    height: 30px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    margin-left: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  ::v-deep .vc-chrome {
    width: 100% !important;
    box-shadow: none;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
  }
}

</style>
