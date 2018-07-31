const state = {
    isOpenLeagueMobile: false,
    isOpenLeagueDeskTop: false,
    chekedLeagueName: []
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
    }
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}