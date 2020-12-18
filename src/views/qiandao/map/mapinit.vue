<template>
  <div id="container" style="width:100%; height:100%"></div>
</template>

<script>
import { MP } from "./map.js";
import { wxs } from "../wx/wx.js";
export default {
  data () {
    return {
      map: null,
      getAddress: null,
      getAddCode: null,
      addressKeyword: "",
      marker: ""
    }
  },
  mounted () {
    this.init()
  },
  // updated(){
  //   this.init()
  // },
  methods: {
    async init () {


      // eslint-disable-next-line no-const-assign
      // eslint-disable-next-line prettier/prettier
      // eslint-disable-next-line no-undef
      if (!window.TMap) {
        window.TMap = await MP()
        let center1 = new window.TMap.LatLng(22.603842, 113.870750);
        new window.TMap.Map("container", {
          center: center1
        });
      } else {
        let center2 = new window.TMap.LatLng(22.603842, 113.870750);
        this.map = new window.TMap.Map("container", {
          center: center2
        });
      }
      if (!window.wx) {
        window.wx = await wxs()
      }
    }
  }
}
</script>
