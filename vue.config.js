module.exports = {
  devServer: {
    port: 3333,
    proxy: {
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      '/api': {
        target: 'http://server.leoking.com/api/gps/getVehicleList',
        changeOrigin: true,
        ws: true
      }
    }
  }
}