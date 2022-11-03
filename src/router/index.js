import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SearchArtist from '../views/SearchArtist.vue'
import SearchSetlist from '../views/SearchSetlist.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/search',
    name: 'search',
    component: SearchArtist
  },
  {
    path: '/search/:mbid',
    name: '',
    component: SearchSetlist
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
