// 车辆列表
// var pageNum = 1;
//车辆管理模块： 车辆列表

function loadCarList(condition) {
    if (condition != "") {
        url = "http://192.168.0.222:8080/car-management/car/CarListByGroup.action";
    }
    $.ajax({
        "url": "http://192.168.0.222:8080/car-management/tempcar/query.action",
        "type": "get",
        "data": {},
        "async": false,
        "dataType": "jsonp", //数据类型为jsonp  
        "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
        "success": function(res) {
            console.log(res);
            $('#carListtable').bootstrapTable('destroy');
            createcarTable("#carListtable", "carListtable_toolbar", res,
                "index", "vSn", "vCarSn", "carName", "engineNumber", "makeTime", true, true,
                "序号", "车辆编号", "车牌号", "车辆名称", "发动机编号", "创建日期",
                true, caroperateEvents, caroperateFormatter, "client",
                "cGroup", "所属分组", "status", "检查进度", "product_sn", "项目号");
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
    var hrefString = "";
    // console.log(row.check_s);
    if (row.status == 0 || row.status == "" || row.status == null) {
        row.check_s = "新车点检";
        hrefString = "carCheck";
    } else if (row.status == 1) {
        row.check_s = "安全检查";
        hrefString = "sCheck";
    } else if (row.status == 2) {
        row.check_s = "线束检查";
        hrefString = "car_wiringCheck";
    } else if (row.status == 3) {
        row.check_s = "BOM检查";
        hrefString = "car_bomCheck";
    } else if (row.status == 4) {
        row.check_s = "审核";
        // hrefString = "";
    } else {
        row.check_s = "检查完毕";
    }
    return [
        '<button type="button" id="btn_cardel" class="RoleOfA btn btn-default  btn-sm" style="margin-right:15px;">删除</button>',
        '<a href="#carDetail" data-toggle="tab"><button type="button" id="btn_cardetail" class="RoleOfB btn btn-default  btn-sm" style="margin-right:15px;">详情</button></a>',
        '<a href="#' + hrefString + '" data-toggle="tab"><button type="button" id="btn_' + hrefString + '" class="RoleOfB btn btn-default  btn-sm" style="margin-right:15px;">' + row.check_s + '</button></a>',
        '<a href="#" data-toggle="tab"><select class="caroptrator">' +
        '<option value="">其他</option>' +
        '<option value="carCheck">接车点检</option>' +
        '<option value="sCheck">安全检查</option>' +
        '<option value="harnessCheck">线束检查</option>' +
        '<option value="bomCheck">BOM检查</option>' +
        '<option value="returncarCheck">还车点检</option>' +
        '</select></a>'
    ].join('');
}

window.caroperateEvents = {
    'click #btn_cardel': function(e, value, row, index) {
        // console.log(row);
        $(this).parent().parent().remove();
        // 删除用户操作
        $.ajax({
            "url": "http://192.168.0.222:8080/car-management/car/delete.action",
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
                    loadCarList();
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
        // FindCheckinfo(getHashParameter("id"), "http://192.168.0.222:8080/car-management/car/findUpcheck.action", "#carCheckForm");
        // FindSafeinfo("http://192.168.0.222:8080/car-management/car/findSafeCheckByCar/" + getHashParameter("id") + ".action", "#sCheckForm");
        // findHiCheckByCar("http://192.168.0.222:8080/car-management/car/findHiCheckByCar/" + getHashParameter("id") + ".action", "#wiringCheckForm");
        // FindSafeinfo("http://192.168.0.222:8080/car-management/car/findEmsAndBomCheckByCar/" + getHashParameter("id") + ".action", "#bomCheckForm");
    },
    'click #btn_carCheck': function(e, value, row, index) {
        $("#carCheck #vSn").val(row.vSn); //车辆编号
        $("#carCheck #vin").val(row.vin); //车架号
        $("#returncarCheck #vSn").val(row.vSn); //车辆编号
        $("#carCheck input").attr("readOnly", false);
        window.location.hash = "pagenum=" + getHashParameter("pagenum") + "&id=" + row.id + "&vSn=" + row.vSn + "&vin=" + row.vin + "&engineNumber=" + row.engineNumber; //车辆数据库编号
    },
    'click #btn_sCheck': function(e, value, row, index) {
        // console.log($('a[href="#sCheck"]'));

        // $("#carCheck #vSn").val(row.vSn); //车辆编号
        // $("#carCheck #vin").val(row.vin); //车架号
        // $("#returncarCheck #vSn").val(row.vSn); //车辆编号
        window.location.hash = "pagenum=" + getHashParameter("pagenum") + "&id=" + row.id + "&vSn=" + row.vSn + "&vin=" + row.vin + "&engineNumber=" + row.engineNumber; //车辆数据库编号
        initsafeCheck(".pot_pressure");
    },
    'click #btn_returncarCheck': function(e, value, row, index) {
        $("#returncarCheck #vSn").val(row.vSn); //车辆编号
        window.location.hash = "pagenum=" + getHashParameter("pagenum") + "&id=" + row.id + "&vSn=" + row.vSn + "&vin=" + row.vin + "&engineNumber=" + row.engineNumber; //车辆数据库编号
        // console.log(this.parentNode.parentNode.children[0].children[0].getAttribute("checked"));
        // console.log(row);
    },
    'change .caroptrator': function(e, value, row, index) {
        console.log(value);
        if ($(this).val() == "returncarCheck") {
            $("#returncarCheck #vSn").val(row.vSn); //发动机编号
            window.location.hash = "pagenum=" + getHashParameter("pagenum") +
                "&id=" + row.id + "&vSn=" + row.vSn + "&vin=" + row.vin + "&engineNumber=" + row.engineNumber; //车辆数据库编号
            FindreturnCheckinfo(row.id, "http://192.168.0.222:8080/car-management/car/findBackcheck.action");
            $(this).parent().attr("href", "#" + $(this).val());
        } else {
            // console.log($(this).val());
            // console.log($(this).parent().attr("href", "#" + $(this).val()));
            $("#carCheck #vSn").val(row.vSn); //车辆编号
            $("#carCheck #vin").val(row.vin); //车架号
            $("#carCheck #engineNumber").val(row.engineNumber); //发动机编号
            window.location.hash = "pagenum=" + getHashParameter("pagenum") +
                "&id=" + row.id + "&vSn=" + row.vSn + "&vin=" + row.vin + "&engineNumber=" + row.engineNumber; //车辆数据库编号
            FindCheckinfo(row.id, "http://192.168.0.222:8080/car-management/car/findUpcheck.action");
            $(this).parent().attr("href", "#" + $(this).val());
        }

    }
};
// 车辆分组列表
function findGroupList(appendbox, url, limitinfo) {
    $.ajax({
        "url": url,
        "type": "get",
        "data": {},
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

            for (var r = 0; r < res.length; r++) {
                groupOption += '<option value="' + res[r].id + '">' + res[r].name + '</option>';
            }
            // console.log(groupOption);
            var groupBox = '<span class="car_group_name">分组：</span><select class="form-control group-mdoel_select">' + groupOption + '</select>';
            // console.log(groupBox);
            $(appendbox).html($(appendbox).html() + groupBox);

            $(".groupsearch_btn").click(function() {
                // console.log(this);
                // console.log($(".group-mdoel_select").val());
                $('#carListtable').bootstrapTable('destroy');
                loadCarList($(".group-mdoel_select").val());
            })
        },
        "error": function(res) {
            console.log(res);
        }
    })
}
// findGroupList(".groupbox", "http://localhost/car/CarMangae0/json/grouplist.json");
findGroupList(".groupbox", "http://192.168.0.222:8080/car-management/group/find.action");
findGroupList(".cartypein_group", "http://192.168.0.222:8080/car-management/group/find.action", "limitinfo");

var statusobj = [{
    value: 1,
    name: "已录入"
}, {
    value: 2,
    name: "已点检"
}, {
    value: 3,
    name: "已安全检查"
}, {
    value: 4,
    name: "已线束检查"
}, {
    value: 5,
    name: "已bom检查"
}, {
    value: 6,
    name: "已还车"
}];
findStatusList(".groupbox", statusobj);

// 加载车辆状态列表
function findStatusList(appendbox, statusobj) {
    var groupOption = "";
    for (var r = 0; r < statusobj.length; r++) {
        groupOption += '<option value="' + statusobj[r].value + '">' + statusobj[r].name + '</option>';
    }
    // console.log(groupOption);
    var groupBox = '<span>状态：</span><select class="form-control status-mdoel_select">' + groupOption + '</select><button class="groupsearch_btn">查询</button>';
    // console.log(groupBox);
    $(appendbox).html($(appendbox).html() + groupBox);
    $(".groupsearch_btn").click(function() {
        console.log($(".group-mdoel_select").val());
        console.log($(".status-mdoel_select").val());
        $('#carListtable').bootstrapTable('destroy');
        loadCarList($(".group-mdoel_select").val());
    })
};

$(".caradd_btn").click(function() {
    $(".carTypeIn").addClass("active").siblings().removeClass("active");
    $(this).attr("href", "#carTypeIn");
})


$("#detail_search_btn").click(function() {
    if ($(".detail_input").val() == "") {
        alert("请输入车辆编号");
        return;
    }
    cartypein_info($(".detail_input").val(), "#carTypeInForm");
});
$(".detail_returncarlist").click(function() {

})