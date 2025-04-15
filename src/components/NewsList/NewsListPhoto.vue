<template>
<div class="news-block">
  <div class="small-title" v-if="title">
    <div class="small title" @click="navigateList(id)">
      <img :src="baseURL+readList.backgroundImage" alt=""  style="width: 30px;margin-bottom: -4px">
      {{title}}</div>
    <div class="more" @click="navigateList(id)">更多</div>
  </div>
  <template v-if="list.length>0">
    <div class="main-container">
      <div class="users-container">
        <div v-for="(user, index) in users" :key="user.id" class="user-info" @click="navigate2(user)">
          <img :src="baseURL + user.profilePicture" alt="值班咨询师" class="avatar">
          <div class="details">
            <p class="name">{{ user.name }}</p>
          </div>
        </div>
      </div>
      <div class="consultant-label">
        值班咨询师
      </div>
    </div>

    <div class="news-list-container">
      <div v-for="(item, index) in list" :key="item.id" class="news-list" @click="navigate(item)">
      <span class="news-item">
        <span class="news-title">{{ item.title }}</span>
        <!-- 如果不是最后一个元素，则显示竖线 -->
        <span v-if="index < list.length - 1" class="separator">|</span>
      </span>
      </div>
    </div>
  </template>
  <el-empty description="暂无数据" v-else class="empty"></el-empty>
</div>
</template>

<script >
import {getDetailsIconApi, getPersonApi} from "@/api/home";

export default {
  props: ['list', 'title' ,'id'],
  data() {
    return {
      users: [],
      dynamicsLoading: false,
      baseURL:'',
      readList: {},
    }
  },
  mounted() {
    this.baseURL = process.env.VUE_APP_BASE_API+'/api'
    this.getPerson();
    this.getReadList();
  },

  methods:{
    getPerson() {
      this.dynamicsLoading = true;
      getPersonApi({page:1,size:2,type:this.id}).then((res) => {
        this.users = res.records;
        this.dynamicsLoading = false;
      }).finally(() => {
        this.dynamicsLoading = false;
      })
    },
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
    },
    navigate2(item){
      if(item.jumpUrl){
        window.open(item.jumpUrl)
      }else if(item.linkAddress){
        window.open(item.linkAddress)
      }else{
        const routeInfo = this.$router.resolve({
          path: '/consultantDetail',
          query: { id: item.id },
        });
        window.open(routeInfo.href);
      }
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
.news-block{
  width: 100%;
  .small-title{
    display: flex;
    align-items: center;
    justify-content: space-between;
    //border-bottom: 1px solid #0b6042;
    //padding-bottom: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    margin-top: 10px;
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
  //.news-list:hover{
  //  color: #0b6042;
  //}
  .news-title:hover {
    color: #0b6042;
  }
  .news-list-container {
    display: flex;
    flex-wrap: wrap; /* 允许子元素在超出容器宽度时换行 */
    align-items: center; /* 确保所有子元素垂直居中对齐 */
    margin: 0 20px 20px 20px;
    .news-list{
      display: inline-block; /* 使用 inline-block 使元素可以并排显示并在需要时换行 */
      align-items: center;
      //line-height: 41px;
      color: #636363;
      cursor: pointer;
      padding: 5px 0; /* 添加一些内边距使布局更美观 */
      .news-item {
        display: inline-flex; /* 使用 inline-flex 使内部元素在同一行内显示 */
        align-items: center; /* 垂直居中对齐 */
        .news-title{
          display: block; /* 使用块级元素 */
          word-break: break-word; /* 允许长单词或 URL 地址换行到下一行 */
          overflow-wrap: break-word; /* 当一个单词太长时允许其断开并换行 */
          white-space: normal; /* 允许文本换行 */
          font-size: 16px;
        }
        .separator {
          display: block; /* 使用块级元素 */
          margin: 0 10px; /* 给竖线添加左右边距 */
          color: #ccc; /* 设置竖线颜色 */
          font-weight: bold; /* 加粗竖线 */
        }
      }

    }
  }

}
.main-container {
  display: flex;
  align-items: flex-start; /* 确保所有子元素顶部对齐 */
  padding: 10px;
}
.users-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 10px;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
  //border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  flex-basis: calc(60% - 40px);
  box-sizing: border-box;
  text-align: center;
}

.avatar {
  width: 80px;
  height: 100px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.details {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.name {
  font-size: 1em;
  font-weight: bold;
  margin: 0;
}
.consultant-label {
  writing-mode: vertical-rl; /* 文字竖排 */
  font-size: 1.2em;
  font-weight: bold;
  letter-spacing: 0.2em;
  color: #333;
  padding: 10px;
  margin-top: 20px; /* 调整垂直位置 */
  position: relative;
  margin-left: 50px;
}

.consultant-label::after {
  content: '';
  position: absolute;
  left: 100%;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: #2a4588; /* 蓝色竖线 */
}



//.news-list {
//  display: flex;
//  align-items: center; /* 确保标题和竖线垂直居中对齐 */
//}

//.news-title {
//  display: inline-block;
//  padding: 5px 10px; /* 给标题添加内边距 */
//  cursor: pointer; /* 鼠标指针变为手型 */
//}

//.separator {
//  margin: 0 10px; /* 给竖线添加左右边距 */
//  color: #ccc; /* 设置竖线颜色 */
//  font-weight: bold; /* 加粗竖线 */
//}

/* 可选：鼠标悬停时改变标题的颜色 */


</style>
