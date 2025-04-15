<template>
  <div class="divBox">
    <!-- ECharts 图表布局 -->
    <el-row :gutter="24" class="mb20">
      <!-- 第一个图表：柱状图 -->
      <el-col :span="8">
        <el-card :bordered="false" class="dashboard-console-visit">
          <div slot="header">
            <div class="acea-row row-between-wrapper">
              <div class="acea-row row-middle">
                <div class="header_title">统计图模板 1：柱状图</div>
              </div>
            </div>
          </div>
          <div id="chart1" class="chart" style="height: 300px;"></div>
        </el-card>
      </el-col>
      <!-- 第二个图表：折线图 -->
      <el-col :span="8">
        <el-card :bordered="false" class="dashboard-console-visit">
          <div slot="header">
            <div class="acea-row row-between-wrapper">
              <div class="acea-row row-middle">
                <div class="header_title">统计图模板 2：折线图</div>
              </div>
            </div>
          </div>
          <div style="height: 300px;" class="chart" id="chart2"></div>
        </el-card>
      </el-col>
      <!-- 第三个图表：饼图 -->
      <el-col :span="8">
        <el-card :bordered="false" class="dashboard-console-visit">
          <div slot="header">
            <div class="acea-row row-between-wrapper">
              <div class="acea-row row-middle">
                <div class="header_title">统计图模板 3：饼图</div>
              </div>
            </div>
          </div>
          <div style="height: 300px;" class="chart" id="chart3"></div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 第四个图表：雷达图 -->
    <el-row :gutter="24" class="mb20">
      <el-col :span="12">
        <el-card :bordered="false" class="dashboard-console-visit">
          <div slot="header">
            <div class="acea-row row-between-wrapper">
              <div class="acea-row row-middle">
                <div class="header_title">统计图模板 4：雷达图</div>
              </div>
            </div>
          </div>
          <div style="height: 300px;" class="chart" id="chart4"></div>
        </el-card>
      </el-col>
      <!-- 第五个图表：散点图 -->
      <el-col :span="12">
        <el-card :bordered="false" class="dashboard-console-visit">
          <div slot="header">
            <div class="acea-row row-between-wrapper">
              <div class="acea-row row-middle">
                <div class="header_title">统计图模板 5：散点图</div>
              </div>
            </div>
          </div>
          <div style="height: 300px;" class="chart" id="chart5"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {chargingAmount, userGrowthTrend} from "@/api/dashboard";

export default {
  data() {
    return {
      infoList: null,
    }
  },
  methods: {
    initChart1() {
      let chart = this.$echarts.init(document.getElementById('chart1'));
      chart.showLoading({
        text: '加载中',
        textColor: '#ooo',
        maskColor: 'rgba(0,0,0,0)'
      });

      let option = {
        xAxis: {
          type: 'category',
          data: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [200, 400, 500, 700, 900, 600, 800],
          type: 'bar',
          itemStyle: {
            color: '#409EFF'
          }
        }]
      };

      chart.setOption(option);
      chart.hideLoading();
    },
    initChart2() {
      let chart = this.$echarts.init(document.getElementById('chart2'));
      chart.showLoading({
        text: '加载中',
        textColor: '#ooo',
        maskColor: 'rgba(0,0,0,0)'
      });

      let option = {
        xAxis: {
          type: 'category',
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [220, 182, 191, 234, 290, 330],
          type: 'line',
          smooth: true,
          lineStyle: {
            color: '#FF5733'
          }
        }]
      };

      chart.setOption(option);
      chart.hideLoading();
    },
    initChart3() {
      let chart = this.$echarts.init(document.getElementById('chart3'));
      chart.showLoading({
        text: '加载中',
        textColor: '#ooo',
        maskColor: 'rgba(0,0,0,0)'
      });

      let option = {
        series: [{
          type: 'pie',
          radius: '50%',
          data: [
            { value: 45, name: 'Category A' },
            { value: 25, name: 'Category B' },
            { value: 15, name: 'Category C' },
            { value: 10, name: 'Category D' },
            { value: 5, name: 'Category E' }
          ]
        }]
      };

      chart.setOption(option);
      chart.hideLoading();
    },
    initChart4() {
      let chart = this.$echarts.init(document.getElementById('chart4'));
      chart.showLoading({
        text: '加载中',
        textColor: '#ooo',
        maskColor: 'rgba(0,0,0,0)'
      });

      let option = {
        radar: {
          indicator: [
            { name: 'Metric 1', max: 100 },
            { name: 'Metric 2', max: 100 },
            { name: 'Metric 3', max: 100 },
            { name: 'Metric 4', max: 100 },
            { name: 'Metric 5', max: 100 }
          ]
        },
        series: [{
          type: 'radar',
          data: [{
            value: [60, 70, 80, 90, 100],
            name: 'Example Data'
          }]
        }]
      };

      chart.setOption(option);
      chart.hideLoading();
    },
    initChart5() {
      let chart = this.$echarts.init(document.getElementById('chart5'));
      chart.showLoading({
        text: '加载中',
        textColor: '#ooo',
        maskColor: 'rgba(0,0,0,0)'
      });

      let option = {
        xAxis: {
          type: 'category',
          data: ['A', 'B', 'C', 'D', 'E', 'F']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [20, 40, 60, 80, 100, 120],
          type: 'scatter',
          symbolSize: 20
        }]
      };

      chart.setOption(option);
      chart.hideLoading();
    }
  },
  mounted() {
    this.initChart1();
    this.initChart2();
    this.initChart3();
    this.initChart4();
    this.initChart5();
  }
}
</script>

<style lang="scss" scoped>
.header_title {
  font-size: 16px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #000000;
  position: relative;
}

.divBox {
  padding: 0 20px;
}

.dashboard-console-visit {
  .el-card__header {
    padding: 14px 20px !important;
  }

  .chart {
    background-color: #fff;
  }
}
</style>
