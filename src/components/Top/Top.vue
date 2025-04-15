<template>
<div class="top-page pages">
  <div class="top-block content">
    <div class="top-item">
      <div class="title">96111机关网</div>
      <div class="time">今天是 {{time}}</div>
    </div>
    <el-dropdown @command="handleCommand" v-if="userInfo.realName">
      <span class="el-dropdown-link">
         {{userInfo.realName}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a">用户中心</el-dropdown-item>
        <el-dropdown-item command="b">修改密码</el-dropdown-item>
        <el-dropdown-item command="c">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="top-item"  v-else>
      <div class="item" @click="goRegister">注册</div>
      <div class="line"></div>
      <div class="item"  @click="goLogin">登录</div>
      <div class="line"></div>
      <div class="item"  @click="goNews">投稿</div>
    </div>
  </div>
</div>
</template>
<script >
import {getCurrentTime} from "@/utils/utils";
import {getAdminInfoByToken, loginOnApi} from "@/api/header";
import {getToken, removeToken} from "@/utils/auth";

export default {
  name: 'Top',
  data(){
    return {
      time:getCurrentTime('d'),
      userInfo:{
        realName:'',
      },
      adminUrl:process.env.VUE_APP_BASE_API
    }
  },
  watch:{
  },
  methods: {
    handleCommand(command) {
     if(command === "c"){
       this.loginOn()
     }
     else if(command === "a"){
       window.open(this.adminUrl+'/admin/#/maintain/user')
     }
     else if(command === "b"){
       window.open(this.adminUrl+'/admin/#/maintain/user')
     }
    },
    goLogin(){
      window.open(this.adminUrl+'/admin/#/login')
    },
    goRegister(){
      window.open(this.adminUrl+'/admin/#/register')
    },
    goNews(){
      window.open(this.adminUrl+'/admin/#/newsList')
    },
    getInfo(){
      getAdminInfoByToken().then((res) => {
        this.userInfo = res;
      })
    },
    loginOn(){
      this.$confirm('您确定要退出登录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        loginOnApi().then((res) => {
          this.userInfo = {};
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
          removeToken('token');
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    }
  },
  mounted() {
    if(getToken('token')){
      this.getInfo();
    }
  }
}
</script>



<style scoped lang="scss">
.top-page{
  background: #f2f2f2;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  .top-block{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .top-item{
      display: flex;
      align-items: center;
      color: #606060;
      cursor: pointer;
      .time{
        margin-left: 30px;
      }
      .line{
        width: 2px;
        height: 15px;
        background: #606060;
        margin: 0 20px;
      }
    }
  }
}
</style>
