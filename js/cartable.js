// 车辆列表
var pageNum = 1;
//车辆管理模块： 车辆列表

function loadCarList(pageNum, size, gid) {
    var data;
    var url;
    if (pageNum == "" || size == "") {
        data = {
            "gid": gid
        }
        url = "http://192.168.0.222:8080/car-management/car/CarListByGroup.action";
    } else {
        data = {
            "page": pageNum,
            "size": size
        }
        url = "http://192.168.0.222:8080/car-management/car/pageQuery.action";
    }

    console.log(url);
    console.log(data);

    $.ajax({
        "url": url,
        "type": "get",
        "data": data,
        "async": false,
        "dataType": "jsonp", //数据类型为jsonp  
        "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
        "success": function(res) {
            window.location.hash = "pagenum=" + pageNum;
            console.log(res);
            var ress;
            if (res.rows) {
                ress = res.rows;
            } else {
                ress = res;
            }
            $('#carListtable').bootstrapTable('destroy');
            createcarTable("#carListtable", "carListtable_toolbar", ress,
                "vSn", "vCarSn", "gpsSN", "carName", "status", "makeTime", false, true,
                "车辆编号", "车牌号", "GPS编号", "车辆名称", "授权状态", "创建日期",
                true, caroperateEvents, caroperateFormatter, "",
                "cGroup", "所属分组", "check_s", "检查进度", "product_sn", "项目号");
            var maxPage = Math.ceil(res.total / data.size);
            // var maxPage = 9;
            console.log(res.total);
            console.log(data.size);
            console.log(Math.ceil(res.total / data.size));
            console.log(maxPage);
            if (maxPage >= 9) {
                clickPagings(maxPage);
            } else {
                clickPaging(maxPage, pageNum - 1);
            }
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
    if (row.check_s == 0 || row.check_s == "" || row.check_s == null) {
        row.check_s = "新车点检";
        hrefString = "carCheck";
    } else if (row.check_s == 1) {
        row.check_s = "安全检查";
        hrefString = "sCheck";
    } else if (row.check_s == 2) {
        row.check_s = "线束检查";
        hrefString = "car_wiringCheck";
    } else if (row.check_s == 3) {
        row.check_s = "BOM检查";
        hrefString = "car_bomCheck";
    } else if (row.check_s == 4) {
        row.check_s = "还车点检";
        hrefString = "returncarCheck";
    } else {
        row.check_s = "检查完毕";
    }
    return [
        '<button type="button" id="btn_cardel" class="RoleOfA btn btn-default  btn-sm" style="margin-right:15px;">删除</button>',
        '<a href="#carDetail" data-toggle="tab"><button type="button" id="btn_cardetail" class="RoleOfB btn btn-default  btn-sm" style="margin-right:15px;">详情</button></a>',
        '<a href="#' + hrefString + '" data-toggle="tab"><button type="button" id="' + hrefString + '" class="RoleOfB btn btn-default  btn-sm" style="margin-right:15px;">' + row.check_s + '</button></a>',
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
                    var indexs = parseInt(index / 10);
                    // console.log(indexs);
                    // console.log(indexs + 1);
                    loadCarList(indexs + 1, 10, "");
                }
            },
            "error": function(res) {
                console.log(res);
            }
        })
    },
    'click #btn_cardetail': function(e, value, row, index) {
        findCarList(row.vSn, ".carDetailForm");
    },
    'click #carCheck': function(e, value, row, index) {
        $("#carCheck #vSn").val(row.vSn); //车辆编号
        $("#carCheck #vin").val(row.vin); //车架号
        $("#returncarCheck #vSn").val(row.vSn); //车辆编号
        $("#carCheck input").attr("readOnly", false);
        window.location.hash = "pagenum=" + getHashParameter("pagenum") + "&id=" + row.id + "&vSn=" + row.vSn + "&vin=" + row.vin + "&engineNumber=" + row.engineNumber; //车辆数据库编号
    },
    'click #sCheck': function(e, value, row, index) {
        console.log($('a[href="#sCheck"]'));
        // $("#carCheck #vSn").val(row.vSn); //车辆编号
        // $("#carCheck #vin").val(row.vin); //车架号
        // $("#returncarCheck #vSn").val(row.vSn); //车辆编号
        window.location.hash = "pagenum=" + getHashParameter("pagenum") + "&id=" + row.id + "&vSn=" + row.vSn + "&vin=" + row.vin + "&engineNumber=" + row.engineNumber; //车辆数据库编号
    },
    'click #returncarCheck': function(e, value, row, index) {
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
            console.log($(this).val());
            console.log($(this).parent().attr("href", "#" + $(this).val()));
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
function findGroupList(appendbox, url) {
    $.ajax({
        "url": url,
        "type": "get",
        "data": {},
        "dataType": "jsonp", //数据类型为jsonp  
        "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数
        "success": function(res) {
            console.log(res);
            var groupOption = "";

            for (var r = 0; r < res.length; r++) {
                groupOption += '<option value="' + res[r].id + '">' + res[r].name + '</option>';
            }
            console.log(groupOption);
            // $("#carListtable select.group-mdoel_select").html(groupOption);
            var groupBox = '<span>分组查询：</span><select class="form-control group-mdoel_select">' + groupOption + '</select><button class="groupsearch_btn">查询</button>';
            console.log(groupBox);
            $(appendbox).html(groupBox);
            $(".groupsearch_btn").click(function() {
                console.log(this);
                console.log($(".group-mdoel_select").val());
                $('#carListtable').bootstrapTable('destroy');
                loadCarList("", "", $(".group-mdoel_select").val());
            })
        },
        "error": function(res) {
            console.log(res);
        }
    })
}
findGroupList(".groupbox", "http://192.168.0.222:8080/car-management/group/find.action");

// 分页——————————————————————————————————————————————————————————————————————————————————————————————
function clickPagings(maxPage) {
    var lis = "";
    for (var p = 1; p < 8; p++) {
        lis += "<li>" + p + "</li>";
    }
    $(".pageNav ul").html(lis);
    //根据不同情况有不同的7小格的序号编排（看笔记）：
    if (pageNum >= 1 && pageNum <= 3) {
        // 	 			console.log($("pageNav li"))
        $(".pageNav li").eq(0).html("1");
        $(".pageNav li").eq(1).html("2");
        $(".pageNav li").eq(2).html("3");
        $(".pageNav li").eq(3).html("4");
        $(".pageNav li").eq(4).html("…");
        $(".pageNav li").eq(5).html(maxPage - 1);
        $(".pageNav li").eq(6).html(maxPage);
        //cur
        $(".pageNav li").eq(pageNum - 1).addClass("cur").siblings().removeClass("cur");
    } else if (pageNum <= maxPage && pageNum >= maxPage - 2) {
        $(".pageNav li").eq(0).html("1");
        $(".pageNav li").eq(1).html("2");
        $(".pageNav li").eq(2).html("…");
        $(".pageNav li").eq(3).html(maxPage - 3);
        $(".pageNav li").eq(4).html(maxPage - 2);
        $(".pageNav li").eq(5).html(maxPage - 1);
        $(".pageNav li").eq(6).html(maxPage);
        //cur
        $(".pageNav li").eq(pageNum - maxPage - 1).addClass("cur").siblings().removeClass("cur");
    } else {
        $(".pageNav li").eq(0).html("1");
        $(".pageNav li").eq(1).html("…");
        $(".pageNav li").eq(2).html(pageNum - 1);
        $(".pageNav li").eq(3).html(pageNum);
        $(".pageNav li").eq(4).html(pageNum + 1);
        $(".pageNav li").eq(5).html("…");
        $(".pageNav li").eq(6).html(maxPage);
        //cur
        $(".pageNav li").eq(3).addClass("cur").siblings().removeClass("cur");
    }
    $(".pageNav li").click(function(event) {
        if ($(this).html() == "…") {
            return;
        }
        //改变信号量
        pageNum = parseInt($(this).html());
        //调用ajax，切换分页按钮样式
        // console.log(pageNum);
        loadCarList(pageNum, 10, "");
        dclickPagings(maxPage);
        //更新URL的hash
        window.location.hash = "pagenum=" + pageNum;

    });
}


function clickPaging(maxPage, i) {
    $(".pageNav ul").html("");
    var lis = "";
    for (var p = 1; p < maxPage + 1; p++) {
        console.log(maxPage + 1);
        console.log(p);
        lis += "<li>" + p + "</li>";
    }
    console.log(lis);
    $(".pageNav ul").html(lis);
    $(".pageNav li").eq(i).addClass("cur").siblings().removeClass("cur");
    // 点击时间
    $(".pageNav li").click(function(event) {
        //改变信号量
        pageNum = parseInt($(this).html());
        //调用ajax，切换分页按钮
        loadCarList(pageNum, 10, "");
        clickPaging(maxPage, pageNum);
        //更新URL的hash
        window.location.hash = "pagenum=" + pageNum;
    });
}
var carinfoArr = ["序号", "项目号", "项目名称", "车辆名称", "车牌号", "车辆编号", "车辆类型", "客户", "项目工程师", "联系电话",
    "发动机型号", "发动机号", "发动机排量", "燃油规格", "轮胎规格", "后轮胎压力", "前轮胎压力", "车辆整备质量", "加载方式", "加载数据",
    "车辆识别码", "填写人", "制作日期", "车辆行驶总时间", "经度", "维度", "行驶状态", "电瓶电压", "gps编号", " ic卡",
    "允许行驶开始时间", "允许行驶结束时间", "是否允许", "开始时间", "结束时间", "行驶速度", "当前检查项目", "警告", "所属分组", "车辆位置",
    "", "", "燃油规格", "变速箱邮箱规格式"
];

function findCarList(carid, carDetailForm) {
    $.ajax({
        "url": "http://192.168.0.222:8080/car-management/car/carData.action",
        "type": "get",
        "dataType": "jsonp", //数据类型为jsonp  
        "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
        "data": {
            "vSn": carid
        },
        "success": function(res) {
            console.log(res);
            var formgroup = "";
            if (res == null || res == "" || res == undefined) {
                $(carDetailForm).html("未搜索到相关车辆信息，请确认输入的车辆编号无误！");
                return;
            }
            var obj = res[0];
            // console.log(obj);
            for (var k in obj) {
                //遍历对象，k即为key，obj[k]为当前k对应的值
                // console.log(k);
                // console.log(obj[k]);
                if (k == "dAllowEndTm" || k == "dAllowStartTm" || k == "fromtime" || k == "lastTime" || k == "makeTime") {
                    obj[k] = changeDateFormat(obj[k]);
                }
                if (k == "cGroup") {
                    console.log(obj[k]);
                }
                formgroup += '<div class="form-group">' +
                    '<label for="inputEmail3" class="col-sm-5 control-label infolabel">' + k + '</label>' +
                    '<div class="col-sm-7">' +
                    '<input readonly="readonly" class="form-control" value="' + obj[k] + '" >' +
                    '</div></div>';
            }
            $(carDetailForm).html(formgroup);
            var infos = document.getElementsByClassName("infolabel");
            for (var n = 0; n < carinfoArr.length; n++) {
                if (carinfoArr[n] != "") {
                    infos[n].innerText = carinfoArr[n];
                }
            }
        }
    })
}


$("#detail_search_btn").click(function() {
    if ($(".detail_input").val() == "") {
        alert("请输入车辆编号");
        return;
    }
    findCarList($(".detail_input").val(), ".carDetailForm");
});
$(".detail_returncarlist").click(function() {

})