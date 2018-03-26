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
laydate.render({
    elem: '#time',
    type: 'datetime',
    value: todayDate,
    theme: '#041473' //授权终止日
});
// 数据库 加载权限列表
function requestTypein(paramsid, url, data, that, next) {
    console.log(url);
    $.ajax({
        "url": url,
        "type": "get",
        "async": false,
        "dataType": "jsonp", //数据类型为jsonp  
        "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
        "data": data,
        "success": function(res) {
            console.log(res);
            $(paramsid).html(res.msg);
            var id;
            if (res.data.id) {
                id = res.data.id;
            } else {
                id = getHashParameter("id");
            }
            if (res.ret == true) {
                window.location.hash = "id=" + id + "&pagenum=1&vSn=" + res.data.vSn + "&vin=" + res.data.vin + "&engineNumber=" + res.data.engineNumber; //车辆数据库编号
                $(that).parent().attr("href", "#" + next);
                if (next == "carCheck") {
                    initcarCheck();
                } else if (next == "car_safeCheck") {
                    initcarsafeCheck();
                }
                $('a[href="#' + next + '"]').tab('show');
            } else {
                return;
            }
        },
        "error": function(res) {
            console.log(res);
        }
    })
}

// 车辆编号校验
$("#carTypeIn #vSn").bind('input porpertychange', function() {
    checkParams("/" + $("#carTypeIn #vSn").val() + "/1.action", ".vSn_tips");
});
// 车辆录入
$("#carTypeIn_btn").click(function() {
    $(this).parent().attr("href", "#");
    // console.log($("#read_carfile").prop("checked"));
    if ($("#carTypeIn #vSn").val() == "" || $("#carTypeIn #product_sn").val() == "" || $("#carTypeIn #vin").val() == "" || $("#carTypeIn #engineNumber").val() == "") {
        alert("有必填项未填写！");
        return;
    }
    if ($("#carTypeIn #read_carfile").prop("checked") == false) {
        alert("请先阅读测试车辆注意事项");
        return;
    }
    var id = "";
    if (getHashParameter("id")) {
        id = getHashParameter("id");
    }
    // 有25个字段
    var carinfodata = {
        "id": id,
        "vSn": $("#carTypeIn #vSn").val(), //试验车号
        "vin": $("#carTypeIn #vin").val(), //车架号
        "product_sn": $("#carTypeIn #product_sn").val(),
        "product_name": $("#carTypeIn #product_name").val(),
        "carName": $("#carTypeIn #carName").val(),
        "vCarType": $("#carTypeIn #vCarType").val(),
        "customer": $("#carTypeIn #customer").val(),
        "projectEngineer": $("#carTypeIn #projectEngineer").val(),
        "contactNumber": $("#carTypeIn #contactNumber").val(),
        "engineType": $("#carTypeIn #engineType").val(),
        "engineNumber": $("#carTypeIn #engineNumber").val(),
        "engineCapacity": $("#carTypeIn #engineCapacity").val(),
        "FuelType": $("#carTypeIn #FuelType").val(),
        "oilspecification": $("#carTypeIn #oilspecification").val(),
        "tyresize": $("#carTypeIn #tyresize").val(),
        "GBTS": $("#carTypeIn #GBTS").val(), //变速箱油规格
        "reaTireP": $("#carTypeIn #reaTireP").val(),
        "frontTireP": $("#carTypeIn #frontTireP").val(),
        "vehicleQuality": $("#carTypeIn #vehicleQuality").val(),
        "loadMethod": $("#carTypeIn #loadMethod").val(),
        "loadData": $("#carTypeIn #loadData").val(),
        "operator": $("#carTypeIn #operator").val(), //签字人、操作人
        "makeTime": $("#carTypeIn #makeTime").val(), //makeTime
        "remark": $("#carTypeIn #remark").val(), //备注
        "gids": $("#carTypeIn #gids").val() //车辆分组
    };
    var that = this;
    requestTypein(".cartypein_tips", "http://192.168.0.222:8080/car-management/car/addCar.action", carinfodata, that, "carCheck");
});
// 接车点检返回上一步
$("#return_carTypeIn").click(function() {

});
// 接车点检初始化表单
function initcarCheck() {
    formReset();
    console.log(getHashParameter("vSn"));
    $("#carCheck #vSn").val(getHashParameter("vSn")); //车辆编号
    $("#carCheck #vin").val(getHashParameter("vin")); //车架号
    $("#carCheck #engineNumber").val(getHashParameter("engineNumber")); //发动机编号
}
// initcarsafeCheck  车辆安全检查初始化

