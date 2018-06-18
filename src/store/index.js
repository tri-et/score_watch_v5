import Vue from 'vue'
import Vuex from 'vuex'
import menuheader from './menuHeader'
import boxsearch from './boxSearch'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    menuheader,
    boxsearch
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {}
})