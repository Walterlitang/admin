import {login, logout,getAdminUser} from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import Cookies from 'js-cookie'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  roles: [],
  permissions:[],
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions
  },
}

const actions = {
  login({ commit }, form) {
    return new Promise((resolve, reject) => {
      login( form ).then(data => {
        commit('SET_TOKEN', data.token)
        Cookies.set('UserInfo', JSON.stringify(data))
        setToken(data.token)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getAdminInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getAdminUser().then(data => {
        data.roles = [data.id]
        const { roles, roleName } = data
        commit('SET_ROLES', roles)
        commit('SET_NAME', roleName)
        commit('SET_AVATAR', 'http://kaifa.crmeb.net/system/images/admin_logo.png')
        commit('SET_PERMISSIONS', data.permissionList) //权限标识
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  logout({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      // logout().then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_PERMISSIONS', [])
        removeToken()
        resetRouter()
        Cookies.remove('UserInfo')
        sessionStorage.removeItem('token')
        dispatch('tagsView/delAllViews', null, { root: true })
        resolve()
      // })
    })
  },
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
