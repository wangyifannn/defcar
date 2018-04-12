// 车辆审核相关
// 初始化加载待审核列表
function loadAuditList() {
    var data;
    var url = "http://192.168.0.222:8080/car-management/car/findWaitReviewCar.action";
    $.ajax({
        "url": url,
        "type": "get",
        "data": data,
        "async": false,
        "dataType": "jsonp", //数据类型为jsonp  
        "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
        "success": function(res) {
            console.log(res);
            $('#auditTable').bootstrapTable('destroy');
            initAudit(res, "#toolbar_auditTable");
        },
        "error": function(res) {
            console.log(res);
        }
    });
}

function initAudit(res, toolbarid) {
    console.log(res);
    $("#auditTable").bootstrapTable('destroy');
    $("#auditTable").bootstrapTable({
        data: res,
        toggle: "table",
        toolbar: toolbarid,
        pagination: true,
        sidePagination: "client",
        editable: true,
        columns: [
            [{
                "title": "测试车辆-待审核列表",
                "halign": "center",
                "align": "center",
                "colspan": 7
            }],
            [{
                field: 'index',
                title: "序号",
                valign: "middle",
                align: "center",
                colspan: 1,
                rowspan: 2,
                width: "5%",
                formatter: function(value, row, index) {
                    return index + 1;
                }

            }, {
                field: 'vSn',
                title: "车辆编号",
                valign: "middle",
                align: "center",
                colspan: 1,
                rowspan: 2,
                width: "7%"

            }, {
                title: "车辆安全检查",
                valign: "middle",
                align: "center",
                colspan: 2,
                rowspan: 1,
                width: "30%"

            }, {
                title: "系统状态检测",
                valign: "middle",
                align: "center",
                colspan: 2,
                rowspan: 1,
                width: "30%"

            }, {
                field: 'operate',
                title: '操作',
                valign: "middle",
                align: 'center',
                colspan: 1,
                rowspan: 2,
                width: "15%",
                events: auditoperateEvents,
                formatter: auditFormatter
            }],
            [{
                field: 'safeCheck',
                title: '检查人',
                valign: "middle",
                align: "center",
                width: "7%",
                formatter: function(value, row, index) {
                    if (value == null) {
                        return "";
                    } else {
                        return value.operator
                    }
                }
            }, {
                field: 'safeCheck',
                title: '检查日期',
                valign: "middle",
                align: "center",
                width: "8%",
                //获取日期列的值进行转换
                formatter: function(value, row, index) {
                    if (value == null) {
                        return "";
                    } else {
                        return value.time
                    }
                }
            }, {
                field: 'systemCheck',
                title: '检查人',
                valign: "middle",
                align: "center",
                width: "8%",
                formatter: function(value, row, index) {
                    if (value == null) {
                        return "";
                    } else {
                        return value.operator
                    }
                }
            }, {
                field: 'systemCheck',
                title: '检查日期',
                valign: "middle",
                align: "center",
                width: "8%",
                formatter: function(value, row, index) {
                    // return value.time
                    if (value == null) {
                        return "";
                    } else {
                        return value.time
                    }
                }
            }]
        ]
    })
}


// 页面检查菜单
function addAuditMenu(boxname, num) {
    var res = [{ "id": 0, "name": "临时车辆列表" }, { "id": 1, "name": "待审核车辆列表" }, { "id": 2, "name": "审核失败车辆列表" },
        { "id": 3, "name": "车辆列表" }
    ];
    // console.log(res);
    var Ahref = "";
    var active = "";
    for (var a = 0; a < res.length; a++) {
        if (res[a].id == num) {
            active = "checkitem_active";
        } else {
            active = "";
        }
        Ahref += '<a href="#" data-toggle="tab"><button type="button" class="audititem' + res[a].id + ' ' + active + '">' + res[a].name + '</button></a>';
    }
    // console.log(Ahref);
    $(boxname).html(Ahref);
    $('.audititem0').click(function() {
        $(this).parent().attr("href", "#" + "carList");
        addAuditMenu("#carList .auditMenus", 0);
        $(".carList").addClass("active").siblings().removeClass("active");
        loadCarList();
    });
    $('.audititem1').click(function() {
        $(this).parent().attr("href", "#" + "auditList");
        addAuditMenu("#auditList .auditMenus", 1);
        loadAuditList();
    });
    $('.audititem2').click(function() {
        $(this).parent().attr("href", "#" + "failAuditList");
        addAuditMenu("#failAuditList .auditMenus", 2);
        loadFailAudit();
    });
    $('.audititem3').click(function() {
        $(this).parent().attr("href", "#" + "finishAuditList");
        // addAuditMenu("#finishAuditList .auditMenus", 3);
        loadsucAudit();
    });
}
addAuditMenu("#auditList .auditMenus", 1);
addAuditMenu("#failAuditList .auditMenus", 2);

