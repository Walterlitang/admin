<template>
<div class="news-block">
  <div class="small-title" v-if="title">
    <div class="small" @click="navigateList(id)">{{title}}</div>
    <div class="more" @click="navigateList(id)">更多</div>
  </div>
  <template v-if="list.length>0">
    <div class="news-list" v-for="item in list" :key="item.id" @click="navigate(item)">
      <div class="news-title">{{item.title}}</div>
      <div class="news-time">{{item.createTime}}</div>
    </div>
  </template>
  <el-empty description="暂无数据" v-else class="empty"></el-empty>
</div>
</template>

<script >
import { getPersonApi} from "@/api/home";

export default {
  props: ['list', 'title' ,'id'],
  data() {
    return {
      dynamicsLoading: false,
    }
  },

  methods:{

    navigateList(id){
      const routeInfo = this.$router.resolve({
        path: '/newsList',
        query: { id: id },
      });
      window.open(routeInfo.href);
    },
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
    }
  }
}
</script>
<style scoped lang="scss">
.news-block{
  width: 100%;
  .small-title{
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #0b6042;
    padding-bottom: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    margin-top: 10px;
    .small{
      background: #a2dcc9;
      color: #636363;
      font-size: 16px;
      font-weight: bold;
      padding: 4px 8px;
    }
    .more{
      font-size: 14px;
      color: #767676;
    }
  }
  .news-list:hover{
    color: #0b6042;
  }
  .news-list{
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 30px;
    color: #636363;
    cursor: pointer;
    .news-title{
      width: calc(100% - 100px);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 16px;
    }
    .news-time{
      width: 100px;
      font-size: 15px;
      text-align: end;
    }
  }
}
//.main-container {
//  display: flex;
//  align-items: flex-start; /* 确保所有子元素顶部对齐 */
//  padding: 10px;
//}
//.users-container {
//  display: flex;
//  flex-wrap: wrap;
//  gap: 20px;
//  padding: 10px;
//}
//
//.user-info {
//  display: flex;
//  flex-direction: column;
//  align-items: center;
//  background-color: #f9f9f9;
//  //border: 1px solid #ddd;
//  border-radius: 5px;
//  padding: 10px;
//  flex-basis: calc(60% - 40px);
//  box-sizing: border-box;
//  text-align: center;
//}
//
//.avatar {
//  width: 80px;
//  height: 100px;
//  border-radius: 5px;
//  margin-bottom: 10px;
//}
//
//.details {
//  display: flex;
//  flex-direction: column;
//  align-items: center;
//}
//
//.name {
//  font-size: 1em;
//  font-weight: bold;
//  margin: 0;
//}
//.consultant-label {
//  writing-mode: vertical-rl; /* 文字竖排 */
//  font-size: 1.2em;
//  font-weight: bold;
//  letter-spacing: 0.2em;
//  color: #333;
//  padding: 10px;
//  margin-top: 20px; /* 调整垂直位置 */
//  position: relative;
//  margin-left: 50px;
//}
//
//.consultant-label::after {
//  content: '';
//  position: absolute;
//  left: 100%;
//  top: 0;
//  bottom: 0;
//  width: 2px;
//  background-color: #2a4588; /* 蓝色竖线 */
//}

</style>
