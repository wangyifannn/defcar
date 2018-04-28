$(".ReturnDriver").click(function() {
    loadDriverList(1, 10);
});
var driverpageNum = 1;

function loadDriverList(driverpageNum, size) {
    $.ajax({
        "url": "http://192.168.0.222:8080/car-management/carDriver/CarDriverList.action",
        "type": "get",
        "data": {
            "page": driverpageNum,
            "size": size
        },
        "async": false,
        "dataType": "jsonp", //数据类型为jsonp  
        "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
        "success": function(res) {
            console.log(res);
            $('#DriverListtable').bootstrapTable('destroy');
            createdriverTable("#DriverListtable", "DriverListtable_toolbar", res.rows,
                "name", "sex", "isallow", "allowStartTime", "allowEndTime", "iccard", false, true,
                "姓名", "性别", "是否授权", "授权起始日期", "授权终止日期", "iccard",
                true, driveroperateEvents, driveroperateFormatter, "");
            var drivermaxPage = Math.ceil(res.total / size);
            if (drivermaxPage >= 9) {
                dclickPagings(drivermaxPage);
            } else {
                dclickPaging(drivermaxPage, driverpageNum - 1);
            }
        },
        "error": function(res) {
            console.log(res);
        }
    });
}

var $drivertable = $('#DriverListtable');
$(function() {
    $('#DriverListtable_toolbar').find('select').change(function() {
        $drivertable.bootstrapTable('destroy').bootstrapTable({
            exportDataType: $(this).val()
        });
    });
})

function driveroperateFormatter(value, row, index) {
    // 未授权
    if (row.isallow == 1) {
        return [
            '<button type="button" id="btn_driverdel" class="my_btn btn btn-default  btn-sm" style="margin-right:15px;">删除</button>',
            '<button type="button" id="btn_driverup" class="my_btn btn btn-default  btn-sm" style="margin-right:15px;">修改</button>',
            '<button type="button" id="btn_driverimpower" class="my_btn btn btn-default  btn-sm" style="margin-right:15px;">授权</button>'
        ].join('');
    } else if (row.isallow == 2) {
        return [
            '<button type="button" id="btn_driverdel" class="my_btn btn btn-default  btn-sm" style="margin-right:15px;">删除</button>',
            '<button type="button" id="btn_driverup" class="my_btn btn btn-default  btn-sm" style="margin-right:15px;">修改</button>',
            '<button type="button" id="btn_drivercancelimpower" class="my_btn btn btn-default  btn-sm" style="margin-right:15px;">取消授权</button>'
        ].join('');
    }
}

