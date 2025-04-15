<template>
  <div class="mailbox-pages ">
    <Top></Top>
    <div class="top-block" v-if="type">
      <div class="top-item">
        <div class="top-title" v-if="type==1">首长信箱</div>
        <div class="top-title" v-else>纪检信箱</div>
        <div class="top-btn">反映问题、提出建议</div>
      </div>
      <img src="@/assets/mailbox/icon.png" alt="" class="top-img">
    </div>
    <div class="top-block" v-else>
      <img :src="imgUrl+info.backgroundImage" alt="" style="width: 100%;height: 100%;">
    </div>
    <div class="mailbox-content content">
       <div class="img-block" v-loading="imgLoading" v-if="type==1">
         <div class="img-box" style="margin-bottom: 25px;color: #0b6042;font-weight: bold">首长列表</div>
         <div class="img-box" v-for="item in imgList" :key="item.id" @click="openDialog(item.id)">
           <div class="img-name">{{item.surname}}{{item.position}}</div>
           <div class="no-count">{{item.repliesCount}}</div>
           <div class="count">/{{item.letterCount}}</div>
         </div>
       </div>
       <div class="message-block" :class="type==2?'active':''">
         <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 30px">
           <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
           <el-breadcrumb-item v-if="type==1">首长信箱</el-breadcrumb-item>
           <el-breadcrumb-item v-if="type==2">纪检信箱</el-breadcrumb-item>
           <el-breadcrumb-item v-else>{{info.name}}</el-breadcrumb-item>
         </el-breadcrumb>
         <div class="message-describe">
           <div class="message-title">留言说明</div>
           <div class="message-content" v-if="type==1">{{chiefMailboxInstructions}}</div>
           <div class="message-content" v-if="type==2">{{disciplineMailboxInstructions}}</div>
           <div class="message-content" v-else>{{info.messageExplanation}}</div>
           <div class="btn-item" @click="editDialog.visible=true">
             <div class="btn" v-if="type==1">首长信箱留言入口</div>
             <div class="btn" v-else-if="type==2">纪委信箱留言入口</div>
             <div class="btn" v-else>{{info.name}}留言入口</div>
           </div>
         </div>
         <div class="title-item">
           <div class="title">收到的全部公开信件</div>
         </div>
         <div class="mailbox-list" v-loading="loading" v-if="listPram.records.length">
           <div class="message-list" v-for="item in listPram.records" :key="item.id">
             <img :src="imgUrl + item.profilePicture" alt="" class="message-img">
             <div class="message-info">
               <div class="message-name">{{item.userName}}</div>
               <div class="message-name">{{item.title}}</div>
               <div class="message-text">{{item.content}}</div>
               <div class="time-block">
                 <div class="time-item">
                   <div class="time">留言时间：{{item.createTime}}</div>
                   <div class="time green" v-if="item.isReply===1">状态：已回复</div>
                   <div class="time" v-else>状态：未回复</div>
                 </div>
                 <div class="btn cancel" v-if="item.isReply===1">查看</div>
                 <div class="btn normal" v-else @click="goReply">去回复</div>
               </div>
             </div>
           </div>
         </div>
         <el-empty description="暂无数据" v-else class="empty"></el-empty>
         <el-pagination style="text-align: center;margin-top: 30px"
                        layout="prev, pager, next"
                        :total="listPram.total"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange">
         </el-pagination>
       </div>
    </div>
    <el-dialog
        :visible.sync="editDialog.visible"
        :title="'我向首长说句话'"
        destroy-on-close
        :close-on-click-modal="false"
        top="250px"
        width="700px">
      <edit
          v-if="editDialog.visible"
          :type="type"
          :id="editDialog.id"
          @hideEditDialog="hideEditDialog"
          ref="editForm"
      />
    </el-dialog>
    <Footer></Footer>
  </div>
</template>

<script>
import Top from "@/components/Top/Top.vue";
import Header from "@/components/Header/Header.vue";
import Footer from "@/components/Footer/Footer.vue";
import edit from './edit'
import {getChiefListApi, getWebiteDetailsApi, getWebiteListApi, getWebsiteDetailApi} from "@/api/mailbox";

