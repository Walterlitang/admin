<template>
  <div class="edit-container">
    <el-form v-loading="formLoading" ref="form" :model="form" :rules="rules" label-width="100px">
      <el-descriptions title="基本信息：" :column="3">
        <el-descriptions-item labelStyle="font-weight: bold" label="昵称">{{ form.name }}
        </el-descriptions-item>
        <el-descriptions-item labelStyle="font-weight: bold" label="联系方式">{{ form.mobile }}
        </el-descriptions-item>
        <el-descriptions-item labelStyle="font-weight: bold" label="缴费总金额">{{ form.totalPaymentAmount }}
        </el-descriptions-item>
      </el-descriptions>
      <template>
        <div class="el-descriptions">
          <div style="height: 20px;"></div>
          <div class="el-descriptions__header">
            <div class="el-descriptions__title">缴费记录：</div>
            <div class="el-descriptions__extra"></div>
          </div>
        </div>
      </template>
      <div class="dialogDiv">
        <el-tabs tab-position='left' v-model="tabValue" @tab-click="handleTabClick">
          <el-tab-pane
              :key="index"
              v-for="(item, index) in form.gasDetailVos"
              :label="'户号 '+item.account"
          >
            <template class="table-container">
              <el-descriptions :column="3">
                <el-descriptions-item labelStyle="font-weight: bold" label="户号">{{ item.account }}
                </el-descriptions-item>
                <el-descriptions-item labelStyle="font-weight: bold" label="用户名">{{
                    item.userName
                  }}
                </el-descriptions-item>
                <el-descriptions-item labelStyle="font-weight: bold" label="缴费单位">
                  {{ item.companyName }}
                </el-descriptions-item>
                <el-descriptions-item labelStyle="font-weight: bold" label="用户地址">
                  {{ item.personnelInformationAddress }}
                </el-descriptions-item>
                <el-descriptions-item labelStyle="font-weight: bold" label="使用燃气总量">
                  {{ item.gasMeterTotal }}
                </el-descriptions-item>
              </el-descriptions>
              <template>
                <div class="el-descriptions">
                  <div style="height: 20px;"></div>
                  <div class="el-descriptions__header">
                    <div class="el-descriptions__extra"></div>
                  </div>
                </div>
              </template>
              <el-card class="box-card">
                <el-table :data="listData.list" size="mini" height="250"
                          :header-cell-style=" {fontWeight:'bold',background:'#f8f8f9',color: '#515a6e',height:'40px'}">
                  <el-table-column prop="typeStr" label="类型" width="180">
                  </el-table-column>
                  <el-table-column prop="orderNo" label="订单号" width="180">
                  </el-table-column>
                  <el-table-column prop="stateStr" label="支付状态" width="180">
                  </el-table-column>
<!--                  <template slot-scope="scope">-->
<!--                    <el-table-column v-if="scope.row.type=='3'" prop="reason" label="支付失败原因" width="180">-->
<!--                    </el-table-column>-->
<!--                  </template>-->
                  <el-table-column prop="payMoney" label="金额" width="180">
                  </el-table-column>
                  <el-table-column prop="gasMeterBalance" label="燃气表余额" width="180">
                  </el-table-column>
                  <el-table-column prop="createTime" label="时间">
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
            </template>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-form>
  </div>
</template>
<script>
import {detail, payList} from "@/api/user";
import {getForm} from "@/utils/utils";

export default {
  components: {},
  props: {
    id: {
      default: null
    }
  },
  data() {
    return {
      form: {
        id: null,
        name: '',
        mobile: '',
        totalPaymentAmount: '',
        gasDetailVos: [],
      },
      listData: {
        list: [], count: 0
      },
      listPram: {
        userId:'',
        account: '',
        page: 1,
        limit: 10,
      },
      rules: {},
      saveLoading: false,
      formLoading: false,
      imageUrl: '',
      tabValue: 0
    }
  },
  mounted() {
    this.imageUrl = process.env.VUE_APP_IMAGE_URL
    if (this.id) {
      this.getDetail();
    }
  },
  methods: {
    getDetail() {
      this.formLoading = true
      detail(this.id).then(res => {
        getForm(res, this.form);
        this.listPram.account = this.form.gasDetailVos[0].account
        this.listPram.userId = this.id
        this.getPayList()
      }).finally(() => {
        this.formLoading = false;
      })
    },
    handleTabClick(e) {
      let index = e.index
      this.listPram.account = this.form.gasDetailVos[index].account
      this.listPram.userId = this.id
      this.getPayList()
    },
    getPayList() {
      payList(this.listPram).then(res => {
        this.listData = res;
      }).finally(() => {
        this.formLoading = false;
      })
    },
    handleSizeChange(val) {
      this.listPram.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listPram.page = val
      this.getList()
    },
    close() {
      this.$emit('hideEditDialog')
    }
  }
}
</script>
<style lang="less" scoped>
.dialogDiv {
  height: 500px;
  overflow: auto;
}

.table-container {
  height: 100%; /* 设置父容器高度为100% */
  overflow: auto; /* 容器超出时显示滚动条 */
}
</style>