window.driveroperateEvents = {
    'click #btn_driverdel': function(e, value, row, index) {
        $(this).parent().parent().remove();
        // 删除用户操作
        deletedriver(row.id, index);
    },
    // 修改
    'click #btn_driverup': function(e, value, row, index) {
        console.log(row);
        window.location.hash = "driverid=" + row.id + "&pageindex=" + index;
        findDriverInfo(row.id, "#driverTypeIn_model");
        $("#driverTypeIn_model").modal();
    },
    // 授权
    'click #btn_driverimpower': function(e, value, row, index) {
        window.location.hash = "driverid=" + row.id + "&pageindex=" + index;
        $("#driverimpower_model").modal();
        $(".driverimpower_model_Form .driver_name").val(row.name);
    },
    // 取消授权
    'click #btn_drivercancelimpower': function(e, value, row, index) {
        window.location.hash = "driverid=" + row.id + "&pageindex=" + index;
        cancelimpower(row.id);
    }
};
// 取消授权
function cancelimpower(idArr) {
    $.ajax({
        url: "http://192.168.0.222:8080/car-management/carDriver/cancelAuthorized.action",
        type: "post",
        data: {
            ids: idArr
        },
        success: function(res) {
            console.log(res);
            if (res.ret == true) {
                toastr.success('取消授权成功', '驾驶员授权', messageOpts);
                loadDriverList(1, 10);
            } else {
                toastr.warning('取消授权失败，请联系管理员', '驾驶员授权', messageOpts);
            }
        },
        error: function(res) {
            toastr.error('发生内部错误，请联系程序员', '驾驶员授权', messageOpts);
        }
    })
}
// 驾驶员数据回显
function findDriverInfo(id, boxname) {
    $.ajax({
        url: "http://192.168.0.222:8080/car-management/carDriver/edit.action",
        type: "post",
        data: {
            "id": id
        },
        success: function(res) {
            console.log(res);
            if (res == null) {
                toastr.success('数据为空', '驾驶员数据', messageOpts);
                $(".update_driver")[0].style.display = "none";
                $(".add_driver")[0].style.display = "inline-block";
                return;
            } else {
                if (res.isallow == 2) { //已授权
                    $(boxname + " input[name='isallow']:first-child").prop("checked", "checked");
                } else {
                    $(boxname + " input[name='isallow']:last-child").prop("checked", "checked");
                }
                $(boxname + " input[value=" + res.sex + "]").prop("checked", "checked");
                $(boxname + " #drivername").val(res.name);
                $(boxname + " #driverage").val(res.age);
                $(boxname + " #birthday").val(res.birthday);
                $(boxname + " #telephone").val(res.telephone);
                $(boxname + " #iccard").val(res.iccard);
                $(boxname + " #allowStartTime").val(res.allowStartTime);
                $(boxname + " #allowEndTime").val(res.allowEndTime);
                $(boxname + " #carTypeIn_remake").val(res.remark);
                $(".update_driver")[0].style.display = "inline-block";
                $(".add_driver")[0].style.display = "none";
            }
        },
        error: function(res) {
            toastr.warning('发生内部错误，请联系程序员', '驾驶员信息', messageOpts);
        }
    })
}
$("#driver_add_btn").click(function() {
    $(".update_driver")[0].style.display = "none";
    $(".add_driver")[0].style.display = "inline-block";
    $("#driverTypeIn_model").modal();
});
//驾驶员删除
function deletedriver(idArr, index) {
    $.ajax({
        "url": "http://192.168.0.222:8080/car-management/carDriver/delete.action",
        "type": "get",
        "data": {
            "ids": idArr
        },
        "dataType": "jsonp", //数据类型为jsonp  
        "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数
        "success": function(res) {
            console.log(res);
            if (res.ret) {
                toastr.success('删除成功', '驾驶员删除', messageOpts);
                var indexs = parseInt(index / 10);
                console.log(indexs);
                console.log(indexs + 1);
                loadDriverList(indexs + 1, 10);
            } else {
                toastr.warning('删除失败，请联系管理员', '驾驶员删除', messageOpts);
            }
        },
        "error": function(res) {
            toastr.error('发生内部错误，请联系程序员', '驾驶员删除', messageOpts);
        }
    })
}


