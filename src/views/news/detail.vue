<template>
  <div class="newsList pages">
    <Top></Top>
    <HeaderDetail></HeaderDetail>
    <div class="newsDetail-content content">
      <div class="title">{{info.title}}</div>
      <div class="count-item">
        <div class="count">发布时间：{{info.releaseTime}}</div>
        <div class="count">文章出处：{{info.articleSource}}</div>
        <div class="count">文章作者：{{info.author||'--'}}</div>
        <div class="count">审核人：{{info.reviewer||'--'}}</div>
        <div class="count">新闻分类：{{info.categoryName}}</div>
        <div class="count">阅读量：{{info.viewCount||0}}</div>
      </div>
      <div class="abstract">摘要：{{info.pick}}</div>
      <div v-html="info.content" class="news-detail"></div>
      <div class="comment-title">
        <div class="line"></div>
        <div class="comment">我要评论</div>
      </div>
      <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入内容"
          v-model="content">
      </el-input>
      <div class="btn-item" @click="addComment">
        <div class="btn">发布</div>
      </div>
      <div class="comment-title">
        <div class="line"></div>
        <div class="comment">评论列表</div>
      </div>
    <template v-if="commentList.length > 0">
      <div class="comment-block" v-for="item in commentList" :key="item.id" v-loading="commentLoading">
        <img :src="imgUrl+item.profilePicture" alt="" class="avatar">
        <div class="comment-info">
          <div class="comment-name">{{item.userName}}</div>
          <div class="comment-text">{{item.content}}</div>
          <div class="comment-time">{{item.createTime}}</div>
        </div>
      </div>
    </template>
      <el-empty description="暂无数据" v-else class="empty"></el-empty>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Top from "@/components/Top/Top.vue";
import HeaderDetail from "@/components/Header/HeaderDetail.vue";
import Footer from "@/components/Footer/Footer.vue";
import NewsList from "@/components/NewsList/NewsList.vue";
import {addCommentApi, getArticleById, getCategoryTreeById, getWebByArticleId} from "@/api/news";
import {getwebListApi} from "@/api/header";

export default {
  components: {NewsList, Footer, HeaderDetail, Top},
  data() {
    return {
      info:{
        title:"",
        content:'',
        createTime:'',
        viewCount:0,
        articleSource:'',
        categoryName:''
      },
      content:'',
      commentList:[],
      commentLoading:false,
      imgUrl:process.env.VUE_APP_BASE_API+'/api',
    }
  },
  watch:{
  },
  methods: {
    getArticle() {
      getArticleById({id:this.id}).then((res) => {
        this.info = res;
      })
    },
    addComment() {
      if(this.content){
        addCommentApi({content:this.content,articleId:this.id}).then((res) => {
          this.$message({
            message: '发表成功！',
            type: 'success'
          });
          this.getwebList();
          this.content='';
        })
      }else{
        this.$message({
          message: '请输入内容！',
          type: 'warning'
        });
      }
    },
    getwebList() {
      this.commentLoading=true;
      getWebByArticleId({articleId:this.id}).then((res) => {
        this.commentList = res.records;
        this.commentLoading=false;
      })
    },
  },

  mounted() {
    this.utils.createParams(this,this.$route.query);
    window.scrollTo(0, 0);
    this.getArticle();
    this.getwebList();
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
    .title{
      font-size: 25px;
      font-weight: bold;
      text-align: center;
    }
    .count-item{
      display: flex;
      align-items: center;
      justify-content: center;
      color: #606060;
      margin-top: 30px;
      border-bottom: 1px dashed #deeae4;
      padding-bottom: 30px;
      .count{
        margin-right: 50px;
        font-size: 14px;
      }
    }
    .abstract{
      text-align: center;
      background: #eeeeee;
      margin-top: 20px;
      padding: 20px 15px;
      border-radius: 4px;
    }
    .news-detail{
      margin-top: 30px;
      text-indent: 25px;
      line-height: 30px;
      margin-bottom: 30px;
    }
    .comment-title{
      display: flex;
      align-items: center;
      margin: 30px 0;
      .line{
        width: 7px;
        height: 23px;
        border-radius: 20px;
        background: #0b6042;
        margin-right: 10px;
      }
      .comment{
        font-size: 19px;
        font-weight: bold;
        color: #0b6042;
      }
    }
   .btn-item{
     display: flex;
     align-items: center;
     justify-content:flex-end;
     cursor: pointer;
     .btn{
       width: 130px;
       height: 36px;
       background: #0b6042;
       color: #fff;
       border-radius: 5px;
       display: flex;
       align-items: center;
       justify-content: center;
       margin-top: 30px;
     }
   }
    .comment-block{
      display: flex;
      margin-bottom: 20px;
      .avatar{
        width: 55px;
        height: 55px;
        border-radius: 50%;
        margin-right: 15px;
      }
      .comment-info{
        .comment-name{
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .comment-text{
          font-size: 15px;
          line-height: 30px;
          margin-bottom: 5px;
        }
        .comment-time{
          color: #606060;
          font-size: 13px;
        }
      }
    }
  }
}
</style>
