import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    authCode: '',
    access_token: ''
  },
  mutations: {
    setToken (state, token) {
      state.access_token = token
    },
    setCode (state, code) {
      state.authCode = code
    }
  },
  actions: {
    setCode (context, code) {
      context.commit('setCode', code)
    },
    setToken (context, token) {
      context.commit('setToken', token)
    },
  }
})
export default store