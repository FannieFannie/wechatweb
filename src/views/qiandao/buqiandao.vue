<template>
  <div class="parent">
    <div class="weui-cells__group weui-cells__group_form">
      <div style="padding: 0.8rem 0 0.5rem 0;">
        <div style="padding:0.5rem 0 0.2rem 0">
          补签街道-产废单位
        </div>
        <div class="cell weui-cell_active weui-cell_access ">
          <div class="weui-cell__hd">
            <span class="spanSelect">
              <select name="jiedao">
                <option value="volvo">新安</option>
                <option value="saab">西乡</option>
                <option value="fiat">沙井</option>
                <option value="audi">航城</option>
                <option value="audi">航城</option>
                <option value="audi">航城</option>
              </select>
            </span>
          </div>
          <span style="font-size:14px">{{qiandaoPlace}}</span>
          <div class="weui-cell__bd">
            <span class="spanSelect">
              <select name="cars">
                <option value="volvo">小时候湘</option>
                <option value="saab">正新鸡排</option>
                <option value="fiat">愿者上钩</option>
                <option value="audi">上海老馄饨</option>
              </select>
            </span>
          </div>
        </div>
      </div>
      <div class="weui-cell weui-cell_active weui-cell_access ">
        <div class="weui-cell__bd label ">垃圾桶数</div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="number" pattern="[0-9]*" placeholder="请输入桶数" value="">
        </div>
      </div>
    </div>
    <div class='buqiandaoIcon'>
      <div>
        <div style="position:relative;text-align:center;">
          <i @click="qiandaoEvent" class='iconfont icon-weibiaoti--copy'></i>
          <div class="qiandao">
            <div style="margin-bottom:1rem" @click="qiandaoEvent">
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
import { TimeF } from '../../util/util'
// import mapInit from './map/mapinit.vue'
// import buQiandao from './buqiandao.vue'
export default {
  // created(){
  //   document.getElementsByTagName('title').innerText='产废点补签到'
  // },
  data () {
    return {
      qiandaoPlace: ''
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
    // qiandaofoot () {
    //   debugger
    // },
    tongji () {
      this.$router.push({ name: 'tongji' })
    },
    buqiandao () {
      debugger
    },
    qiandaoEvent () {
      this.$weui.toast('签到成功', {
        duration: 1000,
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
