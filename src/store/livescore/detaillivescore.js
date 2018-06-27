
const state = {
  isHideDetailLiveScore: true
}
const getters = {
  getIsHideDetailLiveScore: state => {
    return state.isHideDetailLiveScore
  }
}
const mutations = {
  setIsHideDetailLiveScore(state, value) {
    state.isHideDetailLiveScore = value
  }
}
const actions = {
  hideDetail({ commit }, value) {
    commit('setIsHideDetailLiveScore', value)
  },
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}