function auditFormatter(value, row, index) {
    return [
        '<button type="button" id="btn_auditlistdel" class="RoleOfA btn btn-default  btn-sm" style="margin-right:15px;">删除</button>',
        '<a href="#" data-toggle="tab"><button type="button" id="audit_info_btn" class="RoleOfB btn btn-default  btn-sm" style="margin-right:15px;">详情</button></a>',
        '<a href="#" data-toggle="tab"><button type="button"  id="ifaudit_btn" class="RoleOfB btn btn-default  btn-sm" style="margin-right:15px;">审核</button></a>'
    ].join('');
}
window.auditoperateEvents = {
    'click #btn_auditlistdel': function(e, value, row, index) {
        $(this).parent().parent().remove();
        $.ajax({
            url: "",
            type: "get",
            success: function(res) {
                if (res.ret == true) {
                    // alert("删除成功");
                }
            }
        })
    },
    'click #ifaudit_btn': function(e, value, row, index) {
        console.log(row);
        window.sessionStorage.ifauditinfo = JSON.stringify(row);
        $(".audit_tips").html("");
        $('#audit_model').modal();
    },
    'click #audit_info_btn': function(e, value, row, index) { //进入详情页面查看审核车辆的车辆详情
        console.log(row);
        // $(".maintainform").show();
        // window.location.hash = "pagenum=" + getHashParameter("pagenum") + "&id=" + row.id + "&vSn=" + row.vSn; //车辆数据库编号
        // $("#maintainPeopleTypeIn #vSn").val(row.vSn);
        // $("#maintainPeopleTypeIn #vSn").attr("readOnly", true);
    }
};
$("#ok_audit").click(function() {
    // 判断审核选则是否通过，通过和不通过接口不同
    var auditData = JSON.parse(window.sessionStorage.ifauditinfo);
    auditData.remark = $("#audit_remake").val();
    auditData = JSON.stringify(auditData);
    if ($(":radio[name='ifauditsucess']:checked").val() == 1) {
        AuditAjax("/car/passReview.action", auditData, ".audit_tips");
    } else {
        AuditAjax("/car/notPassReview.action", auditData, ".audit_tips");
    }
    $(this).attr({ "data-dismiss": "modal", "aria-label": "Close" });
})

function AuditAjax(url, data, name) {
    $.ajax({
        url: "http://192.168.0.222:8080/car-management" + url,
        data: data,
        type: "post",
        contentType: 'application/json;charset=UTF-8', //contentType很重要 
        crossDomain: true,
        success: function(res) {
            console.log(res);
            $(name).html(res.msg);
            if (res.ret == true) {
                loadAuditList();
            }
        }
    })
}

// 待审核车辆列表------------------------------------------------------------
// function waitAuditFormatter(value, row, index) {
//     return [
//         '<button type="button" id="btn_auditdel" class="RoleOfA btn btn-default  btn-sm" style="margin-right:15px;">删除</button>',
//         '<a href="#" data-toggle="tab"><button type="button" id="audit_info_btn" class="RoleOfB btn btn-default  btn-sm" style="margin-right:15px;">详情</button></a>',
//         '<a href="#" data-toggle="tab"><button type="button" id="ifaudit_btn" class="RoleOfB btn btn-default  btn-sm" style="margin-right:15px;">审核</button></a>'
//         // '<a href="#' + hrefString + '" data-toggle="tab"><button type="button" id="btn_' + hrefString + '" class="RoleOfB btn btn-default  btn-sm" style="margin-right:15px;">' + row.check_s + '</button></a>',
//     ].join('');
// }
// window.waitAuditoperateEvents = {
//     'click #btn_auditdel': function(e, value, row, index) {
//         $(this).parent().parent().remove();
//     },
//     'click #ifaudit_btn': function(e, value, row, index) {
//         // $(".maintainform").show();
//         // window.location.hash = "pagenum=" + getHashParameter("pagenum") + "&id=" + row.id + "&vSn=" + row.vSn; //车辆数据库编号
//         // $("#maintainPeopleTypeIn #vSn").val(row.vSn);
//         // $("#maintainPeopleTypeIn #vSn").attr("readOnly", true);
//     },
//     'click #audit_info_btn': function(e, value, row, index) {
//         // $(".maintainform").show();
//         // window.location.hash = "pagenum=" + getHashParameter("pagenum") + "&id=" + row.id + "&vSn=" + row.vSn; //车辆数据库编号
//         // $("#maintainPeopleTypeIn #vSn").val(row.vSn);
//         // $("#maintainPeopleTypeIn #vSn").attr("readOnly", true);
//     }
// };
// 审核成功列表
function loadsucAudit(params) {
    $.ajax({
        "url": "http://192.168.0.222:8080/car-management/car/findPassReview.action",
        "type": "get",
        "data": {},
        "success": function(res) {
            console.log(res);
            $('#finishAuditTable').bootstrapTable('destroy');
            createAuditTable("#finishAuditTable", "#toolbar_finishAuditTable", res,
                "id", "vSn", "safeCheck", "systemCheck", "reviewer", "reviewer", "reviewer", true, true,
                "序号", "车辆编号", "安全检查人", "系统检查人", "审核人", "审核日期", "审核说明",
                true, finishAuditOperateEvents, finishAuditOperateFormatter, "client")
        },
        "error": function(res) {
            console.log(res);
        }
    });
}


