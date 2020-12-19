export function MP () {
  return new Promise(function (resolve, reject) {
    window.onload = function () {
      resolve([window.TMap, window.wx])
    }
    const script1 = document.createElement("script");
    script1.type = "text/javascript";
    script1.src = "https://map.qq.com/api/gljs?v=1.exp&key=4UYBZ-WU76O-NTHW7-SIZGZ-KKER3-H7FUF";
    script1.onerror = reject;
    const script2 = document.createElement("script");
    script2.type = "text/javascript";
    script2.src = "http://res2.wx.qq.com/open/js/jweixin-1.4.0.js";
    script2.onerror = reject;
    document.head.appendChild(script2);
    document.head.appendChild(script1);
  })
} 