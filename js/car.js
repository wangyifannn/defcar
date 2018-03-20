var todayDate = new Date();
var dateend = new Date(todayDate);
dateend.setDate(todayDate.getDate() + 30);
laydate.render({
    elem: '#receiverdata',
    type: 'datetime',
    value: todayDate,
    theme: '#041473' //自定义颜色主题
});
// 车辆录入表制作日期
laydate.render({
    elem: '#makeTime',
    type: 'datetime',
    value: todayDate,
    theme: '#041473' //自定义颜色主题
});
// 驾驶员录入相关日期
laydate.render({
    elem: '#birthday',
    type: 'datetime',
    theme: '#041473' //驾驶员出生年月
});
laydate.render({
    elem: '#LStartTime',
    type: 'datetime',
    value: todayDate,
    theme: '#041473' //驾照有效日起
});

laydate.render({
    elem: '#LEndTime',
    type: 'datetime',
    value: dateend,
    theme: '#041473' //驾照有效日止
});
laydate.render({
    elem: '#allowStartTime',
    type: 'datetime',
    value: todayDate,
    theme: '#041473' //授权起始日
});
laydate.render({
    elem: '#allowEndTime',
    type: 'datetime',
    value: dateend,
    theme: '#041473' //授权终止日
});
// 数据库 加载权限列表
function requestTypein(paramsid, url, data) {
    console.log(url);
    $.ajax({
        "url": url,
        "type": "get",
        "dataType": "jsonp", //数据类型为jsonp  
        "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
        "data": data,
        "success": function(res) {
            console.log(res);
            $(paramsid).html(res.msg);
        },
        "error": function(res) {
            console.log(res);
        }
    })
}
// 接车点检
$("#carCheck_btn").click(function() {
    console.log("ss");
    console.log($("input[name='carfacade']:checked").val());
    var carCheckdata = {
            "carfacade": $("input[name='carfacade']:checked").val(),
            "othergoods": $("input[name='othergoods']").val(),
            "cartool": $("input[name='cartool']").val(),
            "jack": $("input[name='jack']").val(),
            "carsign": $("input[name='carsign']").val(),
            "keynum": $("input[name='keynum']").val(),
            "extinguisher": $("input[name='extinguisher']").val(),
            "keynum": $("input[name='keynum']").val(),
            "sendcarman": $("input[name='sendcarman']").val(),
            "send_iphone": $("input[name='send_iphone']").val(),
            "receivecar": $("input[name='receivecar']").val(),
            "receiverdata": $("input[name='receiverdata']").val(),
            "carshelfnum": $("input[name='carshelfnum']").val(),
            "enginenum": $("input[name='enginenum']").val(),
            "remark": $("input[name='remark']").val()
        }
        // console.log(carCheckdata);
        // requestTypein();
});
// 车辆录入
$("#carTypeIn_btn").click(function() {
    console.log($("#read_carfile").prop("checked"));
    console.log($("#vSn").val());
    if ($("#vSn").val() == "" || $("#product_sn").val() == "" || $("#gids").val() == "" || $("#engineNumber").val() == "") {
        alert("有必填项未填写！");
        return;
    }
    if ($("#read_carfile").prop("checked") == false) {
        alert("请先阅读测试车辆注意事项");
        return;
    }
    // 有25个字段
    carCheckdata = {
        "vSn": $("#vSn").val(), //试验车号
        "product_sn": $("#product_sn").val(),
        "product_name": $("#product_name").val(),
        "carName": $("#carName").val(),
        "vCarType": $("#vCarType").val(),
        "customer": $("#customer").val(),
        "projectEngineer": $("#projectEngineer").val(),
        "contactNumber": $("#contactNumber").val(),
        "engineType": $("#engineType").val(),
        "engineNumber": $("#engineNumber").val(),
        "engineCapacity": $("#engineCapacity").val(),
        "FuelType": $("#FuelType").val(),
        "vin": $("#vin").val(),
        "oilspecification": $("#oilspecification").val(),
        "tyresize": $("#tyresize").val(),
        "GBTS": $("#GBTS").val(), //变速箱油规格
        "reaTireP": $("#reaTireP").val(),
        "frontTireP": $("#frontTireP").val(),
        "vehicleQuality": $("#vehicleQuality").val(),
        "loadMethod": $("#loadMethod").val(),
        "loadData": $("#loadData").val(),
        "operator": $("#operator").val(), //签字人、操作人
        "makeTime": $("#makeTime").val(), //makeTime
        "remark": $("#remark").val(), //备注
        "gids": $("#gids").val() //车辆分组
    }
    requestTypein(".cartypein_tips", "http://192.168.0.222:8080/car-management/car/addCar.action", carCheckdata);
});
// 车辆/安全检查

// 驾驶员录入：
$("#driverTypeIn_btn").click(function() {
    if ($("#drivername").val() == "") {
        alert("有必填项未填写！");
        return;
    }
    // 有22个字段
    var driverCheckdata = {
        "name": $("#drivername").val(), //驾驶员姓名
        "sex": $("input[name='driversex']:checked").val(),
        "age": $("#driverage").val(),
        "telephone": $("#telephone").val(),
        "birthday": $("#birthday").val(),
        "iccard": $("#iccard").val(),
        "idnumber": $("#idnumber").val(), //身份证号
        "license": $("#driverlicensenum").val(), //驾驶证号
        "LStartTime": $("#LStartTime").val(),
        "LEndTime": $("#LEndTime").val(),
        "isallow": $("input[name='isallow']:checked").val(), //是否授权
        "allowStartTime": $("#allowStartTime").val(),
        "allowEndTime": $("#allowEndTime").val(),
        "remark": $("#carTypeIn_remake").val()
    }
    requestTypein(".drivetypein_tips", "http://192.168.0.222:8080/car-management/carDriver/add.action", driverCheckdata);
});


//