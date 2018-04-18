var todayDate = new Date();
var dateend = new Date(todayDate);
dateend.setDate(todayDate.getDate() + 30);
laydate.render({
    elem: '#receiverdata', //接车日期
    type: 'datetime', //精确到 时分秒
    // format: 'yyyy-MM-dd', //精确到 年月日
    value: todayDate,
    theme: '#041473' //自定义颜色主题
});
// 车辆录入表制作日期
laydate.render({
    elem: '#makeTime', //设置只读模式
    type: 'datetime', //精确到 时分秒
    // format: 'yyyy-MM-dd', //精确到 年月日
    value: todayDate,
    trigger: 'click',
    theme: '#041473' //自定义颜色主题

});
// 驾驶员录入相关日期
laydate.render({
    elem: '#birthday',
    type: 'datetime', //精确到 时分秒
    // format: 'yyyy-MM-dd',
    theme: '#041473' //驾驶员出生年月
});

laydate.render({
    elem: '#LStartTime',
    type: 'datetime', //精确到 时分秒
    // format: 'yyyy-MM-dd',
    value: todayDate,
    theme: '#041473' //驾照有效日起
});

laydate.render({
    elem: '#LEndTime',
    value: dateend,
    type: 'datetime', //精确到 时分秒
    // format: 'yyyy-MM-dd',
    theme: '#041473' //驾照有效日止
});
laydate.render({
    elem: '#allowStartTime',
    // format: 'yyyy-MM-dd',
    type: 'datetime', //精确到 时分秒
    value: todayDate,
    theme: '#041473' //授权起始日
});
laydate.render({
    elem: '#discuss_time',
    type: 'datetime', //精确到 时分秒
    // format: 'yyyy-MM-dd',
    theme: '#041473' //协商日期
});

