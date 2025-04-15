<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
    <div class="footers">
      <el-link v-for="item in links" :key="item.key" :href="item.href" target="_blank" class="mr15 mb20">{{item.title}}</el-link>
      <div class="title mb15" v-text="copyright"></div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  data () {
    return {
      links: [],
      copyright: 'Copyright ◎ 2025 96111部队强军网'
    }
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
  .footers{
    text-align: center;
    font-size: 14px;
    color: #808695;
    .title{
      font-size: 14px;
      color: #808695;
      margin-top: 5px;
    }
  }

.fixed-header+.app-main {
  padding-top: 80px;
}

.hasTagsView {
  .app-main {
    background: #f5f5f5;
    height: calc(100vh - 135px);
    overflow-y: scroll;
  }
  .app-main::-webkit-scrollbar-track {
    background-color: #F5F5F5
  }

  .app-main::-webkit-scrollbar {
    width: 3px;
    background-color: #F5F5F5
  }

  .app-main::-webkit-scrollbar-thumb {
    background-color: #d6d6d6
  }

  .fixed-header+.app-main {
    padding-top: 80px;
  }
}
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>