export default {
  components: {Footer, Header, Top, edit},
  data() {
    return {
      listPram:{
        records:[],
        page:1,
        size:10,
        total:0,
      },
      loading:false,
      imgLoading:false,
      imgList:[],
      type:1,
      chiefMailboxInstructions:'',//首长信箱说明
      disciplineMailboxInstructions:'',//首长信箱说明
      imgUrl:process.env.VUE_APP_BASE_API+'/api',
      editDialog: {
        visible: false,
        editDate: {},
        id:null
      },
      adminUrl:process.env.VUE_APP_BASE_API,
      info:{
        name:'',
        messageExplanation:'',
        backgroundImage:''
      }
    }
  },
  watch:{
  },
  methods: {
    goReply(){
      this.type === 1 && window.open(this.adminUrl+'/admin/#/chief-mailbox')
      this.type === 2 && window.open(this.adminUrl+'/admin/#/discipline-inspection-mailbox')
    },
    openDialog(id){
      this.editDialog.visible = true;
      this.editDialog.id = id;
    },
    navigate(id){
      this.$router.push({ path: '/newsDetail', query: { id:id }})
    },
    getType(e){
      this.type = e;
    },
    hideEditDialog() {
      this.editDialog.visible = false
      this.getList()
    },
    getList() {
      this.loading = true;
      getWebiteListApi({page:this.listPram.page,size:this.listPram.size,type:this.type}).then((res) => {
        this.listPram = res;
        this.loading = false;
      }).finally(() => {
        this.selectLoading = false;
      })
    },
    getList1() {
      this.loading = true;
      getWebiteListApi({page:this.listPram.page,size:this.listPram.size,id:this.id}).then((res) => {
        this.listPram = res;
        this.loading = false;
      }).finally(() => {
        this.selectLoading = false;
      })
    },
    getChiefLis() {
      this.imgLoading=true;
      getChiefListApi().then((res) => {
        this.imgLoading=false;
        this.imgList = res.records;
      })
    },
    getWebiteDetails() {
      getWebiteDetailsApi({id:this.id}).then((res) => {
        this.info = res;
      })
    },
    getWebsiteDetail() {
      getWebsiteDetailApi({id:1}).then((res) => {
        this.chiefMailboxInstructions = res.chiefMailboxInstructions;
        this.disciplineMailboxInstructions = res.disciplineMailboxInstructions;
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
    window.scrollTo(0, 0);
    this.type = this.$route.query.type;
    if(this.type){
      this.getList();
    }
    this.getChiefLis();
    this.getWebsiteDetail();
    if(this.id){
      this.getWebiteDetails();
      this.getList1();
    }
  }
}
</script>
<style scoped>
</style>
<style scoped lang="scss">
.mailbox-pages {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f9f9fa;
  .top-block{
    width: 100%;
    height: 400px;
    background: url("@/assets/mailbox/bg.png") no-repeat center;
    display: flex;
    justify-content: center;
    align-items: center;
    .top-item{
      margin-right: 60px;
      .top-title{
        font-size: 85px;
        font-weight: bold;
        margin-bottom: 30px;
        background: linear-gradient(to right, #025939, #09ae72);
        -webkit-background-clip: text;
        color: transparent;
      }
      .top-btn{
        height: 50px;
        background: linear-gradient(to right, #025939, #09ae72);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 30px;
        color: #FFFFFF;
        font-size: 20px;
      }
    }
    .top-img{
      width: 300px;
    }
  }
  .mailbox-content{
    display: flex;
    justify-content: space-between;
    .img-block{
      background: #FFFFFF;
      padding: 20px ;
      width: 180px;
      cursor: pointer;
      .img-box{
        width: 100%;
        height: 40px;
        margin-bottom: 15px;
        background: #def1eb;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        .img-name{
          text-align: center;
          font-size: 15px;
          color: #0b6042;
          font-weight: bold;
        }
        .no-count{
          color: #d71518;
          margin-left: 4px;
          font-size: 15px;
        }
        .count{
          color: #0b6042;
          font-size: 15px;
        }
      }
    }
    .message-block.active{
      width: 100%;
    }
    .message-block{
      padding:20px 30px;
      background: #FFFFFF;
      display: flex;
      flex-direction: column;
      width: calc(100% - 200px);
      .message-describe{
        background: #def1eb;
        padding: 20px 15px;
        border-radius: 10px;
        .message-title{
          text-align: center;
          font-size: 19px;
          font-weight: bold;
          color: #0b6042;
          margin-bottom: 10px;
        }
        .message-content{
          font-size: 15px;
          line-height: 26px;
          text-indent: 32px;
        }
        .btn-item{
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 20px;
          cursor: pointer;
          .btn{
            padding: 6px 30px;
            background: #025738;
            color: #FFFFFF;
            border-radius: 20px;
            font-size: 15px;
          }
        }
      }

    }
    .title-item{
      width: 100%;
      margin-top: 30px;
      border-bottom: 1px solid #d8d8d8;
      .title{
        width: 150px;
        border-bottom: 2px solid #0b6042;
        padding-bottom: 15px;
      }
    }
    .mailbox-list{
      margin-top: 30px;
      .message-list:last-child{
        border-bottom: none;
        margin-bottom: 0;
      }
      .message-list{
        display: flex;
        border-bottom: 1px solid #f5f5f5;
        padding-bottom: 15px;
        margin-bottom: 15px;
        .message-img{
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin-right: 20px;
        }
        .message-info{
          width: calc(100% - 80px);
          .message-name{
            font-weight: bold;
            font-size: 16px;
            margin-bottom: 15px;
          }
          .message-text{
            font-size: 15px;
            background: #eeeeee;
            padding: 10px 15px;
            border-radius: 5px;
            margin-bottom: 15px;
            line-height: 30px;
          }
          .time-block{
            display: flex;
            align-items: center;
            justify-content: space-between;
            .time-item{
              display: flex;
              align-items: center;
              .time{
                font-size: 14px;
                color: #606060;
                margin-right: 30px;
              }
              .green{
                color: #0b6042;
              }
            }
            .btn{
              width: 80px;
              height: 32px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 30px;
              font-size: 15px;
              cursor: pointer;
            }
            .normal{
              background: #025738;
              color: #FFFFFF;
            }
            .cancel{
              color: #025738;
              border: 1px solid #025738;
            }
          }
        }
      }
    }
  }
}
</style>