function initcarsafeCheck() {
    // 缸压
    $.ajax({
        "url": "../json/datatable.json",
        "type": "get",
        "dataType": "jsonp", //数据类型为jsonp  
        "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
        "success": function(res) {
            var boxs = "";
            for (var j = 0; j < res.length; j++) {
                boxs += '<div><label>' + res.name + '</label><input type="text" value="' + res.value + '"></div>'
            }
            console.log(boxs);
        }
    });
    // 检查项目
}

// 接车点检
$(".resetcheck_btn").click(function() {
    initcarCheck();
});
$("#carCheck_btn").click(function() {
    if (getHashParameter("vSn") == "" || getHashParameter("vin") == "" || getHashParameter("engineNumber") == "") {
        alert("车辆编号、车架号、发动机编码等不能为空");
        return;
    }
    var carCheckdata = {
        "carid": getHashParameter("id"), //数据库编号
        "vSn": getHashParameter("vSn"), //车辆编号
        "vin": getHashParameter("vin"), //车架号
        "engineNumber": getHashParameter("engineNumber"), //发动机编号
        "carfacade": $("input[name='carfacade']:checked").val(),
        "item": $("#item").val(),
        "tools": $("#tools").val(),
        "sparetyre": $("#sparetyre").val(), //备用轮胎
        "jack": $("#jack").val(),
        "warningboard": $("#warningboard").val(),
        "fire": $("#fire").val(),
        "keyy": $("#keys").val(),
        "odometer": $("#ododmeter").val(),
        "pickone": $("#pickone").val(),
        "telephone": $("input[name='send_iphone']").val(),
        "send_p": $("#send_p").val(),
        "time": $("input[name='receivecar']").val()
    };
    var that = this;
    requestTypein(".carcheck_tips", "http://192.168.0.222:8080/car-management/car/upcheck.action", carCheckdata, that, "car_safeCheck");
});

// 接车点检返回到车辆录入界面，数据回显
$("#carcheck_return").click(function() {
    $.ajax({
        "url": "http://192.168.0.222:8080/car-management/car/carData.action",
        "type": "get",
        "data": {
            "vSn": getHashParameter("vSn")
        },
        "dataType": "jsonp", //数据类型为jsonp  
        "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数
        "success": function(res) {
            console.log(res);
            res = res[0];
            $("#carTypeIn #vSn").val(res.vSn);
            $("#carTypeIn #vin").val(res.vin); //车架号
            $("#carTypeIn #product_sn").val(res.product_sn);
            $("#carTypeIn #product_name").val(res.product_name);
            $("#carTypeIn #engineNumber").val(res.engineNumber);
            $("#carTypeIn #carName").val(res.carName);
            $("#carTypeIn #vCarType").val(res.vCarType);
            $("#carTypeIn #customer").val(res.customer);
            $("#carTypeIn #projectEngineer").val(res.projectEngineer);
            $("#carTypeIn #contactNumber").val(res.contactNumber);
            $("#carTypeIn #engineType").val(res.engineType);
            $("#carTypeIn #engineCapacity").val(res.engineCapacity);
            $("#carTypeIn #FuelType").val(res.fuelType);
            $("#carTypeIn #oilspecification").val(res.oilspecification);
            $("#carTypeIn #tyresize").val(res.tyresize);
            $("#carTypeIn #GBTS").val(res.gbts); //变速箱油规格
            $("#carTypeIn #reaTireP").val(res.reaTireP);
            $("#carTypeIn #frontTireP").val(res.frontTireP);
            $("#carTypeIn #vehicleQuality").val(res.vehicleQuality);
            $("#carTypeIn #loadMethod").val(res.loadMethod);
            $("#carTypeIn #loadData").val(res.loadData);
            $("#carTypeIn #operator").val(res.operator); //签字人、操作人
            $("#carTypeIn #makeTime").val(changeDateFormat(res.makeTime)); //makeTime
            $("#carTypeIn #remark").val(res.remark); //备注
            if (res.cGroup == null) {
                $("#carTypeIn #gids").val("") //车辆分组
            } else {
                $("#carTypeIn #gids").val(res.cGroup.id) //车辆分组
            }
        }
    })
})

// 查看车辆点检信息
function FindCheckinfo(id, url) {
    $.ajax({
        "url": url,
        "type": "get",
        "data": {
            "carid": id
        },
        "async": false,
        "dataType": "jsonp", //数据类型为jsonp  
        "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
        "success": function(res) {
            console.log(res);
            // window.location.hash = "pagenum=" + pageNum;
            $("#carCheck input").attr("readOnly", true);
            if (res == null || res == undefined) {
                formReset(); //先将form表单信息清空
                return;
            }
            $("#vSn").val(getHashParameter("vSn"));
            $("#vin").val(res.vin);
            $("#engineNumber").val(res.engineNumber);
            if (res.carfacade == 1) {
                $(".car_image_check:input:first-child").prop("checked", "checked");
            } else {
                $(".car_image_check:input:last-child").prop("checked", "checked");
            }
            $("#item").val(res.item);
            $("#tools").val(res.tools);
            $("#sparetyre").val(res.sparetyre);
            $("#jack").val(res.jack);
            $("#warningboard").val(res.warningboard);
            $("#fire").val(res.fire);
            $("#keys").val(res.keyy);
            $("#ododmeter").val(res.odometer);
            $("#pickone").val(res.pickone);
            $("input[name='send_iphone']").val(res.telephone);
            $("#send_p").val(res.send_p);
            $("#vin").val(res.vin);
            $("input[name='receivecar']").val(res.time);
        },
        "error": function(res) {
            console.log(res);
        }
    });
}