laydate.render({
    elem: '#complete_time',
    // format: 'yyyy-MM-dd',
    type: 'datetime', //精确到 时分秒
    value: todayDate,
    theme: '#041473' //完成日期
});
laydate.render({
    elem: '#allowEndTime',
    type: 'datetime', //精确到 时分秒
    value: dateend,
    theme: '#041473' //授权终止日
});
laydate.render({
    elem: '#time',
    type: 'datetime', //精确到 时分秒
    value: todayDate,
    theme: '#041473' //授权终止日
});
laydate.render({
    elem: '#upkeepTime',
    type: 'datetime', //精确到 时分秒
    value: todayDate,
    theme: '#041473' //保养日期
});
laydate.render({
    elem: '#nextupkeepTime',
    type: 'datetime', //精确到 时分秒
    value: dateend,
    theme: '#041473' //下次保养日期
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

                if (res.data == null || res.data.id == null || res.data.id == undefined) {
                    // 如果是驾驶员录入
                    id = "";
                    vSn = "";
                    vin = "";
                    engineNumber = "";
                } else {
                    id = res.data.id;
                    vSn = res.data.vSn;
                    vin = res.data.vin;
                    engineNumber = res.data.engineNumber;
                }
            }
            if (res.ret == true) {
                window.location.hash = "id=" + id + "&pagenum=1&vSn=" + vSn + "&vin=" + vin + "&engineNumber=" + engineNumber; //车辆数据库编号
                if (next == "carCheck") {
                    initcarCheck(); //初始化接车点检
                } else if (next == "sCheck") {
                    initsafeCheck(".pot_pressure"); //初始化安全检查
                } else if (next == "initReturnCarCheck") {
                    initReturnCarCheck(""); //初始化还车检点
                } else if (next == "driverList") {
                    loadDriverList(1, 10);
                }
                $(that).parent().attr("href", "#" + next);
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
        checkParams("/tempcar/check/" + $("#carTypeIn #vSn").val() + "/1.action", ".vSn_tips", ".cartypein_tips", "#carTypeIn_btn");
    }
});
// 车辆录入
$("#carTypeIn_btn").click(function() {
    $(this).parent().attr("href", "#");
    if ($("#carTypeIn #vSn").val() == "" || $("#carTypeIn #product_sn").val() == "" || $("#carTypeIn #vin").val() == "" || $("#carTypeIn #engineNumber").val() == "") {
        alert("有必填项未填写！");
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
        "operator": "", //签字人、操作人,后台生成
        "makeTime": $("#carTypeIn #makeTime").val(), //makeTime
        "remark": $("#carTypeIn #remark").val(), //备注
        "gid": $("#carTypeIn #gids").val() //车辆分组
    };
    var that = this;
    requestTypein(".cartypein_tips", "http://192.168.0.106:8080/car-management/tempcar/addTcar.action", carinfodata, that, "carCheck");
});
// 接车点检-----------------------------------------------------------------------------------------
// 接车点检初始化表单
function initcarCheck() {
    formReset();
    // console.log(getHashParameter("vSn"));
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
        if (val == "") {
            return;
        }
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
// inputVal("#engineCapacity", "#carTypeIn_btn");
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
    if ($("#pickone").val() == "" || $("#").val() == "") {
        alert("有必填项未填写");
        return;
    }
    $(this).parent().attr("href", "#" + "sCheck");
    var carCheckdata = {
        "tcarid": getHashParameter("id"), //数据库编号
        "vSn": getHashParameter("vSn"), //车辆编号
        "vin": getHashParameter("vin"), //车架号
        "engineNumber": getHashParameter("engineNumber"), //发动机编号
        "facade": $("input[name='carfacade']:checked").val(),
        "item": $("#item").val(),
        "tools": $("#tools").val(),
        "sparetyre": $("#sparetyre").val(), //备用轮胎
        "jack": $("#jack").val(),
        "warningboard": $("#warningboard").val(),
        "fire": $("#fire").val(),
        "keyy": $("#keys").val(),
        "odometer": $("#ododmeter").val(), //*
        "pickone": $("#pickone").val(),
        "telephone": $("input[name='send_iphone']").val(),
        "send_p": $("#send_p").val(),
        "time": $("input[name='receiverdata']").val()
    };
    console.log(carCheckdata);
    var that = this;
    requestTypein(".carcheck_tips", "http://192.168.0.106:8080/car-management/car/upcheck.action", carCheckdata, that, "sCheck");
});
// 接车点检返回到车辆录入界面，数据回显
$("#carcheck_return").click(function() {
    cartypein_info(getHashParameter("vSn"), "#carTypeIn"); //调用 detail.js里面的车辆录入信息回显函数
    $(".cartypein_tips").html("");
});

// 安全检查---------------------------------------------------------------
// 安全检查上一步
$("#carWiring_return").click(function() {
    FindCheckinfo("http://192.168.0.106:8080/car-management/car/findUpcheck.action?vSn=" + getHashParameter("vSn"), "#carCheck");
    $(".carcheck_tips").html("");
});
// 页面检查菜单
function addMenu(boxname, num) {
    $.ajax({
        "url": "http://192.168.0.106:8080/car-management/car/findAllCheckName.action",
        "type": "get",
        "success": function(res) {
            console.log(res);
            var Ahref = "";
            var active = "";
            for (var a = 0; a < res.length; a++) {
                if (res[a].id == num) {
                    console.log(res[a].id);
                    active = "checkitem_active";
                } else {
                    active = "";
                }
                Ahref += '<a href="#" data-toggle="tab"><button type="button" class="checkitem' + res[a].id + ' ' + active + '">' + res[a].name + '</button></a>';
            }
            $(boxname).html(Ahref);
            $('.checkitem1').click(function() {
                $(this).parent().attr("href", "#" + "sCheck");
                addMenu("#sCheck .checkMenus", 1);
                initsafeCheck(".pot_pressure"); //初始化安全检查
            });
            $('.checkitem2').click(function() {
                $(this).parent().attr("href", "#" + "wiringCheck");
                addMenu("#wiringCheck .checkMenus", 2);
                initWiringCheck("");
            });
            $('.checkitem3').click(function() {
                $(this).parent().attr("href", "#" + "bomCheck");
                addMenu("#bomCheck .checkMenus", 3);
                initBomCheck();
            });
        }
    })
}



