<template>
  <div class="home">
    <div class="content">
      <div class="gongsi" style="margin-bottom:0px">
        <!-- <div class="weui-form__title">产废点签到</div> -->
        <div class="left font">
          <span class="size12px">
            <span class="icon iconfont"></span>{{Time(new Date(),"%y-%M-%d")}}</span>
          <!-- <span style="display:inline-block;width:1rem">
          </span> -->
          <span class="size12px" style="padding-left: 1em;">
            <span class="icon iconfont ">&#xe769;</span>朗坤集团</span>
          <div class='easyPanel' v-show='showVehicle'>
            <span style="display: inline-block;padding-left: 0.5em;width: 48%;">当前车辆:{{vehicle_number}}</span>

            <span class="bqdVehicle">
              <router-link to="/">切换车辆 ></router-link>
            </span>
          </div>
        </div>
      </div>
      <router-view />
    </div>
    <div class="footer">
      <span class="footer1" @click="qiandaoclick">
        <span>

          <!-- <svg class="icon svg-icon"
               aria-hidden="true"> -->
          <!-- <use xlink:href="#icon-icon-test2"> -->
          <svg id="icon-icon-test2" viewBox="0 0 1024 1024">
            <path d="M808.6 403.2c0-178.8-129.8-308.5-308.5-308.5-170.1 0-308.5 138.4-308.5 308.5 0 125.6 170.6 338.3 262.3 452.6l6.8 8.4c9.6 12 24 18.9 39.5 18.9 15.4 0 29.8-6.9 39.5-18.9l6.8-8.4c91.5-114.3 262.1-327 262.1-452.6z m-310.1 89.4c-62.9 0-114-51.1-114-114s51.1-114 114-114 114 51.1 114 114-51.1 114-114 114z" :fill="svgColor"></path>
            <path d="M500.1 67.8c-184.9 0-335.4 150.4-335.4 335.4 0 135 174.5 352.5 268.2 469.4l6.7 8.4c14.8 18.4 36.8 29 60.4 29s45.6-10.6 60.4-29l6.8-8.4C661 755.7 835.4 538.2 835.4 403.2c0-194.3-141-335.4-335.3-335.4z m0 815.3c-15.4 0-29.8-6.9-39.5-18.9l-6.8-8.4c-91.7-114.3-262.3-327-262.3-452.6 0-170.1 138.4-308.5 308.5-308.5 178.8 0 308.5 129.8 308.5 308.5 0 125.6-170.6 338.3-262.3 452.6l-6.8 8.4c-9.5 12-23.9 18.9-39.3 18.9z" :fill="svgColor"></path>
            <path d="M498.5 378.6m-87.2 0a87.2 87.2 0 1 0 174.4 0 87.2 87.2 0 1 0-174.4 0Z" fill="#ffffff"></path>
            <path d="M612.5 378.6c0-62.9-51.1-114-114-114s-114 51.1-114 114 51.1 114 114 114 114-51.1 114-114z m-201.2 0c0-48.1 39.1-87.2 87.2-87.2s87.2 39.1 87.2 87.2-39.1 87.2-87.2 87.2-87.2-39.1-87.2-87.2z" fill="#ffffff"></path>
          </svg>
          <span>签到</span>
        </span>
      </span>
      <span class="footer2" @click="tongjiclick">
        <span>
          <svg id="icon-tongji" viewBox="0 0 1060 1024">
            <path d="M516.133 511.269V1.097c270.518 24.43 485.741 239.616 510.171 510.172H516.133z m427.995 82.322H474.295a42.898 42.898 0 0 1-42.898-42.898V80.859C190.867 102.546 2.304 304.494 2.304 550.656c0 260.681 211.383 471.99 471.99 471.99 246.163 0 448.147-188.488 469.834-429.055z" :fill="color"></path>
          </svg>
          <span>统计</span>
        </span>
      </span>
    </div>
  </div>
</template>

<script >
// import { Options, Vue } from 'vue-class-component'
// import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import { TimeF } from '../../util/util.js'
// import { getticket } from "../../http/api.js";
import Vue from 'vue'

export default {
  provide: function () { //依赖注入
    return {
      eventBus: this.eventBus
    }
  },
  data () {
    return {
      vehicle_number: localStorage.vehicle_number,
      svgColor: '#336699',
      qiandaoPlace: '',
      showMap: false,
      color: '#999',
      showVehicle: true,
      eventBus: new Vue()
    }  },
  async created () {
    this.eventBus.$on('update:selected', a => {
      this.showVehicle = a
    })
    this.showMap = true
  },
  mounted () {
    document.getElementsByTagName('title')[0].text = '产废点签到'
  },
  components: {
    // HelloWorld,
    // mapInit,
    // buQiandao
  },
  methods: {
    initMap () {
      let center1 = new window.TMap.LatLng(22.603842, 113.87075);
      new window.TMap.Map("container", {
        center: center1
      });
      if (window.wx) {
        window.wx.ready(function () {
          window.wx.getLocation();
        });
      }
    },
    tongjiclick () {
      this.svgColor = '#999'
      this.color = '#336699'
      this.$router.push({ name: 'tongji' })
    },
    qiandaoclick () {
      this.color = '#999'
      this.svgColor = '#336699'
      this.$router.push({ name: 'qiandao' })
    },

    Time (a, b) {
      return TimeF(a, b)
    }

  }
}

</script>
<style scoped src="./qiandao.css">
</style>
<style scoped >
.el-button--mini,
.el-button--mini.is-round {
  padding: 0px 0px;
}
</style>
