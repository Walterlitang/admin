<template>
  <div class="divBox">
    <el-card class="box-card">
      <el-form inline size="small" @submit.native.prevent>
        <el-form-item label="标题：">
          <el-input v-model="listPram.title" placeholder="标题" clearable class="selWidth"/>
        </el-form-item>
        <el-form-item label="文章分类：">
          <el-cascader v-model="listPram.cid" :options="options" style="width: 300px;"
                       :props="{value:'id',label:'name',children:'child',emitPath:false,checkStrictly: true}" filterable
                       clearable>
          </el-cascader>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select v-model="listPram.status" style="width: 300px;" placeholder="请选择">
            <el-option
                v-for="item in statusList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" size="mini" type="primary" @click.native="getList">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
        <el-form-item class="el-form-item-align-right">
          <el-button icon="el-icon-circle-plus" size="mini" type="primary" @click="openEdit(0)"
                     v-has-permi="['admin:content:save']">添加
          </el-button>
        </el-form-item>
      </el-form>
      <el-table :data="listData.records" size="mini"
                :header-cell-style=" {fontWeight:'bold',background:'#f8f8f9',color: '#515a6e',height:'40px'}" border>
        <el-table-column align="center" label="ID" prop="id" width="60"></el-table-column>
        <el-table-column align="center" label="封面" width="100">
          <template slot-scope="scope">
            <div v-if="scope.row.pic">
              <el-image
                  referrerpolicy="no-referrer"
                  style="width: 66px!important; height: 66px!important;"
                  :src="imageUrl + scope.row.pic"
                  fit="cover"
                  :preview-src-list="[imageUrl + scope.row.pic]"
              />
            </div>
            <div v-else>
              -
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="标题" prop="title" min-width="100"/>
        <el-table-column align="center" label="文章分类" prop="categoryName" min-width="100"/>
        <el-table-column align="center" label="文章来源" prop="articleSource" min-width="100"/>
        <el-table-column align="center" label="单位" prop="departmentName" min-width="100"/>
        <el-table-column align="center" label="审核领导" prop="reviewer" min-width="100"/>
        <el-table-column align="center" label="浏览量" prop="viewCount" min-width="60"/>
        <el-table-column align="center" label="创建时间" prop="createTime" min-width="120"/>
        <el-table-column align="center" label="排序" prop="sort" min-width="60"/>
        <el-table-column align="center" label="是否焦点关注" min-width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.isFocus === 1">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <div v-if="scope.row.status !== 2">
              <el-switch
                  class="custom-active-left"
                  v-model="scope.row.status"
                  :active-value="1" :inactive-value="0"
                  @change="onChangeStatus(scope.row)"
              />
            </div>
            <div v-else-if="scope.row.status === 2" class="pending-review">
              待审核
            </div>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="400" fixed="right">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" size="mini" type="primary" @click="openEdit(1,scope.row)"
                       v-has-permi="['admin:content:save']">编辑
            </el-button>
            <el-button icon="el-icon-chat-line-round" size="mini" type="primary" @click="handlerComment(scope.row.id)"
                       v-has-permi="['admin:content:comment']">评论列表
            </el-button>
            <el-button icon="el-icon-thumb" size="mini" type="primary" @click="handlerExamine(scope.row.id)"
                       v-if="scope.row.status===2"
                       v-has-permi="['admin:content:examine']">审核
            </el-button>
            <el-button icon="el-icon-delete" size="mini" type="danger" @click="handlerDelete(scope.row.id)"
                       v-has-permi="['admin:content:delete']">删除
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
        :title="editDialog.isCreate === 0? '编辑':'新增'"
        destroy-on-close
        :close-on-click-modal="false"
        top="50px"
        width="1200px">
      <edit
          v-if="editDialog.visible"
          :is-create="editDialog.isCreate"
          :edit-data="editDialog.editDate"
          @hideEditDialog="hideEditDialog"
          ref="editForm"
      />
    </el-dialog>
    <el-dialog
        :visible.sync="commentDialog.visible"
        title="评论"
        destroy-on-close
        :close-on-click-modal="false"
        top="50px"
        width="1200px">
      <comment
          v-if="commentDialog.visible"
          :id="commentDialog.id"
          @hideEditDialog="hideEditDialog"
          ref="editForm"
      />
    </el-dialog>
    <el-dialog
        :visible.sync="examineDialog.visible"
        title="审核"
        destroy-on-close
        :close-on-click-modal="false"
        top="50px"
        width="1200px">
      <examine
          v-if="examineDialog.visible"
          :id="examineDialog.id"
          @hideEditDialog="hideExamineDialog"
          ref="editForm"
      />
    </el-dialog>
  </div>
