
const state = {
    activeMenu: 'predictions',
    isMobile: false,
    isSearching: false
}
const getters = {
    getActiveMenu: state => {
        return state.activeMenu
    },
    getIsMobile: state => {
        return state.isMobile
    },
    getIsSearching: state => {
        return state.isSearching
    }
}
const mutations = {
    setActiveMenu(state, value) {
        state.activeMenu = value
    },
    setIsMobile(state, value) {
        state.isMobile = value
    },
    setIsSearching(state, value) {
        state.isSearching = value
    }
}
const actions = {
    menuSelect({ commit }, value) {
        commit('setActiveMenu', value)
    },
    checkIsMobile({ commit }, value) {
        commit('setIsMobile', value)
    },
    clickSearch({ commit}, value) {
        commit('setIsSearching', value);
    }
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}