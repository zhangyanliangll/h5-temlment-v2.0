import Vue from 'vue'
import VueRouter from 'vue-router'
import base from './base'

const routes = [
  ...base
]

Vue.use(VueRouter)
const router = new VueRouter({
  base: '/',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0,
      };
    }
  },
})

router.beforeEach(async (to, from, next) => {
  next()
})

// router.afterEach((to, from) => {
//   console.log();
// });

export default router
