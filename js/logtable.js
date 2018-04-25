// 日志表格
function createLogTable(boxname, toolbarid, res,
    row1, row2, row3, row4, row5, row6, row7, row8, ifpage, ifrefresh,
    row1name, row2name, row3name, row4name, row5name, row6name, row7name, row8name,
    ifoperate, userOperateEventsDel, userOperateFormatterDel, pagetype, tit) {
    $(boxname).css({
        "position": "relative"
    });
    $(boxname).bootstrapTable('destroy');
    $(boxname).bootstrapTable({
        data: res,
        toggle: "table",
        toolbar: toolbarid,
        pagination: ifpage, //是否显示分页（*）
        sortable: false, //是否启用排序
        sortOrder: "asc", //排序方式
        sidePagination: pagetype, //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1, //初始化加载第一页，默认第一页
        pageSize: 10, //每页的记录行数（*）
        pageList: [10, 25, 50, 100], //可供选择的每页的行数（*）
        search: true, //是否搜索查询
        showColumns: true, //是否显示所有的列
        showRefresh: ifrefresh, //是否显示刷新按钮
        minimumCountColumns: 2, //最少允许的列数
        clickToSelect: true, //是否启用点击选中行
        searchOnEnterKey: true, //设置为 true时，按回车触发搜索方法
        strictSearch: false, //设置为 true启用全匹配搜索， 否则为模糊搜索
        showToggle: true, //是否显示切换视图（table/card）按钮
        searchAlign: "right",
        columns: [
            [{
                "title": tit,
                "halign": "center",
                "align": "center",
                "colspan": 11
            }],
            [{
                field: "status",
                title: "全选",
                checkbox: true,
                align: 'center',
                sortable: true
            }, {
                field: "index",
                title: "序号",
                align: 'center',
                sortable: true,
                formatter: function(value, row, index) {
                    return index + 1;
                }
            }, {
                field: row1,
                title: row1name,
                align: 'center',
                sortable: true
            }, {
                field: row2,
                title: row2name,
                align: 'center',
                sortable: true
            }, {
                field: row3,
                title: row3name,
                align: 'center',
                sortable: true
            }, {
                field: row4,
                title: row4name,
                align: 'center',
                sortable: true
            }, {
                field: row5,
                title: row5name,
                align: 'center',
                sortable: true
            }, {
                field: row6,
                title: row6name,
                align: 'center',
                sortable: true
            }, {
                field: row7,
                title: row7name,
                align: 'center',
                sortable: true,
            }, {
                field: row8,
                title: row8name,
                align: 'center',
                sortable: true,
            }, {
                field: 'operate',
                title: '操作',
                align: 'center',
                events: userOperateEventsDel,
                formatter: userOperateFormatterDel
            }]
        ]
    });
    // 隐藏表格中的某一列
    if (!ifoperate) {
        $(boxname).bootstrapTable('hideColumn', 'operate');
    }
}

function loadLog(url, tabtit, tabname, toolname) {
    $.ajax({
        url: url,
        success: function(res) {
            console.log(res);
            if (tabname == "#carLogTable") {
                createLogTable(tabname, toolname, res,
                    "module", "method", "methodType", "operate_ip", "description", "requestMethod", "createTime", "operator", "true", "false",
                    "模块名称", "执行操作", "操作类型", "请求IP", "请求结果", "请求方式", "创建日期", "操作人",
                    true, carlogOperateEvents, carlogOperateFormatter, "client", tabtit);
            } else if (tabname == "#driverLogTable") {
                createLogTable(tabname, toolname, res,
                    "module", "method", "methodType", "operate_ip", "description", "requestMethod", "createTime", "operator", "true", "false",
                    "模块名称", "执行操作", "操作类型", "请求IP", "请求结果", "请求方式", "创建日期", "操作人",
                    true, driverlogOperateEvents, driverlogOperateFormatter, "client", tabtit);
            } else if (tabname == "#sysLogTable") {
                createLogTable(tabname, toolname, res,
                    "module", "method", "methodType", "operate_ip", "description", "requestMethod", "createTime", "operator", "true", "false",
                    "模块名称", "执行操作", "操作类型", "请求IP", "请求结果", "请求方式", "创建日期", "操作人",
                    true, syslogOperateEvents, syslogOperateFormatter, "client", tabtit);
            } else if (tabname == "#maintainLogTable") {
                createLogTable(tabname, toolname, res,
                    "module", "method", "methodType", "operate_ip", "description", "requestMethod", "createTime", "operator", "true", "false",
                    "模块名称", "执行操作", "操作类型", "请求IP", "请求结果", "请求方式", "创建日期", "操作人",
                    true, maintainlogOperateEvents, maintainlogOperateFormatter, "client", tabtit);
            }
        }
    })
}

function carlogOperateFormatter(value, row, index) {
    return [
        '<button type="button" id="delcarLog_row" class="RoleOfA btn btn-default btn-sm">删除</button>'
    ].join('');
}
window.carlogOperateEvents = {
    'click #delcarLog_row': function(e, value, row, index) {
        $(this).parent().parent().remove();
        deletecarLog(row.id);
    }
};

function maintainlogOperateFormatter(value, row, index) {
    return [
        '<button type="button" id="delmaintainLog_row" class="RoleOfA btn btn-default btn-sm">删除</button>'
    ].join('');
}
window.maintainlogOperateEvents = {
    'click #delmaintainLog_row': function(e, value, row, index) {
        $(this).parent().parent().remove();
        deletemaintainLog(row.id);
    }
};

