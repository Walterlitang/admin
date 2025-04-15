<template>
  <div class="divBox" style="padding-bottom:0;">
    <el-row :gutter="20" class="baseInfo">
      <!-- 数据块 1 -->
      <div>
        <el-col v-bind="grid" class="ivu-mb">
          <el-card :bordered="false" dis-hover :padding="12">
            <div class="acea-row row-between-wrapper">
              <div class="acea-row align-center">
                <span class="main_tit">收到的信件</span>
              </div>
            </div>
            <div class="content">
              <span class="content-number spBlock my15">{{dataList.letterCount}}</span> <!-- 占位符 -->
            </div>
          </el-card>
        </el-col>
      </div>

      <!-- 数据块 2 -->
      <div>
        <el-col v-bind="grid" class="ivu-mb">
          <el-card :bordered="false" dis-hover :padding="12">
            <div class="acea-row row-between-wrapper">
              <div class="acea-row align-center">
                <span class="main_tit">内容</span>
              </div>
            </div>
            <div class="content">
              <span class="content-number spBlock my15">{{dataList.articleCount}}</span> <!-- 占位符 -->
            </div>
          </el-card>
        </el-col>
      </div>

      <!-- 数据块 3 -->
      <div>
        <el-col v-bind="grid" class="ivu-mb">
          <el-card :bordered="false" dis-hover :padding="12">
            <div class="acea-row row-between-wrapper">
              <div class="acea-row align-center">
                <span class="main_tit">轮播图</span>
              </div>
            </div>
            <div class="content">
              <span class="content-number spBlock my15">{{dataList.carouselCount}}</span> <!-- 占位符 -->
            </div>
          </el-card>
        </el-col>
      </div>

      <!-- 数据块 4 -->
      <div>
        <el-col v-bind="grid" class="ivu-mb">
          <el-card :bordered="false" dis-hover :padding="12">
            <div class="acea-row row-between-wrapper">
              <div class="acea-row align-center">
                <span class="main_tit">强军视频</span>
              </div>
            </div>
            <div class="content">
              <span class="content-number spBlock my15">{{dataList.strongMilitaryVideoCount}}</span> <!-- 占位符 -->
            </div>
          </el-card>
        </el-col>
      </div>


    </el-row>
  </div>
</template>

<script>
import {list,} from '@/api/dashboard.js'
export default {
  data() {
    return {
      grid: { xl:6, lg: 6, md: 6, sm: 6, xs: 6 }, // 控制布局
      loading: false,
      dataList:[]
    };
  },
  mounted() {
    this.handleGetList();
  },
  methods: {
    handleGetList() {
      this.loading = true;
      list().then(res => {
        this.dataList = res
      }).catch(() => {
        this.loading = false;
      }).finally(() => {
        this.loading = false;
      })
    },
  },

};
</script>

<style scoped lang="scss">
::v-deep {
  .el-col-xl-6 {
    width: 20%;
  }
}

.ivu-mb {
  margin-bottom: 20px;
}

.main_tit {
  color: #333;
  font-size: 14px;
  font-weight: 500;
}

.content-time {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.main_badge {
  width: 30px;
  height: 30px;
  border-radius: 5px;
  margin-right: 10px;
  background: #2c90ff;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.my15 {
  margin: 15px 0 15px;
}

.align-center {
  align-items: center;
}

.baseInfo {
  ::v-deep .el-card__header {
    padding: 15px 20px !important;
  }
}

.content {
  &-number {
    font-size: 30px;
    font-weight: 600;
    font-family: PingFangSC-Semibold, PingFang SC;
    color: #333;
  }

  &-time {
    font-size: 14px;
    color: #333333;
    font-weight: 400;
  }
}
</style>
