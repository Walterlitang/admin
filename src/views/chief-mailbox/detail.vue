<template>
  <div class="edit-container">
    <el-form v-loading="saveLoading" ref="form" :model="form" :rules="rules" label-width="100px" @submit.native.prevent>
      <el-row>
        <el-col :span="12">
          <el-form-item label="标题：" prop="title">
            <el-input   v-model="form.title" placeholder="标题" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="时间：" prop="createTime">
            <el-input  v-model="form.createTime" placeholder="时间" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="状态：" prop="isReply">
            <el-input v-model="form.isReply" placeholder="状态" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="回复时间：" prop="replyTime">
            <el-input  v-model="form.replyTime" placeholder="回复时间" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="内容：" prop="content">
        <el-input type="textarea" v-model="form.content" placeholder="内容" ></el-input>
      </el-form-item>

      <el-form-item label="回复内容：" prop="replyContent">
        <el-input type="textarea" v-model="form.replyContent" placeholder="回复内容" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"  @click="close" class="float-right">关闭</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

import {getInfo} from "@/api/mailbox";

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
        title:'',
        replyContent:'',
        content:'',
        replyTime:'',
        createTime:'',
        isReply:null
      },
      rules: {
      },
      saveLoading: false,
      formLoading: false,
    }
  },
  mounted() {
    if (this.id) {
      this.getDetail();
    }
  },
  methods: {
    getDetail() {
      this.saveLoading = true;
      getInfo({id:this.id}).then((res) => {
          this.form = res
      }).finally(() => {
        this.saveLoading = false
      })
    },
    close() {
      this.$emit('hideDetailDialog');
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

/* 如果需要更细粒度的控制，可以单独设置按钮的样式 */
.float-right {
  margin-left: auto; /* 将按钮推到最右侧 */
}
</style>
