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
    orisrc = $(this).children("img").prop("src").split(".png")[0];
    // console.log(orisrc); 
    $(this).children("img").prop("src", orisrc + "blue.png");
}, function() {
    $(this).children("img").prop("src",
        orisrc + ".png");
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
    // <!--<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">-->
    $("head").append("<meta http-equiv='Content-Security-Policy' content='upgrade-insecure-requests'>");

}

//用户管理模块： 用户列表
$.ajax({
        // "url": "http://192.168.1.222:8080/car-management/user/userList.action",
        "url": "./json/datatable.json",
        "data": {},
        "type": "post",
        // "dataType": "jsonp", //数据类型为jsonp  
        // "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
        "success": function(res) {
            console.log(res);
            createTable("#userList", "toolbar_userList", res, true, true, "uid");
            var addbtn = document.getElementById("add_button");
            addbtn.onclick = function() {
                $(".form-horizontal").show();
            };
        },
        "error": function(res) {
            console.log(res);
        }
    })
    // 用户列表
function createTable(boxname, toolbarid, res, ifpage, ifrefresh, id) {
    $(boxname).css({
        "position": "relative"
    });

    // <h3>车辆管理日志</h3>
    var addButton = ' <div id="' + toolbarid + '" class="toolbar" style="display: inline-block"><button id="add_button" class="mybtn">添加</button></div>';

    $(boxname).append(addButton);
    $(boxname).bootstrapTable({
        data: res,
        toggle: table,
        toolbar: toolbarid,
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
            field: id,
            title: '用户编号',
            align: 'center',
            sortable: true
        }, {
            field: 'nickname',
            title: '昵称',
            align: 'center',
            sortable: true
        }, {
            field: 'username',
            title: '用户名',
            align: 'center',
            sortable: true
        }, {
            field: 'telephone',
            title: '电话',
            align: 'center',
            sortable: true
        }, {
            field: 'status',
            title: '状态',
            align: 'center',
            sortable: true
        }, {
            field: 'createTime',
            title: '创建日期',
            align: 'center',
            sortable: true
        }]
    });
}


// $(".add_box").hide();

//添加用户角色表单， 数据库加载角色列表
// $.ajax({
//     "url": "http://192.168.1.222:8080/car-management/role/roleList.action",
//     "type": "post",
//     "dataType": "jsonp", //数据类型为jsonp  
//     "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
//     "success": function(res) {
//         console.log(res);
//         var checkboxHtml = "";
//         for (var i = 0; i < res.length; i++) {
//             checkboxHtml += '<input type="checkbox" name="" value="' + res[i].name + '"><label>' + res[i].name + '</label>&nbsp;&nbsp;&nbsp;';
//         }
//         $(".check_box").html(checkboxHtml);
//     },
//     "error": function(res) {
//         console.log(res);
//     }
// })