function getcnid(url, boxname) {
    // 安全检查
    $.ajax({
        // "url": "http://localhost/car/CarMangae0/json/item" + url + ".json",
        "url": "http://192.168.0.106:8080/car-management/car/findAllParentItem.action?CNID=" + url,
        "type": "get",
        "success": function(res) {
            console.log(res);
            if (url == 1 || url == 3) {
                if (url == 1) {
                    var checkboxs = '<div class="checktitle"><span>检查项目</span><span>要求</span><span>状态</span><span>说明（注明问题不能解决的原因）</span></div>';
                    for (var i = 0; i < res.length; i++) {
                        checkboxs += '<div class="checkitem"><span>' + res[i].pname +
                            '</span><span>' + res[i].carCheckRequest.request +
                            '</span><span class="style1_radio"><input type="radio" checked="" class="statusy" value="Y" name="itemstatus' + i + '">是' +
                            '&nbsp;&nbsp;&nbsp;<input type="radio" checked="" class="statusno" value="N" name="itemstatus' + i + '">否' +
                            '&nbsp;&nbsp;&nbsp;<input type="radio" checked="" class="" value="NA" name="itemstatus' + i + '">NA' +
                            '</span><span> <input type="text" class="item' + i + 'explain explain_input" value="" name="explain' + i + '"></span></div>';
                    }

                } else if (url == 3) {
                    var checkboxs = '<div class="checktitle"><span>零部件名称</span><span>零部件号</span><span>状态</span><span>说明（注明问题不能解决的原因）</span></div>';
                    for (var i = 0; i < res.length; i++) {
                        checkboxs += '<div class="checkitem"><span><input type="text" class="bom_name" value="' + res[i].pname + '">' +
                            '</span><span><input type="text" class="bom_num" value="' + res[i].components.name + '">' +
                            '</span><span class="style1_radio"><input type="radio" checked="" class="statusy my_radio" value="Y" name="itemstatus' + i + '">是' +
                            '&nbsp;&nbsp;&nbsp;<input type="radio" checked="" class="statusno my_radio" value="N" name="itemstatus' + i + '">否' +
                            '&nbsp;&nbsp;&nbsp;<input type="radio" checked="" class="my_radio" value="NA" name="itemstatus' + i + '">NA' +
                            '</span><span> <input type="text" class="item' + i + 'explain explain_input" value="" name="explain' + i + '"></span></div>';
                    }
                    for (var j = 11; j < 16; j++) {
                        checkboxs += '<div class="checkitem"><span><input type="text" class="bom_name"></span><span><input type="text" class="bom_num">' +
                            '</span><span class="style1_radio"><input type="radio" checked="" class="statusy my_radio" value="Y" name="itemstatus' + j + '">是' +
                            '&nbsp;&nbsp;&nbsp;<input type="radio" checked="" class="statusno my_radio" value="N" name="itemstatus' + j + '">否' +
                            '&nbsp;&nbsp;&nbsp;<input type="radio" checked="" class="my_radio" value="NA" name="itemstatus' + j + '">NA' +
                            '</span><span> <input type="text" class="item' + j + 'explain explain_input" value="" name="explain' + j + '"></span></div>';
                    }
                }
            } else if (url == 2 || url == 4) {
                if (url == 2) {
                    var checkboxs = '<div class="checktitle"><span>检查项目</span><span class="itemlist2">状态</span><span class="itemlist3">说明（注明问题不能解决的原因）</span></div>';
                } else if (url == 4) {
                    var checkboxs = '<div class="checktitle"><span class="itemlist1"><span class="itemlist_head">名称</span><span class="item_child">简明安装使用要求</span></span><span class="itemlist2">状态</span><span class="itemlist3">说明（注明问题不能解决的原因）</span></div>';
                }
                for (var i = 0; i < res.length; i++) {
                    var childitem = "";
                    var childstatus = "";
                    var childexplain = "";
                    if (res[i].carCheckItems.length == 0) {
                        checkboxs += '<div class="checkitem"><span class="itemlist1">' + res[i].pname +
                            '</span><span class="itemlist2 rowradio"><input checked="" type="radio" class="statusy my_radio" value="Y" name="status' + i + '">是' +
                            '&nbsp;&nbsp;&nbsp;<input type="radio" checked="" class="statusno my_radio" value="N" name="status' + i + '">否' +
                            '&nbsp;&nbsp;&nbsp;<input type="radio" checked="" class="my_radio" value="NA" name="status' + i + '">NA' +
                            '</span><span class="itemlist3"><input type="text" class="item' + i + 'explain explain_input" value="" name="explain' + i + '"></span></div>'
                    } else {
                        for (var j = 0; j < res[i].carCheckItems.length; j++) {
                            childitem += '<p>' + res[i].carCheckItems[j].cname + '</p>';
                            childstatus += '<p class="rowradio"><input type="radio" checked="" class="statusy my_radio" value="Y" name="statuschild' + i + j + '">是' +
                                '&nbsp;&nbsp;&nbsp;<input type="radio" checked="" class="statusno my_radio" value="N" name="statuschild' + i + j + '">否' +
                                '&nbsp;&nbsp;&nbsp;<input type="radio" checked="" class="my_radio" value="NA" name="statuschild' + i + j + '">NA</p>';
                            childexplain += '<p><input type="text" class="item' + j + 'explain explain_input" value="" name="explainchild' + i + j + '"></p>';
                        }
                        checkboxs += '<div class="checkitem"><span class="itemlist1">' +
                            '<span class="itemlist_head head' + i + '">' + res[i].pname + '</span>' +
                            '<span class="item_child itemlist1_child' + i + '">' + childitem + '</span>' +
                            '</span><span class="itemlist2">' + childstatus + '</span>' +
                            '<span class="itemlist3">' + childexplain + '</span></div>';
                    }
                }
            }
            // console.log(checkboxs);
            $(boxname).html(checkboxs);
            $(".statusy").prop("checked", true); //默认单选框选中是
            console.log($("#sCheck .item27explain"));
            $("#sCheck .item26explain").val("当前发动机编号为：" + getHashParameter("engineNumber"));
            $("#sCheck .item27explain").val("当前车架号为：" + getHashParameter("vin"));
        }
    });
}
var cylinderArr = ["缸压（Bar）:", "1缸", "2缸", "3缸", "4缸", "燃油压力(Bar)", "实测"];
var cylinderName = ["cylinder", "one", "two", "three", "four", "fuel", "actual"];

