<template>
  <div style="height:100%" v-if='reload'>
    <div class='easyPanel' style="text-align:center;background-color:#409EFF;border-radius: 0;">
      <div @click="backMethod" style="float:left">
        <svg style="width:1em;height:1em" t="1609838460475" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="2588" width="200" height="200">
          <path d="M263.50933334 461.824c12.8 0 25.6 5.12 35.84000001 14.848l415.74399999 411.648c19.968 19.968 19.968 51.712 0.512 71.68s-51.712 19.968-71.68 0.51199999l-415.744-411.64799999a50.8416 50.8416 0 0 1-0.51199999-71.68c9.216-10.75200001 22.528-15.36 35.83999999-15.36z"
            fill="#2c2c2c" p-id="2589"></path>
          <path d="M674.64533334 46.08c12.8 0 25.6 5.12 35.84 14.848 19.968 19.968 19.968 51.712 0.512 71.68l-411.648 415.744a50.8416 50.8416 0 0 1-71.68 0.512 50.8416 50.8416 0 0 1-0.512-71.67999999L638.80533334 61.43999999c9.728-10.24 23.04-15.36 35.84-15.35999999z"
            fill="#2c2c2c" p-id="2590"></path>
        </svg>
      </div> {{title}}</div>
    <div class="content">

      <el-form ref="form" :rules="rules" :model="form" label-width="32%" size="mini" label-position='left'>
        <div class='easyPanel'>
          <div>
            <svg t="1609843233367" style="width:1.4em;height:2em;vertical-align: middle;" class="icon" viewBox="0 0 1024 1024" version="1.1"
              xmlns="http://www.w3.org/2000/svg" p-id="927" width="200" height="200">
              <path d="M338.9 959.2c-36.6 0-66.2-29.6-66.2-66.2l90-762.6c0-36.6 29.6-66.2 66.2-66.2s66.2 29.6 66.2 66.2L405 893c0 36.6-29.6 66.2-66.1 66.2z"
                fill="#66CC99" p-id="928"></path>
              <path d="M588.1 959.2c-36.6 0-66.2-29.6-66.2-66.2l90-762.6c0-36.6 29.6-66.2 66.2-66.2s66.2 29.6 66.2 66.2l-90 762.6c0 36.6-29.6 66.2-66.2 66.2z"
                fill="#66CC99" p-id="929"></path>
            </svg>
            <span style="vertical-align: middle;font-weight: 400;">基本信息</span>
          </div>
          <el-form-item label="送修人姓名" prop="name">
            <el-input v-show="!queren&&!detail" v-model="form.name"></el-input>
            <div v-show="queren||detail">{{form.name}}</div>
          </el-form-item>
          <el-form-item label='送修日期' prop='day'>
            <div v-show="!queren&&!detail" style="font-weight:100;font-weight: lighter;color: #00000073;" id="showPicker" @click="showPicker">
              <span v-show="!form.day">请选择</span>
              <span v-show="form.day" style="color:var(--weui-FG-0);">{{ form.day|dateFormat }}
              </span>
            </div>
            <div v-show="queren||detail">
              <span style="color:var(--weui-FG-0);">{{ form.day|dateFormat }}
              </span>
            </div>
          </el-form-item>
          <el-form-item label="车牌号" prop="vehicle_id">
            <el-select v-show="!queren&&!detail" v-model="form.vehicle_id">
              <el-option v-for="item in allVehicles" :label="item.vehicle_number" :value="item.id" :key="item.vehicle_number"></el-option>
            </el-select>
            <div v-show="queren||detail">{{form.vehicle_id?form.vehicle_id:form.vehicle_number|vehicleFilter(allVehicles)}}</div>
          </el-form-item>
          <el-form-item label="维修店名" prop="repair_shop">
            <div v-show="!queren&&!detail" style="font-weight:100;font-weight: lighter;color: #00000073;" id="showStorePicker" @click="showStorePicker">
              <span v-show="!form.repair_shop">请选择</span>
              <span v-show="form.repair_shop" style="color:var(--weui-FG-0);">{{ form.repair_shop }}
              </span>
            </div>
            <div v-show="queren||detail">{{ form.repair_shop }}</div>
          </el-form-item>
          <el-form-item label="故障内容" prop="content">
            <el-input v-show="!queren&&!detail" type="textarea" placeholder="请输入内容" v-model="form.content" maxlength="100">
            </el-input>
            <div v-show="queren||detail">{{form.content}}</div>
          </el-form-item>
        </div>
        <div class="easyPanel">
          <div>
            <svg t="1609843233367" style="width:1.4em;height:2em;vertical-align: middle;" class="icon" viewBox="0 0 1024 1024" version="1.1"
              xmlns="http://www.w3.org/2000/svg" p-id="927" width="200" height="200">
              <path d="M338.9 959.2c-36.6 0-66.2-29.6-66.2-66.2l90-762.6c0-36.6 29.6-66.2 66.2-66.2s66.2 29.6 66.2 66.2L405 893c0 36.6-29.6 66.2-66.1 66.2z"
                fill="#66CC99" p-id="928"></path>
              <path d="M588.1 959.2c-36.6 0-66.2-29.6-66.2-66.2l90-762.6c0-36.6 29.6-66.2 66.2-66.2s66.2 29.6 66.2 66.2l-90 762.6c0 36.6-29.6 66.2-66.2 66.2z"
                fill="#66CC99" p-id="929"></path>
            </svg>
            <span style="vertical-align: middle;font-weight: 400;">图片</span>
          </div>
          <div style="margin-bottom:0.3em">
            <span style="color:red">*</span>上传收据单
            <span style="    font-size: 0.7em;    font-weight: 100;">(可上传多张照片)(可点击放大删除)</span>
          </div>
          <el-form-item label-width="0" prop="receipt_pic">
            <div class="weui-cells_form" id="uploader">
              <div class="weui-cell">
                <div class="weui-cell__bd">
                  <div class="weui-uploader">
                    <div class="weui-uploader__bd">
                      <ul v-if='detail' class="weui-uploader__files" id="uploaderFilesDetail">
                        <li class="weui-uploader__file" v-for="imge in form.receipt_pic" :key='imge' :style="{backgroundImage: `url(${imge})`}">
                        </li>
                      </ul>
                      <ul v-if='!detail' class="weui-uploader__files" id="uploaderFiles"></ul>
                      <div v-show='!queren&&!detail' :class="[queren? 'queren': ''  ,detail?'detail':'', 'weui-uploader__input-box ']">
                        <input id="uploaderInput" class="weui-uploader__input" type="file" accept="image/*" multiple="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-form-item>
          <div style="margin-bottom:0.3em">
            <span style="color:red">*</span>维修照片
            <span style="    font-size: 0.7em;    font-weight: 100;">(可上传多张照片)(可点击放大删除)</span>
          </div>
          <el-form-item label-width="0" prop="repair_pic">
            <div class="weui-cells_form" id="uploader1">
              <div class="weui-cell">
                <div class="weui-cell__bd">
                  <div class="weui-uploader">
                    <div class="weui-uploader__bd">
                      <ul v-if='detail' class="weui-uploader__files" id="uploaderFiles1Detail">
                        <li class="weui-uploader__file" v-for="imge in form.repair_pic" :key='imge' :style="{backgroundImage: `url(${imge})`}">
                        </li>
                      </ul>
                      <ul v-if='!detail' class="weui-uploader__files" id="uploaderFiles1"></ul>
                      <div v-show='!queren&&!detail' :class="[queren? 'queren': ''  ,detail?'detail':'', 'weui-uploader__input-box ']">
                        <input id="uploaderInput" class="weui-uploader__input" type="file" accept="image/*" multiple="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-form-item>
        </div>

      </el-form>
      <div style="text-align:center;margin-top:1em ">
        <el-button v-show="!queren&&!detail " @click="submitValidate " type="primary ">提交</el-button>
        <el-button v-show="queren&&!detail " @click="queren=!queren " type="plain ">修改</el-button>
        <el-button v-show="queren&&!detail " @click="submit " type="primary ">确认</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { getRoute, submitweixiu } from "../../http/api";
