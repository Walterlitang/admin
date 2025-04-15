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
              <el-button icon="el-icon-circle-plus" size="mini" type="primary" @click="openEdit(null)" v-has-permi="['admin:comprehensive-mailbox:save']">添加
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
          :tree-props="{children: 'child', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="name" label="名称" min-width="200">
          <template slot-scope="scope">
            {{ scope.row.name }} | ID:{{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-switch
                v-model="scope.row.status"
                style="width:40px;"
                @change="handleStatusChange($event,scope.row.id)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="排序" prop="sort" min-width="100"/>
        <el-table-column label="操作" min-width="180" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button
                icon="el-icon-edit"
                size="mini"
                type="text"
                @click="openEdit(scope.row.id)"
                v-has-permi="['admin:comprehensive-mailbox:save']">
              编辑
            </el-button>
            <el-button
                icon="el-icon-delete"
                size="mini"
                type="text"
                @click="handlerDelete(scope.row.id)"
                v-has-permi="['admin:comprehensive-mailbox:delete']">
              删除
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
        width="800px">
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
import edit from './edit.vue'
import {getTree,deleteCategory,updateStatus} from "@/api/comprehensiveMailbox";
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
      },
      tableLoading: false,
      baseURL: '',
    }
  },
  mounted() {
    this.baseURL = process.env.VUE_APP_IMAGE_URL
    this.getList()
  },
  methods: {
    handleStatusChange(status,categoryId){
      const loading=this.$loading({text:'更新中',background:'rgba(255,255,255,.5)'})

      updateStatus({ categoryId: categoryId, status: status }).then(() => {
        this.$message.success('更新状态成功');
        this.getList();
      }).catch((error) => {
        this.$message.error('更新状态失败: ' + (error.response ? error.response.data.message : '未知错误'));
        this.getList();
      }).finally(() => {
        // 关闭加载中的提示
        loading.close();
      });
    },
    checkPermi,
    getList() {
      this.tableLoading = true
      getTree(this.listPram).then(res => {
        this.treeList = hasChild(res,'child');
      }).finally(() => {
      })
      this.tableLoading = false;
    },
    openEdit(id) {
      this.editDialog.id = id;
      this.editDialog.show = true
    },
    handlerDelete(id) {
      this.$confirm('确认删除该数据吗？').then(() => {
        const loading = this.$loading({text: '删除中', background: 'rgba(255,255,255,.5)'})
        deleteCategory({id:id}).then(() => {
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

