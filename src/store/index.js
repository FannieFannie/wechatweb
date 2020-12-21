import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)
const store = new Vuex.store({
  state: {
    authCode: ''
  },
  mutatioon: {
    setCode (state, code) {
      state.authCode = code
    }
  },
  action: {
    setCode (context) {
      context.commit('setCode')
    }
  }
})
export default store