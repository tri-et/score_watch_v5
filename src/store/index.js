import Vue from 'vue'
import Vuex from 'vuex'
import menuheader from './menuHeader'
import boxsearch from './boxSearch'
import detailpredictions from './predictions/detail'
import calendarpre from './predictions/calendar'
import datapredictions from './predictions/datapredictions'
import calendarlive from './livescore/calendarLiveScore'
import datalivescore from './livescore/dataLiveScore'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    menuheader,
    boxsearch,
    detailpredictions,
    calendarpre,
    calendarlive,
    datapredictions,
    datalivescore,
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {},
})
