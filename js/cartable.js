// 车辆列表
// var pageNum = 1;
function loadCarList(data) {
    console.log(data);
    $.ajax({
        "url": "http://192.168.0.106:8080/car-management/tempcar/query.action",
        "type": "post",
        "data": data,
        "async": false,
        contentType: 'application/json;charset=UTF-8', //contentType很重要 
        crossDomain: true, //cors解决post跨域问题，后台要进行相关配置
        "success": function(res) {
            console.log(res);
            $('#carListtable').bootstrapTable('destroy');
            createcarTable("#carListtable", "carListtable_toolbar", res,
                "index", "vSn", "vCarSn", "carName", "engineNumber", "makeTime", true, true,
                "序号", "车辆编号", "车牌号", "车辆名称", "发动机编号", "创建日期",
                true, caroperateEvents, caroperateFormatter, "client",
                "cGroup", "所属分组", "status", "检查进度", "product_sn", "项目号");
            // $('#carListtable').bootstrapTable('refreshOptions', { pageNumber: 1 });
        },
        "error": function(res) {
            console.log(res);
        }
    });
}

var $carListtable = $('#carListtable');
$(function() {
    $('#carListtable_toolbar').find('select.import-mdoel_select').change(function() {
        $carListtable.bootstrapTable('destroy').bootstrapTable({
            exportDataType: $(this).val()
        });
    });
    $('#carListtable_toolbar').find('select.group-mdoel_select').change(function() {
        $carListtable.bootstrapTable('destroy');
        console.log($(this).val());
    });
});
// 判断车辆状态，加载车辆按钮，0或null：已录入，1：已点检，2：已安全检查，3：已线束检查，4：已BOM检查，5：还车点检完毕
function caroperateFormatter(value, row, index) {
    window.location.hash = "pagenum=" + getHashParameter("pagenum") + "&id=" + row.id + "&vSn=" + row.vSn + "&vin=" + row.vin + "&engineNumber=" + row.engineNumber; //车辆数据库编号
    var hrefString = "";
    // console.log(row.check_s);
    if (row.status == 0 || row.status == "" || row.status == null) {
        row.check_s = "新车点检";
        hrefString = "carCheck";
    } else if (row.status == 1) {
        row.check_s = "安全检查";
        hrefString = "sCheck";
        // initsafeCheck(".pot_pressure"); //初始化安全检查
    } else if (row.status == 2) {
        row.check_s = "线束检查";
        hrefString = "wiringCheck";
        // initWiringCheck("");
    } else if (row.status == 3) {
        row.check_s = "BOM检查";
        hrefString = "bomCheck";
        // initBomCheck();
    } else if (row.status == 4) {
        row.check_s = "等待审核";
        hrefString = "auditList";
    } else {
        row.check_s = "检查完毕";
    }
    return [
        '<button type="button" id="btn_cardel" class="RoleOfA btn btn-default  btn-sm" style="margin-right:15px;">删除</button>',
        '<a href="#carDetail" data-toggle="tab"><button type="button" id="btn_cardetail" class="RoleOfB btn btn-default  btn-sm" style="margin-right:15px;">详情</button></a>',
        '<a href="#' + hrefString + '" data-toggle="tab"><button type="button" id="btn_' + hrefString + '" class="RoleOfB btn btn-default  btn-sm" style="margin-right:15px;">' + row.check_s + '</button></a>'
    ].join('');
}

