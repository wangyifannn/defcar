//转换日期格式(时间戳转换为datetime格式)
function changeDateFormat(cellval) {
    var dateVal = cellval + "";
    if (cellval != null) {
        var date = new Date(parseInt(dateVal.replace("/Date(", "").replace(")/", ""), 10));
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

        var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        return date.getFullYear() + "-" + month + "-" + currentDate + " " + hours + ":" + minutes + ":" + seconds;
    }
}
// 百度地图API功能	
map = new BMap.Map("allmap");
map.centerAndZoom(new BMap.Point(104.114129, 37.550339), 5);
map.addControl(new BMap.NavigationControl()); // 添加平移缩放控件
map.enableScrollWheelZoom(); //启用滚轮放大缩小，默认禁用
var myIcon = new BMap.Icon("../img/map/30redcar.png", new BMap.Size(30, 57));
var opts = {
    width: 60, // 信息窗口宽度
    height: 100, // 信息窗口高度
    enableMessage: true //设置允许信息窗发送短息
};

var markers = [];
var new_markers = [];
var points = [];
var newpoints = [];
var total = 0; //总记录数
var groupCount = 0; //每次转十条
// var clickcar_id = 0;
// 。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
// "url": "../json/map.json",
function addClickHandler(content, marker, i, res) {
    marker.addEventListener("click", function(e) {
        // openInfo(content, e);
        // clickcar_id = $(content).children("#car_id").text();
        // return clickcar_id;
        console.log(i);
        // console.log(this.id);
        mapInfo(res[i].vSn, res[i].vCarSn, res[i].gpsSN, res[i].vCarType, res[i].warn, res[i].iccard, res[i].isAllow, res[i].runStatic,
            res[i].speed, res[i].dAllowStartTm, res[i].dAllowEndTm, res[i].runsumtime);
        console.log(content);
    });
}
var map_ulli = "";

function mapInfo(id, carid, gpsid, brand, warn, icid, ifallow, status, speed, dAllowStartTm, dAllowEndTm, time) {
    map_ulli = '<li>车辆编号：<span>' + id + '</span></li>' +
        '<li>车牌号：' + carid + '</li>' +
        '<li>gps编号：' + gpsid + '</li>' +
        '<li>车型：' + brand + '</li>' +
        '<li>告警：' + warn + '</li>' +
        '<li>ic卡卡号：' + icid + '</li>' +
        '<li>是否允许：' + ifallow + '</li>' +
        '<li>行驶状态：' + status + '</li>' +
        '<li>行驶速度：' + speed + '</li>' +
        '<li>允许行驶开始时间：' + changeDateFormat(dAllowStartTm) + '</li>' +
        '<li>允许行驶結束时：' + changeDateFormat(dAllowEndTm) + '</li>' +
        '<li>车辆行驶总时间：' + time + '</li>';
    $(".mapinfo ul").html(map_ulli);
    console.log($(".mapinfo ul").text());
    if ($(".mapinfo ul").find("li").length == 0) {
        $(".mapinfo ul").hide();
    } else {
        $(".mapinfo ul").show();
    }
}

if ($(".mapinfo ul").find("li").length == 0) {
    $(".mapinfo ul").hide();
} else {
    $(".mapinfo ul").show();
}

function openInfo(content, e) {
    var p = e.target;
    var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
    var infoWindow = new BMap.InfoWindow(content, opts); // 创建信息窗口对象 
    map.openInfoWindow(infoWindow, point); //开启信息窗口
}

