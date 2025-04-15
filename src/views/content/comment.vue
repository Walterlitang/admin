<template>
  <div class="edit-container">
    <el-table :data="listData.records" size="mini"
              :header-cell-style=" {fontWeight:'bold',background:'#f8f8f9',color: '#515a6e',height:'40px'}" border>
      <el-table-column align="center" label="ID" prop="id" width="60"></el-table-column>
      <el-table-column align="center" label="默认头像" prop="profilePicture">
        <template slot-scope="scope">
          <el-image
              referrerpolicy="no-referrer"
              style="width: 66px!important; height: 66px!important;"
              :src="baseURL+scope.row.profilePicture"
              fit="cover"
              :preview-src-list="[baseURL + scope.row.profilePicture]"
          />
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户名" prop="userName" width="200"/>
      <el-table-column align="center" label="内容" prop="content" min-width="220"/>
      <el-table-column align="center" label="状态" prop="status">
        <template slot-scope="scope">
          <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              style="width:40px;"
              @change="handleStatusChange($event,scope.row.id)"
          ></el-switch>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="180" fixed="right">
        <template slot-scope="scope">
          <el-button icon="el-icon-delete" size="mini" type="danger" @click="handlerDelete(scope.row.id)"
                     v-has-permi="['admin:content:comment:delete']">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {byArticleId,deleteComment,updateCommentStatus} from "@/api/classification";

export default {
  props: {
    id: {
      type: Number,
      required: true
    },
  },
  data() {
    return {
      listData: {
        records: [], total: 0
      },
      statusMap: {
        0: '隐藏',
        1: '正常',
      },
      pram: {
        articleId: null,
        page: 1,
        size: 10,
        content: '',
      },
      rules: {
        comment: [{required: true, message: '请填写内容', trigger: ['blur']}],
      },
      roles: [],
      saveLoading: false,
      formLoading: false,
      baseURL: '',
    }
  },
  mounted() {
    this.baseURL = process.env.VUE_APP_IMAGE_URL
    this.getList();
  },
  methods: {
    getList() {
      this.saveLoading = true;
      this.pram.articleId = this.id
      byArticleId(this.pram).then((res) => {
        this.listData = res
        }).finally(() => {
          this.saveLoading = false
        })
    },
    handlerDelete(id) {
      this.$confirm('确认删除该数据吗？').then(() => {
        const loading = this.$loading({text: '删除中', background: 'rgba(255,255,255,.5)'})
        deleteComment({id:id}).then(() => {
          this.$message.success('删除成功')
          this.getList()
        }).finally(() => {
          loading.close()
        })
      })
    },
    handleStatusChange(status,id){
      const loading=this.$loading({text:'更新中',background:'rgba(255,255,255,.5)'})
      updateCommentStatus({id:id,status:status}).then(()=>{
        this.$message.success('更新状态成功')
        this.getList()
      }).finally(()=>{
        loading.close()
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
