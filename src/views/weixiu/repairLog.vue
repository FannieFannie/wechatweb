<template>
  <div style="height:100%">
    <div style="margin:0.3em 1em">
      <div style="margin:0.3em 0">
        <span class='spanPanel' style="font-weight:100;font-weight: lighter;color: #00000073;" id="showPicker" @click="showPicker">
          <span style="color:var(--weui-FG-0);">
            <svg t="1610697907025" style="width:1em;height:1em" class="icon" viewBox="0 0 1000 1000" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="2627" width="200" height="200">
              <path d="M843.75 968.75h-687.5c-34.5 0-62.5-28-62.5-62.5v-687.5c0-34.5313 28-62.5 62.5-62.5h62.5v31.25c0 51.7813 41.9688 93.75 93.75 93.75 51.75 0 93.75-41.9688 93.75-93.75v-31.25h187.5v31.25c0 51.7813 42 93.75 93.75 93.75s93.75-41.9688 93.75-93.75v-31.25h62.5c34.5 0 62.5 27.9688 62.5 62.5v687.5c0 34.5-28 62.5-62.5 62.5zM843.75 375h-687.5v531.25h687.5v-531.25zM312.5 531.25h-93.75v-93.75h93.75v93.75zM312.5 687.5h-93.75v-93.75h93.75v93.75zM312.5 843.75h-93.75v-93.75h93.75v93.75zM468.75 531.25h-93.75v-93.75h93.75v93.75zM468.75 687.5h-93.75v-93.75h93.75v93.75zM468.75 843.75h-93.75v-93.75h93.75v93.75zM625 531.25h-93.75v-93.75h93.75v93.75zM625 687.5h-93.75v-93.75h93.75v93.75zM625 843.75h-93.75v-93.75h93.75v93.75zM781.25 531.25h-93.75v-93.75h93.75v93.75zM781.25 687.5h-93.75v-93.75h93.75v93.75zM781.25 843.75h-93.75v-93.75h93.75v93.75zM686.5313 250c-34 0-61.5313-27.5625-61.5313-61.5313v-64.4375c0-34 27.5313-61.5313 61.5313-61.5313s61.5313 27.5313 61.5313 61.5313v64.4375c0 33.9688-27.5313 61.5313-61.5313 61.5313zM311.5313 250c-34 0-61.5313-27.5625-61.5313-61.5313v-64.4375c0-34 27.5313-61.5313 61.5313-61.5313s61.5313 27.5313 61.5313 61.5313v64.4375c0 33.9688-27.5625 61.5313-61.5313 61.5313z"
                p-id="2628"></path>
            </svg>
            <span style="display:inline-block;width:6em;text-align:center">{{ day }}</span>
            <svg style="width:1em;height:1em;vertical-align: bottom;" t="1610702051235" class="icon" viewBox="0 0 1024 1024" version="1.1"
              xmlns="http://www.w3.org/2000/svg" p-id="4264" width="200" height="200">
              <path d="M514.41664 737.36704a25.7536 25.7536 0 0 1-17.6384-6.93248 10.56768 10.56768 0 0 0-0.94208-1.05984 14.9248 14.9248 0 0 0-2.72384-2.03264l-398.42304-394.8544a25.78432 25.78432 0 0 1-7.68-18.30912 25.75872 25.75872 0 0 1 7.51616-18.36544 25.76896 25.76896 0 0 1 18.42176-7.68c6.8864 0 13.36832 2.66752 18.25792 7.51616l382.84288 379.40736 377.59488-381.04576a25.82016 25.82016 0 0 1 18.7904-8.064c6.72256 0 13.1072 2.57024 17.95584 7.23456a25.73312 25.73312 0 0 1 7.94624 18.16576 25.74848 25.74848 0 0 1-7.22944 18.46272l-396.29312 399.89248a25.74848 25.74848 0 0 1-18.39616 7.66464z"
                p-id="4265"></path>
            </svg>
          </span>
        </span>
      </div>
      <div class="header">
        <img style="border-radius: 50%;height:100%;width:4em;vertical-align: middle;vertical-align: middle;" :src='user_info.avatar'
        />
        <div style="display:inline-block;vertical-align: middle;">
          <div style="    line-height: 1.5;">{{user_info.name}}</div>
          <div style="    line-height: 1.5;">今日共申报{{logTable.length}}次</div>
          <div style="  font-size: 0.8em;
    color: rgb(0,0,0,0.4);">深圳市朗坤集团</div>
        </div>
      </div>
    </div>
    <div style="overflow: scroll;">
      <div class="easyPanelBig" v-for="log in logTable" :key="log.id" :id='log.id'>
        <div class="easyPanelsmall" style="    border: solid 0.5px rgb(0,0,0,0.08);">
          <div style="display:flex;justify-content:space-between;font-size: 0.9em;
    border-bottom: solid 1px rgb(0,0,0,0.05);">
            <span>{{ log.vehicle_number }}</span>
            <span @click="showDetail($event)">查看收据和维修图片
              <svg t="1610706417956" style='width:1.5em;height:1.5em;vertical-align: text-top;' class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="7534" width="200" height="200">
                <path d="M397.42986102 776.04836717c-8.95079211 0-17.90158422-3.58031685-24.16713869-10.74095053-12.53110895-13.42618817-12.53110895-34.01301 0-46.54411896l205.86821848-205.86821848-205.86821848-205.86821846c-6.26555448-6.26555448-9.84587132-15.21634658-9.84587131-24.16713869 0-8.95079211 3.58031685-17.90158422 9.84587131-24.16713869 6.26555448-6.26555448 15.21634658-9.84587132 24.16713869-9.84587132 8.95079211 0 17.90158422 3.58031685 24.16713869 9.84587132l229.14027795 229.14027794c13.42618817 13.42618817 13.42618817 34.90808922 1e-8 47.43919818L421.59699971 766.20249584c-7.16063367 6.26555448-15.21634658 9.84587132-24.16713869 9.84587133z"
                  fill="#B5B5B5" p-id="7535"></path>
                <path d="M604.19315871 512L385.79383128 294.49575178c-6.26555448-6.26555448-6.26555448-16.1114258 1e-8-22.37698026s16.1114258-6.26555448 22.37698027 0L637.3110895 501.25904948c6.26555448 6.26555448 6.26555448 16.1114258 0 22.37698027L409.06589076 753.6713869c-6.26555448 6.26555448-16.1114258 6.26555448-22.37698026 0s-6.26555448-16.1114258 0-22.37698027L604.19315871 512z"
                  fill="#B5B5B5" p-id="7536"></path>
              </svg>
            </span>
          </div>
          <div style="    font-weight: 100;line-height:1.5">
            <span>送修时间：{{log.day|dayFormat}}</span>
            <span style="display:inline-block;width:100%">维修地点：</span>
            <span>{{ log.repair_shop }}</span>
          </div>
          <div style="    font-weight: 100;line-height:1.5">
            <span style="display:inline-block;width:100%">故障内容：</span>{{ log.content }}</div>
        </div>
      </div>
      <!-- <table>
        <thead>
          <tr>
            <th style="width: 10%">&#12288;</th>
            <th>签到点</th>
            <th>垃圾桶数</th>
            <th>签到时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in logTable" :key="index">
            <td class="number">
              <span class="number1">{{ index + 1 }}</span>
            </td>
            <td title="签到点">{{ item.collect_name }}</td>
            <td title="垃圾桶数">{{ item.bins }}</td>
            <td title="签到时间">{{ item.created_at }}</td>
          </tr>
        </tbody>
      </table> -->
    </div>
  </div>
