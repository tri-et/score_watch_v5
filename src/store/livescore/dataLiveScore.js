const state = {
  isHideDetailLiveScore: true,
  liveScoreDetail: [],
  leagueLiveScore: [],
  matchesColRight: [],
  matchesColLeft: [],
  matchStats: [],
  matchTimeLine: [],
  statsDetail: [],
  timelineDetail: [],
  hideLoadingLive: true,
}
const getters = {
  getIsHideDetailLiveScore: state => {
    return state.isHideDetailLiveScore
  },
  getLiveScoreDetail: state => {
    return state.liveScoreDetail
  },
  getLeagueLiveScore: state => {
    return state.leagueLiveScore
  },
  getMatchesColRight: state => {
    return state.matchesColRight
  },
  getMatchesColLeft: state => {
    return state.matchesColLeft
  },
  getMatchStats: state => {
    return state.matchStats
  },
  getMatchTimeLine: state => {
    return state.matchTimeLine
  },
  getStatsDetail: state => {
    return state.statsDetail
  },
  getTimelineDetail: state => {
    return state.timelineDetail
  },
  getHideLoadingLive: state => {
    return state.hideLoadingLive
  },
}
const mutations = {
  setIsHideDetailLiveScore(state, value) {
    state.isHideDetailLiveScore = value
  },
  livedetail(state, value) {
    state.liveScoreDetail = value
  },
  setLeagueLive(state, value) {
    state.leagueLiveScore = value
  },
  setMatchesColRight(state, value) {
    state.matchesColRight = value
  },
  setMatchesColLeft(state, value) {
    state.matchesColLeft = value
  },
  mtMatchStats(state, value) {
    state.matchStats = value
  },
  mtMatchTimeLine(state, value) {
    state.matchTimeLine = value
  },
  mtStatsDetail(state, value) {
    state.statsDetail = value
  },
  mtTimelineDetail(state, value) {
    state.timelineDetail = value
  },
  mtHideLoadingLive(state, value) {
    state.hideLoadingLive = value
  },
}
const actions = {
  hideDetail({commit}, value) {
    commit('setIsHideDetailLiveScore', value)
  },
  setDataLiveScoreDetail({commit, getters}, value) {
    var stats = _.filter(getters.getMatchStats.r, function(el) {
      return el[2] == value[0]
    })
    var timeline = _.filter(getters.getMatchTimeLine.r, function(el) {
      return el[2] == value[0]
    })
    commit('livedetail', value)
    commit('mtStatsDetail', stats.length != 0 ? stats[0] : [])
    commit('mtTimelineDetail', timeline)
  },
  setLeagueLiveSocre({commit}, value) {
    commit('setLeagueLive', value)
  },
  setDataLiveScore({commit}, value) {
    commit('setMatchesColRight', value.rightData)
    commit('setMatchesColLeft', value.leftData)
    commit('mtMatchStats', value.matchStats)
    commit('mtMatchTimeLine', value.matchTimeLine)
  },
  setHideLoadingLive({commit}, value) {
    commit('mtHideLoadingLive', value)
  },
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