// 还车点检---------------------------------------------------------------
// 这个按钮从列表来
$(".resetreturncheck_btn").click(function() {
    formReset();
    $("#returncarCheck #vSn").val(getHashParameter("vSn")); //车辆编号
    $("#returncarCheck #vin").val(getHashParameter("vin")); //车架号
    $("#returncarCheck #engineNumber").val(getHashParameter("engineNumber")); //发动机编号
});
$("#returncarCheck_btn").click(function() {
    var returncarCheckdata = {
        "carid": getHashParameter("id"), //数据库编号
        // "vSn": getHashParameter("vSn"), //车辆编号
        // "vin": getHashParameter("vin"), //车架号
        // "engineNumber": getHashParameter("engineNumber"), //发动机编号
        "toolisrecycled": $("input[name='toolisrecycled']:checked").val(),
        "sparetyre": $("#returncarCheck #sparetyre").val(), //备用轮胎
        "tools": $("#returncarCheck #tools").val(),
        "jack": $("#returncarCheck #jack").val(),
        "warningboard": $("#returncarCheck #warningboard").val(), //紧急停车牌
        "fire": $("#returncarCheck #fire").val(),
        "keyy": $("#returncarCheck #keyy").val(), //钥匙数量
        "odometer": $("#returncarCheck #ododmeter").val(),
        "proposer": $("#returncarCheck #proposer").val(),
        "forpeople": $("#returncarCheck #forpeople").val(), //交车人
        "pickone": $("#returncarCheck #pickone").val(),
        "pick_tel": $("#pick_tel").val(), //接车人电话
        "pick_card": $("#pick_card").val(),
        "trans_sn": $("#trans_sn").val(), //运输车号
        "time": $("input[name='receivecar']").val()
            // "operator": $("#operator").val(), //操作人//总动生成
            // "operator_time": $("#operator_time").val() //自动能够生产
    };
    // console.log(carCheckdata);
    requestTypein(".returncarcheck_tips", "http://192.168.0.222:8080/car-management/car/backCheck.action", returncarCheckdata);
});

// 接车点检返回
$(".returncarcheck_return").click(function() {
    $('#carListtable').bootstrapTable('destroy');
    loadCarList(getHashParameter("pagenum"), 10);
})

// 查看还车点检信息
function FindreturnCheckinfo(id, url) {
    $.ajax({
        "url": url,
        "type": "get",
        "data": {
            "carid": id
        },
        "async": false,
        "dataType": "jsonp", //数据类型为jsonp  
        "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
        "success": function(res) {
            console.log(res);
            $("#returncarCheck input").attr("readOnly", true);
            if (res == null || res == undefined) {
                formReset(); //先将form表单信息清空
                return;
            }
            $("#vSn").val(getHashParameter("vSn"));
            if (res.toolisrecycled == "1") {
                $(".car_tools_check input:first-child").prop("checked", "checked");
            } else {
                $(".car_tools_check input:last-child").prop("checked", "checked");
            }
            $("#returncarCheck #sparetyre").val(res.sparetyre);
            $("#returncarCheck #tools").val(res.tools);
            $("#returncarCheck #jack").val(res.jack);
            $("#returncarCheck #warningboard").val(res.warningboard);
            $("#returncarCheck #fire").val(res.fire);
            $("#returncarCheck #keyy").val(res.keyy);
            $("#returncarCheck #ododmeter").val(res.odometer);
            $("#returncarCheck #proposer").val(res.proposer);
            $("#returncarCheck #forpeople").val(res.forpeople);
            $("#returncarCheck #pickone").val(res.pickone);
            $("#returncarCheck #pick_tel").val(res.pick_tel);
            $("#returncarCheck #pick_card").val(res.pick_card);
            $("#returncarCheck #trans_sn").val(res.trans_sn);
            // $("input[name='send_iphone']").val(res.telephone);
            // $("#send_p").val(res.send_p);
            $("#returncarCheck #time").val(res.time);
            // $("input[name='receivecar']").val(res.time);
        },
        "error": function(res) {
            console.log(res);
        }
    });
}

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