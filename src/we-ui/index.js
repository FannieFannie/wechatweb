
import weuis from 'weui.js'

const weui = {
  ...weuis,
  install: function (app) {
    app.config.globalProperties.$weui = weui;
  }
}

export default weui 