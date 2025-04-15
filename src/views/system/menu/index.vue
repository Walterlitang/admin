<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form inline size="small" @submit.native.prevent>
            <el-form-item label="关键词：">
              <el-input v-model="listPram.keyword" placeholder="名称" clearable class="selWidth"/>
            </el-form-item>
            <el-form-item>
              <el-button icon="el-icon-search" size="mini" type="primary" @click.native="getList">搜索</el-button>
              <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
            <el-form-item class="el-form-item-align-right">
              <el-button icon="el-icon-circle-plus" size="mini" type="primary" @click="openEdit(null,null)" v-has-permi="['admin:system:menu:save']">添加
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <el-table
          ref="treeList"
          v-loading="tableLoading"
          :data="treeList"
          size="mini"
          class="table"
          highlight-current-row
          row-key="id"
          :tree-props="{children: 'childList', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="name" label="名称" min-width="200">
          <template slot-scope="scope">
            {{ scope.row.name }} | ID:{{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="排序" prop="sort" min-width="100"/>
        <el-table-column label="url" prop="url" min-width="100"/>
        <el-table-column label="path" prop="component" min-width="100"/>
        <el-table-column label="图标" min-width="50">
          <template slot-scope="scope">
            <i v-if="scope.row.icon" :class="'el-icon-'+scope.row.icon" style="color: rgb(0, 0, 0);"></i>
            <span v-else>暂无</span>
          </template>
        </el-table-column>
        <el-table-column label="类型" prop="menu_type_text" min-width="100"/>
        <el-table-column label="操作" min-width="180" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button icon="el-icon-circle-plus" size="mini" type="text" @click="openEdit(null,scope.row.id)" v-has-permi="['admin:system:menu:save']">添加子级
            </el-button>
            <el-button icon="el-icon-edit" size="mini" type="text" @click="openEdit(scope.row.id,null)" v-has-permi="['admin:system:menu:save','admin:system:menu:detail']">编辑
            </el-button>
            <el-button icon="el-icon-delete" size="mini" type="text" @click="handlerDelete(scope.row.id)" v-has-permi="['admin:system:menu:delete']">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
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
          :pid="editDialog.pid"
          @hideEditDialog="hideEditDialog"
          ref="editForm"
      />
    </el-dialog>
  </div>
</template>
<script>
import edit from './edit'
import {getTree,deleteRow} from "@/api/menu";
import {checkPermi} from "@/utils/permission";
import {hasChild} from "@/utils/utils";

export default {
  components: {edit},
  data() {
    return {
      listPram: {
        keyword: '',
      },
      treeList: [],
      editDialog: {
        show: false,
        id: null,
        pid:null
      },
      tableLoading: false,
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    checkPermi,
    getList() {
      this.tableLoading = true
      getTree(this.listPram).then(res => {
        this.treeList = hasChild(res);
      }).finally(() => {
      })
      this.tableLoading = false;
    },
    openEdit(id = null,pid=null) {
      this.editDialog.id = id;
      this.editDialog.pid = pid;
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
    resetQuery() {
      this.listPram.keyword = '';
      this.getList()
    }
  }
}
</script>

