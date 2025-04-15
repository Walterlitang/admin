<template>
  <div class="divBox">
    <el-card class="box-card">
      <el-form inline size="small" @submit.native.prevent>
        <el-form-item label="标题：">
          <el-input v-model="listPram.title" placeholder="标题" clearable class="selWidth"/>
        </el-form-item>

        <el-form-item>
          <el-button icon="el-icon-search" size="mini" type="primary" @click.native="getList">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
        <el-form-item class="el-form-item-align-right">
          <el-button icon="el-icon-circle-plus" size="mini" type="primary" @click="openEdit(0)"
                     v-has-permi="['admin:notice:save']">添加
          </el-button>
        </el-form-item>
      </el-form>
      <el-table :data="listData.records" size="mini"
                :header-cell-style=" {fontWeight:'bold',background:'#f8f8f9',color: '#515a6e',height:'40px'}" border>
        <el-table-column align="center" label="ID" prop="id" width="80"></el-table-column>
        <el-table-column align="center" label="业务名称" prop="description">
        </el-table-column>
        <el-table-column align="center" label="用户名称" prop="username" min-width="60"/>
        <el-table-column align="center" label="请求耗时" prop="costTime" min-width="40"/>
        <el-table-column align="center" label="代理类型" prop="userAgent" min-width="120"/>
        <el-table-column align="center" label="请求参数" prop="params" min-width="120"/>
        <el-table-column align="center" label="ip地址" prop="ipAddress"  min-width="60">
        </el-table-column>
        <el-table-column align="center" label="创建时间" prop="createdAt" min-width="130"/>
        <el-table-column align="center" label="操作" min-width="180" fixed="right">
          <template slot-scope="scope">
            <el-button icon="el-icon-delete" size="mini" type="danger" @click="handlerDelete(scope.row.id)"
                       v-has-permi="['admin:notice:delete']">删除
            </el-button>
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
  </div>
</template>

<script>
import {list} from "@/api/log";
import {checkPermi} from "@/utils/permission";

export default {
  components: {},
  data() {
    return {
      listData: {
        records: [], total: 0
      },
      listPram: {
        title: '',
        type: '',
        page: 1,
        limit: 10,
        cid: null
      },
      editDialog: {
        visible: false,
        isCreate: 0, // 0=创建，1=编辑
        editDate: {},
      },
      tableLoading: false,
      typeList: [],
      imageUrl: '',
      cascaderProps: {
        value: 'value',
        label: 'label',
        children: 'children',
        checkStrictly: true
      }
    }
  },
  mounted() {
    this.imageUrl = process.env.VUE_APP_IMAGE_URL
    this.getList()
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
        deleteRow(id).then(() => {
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
      this.listPram.title = '';
      this.listPram.type = '';
      this.getList()
    }
  }
}
</script>

<style scoped lang="scss">

</style>
