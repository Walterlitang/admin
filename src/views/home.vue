<template>
  <div class="home pages">
    <Top></Top>
    <Header></Header>
    <div class="home-content content">
      <div class="info-block">
        <div class="focus-block">
          <div class="focus">焦点<br>关注</div>
          <div class="focus-item" v-loading="focusLoading">
            <div class="focus-title" @click="goDetail(focusPages[0])" v-if="focusPages.length>0">{{focusPages[0].title||''}}</div>
            <div class="focus-content">
              <div v-for="item in focusPages.slice(1)" :key="item.id" class="focus-list" @click="goDetail(item)">《{{item.title}}》</div>
            </div>
          </div>
        </div>
        <div class="headlines-block white">
          <div class="headlines-carousel" v-loading="swiperLoading">
           <template v-if="swiperList.length>0">
             <el-carousel indicator-position="none" class="banner"  height="350px">
               <el-carousel-item v-for="item in swiperList" :key="item.id" >
                 <img :src="imgUrl+item.pic" alt="" class="img" @click="goDetail(item)"/>
                 <div class="headlines-name">{{item.title}}</div>
               </el-carousel-item>
             </el-carousel>
           </template>
            <el-empty description="暂无数据" v-else></el-empty>
          </div>
          <div class="headlines-item">
            <div class="title-item">
              <div class="headlines-icon title" @click="navigate(20)">时政头条</div>
              <div class="more" @click="navigate(20)">更多</div>
            </div>
            <div class="headlines-info" v-loading="focusLoading">
              <template v-if="headlinesList.length>0" >
                <div class="headlines-title" @click="goDetail(headlinesList[0])">{{headlinesList[0].title}}</div>
                <div class="headlines-content" @click="goDetail(headlinesList[0])">{{headlinesList[0].pick}}</div>
                <NewsList :list="headlinesList.slice(1)"></NewsList>
              </template>
              <el-empty description="暂无数据" v-else></el-empty>
            </div>
          </div>
        </div>
        <div class="scroll-block white">
          <div class="scroll-content1" v-loading="scrollLoading">
            <div class="scroll-info" @mouseenter="mEnter2" @mouseleave="mLeave2">
              <div class="scroll_list" :style="{ transform: `translateX(-${scrollOffset}px)` }">
                <div id="scrollItemBox" class="scroll-item-container">
                  <div class="scroll-item" v-for="(item, index) in scrollList" :key="item.fid" @click="goExternal(item.linkAddress)">
                    <img :src="imgUrl + item.icon" alt="" class="scroll-img">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="information-block">
          <img src="@/assets/columns/sadad.png" alt="" class="img">
          <div class="information-info">
            <div class="information-item">
              <div class="title-item">
                <div class="information-title title"  @click="navigate(3)">
                  <img src="@/assets/title/统帅足音.png" alt=""  style="width: 30px;margin-bottom: -4px">
                  统帅足音
                </div>
                <div class="more"  @click="navigate(3)">更多</div>
              </div>
               <NewsList :list="footList" v-loading="ListLoading"></NewsList>
            </div>
            <div class="information-item">
              <div class="title-item">
                <div class="information-title title" @click="navigate(4)">
                  <img src="@/assets/title/军委要讯.png" alt=""  style="width: 30px;margin-bottom: -4px">
                  军委要讯</div>
                <div class="more" @click="navigate(4)">更多</div>
              </div>
                <NewsList :list="newsPages" v-loading="ListLoading"></NewsList>
            </div>
            <div class="information-item">
              <div class="title-item">
                <div class="information-title title" @click="navigate(5)">
                  <img src="@/assets/title/火箭军快讯.png" alt=""  style="width: 30px;margin-bottom: -4px">
                  火箭军快讯</div>
                <div class="more" @click="navigate(5)">更多</div>
              </div>
              <template v-if="rocketPages.length>0">
                 <NewsListColumn :list="rocketPages" v-loading="ListLoading"></NewsListColumn>
              </template>
              <el-empty description="暂无数据" v-else></el-empty>
            </div>
          </div>
        </div>
        <div class="dynamics-block">
          <img src="@/assets/columns/111111.png" alt="" class="img">
          <div class="dynamics-item">
            <div class="dynamics-info">
              <div class="title-item">
                <div class="dynamics-title title" @click="navigate(7)">
                  <img src="@/assets/title/部队动态.png" alt=""  style="width: 30px;margin-bottom: -4px">
                  部队动态</div>
                <div class="more" @click="navigate(7)">更多</div>
              </div>
             <div class="dynamics-news">
               <div class="dynamics-menu" v-loading="menuLoading">
                 <div class="menu" v-for="item in menuList" :key="item.id" :class="menuTab===item.id?'active':''" @click="changeMenu(item.id)">{{item.name}}</div>
               </div>
               <div class="dynamics-list">
                 <div class="dynamics-top-item" v-if="dynamicsList.length>0" @click="goDetail(dynamicsList[0])">
                   <img :src="imgUrl+dynamicsList[0].pic" alt="" class="img"/>
                   <div class="dynamics-top-name">
                     <div class="dynamics-top-title">{{dynamicsList[0].title}}</div>
                     <div class="dynamics-top-text">{{dynamicsList[0].pick}}</div>
                     <div class="dynamics-top-text">发布时间：{{dynamicsList[0].createTime}}</div>
                   </div>
                 </div>
                 <NewsList :list="dynamicsList.slice(1)" v-loading="dynamicsLoading"></NewsList>
               </div>
             </div>
            </div>
            <div class="dynamics-right">
              <div class="title-item">
                <div class="dynamics-title title">
                  <img src="@/assets/title/稿件统计.png" alt=""  style="width: 30px;margin-bottom: -4px">
                  稿件统计</div>
              </div>
              <el-date-picker
                  style="width: 62%"
                  v-model="value2"
                  size="mini"
                  type="daterange"
                  align="center"
                  unlink-panels
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions">
              </el-date-picker>
              <el-button type="primary" size="mini" style="margin-left: 5px" @click="getCounts">筛选</el-button>
              <el-button type="primary" size="mini" @click="reset">重置</el-button>
              <el-table :data="tableData" height="250"
                        style="width: 100%;text-align: center;margin-top: 10px;"
                        row-key="id" border
                        :cell-style="{ padding: '8px 0' }">
                <el-table-column
                    prop="name"
                    label="部队名称">
                </el-table-column>
                <el-table-column
                    prop="count"
                    label="数量">
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div class="workshop-block">
          <img src="@/assets/columns/sssss.png" alt="" class="img">
