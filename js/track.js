  //地图操作开始
  var map = new BMap.Map("cmapcontainer");

  map.centerAndZoom(new BMap.Point(103.388611, 35.563611), 5); //初始显示中国。

  map.enableScrollWheelZoom(); //滚轮放大缩小
  var myIcon = new BMap.Icon("../img/map/30redcar.png", new BMap.Size(30, 57));
  var opts = {
      width: 60, // 信息窗口宽度
      height: 100, // 信息窗口高度
      enableMessage: true //设置允许信息窗发送短息
  };

  var markers = [];
  var new_markers = [];

  function searchCurrentcar() {
      console.log($("#current_input").val());
      if ($("#current_input").val() == null || $("#current_input").val() == "") {
          alert("车辆编号不能为空");
      } else {
          $.ajax({
              "url": "http://192.168.0.222:8080/car-management/car/carData.action",
              "type": "get",
              "dataType": "jsonp", //数据类型为jsonp  
              "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
              "data": {
                  "vSn": $("#current_input").val()
              },
              "success": function(newres) {
                  console.log(newres);
                  console.log(newres);
                  for (var j = 0; j < newres.length; j++) {
                      if (newres[0] == null) {
                          alert("车辆数据未搜素到");
                          return;
                      }
                      if (newres[j].longitude != "" && newres[j].latitude != "") {
                          var new_point = new BMap.Point(newres[j].longitude, newres[j].latitude);
                          var new_marker = new BMap.Marker(new BMap.Point(newres[j].longitude, newres[j].latitude), {
                              icon: myIcon
                          }); // 创建标注
                          var new_showInfo = "<div class='point_content'>当前状态：" + newres[j].runStatic +
                              "<br/>" + "车辆编号:<span id='car_id'>" + newres[j].vCarSn +
                              "</span><br/>是否允许：" + newres[j].isAllow +
                              "<br/><span class='point_tips'><span>" +
                              "</div>";
                          // map.setZoom(11);
                          map.centerAndZoom(new_point, 11);
                          map.addOverlay(new_marker); // 将标注添加到地图中
                          addClickHandler(new_showInfo, new_marker, j, newres);
                      } else {
                          alert("车辆数据未搜素到");
                      }
                  }
              },
              "error": function(data) {
                  console.log(data);
                  alert("发生错误");
              }
          })
      }
  }

  function addClickHandler(content, marker, i, res) {
      marker.addEventListener("click", function(e) {
          openInfo(content, e);
          // clickcar_id = $(content).children("#car_id").text();
          // return clickcar_id;
          console.log(i);
          // console.log(this.id);
          //   mapInfo(res[i].vSn, res[i].vCarSn, res[i].gpsSN, res[i].vCarType, res[i].warn, res[i].iccard, res[i].isAllow, res[i].runStatic,
          //       res[i].speed, res[i].dAllowStartTm, res[i].dAllowEndTm, res[i].runsumtime);
          console.log(content);
      });
  }

  function openInfo(content, e) {
      var p = e.target;
      var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
      var infoWindow = new BMap.InfoWindow(content, opts); // 创建信息窗口对象 
      map.openInfoWindow(infoWindow, point); //开启信息窗口
  }