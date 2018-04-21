//  var content = document.getElementsByClassName("content")[0];

//  function getHeight() {
//      if (conHeight < 693) {
//          conHeight = 693;
//      }
//  }
//  window.onresize = getHeight;
//  var body = document.getElementsByTagName("body")[0];

//  function detectZoom() {
//      body.style.zoom = "0";
//      var ratio = 0,
//          screen = window.screen,
//          ua = navigator.userAgent.toLowerCase();

//      if (window.devicePixelRatio !== undefined) {
//          ratio = window.devicePixelRatio;
//      } else if (~ua.indexOf('msie')) {
//          if (screen.deviceXDPI && screen.logicalXDPI) {
//              ratio = screen.deviceXDPI / screen.logicalXDPI;
//          }
//      } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
//          ratio = window.outerWidth / window.innerWidth;
//      }
//      if (ratio) {
//          ratio = Math.round(ratio * 100);
//      }
//      //  detectZoom 函数的返回值如果是 100 就是默认缩放级别，大于 100 则是放大了，小于 100 则是缩小了。
//      alert("ratio=" + ratio);
//      if (isFF() || isChrome()) {
//          if (ratio < 125 && ratio >= 113) {
//              body.style.zoom = "1.1";
//          } else if (ratio < 113 && ratio >= 94) {
//              body.style.zoom = "1.35";
//          } else if (ratio < 94 && ratio >= 83) {
//              body.style.zoom = "1.55";
//          } else if (ratio < 83 && ratio >= 63) {
//              body.style.zoom = "1.3";
//          } else if (ratio < 63 && ratio >= 42) {
//              body.style.zoom = "1.3";
//          } else {
//              body.style.zoom = "0";
//          }
//      } else {
//          document.body.style.zoom = "1.5";
//      }
//      return ratio;
//  };
//  detectZoom();
//  window.onresize = detectZoom;