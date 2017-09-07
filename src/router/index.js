import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import About from '@/components/About'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
    { path: '*', component: NotFound },
  ],
})
