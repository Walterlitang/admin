<template>
<div class="footer-pages">
  <div class="container">
    <div class="left-block">
      <div class="title">{{info.unitNumber}}</div>
      <div class="left">主办单位：{{info.theOrganizer}}</div>
      <div class="left">联系电话：{{info.contactPhoneNumber}}</div>
      <div class="left">联系人：{{info.contactPerson}}</div>
      <div class="left">备案号：{{info.recordNumber}}</div>
    </div>
    <div class="right-block">
      <div class="name">站点导航</div>
     <div class="right-info">
       <div class="right-item"  v-for="item in list" :key="item.id">
         <div class="right-title">{{item.name}}</div>
         <div class="right-list">
           <div class="right" v-for="item1 in item.child" :key="item1.fid" @click="goDetail(item1.linkAddress)">{{item1.name}}</div>
         </div>
       </div>
     </div>
    </div>
  </div>
</div>
</template>

<script>

import {getWebsiteDetailApi} from "@/api/mailbox";
import {getwebListApi} from "@/api/header";

export default {
  name: "Footer",
  data() {
    return {
      info:{
        unitNumber:'',
        theOrganizer:'',
        contactPhoneNumber:'',
        contactPerson:'',
        recordNumber:'',
      },
      list:[]
    }
  },
  methods:{
    goDetail(url){
      if(url){
        window.open(url)
      }
    },
    getWebsiteDetail() {
      getWebsiteDetailApi({id:1}).then((res) => {
        this.info = res;
      })
    },
    getwebList() {
      getwebListApi({type:3}).then((res) => {
        this.list = res;
      })
    },
  },
  mounted() {
    this.getWebsiteDetail();
    this.getwebList();
  }
}
</script>

<style scoped lang="scss">
.footer-pages{
  width: 100%;
  padding: 15px;
  background: #f3f1f1;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  .container{
    width: 1200px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
    .left-block{
      width: 400px;
      border-right: 1px solid #8d9794;
      text-align: start;
      .title{
        font-size: 30px;
        font-weight: bold;
        color: #147654;
        margin-bottom: 10px;
      }
      .left{
        line-height: 38px;
        color: #606060;
      }
    }
    .right-block{
      width: 800px;
      padding-left: 100px;
      .name{
        font-size: 20px;
        font-weight: bold;
        color: #147654;
        margin-bottom: 10px;
      }
      .right-info{
        width: 800px;
        .right-item{
          width: 100%;
          display: flex;
          margin-bottom: 5px;
          .right-title{
            width: 70px;
            color: #336600;
            font-weight: bold;
            font-size: 16px;
            text-align: justify;
            text-align-last: justify;
            margin-right: 10px;
          }
          .right-list{
            width: calc(100% - 100px);
            display: flex;
            flex-wrap: wrap;

            .right{
              margin-right: 10px;
              font-size: 15px;
              color: #606060;
              margin-bottom: 3px;
              cursor: pointer;
            }
            .right:hover{
              color: #147654;
            }
          }
        }
      }
    }
  }
}
</style>
