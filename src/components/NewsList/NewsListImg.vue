<template>
  <div class="news-pages">
    <div class="workshop-left-info">
      <div class="small-title" v-if="title">
        <div class="small title" @click="navigateList(id)">
<!--          <img :src="imgUrl+readList.backgroundImage" alt=""  style="width: 30px;margin-bottom: -4px">-->
          <img :src="imgUrl+readList.backgroundImage" alt=""  style="width: 30px;margin-bottom: -4px">
          {{title}}</div>
        <div class="more" @click="navigateList(id)">更多</div>
      </div>
      <template v-if="list.length>0">
        <div class="workshop-left-item"  @click="navigate(list[0])">
          <img v-if="list[0].pic" :src="imgUrl+list[0].pic" alt="" class="workshop-img" />
          <img v-else :src="defaultImgUrl" alt="默认图片" class="workshop-img"/>
          <div class="workshop-info">
            <div class="info-title">{{list[0].title}}</div>
            <div class="info-content">{{list[0].pick}}</div>
          </div>
        </div>
        <NewsList :list="list"></NewsList>
      </template>
      <el-empty description="暂无数据" v-else class="empty"></el-empty>
    </div>
  </div>
</template>

<script>

import NewsList from "@/components/NewsList/NewsList.vue";
import {getDetailsIconApi} from "@/api/home";

export default {
  components: {NewsList},
  props:['list','title','type','id'],
  data() {
    return {
      imgUrl:process.env.VUE_APP_BASE_API+'/api',
      readList: {},
      defaultImgUrl: require('@/assets/title/default.png'), // 默认图片的路径
    }
  },
  mounted() {
    this.getReadList();
  },
  methods:{
    navigate(item){
      if(item.jumpUrl){
        window.open(item.jumpUrl)
      }else if(item.linkAddress){
        window.open(item.linkAddress)
      }else{
        const routeInfo = this.$router.resolve({
          path: '/newsDetail',
          query: { id: item.id },
        });
        window.open(routeInfo.href);
      }
    },
    navigateList(id){
      const routeInfo = this.$router.resolve({
        path: '/newsList',
        query: { id: id },
      });
      window.open(routeInfo.href);
    },
    getReadList() {
      getDetailsIconApi({id:this.id}).then((res) => {
        this.readList = res;
      })
    },
  }
}
</script>

<style scoped lang="scss">
.news-pages{
   width: 100%;
  .workshop-left-info{
    margin-top: 5px;
    .small-title{
      display: flex;
      align-items: center;
      justify-content: space-between;
      //border-bottom: 1px solid #0b6042;
      //padding-bottom: 10px;
      margin-bottom: 10px;
      cursor: pointer;
      .title{
        width: 140px;
        text-align: end;
        padding-bottom: 4px;
        border-bottom: 3px solid #0b6042;
        cursor: pointer;
      }
      .title:hover{
        color: #0b6042;
      }
      .small{
        //background: #a2dcc9;
        color: #636363;
        font-size: 22px;
        font-weight: bold;
        padding: 4px 7px;
      }
      .more{
        font-size: 14px;
        color: #767676;
      }
    }
    .workshop-left-item{
      display: flex;
      align-items: center;
      background: #f7f7f7;
      width: 100%;
      margin-top: 15px;
      margin-bottom: 10px;
      cursor: pointer;
      .workshop-img{
        width: 140px;
        height: 100px;
        margin-right: 10px;
      }
      .workshop-info{
        width: calc(100% - 150px);
        padding: 5px  0;
        .info-title{
          font-size: 16px;
          color: #636363;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-bottom: 15px;
        }
        .info-content{
          word-break: break-all;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          /* 超出几行省略 */
          overflow: hidden;
          font-size: 14px;
          line-height: 24px;
          color: #636363;
        }
      }
    }
  }
}
</style>
