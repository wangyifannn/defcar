// 设置消息提示框的配置xinxi
toastr.options = messageOpts;
//设置显示配置
var messageOpts = {
    "closeButton": true, //是否显示关闭按钮
    "debug": false, //是否使用debug模式
    "positionClass": "toast-top-center", //弹出窗的位置
    "onclick": null,
    "showDuration": "300", //显示的动画时间
    "hideDuration": "1000", //消失的动画时间
    "timeOut": "1500", //展现时间
    "extendedTimeOut": "80000", //加长展示时间
    "showEasing": "swing", //显示时的动画缓冲方式
    "hideEasing": "linear", //消失时的动画缓冲方式
    "showMethod": "fadeIn", //显示时的动画方式
    "hideMethod": "fadeOut" //消失时的动画方式
};
//--------------------------------------------------------------------------------------------
// s 页面懒加载
document.onreadystatechange = loadingChange; //当页面加载状态改变的时候执行这个方法.  
function loadingChange() {
    if (document.readyState == "complete") { //当页面加载状态为完全结束时进入   
        $(".loading").hide(); //当页面加载完成后将loading页隐藏  
        $(".fixed-table-loading").hide(); //当页面加载完成后将loading页隐藏  
    } else {
        setTimeout(function() {
            $(".loading").hide(); //当页面加载完成后将loading页隐藏  
            $(".fixed-table-loading").hide(); //当页面加载完成后将loading页隐藏 
        }, 3000)
    }
}
// e 页面懒加载
// 面包屑导航
var breadHtml = "";
var breadli1 = "车辆管理系统";
var breadli2 = "GPS";
var breadli3 = "车辆地图";

function changBread(bread1, bread2, bread3) {
    breadHtml = "<ol class='breadcrumb'> <li><span>车辆管理系统&nbsp;&nbsp;&nbsp;当前位置:&nbsp;&nbsp;&nbsp;</span><a href='./index.html'>" + bread1 + "</a> </li><li> <a href = '#''>" +
        bread2 + " </a></li><li class = 'active'> " + bread3 + "</li> </ol>";
    $(".bread_left").html(breadHtml);
}
changBread(breadli1, breadli2, breadli3);

//点击注销按钮，进入登录页面
$(".glyphicon-off").click(function() {
    window.localStorage.removeItem("successUser");
    var con;
    con = confirm("你确定要退出吗？");
    if (con) {
        window.localStorage.removeItem("successUser");
        window.location.href = "http://192.168.0.106:8080/car-management/user/loginOut.action";
    }
});
// 点击判断浏览器类型
function isFF() {
    return navigator.userAgent.indexOf("Firefox") != -1;
}

function isChrome() {
    return navigator.userAgent.indexOf("Chrome") > -1;
}
isFF();
isChrome();
if (isFF() || isChrome()) {
    // $("head").append("<meta http-equiv='Content-Security-Policy' content='upgrade-insecure-requests'>");
}
// 表单重置函数
function formReset() {
    $(':input', '.form-horizontal')
        .not(':button, :submit, :reset, :hidden,:radio') // 去除不需要重置的input类型
        .val('')
        .removeAttr('checked')
        .removeAttr('selected');
};

function myformReset() {
    $(':input', 'form')
        .not(':button,:radio,:submit') // 去除不需要重置的input类型
        .val('')
        .removeAttr('checked')
        .removeAttr('selected');
};
// form表单序列化为json对象
$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
// 权限管理、用户管理、角色管理列表函数，驾驶员列表
function createTable(boxname, toolbarid, res,
    row1, row2, row3, row4, row5, row6, ifpage, ifrefresh,
    row1name, row2name, row3name, row4name, row5name, row6name,
    ifoperate, userOperateEventsDel, userOperateFormatterDel, pagetype) {
    $(boxname).css({
        "position": "relative"
    });
    // $(boxname).bootstrapTable('destroy');
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
        columns: [{
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
            sortable: true,
            //获取日期列的值进行转换
            // formatter: function(value, row, index) {
            //     return changeDateFormat(value)
            // }
        }, {
            field: 'operate',
            title: '操作',
            align: 'center',
            events: userOperateEventsDel,
            formatter: userOperateFormatterDel
        }]
    });
    // 隐藏表格中的某一列
    if (!ifoperate) {
        $(boxname).bootstrapTable('hideColumn', 'operate');
    }
}

