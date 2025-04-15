<template>
  <div class="divBox">
    <el-card class="box-card">
      <el-form inline size="small" @submit.native.prevent>
        <el-form-item label="标题：">
          <el-input v-model="listPram.title" placeholder="标题" clearable class="selWidth"/>
        </el-form-item>
        <el-form-item>
          <el-form-item label="分类：">
            <el-cascader v-model="listPram.categoryId" :options="options" style="width: 300px;"
                         :props="{value:'id',label:'name',children:'child'}" filterable clearable>
            </el-cascader>
          </el-form-item>
          <el-button icon="el-icon-search" size="mini" type="primary" @click.native="getList">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="listData.records" size="mini"
                :header-cell-style=" {fontWeight:'bold',background:'#f8f8f9',color: '#515a6e',height:'40px'}" border>
        <el-table-column align="center" label="ID" prop="id" width="60"></el-table-column>
        <el-table-column align="center" label="头像" width="80">
          <template slot-scope="scope">
            <div v-if="scope.row.profilePicture">
              <el-image
                  :src="baseURL + scope.row.profilePicture"
                  referrerpolicy="no-referrer"
                  :preview-src-list="[baseURL + scope.row.profilePicture]"
                  fit="cover"
                  style="width: 50px; height: 50px;"
              />
            </div>
            <div v-else >
              -
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="用户名" prop="userName" width="120"/>
        <el-table-column align="center" label="标题" prop="title" min-width="220"/>
        <el-table-column align="center" label="首长" prop="userAdminName" width="120"/>
        <el-table-column align="center" label="内容" min-width="130">
          <template slot-scope="scope">
            <a href="javascript:void(0)" @click="openDialog(scope.row.id)" class="view-content-link">查看内容</a>
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态" prop="isReply">
          <template slot-scope="scope">
              <span v-if="statusMap[scope.row.isReply]" :class="{'text-success': scope.row.isReply === 1, 'text-danger': scope.row.isReply === 0}">
                {{ statusMap[scope.row.isReply] }}
              </span>
            <span v-else>未知状态</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="是否公开" width="80">
          <template slot-scope="scope">
            {{ scope.row.isPublicly === 1 ? '是' : '否' }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="留言时间" prop="createTime" min-width="150"/>

        <el-table-column align="center" label="操作" min-width="180" fixed="right">
          <template slot-scope="scope">
            <el-button icon="el-icon-chat-round" size="mini" type="primary" @click="openEdit(1,scope.row)"
                       v-has-permi="['admin:comprehensive-mailbox:reply']">回复
            </el-button>
            <el-button icon="el-icon-delete" size="mini" type="danger" @click="handlerDelete(scope.row.id)"
                       v-has-permi="['admin:comprehensive-mailbox:list:delete']">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          :current-page="listPram.page"
          :page-sizes="[10,20,40,60,80,100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listData.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
    </el-card>
    <el-dialog
        :visible.sync="editDialog.visible"
        title="回复"
        destroy-on-close
        :close-on-click-modal="false"
        top="50px"
        width="1200px">
      <reply
          v-if="editDialog.visible"
          :is-create="editDialog.isCreate"
          :edit-data="editDialog.editDate"
          @hideEditDialog="hideEditDialog"
          ref="editForm"
      />
    </el-dialog>

    <el-dialog :visible.sync="dialogVisible" width="50%" title="详细内容">
      <div v-if="selectedContent">
        <div v-html="selectedContent"></div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeDialog">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {deleteRow, list, updateStatus,getTree} from "@/api/comprehensiveMailbox";
import {checkPermi} from "@/utils/permission";
import Reply from "./reply.vue";

export default {
  components: {Reply},
  data() {
    return {
      listData: {
        records: [], total: 0
      },
      listPram: {
        title: '',
        page: 1,
        size: 10,
        type:null,
        categoryId:null,
        isReply: null
      },
      options:[],
      dialogVisible: false,
      selectedContent: '',
      currentContent: '', // 当前选中的内容
      statusMap: {
        0: '未回复',
        1: '已回复',
      },
      editDialog: {
        visible: false,
        isCreate: 0, // 0=创建，1=编辑
        editDate: {},
      },
      detailId:null,
      tableLoading: false,
      typeList: [],
      imageUrl: '',
      baseURL: '',
    }
  },
  mounted() {
    this.baseURL = process.env.VUE_APP_IMAGE_URL
    this.getList()
    this.getClassificationList()
  },
  methods: {
    checkPermi,
    getList() {
      this.tableLoading = true
      list(this.listPram).then(res => {
        this.listData = res;
      }).finally(() => {
      })
      this.tableLoading = false;
    },
    getClassificationList() {
      this.saveLoading = true;
      getTree({keyword:this.listPram.categoryId}).then((res) => {
        this.options = res
      }).finally(() => {
        this.saveLoading = false
      })
    },

    openDialog(id) {
      const row = this.listData.records.find(item => item.id === id);
      this.selectedContent = row && row.content ? row.content : '-';
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
      this.selectedContent = '';
    },
    handleStatusChange(status,id){
      const loading=this.$loading({text:'更新中',background:'rgba(255,255,255,.5)'})
      updateStatus(id,status).then(()=>{
        this.$message.success('更新状态成功')
        this.getList()
      }).finally(()=>{
        loading.close()
      })
    },
    openEdit(isCreate, editDate) {
      this.editDialog.visible = true
      this.editDialog.isCreate = isCreate;
      this.editDialog.editDate = editDate;
    },
    handlerDelete(id) {
      this.$confirm('确认删除该数据吗？').then(() => {
        const loading = this.$loading({text: '删除中', background: 'rgba(255,255,255,.5)'})
        deleteRow({id:id}).then(() => {
          this.$message.success('删除成功')
          this.getList()
        }).finally(() => {
          loading.close()
        })
      })
    },
    hideEditDialog() {
      this.editDialog.visible = false
      this.getList()
    },
    hideDetailDialog() {
      this.dialogVisible = false
      this.getList()
    },
    handleSizeChange(val) {
      this.listPram.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listPram.page = val
      this.getList()
    },
    resetQuery() {
      this.listPram.title = '';
      this.listPram.categoryId = '';
      this.getList()
    }
  }
}
</script>

<style scoped lang="scss">
.text-success {
  color: green;
}
.text-warning {
  color: orange;
}
.text-danger {
  color: red;
}
.view-content-link {
  color: blue; /* 蓝色 */
  text-decoration: none; /* 去掉下划线 */
  cursor: pointer; /* 鼠标指针变为手型 */
}

.view-content-link:hover {
  text-decoration: underline; /* 悬停时显示下划线 */
}
</style>
