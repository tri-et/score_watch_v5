import Vue from 'vue'
import Router from 'vue-router'
import predictions from '@/components/predictions/predictions'
import livescore from '@/components/livescore/livescore'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'predictions',
      component: predictions
    }, {
      path: '/livescore',
      name: 'livescore',
      component: livescore
    }
  ]
})
