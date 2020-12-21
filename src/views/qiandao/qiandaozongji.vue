<template>
  <div class="home">
    <div class="content">
      <div class="gongsi">
        <!-- <div class="weui-form__title">产废点签到</div> -->
        <div class="left font">
          <span class="size12px">
            <span class="icon iconfont"></span>{{Time(new Date(),"%y-%M-%d")}}</span>
          <span style="display:inline-block;width:1rem">
          </span>
          <span class="size12px">
            <span class="icon iconfont size2rem"></span> 朗坤集团</span>
        </div>
      </div>
      <router-view />
    </div>
    <div class="footer">
      <span class="footer1" @click="qiandaoclick">
        <span>
          <span>
            <!-- <svg class="icon svg-icon"
               aria-hidden="true"> -->
            <!-- <use xlink:href="#icon-icon-test2"> -->
            <svg xlink:href="#icon-icon-test2" id="icon-icon-test2" viewBox="0 0 1024 1024">
              <path d="M808.6 403.2c0-178.8-129.8-308.5-308.5-308.5-170.1 0-308.5 138.4-308.5 308.5 0 125.6 170.6 338.3 262.3 452.6l6.8 8.4c9.6 12 24 18.9 39.5 18.9 15.4 0 29.8-6.9 39.5-18.9l6.8-8.4c91.5-114.3 262.1-327 262.1-452.6z m-310.1 89.4c-62.9 0-114-51.1-114-114s51.1-114 114-114 114 51.1 114 114-51.1 114-114 114z" :fill="svgColor"></path>
              <path d="M500.1 67.8c-184.9 0-335.4 150.4-335.4 335.4 0 135 174.5 352.5 268.2 469.4l6.7 8.4c14.8 18.4 36.8 29 60.4 29s45.6-10.6 60.4-29l6.8-8.4C661 755.7 835.4 538.2 835.4 403.2c0-194.3-141-335.4-335.3-335.4z m0 815.3c-15.4 0-29.8-6.9-39.5-18.9l-6.8-8.4c-91.7-114.3-262.3-327-262.3-452.6 0-170.1 138.4-308.5 308.5-308.5 178.8 0 308.5 129.8 308.5 308.5 0 125.6-170.6 338.3-262.3 452.6l-6.8 8.4c-9.5 12-23.9 18.9-39.3 18.9z" :fill="svgColor"></path>
              <path d="M498.5 378.6m-87.2 0a87.2 87.2 0 1 0 174.4 0 87.2 87.2 0 1 0-174.4 0Z" fill="#ffffff"></path>
              <path d="M612.5 378.6c0-62.9-51.1-114-114-114s-114 51.1-114 114 51.1 114 114 114 114-51.1 114-114z m-201.2 0c0-48.1 39.1-87.2 87.2-87.2s87.2 39.1 87.2 87.2-39.1 87.2-87.2 87.2-87.2-39.1-87.2-87.2z" fill="#ffffff"></path>
            </svg>
            <!-- </use> -->
            <!-- </svg> -->
          </span>
          <span>签到</span>
        </span>
      </span>
      <span class="footer2" @click="tongjiclick">
        <span>
          <div class="tongji" :style="{color:`${color}`}">
            <i class='iconfont icon-tongji'></i>
          </div>
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
import { getOath } from "../../http";
// import mapInit from './map/mapinit.vue'
// import buQiandao from './buqiandao.vue'
export default {
  data () {
    return {
      svgColor: '#336699',
      qiandaoPlace: '',
      showMap: false,
      color: '#999'
    }  },
  created () {
    let code = window.location.search.split(/[?]|[&]|[=]/) && window.location.search.split(/[?]|[&]|[=]/)[2] ?
      window.location.search.split(/[?]|[&]|[=]/)[2] : '061sC3ml2IObd640L1ll2YuhIf2sC3mm'
    this.$store.dispatch('setCode', code)
    getOath()
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
    qiandaoEvent () {
      this.$weui.toast('签到成功', {
        duration: 3000,
        className: 'bears'
      })
    },
    Time (a, b) {
      return TimeF(a, b)
    },
    showPicker () {
      const that = this
      this.$weui.picker(
        [
          {
            label: '兰妈食府',
            value: 0
          },
          {
            label: '小时候湘',
            value: 1
          },
          {
            label: '愿者上钩(翻身店)',
            value: 2
          },
          {
            label: '正新鸡排(翻身店)',
            disabled: true,
            value: 3
          },
          {
            label: '天台烧烤',
            value: 4
          }
        ],
        {
          onChange: function (result) {
            console.log(result)
          },
          onConfirm: function (result) {
            that.qiandaoPlace = result[0].label
            console.log(result)
          },
          title: '当前位置'
        }
      )
    }
  }
}

</script>
<style scoped src="./qiandao.css">
</style>
