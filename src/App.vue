<template>
  <div id="app" :style="dynamicStyles">
    <router-view/>
  </div>
</template>

<script>
import {getWebsiteDetailApi} from "@/api/mailbox";

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      background:'',
      backgroundImage:'',
      imgUrl:'',
    }
  },
  computed: {
    dynamicStyles() {
      return {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top',
        backgroundColor: this.background,
        backgroundImage: this.backgroundImage ? `url(${this.backgroundImage})` : '',
        backgroundSize: '100% 500px', // 固定或根据需要动态设置

      };
    }
  },
  methods: {
    getWebsiteConfig() {
      getWebsiteDetailApi().then((res) => {
        this.background = res.background;
        this.backgroundImage = this.imgUrl+res.backgroundImage;
      })
    }

  },
  mounted() {
    this.imgUrl=process.env.VUE_APP_BASE_API+'/api'
    this.getWebsiteConfig();
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  border: none;
  box-sizing: border-box;
  text-decoration: none;
  outline: none;
}
.pages{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  //background-image: url("~@/assets/home/body.png") ;
  //background-size: 100%;
  background-repeat: no-repeat;
  background-position: top;
  //background-color: #d7e8e2;
}

 .content{
  width: 1200px;
}
 .empty{
   width: 100%;
   display: flex;
   justify-content: center;
 }
div,
text,
input,
button,
image {
  box-sizing: border-box;
}
</style>
