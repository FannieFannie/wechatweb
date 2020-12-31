<template>
  <div id="container" style="width:100%; height:100%"></div>
</template>

<script>
import { MP } from "./map.js";
// import { sort_ascii } from '../../../util/util.js'

export default {
  data () {
    return {
      map: null,
      getAddress: null,
      getAddCode: null,
      addressKeyword: "",
      marker: ""
    };
  },
  async created () {

  },
  async mounted () {
    
    if (!window.TMap) {
      window.TMap = await MP();
      this.initMap()
    } else {
      this.initMap()
    }
  },
  // updated(){
  //   this.init()
  // },
  methods: {
    initMap () {
      // localStorage.setItem('latitude', res.latitude)
      // localStorage.setItem('longitude', res.longitude)
      let center = new window.TMap.LatLng(parseFloat(this.$store.state.Ql[0]), parseFloat(this.$store.state.Ql[1]))
      let map = new window.TMap.Map("container", {
        center: center,
        zoom: 11
      });

      //初始化marker
      new window.TMap.MultiMarker({
        id: "marker-layer", //图层id
        map: map,
        styles: { //点标注的相关样式
          "marker": new window.TMap.MarkerStyle({
            "width": 25,
            "height": 35,
            "anchor": { x: 16, y: 32 },
            "src": "https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/markerDefault.png"
          })
        },
        geometries: [{ //点标注数据数组
          "id": "demo",
          "styleId": "marker",
          "position": center,
          "properties": {
            "title": "marker"
          }
        }]
      });
      //   if (window.wx) {
      //     window.wx.config({
      //       debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      //       appId: "wx64aa611897a94330", // 必填，公众号的唯一标识
      //       timestamp: Math.round(new Date().getTime() / 1000), // 必填，生成签名的时间戳
      //       nonceStr: "1", // 必填，生成签名的随机串
      //       signature: hash_sha1(getString()), // 必填，签名
      //       jsApiList: ["getLocation"] // 必填，需要使用的JS接口列表
      //     });
      //     window.wx.ready(function () {
      //       window.wx.getLocation();
      //     });
      //   }
    },
    async init () {

    }
  }
};
</script>
