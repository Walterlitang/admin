<template>
  <div class="edit-container">
    <el-form v-loading="saveLoading" ref="form" :model="form" :rules="rules" label-width="120px" @submit.native.prevent>
      <el-row>
        <el-col :span="12">
          <el-form-item label="审核：" prop="status">
            <el-select v-model="form.status" clearable placeholder="请选择" style="width: 300px;">
              <el-option
                  v-for="item in typeList"
                  :key="item.id"
                  :label="item.data"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="审核领导：" prop="reviewer">
            <el-input v-model="form.reviewer" placeholder="审核领导" maxlength="30" style="width: 300px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button v-loading="saveLoading" element-loading-background="rgba(0, 0, 0, 0.3)" type="primary"
                   @click="handlerSubmit" v-has-permi="['admin:content:examine']">保存
        </el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {examine} from "@/api/classification";

export default {
  props: {
    id: {
      type: Number,
      required: true
    },
  },
  data() {
    return {
      form: {
        id: null,
        status: null,
        reviewer: '',
      },
      rules: {
        status: [{required: true, message: '请选择审核状态', trigger: ['blur']}],
      },
      saveLoading: false,
      typeList: [{id: 1, data: "审核通过"}],
      classificationList: [],
    }
  },
  mounted() {
  },
  methods: {
    handlerSubmit() {
      if (this.saveLoading) {
        return;
      }
      this.$refs.form.validate(valid => {
        if (!valid) return;
        this.saveLoading = true;
        this.form.id = this.id
        examine(this.form).then(() => {
          this.$message.success('审核成功');
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

</style>