// 初始化缸压内容
function initcylinder(box1) {
    var boxs = "";
    for (var j = 0; j < cylinderArr.length; j++) {
        boxs += '<div><label>' + cylinderArr[j] + '</label><input name="' + cylinderName[j] + '_p" type="text" value=""></div>'
    }
    $(box1).html(boxs);
    $("input[name='fuel_p']").val("4.0");
    $("input[name='fuel_p']").attr("readOnly", true);
    $("input[name='cylinder_p']").css("display", "none");
}
// initsafeCheck(".pot_pressure"); //初始化安全检查
function initsafeCheck(box1) {
    addMenu("#sCheck .checkMenus", 1);
    // 缸压
    initcylinder(box1);
    // 初始化检查项目表
    getcnid(1, "#sCheck .check_itembox");
}
//安全检查重置
$(".resetsafe_btn").click(function() {
    myformReset();
});
// 线束检查重置
$(".resetwiring_btn").click(function() {
    myformReset();
});
// bom检查重置
$(".resetbom_btn").click(function() {
    myformReset();
});
// 添加表单序列化为json的方法
$.fn.mychangeform = function() {
    var aaa = this.serialize();
    var serializeArr = aaa.split("&");
    var changeArr = []; //最终传给后台的数组对象
    for (var s = 0; s < serializeArr.length; s = s + 2) {
        var f = {
            "status": "",
            "explanation": ""
        };
        f.status = serializeArr[s].split("=")[1];
        changeArr.push(f);
    }
    console.log(changeArr);
    var explainArr = [];
    // 取出explain的值，存入数组，再将值赋值给changeArr
    for (var ss = 1; ss < serializeArr.length; ss = ss + 2) {
        console.log(serializeArr[ss].split("=")[1]);
        explainArr.push(serializeArr[ss].split("=")[1]);
        for (var e = 0; e < explainArr.length; e++) {
            changeArr[e].explanation = decodeURI(explainArr[e]);
        }
    }
    return changeArr;
};