<!--          <div class="title-item">-->
<!--            <div class="workshop-title title" @click="navigate(21)">铸魂育人</div>-->
<!--          </div>-->
          <div class="workshop-info">
            <div class="workshop-item">
              <div class="small-title">
                <div class="small title" @click="navigate(21)">
                  <img src="@/assets/title/学习课堂.png" alt=""  style="width: 30px;margin-bottom: -4px">
                  学习课堂</div>
                <div class="more" @click="navigate(21)">更多</div>
              </div>
                <NewsList :list="studyPages" class="workshop" v-loading="ListLoading"></NewsList>
            </div>
            <div class="workshop-item">
              <div class="small-title" @click="navigate(22)">
                <div class="small title">
                  <img src="@/assets/title/理论讲堂.png" alt=""  style="width: 30px;margin-bottom: -4px">
                  理论讲堂</div>
                <div class="more" @click="navigate(22)">更多</div>
              </div>
              <template v-loading="ListLoading" v-if="theoryPages.length>0">
                <img :src="imgUrl+item.pic" alt="" class="workshop-img" v-for="item in theoryPages" :key="item.id"  @click="goDetail(item)"/>
              </template>
              <el-empty description="暂无数据" v-else class="empty"></el-empty>
            </div>
            <div class="workshop-item">
              <div class="small-title">
                <div class="small title" @click="navigate(23)">
                  <img src="@/assets/title/精品微课.png" alt=""  style="width: 30px;margin-bottom: -4px">
                  精品微课</div>
                <div class="more" @click="navigate(23)">更多</div>
              </div>
                <NewsList :list="coursePages" class="workshop" v-loading="ListLoading"></NewsList>
            </div>
          </div>
        </div>

        <div class="scroll-container" @mouseenter="stopScroll" @mouseleave="startScroll2">
          <!-- 左侧固定的“优秀个人”文字 -->
          <div class="label-vertical">
            优秀个人
          </div>

          <!-- 滚动的图片和姓名部分 -->
          <div class="image-list-wrapper">
            <ul class="image-list" :style="listStyle">
              <li v-for="(person, index) in people" :key="person.id">
                <img :src="imgUrl + person.pic" alt="person" />
                <div class="person-name">{{ person.title }}</div>
              </li>
            </ul>
          </div>
        </div>




        <div class="sword-block">
          <img src="@/assets/columns/sadasdas.png" alt="" class="img">
<!--          <div class="title-item">-->
<!--            <div class="workshop-title title"  @click="navigate(25)">练兵备战</div>-->
<!--          </div>-->
          <div style="display: flex;width: 100%;justify-content: space-between">
            <div class="sword-left">
              <div style="display:flex;justify-content: space-between">
                  <NewsListImg :list="liJianHeiXiPages" :title="'砺剑河西'" :image="'@/assets/title/砺剑河西.png'" :id="25" style="width: calc(50% - 8px);background: #FFFFFF;padding: 10px" v-loading="ListLoading" ></NewsListImg>
                  <NewsListImg :list="dongFengLunJianPages" :title="'东风论剑'" :image="'@/assets/title/东风论剑.png'" :id="26" style="width: calc(50% - 8px);background: #FFFFFF;padding: 10px" v-loading="ListLoading"></NewsListImg>
              </div>
            </div>
            <div class="sword-right">
              <div class="title-item">
                <div class="sword-title title" @click="navigate(27)">
                  <img src="@/assets/title/军情纵横.png" alt=""  style="width: 30px;margin-bottom: -4px">
                  军情纵横</div>
                <div class="more" @click="navigate(27)">更多</div>
              </div>
              <div class="sword-info" v-if="junQingZongHengPages.length>0" v-loading="ListLoading">
                <div class="sword-item" v-for="item in junQingZongHengPages" :key="item.id"  @click="navigate(item.id)">
                  <img :src="imgUrl+ item.pic" class="sword-img" alt=""/>
                  <div class="sword-list">
                    <div class="sword-name">{{item.title}}</div>
                    <div class="sword-text">{{item.pick}}</div>
                  </div>
                </div>
              </div>
              <el-empty description="暂无数据" v-else class="empty"></el-empty>
            </div>
          </div>
        </div>
        <div class="workshop-block">
          <img src="@/assets/columns/1156156.png" alt="" class="img">
<!--          <div class="title-item">-->
<!--            <div class="workshop-title title"  @click="navigate(30)">政策法规</div>-->
<!--          </div>-->
          <div class="workshop-info" v-loading="ListLoading">
            <NewsListImg :list="junShiGongZuoPages" :title="'军事工作'" :id="30" class="workshop-item"></NewsListImg>
            <NewsListImg :list="zhengZhiGongZuoPages" :title="'政治工作'" :id="31" class="workshop-item"></NewsListImg>
            <NewsListImg :list="baoZhangGongZuoPages" :title="'保障工作'" :id="32" class="workshop-item"></NewsListImg>
          </div>
        </div>



        <div class="sword-block">
          <img src="@/assets/columns/11561.png" alt="" class="img">

          <div class="top-block">
            <div class="stage-item white">
              <div class="title-item">
                <div class="workshop-title title">
                  <img src="@/assets/title/直通兵情.png" alt=""  style="width: 30px;margin-bottom: -4px">
                  直通兵情</div>
              </div>
              <div class="white2" >
