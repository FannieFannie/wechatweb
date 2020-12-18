<template>
  <div class="content" style="height:100%;display:flex;align-items:center;
   justify-content:center;">
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
            <el-select v-model="form.vehicle_type" filterable>
              <el-option label="平板车" value="1"></el-option>
              <el-option label="八吨车" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="今日车辆" prop="vehicle_number">
            <el-select v-model="form.vehicle_number" filterable>
              <el-option v-for="item in vehicleFilter(form.vehicle_type)" :label="item.vehicle_number" :value="item.vehicle_number" :key="item.vehicle_number"></el-option>
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
export default {
  methods: {
    onSubmit () {
      let that = this
      this.$refs.form.validate((valid) => {
        console.log(that)
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
    let res = await getRoute();
    allVehicles = res.data
  }
};
</script>
<style scoped>
@import url('./getOath.scss');
</style>
