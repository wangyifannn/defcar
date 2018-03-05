// s 页面懒加载
document.onreadystatechange = loadingChange; //当页面加载状态改变的时候执行这个方法.  
function loadingChange() {
    if (document.readyState == "complete") { //当页面加载状态为完全结束时进入   
        $(".loading").hide(); //当页面加载完成后将loading页隐藏  
        $(".fixed-table-loading").hide(); //当页面加载完成后将loading页隐藏  
    }
}
// e 页面懒加载
// 菜单hover
var orisrc = "";
$(".sidebar_dropdown_hover").hover(function() {
    // console.log($(this).children()[0]);
    orisrc = $($(this).children()[0]).prop("src").split(".png")[0];

    if (orisrc.match("blue") == null) {
        $(this).children("img").prop("src", orisrc + "blue.png");
    } else {
        $(this).children("img").prop("src", orisrc + ".png");
    }
}, function() {
    if (orisrc.match("blue") == null) {
        $(this).children("img").prop("src", orisrc + ".png");
    } else {
        // console.log(orisrc);
        var orisrc1 = orisrc.split("blue.png")[0];
        // console.log(orisrc1);
        $(this).children("img").prop("src", orisrc1 + ".png");
    }
});
// 子菜单hover 父级菜单颜色变蓝

$(".sidebar-submenu ul li").mouseover(function() {
    var sorisrc = $(this).parent().parent().parent().children()[0].getElementsByTagName("img")[0].getAttribute("src").split(".png")[0];
    // console.log(sorisrc);
    // console.log(sorisrc.match("blue"));
    if (sorisrc.match("blue") == null) {
        // sorisrc = "";
        // console.log(sorisrc);
        $(this).parent().parent().parent().children()[0].getElementsByTagName("img")[0].setAttribute("src", sorisrc + "blue.png");
    } else {
        // console.log(sorisrc);
        $(this).parent().parent().parent().children()[0].getElementsByTagName("img")[0].setAttribute("src", sorisrc + ".png");
    }
});

$(".sidebar-submenu ul li").mouseout(function() {
    var sorisrc = $(this).parent().parent().parent().children()[0].getElementsByTagName("img")[0].getAttribute("src").split(".png")[0];
    // console.log(sorisrc);
    // console.log(sorisrc.match("blue"));
    if (sorisrc.match("blue") == null) {
        // console.log(sorisrc);
        $(this).parent().parent().parent().children()[0].getElementsByTagName("img")[0].setAttribute("src", sorisrc + ".png");
    } else {
        var orisrc1 = orisrc.split("blue.png")[0];
        // console.log(orisrc1);
        $(this).parent().parent().parent().children()[0].getElementsByTagName("img")[0].setAttribute("src", orisrc1 + ".png");
    }
});

// 解决侧边菜单点击 active失效问题

// 面包屑导航
var breadHtml = "";
var breadli1 = "车辆管理系统";
var breadli2 = "车辆地图";
var breadli3 = "";

function changBread(bread1, bread2, bread3) {
    breadHtml = "<ol class='breadcrumb'> <li><span>车辆管理系统&nbsp;&nbsp;&nbsp;当前位置:&nbsp;&nbsp;&nbsp;</span><a href='./index.html'>" + bread1 + "</a> </li><li> <a href = '#''>" +
        bread2 + " </a></li><li class = 'active'> " + bread3 + "</li> </ol>";
    $(".bread_left").html(breadHtml);
}
changBread(breadli1, breadli2, breadli3);

// 点击选中切换页面并改变面包屑导航路径
$(".sidebar-dropdown ul li").click(function() {
        // console.log(this.parentNode.parentNode.parentNode.children[0].children[1].innerText);
        // console.log(this.innerText);
        changBread(breadli1, this.parentNode.parentNode.parentNode.children[0].children[1].innerText, this.innerText);
        // console.log($(this));
        // console.log($(this).children());
        // console.log($($(this).children[1]).textContent);
        var sib = $(this).parent().parent().parent().siblings();
        // console.log(sib);
        for (var i = 0; i < sib.length; i++) {
            // console.log(sib[i]);
            $(sib[i]).removeClass("active");
            // console.log(sib[i]);
            if (sib[i].children[1]) {
                var li2 = sib[i].children[1].children[0];
                for (var j = 0; j < li2.children.length; j++) {
                    $(li2.children[j]).removeClass("active");
                }
            }
        }
    })
    // 
$(".li1").click(function() {
    // console.log(this);
    var sibs = $(this).siblings();
    for (var i = 0; i < sibs.length; i++) {
        // console.log($(sibs[i].children[1].children[0]).children());
        var li2 = $(sibs[i].children[1].children[0]).children();
        for (var j = 0; j < li2.length; j++) {
            // console.log(li2[j]);
            $(li2[j]).removeClass("active");
        }

    }
})

//点击注销按钮，进入登录页面
$(".glyphicon-off").click(function() {
    // alert("a");
    window.localStorage.clear;
    window.location.href = "./html/login.html";
});
// 点击判断浏览器类型
function isFF() {
    return navigator.userAgent.indexOf("Firefox") != -1;
}

function isChrome() {
    return navigator.userAgent.indexOf("Chrome") > -1;
}
isFF();
console.log(isFF());
console.log(isChrome());
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

// 权限管理、用户管理、角色管理列表函数
function createTable(boxname, toolbarid, res,
    row1, row2, row3, row4, row5, row6, ifpage, ifrefresh,
    row1name, row2name, row3name, row4name, row5name, row6name,
    ifoperate, userOperateEventsDel, userOperateFormatterDel) {
    $(boxname).css({
        "position": "relative"
    });
    $(boxname).bootstrapTable({
        data: res,
        toggle: table,
        toolbar: "userlist_toolbar",
        pagination: ifpage, //是否显示分页（*）
        sortable: false, //是否启用排序
        sortOrder: "asc", //排序方式
        sidePagination: "client", //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1, //初始化加载第一页，默认第一页
        pageSize: 10, //每页的记录行数（*）
        pageList: [10, 25, 50, 100], //可供选择的每页的行数（*）
        search: true, //是否搜索查询
        showColumns: true, //是否显示所有的列
        showRefresh: ifrefresh, //是否显示刷新按钮
        minimumCountColumns: 2, //最少允许的列数
        clickToSelect: true, //是否启用点击选中行
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
            formatter: function(value, row, index) {
                return changeDateFormat(value)
            }
        }, {
            field: 'operate',
            title: '操作',
            align: 'center',
            events: userOperateEventsDel,
            formatter: userOperateFormatterDel
        }],
        // 编辑更新用户信息
        // onEditableSave: function(field, row, oldValue, $el) {
        //     $.ajax({
        //         type: "post",
        //         url: "/Editable/Edit",
        //         data: { strJson: JSON.stringify(row) },
        //         success: function(data, status) {
        //             if (status == "success") {
        //                 alert("编辑成功");
        //             }
        //         },
        //         error: function() {
        //             alert("Error");
        //         },
        //         complete: function() {

        //         }

        //     });
        // }
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
function loadrightsList(paramsid) {
    $.ajax({
        "url": "http://192.168.0.222:8080/car-management/role/roleList.action",
        "type": "get",
        "dataType": "jsonp", //数据类型为jsonp  
        "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
        "success": function(res) {
            console.log(res);
            var checkboxHtml = "";
            for (var i = 0; i < res.length; i++) {
                checkboxHtml += '<input name="rids" type="checkbox" value="' + res[i].name + '" rid="' + res[i].rid + '"><label>' + res[i].name + '</label>&nbsp;&nbsp;&nbsp;';
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