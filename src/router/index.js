import Vue from "vue";
import VueRouter from "vue-router";
import $store from "../store";
// 引入组件
// import qiandaozongji from "";
import qiandao from "../views/qiandao/qiandao.vue";
import buqiandao from "../views/qiandao/buqiandao.vue";
import tongji from "../views/qiandao/tongji.vue";
import upload from '../views/weixiu/upload.vue'
import getOath from "../views/qiandao/getOath.vue";
import { getOathUtil, getUrlParam } from "../util/util.js";
import weixiu from "../views/weixiu/weixiu.vue";
import repairLog from '../views/weixiu/repairLog.vue'
import weixiufooter from '../views/weixiu/weixiuFooter.vue'
import repairDetail from '../views/weixiu/detail.vue'
// import home from "../views/Home.vue";
// import about from "../views/About.vue";

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

const routes = [
  {
    path: '/', name: 'getOath', component: getOath, meta: {
      keepAlive: true
    }
  },
  {
    path: "/qiandaozongongji",
    name: "Home",
    component: () => import('../views/qiandao/qiandaozongji.vue'),
    children: [
      {
        path: '/qiandao',
        name: 'qiandao',
        component: qiandao
      },
      {
        path: '/buqiandao',
        name: 'buqiandao',
        component: buqiandao
      },
      {
        path: '/tongji',
        name: 'tongji',
        component: tongji
      }
    ]
  }, {
    path: '/upload',
    name: 'upload',
    component: upload
  }, {
    path: '/weixinfooter',
    component: weixiufooter,
    name: weixiufooter,
    children: [{
      path: '/repair',
      name: 'repair',
      component: weixiu,
      meta: {
        keepAlive: true
      }
    }, {
      path: '/repairLog',
      name: 'repairLog',
      component: repairLog
    }],

  }, {
    path: '/repairDetail',
    name: 'repairDetail',
    component: repairDetail
  }
  // {
  //   path: "/home",
  //   component: home
  // },
  // {
  //   path: "/about",
  //   component: about
  // }
]

var router = new VueRouter({
  routes
})
router.beforeEach(async (to, from, next) => {
  let code = getUrlParam('code')
  $store.dispatch('setCode', code)
  localStorage.setItem('code', code)
  let state = getUrlParam('state')
  if (localStorage.vehicle_id && localStorage.vehicle_id != 'undefined'
    && to.path == '/' && from.path == '/' && !state) {
    let code = getUrlParam('code')
    $store.dispatch('setCode', code)
    localStorage.setItem('code', code)
    router.push({ path: '/qiandao' })
  }
  if (state == "weixiu" && to.query.nextpage !== 'repair' && to.path == '/') {
    if (!localStorage.user_access_token || localStorage.user_access_token == 'undefined') {
      await getOathUtil()
    }
    router.push({ path: '/repair', query: { nextpage: 'repair' } })
  }

  //next() //如果要跳转的话，一定要写上next()

  //next(false) //取消了导航

  next() //正常跳转，不写的话，不会跳转

})
export default router;