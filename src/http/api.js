import http from './index'
import qs from 'qs'
// import $store from "../store";
//const base = process.env.BASE_URL !== '/' ? process.env.BASE_URL : '/api';
export function getRoute () {
  // return http.post(`${base}/getVehicleList`)
  return http.post('http://server.leoking.com/api/gps/getVehicleList')
}
export function getOath (code) {
  return http({
    method: 'get',
    url: 'http://server.leoking.com/api/login/weChatCallback',
    params: {
      code: code,
      user_genre: '3'
    }
  });
}
export function signIn (data) {
  return http({
    method: 'get',
    url: 'http://server.leoking.com/api/collect/signIn',
    params: data
  });
}
export function getClosestKitchenList (data) {
  return http({
    method: 'post',
    url: 'http://server.leoking.com/api/gps/getClosestKitchenList',
    data: qs.stringify(data)
  })
}
export function getSgn (data) {
  return http({
    method: 'get',
    url: 'http://server.leoking.com/api/login/weChatSignature',
    params: { ...data }
  })
}
export function getBins () {
  return http({
    method: 'post',
    url: 'http://server.leoking.com/api/collect/getCollectBins',
    params: { access_token: localStorage.getItem('user_access_token') }
  })
}
export function signInLog () {
  return http({
    method: 'get',
    url: 'http://server.leoking.com/api/collect/signInLog',
    params: { access_token: localStorage.getItem('user_access_token') }
  })
}
export function getStreet () {
  return http({
    method: 'get',
    url: 'http://server.leoking.com/api/common/getStreet',
  })
}
export function getkicthenByStreet (data) {
  return http({
    method: 'get',
    url: 'http://server.leoking.com/api/gps/getCollectionList',
    params: data
  })
}