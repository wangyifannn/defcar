// 详情页添加各个表单内容,安全检查、线束、bom等内容在修改页面信息，进行数据回显的函数里面，第一步调用添加了。
var node0 = document.querySelector("#carTypeIn form").cloneNode(true);
document.getElementById("carTypeInForm").appendChild(node0);
var node1 = document.querySelector("#carCheck form").cloneNode(true);
document.getElementById("carCheckForm").appendChild(node1);
$("#carCheckForm button").css("display", "none");
$("#carTypeInForm button").css("display", "none");
$("#carTypeInForm .checkbox").css("display", "none");
$("#carTypeInForm .cartypein_tips").css("display", "none");
// 还车点检
var node2 = document.querySelector("#returncarCheck form").cloneNode(true);
document.getElementById("returncarForm").appendChild(node2);
$("#returncarForm button").css("display", "none");
// 详情页搜索
$("#detail_search_btn").click(function() {
    if ($(".detail_input").val() == "") {
        toastr.warning('请输入车辆编号', '车辆详情', messageOpts);
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
        { "id": 3, "name": "线束检查信息" }, { "id": 4, "name": "BOM检查信息" }, { "id": 5, "name": "保养记录" },
        { "id": 6, "name": "研发工具装备记录" }, { "id": 7, "name": "还车点检信息" }
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
        FindCheckinfo("http://192.168.0.222:8080/car-management/car/findUpcheck.action?vSn=" + getHashParameter("vSn"), "#carCheckForm");
    });
    $('.detailitem2').click(function() {
        $(this).addClass("checkitem_active").siblings().removeClass("checkitem_active");
        $(this).attr("href", "#" + "sCheckForm");
        FindPotinfo("http://192.168.0.222:8080/car-management/car/findCldCheckByCar/" + getHashParameter("vSn") + ".action", "", ".pot_Form"); //缸压信息
        FindSafeinfo("http://192.168.0.222:8080/car-management/car/findSafeCheckByCar/" + getHashParameter("vSn") + ".action", ".safe_Form");
    });
    $('.detailitem3').click(function() {
        $(this).addClass("checkitem_active").siblings().removeClass("checkitem_active");
        $(this).attr("href", "#" + "wiringCheckForm");
        findHiCheckByCar("http://192.168.0.222:8080/car-management/car/findHiCheckByCar/" + getHashParameter("vSn") + ".action", "#wiringCheckForm");
    });
    $('.detailitem4').click(function() {
        $(this).addClass("checkitem_active").siblings().removeClass("checkitem_active");
        $(this).attr("href", "#" + "bomCheckForm");
        Findbominfo("http://192.168.0.222:8080/car-management/car/findEmsAndBomCheckByCar/" + getHashParameter("vSn") + ".action", "#bomCheckForm");
    });
    // 保养记录
    $('.detailitem5').click(function() {
        $(this).addClass("checkitem_active").siblings().removeClass("checkitem_active");
        $(this).attr("href", "#" + "upkeepForm");
        findUpkeep("#upkeepForm", getHashParameter("vSn"));
    });
    // 研发工具装备记录
    $('.detailitem6').click(function() {
        $(this).addClass("checkitem_active").siblings().removeClass("checkitem_active");
        $(this).attr("href", "#" + "toolForm");
        initToolRecord("#toolForm", getHashParameter('vSn'), "detail");
    });
    // 还车点检信息
    $('.detailitem7').click(function() {
        $(this).addClass("checkitem_active").siblings().removeClass("checkitem_active");
        $(this).attr("href", "#" + "returncarForm");
        FindReturnCar("http://192.168.0.222:8080/car-management/car/findbackCheck.action", "#returncarForm");
    });
}
addDetailMenu(".detail_menu", 0, "carTypeInForm", "firstcall");
$(".detail_part input").attr("disabled", true);
// 根据车辆编号，查看车辆录入的信息，信息回显-----------------------------------------------------------------
function cartypein_info(vSn, boxname) {
    $.ajax({
        "url": "http://192.168.0.222:8080/car-management/tempcar/findTempCarByvSn.action",
        "type": "get",
        "data": {
            "vSn": vSn
        },
        "dataType": "jsonp", //数据类型为jsonp  
        "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数
        "success": function(res) {
            console.log(res);
            if (res == null) {
                toastr.warning('未检索到相关车辆信息', '查看车辆基本信息', messageOpts);
                return;
            }
            $(boxname + " .vSn").val(res.vSn);
            $(boxname + " .vin").val(res.vin); //车架号
            $(boxname + " .product_sn").val(res.product_sn);
            $(boxname + " .product_name").val(res.product_name);
            $(boxname + " .engineNumber").val(res.engineNumber);
            $(boxname + " .carName").val(res.carName);
            $(boxname + " .vCarType").val(res.vCarType);
            $(boxname + " .customer").val(res.customer);
            $(boxname + " .projectEngineer").val(res.projectEngineer);
            $(boxname + " .contactNumber").val(res.contactNumber);
            $(boxname + " .engineType").val(res.engineType);
            $(boxname + " .engineCapacity").val(res.engineCapacity);
            $(boxname + " .FuelType").val(res.fuelType);
            $(boxname + " .oilspecification").val(res.oilspecification);
            $(boxname + " .tyresize").val(res.tyresize);
            $(boxname + " .GBTS").val(res.gbts); //变速箱油规格
            $(boxname + " .reaTireP").val(res.reaTireP);
            $(boxname + " .frontTireP").val(res.frontTireP);
            $(boxname + " .vehicleQuality").val(res.vehicleQuality);
            $(boxname + " .loadMethod").val(res.loadMethod);
            $(boxname + " .loadData").val(res.loadData);
            $(boxname + " .operator").val(res.operator); //签字人、操作人
            $(boxname + " .makeTime").val(changeDateFormat(res.makeTime)); //makeTime
            $(boxname + " .remark").val(res.remark); //备注
            if (res.cGroup == null) {
                $("#carTypeIn .gids").val("") //车辆分组
            } else {
                $("#carTypeIn .gids").val(res.cGroup.id) //车辆分组
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
                toastr.warning('未检索到此车的相关信息，请核对车辆编号是否有误', '查看接车点检信息', messageOpts);
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
                toastr.warning('缸压数据为空', '缸压', messageOpts);
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
                $(name + " .explain_input").val("");
                $(name + " .style1_radio").html("表单尚未提交");
                return;
            }
            var item2 = "";
            item2 = $(name + " .explain_input");
            console.log(item2);
            console.log(name);
            for (var i = 0; i < res.length; i++) {
                $(name + " :radio[name='itemstatus" + i + "'][value='" + res[i].status + "']").prop("checked", "checked");
                item2[i].value = res[i].explanation;
            }
        },
        "error": function(res) {
            toastr.warning('发生内部错误，请联系程序员', '查看安全/附件检查信息', messageOpts);
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
            if (res == null || res == "" || res.length == 0) {
                toastr.warning('BOM数据为空', 'BOM检查', messageOpts);
                return;
            }
            $(name + " input").attr("readOnly", true);
            var checkboxs_info = '<div class="checktitle"><span>零部件名称</span><span>零部件号</span><span>状态</span><span>说明（注明问题不能解决的原因）</span></div>';
            for (var i = 0; i < res.length; i++) {
                if (res[i].status == "Y") {
                    res[i].status = "是";
                } else if (res[i].status == "N") {
                    res[i].status = "否";
                }
                if (res[i].bomName !== "") {
                    checkboxs_info += '<div class="checkitem"><span><input type="text" class="bom_name" value="' + res[i].bomName + '">' +
                        '</span><span><input type="text" class="bom_num" value="' + res[i].partName + '">' +
                        '</span><span class="style1_radio">"' + res[i].status + '"' +
                        '</span><span> <input type="text" class="item' + i + 'explain explain_input" value="' + res[i].explanation + '" name="explain' + i + '"></span></div>';
                }
            }
            $(name).html(checkboxs_info);
        },
        "error": function(res) {
            toastr.warning('发生内部错误，请联系程序员', '查看安全/附件检查信息', messageOpts);
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
                $(name + " .rowradio").html("");
                toastr.warning('线束检查数据为空', '线束检查信息', messageOpts);
                return;
            }
            var item1 = $(name + " .rowradio");
            var item2 = $(name + " input[type='text']");
            for (var i = 0; i < res.length; i++) {
                if (res[i].status == "Y") {
                    res[i].status = "是";
                } else if (res[i].status == "N") {
                    res[i].status = "否";
                }
                item1[i].innerHTML = res[i].status;
                item2[i].value = res[i].explanation;
            }
        },
        "error": function(res) {
            console.log(res);
        }
    });
}
// 查看保养记录
function findUpkeep(name, vSn) {
    $.ajax({
        "url": "http://192.168.0.222:8080/car-management/car/maintenance/find.action",
        "type": "get",
        "data": {
            "vSn": vSn
        },
        contentType: 'application/json;charset=UTF-8', //contentType很重要 
        crossDomain: true,
        "success": function(res) {
            console.log(res);
            if (res == null || res.length == 0) {
                toastr.warning('保养记录为空,请先填写', '保养记录', messageOpts);
                return;
            }
            var upkeepInfo = "";
            for (var i = 0; i < res.length; i++) {
                var itemInfo = "";
                for (var j = 0; j < res[i].maintenanceItem.length; j++) {
                    itemInfo += '  <div class="col-sm-12"><span>' +
                        '<input type="checkbox" name="upkeepItem" value="' + res[i].maintenanceItem[j].itemName + '">"' + res[i].maintenanceItem[j].itemName + '"&nbsp;&nbsp;' +
                        '</span>' +
                        '<span class="form-group_text">' +
                        '<label for="">品牌及标号：</label>' +
                        '<input type="text" class="brand_input" value="' + res[i].maintenanceItem[j].brandAndlabel + '">' +
                        '</span>' +
                        '</div>';
                }
                console.log(itemInfo);
                upkeepInfo += '<form class="form-horizontal even_style upkeepFormInfo">' +
                    '<div class="form-group"><label for="inputEmail3" class="col-sm-4 control-label">' + "车辆编号：" + '</label>' +
                    '<div class="col-sm-6"><input type="text" class="form-control col-sm-7 vSn" value="' + getHashParameter("vSn") + '" placeholder="试验车号">' +
                    '</div></div>' +
                    ' <div class="form-group"><label for="inputEmail3" class="col-sm-4 control-label">保养日期：</label>' +
                    '<div class="col-sm-6 car_tools_check">' +
                    '<input class="form-control col-sm-7 layer-date mydata_input upkeepTime" value="' + res[i].maintenanceTime + '">' +
                    '</div></div>' +
                    '<div class="form-group"><label for="inputEmail3" class="col-sm-4 control-label">保养里程：</label>' +
                    '<div class="col-sm-6 car_tools_check">' +
                    '<input class="form-control col-sm-7 layer-date mydata_input upkeepTime" value="' + res[i].maintenanceMileage + '">' +
                    '</div></div>' +
                    ' <div class="form-group"><label for="inputEmail3" class="col-sm-4 control-label">下次保养：</label>' +
                    '<div class="col-sm-6 car_tools_check">' +
                    '<input class="form-control col-sm-7 layer-date mydata_input upkeepTime" value="' + res[i].nextMaintenanceTime + '">' +
                    '</div></div>' +
                    ' <div class="upitem_group"><label for="inputEmail3" class="col-sm-2 control-label">保养项目：</label>' +
                    '<div class="col-sm-9 car_tools_check">' + itemInfo +
                    '</div></div>' +
                    '<div class="form-group operator_group"><label for="inputEmail3" class="col-sm-4 control-label">操作人：</label>' +
                    '<div class="col-sm-6 car_tools_check">' +
                    '<input class="form-control col-sm-7 layer-date mydata_input upkeepTime" value="' + res[i].maintenanceOperator + '">' +
                    '</div></div>' +
                    '</form>';
            }
            console.log(upkeepInfo);
            $(name).html(upkeepInfo);
            $(name + " input").attr("readOnly", true);
        },
        "error": function(res) {
            console.log(res);
        }
    });
}

