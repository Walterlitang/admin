<template>
  <div class="commander-pages pages">
    <Top></Top>
    <HeaderDetail></HeaderDetail>
    <div class="commander-content content">
<!--      <div class="name-block" style="margin-top: -5px;margin-bottom: 10px">-->
<!--        <div class="line"></div>-->
<!--        <div class="name">强军视频</div>-->
<!--      </div>-->
      <div class="commander-block">
        <div class="headlines-carousel" v-if="list.length > 0" v-loading="videoLoading">
          <el-carousel indicator-position="none" class="banner"  height="350px">
            <el-carousel-item v-for="item in list" :key="item.id">
              <img :src="imgUrl+item.pic" alt="" class="img"/>
<!--              <video :src="imgUrl+item.videoUrl" class="imgs" controls></video>-->
<!--              <div class="headlines-name">{{item.title}}</div>-->
            </el-carousel-item>
          </el-carousel>
        </div>
        <el-empty description="暂无数据" v-else class="headlines-carousel"></el-empty>
        <div class="headlines-item">
          <div class="title-item">
            <div class="headlines-icon">
              <div class="headlines" v-for="item in menuList" :key="item.id" :class="menuTab===item.id?'active':''" @click="changeMenu(item.id)">{{item.name}}</div>
            </div>
            <div class="more" @click="navigate(menuTab)">查看更多>></div>
          </div>
          <div class="headlines-info" v-loading="loading">
            <template v-if="list.length>0">
              <div class="commander-item" v-for="item in list" :key="item.id"  @click="goDetail(item.id)">
                <div class="commander-title">{{item.title}}</div>
                <div class="commander-text">{{item.pick}}</div>
              </div>
            </template>
            <el-empty description="暂无数据" v-else></el-empty>
          </div>
        </div>
      </div>
      <div class="name-block">
        <div class="line"></div>
        <div class="name">战例精讲</div>
      </div>
      <div class="commander-info" v-if="swordList.length>0" v-loading="swordLoading">
        <div class="img-item" v-for="item in swordList" :key="item.id"  @click="goDetail(item.id)">
          <img :src="imgUrl+item.pic" alt="" class="img"/>
          <div class="img-text">{{item.title}}</div>
        </div>
      </div>
      <el-empty description="暂无数据" v-else></el-empty>
      <div class="name-block">
        <div class="line"></div>
        <div class="name">武器装备</div>
      </div>
      <div class="commander-info" v-if="weaponList.length>0" v-loading="weaponLoading">
        <div class="img-item" v-for="item in weaponList" :key="item.id" @click="goDetail(item.id)">
          <img :src="imgUrl+item.pic" alt="" class="img"/>
          <div class="img-text">{{item.title}}</div>
        </div>
      </div>
      <el-empty description="暂无数据" v-else></el-empty>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import NewsList from "@/components/NewsList/NewsList.vue";
import {getArticleListApi, getArticleTreeApi} from "@/api/home";
import Header from "@/components/Header/Header.vue";
import Top from "@/components/Top/Top.vue";
import {getCategoryTreeById, getVideoListApi} from "@/api/news";
import Footer from "@/components/Footer/Footer.vue";
import HeaderDetail from "@/components/Header/HeaderDetail.vue";

