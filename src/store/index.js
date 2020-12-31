import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    authCode: '',
    access_token: '',
    userInfo: {},
    ticketInfo: {},
    vehicle_id: '',
    Bql: '',
    Ql: '',
    qiandao: false,
  },
  mutations: {
    setQiandao (state, qiandao) { state.qiandao = qiandao },
    setQl (state, Ql) {
      state.Ql = Ql
    },
    setBql (state, Bql) {
      state.Bql = Bql
    },
    setToken (state, token) {
      state.access_token = token
    },
    setCode (state, code) {
      state.authCode = code
    },
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    },
    setTicketInfo (state, ticketInfo) {
      state.ticketInfo = ticketInfo
    },
    setvehicle (state, vehicle_id) {
      state.vehicle_id = vehicle_id
    }
  },
  actions: {
    setQiandao (context, qiandao) { context.commit('setQiandao', qiandao) },
    setQl (context, Ql) {
      context.commit('setQl', Ql)
    },
    setBql (context, Bql) {
      context.commit('setBql', Bql)
    },
    setTicketInfo (context, ticketInfo) {
      context.commit('setTicketInfo', ticketInfo)
    },
    setCode (context, code) {
      context.commit('setCode', code)
    },
    setToken (context, token) {
      context.commit('setToken', token)
    },
    setUserInfo (context, userInfo) {
      context.commit('setUserInfo', userInfo)
    },
    setvehicle (context, vehicle_id) {
      context.commit('setvehicle', vehicle_id)
    }
  }
})
export default store