
const state = {
  isHideDetail: true
}
const getters = {
  getIsHideDetail: state => {
    return state.isHideDetail
  }
}
const mutations = {
  setIsHideDetail(state, value) {
    state.isHideDetail = value
  }
}
const actions = {
  hideDetail({ commit }, value) {
    commit('setIsHideDetail', value)
  },
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}