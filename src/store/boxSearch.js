const state = {
    isOpenLeagueMobile: false,
    isOpenLeagueDeskTop: false
}
const getters = {
    getIsOpenLeagueMobile: state => {
        return state.isOpenLeagueMobile
    },
    getIsOpenLeagueDeskTop: state => {
        return state.isOpenLeagueDeskTop
    }
}
const mutations = {
    setIsOpenLeagueMobile(state, value) {
        state.isOpenLeagueMobile = value
    },
    setIsOpenLeagueDeskTop(state, value) {
        state.isOpenLeagueDeskTop = value
    }
}
const actions = {
    closeOpenLeagueMobile({ commit }, value) {
        commit('setIsOpenLeagueMobile', value)
    },
    closeOpenLeagueDeskTop({ commit }, value) {
        commit('setIsOpenLeagueDeskTop', value)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}