$("#driverimpower_btn").click(function() {
    $.ajax({
        url: "http://192.168.0.222:8080/car-management/carDriver/authorized.action?id=" + getHashParameter("driverid"),
        type: "post",
        data: {
            startTime: $("#modal_allowStartTime").val(),
            endTime: $("#modal_allowEndTime").val()
        },
        success: function(res) {
            console.log(res);
            if (res.ret == true) {
                toastr.success('驾驶员授权成功', '驾驶员授权', messageOpts);
                $("#driverTypeIn_model").modal();
                loadDriverList(1, 10);
            } else {
                $("#driverTypeIn_model").modal();
                toastr.success('驾驶员授权失败，请联系管理员', '驾驶员授权', messageOpts);
            }
        },
        error: function(res) {
            toastr.warning('发生内部错误，请联系程序员', '驾驶员授权', messageOpts);
        }
    })
});
// 多项删除和取消授权
function cancelAllDriver(a, name) {
    // var a = $("#carLogTable").bootstrapTable('getSelections');
    var delcarlogArr = [];
    var delcarlogString = "";
    if (a.length >= 1) {
        for (var i = 0; i < a.length; i++) {
            delcarlogArr.push(a[i].id)
        }
        delcarlogString = delcarlogArr.join(",");
        if (name == "cancelimpower") {
            cancelimpower(delcarlogString);
        } else if (name == "driverdel") {
            deletedriver(delcarlogString, $(".driverpage .cur").text());
        }
    } else {
        toastr.warning('最少选中一行', '驾驶员管理', messageOpts);
    }
}
// 删除选中的驾驶员
$("#del_driver_all").click(function() {
    var driver_del_Arr = $("#DriverListtable").bootstrapTable('getSelections');
    cancelAllDriver(driver_del_Arr, "driverdel");
});
// 取消 选中项授权
$("#cancel_approve_all").click(function() {
    var driver_del_Arr = $("#DriverListtable").bootstrapTable('getSelections');
    cancelAllDriver(driver_del_Arr, "cancelimpower");
});
// 分页——————————————————————————————————————————————————————————————————————————————————————————————
function dclickPagings(drivermaxPage) {
    var lis = "";
    for (var p = 1; p < 7 + 1; p++) {
        lis += "<li>" + p + "</li>";
    }
    $(".driverpage ul").html(lis);
    if (driverpageNum >= 1 && driverpageNum <= 3) {
        $(".driverpage li").eq(0).html("1");
        $(".driverpage li").eq(1).html("2");
        $(".driverpage li").eq(2).html("3");
        $(".driverpage li").eq(3).html("4");
        $(".driverpage li").eq(4).html("…");
        $(".driverpage li").eq(5).html(drivermaxPage - 1);
        $(".driverpage li").eq(6).html(drivermaxPage);
        //cur
        // console.log($(".driverpage li"));
        $(".driverpage li").eq(driverpageNum - 1).addClass("cur").siblings().removeClass("cur");
    } else if (driverpageNum <= drivermaxPage && driverpageNum >= drivermaxPage - 2) {
        $(".driverpage li").eq(0).html("1");
        $(".driverpage li").eq(1).html("2");
        $(".driverpage li").eq(2).html("…");
        $(".driverpage li").eq(3).html(drivermaxPage - 3);
        $(".driverpage li").eq(4).html(drivermaxPage - 2);
        $(".driverpage li").eq(5).html(drivermaxPage - 1);
        $(".driverpage li").eq(6).html(drivermaxPage);
        //cur
        $(".driverpage li").eq(driverpageNum - drivermaxPage - 1).addClass("cur").siblings().removeClass("cur");
    } else {
        $(".driverpage li").eq(0).html("1");
        $(".driverpage li").eq(1).html("…");
        $(".driverpage li").eq(2).html(driverpageNum - 1);
        $(".driverpage li").eq(3).html(driverpageNum);
        $(".driverpage li").eq(4).html(driverpageNum + 1);
        $(".driverpage li").eq(5).html("…");
        $(".driverpage li").eq(6).html(drivermaxPage);
        //cur
        $(".driverpage li").eq(3).addClass("cur").siblings().removeClass("cur");
    }
    // console.log($(".driverpage li"));
    $(".driverpage li").click(function(event) {
        // console.log(this);
        //写"…"的小格格不能被点击 方式2
        if ($(this).html() == "…") {
            return;
        }
        //改变信号量
        driverpageNum = parseInt($(this).html());

        //调用ajax，切换分页按钮样式
        loadDriverList(driverpageNum, 10);
        dclickPagings(drivermaxPage);
        //更新URL的hash
        window.location.hash = driverpageNum;

    });
}


function dclickPaging(drivermaxPage, i) {
    $(".driverpage ul").html("");
    var lis = "";
    for (var p = 1; p < drivermaxPage + 1; p++) {
        lis += "<li>" + p + "</li>";
    }
    $(".driverpage ul").html(lis);
    $(".driverpage li").eq(i).addClass("cur").siblings().removeClass("cur");
    // 点击时间
    $(".driverpage li").click(function(event) {
        // $(this).addClass("cur").siblings().removeClass("cur");
        //改变信号量
        driverpageNum = parseInt($(this).html());
        //调用ajax，切换分页按钮样式
        loadDriverList(driverpageNum, 10);
        dclickPaging(drivermaxPage, driverpageNum - 1);
        //更新URL的hash
        window.location.hash = driverpageNum;
    });
}