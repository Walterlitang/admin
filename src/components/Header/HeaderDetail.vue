<template>
<div class="header content">
  <div class="container">
    <img class="logo" :src="imgUrl+logo" alt=""></img>
    <div class="right-block">
      <div class="name-item">
        <div class="item" @click="navigate(7)">参谋部</div>
        <div class="item" @click="navigate(8)">政治工作部</div>
        <div class="item" @click="navigate(9)">保障部</div>
      </div>
      <div class="search-item">
        <el-input
            placeholder="请输入关键字"
            prefix-icon="el-icon-search"
            v-model="keyword" class="search"
            :clearable="true"
            @change="search">
        </el-input>
      </div>
    </div>
  </div>
<!--  <div class="menu-block" >-->
<!--    <div class="menu-item" v-for="item in list" :key="item.id">-->
<!--      <div class="menu-title" @mouseover.stop="openShow(item,item.id)" :class="menuTab===item.id?'active':''" @click="changeMenu(item.id,item)">-->
<!--        {{item.name}}-->
<!--        <div class="menu-info" v-show="item.isShow">-->
<!--          <div class="menu-text" v-for="item1 in children" :key="item1.id" @click.stop="navigate(item1.id)">{{item1.name}}</div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->


</div>
</template>
<script >
import {getBannerListApi, getIconApi, getNavigationTree} from "@/api/header";
import {getWebsiteDetailApi} from "@/api/mailbox";

export default {
  name: 'HeaderDetail',
  data(){
    return {
      keyword:'',
      activeIndex:'1',
      banner:[],
      banner1:[],
      list:[],
      imgUrl:process.env.VUE_APP_BASE_API+'/api',
      logo:'',
      isShow:false,
      children:[],
      menuTab:0,
      icons: []
    }
  },
  watch:{
  },
  methods: {
    changeMenu(index,item) {
      this.menuTab = index;
      if(!item.child){
        this.navigate(index)
      }
    },

    openShow(item,id){
      this.list.forEach(item => {
        item.isShow = false;
      })
      if(item.id===id) {
        item.isShow = true;
        this.children=item.child
      }
    },
    closeShow(){
      this.list.forEach(item=>item.isShow = false);
    },
    navigate(id){
      if(id!==3&&id!==16&&id!==34&&id!==35&&id!==0){
        this.$emit('getId', id);
        const routeInfo = this.$router.resolve({
          path: '/newsList',
          query: {id: id },
        });
        window.open(routeInfo.href);
      }else if(id===3){
        const routeInfo = this.$router.resolve({
          name: 'commander', // 路由的名字
          query: {id: id }, // 如果有参数
        });
        // 使用 window.open 打开新的页面
        window.open(routeInfo.href);
      }else if(id===16){
        const routeInfo = this.$router.resolve({
          path: '/sword',
          query: {id: id },
        });
        window.open(routeInfo.href);
      }
      else if(id===34){
        this.$emit('getType', 1);
        const routeInfo = this.$router.resolve({
          path: '/mailbox',
          query: {type:1},
        });
        window.open(routeInfo.href);
      }
      else if(id===35){
        this.$emit('getType', 2);
        const routeInfo = this.$router.resolve({
          path: '/mailbox',
          query: {type:2},
        });
        window.open(routeInfo.href);
      }
      else if(id===0){
        this.$router.push({ name: 'home'})
      }
    },
    search(){
      this.$emit('search', this.keyword);
      if(this.$route.path!=='/search'){
        const routeInfo = this.$router.resolve({
          path: '/search',
          query: {keyword: this.keyword},
        });
        window.open(routeInfo.href);
      }
    },
    getList() {
      getNavigationTree().then((res) => {
        let list = res;
        list.unshift({id:0,name:'首页'})
        list.forEach(item => {
          item.isShow = false;
        })
        this.list = list;
      })
    },
    getBannerList() {
      getBannerListApi().then((res) => {
        this.banner = res.records.slice(0,3);
        this.banner1 = res.records.slice(3);
      })
    },
    getWebsiteDetail() {
      getWebsiteDetailApi({id:1}).then((res) => {
        this.logo = res.logo;
      })
    },
    getIcon() {
      getIconApi({type:5}).then((res) => {
        this.icons = res;
      })
    },

  },
  mounted(){
    this.getList();
    this.getIcon();
    this.getBannerList();
    this.getWebsiteDetail();
    document.addEventListener('mouseover',(event)=> {
      if(event.target.classList&&!event.target.classList.contains('menu-block')){
        this.closeShow()
      }
    })
  }
}
</script>
<style scoped lang="scss">
.header{
  width: 1200px;
  margin-top: 100px;
  background: #FFFFFF;
  .container{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 20px;
    .logo{
      width: 424px;
      height: 87px;
    }
    .right-block{
      cursor: pointer;
      .name-item{
        display: flex;
        align-items: center;
        .item{
          color: #345a5b;
          font-size: 15px;
          font-weight: bold;
          margin-right: 10px;
          margin-bottom: 10px;
        }
        .item:hover{
          color: #f39800;
        }
      }
    }
  }
  .menu-block{
    cursor: pointer;
    height: 50px;
    background: url("~@/assets/home/navbg.png") center no-repeat ;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    .menu-item{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      .menu-title:hover{
         color: #f39800 ;
       }
      .menu-title{
        color: #FFFFFF;
        font-size: 21px;
        font-weight: bold;
        position: relative;
        .menu-info{
          font-weight: normal;
          position: absolute;
          z-index: 9999;
          transform: translate(-50%,0%);
          left: 50%;
          top: 38px;
          background: rgba(255,255,255,.8);
          width: 130px;
          .menu-text{
            font-size: 15px;
            line-height: 40px;
            color: #345a5b;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .menu-text:hover{
            color: #f39800 ;
          }
        }
      }
    }
  }
  .banner{
    .img{
      width: 100%;
      height: 100%;
    }
  }
}




</style>
