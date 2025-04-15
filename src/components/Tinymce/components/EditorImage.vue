<template>
  <div class="upload-container">
    <el-upload
        class="upload-demo mr10 mb15"
        action
        :http-request="handleUploadForm"
        :headers="myHeaders"
        :show-file-list="false"
        multiple
    >
      <el-button :style="{background:color,borderColor:color}" icon="el-icon-upload" size="mini" type="primary">
        upload
      </el-button>
    </el-upload>
  </div>
</template>

<script>
import {getToken} from "@/utils/auth";
import {upload} from "@/api/upload";

export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    },
    imageUrl: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: [],
      myHeaders: {'X-Token': getToken()},
    }
  },
  methods: {
    handleUploadForm(param) {
      const formData = new FormData()
      formData.append("file", param.file)
      const loading = this.$loading({
        lock: true,
        text: '上传中，请稍候...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      // 关键修改：添加 return 使方法返回 Promise
      return upload(formData).then(res => {
        this.fileList.push(this.imageUrl + res)
        this.$emit('successCBK', this.fileList)
        this.$message.success('上传成功')
      }).catch(err => {
        this.$message.error('上传失败')
        return Promise.reject(err) // 保持 Promise 链的异常传递
      }).finally(() => {
        loading.close()
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;

  ::v-deep .el-upload--picture-card {
    width: 100%;
  }
}
</style>
