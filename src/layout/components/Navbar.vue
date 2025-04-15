<template>
  <div class="navbar" :style="{backgroundImage: 'url(' + backgroundImages + ')'}">
    <div class="toplogo-box" :style="{backgroundImage: 'url(' + topLogo + ')'}"></div>
    <div class="toplogo-box-title">{{siteName}}</div>
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    <div class="right-menu">
      <el-dropdown
        class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          {{ UserInfo.realName}}<i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>主页</el-dropdown-item>
          </router-link>
          <router-link :to="{ path: '/maintain/user' }">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <el-dropdown-item @click.native="logout">
            <span>退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import Cookies from "js-cookie";
import {addClass, removeClass} from "@/utils";
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      UserInfo: JSON.parse(Cookies.get("UserInfo")),
      topLogo: require("@/assets/imgs/logo.png"),
      backgroundImages: require("@/assets/imgs/top_bg.jpg"),
    };
  },
  watch: {
    show(value) {
      if (value && !this.clickNotClose) {
        this.addEventClick()
      }
      if (value) {
        addClass(document.body, 'showRightPanel')
      } else {
        removeClass(document.body, 'showRightPanel')
      }
    }
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "siteName"]),
  },
  mounted() {

  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 85px;
  overflow: hidden;
  position: fixed;
  top: 0;
  background: #fff;
  z-index: 9;
  background-size: 100% 100%;
  color:#fff;
  // box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .toplogo-box{
    width:75px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
    background-size: 60% auto;
    background-repeat: no-repeat;
    background-position: center 17px;
  }
  .toplogo-box-title{
    line-height: 85px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
    font-family: "fzhzgbjianti";
    font-size:28px;
    padding-right:20px;
  }

  .hamburger-container {
    line-height: 85px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;

    .el-breadcrumb__inner,
    .el-breadcrumb__inner a {
      color:#fff !important;
    }
  }

  .topmenu-container {
    position: absolute;
    left: 50px;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    /*float: right;
    height: 100%;
    line-height: 85px;*/
    display:flex;
    height:100%;
    align-items: center;
    justify-content: end;

    &:focus {
      outline: none;
    }

    .message-container{
      display: inline-block;
      height:100%;
      font-size: 19px;
      vertical-align: text-bottom;
      padding-top:1px;

      .have-message-icon{
        color:#fff;
        cursor: pointer;
        opacity: 0.99;
      }
      .no-message-icon{
        color:#ccc;
        cursor: default;
        opacity: 0.5;
      }

      .shaky { display: inline-block; padding: 1px; -webkit-transform-origin: center center; -ms-transform-origin: center center; transform-origin: center center; -webkit-animation-name: shaky-slow; -ms-animation-name: shaky-slow; animation-name: shaky-slow; -webkit-animation-duration: 4s; -ms-animation-duration: 4s; animation-duration: 4s; -webkit-animation-iteration-count: infinite; -ms-animation-iteration-count: infinite; animation-iteration-count: infinite; -webkit-animation-timing-function: ease-in-out; -ms-animation-timing-function: ease-in-out; animation-timing-function: ease-in-out; -webkit-animation-delay: 0s; -ms-animation-delay: 0s; animation-delay: 0s; -webkit-animation-play-state: running; -ms-animation-play-state: running; animation-play-state: running; } @-webkit-keyframes shaky-slow { 0% { -webkit-transform: translate(0px, 0px) rotate(0deg) } 2% { -webkit-transform: translate(-1px, 1.5px) rotate(1.5deg) } 4% { -webkit-transform: translate(1.3px, 0px) rotate(-0.5deg) } 6% { -webkit-transform: translate(1.4px, 1.4px) rotate(-2deg) } 8% { -webkit-transform: translate(-1.3px, -1px) rotate(-1.5deg) } 10% { -webkit-transform: translate(1.4px, 0px) rotate(-2deg) } 12% { -webkit-transform: translate(-1.3px, -1px) rotate(-2deg) } 14% { -webkit-transform: translate(1.5px, 1.3px) rotate(1.5deg) } 16% { -webkit-transform: translate(1.5px, -1.5px) rotate(-1.5deg) } 18% { -webkit-transform: translate(1.3px, -1.3px) rotate(-2deg) } 20% { -webkit-transform: translate(1px, 1px) rotate(-0.5deg) } 22% { -webkit-transform: translate(1.3px, 1.5px) rotate(-2deg) } 24% { -webkit-transform: translate(-1.4px, -1px) rotate(2deg) } 26% { -webkit-transform: translate(1.3px, -1.3px) rotate(0.5deg) } 28% { -webkit-transform: translate(1.6px, -1.6px) rotate(-2deg) } 30% { -webkit-transform: translate(-1.3px, -1.3px) rotate(-1.5deg) } 32% { -webkit-transform: translate(-1px, 0px) rotate(2deg) } 34% { -webkit-transform: translate(1.3px, 1.3px) rotate(-0.5deg) } 36% { -webkit-transform: translate(1.3px, 1.6px) rotate(1.5deg) } 38% { -webkit-transform: translate(1.3px, -1.6px) rotate(1.5deg) } 40% { -webkit-transform: translate(-1.4px, -1px) rotate(-0.5deg) } 42% { -webkit-transform: translate(-1.4px, 1.3px) rotate(-0.5deg) } 44% { -webkit-transform: translate(-1.6px, 1.4px) rotate(0.5deg) } 46% { -webkit-transform: translate(-2.1px, -1.3px) rotate(-0.5deg) } 48% { -webkit-transform: translate(1px, 1.6px) rotate(1.5deg) } 50% { -webkit-transform: translate(1.6px, 1.6px) rotate(1.5deg) } 52% { -webkit-transform: translate(-1.4px, 1.6px) rotate(0.5deg) } 54% { -webkit-transform: translate(1.6px, -1px) rotate(-2deg) } 56% { -webkit-transform: translate(1.3px, -1.6px) rotate(-2deg) } 58% { -webkit-transform: translate(-1.3px, -1.6px) rotate(0.5deg) } 60% { -webkit-transform: translate(1.3px, 1.6px) rotate(-0.5deg) } 62% { -webkit-transform: translate(0px, 0px) rotate(-1.5deg) } 64% { -webkit-transform: translate(-1.6px, -1.6px) rotate(-2deg) } 66% { -webkit-transform: translate(1.6px, -1.6px) rotate(0.5deg) } 68% { -webkit-transform: translate(0px, -1.6px) rotate(-2deg) } 70% { -webkit-transform: translate(-1.6px, 1px) rotate(1.5deg) } 72% { -webkit-transform: translate(-1.6px, 1.6px) rotate(2deg) } 74% { -webkit-transform: translate(1.3px, -1.6px) rotate(-0.5deg) } 76% { -webkit-transform: translate(1.4px, 1px) rotate(-0.5deg) } 78% { -webkit-transform: translate(-1px, 1.4px) rotate(2deg) } 80% { -webkit-transform: translate(1.4px, 1.6px) rotate(2deg) } 82% { -webkit-transform: translate(-1.6px, -1.6px) rotate(-0.5deg) } 84% { -webkit-transform: translate(-1.4px, 1.4px) rotate(-2deg) } 86% { -webkit-transform: translate(1px, 1.4px) rotate(-2deg) } 88% { -webkit-transform: translate(-1.4px, 1.4px) rotate(-1.5deg) } 90% { -webkit-transform: translate(-1.6px, -1.6px) rotate(-2deg) } 92% { -webkit-transform: translate(-1.6px, 1.6px) rotate(2deg) } 94% { -webkit-transform: translate(-1.6px, -1.6px) rotate(-2deg) } 96% { -webkit-transform: translate(-1.4px, 1.3px) rotate(-2deg) } 98% { -webkit-transform: translate(1.3px, 1px) rotate(-0.5deg) } } @keyframes shaky-slow { 0% { transform: translate(0px, 0px) rotate(0deg) } 2% { transform: translate(-1px, 1.5px) rotate(1.5deg) } 4% { transform: translate(1.3px, 0px) rotate(-0.5deg) } 6% { transform: translate(1.4px, 1.4px) rotate(-2deg) } 8% { transform: translate(-1.3px, -1px) rotate(-1.5deg) } 10% { transform: translate(1.4px, 0px) rotate(-2deg) } 12% { transform: translate(-1.3px, -1px) rotate(-2deg) } 14% { transform: translate(1.5px, 1.3px) rotate(1.5deg) } 16% { transform: translate(1.5px, -1.5px) rotate(-1.5deg) } 18% { transform: translate(1.3px, -1.3px) rotate(-2deg) } 20% { transform: translate(1px, 1px) rotate(-0.5deg) } 22% { transform: translate(1.3px, 1.5px) rotate(-2deg) } 24% { transform: translate(-1.4px, -1px) rotate(2deg) } 26% { transform: translate(1.3px, -1.3px) rotate(0.5deg) } 28% { transform: translate(1.6px, -1.6px) rotate(-1.5deg) } 30% { transform: translate(-1.3px, -1.3px) rotate(-1.5deg) } 32% { transform: translate(-1px, 0px) rotate(2deg) } 34% { transform: translate(1.3px, 1.3px) rotate(-0.5deg) } 36% { transform: translate(1.3px, 1.6px) rotate(1.5deg) } 38% { transform: translate(1.3px, -1.6px) rotate(1.5deg) } 40% { transform: translate(-1.4px, -1px) rotate(-0.5deg) } 42% { transform: translate(-1.4px, 1.3px) rotate(-0.5deg) } 44% { transform: translate(-1.6px, 1.4px) rotate(0.5deg) } 46% { transform: translate(-2.1px, -1.3px) rotate(-0.5deg) } 48% { transform: translate(1px, 1.6px) rotate(1.5deg) } 50% { transform: translate(1.6px, 1.6px) rotate(1.5deg) } 52% { transform: translate(-1.4px, 1.6px) rotate(0.5deg) } 54% { transform: translate(1.6px, -1px) rotate(-2deg) } 56% { transform: translate(1.3px, -1.6px) rotate(-2deg) } 58% { transform: translate(-1.3px, -1.6px) rotate(0.5deg) } 60% { transform: translate(1.3px, 1.6px) rotate(-0.5deg) } 62% { transform: translate(0px, 0px) rotate(-1.5deg) } 64% { transform: translate(-1.6px, -1.6px) rotate(-2deg) } 66% { transform: translate(1.6px, -1.6px) rotate(0.5deg) } 68% { transform: translate(0px, -1.6px) rotate(-2deg) } 70% { transform: translate(-1.6px, 1px) rotate(1.5deg) } 72% { transform: translate(-1.6px, 1.6px) rotate(2deg) } 74% { transform: translate(1.3px, -1.6px) rotate(-0.5deg) } 76% { transform: translate(1.4px, 1px) rotate(-0.5deg) } 78% { transform: translate(-1px, 1.4px) rotate(2deg) } 80% { transform: translate(1.4px, 1.6px) rotate(2deg) } 82% { transform: translate(-1.6px, -1.6px) rotate(-0.5deg) } 84% { transform: translate(-1.4px, 1.4px) rotate(-2deg) } 86% { transform: translate(1px, 1.4px) rotate(-2deg) } 88% { transform: translate(-1.4px, 1.4px) rotate(-1.5deg) } 90% { transform: translate(-1.6px, -1.6px) rotate(-2deg) } 92% { transform: translate(-1.4px, 1.6px) rotate(2deg) } 94% { transform: translate(-1.6px, -1.6px) rotate(-2deg) } 96% { transform: translate(-1.4px, 1.3px) rotate(-2deg) } 98% { transform: translate(1.3px, 1px) rotate(-0.5deg) } }
    }

    .right-menu-item {
      //display: inline-block;
      display:flex;
      align-items: center;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      //color: #5a5e66;
      color:#ffffff;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;
        font-size: 14px;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
