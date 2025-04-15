<template>
<div class="newsList pages">
  <Top></Top>
  <HeaderDetail @getId="getId"></HeaderDetail>
  <div class="newsList-content content">
    <div class="news-menu" v-if="menuList.length > 0">
      <div class="menu-info">{{menuList[0].name}}</div>
      <div class="menu-item" v-for="item in menuList.slice(1)" :key="item.id" :class="menuTab==item.id?'active':''" @click="changeMenu(item.id,item.name)">{{item.name}}</div>
    </div>
    <div class="news-block" v-loading="listLoading">
      <div class="title">{{title}}</div>
      <template v-if="listPram.records.length">
        <div class="news-item" v-for="item in listPram.records" :key="item.id" @click="navigate(item.id)">


          <div class="news-info">
            <div class="info-title">{{item.title}}</div>
            <div class="info-desc">{{item.pick}}</div>
            <div class="time-item">
              <div class="time">发布时间：{{item.createTime}}</div>
              <div class="time">浏览量：{{item.viewCount||0}}</div>
            </div>
          </div>
          <video v-if="item.pic && item.pic.includes('mp4')" :src="imgUrl + item.pic" class="news-img"></video>
          <!-- 判断是否有图片 -->
          <img v-else-if="item.pic" :src="imgUrl + item.pic" alt="" class="news-img"/>
          <!-- 如果没有图片或视频，则显示默认图片 -->
<!--          <img v-else :src="defaultImgUrl" alt="默认图片" class="news-img"/>-->
        </div>
      </template>
      <template v-else-if="videoList.length > 0 && menuTab ===140">
        <div  v-if="videoList.length > 0 && menuTab ===140" >
          <el-carousel indicator-position="none"  height="500px">
            <el-carousel-item v-for="item in videoList" :key="item.id">
              <video :src="imgUrl+item.videoUrl" style="height: 400px;width: 600px;align-items: center" controls>

              </video>
            </el-carousel-item>
          </el-carousel>
        </div>
      </template>
      <el-empty description="暂无数据" v-else class="empty"></el-empty>


      <el-pagination class="pagination"
          layout="prev, pager, next"
          :total="listPram.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
  <Footer></Footer>
</div>
</template>

<script>
import Top from "@/components/Top/Top.vue";
import Header from "@/components/Header/Header.vue";
import Footer from "@/components/Footer/Footer.vue";
import NewsList from "@/components/NewsList/NewsList.vue";
import {getArticleListApi} from "@/api/home";
import {getCategoryTreeById, getVideoListApi} from "@/api/news";
import HeaderDetail from "@/components/Header/HeaderDetail.vue";

export default {
  components: {HeaderDetail, NewsList, Footer, Header, Top},
  data() {
    return {
      menuList:[],
      menuTab:11,
      title:'',
      listPram:{
        records:[],
        page:1,
        size:10,
        total:0,
      },
      listLoading:false,
      imgUrl:process.env.VUE_APP_BASE_API+'/api',
      videoList:[],
      defaultImgUrl: require('@/assets/title/default.png'), // 默认图片的路径
     }
  },
  watch:{
  },
  methods: {
    getId(e){
      this.id=e;
      this.menuTab=e;
      this.getMenuList();
      this.listPram.records=[];
    },
    changeMenu(e,title){

      this.menuTab=e;
      this.title=title;
      if(e===34){
        this.$emit('getType', 1);
        this.$router.push({ path: '/', query: {type:1}})
      }
      else if(e===35){
        this.$emit('getType', 2);
        this.$router.push({ path: '/mailbox', query: {type:2}})
      }
      else if(e===3){
        const routeInfo = this.$router.resolve({
          name: 'commander', // 路由的名字
          query: { id: e }, // 如果有参数
        });
        // 使用 window.open 打开新的页面
        window.open(routeInfo.href || routeInfo.url);
      }
      else if(e===16){
        this.$router.push({ path: '/sword', query: { id:e}}, ()=>{}, ()=>{})
      }
      else{
        this.getList();
      }
    },
    navigate(id){
      this.$router.push({ path: '/newsDetail', query: { id:id }})
    },
    getMenuList() {
      getCategoryTreeById({id:this.id}).then((res) => {
        this.menuList = res;
        if(this.id){
          let data=this.menuList.find(item=>item.id==this.id);
          this.title=data.name
        }else{
          this.title = this.menuList[0].name;
        }
        this.getList()
      })
    },
    getList() {
      this.listLoading = true;
      getArticleListApi({page:1,size:7,cid:this.menuTab}).then((res) => {
        this.listPram = res;
        this.listLoading = false;
      }).finally(() => {
        this.listLoading = false;
      })
    },
    handleSizeChange(val) {
      this.listPram.size = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listPram.page = val
      this.getList()
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
  },

  mounted() {
    this.utils.createParams(this,this.$route.query);
    this.menuTab=this.id
    window.scrollTo(0, 0);
    this.getList()
    this.getMenuList()
    this.getVideoList();
  }
}
</script>

<style scoped lang="scss">
.newsList {
  display: flex;
  flex-direction: column;
  align-items: center;
  .newsList-content{
    background-color: #FFFFFF;
    padding:40px 20px;
    display: flex;
    .news-menu{
      margin-right: 30px;
      .menu-info{
        width: 180px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background: #0b6042;
        color: #FFFFFF;
        font-size: 22px;
        font-weight: bold;
      }
      .menu-item{
        background: #e1ede9;
        width: 180px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 18px;
      }
      .menu-item.active{
        color: #0b6042;
        font-weight: bold;
      }
    }
    .news-block{
      width: calc(100% - 210px);
      display: flex;
      flex-direction: column;
      .title{
        font-size: 24px;
        color: #0b6042;
        font-weight: bold;
        border-bottom: 2px solid #0b6042;
        padding-bottom: 15px;
        margin-bottom: 10px;
      }
      .news-item{
        width: 100%;
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        cursor: pointer;
        .news-img{
          width: 160px;
          height: 100px;
          margin-right: 20px;
          border-radius: 5px;
        }
        .news-info{
          width: calc(100% - 180px);
          .info-title{
            font-size: 18px;
            color: #0b6042;
            font-weight: bold;
            margin-bottom: 6px;
          }
          .info-desc{
            font-size: 16px;
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            /* 超出几行省略 */
            overflow: hidden;
            line-height: 28px;
          }
          .time-item{
            display: flex;
            color: #767676;
            font-size: 14px;
            margin-top: 5px;
            .time{
              margin-right: 20px;
            }
          }
        }
      }
      .pagination{
        text-align: center;
      }
    }
  }
}
</style>
