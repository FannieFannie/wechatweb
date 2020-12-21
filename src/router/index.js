import Vue from "vue";
import VueRouter from "vue-router";

// 引入组件
import qiandaozongji from "../views/qiandao/qiandaozongji.vue";
import qiandao from "../views/qiandao/qiandao.vue";
import buqiandao from "../views/qiandao/buqiandao.vue";
import tongji from "../views/qiandao/tongji.vue";
import getOath from "../views/qiandao/getOath.vue";
// import home from "../views/Home.vue";
// import about from "../views/About.vue";

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

const routes = [
  { path: '/getOath', name: 'getOath', component: getOath },
  {
    path: "/",
    name: "Home",
    component: qiandaozongji,
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

console.log(router)
export default router;