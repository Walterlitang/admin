import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'
import newsList from '../views/news/list.vue'
import newsDetail from '../views/news/detail.vue'
import consultantDetail from '../views/news/consultantDetail.vue'
import readDetail from '../views/news/readDetail.vue'
import search from '../views/search/index.vue'
import commander from '../views/commander/index.vue'
import mailbox from '../views/mailbox/index.vue'
import sword from '../views/sword/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home,
  },
  {
    path: '/newsList',
    name: 'newsList',
    component: newsList,
  },
  {
    path: '/newsDetail',
    name: 'newsDetail',
    component: newsDetail,
  },
  {
    path: '/consultantDetail',
    name: 'consultantDetail',
    component: consultantDetail,
  },
  {
    path: '/readDetail',
    name: 'readDetail',
    component: readDetail,
  },
  {
    path: '/search',
    name: 'search',
    component: search,
  },
  {
    path: '/commander',
    name: 'commander',
    component: commander,
  },
  {
    path: '/mailbox',
    name: 'mailbox',
    component: mailbox,
  },
 {
   path: '/sword',
       name: 'sword',
     component: sword,
 }
]

const router = new VueRouter({
  routes,
    // linkActiveClass: 'active',
})

export default router
