<template>
  <div class="content" style="height:100%;display:flex;align-items:center;flex-direction: column;
   justify-content:center;">
    <div class="InfoPanel" style="flex-direction:row!important">
      <div style="margin-top: 0.5em;width: 30%;">
        个人信息
      </div>
      <div style="display:flex;width:70%">
        <div style="width: 10%;"><img style="height:1em" :src="avartar" /></div>
        <div>{{nickname}}</div>

      </div>
    </div>
    <div class="panel">
      <div class="oathPanel">
        <div style="height: 1.3em;display: flex;">
          <img style="height:100%" src="../../assets/langkunlogo.jpg" />
          <span>朗坤餐厨垃圾收运 </span>
        </div>
        <div>申请获得以下信息</div>
      </div>
      <div style="margin-top:1rem">
        <el-form ref="form" :rules="rules" :model="form" label-width="30%" size="mini">
          <el-form-item label="车辆类型" prop="vehicle_type">
            <el-select v-model="form.vehicle_type" filterable @visible-change="blurEvent">
              <el-option label="平板车" value="1"></el-option>
              <el-option label="八吨车" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="今日车辆" prop="vehicle_number">
            <el-select v-model="form.vehicle_number" filterable @visible-change="blurEvent">
              <el-option v-for="item in vehicleFilter(form.vehicle_type)" :label="item.vehicle_number" :value="item.id" :key="item.vehicle_number"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="onSubmit">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
let allVehicles = []
import { getRoute } from "../../http/api";
import { getOathUtil } from "../../util/util.js";

export default {
  methods: {
    blurEvent () {
      window.scroll(0, 0)
    },
    async getOath () {
      if (!localStorage.getItem('user_access_token') || localStorage.user_access_token == 'undefined') {
        getOathUtil()
      } else {
        this.nickname = JSON.parse(localStorage.user_info).name
        this.avartar = JSON.parse(localStorage.user_info).avatar
      }
    },
    onSubmit () {
      let that = this
      that.$refs.form.validate((valid) => {
        that.$store.dispatch('setvehicle', that.form.vehicle_number)
        localStorage.setItem('vehicle_id', that.form.vehicle_number)
        let vehicles = that.vehicleFilter(that.form.vehicle_type)
        let vehicle = vehicles.find(item => {
          return item.id == that.form.vehicle_number
        })
        localStorage.setItem('vehicle_number', vehicle.vehicle_number)
        if (valid) { this.$router.push({ path: '/qiandao' }) }
      })
    },
    vehicleFilter (val) {
      return allVehicles.filter(item => {
        return val == item.vehicle_type
      })
    }
  },
  data () {
    return {
      nickname: '',
      avartar: '',
      form: {},
      rules: {
        vehicle_number: [{ required: true, message: '请选择' },],
        vehicle_type: [{ required: true, message: '请选择' }]
      }
    };
  },
  filters: {
    // vehicleFilter (val) {
    //   return allVehicles.filter(item => {
    //     return val == item.vehicle_number
    //   })
    // },
  },
  computed: {
    vehicles: function () {
      return allVehicles.filter(item => {
        return this.vehicle_type == item.vehicle_number
      })
    }
  },
  async created () {
    let height = document.getElementsByTagName('html')[0].clientHeight
    localStorage.setItem('height', height)
    document.getElementsByTagName('title')[0].text = '产废点补签到'
    let code = window.location.search.split(/[?]|[&]|[=]/) && window.location.search.split(/[?]|[&]|[=]/)[2] ?
      window.location.search.split(/[?]|[&]|[=]/)[2] : '011L03000hR0SK1ACZ200T8iir0L030n'
    this.$store.dispatch('setCode', code)
    localStorage.setItem('code', code)
    await this.getOath()
    let res = await getRoute();
    allVehicles = res.data
  },

};
</script>
<style scoped>
@import url('./getOath.scss');
</style>
