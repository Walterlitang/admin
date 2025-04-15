<template>
  <div class="edit-container">
    <el-form v-loading="formLoading" ref="form" :model="editData" :rules="rules" label-width="100px">
      <el-descriptions title="投诉信息：" :column="3" border>
        <el-descriptions-item labelStyle="font-weight: bold" label="姓名">{{ editData.userName }}
        </el-descriptions-item>
        <el-descriptions-item labelStyle="font-weight: bold" label="联系方式">{{ editData.userPhone }}
        </el-descriptions-item>
        <el-descriptions-item labelStyle="font-weight: bold" label="投诉时间">{{ editData.createTime }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions :column="1" border>
        <el-descriptions-item labelStyle="font-weight: bold" label="投诉内容">{{ editData.complaintContent }}
        </el-descriptions-item>
      </el-descriptions>
      <template>
        <div class="el-descriptions">
          <div style="height: 20px;"></div>
          <div class="el-descriptions__header">
            <div class="el-descriptions__title">回复内容：</div>
            <div class="el-descriptions__extra"></div>
          </div>
        </div>
      </template>
      <el-input type="textarea" :rows="4" v-model="form.replyContent"></el-input>
      <el-form-item>
        <el-button v-loading="saveLoading" element-loading-background="rgba(0, 0, 0, 0.3)" type="primary"
                   @click="handlerSubmit" v-has-permi="['admin:complaints:reply']">保存
        </el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {reply} from "@/api/complaints";

export default {
  components: {},
  props: {
    editData: {
      type: Object,
      default: () => {
        return {rules: []}
      }
    },
  },
  data() {
    return {
      form: {
        id: null,
        replyContent: '',
      },
      rules: {},
      roles: [],
      saveLoading: false,
      formLoading: false,
    }
  },
  mounted() {
  },
  methods: {
    handlerSubmit() {
      if (this.saveLoading || this.formLoading) {
        return;
      }
      this.$message.success('保存成功');
      this.close();
      // this.$refs.form.validate(valid => {
      //   if (!valid) return;
      //   this.saveLoading = true;
      //   this.form.id = this.editData.id
      //   reply(this.form).then(() => {
      //     this.$message.success('保存成功');
      //     this.close();
      //   }).finally(() => {
      //     this.saveLoading = false
      //   })
      // })
    },
    close() {
      this.$emit('hideEditDialog')
    }
  }
}
</script>