import { wxs } from "../../util/wx/wx.js"
import axios from 'axios'
let that
export default {
  watch: {    queren (value) {
      if (value == true) {
        console.log(0)
      }
    }  },
  filters: {
    vehicleFilter (value, arr) {
      let keyItem = arr.find(item => {
        return value === item.id
      })
      return keyItem ? keyItem.vehicle_number : value
    },
    storeFormat () {
      // switch (value) {
      //   case 1: value = '深圳市宝安区燕罗兴平汽车钢板店'; break;
      //   case 2: value = '深圳市子平轮胎有限公司'; break;
      //   case 3: value = '深圳市火凤凰投资发展有限公司'; break;
      // }
      // return value
    },
    dateFormat (s) {
      if (!s) {
        return null
      }
      let month = s.substr(4, 2).startsWith('0') ? s.substr(4, 2)[1] : s.substr(4, 2);
      let day = s.substr(6, 2).startsWith('0') ? s.substr(6, 2)[1] : s.substr(6, 2);
      return s.substr(0, 4) + '年' + month + '月' + day + '日'
    }
  },
  beforeCreate () {
    that = this
  },
  async activated () {
    if (that.$route.query.data) {
      that.title = that.$route.query.data.title
      that.form = that.$route.query.data.data.repairLogInfo
      that.detail = true
      document.getElementsByTagName("title")[0].text = "汽车维修申报详情";
      if (document.querySelector('#uploaderFilesDetail') && document.querySelector('#uploaderFiles1Detail')) {
        document.querySelector('#uploaderFilesDetail').addEventListener('click', function (e) {
          var target = e.target;

          while (!target.classList.contains('weui-uploader__file') && target) {
            target = target.parentNode;
          }
          if (!target) return;

          var url = target.getAttribute('style') || '';
          // var id = target.getAttribute('data-id');

          if (url) {
            url = url.match(/url\((.*?)\)/)[1].replace(/"/g, '');
          }
          that.$weui.gallery(url, {
            className: 'bushanchu',
          });
        });
        document.querySelector('#uploaderFiles1Detail').addEventListener('click', function (e) {
          var target = e.target;

          while (!target.classList.contains('weui-uploader__file') && target) {
            target = target.parentNode;
          }
          if (!target) return;

          var url = target.getAttribute('style') || '';
          // var id = target.getAttribute('data-id');

          if (url) {
            url = url.match(/url\((.*?)\)/)[1].replace(/"/g, '');
          }
          that.$weui.gallery(url, {
            className: 'bushanchu',
          });
        });
      }
    } else {
      that.reload = true
      that.$nextTick(async function () {
        await that.init()
        if (document.querySelector('#uploaderFiles1') && document.querySelector('#uploaderFiles')) {
          document.querySelector('#uploaderFiles1').addEventListener('click', function (e) {
            var target = e.target;

            while (!target.classList.contains('weui-uploader__file') && target) {
              target = target.parentNode;
            }
            if (!target) return;

            var url = target.getAttribute('style') || '';
            var id = target.getAttribute('data-id');

            if (url) {
              url = url.match(/url\((.*?)\)/)[1].replace(/"/g, '');
            }
            var gallery = that.$weui.gallery(url, {
              className: that.queren || that.detail ? 'hidden' : 'custom',
              onDelete: function () {
                that.$weui.confirm('确定删除该图片？', function () {
                  var index;
                  for (var i = 0, len = that.form.repair_pic.length; i < len; ++i) {
                    var file = that.form.repair_pic[i];
                    if (file.id == id) {
                      index = i;
                      break;
                    }
                  }
                  if (index !== undefined) that.form.repair_pic.splice(index, 1);

                  target.remove();
                  gallery.hide();
                });
              }
            });
          });
          document.querySelector('#uploaderFiles').addEventListener('click', function (e) {
            var target = e.target;

            while (!target.classList.contains('weui-uploader__file') && target) {

              target = target.parentNode;
            }
            if (!target) return;

            var url = target.getAttribute('style') || '';
            var id = target.getAttribute('data-id');

            if (url) {
              url = url.match(/url\((.*?)\)/)[1].replace(/"/g, '');
            }
            var gallery = that.$weui.gallery(url, {
              className: that.queren || that.detail ? 'hidden' : 'custom',
              onDelete: function () {
                that.$weui.confirm('确定删除该图片？', function () {
                  var index;
                  for (var i = 0, len = that.form.receipt_pic.length; i < len; ++i) {
                    var file = that.form.receipt_pic[i];
                    if (file.id == id) {
                      index = i;
                      break;
                    }
                  }
                  if (index !== undefined) that.form.receipt_pic.splice(index, 1);

                  target.remove();
                  gallery.hide();
                });
              }
            });
          });
        }
      })

    }
  },
  async created () {
    if (that.reload == false) {
      await that.init()
    }

  },
  data () {
    return {
      reload: true,
      title: '汽车维修申报',
      detail: false,
      queren: false,
      dialogImageUrl: '',
      postAction: '',
      allVehicles: [],
      form: {
        content: '',
        receipt_pic: [],
        repair_pic: [],
        name: '',
        day: '',
        vehicle_id: '',
        repair_shop: ''
      },
      rules: {
        content: [{ required: true, message: '维修内容不能为空' }],
        receipt_pic: [{ required: true, message: '收据图片不能为空' }],
        repair_pic: [{ required: true, message: '维修图片不能为空' }],
        repair_shop: [{ required: true, message: '店名不能为空' }],
        name: [{ required: true, message: '姓名不能为空' }],
        day: [{ required: true, message: '维修日期不能为空' }],
        vehicle_id: [{ required: true, message: '车牌号不能为空' }]
      }
    }
  },
  mounted () {
    if (document.querySelector('#uploaderFiles1') && document.querySelector('#uploaderFiles')) {
      document.querySelector('#uploaderFiles1').addEventListener('click', function (e) {
        var target = e.target;

        while (!target.classList.contains('weui-uploader__file') && target) {
          target = target.parentNode;
        }
        if (!target) return;

        var url = target.getAttribute('style') || '';
        var id = target.getAttribute('data-id');

        if (url) {
          url = url.match(/url\((.*?)\)/)[1].replace(/"/g, '');
        }
        var gallery = that.$weui.gallery(url, {
          className: that.queren || that.detail ? 'hidden' : 'custom',
          onDelete: function () {
            that.$weui.confirm('确定删除该图片？', function () {
              var index;
              for (var i = 0, len = that.form.repair_pic.length; i < len; ++i) {
                var file = that.form.repair_pic[i];
                if (file.id == id) {
                  index = i;
                  break;
                }
              }
              if (index !== undefined) that.form.repair_pic.splice(index, 1);

              target.remove();
              gallery.hide();
            });
          }
        });
      });
      document.querySelector('#uploaderFiles').addEventListener('click', function (e) {
        var target = e.target;

        while (!target.classList.contains('weui-uploader__file') && target) {

          target = target.parentNode;
        }
        if (!target) return;

        var url = target.getAttribute('style') || '';
        var id = target.getAttribute('data-id');

        if (url) {
          url = url.match(/url\((.*?)\)/)[1].replace(/"/g, '');
        }
        var gallery = that.$weui.gallery(url, {
          className: that.queren || that.detail ? 'hidden' : 'custom',
          onDelete: function () {
            that.$weui.confirm('确定删除该图片？', function () {
              var index;
              for (var i = 0, len = that.form.receipt_pic.length; i < len; ++i) {
                var file = that.form.receipt_pic[i];
                if (file.id == id) {
                  index = i;
                  break;
                }
              }
              if (index !== undefined) that.form.receipt_pic.splice(index, 1);

              target.remove();
              gallery.hide();
            });
          }
        });
      });
    }

    // document.querySelector('#uploaderFiles').addEventListener('click', function (e) {
    //   var target = e.target;

    //   while (!target.classList.contains('weui-uploader__filefile') && target) {
    //     target = target.parentNode;
    //   }
    //   if (!target) return;

    //   var url = target.getAttribute('style') || '';

    //   if (url) {
    //     url = url.match(/url\((.*?)\)/)[1].replace(/"/g, '');
    //   }
    //   that.$weui.gallery(url, {});
    // });
  },
  methods: {
    async init () {
      document.getElementsByTagName("title")[0].text = "汽车维修申报";
      let res = await getRoute();
      this.allVehicles = res.data
      var uploadCount = 0;
      that.$weui.uploader('#uploader', {
        url: 'http://localhost:8081',
        auto: false,
        type: 'file',
        fileVal: 'fileVal',
        compress: {
          width: 1600,
          height: 1600,
          quality: .8
        },
        onBeforeQueued: function (files) {
          // `this` 是轮询到的文件, `files` 是所有文件

          if (["image/jpg", "image/jpeg", "image/png", "image/gif"].indexOf(this.type) < 0) {
            that.$weui.alert('请上传图片');
            return false; // 阻止文件添加
          }
          if (this.size > 10 * 1024 * 1024) {
            that.$weui.alert('请上传不超过10M的图片');
            return false;
          }
          if (files.length > 5) { // 防止一下子选择过多文件
            that.$weui.alert('最多只能上传5张图片，请重新选择');
            return false;
          }
          if (uploadCount + 1 > 4) {
            that.$weui.alert('最多只能上传5张图片');
            return false;
          }
          if (!that.form.receipt_pic) {
            that.form.receipt_pic = []
          }
          that.$set(that.form.receipt_pic, that.form.receipt_pic.length, this)
          // that.form.receipt_pic.push(this)
          ++uploadCount;

          // return true; // 阻止默认行为，不插入预览图的框架
        },
        onQueued: function () {
          console.log(this);
          // console.log(this.status); // 文件的状态：'ready', 'progress', 'success', 'fail'
          // console.log(this.base64); // 如果是base64上传，file.base64可以获得文件的base64

          // this.upload(); // 如果是手动上传，这里可以通过调用upload来实现；也可以用它来实现重传。
          // this.stop(); // 中断上传
          // if (this.status === 'ready') {
          //   that.receipt_pic.push(this)
          // }
          // return true; // 阻止默认行为，不显示预览图的图像
        },
        onBeforeSend: function (data, headers) {
          console.log(this, data, headers);
          // $.extend(data, { test: 1 }); // 可以扩展此对象来控制上传参数
          // $.extend(headers, { Origin: 'http://127.0.0.1' }); // 可以扩展此对象来控制上传头部

          // return false; // 阻止文件上传
        },
        onProgress: function (procent) {
          debugger
          console.log(this, procent);
          // return true; // 阻止默认行为，不使用默认的进度显示
        },
        onSuccess: function (ret) {
          debugger
          console.log(this, ret);
          // return true; // 阻止默认行为，不使用默认的成功态
        },
        onError: function (err) {
          console.log(this, err);
          // return true; // 阻止默认行为，不使用默认的失败态
        }
      });
      // eslint-disable-next-line no-unused-vars
      var uploadCount1 = 0;
      that.$weui.uploader('#uploader1', {
        url: 'http://localhost:8081',
        auto: false,
        type: 'file',
        fileVal: 'fileVal',
        compress: {
          width: 1600,
          height: 1600,
          quality: .8
        },
        onBeforeQueued: function (files) {
          // `this` 是轮询到的文件, `files` 是所有文件

          if (["image/jpg", "image/jpeg", "image/png", "image/gif"].indexOf(this.type) < 0) {
            that.$weui.alert('请上传图片');
            return false; // 阻止文件添加
          }
          if (this.size > 10 * 1024 * 1024) {
            that.$weui.alert('请上传不超过10M的图片');
            return false;
          }
          if (files.length > 5) { // 防止一下子选择过多文件
            that.$weui.alert('最多只能上传5张图片，请重新选择');
            return false;
          }
          if (uploadCount1 + 1 > 4) {
            that.$weui.alert('最多只能上传5张图片');
            return false;
          }
          if (!that.form.repair_pic) {
            that.form.repair_pic = []
          }
          that.$set(that.form.repair_pic, that.form.repair_pic.length, this)
          ++uploadCount1;

          // return true; // 阻止默认行为，不插入预览图的框架
        },
        onQueued: function () {
          console.log(this);
          // console.log(this.status); // 文件的状态：'ready', 'progress', 'success', 'fail'
          // console.log(this.base64); // 如果是base64上传，file.base64可以获得文件的base64

          // this.upload(); // 如果是手动上传，这里可以通过调用upload来实现；也可以用它来实现重传。
          // this.stop(); // 中断上传

          // return true; // 阻止默认行为，不显示预览图的图像
        },
        onBeforeSend: function (data, headers) {
          console.log(this, data, headers);
          // $.extend(data, { test: 1 }); // 可以扩展此对象来控制上传参数
          // $.extend(headers, { Origin: 'http://127.0.0.1' }); // 可以扩展此对象来控制上传头部

          // return false; // 阻止文件上传
        },
        onProgress: function (procent) {
          debugger
          console.log(this, procent);
          // return true; // 阻止默认行为，不使用默认的进度显示
        },
        onSuccess: function (ret) {
          debugger
          console.log(this, ret);
          // return true; // 阻止默认行为，不使用默认的成功态
        },
        onError: function (err) {
          console.log(this, err);
          // return true; // 阻止默认行为，不使用默认的失败态
        }
      });
    },
    async backMethod () {
      if (that.detail == true) {
        that.$router.go(-1)
      }
      if (that.queren === false) {
        if (!window.wx) {
          window.wx = await wxs();
        }
        window.wx.closeWindow();
      } else {
        that.queren = false
      }
    },
    beforeUload (file) {
      console.log(file)

    },
    showStorePicker () {
      that.$weui.picker([
        {
          label: '深圳市宝安区燕罗兴平汽车钢板店',
          value: 1,
        },
        {
          label: '深圳市子平轮胎有限公司',
          value: 2
        },
        {
          label: '深圳市火凤凰投资发展有限公司',
          value: 3
        }
      ], {
          className: 'custom-classname',
          container: 'body',
          defaultValue: [1],
          onConfirm: function (result) {
            that.$set(that.form, 'repair_shop', result[0].label)

          },
          id: 'singleLinePicker'
        });
    },
    showPicker () {
      that.$weui.datePicker({
        start: 2010,
        end: 2021,
        defaultValue: [2021, 1, 1],
        onChange: function () {
          // that.day = result
        },
        onConfirm: function (result) {
          // console.log(result);
          let month = result[1].value < 10 ? '0' + result[1].value : result[1].value + ''
          let day = result[2].value < 10 ? '0' + result[2].value : result[2].value + ''
          that.$set(that.form, 'day', result[0].value + month + day)
        },
        id: 'datePicker'
      });
    },

    handlePictureCardPreview () { },
    handleRemove () { },
    submitValidate () {
      that.$refs.form.validate(config => {
        if (config == false) {
          return
        } else {
          that.queren = !that.queren
        }
      })    },
    submit () {
      let loading = that.$weui.loading('提交申报中')
      that.submitLast().then(function (result) {
        if (result == true) {
          that.$weui.toast("提交申报成功", {
            duration: 1000,
            className: "bears",
            callback: function () {
              that.reload = false
              that.queren = false
              that.form = {}
              that.$nextTick(function () {
                that.$router.push({ name: 'repairLog' })
              })
            }
          });
          //   var confirmDom = that.$weui.confirm('申报成功，是否继续申报？',
          //     {              buttons: [{
          //         label: '继续申报',
          //         type: 'default',
          //         onClick: async function () {
          //           confirmDom.hide()
          //         }
          //       },
          //       {
          //         label: '退出',
          //         type: 'primary',
          //         onClick: async function () {
          //           if (!window.wx) {
          //             window.wx = await wxs();
          //           }
          //           window.wx.closeWindow();
          //         }
          //       }
          //       ]            })
        } else {
          that.$weui.toast("提交申报失败", {
            duration: 1000
          })
        }
        loading.hide()
      })
      setTimeout(function () {
        loading.hide(function () {
          console.log('`loading` has been hidden');
        });
      }, 3000);
    },
    async submitLast () {
      // list: [...that.form.receipt_pic, ...that.form.repair_pic] 
      function importFile (data) {
        return axios.request({          url: 'http://server.leoking.com/api/common/upload_imgs',
          method: 'post', headers: { 'Content-Type': 'multipart/form-data' }, data        })      }
      let param = new FormData()
      // 将得到的文件流添加到FormData对象
      for (let i = 0; i < that.form.receipt_pic.length; i++) {
        param.append("image[]", that.form.receipt_pic[i], that.form.receipt_pic[i].name);
      }
      for (let i = 0; i < that.form.repair_pic.length; i++) {
        param.append('image[]', that.form.repair_pic[i], that.form.repair_pic[i].name)
      }

      // let res = await submitPicture(formData)
      let res = await importFile(param)

      if (res.data.data.url && res.data.data.url instanceof Array) {
        let res = await submitweixiu({          ...that.form,
          receipt_pic: res.data.data.url.slice(0, that.form.receipt_pic.length).join(','),
          repair_pic: res.data.data.url.slice(0, that.form.repair_pic.length).join(',')        })
        if (res.code == 200) { return true } else { return false }

      }
    }
  }
}
</script>
<style scoped>
.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 0.3em;
  border-bottom: solid 1px rgb(0, 0, 0, 0.07);
  padding-bottom: 0.3em;
}

.easyPanel /deep/.el-upload--picture-card {
  width: 5em;
  height: 5em;

  display: flex;
  align-items: center;
  justify-content: center;
}
.el-select {
  width: 100%;
}
.easyPanel /deep/.el-form-item__error {
  position: unset !important;
}
.easyPanel /deep/.el-upload-list--picture-card .el-upload-list__item {
  width: 5em;
  height: 5em;
}
.easyPanel /deep/ .el-upload-list__item-actions {
  display: none;
}
.easyPanel /deep/.el-upload-list__item-thumbnail {
}
.easyPanel.focusing,
.easyPanel.is-ready {
  border: 0px;
}
.easyPanel /deep/.weui-cells:before {
  color: transparent !important;
}
.easyPanel /deep/.weui-uploader__file {
  width: 6.5em !important;
  height: 6.5em !important;
}
.easyPanel /deep/ .weui-uploader__filefile {
  width: 6.5em !important;
  height: 6.5em !important;
}
.weui-uploader__filefile {
  float: left;
  margin-right: 8px;
  margin-bottom: 8px;
  width: 96px;
  height: 96px;
  background: no-repeat center center;
  background-size: cover;
}
.bushanchu .weui-gallery__opr {
  display: none;
}
</style>