// 审核失败列表
function loadFailAudit(params) {
    $.ajax({
        "url": "http://192.168.0.222:8080/car-management/car/findNotPassReview.action",
        "type": "get",
        "data": {},
        "success": function(res) {
            console.log(res);
            $('#failAuditTable').bootstrapTable('destroy');
            createTable("#failAuditTable", "#toolbar_failAuditTable", res,
                "vSn", "product_sn", "vin", "reason", "operator", "makeTime", true, true,
                "车辆编号", "项目号", "车辆识别码", "未通过原因", "审核人", "审核日期",
                true, failAuditOperateEvents, failAuditOperateFormatter, "client")
        },
        "error": function(res) {
            console.log(res);
        }
    });
}

function finishAuditOperateFormatter(value, row, index) {
    return [
        '<button type="button" id="btn_finauditdel" class="RoleOfA btn btn-default  btn-sm" style="margin-right:15px;">删除</button>',
        '<a href="#" data-toggle="tab"><button type="button" id="finaudit_info_btn" class="RoleOfB btn btn-default  btn-sm" style="margin-right:15px;">详情</button></a>',
        '<a href="#" data-toggle="tab"><button type="button" id="finaudit_tools_btn" class="RoleOfB btn btn-default  btn-sm" style="margin-right:15px;">研发工具记录</button></a>',
        '<a href="#" data-toggle="tab"><button type="button" id="finaudit_returncar_btn" class="RoleOfB btn btn-default  btn-sm" style="margin-right:15px;">还车点检</button></a>'
    ].join('');
}
window.finishAuditOperateEvents = {
    'click #btn_finauditdel': function(e, value, row, index) {
        $(this).parent().parent().remove();
    },
    'click #finaudit_tools_btn': function(e, value, row, index) {},
    'click #finaudit_info_btn': function(e, value, row, index) {
        // 查看车辆详情
        // $(".maintainform").show();
        // window.location.hash = "pagenum=" + getHashParameter("pagenum") + "&id=" + row.id + "&vSn=" + row.vSn; //车辆数据库编号
        // $("#maintainPeopleTypeIn #vSn").val(row.vSn);
        // $("#maintainPeopleTypeIn #vSn").attr("readOnly", true);
    },
    'click #finaudit_returncar_btn': function(e, value, row, index) {
        // window.location.hash = "pagenum=" + getHashParameter("pagenum") + "&id=" + row.id + "&vSn=" + row.vSn; //车辆数据库编号
        // $("#maintainPeopleTypeIn #vSn").val(row.vSn);
        // $("#maintainPeopleTypeIn #vSn").attr("readOnly", true);
    }
};

function failAuditOperateFormatter(value, row, index) {
    return [
        '<button type="button" id="btn_failauditdel" class="RoleOfA btn btn-default  btn-sm" style="margin-right:15px;">删除</button>',
        '<a href="#" data-toggle="tab"><button type="button" id="failaudit_edit" class="RoleOfB btn btn-default  btn-sm" style="margin-right:15px;">编辑</button></a>'
    ].join('');
}
window.failAuditOperateEvents = {
    'click #btn_failauditdel': function(e, value, row, index) {
        $(this).parent().parent().remove();
    },
    'click #failaudit_edit': function(e, value, row, index) {
        // $(".maintainform").show();
        // window.location.hash = "pagenum=" + getHashParameter("pagenum") + "&id=" + row.id + "&vSn=" + row.vSn; //车辆数据库编号
        // $("#maintainPeopleTypeIn #vSn").val(row.vSn);
        // $("#maintainPeopleTypeIn #vSn").attr("readOnly", true);
    }
};