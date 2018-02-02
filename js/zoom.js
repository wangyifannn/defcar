 var content = document.getElementsByClassName("content")[0];

 function getHeight() {
     var conHeight = document.documentElement.clientHeight || document.body.clientHeight - 107;
     if (conHeight < 693) {
         conHeight = 693;
     }
     console.log(conHeight);
     content.style.height = conHeight + "px";
     console.log(conHeight);
 }
 getHeight();
 window.onresize = getHeight;
 var currentMain = document.getElementById("current_line_main");
 console.log(currentMain);
 // currentMain.style.width = "100%";
 // currentMain.style.height = "100%";
 // 检测浏览器是否缩放
 var body = document.getElementsByTagName("body")[0];

 function detectZoom() {
     body.style.zoom = "0";
     currentMain.style.zoom = "0";
     var ratio = 0,
         screen = window.screen,
         ua = navigator.userAgent.toLowerCase();

     if (window.devicePixelRatio !== undefined) {
         ratio = window.devicePixelRatio;
     } else if (~ua.indexOf('msie')) {
         if (screen.deviceXDPI && screen.logicalXDPI) {
             ratio = screen.deviceXDPI / screen.logicalXDPI;
         }
     } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
         ratio = window.outerWidth / window.innerWidth;
     }
     if (ratio) {
         ratio = Math.round(ratio * 100);
     }
     // 判断浏览器缩放比例，改变页面 的缩放比例
     if (ratio < 125 && ratio >= 113) {
         body.style.zoom = "1.1";
     } else if (ratio < 113 && ratio >= 94) {
         body.style.zoom = "1.35";
     } else if (ratio < 94 && ratio >= 83) {
         body.style.zoom = "1.55";
     } else if (ratio < 83 && ratio >= 63) {
         body.style.zoom = "1.3";
         currentMain.style.zoom = "1.6";
     } else if (ratio < 63 && ratio >= 42) {
         body.style.zoom = "1.3";
         currentMain.style.zoom = "2.65";
     } else {
         body.style.zoom = "0";
         currentMain.style.zoom = "0";
     }
     console.log(ratio);
     return ratio;
 };
 detectZoom();
 window.onresize = detectZoom;