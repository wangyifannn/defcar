// 车辆列表
//信号量
$(".ReturnDriver").click(function() {
    loadDriverList(1, 10);
});
var driverpageNum = 1;

//车辆管理模块： 车辆列表
function loadDriverList(driverpageNum, size) {
    $.ajax({
        "url": "http://192.168.0.106:8080/car-management/carDriver/CarDriverList.action",
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
            createTable("#DriverListtable", "DriverListtable_toolbar", res.rows,
                "id", "name", "allowStartTime", "allowEndTime", "iccard", "isallow", false, true,
                "驾驶员编号", "姓名", "允许起始日期", "允许终止日期", "iccard", "是否授权",
                true, driveroperateEvents, driveroperateFormatter, "");
            var drivermaxPage = Math.ceil(res.total / size);
            // var drivermaxPage = 9;

            if (drivermaxPage >= 9) {
                // console.log("大于等于9");
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
    return [
        '<button type="button" id="btn_driverdel" class="my_btn btn btn-default  btn-sm" style="margin-right:15px;">删除</button>',
        '<button type="button" id="btn_driverdetail" class="my_btn btn btn-default  btn-sm" style="margin-right:15px;">详情</button>',
        '<button type="button" id="btn_driverimpower" class="my_btn btn btn-default  btn-sm" style="margin-right:15px;">授权</button>'
    ].join('');
}

window.driveroperateEvents = {
    'click #btn_driverdel': function(e, value, row, index) {
        console.log(row);
        console.log(index);
        console.log($(this).parent().parent());
        $(this).parent().parent().remove();
        console.log(row.id);
        // 删除用户操作
        $.ajax({
            "url": "http://192.168.0.106:8080/car-management/carDriver/delete.action",
            "type": "get",
            "data": {
                "ids": row.id
            },
            "dataType": "jsonp", //数据类型为jsonp  
            "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数
            "success": function(res) {
                console.log(res);
                if (res.ret) {
                    var indexs = parseInt(index / 10);
                    console.log(indexs);
                    console.log(indexs + 1);
                    loadDriverList(indexs + 1, 10);
                }
            },
            "error": function(res) {
                console.log(res);
            }
        })
    },
    'click .RoleOfB': function(e, value, row, index) {
        // console.log(this.parentNode.parentNode.children[0].children[0].getAttribute("checked"));
        // console.log(value);
        console.log(row);
        window.location = "../../bailian/汽车管理系统/html/DriverDetail.html";
    }
};

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
        console.log(driverpageNum);
        loadDriverList(driverpageNum, 10)
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