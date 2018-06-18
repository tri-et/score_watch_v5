// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  data() {
    return {
      browserWidth: 0
    }
  },
  mounted() {
    // get width of browser at first load
    window.addEventListener('load', () => {
      this.browserWidth = window.innerWidth
      this.$root.$emit('browserResize', window.innerWidth)
    })

    //get width of browser during resizing 
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.browserWidth = window.innerWidth
        this.$root.$emit('browserResize', window.innerWidth)
      });
    })
  },
  template: '<App/>'
})
