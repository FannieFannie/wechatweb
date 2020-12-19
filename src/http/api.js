import http from './index'
//const base = process.env.BASE_URL !== '/' ? process.env.BASE_URL : '/api';
export function getRoute () {
  // return http.post(`${base}/getVehicleList`)
  return http.post('http://server.leoking.com/api/gps/getVehicleList')
}