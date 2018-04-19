// 详情页添加各个表单内容,安全检查、线束、bom等内容在修改页面信息，进行数据回显的函数里面，第一步调用添加了。
var node0 = document.querySelector("#carTypeIn form").cloneNode(true);;
document.getElementById("carTypeInForm").appendChild(node0);
var node1 = document.querySelector("#carCheck form").cloneNode(true);;
document.getElementById("carCheckForm").appendChild(node1);
$("#carCheckForm button").css("display", "none");
$("#carTypeInForm button").css("display", "none");
$("#carTypeInForm .checkbox").css("display", "none");
$("#carTypeInForm .cartypein_tips").css("display", "none");

// 详情页搜索
$("#detail_search_btn").click(function() {
    if ($(".detail_input").val() == "") {
        alert("请输入车辆编号");
        return;
    }
    window.location.hash = "vSn=" + $(".detail_input").val(); //车辆数据库编号
    $("#carTypeInForm").addClass("active").siblings().removeClass("active");
    $(".detailitem0").addClass("checkitem_active").siblings().removeClass("checkitem_active");
    cartypein_info($(".detail_input").val(), "#carTypeInForm");
});
// 页面检查菜单
function addDetailMenu(boxname, num, href, firstcall) {
    if (firstcall == "firstcall") {}
    // 克隆录入表单到详情页面部分
    var res = [{ "id": 0, "name": "车辆录入信息" }, { "id": 1, "name": "接车点检信息" }, { "id": 2, "name": "安全检查信息" },
        { "id": 3, "name": "线束检查信息" }, { "id": 4, "name": "BOM检查信息" }
    ];
    var Ahref = "";
    var active = "";
    for (var a = 0; a < res.length; a++) {
        if (res[a].id == num) {
            active = "checkitem_active"; //当前字体样式标蓝
            href = "carTypeInForm";
        } else {
            active = "";
            href = "";
        }
        Ahref += '<a href="#' + href + '" data-toggle="tab" class="detailitem' + res[a].id + ' ' + active + '">' + res[a].name + '</a>';
    }
    $(boxname).html(Ahref);
    $('a[href="#carTypeInForm"]').tab('show');
    $('.detailitem0').click(function() {
        $(this).addClass("checkitem_active").siblings().removeClass("checkitem_active");
        $(this).attr("href", "#" + "carTypeInForm");
    });
    $('.detailitem1').click(function() {
        $(this).addClass("checkitem_active").siblings().removeClass("checkitem_active");
        $(this).attr("href", "#" + "carCheckForm");
        FindCheckinfo("http://192.168.0.106:8080/car-management/car/findUpcheck.action?vSn=" + getHashParameter("vSn"), "#carCheckForm");
    });
    $('.detailitem2').click(function() {
        $(this).addClass("checkitem_active").siblings().removeClass("checkitem_active");
        $(this).attr("href", "#" + "sCheckForm");
        FindPotinfo("http://192.168.0.106:8080/car-management/car/findCldCheckByCar/" + getHashParameter("vSn") + ".action", "", ".pot_Form"); //缸压信息
        FindSafeinfo("http://192.168.0.106:8080/car-management/car/findSafeCheckByCar/" + getHashParameter("vSn") + ".action", ".safe_Form");
    });
    $('.detailitem3').click(function() {
        $(this).addClass("checkitem_active").siblings().removeClass("checkitem_active");
        $(this).attr("href", "#" + "wiringCheckForm");
        findHiCheckByCar("http://192.168.0.106:8080/car-management/car/findHiCheckByCar/" + getHashParameter("vSn") + ".action", "#wiringCheckForm");
    });
    $('.detailitem4').click(function() {
        $(this).addClass("checkitem_active").siblings().removeClass("checkitem_active");
        $(this).attr("href", "#" + "bomCheckForm");
        Findbominfo("http://192.168.0.106:8080/car-management/car/findEmsAndBomCheckByCar/" + getHashParameter("vSn") + ".action", "#bomCheckForm");
    });
}
addDetailMenu(".detail_menu", 0, "carTypeInForm", "firstcall");
//将详情页面的input全部设置为readonly
$(".detail_part input").attr("disabled", true);
// 根据车辆编号，查看车辆录入的信息，信息回显-----------------------------------------------------------------
function cartypein_info(vSn, boxname) {
    $.ajax({
        "url": "http://192.168.0.106:8080/car-management/tempcar/findTempCarByvSn.action",
        "type": "get",
        "data": {
            "vSn": vSn
        },
        "dataType": "jsonp", //数据类型为jsonp  
        "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数
        "success": function(res) {
            console.log(res);
            if (res == null) {
                alert("未检索到相关车辆信息");
                return;
            }
            $(boxname + " #vSn").val(res.vSn);
            $(boxname + " #vin").val(res.vin); //车架号
            $(boxname + " #product_sn").val(res.product_sn);
            $(boxname + " #product_name").val(res.product_name);
            $(boxname + " #engineNumber").val(res.engineNumber);
            $(boxname + " #carName").val(res.carName);
            $(boxname + " #vCarType").val(res.vCarType);
            $(boxname + " #customer").val(res.customer);
            $(boxname + " #projectEngineer").val(res.projectEngineer);
            $(boxname + " #contactNumber").val(res.contactNumber);
            $(boxname + " #engineType").val(res.engineType);
            $(boxname + " #engineCapacity").val(res.engineCapacity);
            $(boxname + " #FuelType").val(res.fuelType);
            $(boxname + " #oilspecification").val(res.oilspecification);
            $(boxname + " #tyresize").val(res.tyresize);
            $(boxname + " #GBTS").val(res.gbts); //变速箱油规格
            $(boxname + " #reaTireP").val(res.reaTireP);
            $(boxname + " #frontTireP").val(res.frontTireP);
            $(boxname + " #vehicleQuality").val(res.vehicleQuality);
            $(boxname + " #loadMethod").val(res.loadMethod);
            $(boxname + " #loadData").val(res.loadData);
            $(boxname + " #operator").val(res.operator); //签字人、操作人
            $(boxname + " #makeTime").val(changeDateFormat(res.makeTime)); //makeTime
            $(boxname + " #remark").val(res.remark); //备注
            if (res.cGroup == null) {
                $("#carTypeIn #gids").val("") //车辆分组
            } else {
                $("#carTypeIn #gids").val(res.cGroup.id) //车辆分组
            }
        }
    })
}
// 查看车辆点检信息---------------------------------------------------------------------------
function FindCheckinfo(url, boxname) {
    $(boxname + " .carcheck_tips").css("display", "none");
    $.ajax({
        "url": url,
        "type": "get",
        "data": {},
        "async": false,
        "dataType": "jsonp", //数据类型为jsonp  
        "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
        "success": function(res) {
            console.log(res);
            if (res == null || res == undefined) {
                formReset(); //先将form表单信息清空
                $(boxname + " #vSn").val(getHashParameter("vSn"));
                $(boxname + " .carcheck_tips").css("display", "display-block");
                $(boxname + " .carcheck_tips").html("此车可能尚未进行接车点检");
                alert("未检索到此车的相关信息，请核对车辆编号是否有误？");
                return;
            }
            if (res.carfacade == 1) {
                $(".car_image_check:input:first-child").prop("checked", "checked");
            } else {
                $(".car_image_check:input:last-child").prop("checked", "checked");
            }
            $(boxname + " #vSn").val(getHashParameter("vSn"));
            $(boxname + " #vin").val(res.vin);
            $(boxname + " #engineNumber").val(res.engineNumber);
            $(boxname + " #item").val(res.item);
            $(boxname + " #tools").val(res.tools);
            $(boxname + " #sparetyre").val(res.sparetyre);
            $(boxname + " #jack").val(res.jack);
            $(boxname + " #warningboard").val(res.warningboard);
            $(boxname + " #fire").val(res.fire);
            $(boxname + " #keys").val(res.keyy);
            $(boxname + " #ododmeter").val(res.odometer);
            $(boxname + " #pickone").val(res.pickone);
            $(boxname + " input[name='send_iphone']").val(res.telephone);
            $(boxname + " #send_p").val(res.send_p);
            $(boxname + " #vin").val(res.vin);
            $(boxname + " input[name='receivecar']").val(res.time);
        },
        "error": function(res) {
            console.log(res);
        }
    });
}
// 查看缸压信息
function FindPotinfo(url, data, name) {
    initcylinder(name);
    $.ajax({
        "url": url,
        "type": "get",
        "data": data,
        "success": function(res) {
            console.log(res);
            if (res == null) {
                alert("缸压信息为空");
                return;
            }
            if (res.one_p == null) {
                res.one_p == "";
            }
            $(name + " input[name='one_p']").val(res.one_p);
            $(name + " input[name='two_p']").val(res.two_p);
            $(name + " input[name='three_p']").val(res.three_p);
            $(name + " input[name='four_p']").val(res.four_p);
            $(name + " input[name='actual_p']").val(res.actual_p);
        }
    })
}
// 查看安全/附件检查信息
function FindSafeinfo(url, name) {
    $(name).html("");
    if (name == ".safe_Form") {
        getcnid(1, name);
    }
    $.ajax({
        "url": url,
        "type": "get",
        "data": {},
        contentType: 'application/json;charset=UTF-8', //contentType很重要 
        crossDomain: true,
        "success": function(res) {
            console.log(res);
            $(name + " input").attr("readOnly", true);
            if (res.length == 0 || res == null) {
                //先将form表单信息清空
                $(name + " input[type='text']").val("");
                $(name + " .style1_radio").html("表单尚未提交");
                return;
            }
            var item2 = "";
            item2 = $(name + " input[type='text']");
            for (var i = 0; i < res.length; i++) {
                $(name + " :radio[name='itemstatus" + i + "'][value='" + res[i].status + "']").prop("checked", "checked");
                item2[i].value = res[i].explanation;
            }
        },
        "error": function(res) {
            alert("发生内部错误，请联系程序员");
        }
    });
}
// 查看bom信息
function Findbominfo(url, name) {
    $(name).html("");
    $.ajax({
        "url": url,
        "type": "get",
        "data": {},
        contentType: 'application/json;charset=UTF-8', //contentType很重要 
        crossDomain: true,
        "success": function(res) {
            console.log(res);
            $(name + " input").attr("readOnly", true);
            var checkboxs_info = '<div class="checktitle"><span>零部件名称</span><span>零部件号</span><span>状态</span><span>说明（注明问题不能解决的原因）</span></div>';
            for (var i = 0; i < res.length; i++) {
                if (res[i].status == "Y") {
                    res[i].status = "是";
                } else if (res[i].status == "N") {
                    res[i].status = "否";
                }
                checkboxs_info += '<div class="checkitem"><span><input type="text" class="bom_name" value="' + res[i].bomName + '">' +
                    '</span><span><input type="text" class="bom_num" value="' + res[i].partName + '">' +
                    '</span><span class="style1_radio">"' + res[i].status + '"' +
                    '</span><span> <input type="text" class="item' + i + 'explain explain_input" value="' + res[i].explanation + '" name="explain' + i + '"></span></div>';
            }
            // for (var i = 0; i < res.length; i++) {

            // }
            $(name).html(checkboxs_info);
        },
        "error": function(res) {
            alert("发生内部错误，请联系程序员");
        }
    });
}
// 查看线束检查信息
function findHiCheckByCar(url, name) {
    $(name).html("");
    getcnid(2, name);
    $.ajax({
        "url": url,
        "type": "get",
        "data": {},
        contentType: 'application/json;charset=UTF-8', //contentType很重要 
        crossDomain: true,
        "success": function(res) {
            console.log(res);
            $(name + " input").attr("readOnly", true);
            if (res.length == 0 || res == null) {
                $(name + " input[type='text']").val("");
                $(name + " .rowradio").html("表单尚未提交");
                return;
            }
            var item2 = $(name + " input[type='text']");
            var myradio = $(name + " .rowradio");
            for (var i = 0; i < res.length; i++) {
                if (res[i].status == "Y") {
                    res[i].status = "是";
                } else if (res[i].status == "N") {
                    res[i].status = "否";
                }
                myradio[i].innerHTML = res[i].status;
                item2[i].value = res[i].explanation;
            }
        },
        "error": function(res) {
            console.log(res);
        }
    });
}
// ----以下通过车辆编号查询茶凉信息的接口废了---------------------------
// var carinfoArr = ["序号", "项目号", "项目名称", "车辆名称", "车牌号", "车辆编号", "车辆类型", "客户", "项目工程师", "联系电话",
//     "发动机型号", "发动机号", "发动机排量", "燃油规格", "轮胎规格", "后轮胎压力", "前轮胎压力", "车辆整备质量", "加载方式", "加载数据",
//     "车辆识别码", "填写人", "制作日期", "车辆行驶总时间", "经度", "维度", "行驶状态", "电瓶电压", "gps编号", " ic卡",
//     "允许行驶开始时间", "允许行驶结束时间", "是否允许", "开始时间", "结束时间", "行驶速度", "当前检查项目", "警告", "所属分组", "车辆位置",
//     "", "", "燃油规格", "变速箱邮箱规格式"
// ];

