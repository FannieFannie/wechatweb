import Time from "time.js";
import { getOath, getSgn } from "../http/api.js";
import { wxs } from "./wx/wx.js"
import $store from "../store";
import $weui from "../we-ui/index.ts";
import router from '../router'


// import { hash_sha1, getString } from "../../../util/util";
// import { getticket } from "../http/api";
export function TimeF (a, b) {
  return Time(a, b);
}
export function sort_ascii (obj) {
  let arr = new Array();
  let num = 0;
  for (let i in obj) {
    arr[num] = i;
    num++;
  }
  let sortArr = arr.sort();
  //let sortObj = {};    //完成排序值
  let str = ""; //自定义排序字符串
  for (let i in sortArr) {
    str += sortArr[i] + "=" + obj[sortArr[i]] + "&";
    //sortObj[sortArr[i]] = obj[sortArr[i]];
  }
  //去除两侧字符串
  let char = "&";
  str = str.replace(new RegExp("^\\" + char + "+|\\" + char + "+$", "g"), "");
  return str;
  //return sortObj;
}

export function getsha1String (jsapi_ticket, noncestr, timestamp, url) {
  return (
    "jsapi_ticket=" +
    jsapi_ticket +
    "&noncestr=" +
    noncestr +
    "&timestamp=" +
    timestamp +
    "&url=" +
    url
  );
}

export async function getWxconfig () {

  if (!window.wx) {
    window.wx = await wxs();
  }
  // if (!localStorage.getItem('sgn') || localStorage.getItem('sgn') == 'undefined') {
  //   await getSUtil()
  // }
  // let timestamp = Math.round(new Date().getTime() / 1000)
  // let ticket = localStorage.getItem('ticket')
  let url = location.href.split('#')[0]
  // let string1 = getsha1String(ticket, 'we', timestamp, url)
  // let sha1 = new jsSHA(string1, "TEXT")
  // let signature = sha1.getHash("SHA-1", "HEX")
  // let signature = sign(ticket, url);
  var loading = $weui.loading('loading', {
    className: 'custom-classname'
  });
  window.loading = loading
  setTimeout(function () {
    loading.hide(function () {
      if (window.location.hash == '#/qiandao' && $store.state.qiandao === false) {
        $weui.confirm('获取定位超时，可以尝试补签到噢！', {
          buttons: [{
            label: '重试',
            type: 'default',
            onClick: async function () {
              await getWxconfig()
            }
          }, {
            label: '补签到',
            type: 'primary',
            onClick: function () {
              router.push({ name: 'buqiandao' })
            }
          },
          {
            label: '退出',
            type: 'primary',
            onClick: function () {
              window.wx.closeWindow();
            }
          }
          ]
        }
        )
      }

    });
  }, 3000);
  let jsData = await getSgn({ url: encodeURIComponent(url) })
  window.wx.config({
    // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: "wx64aa611897a94330", // 必填，公众号的唯一标识
    timestamp: jsData.data.timestamp, // 必填，生成签名的时间戳
    nonceStr: jsData.data.noncestr, // 必填，生成签名的随机串
    signature: jsData.data.signature, // 必填，签名
    jsApiList: ["getLocation"] // 必填，需要使用的JS接口列表
  });
  window.wx.ready(function () {
    window.wx.getLocation({
      type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      success: async function () {
        loading.hide()
        $store.dispatch('setQiandao', true)
      }
    })
  })

  window.wx.error(async () => {
    loading.hide()
    if (window.location.hash == '#/qiandao' && $store.state.qiandao === false) {
      $weui.confirm('获取定位失败，可以尝试补签到噢！', {
        buttons: [{
          label: '重试',
          type: 'default',
          onClick: async function () {
            await getWxconfig()
          }
        }, {
          label: '补签到',
          type: 'primary',
          onClick: function () {
            router.push({ name: 'buqiandao' })
          }
        },
        {
          label: '退出',
          type: 'primary',
          onClick: function () {
            window.wx.closeWindow();
          }
        }
        ]
      }
      )
    }
  });
}

export async function getOathUtil () {
  let data = await getOath(localStorage.getItem('code'))
  window.localStorage.setItem("user_access_token", data.data.access_token);
  $store.dispatch('setToken', data.data.access_token)
  window.localStorage.setItem("user_info", JSON.stringify(data.data.user_info));
  $store.dispatch('setUserInfo', data.data.user_info)
}
// export async function getSUtil () {
//   let jsData = await getSgn()
//   localStorage.setItem("ticket", jsData.data.ticket);
//   $store.dispatch('setUserInfo', jsData.data.ticket)
// }
export function getUrlParam (name) {//封装方法
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg); //匹配目标参数
  if (r != null) return unescape(r[2]);
  return null; //返回参数值
}