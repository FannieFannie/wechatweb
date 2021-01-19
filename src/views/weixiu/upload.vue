<template>
  <div class="hpk-showimg">
    <!-- 营业执照 -->
    <div class="idcardup">
      <a href="javascript:;" class="a-upload">
        <input v-if="ipshow" type="file" accept="image/*" name="file1" capture="camera" @change="upload">
        <input v-else type="file" accept="image/*" name="file1" @change="upload">
      </a>
      <img :src="formData.busLicenseImgUrl" alt="" v-if="idylength>0" class="id-img3">
      <img src="../../assets/langkunlogo.jpg" v-if="idylength>0" class="id-img2">
      <div class="rload" v-if="idylength>0">点击重新上传</div>
      <img v-else src="../../assets/langkunlogo.jpg" alt="" class="id-img">
    </div>
    <!-- 食品执照 -->
    <div class="idcardup1">
      <a href="javascript:;" class="a-upload1">
        <input v-if="ipshow" type="file" accept="image/*" name="file2" capture="camera" @change="upload1">
        <input v-else type="file" accept="image/*" name="file2" @change="upload1">
      </a>
      <img :src="formData.foodsLicenseImgUrl" alt="" v-if="smflength>0" class="id-img3">
      <img src="../../assets/langkunlogo.jpg" v-if=" smflength>0" class="id-img2">
      <div class="rload" v-if="smflength>0">点击重新上传</div>
      <img v-else src="../../assets/langkunlogo.jpg" alt="" class="id-img">
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      ipshow: false, // 切换input属性
      formData: {
        busLicenseImgUrl: '', // 营业执照url
        foodsLicenseImgUrl: '' // 食品执照url
      },

      idylength: 0, // 营业执照长度
      smflength: 0// 食品执照长度
    }
  },
  methods: {
    // 上传营业执照
    upload (e) {
      let files = e.target.files || e.dataTransfer.files
      var index = 0// 营业执照标识
      if (!files.length) return
      this.imgPreview(files[0], index)
    },

    // 上传食品
    upload1 (e) {
      let files = e.target.files || e.dataTransfer.files
      var index = 1// 食品执照标识
      if (!files.length) return
      this.imgPreview(files[0], index)
    },

    imgPreview (file, index) {
      let self = this
      let Orientation
      let EXIF
      // 去获取拍照时的信息，解决拍出来的照片旋转问题
      EXIF.getData(file, function () {
        Orientation = EXIF.getTag(this, 'Orientation')
      })
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return
      if (/^image/.test(file.type)) {
        var fileName = file.name
        // 创建一个reader
        let reader = new FileReader()
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file)
        // 读取成功后的回调
        reader.onloadend = function () {
          let result = this.result
          let img = new Image()
          img.src = result
          // 判断图片是否小于2M,是就直接上传，反之压缩图片
          if (this.result.length <= (2048 * 1024)) {
            var headerImage = this.result
            self.postImg(headerImage, fileName, file, index)
          } else {
            img.onload = function () {
              let data = self.compress(img, Orientation)
              var headerImage = data
              self.postImg(headerImage, fileName, file, index)
            }
          }
        }
      }
    },
    postImg (headerImage, fileName, fil, index) {
      this.showjz = true
      // 压缩后的base64图片地址
      var imageBase64 = headerImage.substring(headerImage.indexOf(',') + 1)
      var mchNo = this.getQueryVariable('mchNo')
      let data = {
        mchNo: mchNo,
        imageBase64: imageBase64
      }
      if (index == 0) {
        // 营业执照
        axios({
          method: 'post',
          url: 'http://test.hpk.msxiaodai.com/apply/businessLicenseOCR',
          data: data
        })
          .then(
            response => {
              var res = response.data
              if (res.code == '0000') {
                this.idylength = 1
                this.showjz = false
                if (this.idylength == 1 && this.smflength == 1) {
                  this.showcontent = true// 显示数据信息
                }
                this.formData.busLicenseImgUrl = res.data.imageUrl
                this.formData.mchAddress = res.data.address
                this.formData.legal = res.data.legal
                this.formData.mchName = res.data.name
                this.formData.organCode = res.data.regNum
                this.formData.shopName = res.data.shopName
                this.formData.business = res.data.business
                this.formData.composingForm = res.data.composingForm
                this.formData.mainType = res.data.mainType
                this.formData.period = res.data.period

                // vant.Toast.success('营业执照识别成功')
              } else if (res.code == '1023') {
                this.showerror = true
                this.errorval = res.msg
                this.showjz = false
                this.showcontent = false// 显示数据信息
                this.idylength = 0
                this.formData.busLicenseImgUrl = ''
                this.formData.mchAddress = ''
                this.formData.legal = ''
                this.formData.mchName = ''
                this.formData.organCode = ''
                this.formData.business = ''
                this.formData.composingForm = ''
                this.formData.mainType = ''
                this.formData.period = ''
              } else {
                this.showerror = true
                this.errorval = '请上传真实有效的营业执照'
                this.showjz = false
                this.showcontent = false// 显示数据信息
                this.idylength = 0
                this.formData.busLicenseImgUrl = ''
                this.formData.mchAddress = ''
                this.formData.legal = ''
                this.formData.mchName = ''
                this.formData.organCode = ''
                this.formData.business = ''
                this.formData.composingForm = ''
                this.formData.mainType = ''
                this.formData.period = ''
              }
            }
          )
      } else {
        if (this.idylength != 0) {
          // 食品执照
          axios({
            method: 'post',
            url: 'http://test.hpk.msxiaodai.com/apply/foodLicenseOCR',
            data: data
          })
            .then(
              response => {
                var res = response.data
                if (res.code == '0000') {
                  this.smflength = 1
                  // 显示软键盘
                  this.butsk()
                  this.showjz = false
                  this.showcontent = true// 显示数据信息
                  this.formData.foodsLicenseImgUrl = res.data.imageUrl

                  // vant.Toast.success('食品经营许可证识别成功')
                } else if (res.code == '1023') {
                  this.showerror = true
                  this.errorval = res.msg
                  this.showcontent = false// 显示数据信息
                  this.showjz = false
                  this.smflength = 0
                  this.formData.foodsLicenseImgUrl = ''
                } else {
                  this.showerror = true
                  this.errorval = '请上传真实有效的食品经营许可证'
                  this.showcontent = false// 显示数据信息
                  this.showjz = false
                  this.smflength = 0
                  this.formData.foodsLicenseImgUrl = ''
                }
              }
            )
        } else {
          this.showerror = true
          this.errorval = '请先上传真实有效的营业执照'
          this.showjz = false
        }
      }
    },

    // 压缩图片不得大于2M
    compress (img, Orientation) {
      console.log(Orientation)
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      // 瓦片canvas
      let tCanvas = document.createElement('canvas')
      let tctx = tCanvas.getContext('2d')
      let initSize = img.src.length
      let width = img.width
      let height = img.height
      // 如果图片大于6百万像素，计算压缩比并将大小压至600万以下
      let ratio
      console.log(initSize)
      if ((ratio = width * height / 6000000) > 1) {
        console.log('大于600万像素')
        ratio = Math.sqrt(ratio)
        width /= ratio
        height /= ratio
      } else {
        ratio = 1
      }
      canvas.width = width
      canvas.height = height
      //        铺底色
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      // 如果图片像素大于400万则使用瓦片绘制
      let count
      if ((count = width * height / 4000000) > 1) {
        console.log('大于400万像素')
        count = ~~(Math.sqrt(count) + 1) // 计算要分成多少块瓦片
        //            计算每块瓦片的宽和高
        let nw = ~~(width / count)
        let nh = ~~(height / count)
        tCanvas.width = nw
        tCanvas.height = nh
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0,
              nw, nh)
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height)
      }
      // 进行最小压缩
      let ndata = canvas.toDataURL('image/jpeg', 0.2)
      // console.log('压缩前：' + initSize);
      // console.log('压缩后：' + ndata.length);
      // console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0
      return ndata
    }

  }
}

