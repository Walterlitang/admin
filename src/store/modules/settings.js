import defaultSettings from '@/settings'
const { showSettings, tagsView, fixedHeader, sidebarLogo,topNav,sideTheme,navIcon } = defaultSettings
const state = {
  theme: '#409EFF',
  sideTheme:sideTheme,
  topNav: topNav,
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader:fixedHeader,
  sidebarLogo:sidebarLogo,
  navIcon:navIcon
}
const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

