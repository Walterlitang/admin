<template>
  <div class="search-pages pages">
    <Top></Top>
    <HeaderDetail @search="search"></HeaderDetail>
    <div class="search-content content">
      <div class="count">相关结果{{listPram.total}}个</div>
      <div class="select-block">
        <el-date-picker class="select-item"
            v-model="timeList"
            type="daterange"
            format="yyyy-MM-dd"
             value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
             :clearable="false"
        >
        </el-date-picker>
        <el-cascader
            :options="selectList"
            placeholder="请选择分类" v-model="selectIds"
            :props="{value:'id',label:'name',children:'child'}" filterable clearable></el-cascader>
        <div class="select-btn" @click="getList">搜索</div>
        <div class="select-btn1" @click="reset">重置</div>

      </div>
      <div class="search-block" v-if="listPram.records.length > 0">
        <div class="search-list" v-for="item in listPram.records" :key="item.id" @click="navigate(item.id)">
          <div class="title-item">
            <div class="title-type">{{item.categoryName}}</div>
            <div class="title">{{item.title}}</div>
          </div>
          <div class="text">{{item.pick}}</div>
          <div class="time-item">
            <div class="time">发布时间：{{item.createTime}}</div>
            <div class="time">浏览量：{{item.viewCount}}</div>
            <div class="time">文章出处：{{item.articleSource}}</div>
          </div>
        </div>
      </div>
      <el-empty description="暂无数据" v-else class="empty"></el-empty>
      <el-pagination class="pagination"
          layout="prev, pager, next"
          :total="listPram.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange">
      </el-pagination>
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
import {getArticleTreeApi, getNavigationTree} from "@/api/header";
import HeaderDetail from "@/components/Header/HeaderDetail.vue";

export default {
  components: {HeaderDetail, NewsList, Footer, Header, Top},
  data() {
    return {
      listPram:{
        records:[],
        page:1,
        size:10,
        total:0,
      },
     selectList:[],
      timeList:[],
      selectLoading:false,
      startTime:'',
      endTime:'',
      cid:'',
      selectIds:[]
  }
  },
  watch:{
  },
  methods: {
    navigate(id){
      this.$router.push({ path: '/newsDetail', query: { id:id }})
    },
    search(e){
      this.keyword=e;
      this.getList()
    },
    reset(){
      this.timeList = [];
      this.selectIds = [];
      this.cid = '';
      this.startTime='';
      this.endTime='';
      this.getList();
    },
    getList() {
      this.selectLoading = true;
      if(this.timeList.length > 0){
        this.startTime = this.timeList[0]
        this.endTime = this.timeList[1]
      }
      if(this.selectIds.length > 1){
        this.cid = this.selectIds[1]
      }else{
        this.cid = this.selectIds[0]
      }
      console.log(this.selectIds)
      console.log(this.cid)
      getArticleListApi({page:this.listPram.page,size:this.listPram.size,title:this.keyword,startTime:this.startTime,endTime:this.endTime,cid:this.cid}).then((res) => {
        this.listPram = res;
        this.selectLoading = false;
      }).finally(() => {
        this.selectLoading = false;
      })
    },
    getNavigation() {
      getArticleTreeApi().then((res) => {
        this.selectList = res;
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
  },

  mounted() {
    this.utils.createParams(this,this.$route.query);
    this.getList();
    this.getNavigation();
  }
}
</script>
<style scoped>
.el-input__inner{
  width: 380px !important;
}
</style>
<style scoped lang="scss">
.search-pages {
  display: flex;
  flex-direction: column;
  align-items: center;
  .search-content{
    background-color: #FFFFFF;
    padding:40px 20px;
    .count{
      color: #606060;
      font-size: 15px;
    }
    .select-block{
      margin-top: 20px;
      display: flex;
      align-items: center;
      .select-item{
        margin-right: 20px;
      }
      .select-btn{
        margin-left: 40px;
        width: 100px;
        height: 36px;
        background: #0b6042;
        color: #FFFFFF;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
      .select-btn1{
        margin-left: 20px;
        width: 100px;
        height: 36px;
        border: 1px solid #0b6042;
        color: #0b6042;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
    }
    .search-block{
      margin-top: 20px;
      cursor: pointer;
      .search-list{
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        .title-item{
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          .title-type{
            padding: 5px 10px;
            background: #147654;
            color: #FFFFFF;
            font-size: 15px;
            margin-right: 10px;
          }
          .title{
            width: calc(100% - 200px);
            font-size: 17px;
            color: #0b6042;
            font-weight: bold;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .text{
          font-size: 15px;
          line-height: 26px;
          word-break: break-all;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          /* 超出几行省略 */
          overflow: hidden;
        }
        .time-item{
          display: flex;
          align-items: center;
          margin-top: 10px;
          .time{
            font-size: 14px;
            color: #606060;
            margin-right: 40px;
          }
        }
      }
    }
    .pagination{
      text-align: center;
    }
  }
}
</style>
