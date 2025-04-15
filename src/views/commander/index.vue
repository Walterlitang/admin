<template>
<div class="commander-pages">
  <img class="commander-image" src="@/assets/commander/banner.png" alt=""/>
  <div class="commander-content content">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>强军资讯</el-breadcrumb-item>
      <el-breadcrumb-item>统帅足音</el-breadcrumb-item>
    </el-breadcrumb>
    <img class="commander-img" src="@/assets/commander/img.png" alt=""/>
    <div class="commander-block">
      <div class="headlines-carousel">
        <el-carousel indicator-position="none" class="banner"  height="350px">
          <el-carousel-item v-for="item in list.slice(0,4)" :key="item.id">
            <img :src="imgUrl+item.pic" alt="" class="imgs"/>
            <div class="headlines-name">{{item.title}}</div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="headlines-item">
        <div class="title-item">
          <img class="headlines-icon" src="@/assets/commander/title.png" alt=""/>
          <div class="more" @click="navigate(3)">查看更多>></div>
        </div>
        <div class="headlines-info" v-loading="loading">
          <template v-if="list.length>0">
            <div class="commander-item" v-for="item in list.slice(0,4)" :key="item.id">
              <div class="commander-title">{{item.title}}</div>
              <div class="commander-text">{{item.pick}}</div>
            </div>
          </template>
          <el-empty description="暂无数据" v-else></el-empty>
        </div>
      </div>
    </div>
    <div class="commander-info">
      <div class="img-item" v-for="item in list.slice(4)" :key="item.id">
        <img :src="imgUrl+item.pic" alt="" class="img"/>
        <div class="img-text">{{item.title}}</div>
      </div>
    </div>
  </div>
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
          <div class="right-item"  v-for="item in list2" :key="item.id">
            <div class="right-title">{{item.name}}</div>
            <div class="right-list">
              <div class="right" v-for="item1 in item.child" :key="item1.fid" @click="goDetail(item1.linkAddress)">{{item1.name}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import NewsList from "@/components/NewsList/NewsList.vue";
import {getArticleListApi} from "@/api/home";
import {getWebsiteDetailApi} from "@/api/mailbox";
import {getwebListApi} from "@/api/header";

export default {
  components: {NewsList},
  data(){
    return {
      // info:{
      //   title:'部队强军网',
      //   unit:'政治工作部军人俱乐部',
      //   phone:'0911-306283',
      //   userName:'王玥',
      //   number:'HJJ2420231024010',
      //   list:[{id:1,name:'军委机关',children:[{id:7,name:'中央军委机关'},{id:8,name:'军委办公厅'}]},
      //     {id:2,name:'战区机关',children:[{id:7,name:'中央军委机关'},{id:8,name:'军委办公厅'}]},
      //     {id:3,name:'军兵种',children:[{id:7,name:'中央军委机关'},{id:8,name:'军委办公厅'}]},
      //     {id:4,name:'火箭军',children:[{id:7,name:'中央军委机关'},{id:8,name:'军委办公厅'},{id:7,name:'中央军委机关'},{id:8,name:'军委办公厅'},{id:7,name:'中央军委机关'},{id:8,name:'军委办公厅'},{id:7,name:'中央军委机关'},{id:8,name:'军委办公厅'},{id:7,name:'中央军委机关'},{id:8,name:'军委办公厅'},{id:7,name:'中央军委机关'},{id:8,name:'军委办公厅'}]},
      //     {id:5,name:'本部单位',children:[{id:7,name:'中央军委机关'},{id:8,name:'军委办公厅'}]},
      //     {id:6,name:'推荐网站',children:[{id:7,name:'中央军委机关'},{id:8,name:'军委办公厅'}]}]
      // },
      info:{
        unitNumber:'',
        theOrganizer:'',
        contactPhoneNumber:'',
        contactPerson:'',
        recordNumber:'',
      },
      list:[],
      list2:[],
      loading:false,
      imgUrl:process.env.VUE_APP_BASE_API+'/api',
    }
  },
  methods:{
    goDetail(url){
      if(url){
        window.open(url)
      }
    },
    navigate(id){
      this.$router.push({ path: '/newsList', query: { id:id }})
    },
    getList() {
      this.loading = true;
      getArticleListApi({page:1,size:8,cid:this.id}).then((res) => {
        this.list = res.records;
        this.loading = false;
      }).finally(() => {
        this.loading = false;
      })
    },
    getWebsiteDetail() {
      getWebsiteDetailApi({id:1}).then((res) => {
        this.info = res;
      })
    },
    getwebList() {
      getwebListApi({type:3}).then((res) => {
        this.list2 = res;
      })
    },
  },
  mounted() {
    this.utils.createParams(this,this.$route.query);
    this.getList()
    this.getwebList();
    this.getWebsiteDetail();
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
    height: 100% ;
  }
  .commander-content{
    padding: 40px 20px;
    .commander-img{
      width: 100%;
      height: 140px;
      margin-top: 30px;
    }
    .commander-block{
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
      .headlines-carousel{
        width: 550px;
        .banner{
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
          .more{
            color: #606060;
            font-size: 15px;
          }
        }
        .headlines-icon{
          width: 120px;
          height: 36px;

        }
        .headlines-info{
          margin-top: 20px;
          .commander-item{
            margin-bottom: 25px;
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
    .commander-info{
      display: flex;
      align-items: center;
      margin-top: 20px;
      .img-item:last-child{
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
  .footer-pages{
    width: 100%;
    height: 270px;
    background: #f3f3f3;
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
        border-right: 1px solid #821219;
        text-align: start;
        .title{
          font-size: 30px;
          font-weight: bold;
          color: #c22c21;
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
          color: #a60f19;
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
              color: #a60f19;
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
            }
            .right:hover{
              color: #c22c21;
            }
          }
        }
      }
    }
  }
}
</style>