// function findCarList(carid, carDetailForm) {
//     $.ajax({
//         "url": "http://192.168.0.106:8080/car-management/car/carData.action",
//         "type": "get",
//         "dataType": "jsonp", //数据类型为jsonp  
//         "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
//         "data": {
//             "vSn": carid
//         },
//         "success": function(res) {
//             console.log(res);
//             var formgroup = "";
//             if (res == null || res == "" || res == undefined) {
//                 $(carDetailForm).html("未搜索到相关车辆信息，请确认输入的车辆编号无误！");
//                 return;
//             }
//             var obj = res[0];
//             // console.log(obj);
//             for (var k in obj) {
//                 //遍历对象，k即为key，obj[k]为当前k对应的值
//                 // console.log(k);
//                 // console.log(obj[k]);
//                 if (k == "dAllowEndTm" || k == "dAllowStartTm" || k == "fromtime" || k == "lastTime" || k == "makeTime") {
//                     obj[k] = changeDateFormat(obj[k]);
//                 }
//                 if (k == "cGroup") {
//                     console.log(obj[k]);
//                 }
//                 formgroup += '<div class="form-group">' +
//                     '<label for="inputEmail3" class="col-sm-5 control-label infolabel">' + k + '</label>' +
//                     '<div class="col-sm-7">' +
//                     '<input readonly="readonly" class="form-control" value="' + obj[k] + '" >' +
//                     '</div></div>';
//             }
//             $(carDetailForm).html(formgroup);
//             var infos = document.getElementsByClassName("infolabel");
//             for (var n = 0; n < carinfoArr.length; n++) {
//                 if (carinfoArr[n] != "") {
//                     infos[n].innerText = carinfoArr[n];
//                 }
//             }
//         }
//     })
// }