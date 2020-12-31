<template>
  <div class="parent">
    <div class="weui-cells__group weui-cells__group_form" style="margin-bottom:0.3em">
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

    <!-- <div class="address">平峦山公园</div> -->
    <div class="map" v-if="showMap">

    </div>
    <div class="lastkuai">
      <div>
        <div style="position:relative;text-align:center;">
          <i @click="qiandaoEvent" class="iconfont icon-weibiaoti--copy"></i>
          <div class="qiandao" @click="qiandaoEvent">
            <div style="margin-bottom:1rem">
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
          <span style="display:inline-block">今日共收运{{count}}桶    </span>
          <!-- <a href="javascript:;"
               class="weui-btn weui-btn_default">补签到</a> -->
          <span class="bqd" >
            <router-link to="/buqiandao">点击补签到</router-link>
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
import { TimeF, getWxconfig } from "../../util/util.js";
// import mapInit from "./map/mapinit.vue";
import { signIn, getClosestKitchenList, getBins } from "../../http/api.js";
let that;
export default {
 inject:['eventBus'],
  beforeCreate () {
    that = this
  },
  data () {
    return {
      form: {},
      qiandaoPlace: "",
      showMap: false,
      location: [],
      departs: [],
      count: 0
    };
  },
  async created () {
    this.eventBus.$emit('update:selected', true)
    await getWxconfig()
    window.wx.ready(function () {
      window.wx.getLocation({
        type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: async function (res) {
          let departs = []
          // var speed = res.speed; // 速度，以米/每秒计
          // var accuracy = res.accuracy; // 位置精度
          // that.showMap = true;
          departs = await getClosestKitchenList({
            latitude: res.latitude,
            longitude: res.longitude
          })
          that.$store.dispatch('setQl', [res.latitude, res.longitude])
          that.departs = that.formatterDepart(departs.data)
        },
        fail: function () {
          that.$weui.alert('获取定位失败，')
        }
      })
    });
    let bins = await getBins()
    this.count = bins.data.bins
  },
   mounted () {
    document.getElementsByTagName("title")[0].text = "产废点签到";
  },
  components: {

  },
  methods: {
    changeHeight(){
      // document.documentElement.clientHeight=localStorage.height+'px'
    },
    formatterDepart (arr) {
      let arr1 = arr.map((item) => {
        return { label: item.name, value: item.id }
      })
      return arr1
    },
    // qiandaofoot () {
    //   debugger
    // },
    // buqiandao() {
    //   debugger
    // },
    qiandaoEvent: async () => {
      if (that.validateForm() == -1) {
        return
      }
      // var speed = res.speed; // 速度，以米/每秒计
      // var accuracy = res.accuracy; // 位置精度

      let data = {
        ...{ latitude: that.$store.state.Ql[0], longitude: that.$store.state.Ql[1] },
        access_token: localStorage.getItem('user_access_token'),
        bins: document.getElementById('bins').value,
        collect_id: that.collect_id,
        vehicle_id: localStorage.vehicle_id,
        is_supplement: '0'
      }
      let result = await signIn(data);
      if (result.code == -1) {
        // this.$weui.toast("登录信息失效，", {
        //   duration: 3000,
        //   className: "bears"
        // });
        return;
      }
      if (result.code == 200) {
        that.$weui.toast("签到成功", {
          duration: 3000,
          className: "bears",
          callback: function(){ that.$router.push({ name: 'tongji' })}
        });

      }

    },
    validateForm () {
      if (!localStorage.vehicle_id && localStorage.vehicle_id == 'undefined') {
        that.$weui.alert('请返回首页选择车辆')
        return -1
      }
      if (!document.getElementById('bins').value||document.getElementById('bins').value == '' || that.qiandaoPlace == '') {
        that.$weui.alert('请输入餐厨桶数和产废单位！')
        return -1
      }
    },
    Time (a, b) {
      return TimeF(a, b);
    },
    showPicker: () => {
      that.$weui.picker(
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
        that.departs,
        {
          onChange: function (result) {
            console.log(result);
          },
          onConfirm: function (result) {
            that.qiandaoPlace = result[0].label;
            that.collect_id = result[0].value;
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
