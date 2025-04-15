import {asyncRoutes} from '@/router'
import {formatRoutes} from '@/utils/parsing'
import {getMenuList} from "@/api/login";

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = {...route}
    if (tmp.child) {
      tmp.child = filterAsyncRoutes(tmp.child, roles)
    }
    res.push(tmp)
  })

  return res
}

const state = {
  routes: [],
  addRoutes: [],
  topbarRouters: [],
  sidebarRouters: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    // state.routes = constantRoutes.concat(routes)
    state.routes = routes
  },
  SET_TOPBAR_ROUTES: (state, routes) => {
    state.topbarRouters = routes
  },
  SET_SIDEBAR_ROUTERS: (state, routes) => {
    state.sidebarRouters = routes
  },
}

const actions = {
  generateRoutes({commit}) {
    return new Promise(resolve => {
      let accessedRoutes = []
      getMenuList().then(menusAll=>{
        menusAll = formatRoutes(menusAll)
        const _routerResult = comRouter(menusAll, asyncRoutes)
        accessedRoutes = filterAsyncRoutes(_routerResult)
        this.state.settings.showSettings = false
        commit('SET_ROUTES', menusAll)
        commit('SET_TOPBAR_ROUTES', menusAll)
        if (this.state.settings.topNav) {
          commit('SET_SIDEBAR_ROUTERS', state.sidebarRouters.length ? state.sidebarRouters : menusAll[0].child)
        } else {
          commit('SET_SIDEBAR_ROUTERS', menusAll)
        }
        resolve(accessedRoutes)
      })
    })
  }
}

function comRouter(menus, asyncRouter, hasLeft) {
  const res = []
  asyncRouter.forEach(router => {
    const _leftUrl = hasLeft ? (hasLeft + '/' + router.path) : router.path
    const _hasPromise = menus.filter(item => item.url.startsWith(_leftUrl))
    if (_hasPromise.length > 0) {
      res.push(router)
    }
    if (router.children) {
      comRouter(menus, router.children, router.path)
    }
  })
  return res
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
