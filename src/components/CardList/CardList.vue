<template>
  <div class="card-content">
    <div class="menu-block">
      <div class="menu-item">
        <div class="round"></div>
        <div class="text">充电中</div>
      </div>
      <div class="menu-item">
        <div class="round" style="background: #07dd6a;"></div>
        <div class="text">空闲</div>
      </div>

      <div class="menu-item">
        <div class="round" style="background: #BEBABA;"></div>
        <div class="text">离线</div>
      </div>
      <div class="menu-item">
        <div class="round" style="background: #ff9220;"></div>
        <div class="text">占用</div>
      </div>
      <div class="menu-item">
        <div class="round" style="background: #ff3d41;"></div>
        <div class="text">故障</div>
      </div>
    </div>
    <div class="card-item">
      <div v-for="item in list" :key="item.id" :class="'list'+item.interfaceStatus" class="card-list">
        <div class="title-item">
          <div class="left-item">
            <div class="text">{{ item.pileName }}</div>
            <div class="number">{{ item.pileNumber }}</div>
          </div>
          <div class="menu-item">
            <div :class="'round'+item.interfaceStatus " class="round"></div>
            <div v-if="item.interfaceStatus===1" class="text">空闲</div>
            <div v-else-if="item.interfaceStatus===3" class="text">充电中</div>
            <div v-else-if="item.interfaceStatus===2" class="text">占用</div>
            <div v-else-if="item.interfaceStatus===255" class="text">故障</div>
            <div v-else-if="item.interfaceStatus===0" class="text">离线</div>
          </div>
        </div>
        <div class="img-item">
          <img v-if="item.interfaceStatus===3" alt="" class="card-img" src="@/assets/imgs/charge1.png">
          <img v-else-if="item.interfaceStatus===1" alt="" class="card-img" src="@/assets/imgs/charge2.png">
          <img v-else-if="item.interfaceStatus===2" alt="" class="card-img" src="@/assets/imgs/charge5.png">
          <img v-else-if="item.interfaceStatus===0" alt="" class="card-img" src="@/assets/imgs/charge3.png">
          <img v-else-if="item.interfaceStatus===255" alt="" class="card-img" src="@/assets/imgs/charge4.png">
        </div>
        <div class="card-item">
          <div class="item">额定功率：{{ item.power + ' kW' || '-' }}</div>
          <div class="item">额定电流：{{ item.current + ' A' || '-' }}</div>
        </div>
        <div class="card-item">
          <div class="item">电压上限：{{ item.voltageUpperLimits + 'V' || '-' }}</div>
          <div class="item">电压下限：{{ item.voltageLowerLimits + 'V' || '-' }}</div>

        </div>
        <div class="card-item">
          <div class="item">
            运营状态：
            <div v-if="item.chargePile.operationalStatus===1" style="color: #00BFA1;">{{ item.chargePile.operationalStatusText }}</div>
            <div v-else-if="item.chargePile.operationalStatus===2" style="color: #EA0000;">{{ item.chargePile.operationalStatusText }}</div>
            <div v-else-if="!item.operationalStatus">-</div>
          </div>
        </div>
        <div class="item1">终端类型：{{ item.connectorTypeText || '-' }}</div>
        <div class="btn-item">
          <div v-has-permi="['admin:station:save']" class="btn" @click="openEdit(item.id)">详情</div>
          <div   v-if="item.interfaceStatus===3" v-has-permi="['admin:station:details']" class="btn" @click="openDetail(item.id)">充电明细</div>
<!--          <div v-has-permi="['admin:station:cost']" class="btn" @click="openCost(item.chargePile.chargeStationId)">计费策略</div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardList",
  props: {
    list: Array
  },
  methods: {
    openEdit(id) {
      this.$emit('openEdit', id)
    },
    openDetail(id,) {
      this.$emit('openDetail', id)
    },
    openCost(id,) {
      this.$emit('openCost', id)
    },
  }
}
</script>

<style scoped lang="scss">
.card-content {
  width: 100%;

  .menu-block {
    display: flex;
    justify-content: center;
    align-items: center;

    .menu-item {
      display: flex;
      align-items: center;
      font-size: 14px;
      margin-right: 10px;

      .round {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #0256FF;
        margin-right: 6px;
      }
    }
  }

  .card-item {
    display: flex;
    flex-wrap: wrap;
    font-size: 14px;
    margin-top: 14px;

    .card-list {
      width: calc((100% - 80px) / 5);
      border: 1px solid #0256FF;
      margin-right: 20px;
      padding: 15px;
      margin-bottom: 20px;
      border-radius: 8px;

      .title-item {
        display: flex;
        justify-content: space-between;

        .left-item {
          display: flex;
          align-items: center;
          font-size: 14px;

          .number {
            margin-left: 4px;
          }
        }

        .menu-item {
          display: flex;
          align-items: center;
          font-size: 14px;
          margin-right: 10px;

          .round {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            margin-right: 6px;
          }

          .round.round2 {
            background: #ff9220;
          }

          .round.round1 {
            background: #00BFA1;
          }

          .round.round4 {
            background: #BEBABA;
          }

          .round.round3 {
            background: #0d41fa;
          }
        }
      }

      .img-item {
        display: flex;
        justify-content: center;
        margin: 10px auto;

        .card-img {
          width: 80px;
          height: 80px
        }
      }

      .card-item {
        display: flex;
        width: 100%;

        .item {
          width: 50%;
          display: flex;
          align-items: center;
        }
      }

      .item1 {
        width: 100%;
        display: flex;
        align-items: center;
        margin-top: 14px;
      }

      .btn-item {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-top: 14px;
        //flex-wrap: nowrap;  // 添加这一行

        .btn {

          padding: 3px 14px;
          border: 1px solid #0256FF;
          color: #0256FF;
          border-radius: 20px;
          cursor: pointer;
        }
      }
    }

    .card-list:nth-child(5n) {
      margin-right: 0;
    }
    .card-list.list0 {
      border: 1px solid #BEBABA;
    }

    .card-list.list3 {
      border: 1px solid #0256FF;
    }

    .card-list.list1 {
      border: 1px solid #00BFA1;
    }

    .card-list.list4 {
      border: 1px solid #BEBABA;
    }

    .card-list.list2 {
      border: 1px solid #FF9220;
    }
  }
  .card-list.list255 {
    border: 1px solid #FF3D41;
  }
}
</style>