</template>

<script>
import { TimeF } from "../../util/util";
import { getWeixiuLogs, repairLogInfo } from "../../http/api";
// eslint-disable-next-line no-unused-vars
let that;
export default {
  filters: {
    dayFormat (day) {
      return day.substr(0, 4) + '-' + day.substr(4, 2) + '-' + day.substr(6, 2)
    },
    dateFormat (s) {
      let month = s.substr(4, 2).startsWith("0")
        ? s.substr(4, 2)[1]
        : s.substr(4, 2);
      let day = s.substr(6, 2).startsWith("0")
        ? s.substr(6, 2)[1]
        : s.substr(6, 2);
      return s.substr(0, 4) + "年" + month + "月" + day + "日";
    }
  },
  beforeCreate () {
    that = this;
  },

  data () {
    return {
      user_info: {},
      day: "",
      logTable: []
    };
  },

  async created () {
    // this.showVehicle=false
    // this.eventBus.$emit('update:selected', false)

    this.user_info = localStorage.user_info && localStorage.user_info !== 'undefined' ? JSON.parse(localStorage.user_info) : {}
    this.day = this.Time(new Date(), "%y-%M-%d");
    let data = await getWeixiuLogs({
      create_begin_time: that.day,
      create_end_time: that.day,
      page: 1,
      pageSize: 100
    });
    this.logTable = data.data.data;
  },
  mounted () {
    document.getElementsByTagName("title")[0].text = "统计";
  },
  methods: {
    async showDetail ($event) {
      let data = await repairLogInfo({ id: $event.path[3].id })
      that.$router.push({ path: '/repairDetail', query: { data: { ...data, title: that.user_info.name } } })
    },
    formatDate (d) {
      return d.substr(0, 4) + "-" + d.substr(4, 2) + "-" + d.substr(6, 2);
    },
    Time (a, b) {
      return TimeF(a, b);
    },
    showPicker () {
      that.$weui.datePicker({
        start: 2021,
        end: 2021,
        defaultValue: [2021, 1, 1],
        onChange: function () {
          // that.day = result
        },
        onConfirm: async function (result) {
          // console.log(result);
          let month =
            result[1].value < 10 ? "0" + result[1].value : result[1].value + "";
          let day1 =
            result[2].value < 10 ? "0" + result[2].value : result[2].value + "";
          that.day = result[0].value + '-' + month + '-' + day1;
          let data = await getWeixiuLogs({
            create_begin_time: that.day,
            create_end_time: that.day,
            page: 1,
            pageSize: 100
          });
          that.logTable = data.data.data;
        },
        id: "datePicker"
      });
    },

    qiandaofoot () {
      this.$router.push({ name: 'repair' });
    }
    // qiandaofoot($event){
    //   document.getElementById('icon-icon-test2').firstChild.setAttribute('fill','#0066ff')
    //   document.getElementById('icon-icon-test2').children[1].setAttribute('fill','#0066ff')

    //   document.getElementsByClassName('footer2')[0].style.color='rgb(0,0,0,0.7)'
    // },
  }
};
</script>

<style scoped>
.easyPanelBig {
  width: 100%;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 1.2rem 1.5rem 1.2em;
  background-color: white;
  margin-bottom: 0.3em;
  font-size: 1em;
  line-height: 2.5;
}
.easyPanelsmall {
  width: 100%;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 0.5rem 0.5rem 0.5em;
  background-color: white;
  margin-bottom: 0.3em;
  font-size: 1em;
  line-height: 2.5;
}
.header {
  height: 4em;
}
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
  margin-left: 0 !important;
  width: 100% !important;
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
