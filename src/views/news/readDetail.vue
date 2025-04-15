<template>
  <div class="newsList pages">
    <Top></Top>
    <HeaderDetail></HeaderDetail>
    <div class="newsDetail-content content">
        <div class="container">
          <div class="left-column">
            <img :src="imgUrl+this.bg" alt="人民日报" style="width: 100%;height: 90%">
          </div>
          <div class="right-column">
            <div class="navigation">
              <button style="background: #f39800" @click="getArticleList()">往期回顾</button>
              <button style="background: #596865" @click="getArticleList(1,7)">上一期</button>
              <button style="background: #596865 " @click="getArticleList(2,7)">下一期</button>
            </div>
            <div class="divider"></div>
            <div class="article">
              <h2 >文章目录</h2>
              <ul class="directory">
                <li v-for="item in consultant" :key="item.id" @click="navigate(item)">
                  {{item.title}}
                </li>
              </ul>
            </div>

          </div>
        </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Top from "@/components/Top/Top.vue";
import HeaderDetail from "@/components/Header/HeaderDetail.vue";
import Footer from "@/components/Footer/Footer.vue";
import {getArticleListApi} from "@/api/home";

export default {
  components: { Footer, HeaderDetail, Top},
  data() {
    return {
      activeTab: 'activities',
      consultant: [],
      imgUrl:process.env.VUE_APP_BASE_API+'/api',
      page:1,
      size:7
    }
  },
  watch:{
  },
  methods: {
    getArticleList(page,size) {
      this.commentLoading=true;
      getArticleListApi({page:page,size:size,cid:this.id}).then((res) => {
        this.consultant = res.records;
        this.commentLoading=false;
      })
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
  },

  mounted() {
    this.utils.createParams(this,this.$route.query);

    window.scrollTo(0, 0);
    this.getArticleList();

  }
}
</script>

<style scoped lang="scss">
.newsList {
  display: flex;
  flex-direction: column;
  align-items: center;
  .newsDetail-content{
    background-color: #FFFFFF;
    padding:50px 20px;
    .container {
      display: flex;
      justify-content: space-between;
    }
    .left-column, .right-column {
      width: 48%;
    }
    .left-column {
      border-right: 1px solid #ccc;
    }
    .article {
      margin-bottom: 20px;
      padding-bottom: 10px;
    }
    .article h2 {
      margin-top: 20px;
      background: #40484a;
      color: #FFFFFF;
      font-size: 16px;
      padding: 10px;
      width: 100%;
      box-sizing: border-box;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    .navigation {
      display: flex;
      align-items: center;
    }
    .divider {
      border-bottom: 1px solid #ddd;
      margin: 10px 0;
    }
    .navigation button {
      background-color: #333;
      color: white;
      border: none;
      padding: 10px 20px;
      cursor: pointer;
      margin-right: 20px;
    }
    .navigation button:hover {
      background-color: #555;
    }
    .directory {
      list-style-type: none;
      padding: 0;
      margin-top: 20px;
    }

    .directory li {
      margin-bottom: 10px;
      cursor: pointer;
    }
    .directory li:hover {
      color: #0b6042;
    }
  }
 }
</style>
