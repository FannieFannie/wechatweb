<template>
  <div class="parent">
    <div class="weui-cells__group weui-cells__group_form">
      <div style="padding: 0.8rem 0 0.5rem 0;">
        <div style="padding:0.5rem 0 0.2rem 0">
          补签街道-产废单位
        </div>
        <div class="cell weui-cell_active weui-cell_access ">
          <div class="weui-cell__hd" style="padding-right: 0.2em;">
            <el-select name="jiedao" placeholder="请选择" @change='getStreet' v-model.number="street" size='mini'>
              <el-option :value="item.id" v-for="(item,index) in streets" :key='index' :label="item.name"></el-option>
            </el-select>
          </div>

          <div class="weui-cell__bd">
            <el-select name="cars" placeholder="请选择" v-model.number="collect_id" size='mini' filterable>
              <el-option v-for='(item) in kitchens' :key='item.id' :value="item.id" :label="item.name"></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="weui-cell weui-cell_active weui-cell_access ">
        <div class="weui-cell__bd label ">垃圾桶数</div>
        <div class="weui-cell__bd">
          <input class="weui-input" id="bins" type="number" pattern="[0-9]*" placeholder="请输入桶数" value="">
        </div>
      </div>
    </div>
    <div class='buqiandaoIcon'>
      <div>
        <div style="position:relative;text-align:center;">
          <i @click="qiandaoEvent" class='iconfont icon-weibiaoti--copy'></i>
          <div @click="qiandaoEvent" class="qiandao">
            <div style="margin-bottom:1rem">
              {{Time(new Date(),"%h:%m")}}</div>
            <div>签到</div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script >
// import { Options, Vue } from 'vue-class-component'
// import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import { TimeF, getWxconfig } from '../../util/util'
import { signIn, getStreet, getkicthenByStreet } from "../../http/api";
// import mapInit from './map/mapinit.vue'
// import buQiandao from './buqiandao.vue'
let that
export default {
  // created(){
  //   document.getElementsByTagName('title').innerText='产废点补签到'
  // },
  inject: ['eventBus'],
  async beforeCreate () {
    that = this
    let data1 = await getStreet()
    that.streets = data1.data
    let data2 = await getkicthenByStreet()
    that.street = that.streets[0].id
    that.kitchenAll = data2.data
    that.kitchens = data2.data.filter(item => {
      return item.street == that.street
    })
    that.collect_id = that.kitchens[0].id
  },
  async created () {
    this.eventBus.$emit('update:selected', true)
    let data = {
      access_token: localStorage.getItem('user_access_token'),
      bins: 0,
      collect_id: that.collect_id,
      vehicle_id: localStorage.vehicle_id,
      is_supplement: '1'
    }
    await getWxconfig()
    window.wx.getLocation({
      type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      success: async function (res) {
        // var speed = res.speed; // 速度，以米/每秒计
        // var accuracy = res.accuracy; // 位置精度
        that.$store.dispatch('setBql', [res.latitude, res.longitude])
        that.data = {          ...data, ...{            latitude: that.$store.state.Bql[0],
            bins: document.getElementById('bins').value, longitude: that.$store.state.Bql[1]          }        }
        // this.$store.dispatch('setBql', res.latitude)          
      },
      fail: function () {
        that.data = { ...data, ...{ bins: document.getElementById('bins').value, latitude: '', longitude: '' } }
      }
    })
  },
  data () {
    return {
      data: {},
      kitchens: [],
      streets: [],
      collect_id: 1,
      kitchenAll: [],
      street: ''

    }
  },
  mounted () {
    document.getElementsByTagName('title')[0].text = '产废点补签到'
  },
  components: {
    // HelloWorld,
    // mapInit,
    // buQiandao
  },
  methods: {
    kitchenChoose () {
      // that.kitchens = that.kitchenAll.filter(item => {
      //   return item.street == that.street
      // })
    },
    // qiandaofoot () {
    //   debugger
    // },
    getStreet () {

      that.kitchens = that.kitchenAll.filter(item => {
        if (item.street == 4) {
          console.log(item)
          debugger
        }
        return parseInt(item.street) == that.street
      })

      that.collect_id = that.kitchens[0].id
    },
    tongji () {
      this.$router.push({ name: 'tongji' })
    },

    async qiandaoEvent () {
      if (that.validateForm() == -1) {
        return
      }

      that.data = {        ...that.data, ...{          bins: document.getElementById('bins').value, collect_id: that.collect_id,
          latitude: '', longitude: ''        }      }
      let res = await signIn(that.data);
      if (res.code == 200) {
        that.$weui.toast("签到成功", {
          duration: 3000,
          className: "bears",
          callback: function () { that.$router.push({ name: 'tongji' }) }
        });
      }


    },
    validateForm () {
      if (!localStorage.vehicle_id || localStorage.vehicle_id == 'undefined') {
        that.$weui.alert('请返回首页选择车辆')
        return -1
      }
      that.collect_id
      if (document.getElementById('bins').value == '' || !that.collect_id) {
        that.$weui.alert('请输入餐厨桶数和产废单位！')
        return -1
      }
    },
    Time (a, b) {
      return TimeF(a, b)
    }

  }
}

</script>
<style scoped src="./qiandao.css">
</style>
<style scoped>
.cell {
  position: relative;
  display: flex;
  align-items: center;
}
/* .gongsi {
  margin: 0.2rem 0 0.5rem 0;
} */
.weui-cell:before {
  content: '' !important;
  height: 0px !important;
}
.buqiandaoIcon {
  flex: 1;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
}
</style>