// 搜索某一条车辆
function searchcar() {
    console.log($("#suggestId").val());
    if ($("#suggestId").val() == null || $("#suggestId").val() == "") {
        alert("车辆编号不能为空");
    } else {
        $.ajax({
            // "url": "http://192.168.0.106:8080/car-management/car/carData.action",
            "url": "../json/searchmap.json",
            "type": "get",
            // "dataType": "jsonp", //数据类型为jsonp  
            // "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
            "data": {
                "vSn": $("#suggestId").val()
            },
            "success": function(res) {
                console.log(res);
                console.log(res);
                newpoints.length = 0;
                markers.length = 0;
                map.clearOverlays(); //清除图层覆盖物
                for (var j = 0; j < res.length; j++) {
                    if (res[0] == null) {
                        alert("车辆数据未搜素到");
                        return;
                    }
                    newpoints.push(new BMap.Point(res[j].longitude, res[j].latitude));
                }
                setTimeout(function() {
                    var convertors = new BMap.Convertor();
                    convertors.translate(newpoints, 1, 5, function(data) {
                        console.log(data);
                        if (data.status === 0) {
                            // map.clearOverlays(); //清除图层覆盖物
                            for (var i = 0; i < data.points.length; i++) {
                                var new_marker = new BMap.Marker(data.points[i], {
                                    icon: myIcon
                                }); // 创建标注
                                map.addOverlay(new_marker);
                                console.log(res[i]);
                                var showInfo = "<div class='point_content'>当前状态：" + res[i].runStatic +
                                    "<br/>" + "车辆编号:<span id='car_id'>" + res[i].vSn +
                                    "</span><br/>是否允许：" + res[i].isAllow +
                                    "<br/><span class='point_tips'>更多车辆信息请查看右侧车辆详情面板<span>" +
                                    "</div>";
                                markers.push(new_marker);
                                addClickHandler(showInfo, new_marker, i, res);
                            }
                        }
                    })
                }, 1000);
            },
            "error": function(data) {
                console.log(data);
                alert("发生错误");
            }
        })
    }
}
$("#search-btn").click(function() {
    console.log($("#suggestId").val());
    map.clearOverlays(); //清除图层覆盖物
    searchcar();
});
//回车提交事件
$("body").keydown(function() {
    if (event.keyCode == "13") { //keyCode=13是回车键
        // console.log(this);
        map.clearOverlays(); //清除图层覆盖物
        searchcar();
    }
});

$(".mapinfo img").click(function() {
    $(".mapinfo ul").slideToggle("slow");
})

// 加载页面，加载全部车辆
var mypoint = "";
$.ajax({
    "url": "../json/map.json",
    // "url": "http://192.168.0.106:8080/car-management/car/allcar.action",
    "type": "get",
    // "dataType": "jsonp", //数据类型为jsonp  
    // "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
    "success": function(res) {
        console.log(res);
        // console.log(res.length);
        for (var n = 0; n < res.length; n++) {
            mypoint += res[n].longitude + ',' + res[n].latitude + ";";
            // if (n == res.length) {
            //     mypoint += res[n].longitude + ',' + res[n].latitude
            // }
        }
        // console.log(mypoint);
        // mypoint = mypoint.substring(0, mypoint.Length - 1)
        mypoint = mypoint.substring(0, mypoint.lastIndexOf(';'));
        console.log(mypoint);
        // ----------------------------------------------------------------------------------------------------------------
        // var url = "http://xxx.xxx.xxx?p1=1&p2=2";
        // $("#iframe").attr("src", url); //跨域，使用iframe
        $.ajax({
            url: "http://api.map.baidu.com/geoconv/v1/",
            type: "get",
            dataType: "jsonp", //数据类型为jsonp  
            jsonp: "callback", //这里定义了callback的参数名称，以便服务获取callback的函数名即getMessage  
            // "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
            jsonpCallback: "callback", //这里定义了jsonp的回调函数 
            data: {
                "coords": mypoint,
                "from": 1,
                "to": 5,
                "ak": "pDUf1lcj5kEDkegBS5DSF1TA9uib5AjE"
            },
            // url: "http://api.map.baidu.com/geoconv/v1/?coord=" + mypoint + "&from=1&to=5&ak=pDUf1lcj5kEDkegBS5DSF1TA9uib5AjE&callback=mycall",
            // type: "get",
            success: function(data) {
                console.log(data);
                for (var i = 0; i < data.result.length; i++) {
                    // var marker = new BMap.Marker(new BMap.Point(116.404, 39.915)); // 创建点
                    var marker = new BMap.Marker(new BMap.Point(data.result[i].x, data.result[i].y), {
                        icon: myIcon
                    }); // 创建标注
                    map.addOverlay(marker);
                    console.log(res[i]);
                    var showInfo = "<div class='point_content'>当前状态：" + res[i].runStatic +
                        "<br/>" + "车辆编号:<span id='car_id'>" + res[i].vSn +
                        "</span><br/>是否允许：" + res[i].isAllow +
                        "<br/><span class='point_tips'>更多车辆信息请查看右侧车辆详情面板<span>" +
                        "</div>";
                    markers.push(marker);
                    addClickHandler(showInfo, marker, i, res);
                    //最简单的用法，生成一个marker数组，然后调用markerClusterer类即可。叠加点,实现点聚合
                    var markerClusterer = new BMapLib.MarkerClusterer(map, {
                        markers: markers
                    });
                }
            }
        })
    },
    "error": function(data) {
        console.log(data);
    }
});