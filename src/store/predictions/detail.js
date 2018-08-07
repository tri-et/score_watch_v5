const state = {
  isHideDetail: true,
  isHideHeader: true,
  dataDetail: {},
  currentType: 'inplay',
}
const getters = {
  getIsHideDetail: state => {
    return state.isHideDetail
  },
  getIsHideHeader: state => {
    return state.isHideHeader
  },
  getDataDetail: state => {
    return state.dataDetail
  },
  getCurrentType: state => {
    return state.currentType
  },
}
const mutations = {
  setIsHideDetail(state, value) {
    state.isHideDetail = value
  },
  setIsHideHeader(state, value) {
    state.isHideHeader = value
  },
  setDataDetail(state, value) {
    state.dataDetail = value
  },
  setCurrentType(state, value) {
    state.currentType = value
  },
}
const actions = {
  hideDetail({commit}, value) {
    commit('setIsHideDetail', value)
  },
  hideHeader({commit}, value) {
    commit('setIsHideHeader', value)
  },
  setDataDetail({commit}, value) {
    commit('setDataDetail', value.data)
    commit('setCurrentType', value.type)
  },
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
