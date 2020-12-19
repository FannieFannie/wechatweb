

export function wxs () {
  return new Promise(function (resolve, reject) {
    window.onload = function () {
      resolve(window.wx)
    }
    const script = document.createElement("script");
    script.src = "http://res2.wx.qq.com/open/js/jweixin-1.4.0.js";
    script.onerror = reject;
    document.head.appendChild(script);

  })
} 