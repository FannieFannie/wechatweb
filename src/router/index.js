import Vue from "vue";
import VueRouter from "vue-router";

// 引入组件
// import qiandaozongji from "";
import qiandao from "../views/qiandao/qiandao.vue";
import buqiandao from "../views/qiandao/buqiandao.vue";
import tongji from "../views/qiandao/tongji.vue";
import getOath from "../views/qiandao/getOath.vue";
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
router.beforeEach((to, from, next) => {
  if (localStorage.vehicle_id && localStorage.vehicle_id != 'undefined' && to.path == '/' && from.path == '/') {
    router.push({ path: '/qiandao' })
  }
  console.log('beforeEach')

  //next() //如果要跳转的话，一定要写上next()

  //next(false) //取消了导航

  next() //正常跳转，不写的话，不会跳转

})
console.log(router)
export default router;