// $(".add_box").hide();
//转换日期格式(时间戳转换为datetime格式)
function changeDateFormat(cellval) {
    var dateVal = cellval + "";
    if (cellval != null) {
        var date = new Date(parseInt(dateVal.replace("/Date(", "").replace(")/", ""), 10));
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        return date.getFullYear() + "-" + month + "-" + currentDate + " " + hours + ":" + minutes + ":" + seconds;
    }
}

// 数据库 加载权限列表
function loadrightsList(paramsid, namerid) {
    $.ajax({
        "url": "http://192.168.0.106:8080/car-management/permission/permissionList.action",
        "type": "get",
        "dataType": "jsonp", //数据类型为jsonp  
        "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
        "success": function(res) {
            console.log(res);
            var checkboxHtml = "";
            for (var i = 0; i < res.length; i++) {
                checkboxHtml += '<input name="' + namerid + '" type="checkbox" value="' + res[i].name + '" pid="' + res[i].pid + '"><label>' + res[i].name + '</label>&nbsp;&nbsp;&nbsp;';
            }
            $(paramsid).html(checkboxHtml);
        },
        "error": function(res) {
            console.log(res);
        }
    })
}
// 数据库 加载角色列表
function loadrolesList(paramsid, namerid) {
    $.ajax({
        "url": "http://192.168.0.106:8080/car-management/role/roleList.action",
        "type": "get",
        "dataType": "jsonp", //数据类型为jsonp  
        "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
        "success": function(res) {
            console.log(res);
            var checkboxHtml = "";
            for (var i = 0; i < res.length; i++) {
                checkboxHtml += '<input name="' + namerid + '" type="checkbox" value="' + res[i].name + '" rid="' + res[i].rid + '"><label>' + res[i].name + '</label>&nbsp;&nbsp;&nbsp;';
            }
            $(paramsid).html(checkboxHtml);
        },
        "error": function(res) {
            console.log(res);
        }
    })
}


// js数组删除某一项指定的值
Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};

Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

/**
 * 获取hash参数
 */
function getHashParameter(key) {
    var params = getHashParameters();
    return params[key];
}

function getHashParameters() {
    var arr = (location.hash || "").replace(/^\#/, '').split("&");
    var params = {};
    for (var i = 0; i < arr.length; i++) {
        var data = arr[i].split("=");
        if (data.length == 2) {
            params[data[0]] = data[1];
        }
    }
    return params;
}
// 参数校验接口
function checkParams(url, params1, params2, btn) {
    $.ajax({
        "url": "http://192.168.0.106:8080/car-management" + url,
        "type": "get",
        "data": {},
        "async": false,
        "dataType": "jsonp", //数据类型为jsonp  
        "jsonp": "jsonpCallback",
        "success": function(res) {
            console.log(res);
            if (res) {
                if (btn == "#send_btn") {
                    if (res.ret == false) {
                        $(params1).html("车辆编号正确");
                        $(btn).attr("disabled", false);
                        return true;
                    } else {
                        $(btn).attr("disabled", true);
                        $(params1).html("车辆编号不存在");
                        return false;
                    }
                } else {
                    if (res.ret == false) {
                        $(params1).html(res.msg);
                        $(params2).html(res.msg);
                        $(btn).attr("disabled", true);
                    } else {
                        $(btn).attr("disabled", false);
                        $(params1).html("*");
                        $(params2).html("");
                    }
                }
            }
        }
    })
}
// 车辆列表
function createcarTable(boxname, toolbarid, res,
    row1, row2, row3, row4, row5, row6, ifpage, ifrefresh,
    row1name, row2name, row3name, row4name, row5name, row6name,
    ifoperate, userOperateEventsDel, userOperateFormatterDel, pagetype, row7, row7name, row8, row8name, row9, row9name) {
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
        columns: [{
                field: row1,
                title: row1name,
                align: 'center',
                sortable: true,
                formatter: function(value, row, index) {
                    return index + 1;
                }
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
                field: row7,
                title: row7name,
                align: 'center',
                sortable: true,
                formatter: function(value, row, index) {
                    // return changeDateFormat(value)
                    // console.log(value);
                    if (value == "" || value == null) {
                        return "未分组";
                    } else {
                        return value.name;
                    }
                }
            },
            {
                field: row8,
                title: row8name,
                align: 'center',
                sortable: true,
                formatter: function(value, row, index) {
                    // return changeDateFormat(value)
                    if (value == 0) {
                        return "已录入";
                    } else if (value == 1) {
                        return "已接车点检";
                    } else if (value == 2) {
                        return "已安全检查";
                    } else if (value == 3) {
                        return "已线束检查";
                    } else if (value == 4) {
                        return "已bom检查";
                    } else if (value == 5) {
                        return "已还车点检";
                    } else {
                        return "已检查完毕";
                    }
                }
            },
            {
                field: row9,
                title: row9name,
                align: 'center',
                sortable: true
            },
            {
                field: row6,
                title: row6name,
                align: 'center',
                sortable: true
            },
            {
                field: 'operate',
                title: '操作',
                align: 'center',
                events: userOperateEventsDel,
                formatter: userOperateFormatterDel
            }
        ]
    });
    // 隐藏表格中的某一列
    if (!ifoperate) {
        $(boxname).bootstrapTable('hideColumn', 'operate');
    }
}

