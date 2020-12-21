import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    authCode: '',
    access_token: '',
    userInfo:{},
    ticketInfo:{}
  },
  mutations: {
    setToken (state, token) {
      state.access_token = token
    },
    setCode (state, code) {
      state.authCode = code
    },
    setUserInfo(state, userInfo){
      state.userInfo=userInfo
    },
    setTicketInfo(state, ticketInfo){
      state.ticketInfo=ticketInfo
    }
  },
  actions: {
    setTicketInfo(context, ticketInfo){
      context.commit('setTicketInfo', ticketInfo)
    },
    setCode (context, code) {
      context.commit('setCode', code)
    },
    setToken (context, token) {
      context.commit('setToken', token)
    },
    setUserInfo(context, userInfo){
      context.commit('setUserInfo', userInfo)
    }
  }
})
export default store