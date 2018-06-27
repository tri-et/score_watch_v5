
const state = {
  activeCalendarPre: 15
}
const getters = {
  getActiveCalendarPre: state => {
    return state.activeCalendarPre
  }
}
const mutations = {
  setActiveCalendarPre(state, payload) {
    state.activeCalendarPre = payload
  }
}
const actions = {
  activeCalendarPre({ commit }, value) {
    commit('setActiveCalendarPre', value)
  },
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}