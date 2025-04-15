<template>
  <div class="divBox">
    <el-card class="box-card">
      <el-form inline size="small" @submit.native.prevent>
        <el-form-item label="关键词：">
          <el-input v-model="listPram.keyword" placeholder="昵称 | 电话" clearable class="selWidth"/>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" size="mini" type="primary" @click.native="getList">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="listData.list" size="mini"
                :header-cell-style=" {fontWeight:'bold',background:'#f8f8f9',color: '#515a6e',height:'40px'}" border>
        <el-table-column align="center" label="ID" prop="id" width="80"></el-table-column>
        <el-table-column align="center" label="头像" prop="faceUrl" width="100">
          <template slot-scope="scope">
            <el-image
                referrerpolicy="no-referrer"
                style="width: 66px!important; height: 66px!important;"
                :src="imageUrl + scope.row.faceUrl"
                fit="scale-down"
                :preview-src-list="[imageUrl + scope.row.faceUrl]"
            />
          </template>
        </el-table-column>
        <el-table-column align="center" label="昵称" prop="name" min-width="100"/>
        <el-table-column align="center" label="电话" prop="mobile" min-width="100"/>
<!--        <el-table-column label="身份" prop="groupText" min-width="130"/>-->
<!--        <el-table-column label="地区" prop="area" min-width="130"/>-->
        <el-table-column align="center" label="最后登录时间" prop="lastLoginTime" width="200"/>
        <el-table-column align="center" label="登录IP" prop="loginIp" width="200"/>
<!--        <el-table-column label="状态" prop="status">-->
<!--          <template slot-scope="scope">-->
<!--            <el-switch-->
<!--                :disabled="!checkPermi(['admin:demo:status'])"-->
<!--                v-model="scope.row.status"-->
<!--                :active-value="1"-->
<!--                :inactive-value="0"-->
<!--                style="width:40px;"-->
<!--                @change="handleStatusChange($event,scope.row.id)"-->
<!--            ></el-switch>-->
<!--          </template>-->
<!--        </el-table-column>-->
        <el-table-column align="center" label="创建时间" prop="createTime" width="200"/>
        <el-table-column label="操作" min-width="80" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" size="mini" type="primary" @click="openEdit(scope.row.id)"
                       v-has-permi="['admin:user:detail']">详情
            </el-button>
            <!--            <el-button icon="el-icon-delete" size="mini" type="danger" @click="handlerDelete(scope.row.id)"-->
            <!--                       v-has-permi="['admin:demo:delete']">删除-->
            <!--            </el-button>-->
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
        title="详情"
        destroy-on-close
        :close-on-click-modal="false"
        top="10px"
        width="1200px">
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
import {deleteRow, list, updateStatus} from "@/api/user";
import {checkPermi} from "@/utils/permission";

export default {
  components: {edit},
  data() {
    return {
      listData: {
        list: [], count: 0
      },
      listPram: {
        keyword: '',
        page: 1,
        limit: 10,
      },
      editDialog: {
        show: false,
        id: null
      },
      tableLoading: false,
      imageUrl: '',
    }
  },
  mounted() {
    this.imageUrl = process.env.VUE_APP_IMAGE_URL
    this.getList()
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
    openEdit(id = null) {
      this.editDialog.id = id;
      this.editDialog.show = true
    },
    handlerDelete(id) {
      this.$confirm('确认删除该数据吗？').then(() => {
        const loading = this.$loading({text: '删除中', background: 'rgba(255,255,255,.5)'})
        deleteRow(id).then(() => {
          this.$message.success('删除成功')
          this.getList()
        }).finally(() => {
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
    handleStatusChange(status, id) {
      const loading = this.$loading({text: '更新中', background: 'rgba(255,255,255,.5)'})
      updateStatus(id, status).then(() => {
        this.$message.success('更新状态成功')
        this.getList()
      }).finally(() => {
        loading.close()
      })
    },
    resetQuery() {
      this.listPram.keyword = '';
      this.getList()
    }
  }
}
</script>

<style scoped lang="scss">

</style>
