<template>
  <div class="divBox">
    <el-card class="box-card">
      <el-form inline size="small" @submit.native.prevent>
        <el-form-item label="关键词：">
          <el-input v-model="listPram.keyword" placeholder="请输入标题" clearable class="selWidth"/>
        </el-form-item>
        <el-form-item label="咨询师分类：">
          <el-select v-model="listPram.type" placeholder="请选择">
            <el-option
                v-for="item in personList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" size="mini" type="primary" @click="handleSearch">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
        <el-form-item class="el-form-item-align-right">
          <el-button icon="el-icon-circle-plus" size="mini" type="primary" @click="handlerOpenEdit(0)"
                     v-has-Permi="['admin:person:save']">添加
          </el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData.data" v-loading="loading" size="small"
                :header-cell-style=" {fontWeight:'bold',background:'#f8f8f9',color: '#515a6e',height:'40px'}" border>
        <el-table-column align="center" label="ID" prop="id" min-width="40"/>
        <el-table-column align="center" label="头像" prop="profilePicture" min-width="50">
          <template slot-scope="scope">
            <el-image :src="baseURL+scope.row.profilePicture"
                      referrerpolicy="no-referrer"
                      :preview-src-list="[baseURL + scope.row.profilePicture]">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column align="center" label="姓名" prop="name" min-width="80"/>
        <el-table-column align="center" label="类型" prop="typeName" min-width="80"/>
        <el-table-column align="center" label="访问量" prop="viewCount" min-width="50"/>
        <el-table-column align="center" label="排序" prop="sort" min-width="50"/>
        <el-table-column align="center" label="状态" min-width="50">
          <template slot-scope="scope">
            <el-switch  :disabled="!checkPermi(['admin:person:status'])" class="custom-active-left" v-model="scope.row.status" active-text="显示"
                       inactive-text="隐藏" :active-value="1" :inactive-value="0" @change="onChangeStatus(scope.row)"/>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="260">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" type="primary" size="mini" @click="handlerOpenEdit(1,scope.row)"
                       v-has-Permi="['admin:person:save']">编辑
            </el-button>
            <el-button icon="el-icon-delete" type="danger" size="mini" @click="handlerOpenDel(scope.row.id) "
                       v-has-Permi="['admin:person:delete']">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          :current-page="listPram.page"
          :page-sizes="[10,20,40,60,80,100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
    </el-card>
    <el-dialog
        :visible.sync="editDialogConfig.visible"
        :title="editDialogConfig.isCreate === 0? '添加心理咨询师':'编辑心理咨询师'"
        destroy-on-close
        :close-on-click-modal="false"
        top="10px"
        width="1200px">
      <edit
          v-if="editDialogConfig.visible"
          :is-create="editDialogConfig.isCreate"
          :edit-data="editDialogConfig.editData"
          :baseURL="baseURL"
          :personList="personList"
          @hideEditDialog="hideEditDialog"
      />
    </el-dialog>
  </div>
</template>

<script>
import {
  list,
  deleteRow, status, personTypeList
} from '@/api/person.js'
import edit from './edit'
import {checkPermi} from "@/utils/permission";

export default {
  components: {edit},
  data() {
    return {
      loading: false,
      tableData: {
        data: [],
        total: 0,
      },
      pram: {
        id: null,
        sort: null,
        name: '',
        profilePicture: '',
        phone: '',
        status: null,
      },
      listPram: {
        title: '',
        type: null,
        page: 1,
        limit: 10
      },
      editDialogConfig: {
        visible: false,
        isCreate: 0, // 0=创建，1=编辑
        editData: {},
      },
      detailDialogConfig: {
        visible: false,
        id: 0,
      },
      personList: [],
      content: '',
      baseURL: '',
    }
  },
  mounted() {
    this.baseURL = process.env.VUE_APP_IMAGE_URL
    this.handleGetList();
    this.personTypes();
  },
  methods: {
    checkPermi,
    personTypes() {
      personTypeList().then(res => {
        this.personList = res
      })
    },
    onChangeStatus(row) {
      status({id: row.id, status: row.status}).then(() => {
        this.$message.success('更新成功');
        this.handleGetList();
      })
    },
    handlerOpenDel(id) {
      this.$confirm('确认删除当前数据').then(() => {
        deleteRow({id: id}).then(() => {
          this.$message.success('删除数据成功')
          this.handleGetList();
        })
      })
    },
    handleGetList() {
      this.loading = true;
      list(this.listPram).then(res => {
        this.tableData.data = res.records;
        this.tableData.total = res.total;
      }).catch(() => {
        this.loading = false;
      }).finally(() => {
        this.loading = false;
      })
    },
    handlerOpenEdit(isCreate, editDate) {
      this.editDialogConfig.editData = editDate
      this.editDialogConfig.isCreate = isCreate
      this.editDialogConfig.visible = true
      this.editDialogConfig.view = false;
    },
    handleSizeChange(val) {
      this.listPram.limit = val
      this.handleGetList()
    },
    handleCurrentChange(val) {
      this.listPram.page = val
      this.handleGetList()
    },
    hideEditDialog() {
      this.editDialogConfig.visible = false
      this.handleGetList()
    },
    handleSearch() {
      this.handleGetList()
    },
    resetQuery() {
      this.listPram.keyword = '';
      this.listPram.type = null;
      this.handleGetList()
    }
  }
}
</script>

<style lang="scss">
.divBox {
  .el-switch__label--right {
    margin-left: 7px !important; /* 将激活状态的文本移动到最左边 */
  }
}

/* 确保这些样式仅应用于特定的 el-switch */
.custom-active-left {
  left: -5px !important; /* 将激活状态的文本移动到最左边 */
  right: auto; /* 移除右侧定位 */
}

.custom-active-left .el-switch__label--active {
  left: 0; /* 将激活状态的文本移动到最左边 */
  right: auto; /* 移除右侧定位 */
}

.custom-active-left .el-switch__label.is-active {
  color: #fff; /* 根据需要调整颜色 */
  position: absolute;
  width: 100%; /* 使文本占据整个宽度 */
  text-align: left; /* 文本左对齐 */
  padding-left: 5px; /* 可选：给文本一些内边距 */
}
</style>
