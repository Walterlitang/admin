<template>
  <div class="divBox">
    <el-card class="box-card">
      <el-table :data="listData" size="mini" :header-cell-style=" {fontWeight:'bold',background:'#f8f8f9',color: '#515a6e',height:'40px'}" border>
        <el-table-column align="center" label="ID" prop="id" width="60" ></el-table-column>
        <el-table-column align="center" label="部队编号" prop="unitNumber" min-width="130"/>
        <el-table-column align="center" label="主办单位" prop="theOrganizer" min-width="150"/>
        <el-table-column align="center" label="联系电话" prop="contactPhoneNumber" min-width="150"/>
        <el-table-column align="center" label="联系人" prop="contactPerson" width="120"/>
        <el-table-column align="center" label="备案号" prop="recordNumber" min-width="150"/>
        <el-table-column align="center" label="logo" prop="logo" width="100">
          <template slot-scope="scope">
            <el-image :src="baseURL+scope.row.logo"
                      referrerpolicy="no-referrer"
                      :preview-src-list="[baseURL + scope.row.logo]">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column  label="操作" min-width="150" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" size="mini" type="primary" @click="openEdit(scope.row.id)"  v-has-permi="['admin:website:save']">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      :visible.sync="editDialog.show"
      :title="editDialog.id? '编辑':'新增'"
      destroy-on-close
      :close-on-click-modal="false"
      top="30px"
      width="1000px">
      <edit
        v-if="editDialog.show"
        :id="editDialog.id"
        :baseURL="baseURL"
        @hideEditDialog="hideEditDialog"
        ref="editForm"
      />
    </el-dialog>
  </div>
</template>

<script>
import edit from './edit'
import {deleteRow, list, updateStatus} from "@/api/website";
import {checkPermi} from "@/utils/permission";
export default {
  components: { edit },
  data() {
    return {
      listData: [],
      baseURL: '',
      editDialog:{
        show:false,
        id:null
      },
      tableLoading:false,
    }
  },
  mounted() {
    this.baseURL = process.env.VUE_APP_IMAGE_URL
    this.getList()
  },
  methods: {
    checkPermi,
    getList(){
      this.tableLoading=true
      list().then(res=>{
        this.listData=res;
      }).finally(()=>{})
      this.tableLoading=false;
    },
    openEdit(id=null){
      this.editDialog.id=id;
      this.editDialog.show=true
    },
    hideEditDialog() {
      this.editDialog.show = false
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
  }
}
</script>

<style scoped lang="scss">

</style>
