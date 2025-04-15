<template>
  <div class="newsList pages">
    <Top></Top>
    <HeaderDetail></HeaderDetail>
    <div class="newsDetail-content content">
      <div class="consultant-detail">
        <div class="profile-container">
          <!-- 左侧 -->
          <div class="left-section">
            <div class="personal-info">
              <img :src="imgUrl+consultant.profilePicture" alt="Profile Picture" class="profile-photo"/>
              <div class="bio">{{ consultant.introduction }}</div>
            </div>
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
import { getPersonInfoApi} from "@/api/news";

export default {
  components: { Footer, HeaderDetail, Top},
  data() {
    return {
      activeTab: 'activities',
      commentLoading:false,
      consultant: {
      },
      imgUrl:process.env.VUE_APP_BASE_API+'/api',
    }
  },
  methods: {
    getPersonInfo() {
      this.commentLoading = true;
      getPersonInfoApi({id:this.id}).then((res) => {
        this.consultant = res;
        this.commentLoading = false;
      }).finally(() => {
        this.commentLoading = false;
      })
    },
  },

  mounted() {
    this.utils.createParams(this,this.$route.query);
    window.scrollTo(0, 0);
    this.getPersonInfo();

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
    .consultant-detail {
      display: flex;
      justify-content: center;
    }
    .profile-container {
      display: flex;
      width: 80%;
      margin-top: 20px;
    }
    .left-section {
      width: 80%;
      padding-right: 20px;
      border-right: 1px solid #ddd;
    }
    .personal-info {
      display: flex;
      align-items: center;
      margin-bottom: 40px;
    }
    .profile-photo {
      width: 100px;
      height: 120px;
      border-radius: 5%;
      margin-right: 20px;
    }
    .bio {
      font-size: 16px;
      margin-left: 10px;
      text-indent: 25px;
      line-height: 30px;
    }
    .right-section {
      width: 20%;
      padding-left: 20px;
    }
    .section-header {
      font-weight: bold;
      margin-bottom: 10px;
    }
    .avatars-container {
      display: flex;
      flex-wrap: wrap;
    }
    .avatar-small {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin: 5px;
    }

  }
 }
</style>
