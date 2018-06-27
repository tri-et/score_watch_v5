
const state = {
    activeCalendarLive: 15
  }
  const getters = {
    getActiveCalendarLive: state => {
      return state.activeCalendarLive
    }
  }
  const mutations = {
    setActiveCalendarLive(state, payload) {
      state.activeCalendarLive = payload
    }
  }
  const actions = {
    activeCalendarLive({ commit }, value) {
      commit('setActiveCalendarLive', value)
    },
  }
  export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
  }