
export function wxs () {
  return new Promise(function (resolve, reject) {
    const script = document.createElement("script");
    script.src = "http://res2.wx.qq.com/open/js/jweixin-1.4.0.js";
    script.type = "text/javascript";
    script.onerror = reject;
    script.onload = function () {
      resolve(window.wx)
    }
    document.head.appendChild(script);
  })
} 