</template>

<script>
import edit from './edit'
import {deleteRow, list, updateStatus, getClassification, updateArticleStatus} from "@/api/classification";
import {checkPermi} from "@/utils/permission";
import Comment from "./comment.vue";
import Examine from "./examine.vue";

export default {
  components: {Examine, Comment, edit},
  data() {
    return {
      listData: {
        records: [], total: 0
      },
      statusMap: {
        0: '隐藏',
        1: '正常',
        2: '待审核',
      },
      options: [],
      pram: {
        pid: null,
        keyword: '',
      },
      listPram: {
        title: '',
        status: '',
        page: 1,
        size: 10,
        cid: null
      },
      editDialog: {
        visible: false,
        isCreate: 0, // 0=创建，1=编辑
        editDate: {},
      },
      commentDialog: {
        visible: false,
        id: null,
      },
      examineDialog: {
        visible: false,
        id: null,
      },
      tableLoading: false,
      typeList: [],
      imageUrl: '',
      cascaderProps: {
        value: 'value',
        label: 'label',
        children: 'children',
        checkStrictly: true
      },
      statusList: [{id: 0, name: '隐藏'}, {id: 1, name: '正常'}, {id: 2, name: '待审核'}]
    }
  },
  mounted() {
    this.imageUrl = process.env.VUE_APP_IMAGE_URL
    this.getList()
    this.getClassificationList();
  },
  methods: {
    checkPermi,
    transformData(data) {
      return data.map(item => {
        const newItem = {
          value: item.id,
          label: item.name
        };
        if (item.child && item.child.length > 0) {
          newItem.children = this.transformData(item.child);
        }
        return newItem;
      });
    },
    onChangeStatus(row) {
      updateArticleStatus({id: row.id, status: row.status}).then(res => {
        this.$message.success('更新成功');
        this.handleGetList();
      })
    },
    getClassificationList() {
      this.saveLoading = true;
      getClassification(this.pram).then((res) => {
        this.options = res
      }).finally(() => {
        this.saveLoading = false
      })
    },
    getList() {
      this.tableLoading = true
      list(this.listPram).then(res => {
        this.listData = res;
      }).finally(() => {
      })
      this.tableLoading = false;
    },
    openEdit(isCreate, editDate) {
      this.editDialog.visible = true
      this.editDialog.isCreate = isCreate;
      this.editDialog.editDate = editDate;
    },
    handlerDelete(id) {
      this.$confirm('确认删除该数据吗？').then(() => {
        const loading = this.$loading({text: '删除中', background: 'rgba(255,255,255,.5)'})
        deleteRow({id: id}).then(() => {
          this.$message.success('删除成功')
          this.getList()
        }).finally(() => {
          loading.close()
        })
      })
    },
    handlerComment(id) {
      this.commentDialog.visible = true
      this.commentDialog.id = id;
    },
    handlerExamine(id) {
      this.examineDialog.visible = true
      this.examineDialog.id = id;
    },
    hideEditDialog() {
      this.editDialog.visible = false
      this.getList()
    },
    hideExamineDialog() {
      this.examineDialog.visible = false
      this.getList()
    },
    handleSizeChange(val) {
      this.listPram.size = val
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
      this.listPram.title = '';
      this.listPram.cid = '';
      this.listPram.status = '';
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

.pending-review {
  color: red;
}

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