<!--                style="background: #FFFFFF;flex-wrap: wrap;"-->
                <div class="mailbox-block">
                  <div class="mailbox-item" :class="'active'+mailboxList.length" @click="goMailbox(1)" >首长信箱</div>
                  <div class="mailbox-item" :class="'active'+mailboxList.length" @click="goMailbox(2)">纪检信箱</div>
                </div>
                <div class="mailbox-content" >
                  <div class="mailbox-list" v-for="item in mailboxList" :key="item.id" :class="'active'+mailboxList.length" @click="goMailboxDetail(item.id)">{{item.name}}</div>
                </div>
              </div>
            </div>

            <div class="stage-item white">
              <div class="title-item">
                <div class="workshop-title title">
                  <img src="@/assets/title/办事大厅.png" alt=""  style="width: 30px;margin-bottom: -4px">
                  办事大厅</div>
              </div>
              <div class="stage-info white" v-loading="stageLoading">
                <template v-if="stageList.length>0">
                  <div class="stage-list" v-for="item in stageList" :key="item.id" @click="goExternal(item.linkAddress)">
                    <img :src="imgUrl+ item.icon" alt="" class="stage-img"/>
                    <div class="stage">{{item.name}}</div>
                  </div>
                </template>
                <el-empty description="暂无数据" v-else class="empty"></el-empty>
              </div>
            </div>
            <div class="stage-item white">
              <div class="title-item">
                <div class="workshop-title title">
                  <img src="@/assets/title/天天读报.png" alt=""  style="width: 30px;margin-bottom: -4px">
                  天天读报</div>
              </div>
              <div class="stage-info" v-loading="stageLoading"
                   style="background: #FFFFFF;width: 100%;padding: 0 15px;margin-bottom: 5px;">
                <div class="container">

                    <div class="headlines-carousel2" v-loading="swiperLoading">
                      <template v-if="readList.length>0">
                        <el-carousel indicator-position="none" height="230px">
                          <el-carousel-item v-for="item in readList" :key="item.id" >
                            <img :src="imgUrl+item.backgroundImage" alt="" class="img" @click="goReading(item)"/>
                          </el-carousel-item>
                        </el-carousel>
                      </template>
                      <el-empty :image-size="112" description="暂无数据" v-else ></el-empty>
                    </div>

                  <div class="right-container">
                    <div class="right" v-for="item in readList" :key="item.id" @click="goReading(item)">
                      <div class="rect">{{ item.name }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


<!--          <div class="title-item">-->
<!--            <div class="workshop-title title">强军服务</div>-->
<!--          </div>-->
          <div class="workshop-block">
            <div class="workshop-info" v-loading="ListLoading">
              <NewsListPhoto :list="lvShiZaiXianPages" :title="'法律在线'" :id="37" class="workshop-item"></NewsListPhoto>
              <NewsListPhoto :list="xinLingYiZhanPages" :title="'心理咨询'" :id="38" class="workshop-item"></NewsListPhoto>
              <NewsListPhoto :list="jianKangWenZhenPages" :title="'健康问诊'" :id="36" class="workshop-item"></NewsListPhoto>
            </div>
          </div>
        </div>



<!--        <div class="stage-block white">-->
<!--          <img src="@/assets/columns/qlyz.png" alt="" class="img">-->
<!--          <div class="top-block">-->
<!--           <div class="stage-item">-->
<!--             <div class="title-item">-->
<!--               <div class="stage-title title">直通兵情</div>-->
<!--             </div>-->
<!--             <div class="mailbox-block">-->
<!--               <div class="mailbox-item" :class="'active'+mailboxList.length" @click="goMailbox(1)">首长信箱</div>-->
<!--               <div class="mailbox-item" :class="'active'+mailboxList.length" @click="goMailbox(2)">纪检信箱</div>-->
<!--             </div>-->
<!--             <div class="mailbox-content">-->
<!--               <div class="mailbox-list" v-for="item in mailboxList" :key="item.id" :class="'active'+mailboxList.length" @click="goMailboxDetail(item.id)">{{item.name}}</div>-->
<!--             </div>-->
<!--           </div>-->
<!--            <div class="stage-item">-->
<!--              <div class="title-item">-->
<!--                <div class="stage-title title">办事大厅</div>-->
<!--              </div>-->
<!--              <div class="stage-info" v-loading="stageLoading">-->
<!--                <template v-if="stageList.length>0">-->
<!--                  <div class="stage-list" v-for="item in stageList" :key="item.id" @click="goExternal(item.linkAddress)">-->
<!--                    <img :src="imgUrl+ item.icon" alt="" class="stage-img"/>-->
<!--                    <div class="stage">{{item.name}}</div>-->
<!--                  </div>-->
<!--                </template>-->
<!--                <el-empty description="暂无数据" v-else class="empty"></el-empty>-->
<!--              </div>-->

<!--            </div>-->
<!--          </div>-->
<!--          <div class="bottom-block">-->
<!--            <div class="title-item">-->
<!--              <div class="stage-title title">强军服务</div>-->
<!--            </div>-->
<!--           <div class="bottom-info" v-loading="ListLoading">-->
<!--             <NewsList :list="lvShiZaiXianPages" :title="'法律在线'" :id="37" class="bottom-item"></NewsList>-->
<!--             <NewsList :list="xinLingYiZhanPages" :title="'心理咨询'" :id="38" class="bottom-item"></NewsList>-->
<!--             <NewsList :list="jianKangWenZhenPages" :title="'健康问诊'" :id="36" class="bottom-item"></NewsList>-->
<!--           </div>-->
<!--          </div>-->
<!--        </div>-->



        <div class="literary-block">
          <img src="@/assets/columns/166165.png" alt="" class="img">
          <div class="literary-content white">
            <div class="literary-info">
              <div class="literary-tips">祁连剧院</div>
             <div class="literary-item">
               <div class="theater-item" v-for="item in theaterList"  @click="goExternal(item.linkAddress)">
                 <img :src="imgUrl+ item.icon" alt="" class="img">
               </div>
             </div>
            </div>
            <div class="literary-info">
              <div class="literary-tips">祁连光影</div>
             <div class="literary-item">
               <div class="light-item" v-for="item in lightList"  @click="goExternal(item.linkAddress)">
                 <img :src="imgUrl+ item.icon" alt="" class="img">
               </div>
             </div>
            </div>
            <div class="literary-info">
             <div class="literary-item">
               <div class="music-item" v-for="item in musicList"  @click="goExternal(item.linkAddress)">
                 <div class="music-tips">{{item.name}}</div>
                 <img :src="imgUrl+ item.icon" alt="" class="img">
               </div>
             </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="dialog-block" v-if="dialogShow&&dialogList.length>0">
      <div class="dialog-title-item">
        <div class="el-icon-close" @click="dialogShow=false"></div>
      </div>
      <div class="dialog-box" v-for="item in dialogList" :key="item.fid">
        <img :src="imgUrl+item.icon" alt="" class="dialog-img" @click="goExternal(item.linkAddress)"/>
      </div>
    </div>

    <div class="dialog-block2" v-if="dialogShow2&&dialogList2.length>0">
      <div class="dialog-title-item">
        <div class="el-icon-close" @click="dialogShow2=false"></div>
      </div>
      <div class="dialog-box" v-for="item in dialogList2" :key="item.fid">
        <img :src="imgUrl+item.icon" alt="" class="dialog-img" @click="goExternal(item.linkAddress)"/>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>

import Top from "@/components/Top/Top.vue";
import Header from "@/components/Header/Header.vue";
import NewsList from "@/components/NewsList/NewsList.vue";
import NewsListColumn from "@/components/NewsList/NewsListColumn.vue";
import Footer from "@/components/Footer/Footer.vue";
import NewsListImg from "@/components/NewsList/NewsListImg.vue";
import {
  getAdminArticleTreeApi,
  getArticleListApi, getArticleTreeApi,
  getCountsApi,
  getFocusListApi, getHeadlineListApi, getMailboxTreeApi,
  getNewDevelopmentsApi,
  getStrongMilitaryApi, getWebArtListApi
} from "@/api/home";
import {getwebListApi} from "@/api/header";
import NewsListPhoto from "@/components/NewsList/NewsListPhoto.vue";

export default {
  name: 'home',
  components: {NewsListPhoto, NewsListImg, Footer, NewsListColumn, NewsList, Top,Header},
  data(){
    return {
       //焦点关注和时政资讯
      focusLoading:false,
      focusPages:[],//焦点关注
      headlinesList:[],//时政头条

      //祁连新动态
      menuLoading:false,
      dynamicsLoading:false,
      menuList:[],
      menuTab:7,
      peopleTab:130,
      dynamicsList:[],
      tableData:[],//稿件

      ListLoading:false,
      //统帅足音
      footList:[],
       //军委要闻
      newsPages:[],

      //火箭军快讯
      rocketPages:[],

      //学习课堂
      studyPages:[],

      //理论讲堂
      theoryPages:[],

      //精品微课
      coursePages:[],

      //砺剑河西
      liJianHeiXiPages:[],

      //东风论剑
      dongFengLunJianPages:[],

      //军情纵横
      junQingZongHengPages:[],

      //军事工作
      junShiGongZuoPages:[],

      //政治工作
      zhengZhiGongZuoPages:[],

      //保障工作
      baoZhangGongZuoPages:[],

      //法律在线
      lvShiZaiXianPages:[],

      //心理咨询
      xinLingYiZhanPages:[],

      //健康问诊
      jianKangWenZhenPages:[],

      stageList:[], //办事大厅
      stageLoading:false,
      theaterList:[],//祁连剧院
      lightList:[],//祁连光影
      musicList:[],//祁连艺苑
      galleryLoading:false,
      imgUrl:process.env.VUE_APP_BASE_API+'/api',
      dialogShow:true,
      dialogShow2:true,
      dialogList:[],
      dialogList2:[],
      swiperList:[],
      swiperLoading:false,

      scrollList:[],
      readList:[],
      scrollLoading:false,
      readLoading:false,
      scrollPosition: 0, // 初始滚动位置

      mailboxList:[],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }, {
          // 新增的“最近一年”选项
          text: '最近一年',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      value2: '',
      people: [],
      scrollIntervalId: null,
      scrollOffset: 0,
      // itemWidth: 200, // 每个图片项的宽度
      containerWidth: 800, // 图片容器的宽度
      itemWidth: 140, // 假设每个图片的宽度加上 margin 是 140px
    }
  },
  watch:{
  },
  computed: {
    // 计算滚动列表的样式
    listStyle() {
      return {
        transform: `translateX(${-this.scrollOffset}px)`,
      };
    },
  },
  methods: {
    changeMenu(e){
      this.menuTab=e;
      this.getArticleListApi()
    },
    navigate(id){
       if(id===3){
        const routeInfo = this.$router.resolve({
          name: 'commander', // 路由的名字
          query: {id: id }, // 如果有参数
        });
        // 使用 window.open 打开新的页面
        window.open(routeInfo.href);
      }else{
         const routeInfo = this.$router.resolve({
           path: '/newsList',
           query: { id: id },
         });
         window.open(routeInfo.href);
       }
    },
    goDetail(item){
      if(item.jumpUrl){
        window.open(item.jumpUrl)
      }else if(item.linkAddress){
        window.open(item.linkAddress)
      }
      else{
        const routeInfo = this.$router.resolve({
          path: '/newsDetail',
          query: { id: item.id },
        });
        window.open(routeInfo.href);
      }
    },
    goMailbox(e){
      const routeInfo = this.$router.resolve({
        path: '/mailbox',
        query: { type:e },
      });
      window.open(routeInfo.href);
    },
    goMailboxDetail(id){
      const routeInfo = this.$router.resolve({
        path: '/mailbox',
        query: { id:id },
      });
      window.open(routeInfo.href);
    },
    goExternal(url){
     if(url){
       window.open(url)
     }
    },
    goReading(item){
      if(item.jumpUrl){
        window.open(item.jumpUrl)
      }else if(item.linkAddress){
        window.open(item.linkAddress)
      }else{
        const routeInfo = this.$router.resolve({
          path: '/readDetail',
          query: { id: item.id ,bg:item.backgroundImage },
        });
        window.open(routeInfo.href);
      }
    },
    getFocusList() {
      this.focusLoading = true;
      getFocusListApi({currentPoliticsLimit:8}).then((res) => {
        this.focusPages = res.focusPages.records;
        this.headlinesList = res.currentPoliticsPages.records;
        this.focusLoading = false;
      }).finally(() => {
        this.focusLoading = false;
      })
    },
    getSwiperList() {
      this.swiperLoading = true;
      getHeadlineListApi().then((res) => {
        this.swiperList = res;
        this.swiperLoading = false;
      }).finally(() => {
        this.swiperLoading = false;
      })
    },
    getStrongMilitary() {
        this.ListLoading = true;
      getStrongMilitaryApi({limit:7}).then((res) => {
        this.footList = res.footPages.records;
        this.newsPages = res.newsPages.records;
        this.rocketPages = res.rocketPages.records;
        this.studyPages = res.studyPages.records;
        this.theoryPages = res.theoryPages.records;
        this.coursePages = res.coursePages.records;
        this.liJianHeiXiPages = res.liJianHeiXiPages.records;
        this.dongFengLunJianPages = res.dongFengLunJianPages.records;
        this.junQingZongHengPages = res.junQingZongHengPages.records;
        this.junShiGongZuoPages = res.junShiGongZuoPages.records;
        this.zhengZhiGongZuoPages = res.zhengZhiGongZuoPages.records;
        this.baoZhangGongZuoPages = res.baoZhangGongZuoPages.records;
        this.lvShiZaiXianPages = res.lvShiZaiXianPages.records;
        this.xinLingYiZhanPages = res.xinLingYiZhanPages.records;
        this.jianKangWenZhenPages = res.jianKangWenZhenPages.records;
        this.ListLoading = false;
      })
    },
    getNewDevelopments() {
      this.menuLoading = true;
      getNewDevelopmentsApi().then((res) => {
        this.menuList = res;
        this.menuTab=this.menuList[0].id
        this.menuLoading = false;
        this.getArticleListApi()
      }).finally(() => {
        this.menuLoading = false;
      })
    },
    getArticleListApi() {
      this.dynamicsLoading = true;
      getArticleListApi({page:1,size:6,cid:this.menuTab}).then((res) => {
        this.dynamicsList = res.records;
        this.dynamicsLoading = false;
      }).finally(() => {
        this.dynamicsLoading = false;
      })
    },
    getPeopleApi() {
      this.dynamicsLoading = true;
      getArticleListApi({page:1,size:50,cid:this.peopleTab}).then((res) => {
        this.people = res.records;
        this.$nextTick(()=>{
          this.startScroll2()
        })
      }).finally(() => {
        this.dynamicsLoading = false;
      })
    },
    getCounts() {
      getCountsApi({startTime:this.value2[0],endTime:this.value2[1]}).then((res) => {
        this.tableData = res;
      })
    },
    reset() {
      this.value2=''
      this.getCounts()
    },
    getwebList() {
      this.stageLoading=true;
      getwebListApi({type:2}).then((res) => {
        this.stageLoading=false;
        this.stageList = res;
      })
    },
    getMailboxTree() {
      getMailboxTreeApi().then((res) => {
        this.mailboxList = res;
      })
    },
    getDialogList() {
      getwebListApi({type:1}).then((res) => {
        // 确保res至少包含8个元素以避免错误
        if (res.length >= 8) {
          this.dialogList = res.slice(0, 4); // 获取数组的前四个元素
          this.dialogList2 = res.slice(4, 8); // 获取数组的第五到第八个元素
        } else {
          this.dialogList = res.slice(0, 4);
          this.dialogList2 = res.slice(4, 8);
        }
      }).catch(error => {
        console.error("请求失败:", error);
      });
    },
    getScrollList() {
      this.scrollLoading=true;
      getwebListApi({type:4}).then((res) => {
        this.scrollLoading=false;
        this.scrollList = res;
        this.$nextTick(()=>{
          this.mLeave2()
        })
      })
    },
    getReadList() {
      this.readLoading=true;
      getArticleTreeApi({pid:131}).then((res) => {
        this.readList = res;
        this.readLoading=false;

      })
    },
    getGalleryList() {
      this.galleryLoading=true;
      getWebArtListApi().then((res) => {
        this.galleryLoading=false;
        this.theaterList = res.theaterList;
        this.lightList = res.movieList;
        this.musicList = res.otherList;
      })
    },
    initScroll() {
      this.$nextTick(() => {
        this.startScroll()
      })
    },
    // 鼠标移入停止滚动

    mEnter2() {
      clearInterval(this.scrollIntervalId);
      this.scrollIntervalId = null;
    },
    // 鼠标移出继续滚动
    mLeave2() {
      this.stopScroll();
      if(this.scrollList.length<=2){
        return;
      }
      this.scrollIntervalId = setInterval(() => {
        this.scrollOffset += 1;
        if (this.scrollOffset > this.scrollList.length * 100) {
          this.scrollOffset = 0;
        }
      }, 50);
    },
    // 开始滚动
    startScroll() {
      this.timer = setInterval(this.scroll, 50);
    },
    // 滚动处理方法
    scroll() {
      this.scrollPosition++
      setTimeout(function() {
        let element = document.getElementById('scrollItemBox');
        if (element) {
          let width = element.offsetWidth;
          if (this.scrollPosition >= width) {
            this.scrollPosition = 0
          }
        }
      }, 1000);
    },
    // 启动滚动动画
    startScroll2() {
      this.stopScroll();
      if(this.people.length<=8){
        return;
      }
      this.scrollIntervalId = setInterval(() => {
        this.scrollOffset += 1;
        if (this.scrollOffset > this.people.length * 100) {
          this.scrollOffset = 0;
        }
      }, 50);
    },
    // 停止滚动动画
    stopScroll() {
      clearInterval(this.scrollIntervalId);
      this.scrollIntervalId = null;
    },
  },
  beforeDestroy() {
    clearInterval(this.timer); // 销毁定时器
    clearInterval(this.scrollIntervalId); // 销毁定时器
  },
  mounted() {
    this.getFocusList();
    this.getStrongMilitary();
    this.getNewDevelopments();
    this.getCounts();
    this.getwebList();
    this.getDialogList();
    this.getGalleryList();
    this.getSwiperList();
    this.getScrollList();
    this.initScroll();
    this.getMailboxTree();
    this.getPeopleApi();
    this.getReadList();
  }
}

</script>
<style lang="scss">
.el-table_14_column_27.is-leaf el-table__cell{
 display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  text-align: center !important;
}
.el-table{
  text-align: center !important;
}
.has-gutter{
  height: 30px !important;
}
.el-table__row{
  width: 100% !important;
  height: 30px !important;
}
.el-table th.el-table__cell>.cell{
  text-align: center !important;
}
.el-table .cell{
  text-align: center !important;
}
</style>
<style lang="scss" scoped>
.home{
  display: flex;
  flex-direction: column;
  align-items: center;
  .home-content{
    .white{
      background-color: #FFFFFF;
      width: 100%;
      padding: 15px;
      margin-bottom: 5px;
    }
    .white2{
      background-color: #FFFFFF;
      width: 100%;
      padding: 15px 15px 35px 15px;
      margin-bottom: 5px;
    }
    .banner{
     .img{
       width: 100%;
       height: 100%;
     }
    }
    .info-block{
      .focus-block{
        display: flex;
        background: #f8f8f8;
        border: 1px solid #eeeeee;
        padding: 15px;
        margin-top: 15px;
        .focus{
          width:90px;
          height: 90px;
          background: #d71518;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          font-size: 25px;
          font-weight: bold;
          letter-spacing: 6px;
          margin-right: 30px;
        }
        .focus-item{
          width: calc(100% - 120px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .focus-title{
            font-size:34px;
            font-weight: bold;
            color: #d71518;
            cursor: pointer;
          }
          .focus-content{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 10px;
            cursor: pointer;
            .focus-list:last-child{
              margin-right: 0;
            }
            .focus-list{
              margin-right: 15px;
              font-size: 14px;
            }
          }
        }
      }
      .title-item{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        .title{
          width: 150px;
          text-align: end;
          padding-bottom: 4px;
          border-bottom: 3px solid #0b6042;
          cursor: pointer;
        }
        .title:hover{
          color: #0b6042;
        }
        .more{
          font-size: 14px;
          color: #767676;
          cursor: pointer;
        }
      }
      .headlines-block{
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
        margin-top: 15px;
        .headlines-carousel{
          width: 570px;
          cursor: pointer;
          .banner{
            .headlines-name{
              width: 570px;
              position: absolute;
              z-index: 99;
              background: rgba(0,0,0,.5);
              color: #FFFFFF;
              margin-top: -39px;
              height: 35px;
              display: flex;
              align-items: center;
              justify-content: center;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 15px;
            }
          }
        }
        .headlines-item{
          width: calc(100% - 600px);
          .headlines-icon{
            font-size: 23px;
            font-weight: bold;
            color: #0b6042;
          }
          .headlines-info{
            margin-top: 12px;
            cursor: pointer;
            .headlines-title{
              font-size: 24px;
              color: #0b6042;
            }
            .headlines-content{
              font-size: 16px;
              color: #767676;
              margin-top: 15px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              border-bottom: 1px dashed #bcbaba;
              padding-bottom: 20px;
              margin-bottom: 10px;
            }
          }
        }
      }
      .scroll-block {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 130px;
        overflow: hidden;
      }

      .scroll-content1 {
        padding: 0 20px;
        white-space: nowrap; /* 确保所有图片在一行内 */
      }

      .scroll-info {
        width: 100%;
        overflow: hidden;
      }

      .scroll_list {
        display: flex; /* 使用 flexbox 以确保子元素在一行内 */
        transition: transform 0.5s ease; /* 添加过渡效果 */
      }

      .scroll-item-container {
        display: flex; /* 确保所有图片在一行内 */
      }

      .scroll-item {
        display: flex;
        margin-right: 20px; /* 图片之间的间距 */
      }

      .scroll-img {
        width: auto; /* 图片宽度自适应 */
        height: 110px; /* 固定高度 */
        cursor: pointer;
      }
      //.scroll-block{
      //  width: 100%;
      //  display: flex;
      //  align-items: center;
      //  justify-content: center;
      //  height: 130px;
      //  overflow: hidden;
      //
      //  .scroll-content1{
      //    padding: 0 20px;
      //  }
      //  .scroll-info{
      //    width: 100%;
      //    overflow: hidden;
      //  }
      //  .scroll_list{
      //    width:100%;
      //  }
      //    .scroll-item {
      //      display: flex;
      //      margin-right: 20px;
      //      .scroll-img {
      //        width: 100%;
      //        height: 110px;
      //        cursor: pointer;
      //      }
      //    }
      //}
      .information-block{
        height: 410px;
        .img{
          width: 100%;
          margin: 10px 0;
        }
        .information-info{
          width: 100%;
          display: flex;
          .information-item:last-child{
            margin-right: 0;
          }
          .information-item{
            width: calc((100% - 30px) / 3);
            background: #FFFFFF;
            margin-right: 15px;
            padding: 10px;
            .information-title{
              font-size: 22px;
              font-weight: bold;
              color: #636363;
              margin-bottom: 10px;
            }
            .information-title:hover{
              color: #0b6042;
            }
          }
        }
      }
      .dynamics-block{
        .img{
          width: 100%;
          margin: 10px 0;
        }
        .dynamics-title{
          font-size: 22px;
          font-weight: bold;
          color: #636363;
          margin-bottom: 10px;
        }
        .dynamics-item{
          display: flex;
          justify-content: space-between;
          //background: #FFFFFF;
          //padding: 10px;
          .dynamics-info{
            background: #FFFFFF;
            padding: 10px;
            width: calc((100% - 15px) / 3 * 2);
            .dynamics-news{
              display: flex;
              justify-content: space-between;
              .dynamics-menu{
                margin-right: 10px;
                .menu{
                  background: #e1ede9;
                  width: 140px;
                  height: 36px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  cursor: pointer;
                }
                .menu.active{
                  background: #0b6042;
                  color: #FFFFFF;
                }
              }
              .dynamics-list{
                width: calc(100% - 160px);
                .dynamics-top-item{
                  display: flex;
                  align-items: center;
                  background: #f7f7f7;
                  padding: 0 10px;
                  cursor: pointer;
                  margin-bottom: 10px;
                  .img{
                    width: 160px;
                    height: 90px;
                    margin-right: 10px;
                  }
                  .dynamics-top-name{
                    width: calc(100% - 170px);
                    .dynamics-top-title{
                      font-size: 18px;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    }
                    .dynamics-top-text{
                      font-size: 14px;
                      color: #767676;
                      margin-top: 10px;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    }
                  }
                }
              }
            }
          }
          .dynamics-right{
            width: calc((100% - 20px) / 3);
            background: #FFFFFF;
            padding: 10px;
          }
        }
      }
      .small-title{
        display: flex;
        align-items: center;
        justify-content: space-between;
        //border-bottom: 3px solid #0b6042;
        //padding-bottom: 10px;
        margin-bottom: 10px;
        cursor: pointer;
        .title{
          width: 150px;
          text-align: end;
          padding-bottom: 4px;
          border-bottom: 3px solid #0b6042;
          cursor: pointer;
        }
        .title:hover{
          color: #0b6042;
        }
        .small{
          //background: #a2dcc9;
          color: #636363;
          font-size: 22px;
          font-weight: bold;
          padding: 4px 8px;
        }
        .small:hover{
          color: #0b6042;
        }
        .more{
          font-size: 14px;
          color: #767676;
          cursor: pointer;
        }
      }
      .workshop-block{
        margin-bottom: 5px;
        .img{
          width: 100%;
          margin: 10px 0;
        }
        .title-item{
          width: 100%;
          //background: #FFFFFF;
          //margin-top: -20px;
          padding-left: 10px;
          display: flex;
          padding-top: 4px;
          margin-bottom: 15px;

          .workshop-title{
            font-size: 22px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #636363;
          }
        }
        .workshop-info{
          width: 100%;
          display: flex;
          justify-content: space-between;
          //margin-top: -20px;
          .workshop-item{
            width: calc((100% - 30px) / 3);
            background: #FFFFFF;
            padding: 10px;
            cursor: pointer;
            .workshop-img{
              width: 100%;
              height: 68px;
              margin-bottom: 2px;
            }
            .workshop-img:last-child{
              margin-bottom: 0;
            }
          }
        }
      }
      .sword-block{
        margin-bottom: 5px;
        .img{
          width: 100%;
          margin: 10px 0;
        }
        .title-item{
          width: 100%;
          //background: #FFFFFF;
          padding-left: 10px;
          display: flex;
          padding-top: 4px;
          margin-bottom: 15px;

          .workshop-title{
            font-size: 22px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #636363;
          }
        }
        .top-block{
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          .stage-item{
            //width: calc(50% - 10px);
            width: calc(33.3% - 10px);
            .mailbox-block{
              background: #FFFFFF;
              display: flex;
              align-items: center;
              justify-content: space-between;
              cursor: pointer;
              .mailbox-item:last-child{
                background: url("~@/assets/home/mailbox2.png") no-repeat center;
                background-size: 100% 100%;
              }
              .mailbox-item.active2{
                height: 60px;
                font-size: 17px;
              }
              .mailbox-item.active1{
                height: 80px;
                font-size: 18px;
              }
              .mailbox-item{
                width: calc(50% - 5px);
                height: 200px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 22px;
                font-weight: bold;
                color: #0b6042;
                background: url("~@/assets/home/mailbox1.png") no-repeat center;
                background-size: 100% 100%;
              }
            }
            .mailbox-content{
              margin-top: 10px;
              .mailbox-list:last-child{
                margin-bottom: 0;
              }
              .mailbox-list.active2{
                height: 60px;
                font-size: 17px;
              }
              .mailbox-list.active1{
                height: 80px;
                font-size: 18px;
              }
              .mailbox-list{
                background: #def1eb;
                height: 80px;
                margin-bottom: 10px;
                border-radius: 6px;
                color: #0b6042;
                font-size: 17px;
                font-weight: bold;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
              }
            }
            .stage-info{
              background: #FFFFFF;
              display: flex;
              flex-wrap: wrap;
              .stage-list:nth-child(3n){
                margin-right: 0;
              }
              .container {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                .headlines-carousel2{
                  width: 190px;
                  cursor: pointer;
                  margin-top: 10px;
                }
              }

              .right-container {
                display: flex;
                flex-direction: column;
                margin: 20px 20px 13px 20px;
              }

              .right {
                margin-bottom: 3px; /* 矩形之间的间距 */
              }

              .rect {
                width: 120px;
                height: 25px; /* 调整高度以适应内容 */
                line-height: 30px; /* 垂直居中 */
                text-align: center;
                border: 1px solid #636363; /* 添加边框并设置颜色 */
                font-size: 14px;
                color: #4a4c4b;
                border-radius: 5px;
                cursor: pointer; /* 指示可点击 */
                display: flex; /* 使用Flexbox进行更精确的居中 */
                justify-content: center; /* 水平居中 */
                align-items: center; /* 垂直居中 */
                margin-bottom: 3px;
              }
              .rect:hover{
                color: #0b6042;
              }

              .stage-list{
                width: calc((100% - 40px) / 3);
                margin-right: 20px;
                height: 90px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 20px;
                background: #def1eb;
                border-radius: 10px;
                cursor: pointer;
                .stage-img{
                  width: 25px;
                  height: 25px;
                  margin-right: 3px;
                }
                .stage{
                  font-size: 15px;
                  font-weight: bold;
                  color: #0b6042;
                }
              }
            }
          }
        }
        .sword-left{
          width: calc((100% - 10px) / 3 *2);
          .sword-title{
            font-size: 22px;
            font-weight: bold;
            color: #636363;
            margin-bottom: 10px;
          }
          .sword-title:hover{
            color: #0b6042;
          }
          .gallery-block{
            width: calc(50% - 10px);
            .theater-block{
              display: flex;
              justify-content: center;
              flex-wrap: wrap;
              .theater-item:nth-child(2n){
                margin-right: 0;
              }
              .theater-item{
                width: calc(40% - 10px);
                margin-right: 20px;
                margin-bottom: 20px;
              }
            }
            .music-block{
              width: 100%;
              .music-item{
                width: 100%;
                margin-bottom: 6px;
              }
            }
          }
        }
        .sword-right{
          width: calc((100% - 20px) / 3);
          background: #FFFFFF;
          padding: 10px;
          .sword-title{
            font-size: 22px;
            font-weight: bold;
            color: #636363;
            //margin-bottom: 10px;
          }
          .sword-title:hover{
            color: #0b6042;
          }
          .sword-info{
            margin-top: 10px;
            cursor: pointer;
            .sword-item:last-child{
              border-bottom: none;
              margin-bottom: 0;
              padding-bottom: 0;
            }
            .sword-item{
              display: flex;
              align-items: center;
              border-bottom: 1px dashed #d2d2d2;
              padding-bottom: 6px;
              margin-bottom: 6px;
              cursor: pointer;
              .sword-img{
                width: 100px;
                height: 62px;
              }
              .sword-list{
                margin-left: 10px;
                width: calc(100% - 110px);
                .sword-name{
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  font-size: 17px;
                  color: #0b6042;
                  margin-bottom: 6px;
                }
                .sword-text{
                  word-break: break-all;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  /* 超出几行省略 */
                  overflow: hidden;
                  font-size: 14px;
                  color: #606060;
                  line-height: 24px;
                }
              }
            }
          }
          .read-block{
            margin-top: 30px;
            .read-info{
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
              .read-img{
                width: calc(50% - 5px);
                height: 320px;
              }
            }
          }
        }
      }
      .stage-block{
        margin-top: 15px;
        margin-bottom: 15px;
        .img{
          width: 100%;
          height: 100%;
        }
        .stage-title{
          font-size: 22px;
          font-weight: bold;
          color: #636363;
          margin-bottom: 10px;
        }
        .top-block{
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          .stage-item{
            width: calc(50% - 10px);
            .mailbox-block{
              display: flex;
              align-items: center;
              justify-content: space-between;
              cursor: pointer;
              .mailbox-item:last-child{
                background: url("~@/assets/home/mailbox2.png") no-repeat center;
                background-size: 100% 100%;
              }
              .mailbox-item.active2{
                height: 60px;
                font-size: 18px;
              }
              .mailbox-item.active1{
                height: 80px;
                font-size: 18px;
              }
              .mailbox-item{
                width: calc(50% - 5px);
                height: 200px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 22px;
                font-weight: bold;
                color: #0b6042;
                background: url("~@/assets/home/mailbox1.png") no-repeat center;
                background-size: 100% 100%;
              }
            }
            .mailbox-content{
              margin-top: 10px;
              .mailbox-list:last-child{
                margin-bottom: 0;
              }
              .mailbox-list.active2{
                height: 60px;
                font-size: 18px;
              }
              .mailbox-list.active1{
                height: 80px;
                font-size: 18px;
              }
              .mailbox-list{
                background: #def1eb;
                height: 80px;
                margin-bottom: 10px;
                border-radius: 6px;
                color: #0b6042;
                font-size: 17px;
                font-weight: bold;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
              }
            }
            .stage-info{
              display: flex;
              flex-wrap: wrap;
              .stage-list:nth-child(3n){
                margin-right: 0;
              }
              .stage-list{
                width: calc((100% - 40px) / 3);
                margin-right: 20px;
                height: 90px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 20px;
                background: #def1eb;
                border-radius: 10px;
                cursor: pointer;
                .stage-img{
                  width: 30px;
                  height: 30px;
                  margin-right: 10px;
                }
                .stage{
                  font-size: 17px;
                  font-weight: bold;
                  color: #0b6042;
                }
              }
            }
          }
        }
        .bottom-block{
          .bottom-info{
            display: flex;
            justify-content: space-between;
            .bottom-item{
              width: calc((100% - 40px) / 3);
            }
          }
        }
      }
      .literary-block{
        .img{
          width: 100%;
          height: 100%;
        }
        .literary-content{
          display: flex;
          align-items: center;
          justify-content: space-between;
          .literary-info{
            width: calc((100% - 40px) / 3);
            background: #d7e8e2;
            border-radius: 20px;
            height: 380px;
            padding: 15px;
            .literary-tips{
              width: 110px;
              height: 30px;
              position: absolute;
              font-size: 14px;
              font-weight: bold;
              color: #FFFFFF;
              background: url("~@/assets/home/tips-bg.png") no-repeat center;
              background-size: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-left: 263px;
              margin-top: -17px;
            }
            .literary-item{
              display: flex;
              align-items: center;
              flex-wrap: wrap;
              justify-content: space-between;
              .literary-tips{
                position: absolute;
              }
              .theater-item:nth-child(1){
                width: calc((100% - 5px) / 3 * 2);
              }
              .theater-item{
                width: calc((100% - 20px) / 3);
                margin-bottom: 10px;
                height: 170px;
              }
              .light-item{
                width: calc((100% - 20px) / 3);
                margin-bottom: 10px;
                height: 170px;
              }
              .light-item:nth-child(4){
                width: 100%;
              }
              .music-item:last-child{
                margin-bottom: 0;
              }
              .music-item{
                margin-bottom: 30px;
                .music-tips{
                  width: 110px;
                  height: 30px;
                  position: absolute;
                  font-size: 14px;
                  font-weight: bold;
                  color: #FFFFFF;
                  background: url("~@/assets/home/tips-bg.png") no-repeat center;
                  background-size: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin-left: 278px;
                  margin-top: -3px;
                }
              }
            }
          }
          .literary-info:last-child{
            background: #FFFFFF;
            padding: 0;
          }
        }
      }
    }
  }
  .dialog-block2{
    z-index: 999;
    position: fixed;
    right: 15px;
    top: 220px;
    width: 330px;
    //background: #FFFFFF;
    .dialog-title-item{
      position: absolute;
      margin-top: -20px;
      margin-left: 310px;
      .el-icon-close{
        color: #FFFFFF;
      }
    }
    .dialog-box:last-child{
      margin-bottom: 0;
    }
    .dialog-box{
      height: 100px;
      width: 100%;
      margin-bottom: 10px;
      .dialog-img{
        width: 100%;
        height: 100%;

      }
    }
  }

  .dialog-block{
    z-index: 999;
    position: fixed;
    left: 15px;
    top: 220px;
    width: 330px;
    //background: #FFFFFF;
    .dialog-title-item{
      position: absolute;
      margin-top: -20px;
      margin-left: 310px;
      .el-icon-close{
        color: #FFFFFF;
      }
    }
    .dialog-box:last-child{
      margin-bottom: 0;
    }
    .dialog-box{
      height: 100px;
      width: 100%;
      margin-bottom: 10px;
      .dialog-img{
        width: 100%;
        height: 100%;

      }
    }
  }
}



.scroll-container {
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
  width:100%;
  height:260px;
  background: #FFFFFF;
}

.label-vertical {
  writing-mode: vertical-rl; /* 文字垂直排列 */
  font-size: 22px;
  font-weight: bold;
  color: #636363;
  margin-left: 10px;
  position: absolute;
  top: 40%;
  transform: translateY(-30%);
  padding-left: 30px; /* 给竖线留出一些空间 */
  letter-spacing: 4px; /* 调整字间距 */
}

/* 添加伪元素作为竖线 */
.label-vertical:before {
  content: '';
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 4px;
  background-color: #0b6042; /* 竖线的颜色 */
}

.scroll-content {
  display: flex;
  width: calc(80% - 50px); /* 减去左侧固定文字的宽度 */
  overflow: hidden;
  animation: scroll-left 30s linear infinite;
}


.person-name {
  font-size: 14px;
  font-weight: bold;
  color: #606060;
  text-align: center; /* 实现水平居中 */
  align-items: center;
  margin-top: 10px;
}

/* 向左滚动动画 */
@keyframes scroll-left {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

 .image-list-wrapper {
   position: relative;
   width: 90%;
   height: 250px;
   overflow: hidden;
   margin-left: 100px; /* 确保不与左侧文字重叠 */
 }

.image-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;
  width: 100%;
  height: 180px;
}

.image-list li {
  display: inline-block;
  margin-right: 10px;
}

.image-list img {
  display: block;
  width: 120px;
  //height: 180px;
  height: 100%;
  border-radius: 5%;
  object-fit: contain;
}



</style>
