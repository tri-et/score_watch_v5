const state = {
  leaguePrediction: null,
  matchInPlay: null,
  matchPregame:null,
  leagueInPlay:[],
  leagueInPlayExp:[],
  leaguePregame:[],
  leaguePregameExp:[]
}
const getters = {
  getLeaguePrediction: state => {
    return state.leaguePrediction
  },
  getMatchInPlay: state => {
    return state.matchInPlay
  },
  getMatchPregame: state => {
    return state.matchPregame
  },
  getLeagueInPlay: state => {
    return state.leagueInPlay
  },
  getLeagueInPlayExp: state => {
    return state.leagueInPlayExp
  },
  getLeaguePregame: state => {
    return state.leaguePregame
  },
  getLeaguePregameExp: state => {
    return state.leaguePregameExp
  }
}
const mutations = {
  setLeaguePrediction(state, value) {
    state.leaguePrediction = value
  },
  setMatchInPlay(state, value) {
    state.matchInPlay = value
  },
  setMatchPregame(state, value) {
    state.matchPregame = value
  },
  setLeagueInPlay(state, value) {
    state.leagueInPlay = value
  },
  setLeagueInPlayExp(state, value) {
    state.leagueInPlayExp = value
  },
  setLeaguePregame(state, value) {
    state.leaguePregame = value
  },
  setLeaguePregameExp(state, value) {
    state.leaguePregameExp = value
  }
}
const actions = {
  setLeague({ commit }, value) {
    commit('setLeaguePrediction', value)
  },
  setDataInplay({ commit }, value) {
    commit('setMatchInPlay', value)
  },
  setDataPregame({ commit }, value) {
    commit('setMatchPregame', value)
  },
  setDataLeagueInplay({ commit }, value) {
    commit('setLeagueInPlay', value)
  },
  setDataLeagueInplayExp({ commit }, value) {
    commit('setLeagueInPlayExp', value)
  },
  setDataLeaguePregame({ commit }, value) {
    commit('setLeaguePregame', value)
  },
  setDataLeaguePregameExp({ commit }, value) {
    commit('setLeaguePregameExp', value)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}