<template>
  <div>
    <!--头部-->
    <base-info :view-data="viewData" ref="baseInfo"/>
    <!--小方块-->
    <!--    <grid-menu class="mb20 mt20" hidden/>-->
    <!--统计-->
    <!--    <visit-chart ref="visitChart"/>-->

  </div>
</template>

<script>
//首页顶部统计
import {checkPermi} from "@/utils/permission";
import baseInfo from "@/views/dashboard/components/baseInfo.vue";
// import {viewModelApi} from "@/api/dashboard";
export default {
  name: 'Dashboard',
  components: {baseInfo},
  data() {
    return {
      authStatus: null,
      authHost: '',
      xArr: [],
      yArr: [],
      authQueryStatus: false,
      chartData: {
        chart1: {
          chart: null,
          loading: true
        },
        chart2: {
          chart: null,
          loading: true
        },
        chart3: {
          chart: null,
          loading: true
        },
        chart4: {
          chart: null,
          loading: true
        },
      },
      viewData: {
        registrationsNum: 0,
        feedbackNum: 0,
        arrearsUserNum: 0,
        devicesNum: 0,
        abnormalDevicesNum: 0,
        paymentAmount: 0,
      },
    }
  },
  methods: {
    checkPermi,

  },
}
</script>

