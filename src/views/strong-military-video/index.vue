<template>
  <div class="divBox">
    <el-card class="box-card">
      <el-form inline size="small" @submit.native.prevent>
        <el-form-item label="关键词：">
          <el-input v-model="listPram.keyword" placeholder="请输入标题" clearable class="selWidth"/>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" size="mini" type="primary" @click="handleSearch">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
        <el-form-item class="el-form-item-align-right">
          <el-button icon="el-icon-circle-plus" size="mini" type="primary" @click="handlerOpenEdit(0)"
                     v-has-Permi="['admin:carouselImage:save']">添加
          </el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData.data" v-loading="loading" size="mini"
                :header-cell-style=" {fontWeight:'bold',background:'#f8f8f9',color: '#515a6e',height:'40px'}" border>
        <el-table-column align="center" label="ID" prop="id" width="60"/>
        <el-table-column align="center" label="标题" prop="title" min-width="100"/>
        <el-table-column align="center" label="视频" prop="videoUrl" min-width="100">
          <template slot-scope="scope">
            <div v-if="scope.row.videoUrl">
              <video :src="baseURL + scope.row.videoUrl" controls class="custom-video-class"
                     referrerpolicy="no-referrer">
                您的浏览器不支持 video 标签。
              </video>
            </div>
            <div v-else>
              无视频
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="排序" prop="sort" width="50"/>
        <el-table-column align="center" label="状态" width="120">
          <template slot-scope="scope">
            <el-switch class="custom-active-left" v-model="scope.row.status" active-text="显示"
                       inactive-text="隐藏" :active-value="1" :inactive-value="0" @change="onChangeStatus(scope.row)"/>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="260">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" type="primary" size="mini" @click="handlerOpenEdit(1,scope.row)"
                       v-has-Permi="['admin:carouselImage:save']">编辑
            </el-button>
            <el-button icon="el-icon-delete" type="danger" size="mini" @click="handlerOpenDel(scope.row.id) "
                       v-has-Permi="['admin:carouselImage:delete']">删除
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
      :title="editDialogConfig.isCreate === 0? '添加视频':'编辑视频'"
      destroy-on-close
      :close-on-click-modal="false"
      top="10px"
      width="1300px">
      <edit
        v-if="editDialogConfig.visible"
        :is-create="editDialogConfig.isCreate"
        :edit-data="editDialogConfig.editData"
        :baseURL="baseURL"
        @hideEditDialog="hideEditDialog"
      />
    </el-dialog>
  </div>
</template>

<script>
import {
  list,
  deleteRow, saveRow
} from '@/api/video.js'
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
        id:null,
        sort: null,
        code: 'carousel_image',
        name: '轮播图',
        content: '',
        status: null,
      },
      listPram: {
        title: '',
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
      content: '',
      baseURL: '',
    }
  },
  mounted() {
    this.baseURL = process.env.VUE_APP_IMAGE_URL
    this.handleGetList();
  },
  methods: {
    checkPermi,
    onChangeStatus(row) {
      saveRow({id: row.id, status: row.status}).then(res => {
        this.$message.success('更新成功');
        this.handleGetList();
      })
    },
    handlerOpenDel(id) {
      this.$confirm('确认删除当前数据').then(() => {
        deleteRow({id: id}).then(data => {
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
      }).catch((res) => {
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

<style  lang="scss">
.divBox{
  .el-switch__label--right{
    margin-left: 7px !important; /* 将激活状态的文本移动到最左边 */
  }
}
/* 确保这些样式仅应用于特定的 el-switch */
.custom-active-left  {
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
.custom-video-class {
  width: 100px; /* 设置视频宽度 */
  height: 100px; /* 设置视频高度 */
  object-fit: contain; /* 确保视频按比例缩放并保持在指定区域内 */
}
</style>
