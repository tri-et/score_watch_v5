const state = {
    isOpenLeagueMobile: false,
    isOpenLeagueDeskTop: false,
    chekedLeagueName: [],
    filterTeamName: ''
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
    getFilterTeamName: state => {
        return state.filterTeamName
    }
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
    setFilterTeamName(state, value) {
        state.filterTeamName = value
    }
}
const actions = {
    closeOpenLeagueMobile({ commit }, value) {
        commit('setIsOpenLeagueMobile', value)
    },
    closeOpenLeagueDeskTop({ commit }, value) {
        commit('setIsOpenLeagueDeskTop', value)
    },
    checkLeague({ commit }, value) {
        commit('setchekedLeagueName', value)
    },
    searchTeamName({ commit }, value) {
        commit('setFilterTeamName', value)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}