import Vue from 'vue'
import Vuex from 'vuex'
import menuheader from './menuHeader'
import boxsearch from './boxSearch'
import detailpredictions from './predictions/detail'
import detaillivescore from './livescore/detaillivescore'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    menuheader,
    boxsearch,
    detailpredictions,
    detaillivescore
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {}
})