</script>
<style scoped lang="scss">
.hpk-showimg {
  align-items: center;
  height: 20%;
  padding: 0.24rem 0.32rem;
  .idcardup {
    position: relative;
    text-align: center;
    background: #fff;
    float: left;
    width: 48.75% !important;
    height: 100.6% !important;
    .id-img {
      width: 100% !important;
      height: 100.6% !important;
      margin: 0px auto;
      border-radius: 0.1rem;
    }
    // 钩号
    .id-img2 {
      position: absolute;
      width: 0.92rem;
      height: 0.92rem;
      bottom: 1rem;
      left: calc(50% - 0.46rem);
    }
    .id-img3 {
      width: 100% !important;
      height: 100.6% !important;
      margin: 0px auto;
      border-radius: 0.1rem;
      opacity: 0.4;
      filter: alpha(opacity=40); /*  IE8 及其更早版本 */
      position: relative;
      border: 0.02rem solid rgba(146, 139, 132, 0.721);
    }
    // 重新上传文本
    .rload {
      position: absolute;
      bottom: 0.26rem;
      font-size: 0.26rem;
      height: 0.42rem;
      color: #888;
      line-height: 0.42rem;
      left: calc(50% - 0.78rem);
    }
  }

  .idcardup1 {
    position: relative;
    text-align: center;
    background: #fff;
    float: right;
    width: 48.75% !important;
    height: 100.6% !important;
    .id-img {
      width: 100% !important;
      height: 100.6% !important;
      margin: 0px auto;
      border-radius: 0.1rem;
    }
    .id-img2 {
      position: absolute;
      width: 0.92rem;
      height: 0.92rem;
      bottom: 1rem;
      left: calc(50% - 0.46rem);
    }
    .id-img3 {
      width: 100% !important;
      height: 100.6% !important;
      margin: 0px auto;
      border-radius: 0.1rem;
      opacity: 0.4;
      filter: alpha(opacity=40); /*  IE8 及其更早版本 */
      position: relative;
      border: 1px solid rgba(146, 139, 132, 0.721);
    }
    .rload {
      position: absolute;
      bottom: 0.26rem;
      font-size: 0.26rem;
      height: 0.42rem;
      color: #888;
      line-height: 0.42rem;
      left: calc(50% - 0.78rem);
    }
  }
}
.a-upload {
  width: 100% !important;
  height: 100% !important;
  position: absolute;
  left: 0;
  cursor: pointer;
  color: #888;
  background: transparent;
  border-radius: 4px;
  overflow: hidden;
  display: inline-block;
  *display: inline;
  z-index: 9;
  *zoom: 1;
}

.a-upload input {
  position: absolute;
  left: 0px;
  top: 0;
  opacity: 0;
  width: 100% !important;
  height: 100% !important;
  filter: alpha(opacity=0);
  cursor: pointer;
}

.a-upload1 {
  height: 100% !important;
  position: absolute;
  cursor: pointer;
  left: 0;
  color: #888;
  background: transparent;
  border-radius: 4px;
  overflow: hidden;
  display: inline-block;
  *display: inline;
  z-index: 9;
  *zoom: 1;
  width: 100%;
}

.a-upload1 input {
  position: absolute;
  left: 0px;
  top: 0;
  opacity: 0;
  width: 100% !important;
  height: 100% !important;
  filter: alpha(opacity=0);
  cursor: pointer;
}

.a-upload:hover {
  color: #444;
  background: transparent;
  border-color: #ccc;
  text-decoration: none;
}
</style>