// 车辆录入引导菜单
function getloadMenu(boxname, num) {
    var loadArr = ["车辆录入", "接车点检", "安全检查", "车辆审核", "还车点检"];
    var loadStr;
    var loadm = "";
    var classname = "";
    var loadTips = "*为必填项";
    for (var i = 0; i < loadArr.length; i++) {
        if (i == 0) {
            classname = "loadnormal loadactive";
        } else if (i < num) {
            classname = "loadnormal loadactives";
        } else {
            classname = "loadnormal";
        }
        loadm += '<span class="' + classname + '">' + loadArr[i] + '</span>'
    }
    loadAStr = "<div class='loadleft'>" + loadm + "</div><div class='loadright'>" + loadTips + "</div>"
    $(boxname).html(loadAStr);

}
getloadMenu(".road_menu", 1); //车辆录入页面
getloadMenu("#carCheck .road_menu", 2);
getloadMenu("#sCheck .road_menu", 3);
getloadMenu("#wiringCheck .road_menu", 3);
getloadMenu("#bomCheck .road_menu", 3);

getloadMenu("#auditList .road_menu", 4);
getloadMenu("#failAuditList .road_menu", 4);
getloadMenu("#returncarCheck .road_menu", 5);

// 审核成功和失败列表
function createAuditTable(boxname, toolbarid, res,
    row1, row2, row3, row4, row5, row6, row7, ifpage, ifrefresh,
    row1name, row2name, row3name, row4name, row5name, row6name, row7name,
    ifoperate, userOperateEventsDel, userOperateFormatterDel, pagetype) {
    $(boxname).css({
        "position": "relative"
    });
    // $(boxname).bootstrapTable('destroy');
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
        columns: [{
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
            sortable: true,
            formatter: function(value, row, index) {
                if (value == "" || value == null) {
                    return "";
                } else {
                    return value.operator;
                }
            }
        }, {
            field: row4,
            title: row4name,
            align: 'center',
            sortable: true,
            formatter: function(value, row, index) {
                if (value == "" || value == null) {
                    return "";
                } else {
                    return value.operator;
                }
            }
        }, {
            field: row5,
            title: row5name,
            align: 'center',
            sortable: true,
            formatter: function(value, row, index) {
                if (value == "" || value == null) {
                    return "";
                } else {
                    return value.operator;
                }
            }
        }, {
            field: row6,
            title: row6name,
            align: 'center',
            sortable: true,
            //获取日期列的值进行转换
            formatter: function(value, row, index) {
                if (value == "" || value == null) {
                    return "";
                } else {
                    return value.ReviewerTime;
                    // return changeDateFormat(value.reviewerTime);
                }
            }
        }, {
            field: row7,
            title: row7name,
            align: 'center',
            sortable: true,
            //获取日期列的值进行转换
            formatter: function(value, row, index) {
                if (value == "" || value == null) {
                    return "";
                } else {
                    return value.remark;
                }
            }
        }, {
            field: 'operate',
            title: '操作',
            align: 'center',
            events: userOperateEventsDel,
            formatter: userOperateFormatterDel
        }]
    });
    // 隐藏表格中的某一列
    if (!ifoperate) {
        $(boxname).bootstrapTable('hideColumn', 'operate');
    }
}