// 判断单选框是否有空
function isAllChecked(radioLength) {
    for (var i = 0; i < radioLength; i++) {
        var radios = document.getElementsByName('itemstatus' + i);
        var checkedCount = 0;
        for (var j = 0; j < radios.length; j++) {
            if (radios[j].checked) {
                checkedCount++;
            }
        }
        if (!checkedCount) {
            return false;
        }
    }
    return true;
}
// 安全检查提交
$("#sCheck_btn").click(function() {
    // 单选框的值不能为空，否则不能提交
    if (isAllChecked(12) == false) {
        alert("有选项未选择");
        return;
    }
    console.log(form2);
    $.ajax({
        type: "get",
        url: "http://192.168.0.106:8080/car-management/car/saveClacyLindersss.action?tcarid=" + getHashParameter("id"),
        "dataType": "jsonp", //数据类型为jsonp  
        "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
        data: $(".pot_pressure").serializeObject(),
        success: function(res) {
            console.log(res);
            if (res.ret == true) {} else {
                $(".carsafe_tips").html("缸压提交失败");
                return;
            }
        }
    });

    var form2 = $(".check_itembox").mychangeform();
    console.log(JSON.stringify(form2));
    $.ajax({
        type: "POST",
        url: "http://192.168.0.106:8080/car-management/car/addSafeCheck/" + getHashParameter("id") + ".action?",
        dataType: "json",
        contentType: 'application/json;charset=UTF-8', //contentType很重要 
        crossDomain: true,
        data: JSON.stringify(form2),
        success: function(data) {
            console.log(data);
            if (data.ret == true) {
                $(".carsafe_tips").html("表单提交成功");
                myformReset(); //表单重置
            } else {
                $(".carsafe_tips").html(data.msg);
            }
        },
        error: function(dat) {
            $(".carsafe_tips").html("系统内部错误，请联系程序员小哥哥~");
        }
    });
});

//线束检查初始化 -------------------------------------------------------------------------------------------------------------
//线束检查初始化
function initWiringCheck(box1) {
    addMenu("#wiringCheck .checkMenus", 2);
    // 初始化检查项目表
    getcnid(2, ".wcheck_itembox");
}