export default {
  components: {HeaderDetail, Footer, Top, Header, NewsList},
  data(){
    return {
      list:[],
      loading:false,
      menuList:[],
      menuTab:16,
      imgUrl:process.env.VUE_APP_BASE_API+'/api',
      swordList:[],
      swordLoading:false,
      weaponList:[],
      weaponLoading:false,
      videoLoading:false,
      videoList:[],
      readList:[],
    }
  },
  methods:{
    changeMenu(e){
      this.menuTab=e;
      this.getList();
    },
    navigate(id){
      const routeInfo = this.$router.resolve({
        path: '/newsList',
        query: { id: id },
      });
      window.open(routeInfo.href);
    },
    goDetail(id){
      const routeInfo = this.$router.resolve({
        path: '/newsDetail',
        query: { id: id },
      });
      window.open(routeInfo.href);
    },
    getMenuList() {
      getCategoryTreeById({id:this.id}).then((res) => {
        let list = res;
        this.menuList= list.slice(1);
        this.menuList= this.menuList.slice(0,3);
        this.menuTab = this.menuList[0].id;
        this.getList();
      })
    },
    getVideoList() {
      this.videoLoading = true;
      getVideoListApi({page:1,size:10}).then((res) => {
        this.videoList = res.records;
        this.videoLoading = false;
      }).finally(() => {
        this.videoLoading = false;
      })
    },
    getList() {
      this.loading = true;
      getArticleListApi({page:1,size:4,cid:this.menuTab}).then((res) => {
        this.list = res.records;
        this.loading = false;
      }).finally(() => {
        this.loading = false;
      })
    },
    getSwordList() {
      this.swordLoading = true;
      getArticleListApi({page:1,size:4,cid:28}).then((res) => {
        this.swordList = res.records;
        this.swordLoading = false;
      }).finally(() => {
        this.swordLoading = false;
      })
    },
    getWeaponList() {
      this.weaponLoading = true;
      getArticleListApi({page:1,size:4,cid:29}).then((res) => {
        this.weaponList = res.records;
        this.weaponLoading = false;
      }).finally(() => {
        this.weaponLoading = false;
      })
    },
    getReadList() {
      this.readLoading=true;
      getArticleTreeApi({pid:16}).then((res) => {
        this.readList = res;
        this.readLoading=false;

      })
    },
  },
  mounted() {
    this.utils.createParams(this,this.$route.query);
    this.getMenuList();
    this.getSwordList();
    this.getWeaponList();
    this.getVideoList();
    this.getReadList();
  }
}
</script>

<style scoped lang="scss">
.commander-pages{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .commander-image{
    width: 100%;
    height: 600px;
  }
  .commander-content{
    padding: 40px 20px;
    background: #FFFFFF;
    .commander-block{
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-top: 30px;
      .headlines-carousel{
        width: 550px;
        .banner{
          background: #FFFFFF;
          .imgs{
            width: 100%;
            height: 350px;
          }
          .headlines-name{
            width: 550px;
            position: absolute;
            z-index: 99;
            background: #c22c21;
            color: #ffe4a4;
            margin-top: -40px;
            height: 35px;
            display: flex;
            align-items: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 15px;
            padding-left: 10px;
          }
        }
      }
      .headlines-item{
        width: calc(100% - 580px);
        .title-item{
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          border-bottom: 1px solid #dadada;
          .more{
            color: #606060;
            font-size: 15px;
          }
        }
        .headlines-icon{
         display: flex;
          .headlines{
            margin-right: 20px;
            font-size: 18px;
            font-weight: bold;
          }
          .headlines.active{
            color: #0b6042;
            border-bottom: 2px solid #0b6042;
            padding-bottom: 6px;
          }
        }
        .headlines-info{
          margin-top: 12px;
          .commander-item{
            margin-bottom: 20px;
            cursor: pointer;
            .commander-title{
              font-size: 16px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .commander-text{
              font-size: 14px;
              color: #606060;
              line-height: 24px;
              word-break: break-all;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              /* 超出几行省略 */
              overflow: hidden;
            }
          }
        }
      }
    }
    .name-block{
      display: flex;
      align-items: center;
      margin-top: 20px;
      cursor: pointer;
      .line{
        width: 7px;
        height: 23px;
        border-radius: 20px;
        background: #0b6042;
        margin-right: 10px;
      }
      .name{
        font-size: 18px;
        font-weight: bold;
        color: #0b6042;
      }
    }
    .commander-info{
      display: flex;
      align-items: center;
      margin-top: 20px;
      flex-wrap: wrap;
      cursor: pointer;
      .img-item:nth-child(4n){
        margin-right: 0;
      }
      .img-item{
        width: calc((100% - 60px) / 4);
        margin-right: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #f8f8f8;
        padding-bottom: 10px;
        margin-bottom: 20px;
        .img{
          width: 100%;
          height: 140px;
          background: #606060;
        }
        .img-text{
          width: 100%;
          font-size: 14px;
          margin-top: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
