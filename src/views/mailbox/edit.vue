<template>
  <div class="edit-container">
    <el-form v-loading="saveLoading" ref="form" :model="form" :rules="rules" label-width="100px" @submit.native.prevent  v-if="type==1">
      <el-form-item label="信件标题：" prop="title">
        <el-input v-model="form.title" placeholder="标题" maxlength="30" style="width: 300px;"></el-input>
      </el-form-item>
      <el-form-item label="首长：" prop="userId">
        <el-select v-model="form.userId" clearable placeholder="请选择首长" style="width: 300px;">
          <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.surname+item.position"
              :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="信件内容：" prop="content">
        <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="form.content">
        </el-input>
      </el-form-item>
      <el-form-item label="是否公开" prop="status">
        <el-switch v-model="form.status" :active-value="1" :inactive-value="0" active-color="#025738"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button v-loading="saveLoading" element-loading-background="rgba(0, 0, 0, 0.3)" type="primary" style="background: #025738;border: none"
                   @click="handlerSubmit">保存
        </el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
    <el-form v-loading="saveLoading" ref="form" :model="form" :rules="rules1" label-width="100px" @submit.native.prevent v-else>
      <el-form-item label="信件标题：" prop="title">
        <el-input v-model="form.title" placeholder="标题" maxlength="30" style="width: 300px;"></el-input>
      </el-form-item>
      <el-form-item label="首长：" prop="userId" v-if="type==1">
        <el-select v-model="form.userId" clearable placeholder="请选择首长" style="width: 300px;">
          <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.surname+item.position"
              :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="信件内容：" prop="content">
        <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="form.content">
        </el-input>
      </el-form-item>
      <el-form-item label="是否公开" prop="status">
        <el-switch v-model="form.status" :active-value="1" :inactive-value="0" active-color="#025738"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button v-loading="saveLoading" element-loading-background="rgba(0, 0, 0, 0.3)" type="primary" style="background: #025738;border: none"
                   @click="handlerSubmit" v-has-permi="['admin:notice:save']">保存
        </el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {getToken} from "@/utils/auth";
import {getChiefListApi, saveOrUpdateApi} from "@/api/mailbox";

export default {
  props: ['type','id'],
  data() {
    return {
      form: {
        title: '',
        userId: '',
        content: '',
        status: 1,
      },
      rules: {
        title: [{required: true, message: '请填写信件标题', trigger: ['blur']}],
        userId: [{required: true, message: '请选择首长', trigger: ['blur']}],
        content: [{required: true, message: '请填写信件内容', trigger: ['blur']}],
      },
      rules1: {
        title: [{required: true, message: '请填写信件标题', trigger: ['blur']}],
        content: [{required: true, message: '请填写信件内容', trigger: ['blur']}],
      },
      saveLoading: false,
      list:[]
    }
  },
  mounted() {
    this.getChiefLis()
    this.form.userId = this.id
  },
  methods: {
    getChiefLis() {
      getChiefListApi().then((res) => {
        this.list = res.records;
      })
    },
    handlerSubmit() {
      if (this.saveLoading) {
        return;
      }
      this.$refs.form.validate(valid => {
        if (!valid) return;
        this.saveLoading = true;
        saveOrUpdateApi(this.form).then(() => {
          this.$message.success('保存成功');
          this.close();
        }).finally(() => {
          this.saveLoading = false
        })
      })
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

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
