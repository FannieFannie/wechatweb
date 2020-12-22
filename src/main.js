import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import weui from "weui.js";
import "./element-ui";
import "weui";
import store from "./store";
// import 'element-ui/lib/theme-chalk/index.css';
import './assets/iconfont/iconfont.css'
import "./assets/public.css";
Vue.prototype.$weui = weui;
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
