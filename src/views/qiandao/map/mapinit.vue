<template>
  <div id="container" style="width:100%; height:100%"></div>
</template>

<script>

// import { sort_ascii } from '../../../util/util.js'



export default {
  async beforeCreate () {
    if (!window.TMap) {
      [window.TMap, window.wx] = await MP();
      this.initMap()
    } else {
      this.initMap()
    }
  },
  data () {
    return {
      map: null,
      getAddress: null,
      getAddCode: null,
      addressKeyword: "",
      marker: ""
    };
  },

  mounted () {

  },
  // updated(){
  //   this.init()
  // },
  methods: {
    // initMap () {
    //   let center1 = new window.TMap.LatLng(22.603842, 113.87075);
    //   new window.TMap.Map("container", {
    //     center: center1
    //   });
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
    // },
    async init () {

    }
  }
};
</script>
