import Vue from 'vue'
import Vuex from 'vuex'
import menuheader from './menuHeader'
import boxsearch from './boxSearch'
import detailpredictions from './predictions/detail'
import detaillivescore from './livescore/detaillivescore'
import calendarpre from './predictions/calendar'
import calendarlive from './livescore/calendarLiveScore'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    menuheader,
    boxsearch,
    detailpredictions,
    detaillivescore,
    calendarpre,
    calendarlive
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {}
})