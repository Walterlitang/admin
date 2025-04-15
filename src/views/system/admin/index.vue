<template>
  <div class="divBox">
    <el-card class="box-card">
      <el-form inline size="small" @submit.native.prevent>
        <el-form-item label="关键词：">
          <el-input v-model="listPram.keyword" placeholder="账号|名称|手机号" clearable class="selWidth"/>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" size="mini" type="primary" @click.native="getList">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
        <el-form-item class="el-form-item-align-right">
          <el-button icon="el-icon-circle-plus" size="mini" type="primary" @click="openEdit()" v-has-permi="['admin:system:admin:save']">添加管理员</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="listData.list" size="mini" :header-cell-style=" {fontWeight:'bold',background:'#f8f8f9',color: '#515a6e',height:'40px'}" border>
        <el-table-column align="center" label="ID" prop="id" width="120" ></el-table-column>
        <el-table-column align="center" label="用户名" prop="username" width="130"/>
        <el-table-column align="center" label="所属角色" prop="roleName" min-width="100">
          <template slot-scope="scope" v-if="scope.row.roleName">
            <el-tag size="small" type="info" v-for="(item, index) in scope.row.roleName.split(',')" :key="index" class="mr5">{{ item }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="所属单位" min-width="130">
          <template slot-scope="scope">
            {{ scope.row.departmentName ? scope.row.departmentName : '-' }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="真实姓名" min-width="130">
          <template slot-scope="scope">
            {{ scope.row.realName ? scope.row.realName : '-' }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="职务" min-width="130">
          <template slot-scope="scope">
            {{ scope.row.position ? scope.row.position : '-' }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="排序" prop="sort" min-width="130"/>
        <el-table-column align="center" label="状态" prop="status">
          <template slot-scope="scope">
            <el-switch
                :disabled="!checkPermi(['admin:system:admin:status'])"
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="0"
            style="width:40px;"
            @change="handleStatusChange($event,scope.row.id)"
          ></el-switch>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" min-width="180" fixed="right" >
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" size="mini" type="primary" @click="openEdit(scope.row.id)"  v-has-permi="['admin:system:admin:save','admin:system:admin:detail','admin:system:role:list']">编辑</el-button>
            <el-button icon="el-icon-delete" size="mini" type="danger" @click="handlerDelete(scope.row.id)"  v-has-permi="['admin:system:admin:delete']">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="listPram.page"
        :page-sizes="[10,20,40,60,80,100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listData.count"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <el-dialog
      :visible.sync="editDialog.show"
      :title="editDialog.id? '编辑':'新增'"
      destroy-on-close
      :close-on-click-modal="false"
      width="600px">
      <edit
        v-if="editDialog.show"
        :id="editDialog.id"
        @hideEditDialog="hideEditDialog"
        ref="editForm"
      />
    </el-dialog>
  </div>
</template>

<script>
import edit from './edit'
import {deleteRow, list, updateStatus} from "@/api/admin";
import {checkPermi} from "@/utils/permission";
export default {
  components: { edit },
  data() {
    return {
      listData: { list: [],count:0 },
      listPram: {
        keyword: '',
        page: 1,
        limit: 10,
      },
      editDialog:{
        show:false,
        id:null
      },
      tableLoading:false,
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    checkPermi,
    getList(){
      this.tableLoading=true
      list(this.listPram).then(res=>{
        this.listData=res;
      }).finally(()=>{})
      this.tableLoading=false;
    },
    openEdit(id=null){
      this.editDialog.id=id;
      this.editDialog.show=true
    },
    handlerDelete(id) {
      this.$confirm('确认删除该数据吗？').then(() => {
        const loading=this.$loading({text:'删除中',background:'rgba(255,255,255,.5)'})
        deleteRow(id).then(() => {
          this.$message.success('删除成功')
          this.getList()
        }).finally(()=>{
          loading.close()
        })
      })
    },
    hideEditDialog() {
      this.editDialog.show = false
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
    handleStatusChange(status,id){
      const loading=this.$loading({text:'更新中',background:'rgba(255,255,255,.5)'})
      updateStatus(id,status).then(()=>{
        this.$message.success('更新状态成功')
        this.getList()
      }).finally(()=>{
        loading.close()
      })
    },
    resetQuery(){
      this.listPram.keyword = '';
      this.getList()
    }
  }
}
</script>

<style scoped lang="scss">

</style>
