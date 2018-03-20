// 车辆列表
//信号量
loadCarList(1, 10);
var pageNum = 1;
// clickPaging();
// showData();
//车辆管理模块： 车辆列表
function loadCarList(pageNum, size) {
    $.ajax({
        "url": "http://192.168.0.222:8080/car-management/car/pageQuery.action",
        "type": "get",
        "data": {
            "page": pageNum,
            "size": size
        },
        "async": false,
        "dataType": "jsonp", //数据类型为jsonp  
        "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
        "success": function(res) {
            console.log(res);
            $('#carListtable').bootstrapTable('destroy');
            createTable("#carListtable", "carListtable_toolbar", res.rows,
                "vSn", "vCarSn", "gpsSN", "carName", "status", "makeTime", false, true,
                "车辆编号", "车牌号", "GPS编号", "车辆名称", "授权状态", "创建日期",
                true, operateEvents, operateFormatter, "");
            var maxPage = Math.ceil(res.total / size);
            // var maxPage = 9;
            // console.log(maxPage);
            if (maxPage >= 7) {
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

var $table = $('#carListtable');
$(function() {
    $('#carListtable_toolbar').find('select').change(function() {
        $table.bootstrapTable('destroy').bootstrapTable({
            exportDataType: $(this).val()
        });
    });
})

function operateFormatter(value, row, index) {
    return [
        '<button type="button" id="btn_mydel" class="RoleOfA btn btn-default  btn-sm" style="margin-right:15px;">删除</button>',
        '<button type="button" id="btn_mytetail" class="RoleOfB btn btn-default  btn-sm" style="margin-right:15px;">详情</button>',
        '<button type="button" id="btn_mytetail" class="RoleOfB btn btn-default  btn-sm" style="margin-right:15px;">授权</button>'
    ].join('');
}

window.operateEvents = {
    'click .RoleOfA': function(e, value, row, index) {
        console.log(row);
        console.log(index);
        console.log($(this).parent().parent());
        $(this).parent().parent().remove();
        console.log(row.id);
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
                    console.log(indexs);
                    console.log(indexs + 1);
                    loadCarList(indexs + 1, 10);
                    // alert("删除成功");
                }
            },
            "error": function(res) {
                console.log(res);
            }
        })
    },
    'click .RoleOfB': function(e, value, row, index) {
        // alert("B");
        // console.log(this.parentNode.parentNode.children[0].children[0].getAttribute("checked"));
        // console.log(value);
        console.log(row);
        window.location = "../../bailian/汽车管理系统/html/carDetail.html";
    }
};

// 分页——————————————————————————————————————————————————————————————————————————————————————————————
function clickPagings(maxPage) {
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
}


function clickPaging(maxPage, i) {
    $(".pageNav ul").html("");
    var lis = "";
    for (var p = 1; p < maxPage + 1; p++) {
        lis += "<li>" + p + "</li>";
    }
    console.log(i);
    $(".pageNav ul").html(lis);
    $(".pageNav li").eq(i).addClass("cur").siblings().removeClass("cur");
    // 点击时间
    $(".pageNav li").click(function(event) {
        console.log(this);
        console.log($(this));
        // $(this).addClass("cur").siblings().removeClass("cur");
        //改变信号量
        pageNum = parseInt($(this).html());
        //调用ajax，切换分页按钮样式
        // showData();
        console.log(pageNum);
        loadCarList(pageNum, 10);
        clickPaging(maxPage, pageNum - 1);
        //更新URL的hash
        window.location.hash = pageNum;
    });
}
bindEvent();
//监听
function bindEvent() {
    $(".pageNav li").click(function(event) {
        //写"…"的小格格不能被点击 方式2
        if ($(this).html() == "…") {
            return;
        }
        //改变信号量
        pageNum = parseInt($(this).html());

        //调用ajax，切换分页按钮样式
        // showData();
        loadCarList(pageNum, 10)
        clickPagings();
        //更新URL的hash
        window.location.hash = pageNum;

    });
}