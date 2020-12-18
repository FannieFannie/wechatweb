export function MP () {
  return new Promise(function (resolve, reject) {
    window.onload = function () {
      resolve(window.TMap)
    }
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://map.qq.com/api/gljs?v=1.exp&key=4UYBZ-WU76O-NTHW7-SIZGZ-KKER3-H7FUF";
    script.onerror = reject;
    document.head.appendChild(script);
  })
} 