// 查看还车点检信息
function FindReturnCar(url, name) {
    $.ajax({
        "url": "http://192.168.0.222:8080/car-management/tempcar/findTempreturnCarByvSn.action",
        "type": "get",
        "data": {
            "vSn": vSn
        },
        "dataType": "jsonp", //数据类型为jsonp  
        "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数
        "success": function(res) {
            console.log(res);
            if (res == null) {
                toastr.warning('未检索到相关车辆信息', '查看车辆基本信息', messageOpts);
                return;
            }
            $(boxname + " .vSn").val(res.vSn);
            $(boxname + " .vin").val(res.vin); //车架号
            $(boxname + " .product_sn").val(res.product_sn);
            $(boxname + " .product_name").val(res.product_name);
            $(boxname + " .engineNumber").val(res.engineNumber);
            $(boxname + " .carName").val(res.carName);
            $(boxname + " .vCarType").val(res.vCarType);
            $(boxname + " .customer").val(res.customer);
            $(boxname + " .projectEngineer").val(res.projectEngineer);
            $(boxname + " .contactNumber").val(res.contactNumber);
            $(boxname + " .engineType").val(res.engineType);
            $(boxname + " .engineCapacity").val(res.engineCapacity);
            $(boxname + " .FuelType").val(res.fuelType);
            $(boxname + " .oilspecification").val(res.oilspecification);
            $(boxname + " .tyresize").val(res.tyresize);
            $(boxname + " .GBTS").val(res.gbts); //变速箱油规格
            $(boxname + " .reaTireP").val(res.reaTireP);
            $(boxname + " .frontTireP").val(res.frontTireP);
            $(boxname + " .vehicleQuality").val(res.vehicleQuality);
            $(boxname + " .loadMethod").val(res.loadMethod);
            $(boxname + " .loadData").val(res.loadData);
            $(boxname + " .operator").val(res.operator); //签字人、操作人
            $(boxname + " .makeTime").val(changeDateFormat(res.makeTime)); //makeTime
            $(boxname + " .remark").val(res.remark); //备注
            if (res.cGroup == null) {
                $("#carTypeIn .gids").val("") //车辆分组
            } else {
                $("#carTypeIn .gids").val(res.cGroup.id) //车辆分组
            }
        }
    })
}
// 点击返回车辆列表按钮 vdwq

$(".detail_returncarlist").click(function() {
    addAuditMenu("#carList .auditMenus", 0);
    loadCarList(JSON.stringify({
        "vSn": null
    }));
});