window.caroperateEvents = {
    'click #btn_cardel': function(e, value, row, index) {
        $(this).parent().parent().remove();
        // 删除临时车辆操作
        $.ajax({
            "url": "http://192.168.0.106:8080/car-management/tempcar/delete.action",
            "type": "get",
            "data": {
                "cids": row.id
            },
            "dataType": "jsonp", //数据类型为jsonp  
            "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数
            "success": function(res) {
                console.log(res);
                if (res.ret) {
                    // var indexs = parseInt(index / 10);
                    loadCarList(JSON.stringify({
                        "vSn": null
                    }));
                }
            },
            "error": function(res) {
                console.log(res);
            }
        })
    },
    'click #btn_cardetail': function(e, value, row, index) {
        window.location.hash = "pagenum=" + 1 + "&id=" + row.id + "&vSn=" + row.vSn; //车辆数据库编号
        $("#carTypeInForm").addClass("active").siblings().removeClass("active");
        $(".detailitem0").addClass("checkitem_active").siblings().removeClass("checkitem_active");
        cartypein_info(row.vSn, "#carTypeInForm");
    },
    'click #btn_carCheck': function(e, value, row, index) {
        $("#carCheck #vSn").val(row.vSn); //车辆编号
        $("#carCheck #vin").val(row.vin); //车架号
        $("#returncarCheck #vSn").val(row.vSn); //车辆编号
        $("#carCheck input").attr("readOnly", false);
        window.location.hash = "pagenum=" + getHashParameter("pagenum") + "&id=" + row.id + "&vSn=" + row.vSn + "&vin=" + row.vin + "&engineNumber=" + row.engineNumber; //车辆数据库编号
    },
    'click #btn_sCheck': function(e, value, row, index) {
        window.location.hash = "pagenum=" + getHashParameter("pagenum") + "&id=" + row.id + "&vSn=" + row.vSn + "&vin=" + row.vin + "&engineNumber=" + row.engineNumber; //车辆数据库编号
        initsafeCheck(".pot_pressure");
    },
    'click #btn_wiringCheck': function(e, value, row, index) {
        window.location.hash = "pagenum=" + getHashParameter("pagenum") + "&id=" + row.id + "&vSn=" + row.vSn + "&vin=" + row.vin + "&engineNumber=" + row.engineNumber; //车辆数据库编号
        initWiringCheck("");
    },
    'click #btn_bomCheck': function(e, value, row, index) {
        window.location.hash = "pagenum=" + getHashParameter("pagenum") + "&id=" + row.id + "&vSn=" + row.vSn + "&vin=" + row.vin + "&engineNumber=" + row.engineNumber; //车辆数据库编号
        initBomCheck();
    },
    'click #btn_auditList': function(e, value, row, index) {
        loadAuditList();
    },
    'click #btn_returncarCheck': function(e, value, row, index) {
        $("#returncarCheck #vSn").val(row.vSn); //车辆编号
        window.location.hash = "pagenum=" + getHashParameter("pagenum") + "&id=" + row.id + "&vSn=" + row.vSn + "&vin=" + row.vin + "&engineNumber=" + row.engineNumber; //车辆数据库编号
    }

};
// 车辆分组列表
function findGroupList(appendbox, url, limitinfo) {
    $.ajax({
        "url": url,
        "type": "get",
        "data": {},
        "dataType": "jsonp", //数据类型为jsonp  
        "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
        "success": function(res) {
            // console.log(res);
            var cargroupOption = "";
            // 如果只是想要分组的列表，做以下限制
            if (limitinfo == "limitinfo") {
                for (var r = 0; r < res.length; r++) {
                    cargroupOption += '<option value="' + res[r].id + '">' + res[r].name + '组</option>';
                }
                $(appendbox).html(cargroupOption);
                return;
            }
            var groupOption = "";
            groupOption = '<option value="" name="" remark="">全部</option>';

            for (var r = 0; r < res.length; r++) {
                groupOption += '<option value="' + res[r].id + '" name="' + res[r].name + '" remark="' + res[r].remark + '">' + res[r].name + '</option>';
            }
            // console.log(groupOption);
            var groupBox = '<span class="car_group_name">分组：</span><select id="group_opt" class="form-control group-mdoel_select">' + groupOption + '</select>';
            // console.log(groupBox);
            $(appendbox).html($(appendbox).html() + groupBox);

            $(".groupsearch_btn").click(function() {
                $('#carListtable').bootstrapTable('destroy');
                var groupdata = {
                    "vSn": $("#group_carvSn").val(),
                    "status": $(".status-mdoel_select").val(),
                    "carName": "",
                    "cGroup": {
                        "id": $("#group_opt option:selected").attr("value"),
                        "name": $("#group_opt option:selected").attr("name"),
                        "remark": $("#group_opt option:selected").attr("remark")
                    }
                };
                var data = JSON.stringify(groupdata);
                // console.log(data);
                loadCarList(data);
            })
        },
        "error": function(res) {
            console.log(res);
        }
    })
}
// findGroupList(".groupbox", "http://localhost/car/CarMangae0/json/grouplist.json");
findGroupList(".groupbox", "http://192.168.0.106:8080/car-management/group/find.action");
findGroupList(".cartypein_group", "http://192.168.0.106:8080/car-management/group/find.action", "limitinfo");

var statusobj = [{
    value: 0,
    name: "已录入"
}, {
    value: 1,
    name: "已点检"
}, {
    value: 2,
    name: "已安全检查"
}, {
    value: 3,
    name: "已线束检查"
}, {
    value: 4,
    name: "已bom检查"
}, {
    value: 5,
    name: "已审核"
}, {
    value: 6,
    name: "已还车"
}, {
    value: "",
    name: "全部"
}];
findStatusList(".groupbox", statusobj);

// 加载车辆状态列表
function findStatusList(appendbox, statusobj) {
    var groupOption = "";
    for (var r = 0; r < statusobj.length; r++) {
        groupOption += '<option value="' + statusobj[r].value + '">' + statusobj[r].name + '</option>';
    }
    var groupBox = '<span>状态：</span><select class="form-control status-mdoel_select">' + groupOption + '</select><div class="groupsearch_btn">查询</div>';
    $(appendbox).html($(appendbox).html() + groupBox);
};

$(".caradd_btn").click(function() {
    $(".carTypeIn").addClass("active").siblings().removeClass("active");
    window.location.hash = "";
    $(this).attr("href", "#carTypeIn");
})