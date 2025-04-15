<template>
  <div class="news-block">
    <div class="news-list" v-for="item in list" :key="item.id"  @click="navigate(item)">
      <div class="news-title">{{item.title}}</div>
      <div class="news-time">
        <div class="news">发布时间：{{item.createTime}}</div>
        <div class="news">浏览量：{{item.viewCount||0}}</div>
      </div>
    </div>
  </div>
</template>

<script >
export default {
  props: ['list'],
  data() {
    return {

    }
  },
  methods: {
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
  .news-list:hover{
    color: #0b6042;
  }
  .news-list:last-child{
    border-bottom: none;
  }
  .news-list{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #636363;
    cursor: pointer;
    border-bottom: 1px dashed #bcbaba;
    margin-bottom: 10px;
    .news-title{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 16px;
    }
    .news-time{
      font-size: 12px;
      display: flex;
      align-items: center;
      color: #0b6042;
      margin: 10px 0;
      .news{
        margin-right: 20px;
      }
    }
  }
}
</style>
