<template>
  <div class="divBox">
    <el-card class="box-card">
      <el-form inline size="small" @submit.native.prevent>
        <el-form-item label="链接地址：">
          <el-input v-model="listPram.linkAddress" placeholder="链接地址" clearable class="selWidth"/>
        </el-form-item>
        <el-form-item label="所属分类：">
          <el-cascader v-model="listPram.cid" :options="options" style="width: 300px;"
                       :props="{value:'id',label:'name',children:'child',emitPath:false,checkStrictly: true}" filterable clearable>
          </el-cascader>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" size="mini" type="primary" @click.native="getList">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
        <el-form-item class="el-form-item-align-right">
          <el-button icon="el-icon-circle-plus" size="mini" type="primary" @click="openEdit(0)"
                     v-has-permi="['admin:friendshipLink:save']">添加
          </el-button>
        </el-form-item>
      </el-form>
      <el-table :data="listData.records" size="small"
                :header-cell-style=" {fontWeight:'bold',background:'#f8f8f9',color: '#515a6e',height:'40px'}" border>
        <el-table-column align="center" label="ID" prop="id" width="80"></el-table-column>
        <el-table-column align="center" label="图片" prop="icon" width="100">
          <template slot-scope="scope">
            <div v-if="scope.row.icon">
              <el-image
                  :src="baseURL + scope.row.icon"
                  style="width: 66px!important; height: 66px!important;"
                  referrerpolicy="no-referrer"
                  :preview-src-list="[baseURL + scope.row.icon]"
              >
              </el-image>
            </div>
            <div v-else>-</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="标题" prop="title" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.title || "-" }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="所属分类" prop="categoryName" min-width="150"/>
        <el-table-column align="center" label="链接地址" prop="linkAddress" min-width="200"/>
        <el-table-column align="center" label="排序" prop="sort" min-width="200"/>
        <el-table-column align="center" label="状态" min-width="50">
          <template slot-scope="scope">
            <el-switch class="custom-active-left" v-model="scope.row.status" :active-value="1" :inactive-value="0"
                       @change="handleStatusChange($event,scope.row.id)"/>
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" prop="createTime" min-width="130"/>
        <el-table-column align="center" label="操作" min-width="180" fixed="right">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" size="mini" type="primary" @click="openEdit(scope.row.id,1,scope.row)"
                       v-has-permi="['admin:friendshipLink:save']">编辑
            </el-button>
            <el-button icon="el-icon-delete" size="mini" type="danger" @click="handlerDelete(scope.row.id)"
                       v-has-permi="['admin:friendshipLink:delete']">删除
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
          :id="editDialog.id"
          :is-create="editDialog.isCreate"
          :edit-data="editDialog.editDate"
          :baseURL="baseURL"
          @hideEditDialog="hideEditDialog"
          ref="editForm"
      />
    </el-dialog>
  </div>
</template>

<script>
import edit from './edit'
import {deleteFriendshipLink, list, updateFriendshipLinkStatus, getTree} from "@/api/friendshipLink";
import {checkPermi} from "@/utils/permission";

export default {
  components: {edit},
  data() {
    return {
      listData: {
        records: [], total: 0
      },
      options: [],
      listPram: {
        page: 1,
        size: 10,
        linkAddress: '',
      },
      editDialog: {
        id: null,
        visible: false,
        isCreate: 0, // 0=创建，1=编辑
        editDate: {},
      },
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
    getClassificationList() {
      this.saveLoading = true;
      getTree(this.pram).then((res) => {
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
    openEdit(id, isCreate, editDate) {
      this.editDialog.visible = true
      this.editDialog.id = id;
      this.editDialog.isCreate = isCreate;
      this.editDialog.editDate = editDate;
    },
    handlerDelete(id) {
      this.$confirm('确认删除该数据吗？').then(() => {
        const loading = this.$loading({text: '删除中', background: 'rgba(255,255,255,.5)'})
        deleteFriendshipLink({id: id}).then(() => {
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
      updateFriendshipLinkStatus(id, status).then(() => {
        this.$message.success('更新状态成功')
        this.getList()
      }).finally(() => {
        loading.close()
      })
    },
    resetQuery() {
      this.listPram.linkAddress = '';
      this.listPram.cid = '';
      this.getList()
    }
  }
}
</script>

<style scoped lang="scss">
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
