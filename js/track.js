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
  var points = [];
  var total = 0; //总记录数
  var groupCount = 0; //每次转十条

  function searchCurrentcar() {
      console.log($("#current_input").val());
      if ($("#current_input").val() == null || $("#current_input").val() == "") {
          alert("车辆编号不能为空");
      } else {
          $.ajax({
              "url": "http://192.168.0.106:8080/car-management/car/carData.action",
              "type": "get",
              "dataType": "jsonp", //数据类型为jsonp  
              "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
              "data": {
                  "vSn": $("#current_input").val()
              },
              "success": function(res) {
                  console.log(res);
                  points.length = 0;
                  total = 0;
                  groupCount = 0;
                  if (res[0] == null) {
                      alert("您输入的信息有误");
                      return;
                  }
                  for (var n = 0; n < res.length; n++) {
                      points.push(new BMap.Point(res[n].longitude, res[n].latitude));
                  }
                  console.log(points);
                  if (points.length % 10 > 0) {
                      groupCount = (points.length / 10) + 1;
                  } else {
                      groupCount = (points.length / 10);
                  }
                  for (var i = 0; i < groupCount - 1; i++) { //外层循环，有多少组十条
                      var pos = new Array();
                      for (var j = 0; j < 10; j++) { //内层循环，每组十条
                          if (total < points.length) { //不超过总记录数结束
                              console.log(points);
                              console.log(points[(i * 10) + j].lng);
                              console.log(points[(i * 10) + j].lat);
                              var point = new BMap.Point(points[(i * 10) + j].lng, points[(i * 10) + j].lat);
                              pos.push(point);
                              console.log(pos);
                          }
                          total++;
                      }
                      var convertor = new BMap.Convertor();
                      convertor.translate(pos, 1, 5, function(data) {
                          console.log(data);

                          if (data.status === 0) {
                              for (var i = 0; i < data.points.length; i++) {
                                  var new_point = new BMap.Point(data.points[i]);
                                  var marker = new BMap.Marker(data.points[i], {
                                      icon: myIcon
                                  }); // 创建标注
                                  console.log();
                                  map.addOverlay(marker);
                                  //   map.centerAndZoom(new_point, 7);
                                  map.centerAndZoom('中国', 5);
                                  var runStatic = res[i].runStatic; //当前状态
                                  var vCarSn = res[i].vCarSn; //车牌号
                                  var isAllow = res[i].isAllow; //是否允许
                                  var vSn = res[i].vSn; //车辆编号
                                  var showInfo = "<div class='point_content'>当前状态：" + runStatic +
                                      "<br/>" + "车辆编号:<span id='car_id'>" + vSn +
                                      "</span><br/>是否允许：" + isAllow +
                                      "<br/><span class='point_tips'>更多车辆信息请查看右侧车辆详情面板<span>" +
                                      "</div>";
                                  markers.push(marker);
                                  addClickHandler(showInfo, marker, i, res);
                              }
                          }
                      });
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
          console.log(i);
          console.log(content);
      });
  }

  function openInfo(content, e) {
      var p = e.target;
      var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
      var infoWindow = new BMap.InfoWindow(content, opts); // 创建信息窗口对象 
      map.openInfoWindow(infoWindow, point); //开启信息窗口
  }