// 线束检查提交
$("#wiringCheck_btn").click(function() {
    var item1 = $("#wiringCheck .my_radio:checked");
    var item2 = $("#wiringCheck input[type='text']");
    var sucArr = [];
    for (var i = 0; i < item1.length; i++) {
        var sucobj = {};
        // sucArr.push({ "\"status\"": item1[i].value, "\"explanation\"": item2[i].value })//将不带“”的key转换为带有key值的
        sucArr.push({ "status": item1[i].value, "explanation": item2[i].value })
    }
    console.log(JSON.stringify(sucArr));
    $.ajax({
        type: "POST",
        url: "http://192.168.0.106:8080/car-management/car/addHiCheck/" + getHashParameter("id") + ".action?",
        dataType: "json",
        data: JSON.stringify(sucArr),
        async: false,
        contentType: 'application/json;charset=UTF-8', //contentType很重要 
        crossDomain: true,
        success: function(data) {
            console.log(data);
            if (data.ret == true) {
                $(".wiring_tips").html("表单提交成功");
                $("#wiringCheck input[type='text']").val("");
            } else {
                $(".carsafe_tips").html(data.msg);
            }
        },
        error: function(dat) {
            $(".wiring_tips").html("系统内部错误，请联系程序员小哥哥~");
        }
    });
});
//bom检查初始化 -------------------------------------------------------------------------------------------------------------
function initBomCheck(box1) {
    addMenu("#bomCheck .checkMenus", 3);
    // 初始化检查项目表
    getcnid(3, ".bomcheck_itembox");
}
// bom检查提交
$("#bomCheck_btn").click(function() {
    // 单选框的值不能为空，否则不能提交
    if (isAllChecked(11) == false) {
        alert("有选项未选择");
        return;
    }
    var item1 = $("#bomCheck .bom_name");
    var item2 = $("#bomCheck .bom_num");
    var item3 = $("#bomCheck .my_radio:checked");
    var item4 = $("#bomCheck .explain_input");
    console.log(item1);
    console.log(item2);
    console.log(item3);
    console.log(item4);
    var bomobjArrs = [];
    for (var i = 0; i < item1.length; i++) {
        var bomobj = {};
        bomobjArrs.push({ "bomName": item1[i].value, "partName": item2[i].value, "status": item3[i].value, "explanation": item4[i].value })
    }
    console.log(bomobjArrs);
    console.log(JSON.stringify(bomobjArrs));
    // var form4 = $(".bomcheck_itembox").mychangeform();
    // console.log(JSON.stringify(form4));

    $.ajax({
        type: "POST",
        url: "http://192.168.0.106:8080/car-management/car/addEmsAndBomCheck/" + getHashParameter("id") + ".action?",
        dataType: "json",
        contentType: 'application/json;charset=UTF-8', //contentType很重要 
        crossDomain: true,
        data: JSON.stringify(bomobjArrs),
        success: function(data) {
            if (data.ret == true) {
                $(".carbom_tips").html("表单提交成功");
                $("#bomcheck_itembox input[type='text']").val("");
            } else {
                $(".carbom_tips").html("表单提交失败");
            }
        },
        error: function(dat) {
            $(".carbom_tips").html("系统内部错误，请联系程序员~");
        }
    });
});

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
    requestTypein(".returncarcheck_tips", "http://192.168.0.106:8080/car-management/car/backCheck.action", returncarCheckdata, "", "");
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
            $("#returncarCheck #time").val(res.time);
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
        "isallow": $("input[name='isallow']:checked").val(), //是否授权
        "allowStartTime": $("#allowStartTime").val(),
        "allowEndTime": $("#allowEndTime").val(),
        "remark": $("#carTypeIn_remake").val()
    }
    var that = this;
    requestTypein(".drivetypein_tips", "http://192.168.0.106:8080/car-management/carDriver/add.action", driverCheckdata, that, "driverList");
});


//part初始化 -------------------------------------------------------------------------------------------------------------
// initPartCheck();//现在不需要部件状态检查这一步了
// function initPartCheck(box1) {
//     addMenu("#partCheck .checkMenus", 4);
//     // 初始化检查项目表
//     getcnid(4, ".partcheck_itembox");
// }
// initPartCheck();
// // 部件检查提交
// $("#partCheck_btn").click(function() {
//     // 单选框的值不能为空，否则不能提交
//     if (isAllChecked() == false) {
//         alert("有选项未选择");
//         return;
//     }
//     var form5 = $(".partcheck_itembox").mychangeform();
//     $.ajax({
//         type: "POST",
//         url: "http://192.168.0.106:8080/car-management/car/addSafeCheck/" + getHashParameter("id") + ".action?",
//         dataType: "json",
//         contentType: 'application/json;charset=UTF-8', //contentType很重要 
//         crossDomain: true, //cors解决post跨域问题，后台要进行相关配置
//         data: JSON.stringify(form5),
//         success: function(data) {
//             console.log(data);
//         }
//     });
// });