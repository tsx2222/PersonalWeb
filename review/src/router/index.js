import Vue from 'vue'
import VueRouter from 'vue-router'
//import Mainpage from '../views/pc/Mainpage.vue'
//import Diary from "../views/pc/Diary";
//import mDiary from "../views/mobile/mDiary";
//import mMainpage from "../views/mobile/mMainpage";
//import Login from "../views/pc/Login";
//import Book from "../views/pc/Book";
//import mBook from "../views/mobile/mBook";

Vue.use(VueRouter)

  const routes = [
    {
      path: '/main',
      name: 'Mainpage',
      component: resolve=>(require(["@/components/../views/pc/Mainpage"],resolve)),
      meta:{
        title:'洛圣都马头人的小站'
      }
    },
    {
      path:'/mmain',
      name:'mMainpage',
      component: resolve=>(require(["@/components/../views/mobile/mMainpage"],resolve)),
      meta:{
        title:'洛圣都马头人的小站'
      }
    },
    {
      path: '/diary',
      name: 'Diary',
      component: resolve=>(require(["@/components/../views/pc/Diary"],resolve)),
      meta: {
        title: '日常吐槽'
      }
    },
    {
      path: '/mdiary',
      name: 'mDiary',
      component: resolve=>(require(["@/components/../views/mobile/mDiary"],resolve)),
      meta: {
        title: '日常吐槽'
      }
    },
    {
      path:'/login',
      name:'Login',
      component: resolve=>(require(["@/components/../views/pc/Login"],resolve)),
    },
    {
      path:'/book',
      name:'Book',
      component: resolve=>(require(["@/components/../views/pc/Book"],resolve)),
      meta:{
        title:'留言板'
      }
    },
    {
      path:'/mbook',
      name:'mBook',
      component: resolve=>(require(["@/components/../views/mobile/mBook"],resolve)),
      meta: {
        title: '留言板'
      }
    },
    {
      path:'/image',
      name:'Image',
      component: resolve=>(require(["@/components/../views/pc/Image"],resolve)),
      meta:{
        title:'图片墙'
      }
    },
    {
      path:'/mimage',
      name:'mImage',
      component: resolve=>(require(["@/components/../views/mobile/mImage"],resolve)),
      meta:{
        title:'图片墙'
      }
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
