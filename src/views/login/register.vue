<template>
  <div class="page-account" :style="{ backgroundImage: 'url(' + backgroundImages + ')'}">
    <div class="container" :class="[ fullWidth > 768 ? 'containerSamll':'containerBig']">
      <template v-if="fullWidth>768">
        <img style="width: 350px" :src="swiperPic" alt="">
      </template>
      <div class="index_from page-account-container">
        <div class="page-account-top ">
          <div class="page-account-top-logo">
            <span class="toplogo-box-title">96111部队强军网<br/>管理后台</span>
          </div>
        </div>
        <div style="display: flex;align-items: center;justify-content: center;margin-bottom: 20px">
          <div style="width: 90px;display: flex;align-items: center;">
            <div style="color: #ff4949;padding-top: 4px;margin-right: 4px">*</div>
            <div style="font-size: 14px;color: #606266;font-weight: bold">角色：</div>
          </div>
          <el-radio-group v-model="loginForm.roleId" class="form-info">
            <el-radio :label="4">单位</el-radio>
            <el-radio :label="5">个人</el-radio>
          </el-radio-group>
        </div>

        <el-form v-if="loginForm.roleId==4"
            ref="loginForm" label-width="90px"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            autocomplete="on"
            label-position="left"
            @keyup.enter="handleRegister"
        >
          <el-form-item label="选择单位:" prop="departmentName">
            <el-select v-model="loginForm.departmentName" placeholder="请选择单位" class="form-info">
              <el-option  v-for="item in options"  :key="item.name" :label="item.name" :value="item.name" />
            </el-select>
          </el-form-item>

          <el-form-item label="用户名:" prop="username">
            <el-input  placeholder="请输入用户名" class="form-info" v-model="loginForm.username" type="text"  maxlength="16" />
          </el-form-item>

          <el-form-item label="密码:" prop="password">
              <el-input :key="passwordType"  class="form-info" v-model="loginForm.password" :type="passwordType" placeholder="请输入密码" tabindex="2" maxlength="25"/>
              <span class="show-pwd" @click="showPwd" style="margin-left: 10px;">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
          </el-form-item>

          <el-form-item prop="code"  label="验证码:">
            <div class="captcha">
              <el-input
                  ref="username"
                  v-model="loginForm.code"
                  style="width: 70%;"
                  prefix-icon="el-icon-message"
                  placeholder="验证码"
                  name="username"
                  type="text"
                  maxlength="4"
                  tabindex="3"
                  autocomplete="on"
              />
              <div class="imgs" @click="getCaptcha()">
                <img :src="captchaImg" style="margin-left: 10px;" />
              </div>
            </div>
          </el-form-item>
        </el-form>
        <el-form v-else
            ref="loginForm" label-width="90px"
            :model="loginForm"
            :rules="loginRules1"
            class="login-form"
            autocomplete="on"
            label-position="left"
            @keyup.enter="handleRegister"
        >
          <el-form-item label="真实姓名:" prop="realName">
            <el-input v-model="loginForm.realName"  placeholder="请输入真实姓名" class="form-info"type="text"
                      maxlength="10"/>
          </el-form-item>

          <el-form-item label="用户:" prop="username">
            <el-input
                placeholder="请输入用户名"
                class="form-info"
                v-model="loginForm.username"
                type="text"
                maxlength="10"
            />
          </el-form-item>

          <el-form-item label="密码:" prop="password">
            <el-input
                :key="passwordType"
                class="form-info"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="密码"
                tabindex="2"
                maxlength="25"
            />
            <span class="show-pwd" @click="showPwd" style="margin-left: 10px;">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
          </el-form-item>

          <el-form-item prop="code"  label="验证码:">
            <div class="captcha">
              <el-input
                  ref="username"
                  v-model="loginForm.code"
                  style="width: 70%;"
                  prefix-icon="el-icon-message"
                  placeholder="验证码"
                  name="username"
                  type="text"
                  maxlength="4"
                  tabindex="3"
                  autocomplete="on"
              />
              <div class="imgs" @click="getCaptcha()">
                <img :src="captchaImg" style="margin-left: 10px;" />
              </div>
            </div>
          </el-form-item>
        </el-form>
        <div>
          <el-button :loading="loading" type="primary" style="width: 100%;" @click.native.prevent="handleRegister">
            注册
          </el-button>
          <el-button type="text" @click="goToLogin">已有账号，去登录</el-button>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import "@/assets/js/canvas-nest.min.js";
