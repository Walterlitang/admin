<template>
  <div class="edit-container">
    <el-form v-loading="saveLoading" ref="form" :model="form" :rules="rules" label-width="100px" @submit.native.prevent>
      <el-form-item label="回复内容：" prop="replyContent">
        <el-input type="textarea" v-model="form.replyContent" placeholder="回复内容" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button v-loading="saveLoading" element-loading-background="rgba(0, 0, 0, 0.3)" type="primary"
                   @click="handlerSubmit" v-has-permi="['admin:email:chief:reply']">保存
        </el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {updateStatus} from "@/api/mailbox";

export default {
  props: {
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
  },
  data() {
    return {
      form: {
        id: null,
        replyContent: '',
      },
      rules: {
        replyContent: [{required: true, message: '请填写回复内容', trigger: ['blur']}],
      },
      saveLoading: false,
      formLoading: false,
    }
  },
  mounted() {
    if (this.isCreate === 1) {
      this.getDetail();
    }
  },
  methods: {
    getDetail() {
      this.form = this.editData
    },
    handlerSubmit() {
      if (this.saveLoading) {
        return;
      }
      this.$refs.form.validate(valid => {
        if (!valid) return;
        this.saveLoading = true;
        updateStatus(this.form).then(() => {
          this.$message.success('回复成功');
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
