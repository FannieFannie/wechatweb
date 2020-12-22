import http from './index'
import qs from 'qs'
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
    method: 'post',
    url: 'http://server.leoking.com/api/collect/signI',
    data: qs.stringify(data)
  });
}
export function getClosestKitchenList (data) {
  return http({
    method: 'post',
    url: 'http://server.leoking.com/api/gps/getClosestKitchenList',
    data: qs.stringify(data)
  })
}
export function getticket (data) {
  return http({
    method: 'get',
    url: 'https://api.weixin.qq.com/cgi-bin/ticket/getticket',
    params: {
      ACCESS_TOKEN: this.$store.state.access_token,
      type: 'jsapi',
      ...data
    }
  })
}