import {captcha,getUnitList,register} from "@/api/register";
import SvgIcon from "@/components/SvgIcon/index.vue";

export default {
  name: 'Login',
  components: {SvgIcon},
  data() {
    //data
    return {
      captchaImg: '',
      swiperPic:require("@/assets/imgs/left_banner.jpg"),
      backgroundImages:require("@/assets/imgs/bg.jpg"),
      fullWidth: document.body.clientWidth,
      loginForm: {
        username: '', // admin
        password: '',
        key: '',
        code: '',
        roleId: 4,
        realName: '',
        departmentName: ''
      },
      options: [],
      loginRules: {
        departmentName: [{ required: true, message: '请选择单位', trigger: 'change' }],
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      loginRules1:{
        realName: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }],
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      passwordType: 'password',
      loading: false,
      redirect: undefined,
      otherQuery: {},

    }
  },
  watch: {
    fullWidth(val) {
      if (!this.timer) {
        this.screenWidth = val
        this.timer = true
        const that = this
        setTimeout(function () {
          // 打印screenWidth变化的值
          that.timer = false
        }, 400)
      }
    },
    $route: {
      handler: function (route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  computed: {
    siteName() {
      return this.$store.getters.siteName
    }
  },
  beforeCreate() {
    if (this.fullWidth < 768) {
      document
          .getElementsByTagName("canvas")[0]
          .removeAttribute("class", "index_bg");
    }
  },
  created() {
    const _this = this
    document.onkeydown = function () {
      if (_this.$route.path.indexOf('login') !== -1) {
        const key = window.event.keyCode
        if (key === 13) {
          _this.handleLogin()
        }
      }
    }
    window.addEventListener('resize', this.handleResize)
  },
  mounted() {
    this.$nextTick(() => {
      if (this.screenWidth < 768) {
        document
            .getElementsByTagName("canvas")[0]
            .removeAttribute("class", "index_bg");
      }
    });
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
    this.getCaptcha()
    this.getUnit()
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
    document
        .getElementsByTagName("canvas")[0]
        .removeAttribute("class", "index_bg");
  },
  destroyed() {

  },
  methods: {
    handleResize() {
      this.fullWidth = document.body.clientWidth
      if (this.fullWidth < 768) {
        document
            .getElementsByTagName("canvas")[0]
            .removeAttribute("class", "index_bg");
      }
    },

    //明文密码
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    goToLogin() {
      this.$router.push({ path: '/login' }); // 使用路由名称进行跳转
    },
    handleRegister() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if(!this.loginForm.roleId){
            this.$message({
              message: '请选择角色',
              type: 'error',
              duration: 3000, // 消息显示3秒
            });
            return
          }
          this.loading = true;
          register(this.loginForm).then(() => {
            // 显示注册成功的消息
            this.$message({
              message: '注册成功,3秒后自动跳转登录页面',
              type: 'success',
              duration: 3000, // 消息显示3秒
              onClose: () => {
                // 消息关闭后跳转到登录页
                this.$router.push({ path: '/login' });
              }
            });
          }).catch(() => {
            // 注册失败时重新获取验证码
            this.getCaptcha();
          }).finally(() => {
            this.loading = false;
          });
        }
      });
    },
    getCaptcha() {
      captcha().then(( data ) => {
        this.captchaImg = data.code
        this.loginForm.key = data.key
      }).catch(({ message }) => {
        this.$message.error(message)
      })
    },
    getUnit() {
      getUnitList().then(( data ) => {
        this.options = data
      }).catch(({ message }) => {
        this.$message.error(message)
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss" scoped>
$screen-md: 768px;
$font-size-base: 14px;
$animation-time: .3s;
$animation-time-quick: .15s;
$transition-time: .2s;
$ease-in-out: ease-in-out;
$subsidiary-color: #808695;
.toplogo-box-title{
  height: 100%;
  float: left;
  cursor: pointer;
  transition: background 0.3s;
  -webkit-tap-highlight-color: transparent;
  font-family: "fzhzgbjianti";
  font-size:34px;
  color:#4e93fe;
}
.form-info{
  width: 280px;
  text-align: start;
}

.page-account {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: auto;

  &-container {
    flex: 1;
    padding: 32px 0;
    text-align: center;
    width: 384px;
    margin: 0 auto;

    &-result {
      width: 100%;
    }
  }

  &-tabs {
    .ivu-tabs-bar {
      border-bottom: none;
    }

    .ivu-tabs-nav-scroll {
      text-align: center;
    }

    .ivu-tabs-nav {
      display: inline-block;
      float: none;
    }
  }

  &-top {
    padding: 32px 0;

    &-logo {
      img {
        max-height: 75px;
      }
    }

    &-desc {
      font-size: $font-size-base;
      color: $subsidiary-color;
    }
  }

  &-auto-login {
    margin-bottom: 24px;
    text-align: left;

    a {
      float: right;
    }
  }

  &-other {
    margin: 24px 0;
    text-align: left;

    span {
      font-size: $font-size-base;
    }

    img {
      width: 24px;
      margin-left: 16px;
      cursor: pointer;
      vertical-align: middle;
      opacity: 0.7;
      transition: all $transition-time $ease-in-out;

      &:hover {
        opacity: 1;
      }
    }
  }

  .ivu-poptip, .ivu-poptip-rel {
    display: block;
  }

  &-register {
    float: right;

    &-tip {
      text-align: left;

      &-title {
        font-size: $font-size-base;
      }

      &-desc {
        white-space: initial;
        font-size: $font-size-base;
        margin-top: 6px;
      }
    }
  }

  &-to-login {
    text-align: center;
    margin-top: 16px;
  }

  &-header {
    text-align: right;
    position: fixed;
    top: 16px;
    right: 24px;
  }
}

.labelPic {
  position: absolute;
  right: 0;
}

@media (min-width: $screen-md) {
  .page-account {
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .page-account-container {
    padding: 32px 0 24px 0;
    position: relative;
  }
}

.page-account {
  display: flex;
}

.page-account .code {
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-account .code .pictrue {
  height: 40px;
}

.swiperPross {
  border-radius: 6px 0px 0px 6px;
  overflow: hidden;
}

.swiperPross, .swiperPic, .swiperPic img {
  /*width: 286px;*/
  width: 350px;
  height: 100%;
}

.swiperPic img {
  width: 100%;
  height: 100%;
}

.container {
  height: 550px !important;
  padding: 0 !important;
  /*overflow: hidden;*/
  border-radius: 6px;
  z-index: 1;
  display: flex;
}

.containerSamll {
  /*width: 56% !important;*/
  /*width: 670px;*/
  width: 800px;
  background: #fff !important;
}

.containerBig {
  width: auto !important;
  background: #f7f7f7 !important;
}

.index_from {
  width: 400px;
  padding: 0 40px 32px 40px;
  height: 500px;
  box-sizing: border-box;
}

.page-account-top {
  margin: 20px 0 !important;
  padding: 20px 0 0px 0!important;
  box-sizing: border-box !important;
  display: flex;
  justify-content: center;
}

.page-account-container {
  border-radius: 0px 6px 6px 0px;
}

.btn {
  background: linear-gradient(90deg, rgba(25, 180, 241, 1) 0%, rgba(14, 115, 232, 1) 100%) !important;
}
</style>

<style lang="scss" scoped>
.captcha {
  display: flex;
  align-items: flex-start;
}

$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.imgs {
  height:36px;
  img {
    height: 100%;
  }
}

.login-form {
  position: relative;
  max-width: 100%;
  margin: 0 auto;
  overflow: hidden;
}

.tips {
  font-size: 14px;
  color: #fff;
  margin-bottom: 10px;

  span {
    &:first-of-type {
      margin-right: 16px;
    }
  }
}

.svg-container {
  padding: 6px 5px 6px 15px;
  color: $dark_gray;
  vertical-align: middle;
  width: 30px;
  display: inline-block;
}

.show-pwd {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 16px;
  color: $dark_gray;
  cursor: pointer;
  user-select: none;

  ::v-deep.svg-icon {
    vertical-align: 0.3em;
  }
}

.thirdparty-button {
  position: absolute;
  right: 0;
  bottom: 6px;
}



</style>
