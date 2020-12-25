<template>
  <table>
    <thead>
      <tr>
        <th>&#12288;</th>
        <th>签到点</th>
        <th>垃圾桶数</th>
        <th>签到时间</th>``
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item,index) in logTable" :key='index'>
        <td class='number'>
          <span class="number1">{{index+1}}</span>
        </td>
        <td title="签到点">{{item.collect_name}}</td>
        <td title="垃圾桶数">{{item.bins}}</td>
        <td title="签到时间">{{item.created_at}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
// import { Options, Vue } from 'vue-class-component'
// import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import { TimeF } from '../../util/util'
import { signInLog } from "../../http/api";
export default {
  data () {
    return {
      logTable: []
    }
  },
  async created () {
    let data = await signInLog()
    this.logTable = data.data
  },
  mounted () {
    document.getElementsByTagName('title')[0].text = '统计'
  },
  methods: {
    qiandaofoot () {
      this.$router.go(-1)
    },
    Time (a, b) {
      return TimeF(a, b)
    }
    // qiandaofoot($event){
    //   document.getElementById('icon-icon-test2').firstChild.setAttribute('fill','#0066ff')
    //   document.getElementById('icon-icon-test2').children[1].setAttribute('fill','#0066ff')

    //   document.getElementsByClassName('footer2')[0].style.color='rgb(0,0,0,0.7)'
    // },
  }
}

</script>
<style scoped src="./qiandao.css">
</style>
<style scoped >
weui-table,
table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  line-height: 32px;
  text-align: center;
  border: none;
}
.content {
  margin-left: 5%;
  width: 90%;
}
* {
  margin: 0;
  padding: 0;
}
user agent stylesheet table {
  display: table;
  border-collapse: separate;
  box-sizing: border-box;
  border-spacing: 2px;
  border-color: grey;
}
.headerTongji {
  border-bottom: solid 0.05rem rgb(0, 0, 0, 0.2);
  margin-bottom: 1rem;
  padding-bottom: 0.4rem;
}

.number1 {
  color: #fff;
  line-height: 1.2rem;
  display: inline-block;
  background-color: #336699;
  border: solid 1px #fff;
  border-radius: 50%;
  height: 1.2rem;
  width: 1.2rem;
  box-shadow: 1px 0px 2px 1px rgba(0, 0, 0, 0.7);
}
/* #app {
 
} */
</style>

