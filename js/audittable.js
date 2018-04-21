// 车辆审核相关
// 初始化加载待审核列表
function loadAuditList() {
    var data;
    var url = "http://192.168.0.106:8080/car-management/car/findWaitReviewCar.action";
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
        loadCarList(JSON.stringify({
            "vSn": null
        }));
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
        addAuditMenu("#finishAuditList .auditMenus", 3);
        loadsucAudit();
    });
}
addAuditMenu("#auditList .auditMenus", 1);
addAuditMenu("#failAuditList .auditMenus", 2);

function auditFormatter(value, row, index) {
    return [
        '<button type="button" id="btn_auditlistdel" class="RoleOfA btn btn-default  btn-sm" style="margin-right:15px;">删除</button>',
        '<a href="#carDetail" data-toggle="tab"><button type="button" id="audit_info_btn" class="RoleOfB btn btn-default  btn-sm" style="margin-right:15px;">详情</button></a>',
        '<a href="#" data-toggle="tab"><button type="button"  id="ifaudit_btn" class="RoleOfB btn btn-default  btn-sm" style="margin-right:15px;">审核</button></a>'
    ].join('');
}
// 审核列表数据删除
window.auditoperateEvents = {
    'click #btn_auditlistdel': function(e, value, row, index) {
        $(this).parent().parent().remove();
        $.ajax({
            url: "http://192.168.0.106:8080/car-management/car/deleteReview/" + row.id + ".action",
            type: "get",
            data: {},
            success: function(res) {
                console.log(res);
                if (res.ret == true) {
                    toastr.success('待审核列表数据删除成功', '待审核列表', messageOpts);
                    loadAuditList();
                } else {
                    toastr.warning('待审核列表数据删除失败', '待审核列表', messageOpts);
                }
            },
            "error": function(res) {
                toastr.error('程序内部错误', '待审核列表删除', messageOpts);
            }
        })
    },
    'click #ifaudit_btn': function(e, value, row, index) {
        window.sessionStorage.ifauditinfo = JSON.stringify(row);
        $(".audit_tips").html("");
        $('#audit_model').modal();
    },
    'click #audit_info_btn': function(e, value, row, index) { //进入详情页面查看审核车辆的车辆详情
        window.location.hash = "pagenum=" + index + "&id=" + row.id + "&vSn=" + row.vSn; //车辆数据库编号
        $("#carTypeInForm").addClass("active").siblings().removeClass("active");
        $(".detailitem0").addClass("checkitem_active").siblings().removeClass("checkitem_active");
        cartypein_info(row.vSn, "#carTypeInForm");
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
        url: "http://192.168.0.106:8080/car-management" + url,
        data: data,
        type: "post",
        contentType: 'application/json;charset=UTF-8', //contentType很重要 
        crossDomain: true,
        success: function(res) {
            $(name).html(res.msg);
            if (res.ret == true) {
                toastr.success('车辆审核提交成功', '车辆审核', messageOpts);
                loadAuditList();
            } else {
                toastr.warning('车辆审核提交失败', '车辆审核', messageOpts);
            }
        },
        error: function(res) {
            toastr.error('程序内部错误', '车辆审核', messageOpts);
        }
    })
}
// 审核成功列表
function loadsucAudit(params) {
    $.ajax({
        "url": "http://192.168.0.106:8080/car-management/car/findPassReview.action",
        "type": "get",
        "data": {},
        "success": function(res) {
            console.log(res);
            $('#finishAuditTable').bootstrapTable('destroy');
            createAuditTable("#finishAuditTable", "#toolbar_finishAuditTable", res,
                "index", "vSn", "safeCheck", "systemCheck", "reviewer", "reviewer", "remark", true, true,
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
        "url": "http://192.168.0.106:8080/car-management/car/findNotPassReview.action",
        "type": "get",
        "data": {},
        "success": function(res) {
            console.log(res);
            $('#failAuditTable').bootstrapTable('destroy');
            createAuditTable("#failAuditTable", "#toolbar_failAuditTable", res,
                "index", "vSn", "safeCheck", "systemCheck", "reviewer", "reviewer", "remark", true, true,
                "序号", "车辆编号", "安全检查人", "系统检查人", "审核人", "审核日期", "审核说明",
                true, failAuditOperateEvents, failAuditOperateFormatter, "client")
        },
        "error": function(res) {
            toastr.error('程序内部错误', '审核失败列表', messageOpts);
        }
    });
}

function finishAuditOperateFormatter(value, row, index) {
    return [
        '<button type="button" id="btn_finauditdel" class="RoleOfA btn btn-default  btn-sm" style="margin-right:15px;">删除</button>',
        '<a href="#carDetail" data-toggle="tab"><button type="button" id="finaudit_info_btn" class="RoleOfB btn btn-default  btn-sm" style="margin-right:15px;">详情</button></a>',
        '<a href="#rd_record" data-toggle="tab"><button type="button" id="finaudit_tools_btn" class="RoleOfB btn btn-default  btn-sm" style="margin-right:15px;">研发工具记录</button></a>',
        '<a href="#" data-toggle="tab"><button type="button" id="upkeep_record_btn" class="RoleOfB btn btn-default  btn-sm" style="margin-right:15px;">保养记录</button></a>',
        '<a href="#returncarCheck" data-toggle="tab"><button type="button" id="finaudit_returncar_btn" class="RoleOfB btn btn-default  btn-sm" style="margin-right:15px;">还车点检</button></a>'
    ].join('');
}
window.finishAuditOperateEvents = {
    'click #btn_finauditdel': function(e, value, row, index) {
        $(this).parent().parent().remove();
        $.ajax({
            url: "http://192.168.0.106:8080/car-management/car/deleteReview/" + row.id + ".action",
            type: "get",
            data: {},
            success: function(res) {
                console.log(res);
                if (res.ret == true) {
                    toastr.success('车辆删除成功', '车辆列表', messageOpts);
                    loadsucAudit();
                } else {
                    toastr.warning('车辆删除失败', '车辆列表', messageOpts);
                }
            },
            "error": function(res) {
                toastr.error('程序内部错误', '车辆列表', messageOpts);
            }
        })
    },
    // 保养记录按钮
    'click #upkeep_record_btn': function(e, value, row, index) {
        window.sessionStorage.upkeepinfo = JSON.stringify(row);
        $(".upkeepForm .vSn").val(row.vSn);
        $('#upkeep_model').modal();
    },
    // 研发工具记录按钮
    'click #finaudit_tools_btn': function(e, value, row, index) {},
    // 审核成功列表查看详情
    'click #finaudit_info_btn': function(e, value, row, index) {
        // 查看车辆详情
        window.location.hash = "pagenum=" + 1 + "&id=" + row.id + "&vSn=" + row.vSn; //车辆数据库编号
        $("#carTypeInForm").addClass("active").siblings().removeClass("active");
        $(".detailitem0").addClass("checkitem_active").siblings().removeClass("checkitem_active");
        cartypein_info(row.vSn, "#carTypeInForm");
    },
    'click #finaudit_returncar_btn': function(e, value, row, index) {

    }
};
// 保养记录提交
$("#upkeep_btn").click(function() {
    var upkeep_item_arr = [];
    var itemname = $(".upkeepForm input[name='upkeepItem']:checked");
    var brandAndlabel = $(".upkeepForm input[name='upkeepItem']:checked").parent().siblings().children("input");
    // console.log(brandAndlabel);
    for (var i = 0; i < itemname.length; i++) {
        upkeep_item_arr.push({ "itemName": itemname[i].value, "brandAndlabel": brandAndlabel[i].value })
    }
    if ($(".upkeepForm .upkeep_odm").val() == "") {
        $(".upkeepForm .upkeep_odm").val(0)
    }
    console.log(JSON.stringify(upkeep_item_arr));
    $.ajax({
        "url": "http://192.168.0.106:8080/car-management/car/maintenance/save/" + $(".upkeepForm .vSn").val() + "/" +
            $(".upkeepForm .upkeep_odm").val() + "/" + $(".upkeepForm .nextupkeepTime").val() + ".action",
        "type": "post",
        contentType: 'application/json;charset=UTF-8', //contentType很重要 
        crossDomain: true, //cors解决post跨域问题，后台要进行相关配置
        "data": JSON.stringify(upkeep_item_arr),
        "success": function(res) {
            if (res.ret == true) {
                toastr.success('保养记录提交成功', '保养记录', messageOpts);
            } else {
                toastr.warning('保养记录提交失败', '保养记录', messageOpts);
            }
        },
        "error": function(res) {
            toastr.error('程序内部错误', '保养记录', messageOpts);
        }
    });
})

function failAuditOperateFormatter(value, row, index) {
    return [
        '<button type="button" id="btn_failauditdel" class="RoleOfA btn btn-default  btn-sm" style="margin-right:15px;">删除</button>',
        '<a href="#" data-toggle="tab"><button type="button" id="failaudit_edit" class="RoleOfB btn btn-default  btn-sm" style="margin-right:15px;">修改</button></a>'
    ].join('');
}
window.failAuditOperateEvents = {
    'click #btn_failauditdel': function(e, value, row, index) {
        $(this).parent().parent().remove();
        $.ajax({
            url: "http://192.168.0.106:8080/car-management/car/deleteReview/" + row.id + ".action",
            type: "get",
            data: {},
            success: function(res) {
                console.log(res);
                if (res.ret == true) {
                    toastr.success('车辆删除成功', '审核失败列表', messageOpts);
                    loadFailAudit();
                } else {
                    toastr.warning('车辆删除失败', '审核失败列表', messageOpts);
                }
            },
            "error": function(res) {
                toastr.error('程序内部错误', '审核', messageOpts);
            }
        })
    },
    'click #failaudit_edit': function(e, value, row, index) {
        window.location.hash = "pagenum=" + 1 + "&id=" + row.id + "&vSn=" + row.vSn; //车辆数据库编号
        // 审核失败，修改表单信息，先进入安全/附件检查表
        $("#carList").removeClass("active");
        $(this).parent().attr("href", "#sCheck");
        $('a[href="#sCheck"]').tab('show');
        initsafeCheck(".pot_pressure");
    }
};