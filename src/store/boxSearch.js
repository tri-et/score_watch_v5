const state = {
  isOpenLeagueMobile: false,
  isOpenLeagueDeskTop: false,
  chekedLeagueName: [],
  chekedLeagueNameLive: [],
  filterTeamName: '',
}
const getters = {
  getIsOpenLeagueMobile: state => {
    return state.isOpenLeagueMobile
  },
  getIsOpenLeagueDeskTop: state => {
    return state.isOpenLeagueDeskTop
  },
  getchekedLeagueName: state => {
    return state.chekedLeagueName
  },
  getchekedLeagueNameLive: state => {
    return state.chekedLeagueNameLive
  },
  getFilterTeamName: state => {
    return state.filterTeamName
  },
}
const mutations = {
  setIsOpenLeagueMobile(state, value) {
    state.isOpenLeagueMobile = value
  },
  setIsOpenLeagueDeskTop(state, value) {
    state.isOpenLeagueDeskTop = value
  },
  setchekedLeagueName(state, value) {
    state.chekedLeagueName = value
  },
  setchekedLeagueNameLive(state, value) {
    state.chekedLeagueNameLive = value
  },
  setFilterTeamName(state, value) {
    state.filterTeamName = value
  },
}
const actions = {
  closeOpenLeagueMobile({commit}, value) {
    commit('setIsOpenLeagueMobile', value)
  },
  closeOpenLeagueDeskTop({commit}, value) {
    commit('setIsOpenLeagueDeskTop', value)
  },
  checkLeague({commit}, value) {
    commit('setchekedLeagueName', value)
  },
  checkLeagueLive({commit}, value) {
    commit('setchekedLeagueNameLive', value)
  },
  searchTeamName({commit}, value) {
    commit('setFilterTeamName', value)
  },
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