function syslogOperateFormatter(value, row, index) {
    return [
        '<button type="button" id="delsysLog_row" class="RoleOfA btn btn-default btn-sm">删除</button>'
    ].join('');
}
window.syslogOperateEvents = {
    'click #delsysLog_row': function(e, value, row, index) {
        $(this).parent().parent().remove();
        deletesysLog(row.id);
    }
};

function driverlogOperateFormatter(value, row, index) {
    return [
        '<button type="button" id="delmaintainLog_row" class="RoleOfA btn btn-default btn-sm">删除</button>'
    ].join('');
}
window.driverlogOperateEvents = {
    'click #delmaintainLog_row': function(e, value, row, index) {
        $(this).parent().parent().remove();
        deletedriverLog(row.id);
    }
};

function deletecarLog(idsArr) {
    $.ajax({
        url: "http://192.168.0.222:8080/car-management/log/delete.action",
        type: "get",
        data: {
            ids: idsArr
        },
        success: function(res) {
            console.log(res);
            if (res.ret == true) {
                toastr.success('日志删除成功', '车辆管理日志列表', messageOpts);
                loadLog("http://192.168.0.222:8080/car-management/log/findCarLog.action", "车辆管理日志列表", "#carLogTable", "#toolbar_carLogTable");
            } else {
                toastr.warning('日志删除失败', '日志列表', messageOpts);
            }
        },
        "error": function(res) {
            toastr.error('程序内部错误', '日志列表', messageOpts);
        }
    })
}

function deletesysLog(idsArr) {
    $.ajax({
        url: "http://192.168.0.222:8080/car-management/log/delete.action",
        type: "get",
        data: {
            ids: idsArr
        },
        success: function(res) {
            console.log(res);
            if (res.ret == true) {
                toastr.success('日志删除成功', '系统管理日志列表', messageOpts);
                loadLog("http://192.168.0.222:8080/car-management/log/findCarSystemLog.action", "系统管理日志列表", "#sysLogTable", "#toolbar_sysLogTable");
            } else {
                toastr.warning('日志删除失败', '日志列表', messageOpts);
            }
        },
        "error": function(res) {
            toastr.error('程序内部错误', '日志列表', messageOpts);
        }
    })
}

function deletedriverLog(idsArr) {
    $.ajax({
        url: "http://192.168.0.222:8080/car-management/log/delete.action",
        type: "get",
        data: {
            ids: idsArr
        },
        success: function(res) {
            console.log(res);
            if (res.ret == true) {
                toastr.success('日志删除成功', '驾驶员管理日志列表', messageOpts);
                loadLog("http://192.168.0.222:8080/car-management/log/findCarDriverLog.action", "驾驶员管理日志列表", "#driverLogTable", "#toolbar_driverLogTable");
            } else {
                toastr.warning('日志删除失败', '日志列表', messageOpts);
            }
        },
        "error": function(res) {
            toastr.error('程序内部错误', '日志列表', messageOpts);
        }
    })
}

function deletemaintainLog(idsArr) {
    $.ajax({
        url: "http://192.168.0.222:8080/car-management/log/delete.action",
        type: "get",
        data: {
            ids: idsArr
        },
        success: function(res) {
            console.log(res);
            if (res.ret == true) {
                toastr.success('日志删除成功', '维修管理日志列表', messageOpts);
                loadLog("http://192.168.0.222:8080/car-management/log/findCarMaintainLog.action", "维修管理日志列表", "#maintainLogTable", "#toolbar_maintainLogTable");
            } else {
                toastr.warning('日志删除失败', '日志列表', messageOpts);
            }
        },
        "error": function(res) {
            toastr.error('程序内部错误', '日志列表', messageOpts);
        }
    })
}

function deletAllLog(a, name) {
    // var a = $("#carLogTable").bootstrapTable('getSelections');
    var delcarlogArr = [];
    var delcarlogString = "";
    if (a.length >= 1) {
        for (var i = 0; i < a.length; i++) {
            delcarlogArr.push(a[i].id)
        }
        delcarlogString = delcarlogArr.join(",");
        if (name == "car") {
            deletecarLog(delcarlogString);
        } else if (name == "driver") {
            deletedriverLog(delcarlogString);
        } else if (name == "sys") {
            deletesysLog(delcarlogString);
        } else if (name = "maintain") {
            deletemaintainLog(delcarlogString);
        }
    } else {
        toastr.warning('最少选中一行', '删除日志', messageOpts);
    }
}
// 删除所有车辆管理日志
$("#delcarlog_all").click(function() {
    var a = $("#carLogTable").bootstrapTable('getSelections');
    deletAllLog(a, "car");
});
// 删除所有系统管理日志
$("#delsyslog_all").click(function() {
    var b = $("#sysLogTable").bootstrapTable('getSelections');
    deletAllLog(b, "sys");
});
// 删除所有维修管理日志
$("#delmaintainlog_all").click(function() {
    var c = $("#maintainLogTable").bootstrapTable('getSelections');
    deletAllLog(c, "maintain");
});
// 删除所有驾驶员管理日志
$("#deldriverlog_all").click(function() {
    var d = $("#driverLogTable").bootstrapTable('getSelections');
    deletAllLog(d, "driver");
});