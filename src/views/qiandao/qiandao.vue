<template>
  <div class="parent">
    <div class="weui-cells__group weui-cells__group_form">
      <div class="weui-cell weui-cell_active weui-cell_access">
        <div class="weui-cell__bd label">垃圾桶数</div>
        <div class="weui-cell__bd">
          <input id="bins" class="weui-input" type="number" pattern="[0-9]*" placeholder="请输入桶数" value="" />
        </div>
      </div>

      <div class="weui-cell weui-cell_active weui-cell_access weui-cell_select weui-cell_select-after">
        <div class="weui-cell__hd">
          <label class="weui-label label">签到位置</label>
        </div>

        <div class="weui-cell__bd" style="font-weight:100;font-weight: lighter;color: #00000073;" id="showPicker" @click="showPicker">
          <span v-show="!qiandaoPlace">请选择</span>
          <span v-show="qiandaoPlace" style="color:var(--weui-FG-0);">{{ qiandaoPlace }}
          </span>
        </div>
      </div>
    </div>

    <div class="address">平峦山公园</div>
    <div class="map" v-if="showMap">
      <map-init></map-init>
    </div>
    <div class="lastkuai">
      <div>
        <div style="position:relative;text-align:center;">
          <i @click="qiandaoEvent" class="iconfont icon-weibiaoti--copy"></i>
          <div class="qiandao">
            <div style="margin-bottom:1rem" @click="qiandaoEvent">
              {{ Time(new Date(), "%h:%m") }}
            </div>
            <div>签到</div>
          </div>
        </div>
        <!-- <div style='width:90%;margin-left:5%'>
            <div class='router'>
              <router-link to="/buqiandao">补签到</router-link>
            </div>
          </div> -->
        <div style="color:rgb(0,0,0,0.9);margin-top:1rem;text-align:center">
          <span style="display:inline-block">今日共收运10桶</span>
          <!-- <a href="javascript:;"
               class="weui-btn weui-btn_default">补签到</a> -->
          <span class="bqd">
            <router-link to="/buqiandao">补签到</router-link>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import {  } from "module";
// import { hash_sha1, getString } from "../../util/util";
// import { Options, Vue } from 'vue-class-component'
// import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import { TimeF,getWxconfig } from "../../util/util.js";
import mapInit from "./map/mapinit.vue";
import { signIn, getClosestKitchenList } from "../../http/api.js";

export default {
  data () {
    return {
      form: {},
      qiandaoPlace: "",
      showMap: false,
      location: [],
      departs: []
    };
  },
  async created () {
    this.departs = await getClosestKitchenList()
    this.showMap = true;
  },
  mounted () {
    document.getElementsByTagName("title")[0].text = "产废点签到";
  },
  components: {
    mapInit
  },
  methods: {
    // qiandaofoot () {
    //   debugger
    // },
    // buqiandao() {
    //   debugger
    // },
    qiandaoEvent: async () => {
      await getWxconfig()
      window.wx.ready(function(){
         window.wx.getLocation({
  type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
  success: async function (res) {
    // var speed = res.speed; // 速度，以米/每秒计
    // var accuracy = res.accuracy; // 位置精度
    let data = {
      latitude:res.latitude,longitude:res.longitude,accuracy: res.accuracy,
        access_token: this.$store.state.access_token,
        bins: document.getElementById('bins').getAttribute('value')
      }
      await signIn(data);
      this.$weui.toast("签到成功", {
        duration: 3000,
        className: "bears"
      });
  }
})
      });
      window.wx.error(function(res){
        console.log(res)
      })     
    },
    Time (a, b) {
      return TimeF(a, b);
    },
    showPicker: () => {
      let that = this;
      this.$weui.picker(
        // [
        //   {
        //     label: "兰妈食府",
        //     value: 0
        //   },
        //   {
        //     label: "愿者上钩(翻身店)",
        //     value: 2
        //   },
        //   {
        //     label: "正新鸡排(翻身店)",
        //     disabled: true,
        //     value: 3
        //   }
        // ],
        this.departs,
        {
          onChange: function (result) {
            console.log(result);
          },
          onConfirm: function (result) {
            that.qiandaoPlace = result[0].label;
            console.log(result);
          },
          title: "当前位置"
        }
      );
    }
  }
};
</script>
<style scoped src="./qiandao.css"></style>
