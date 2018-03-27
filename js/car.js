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
            var id, vSn, vin, engineNumber;
            id = getHashParameter("id");
            vSn = getHashParameter("vSn");
            vin = getHashParameter("vin");
            engineNumber = getHashParameter("engineNumber");
            if (getHashParameter("id") == null) {
                id = res.data.id;
                vSn = res.data.vSn;
                vin = res.data.vin;
                engineNumber = res.data.engineNumber;
            }
            if (res.ret == true) {
                window.location.hash = "id=" + id + "&pagenum=1&vSn=" + vSn + "&vin=" + vin + "&engineNumber=" + engineNumber; //车辆数据库编号
                $(that).parent().attr("href", "#" + next);
                if (next == "carCheck") {
                    initcarCheck(); //初始化接车点检
                } else if (next == "sCheck") {
                    initsafeCheck(".pot_pressure"); //初始化安全检查
                } else if (next == "initReturnCarCheck") {
                    initReturnCarCheck(""); //初始化还车检点
                }
                $('a[href="#' + next + '"]').tab('show');
                // 将提交成功，返回的数据存入session
                window.localStorage.formData = JSON.stringify(res);
            } else {
                return;
            }
        },
        "error": function(res) {
            console.log(res);
        }
    })
}
// 车辆录入-----------------------------------------------------------------------------------------
// 车辆编号校验
$("#carTypeIn #vSn").bind('input porpertychange', function() {
    console.log($("#carTypeIn #vSn").val());
    if ($("#carTypeIn #vSn").val() == null || $("#carTypeIn #vSn").val() == "") {
        return;
    } else {
        checkParams("/" + $("#carTypeIn #vSn").val() + "/1.action", ".vSn_tips", ".cartypein_tips", "#carTypeIn_btn");
    }
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
// 接车点检-----------------------------------------------------------------------------------------
// 接车点检初始化表单
function initcarCheck() {
    formReset();
    console.log(getHashParameter("vSn"));
    $("#carCheck #vSn").val(getHashParameter("vSn")); //车辆编号
    $("#carCheck #vin").val(getHashParameter("vin")); //车架号
    $("#carCheck #engineNumber").val(getHashParameter("engineNumber")); //发动机编号
}
// 表单正则判断函数
function inputVal(inputid, but) {
    var reg = /^\d{1,}$/; //必须为int型
    var originhtml = $(inputid).siblings().html();
    $(inputid).bind('input porpertychange', function() {
        var val = $(inputid).val();
        var regg = reg.test(val);
        if (regg == false) {
            $(inputid).siblings().html("格式不正确");
            $(inputid).siblings().removeClass("col-sm-2").addClass("col-sm-5 vSn_tips");
            $(but).attr("disabled", true);
        } else {
            $(inputid).siblings().html(originhtml);
            $(inputid).siblings().removeClass("col-sm-5 vSn_tips").addClass("col-sm-2");
            $(but).attr("disabled", false);
        }
    });
}
inputVal("#carCheck #sparetyre", "#carCheck_btn");
inputVal("#carCheck #tools", "#carCheck_btn");
inputVal("#carCheck #jack", "#carCheck_btn");
inputVal("#carCheck #warningboard", "#carCheck_btn");
inputVal("#carCheck #fire", "#carCheck_btn");
inputVal("#carCheck #keys", "#carCheck_btn");
inputVal("#carCheck #ododmeter", "#carCheck_btn");
inputVal("input[name='send_iphone']", "#carCheck_btn");
// 接车点检重置
$(".resetcheck_btn").click(function() {
    initcarCheck();
});
// 接车点检提交
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
    requestTypein(".carcheck_tips", "http://192.168.0.222:8080/car-management/car/upcheck.action", carCheckdata, that, "sCheck");
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
});

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
            // $("#carCheck input").attr("readOnly", true);
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
// 安全检查---------------------------------------------------------------
// 安全检查上一步
$("#carWiring_return").click(function() {
    FindCheckinfo(getHashParameter("id"), "http://192.168.0.222:8080/car-management/car/findUpcheck.action");
});
// 页面检查菜单
function addMenu(boxname) {
    $.ajax({
        "url": "http://192.168.0.222:8080/car-management/car/findAllCheckName.action",
        "type": "get",
        "dataType": "jsonp", //数据类型为jsonp  
        "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
        "success": function(res) {
            console.log(res);
            var Ahref = "";
            for (var a = 0; a < res.length; a++) {
                Ahref += '<a href="#' + res[a].url + '" data-toggle="tab"><button type="button" class="checkitem' + res[a].id + '">' + res[a].name + '</button></a>';
            }
            console.log(Ahref);
            $(boxname).html(Ahref);
        }
    })
}
$('.checkitem1').click(function() {
    addMenu("#sCheck .checkMenus");
});
$('.checkitem2').click(function() {
    addMenu("#wiringCheck .checkMenus");
});
$('.checkitem3').click(function() {
    addMenu("#bomCheck .checkMenus");
});
$('.checkitem4').click(function() {
    addMenu("#partCheck .checkMenus");
})


function getcnid(url, boxname) {
    // 安全检查项目
    $.ajax({
        "url": "http://192.168.0.222:8080/car-management/car/findAllParentItem.action?CNID=" + url,
        "type": "get",
        "dataType": "jsonp", //数据类型为jsonp  
        "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
        "success": function(res) {
            console.log(res);
            var checkboxs = '<div class="checktitle"><span>检查项目</span><span>要求</span><span>状态</span><span>说明（注明问题不能解决的原因）</span></div>';

            for (var i = 0; i < res.length; i++) {
                checkboxs += '<div class="checkitem"><span>' + res[i].name +
                    '</span><span>' + res[i].carCheckRequest.name +
                    '</span><span><input type="radio" class="" value="0" name="itemstatus">是' +
                    '<input type="radio" class="statusno" value="1" name="itemstatus">否' +
                    '<input type="radio" class="" value="2" name="itemstatus">NA' +
                    '</span><span> <input type="text" class="item' + i + 'explain explain_input" value=""></span></div>'
            }
            // console.log(checkboxs);
            $(boxname).html(checkboxs);
        }
    });
}
// initsafeCheck  车辆安全检查初始化
function initsafeCheck(box1) {
    addMenu("#sCheck .checkMenus");
    // 缸压
    $.ajax({
        "url": "./json/datatable.json",
        "type": "get",
        // "dataType": "jsonp", //数据类型为jsonp  
        // "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
        "success": function(res) {
            console.log(res);
            var boxs = "";
            for (var j = 0; j < res.length; j++) {
                boxs += '<div><label>' + res[j].name + '</label><input type="text" value="' + res[j].id + '"></div>'
            }
            // console.log(boxs);
            $(box1).html(boxs);
        }
    });
    // 初始化检查项目表
    getcnid(1, ".check_itembox");
}
//安全检查重置
$(".resetsafe_btn").click(function() {
    initcarCheck();
});
// 安全检查提交
$("#carWiring_btn").click(function() {
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
    requestTypein(".carcheck_tips", "http://192.168.0.222:8080/car-management/car/upcheck.action", carCheckdata, that, "sCheck");
});

//线束检查初始化 ---------------------------------------------------------
function initWiringCheck(box1) {
    addMenu("#wiringCheck .checkMenus");
    // 初始化检查项目表
    getcnid(2, ".wcheck_itembox");
}
// 还车点检----------------------------------------------------------------------------------------
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

// 还车点检返回
$(".returncarcheck_return").click(function() {
    $('#carListtable').bootstrapTable('destroy');
    loadCarList(getHashParameter("pagenum"), 10);
});

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