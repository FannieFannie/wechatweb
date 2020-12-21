import http from './index'
//const base = process.env.BASE_URL !== '/' ? process.env.BASE_URL : '/api';
export function getRoute () {
  // return http.post(`${base}/getVehicleList`)
  return http.post('http://server.leoking.com/api/gps/getVehicleList')
}
export function getOath () {
  return http({
    method: 'get',
    url: 'http://server.leoking.com/api/login/weChatCallback',
    data: {
      code: this.$store.state.authCode,
      user_genre: '3'
    }
  });

}