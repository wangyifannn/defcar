/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// const greeter = require('./Greeter');
var drivertable = __webpack_require__(1);
var cartable = __webpack_require__(2);
var index = __webpack_require__(3);
var maintable = __webpack_require__(4);
var menu = __webpack_require__(5);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $table2 = $('#table2');
$(function () {
    $('#toolbar2').find('select').change(function () {
        $table2.bootstrapTable('destroy').bootstrapTable({
            exportDataType: $(this).val()
        });
    });
});

function operateFormatterdriver(value, row, index) {
    return ['<button type="button" id="driver_btn_mydel" class="RoleOfA btn btn-default optionBth  btn-sm" style="margin-right:15px;">授权</button>', '<button type="button" id="driver_btn_mytetail" class="RoleOfB btn btn-default optionBth  btn-sm" style="margin-right:15px;">详情</button>'].join('');
}

window.operateEventsdrive = {
    'click #driver_btn_mydel': function clickDriver_btn_mydel(e, value, row, index) {
        console.log(row);
        alert("A");
    },
    'click #driver_btn_mytetail': function clickDriver_btn_mytetail(e, value, row, index) {
        // alert("B");
        // console.log(this.parentNode.parentNode.children[0].children[0].getAttribute("checked"));
        // console.log(value);
        console.log(row);
        window.location = "../../bailian/汽车管理系统/html/driverRecord.html";
    }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $table = $('#table');
$(function () {
    $('#toolbar').find('select').change(function () {
        $table.bootstrapTable('destroy').bootstrapTable({
            exportDataType: $(this).val()
        });
    });
});

function operateFormatter(value, row, index) {
    return ['<button type="button" id="btn_mydel" class="RoleOfA btn btn-default  btn-sm" style="margin-right:15px;">轨迹</button>', '<button type="button" id="btn_mytetail" class="RoleOfB btn btn-default  btn-sm" style="margin-right:15px;">详情</button>', '<button type="button" id="btn_mytetail" class="RoleOfB btn btn-default  btn-sm" style="margin-right:15px;">授权</button>'].join('');
}

window.operateEvents = {
    'click .RoleOfA': function clickRoleOfA(e, value, row, index) {

        alert("A");
    },
    'click .RoleOfB': function clickRoleOfB(e, value, row, index) {
        // alert("B");
        // console.log(this.parentNode.parentNode.children[0].children[0].getAttribute("checked"));
        // console.log(value);
        console.log(row);
        window.location = "../../bailian/汽车管理系统/html/carDetail.html";
    }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// s 页面懒加载
document.onreadystatechange = loadingChange; //当页面加载状态改变的时候执行这个方法.  
function loadingChange() {
    if (document.readyState == "complete") {
        //当页面加载状态为完全结束时进入   
        $(".loading").hide(); //当页面加载完成后将loading页隐藏  
        $(".fixed-table-loading").hide(); //当页面加载完成后将loading页隐藏  
    }
}
// e 页面懒加载
// 解决侧边菜单点击 active失效问题

// 面包屑导航
var breadHtml = "";
var breadli1 = "车辆管理系统";
var breadli2 = "车辆地图";
var breadli3 = "";

function changBread(bread1, bread2, bread3) {
    breadHtml = "<ol class='breadcrumb'> <li><span>车辆管理系统&nbsp;&nbsp;&nbsp;当前位置:&nbsp;&nbsp;&nbsp;</span><a href='./index.html'>" + bread1 + "</a> </li><li> <a href = '#''>" + bread2 + " </a></li><li class = 'active'> " + bread3 + "</li> </ol>";
    $(".bread_left").html(breadHtml);
}
changBread(breadli1, breadli2, breadli3);

// 点击选中切换页面并改变面包屑导航路径
$(".sidebar-dropdown ul li").click(function () {
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
});
// 
$(".li1").click(function () {
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
});

//点击注销按钮，进入登录页面
$(".glyphicon-off").click(function () {
    // alert("a");
    window.localStorage.removeItem("successUser");
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
    // <script type="text/javascript" src="./js/rightstable.js"></script>

}

$(".rights").click(function () {
    $("html").append("<script type='text/javascript' src='./js/rightstable.js'></script>");
});
$(".role").click(function () {
    $("html").append("<script type='text/javascript' src='./js/roletable.js'></script>");
});
$(".user").click(function () {
    $("html").append("<script type='text/javascript' src='./js/usertable.js'></script>");
});
$(".menu").click(function () {
    $("html").append("<script type='text/javascript' src='./js/menutable.js'></script>");
});
// 表单重置函数
function formReset() {
    $(':input', '.form-horizontal').not(':button, :submit, :reset, :hidden,:radio') // 去除不需要重置的input类型
    .val('').removeAttr('checked').removeAttr('selected');
};

// 权限管理、用户管理、角色管理列表函数
function createTable(boxname, toolbarid, res, row1, row2, row3, row4, row5, row6, ifpage, ifrefresh, row1name, row2name, row3name, row4name, row5name, row6name, ifoperate, userOperateEventsDel, userOperateFormatterDel) {
    $(boxname).css({
        "position": "relative"
    });
    $(boxname).bootstrapTable('destroy');
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
            formatter: function formatter(value, row, index) {
                return changeDateFormat(value);
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
        "url": "/car-management/permission/permissionList.action",
        "type": "get",
        "dataType": "jsonp", //数据类型为jsonp  
        "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
        "success": function success(res) {
            console.log(res);
            var checkboxHtml = "";
            for (var i = 0; i < res.length; i++) {
                checkboxHtml += '<input name="' + namerid + '" type="checkbox" value="' + res[i].name + '" pid="' + res[i].pid + '"><label>' + res[i].name + '</label>&nbsp;&nbsp;&nbsp;';
            }
            $(paramsid).html(checkboxHtml);
        },
        "error": function error(res) {
            console.log(res);
        }
    });
}
// 数据库 加载角色列表
function loadrolesList(paramsid, namerid) {
    $.ajax({
        "url": "/car-management/role/roleList.action",
        "type": "get",
        "dataType": "jsonp", //数据类型为jsonp  
        "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
        "success": function success(res) {
            console.log(res);
            var checkboxHtml = "";
            for (var i = 0; i < res.length; i++) {
                checkboxHtml += '<input name="' + namerid + '" type="checkbox" value="' + res[i].name + '" rid="' + res[i].rid + '"><label>' + res[i].name + '</label>&nbsp;&nbsp;&nbsp;';
            }
            $(paramsid).html(checkboxHtml);
        },
        "error": function error(res) {
            console.log(res);
        }
    });
}

// js数组删除某一项指定的值
Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};

Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $tablescreen = $('#tablescreen');

$(function () {
    $('#toolbar_tablescreen').find('select').change(function () {
        $tablescreen.bootstrapTable('destroy').bootstrapTable({
            exportDataType: $(this).val()
        });
    });
});

function operateFormattermainScreen(value, row, index) {
    return [
    // '<button type="button" id="btn_mydel" class="RoleOfA btn btn-default  btn-sm" style="margin-right:15px;">轨迹</button>',
    '<button type="button" id="btn_mytetail" class="RoleOfB btn btn-default  btn-sm" style="margin-right:15px;">置顶</button>'
    // '<button type="button" id="btn_mytetail" class="RoleOfB btn btn-default  btn-sm" style="margin-right:15px;">授权</button>'
    ].join('');
}

window.operateEventsmainScreen = {
    'click .RoleOfB': function clickRoleOfB(e, value, row, index) {
        // alert("B");
        // console.log(this.parentNode.parentNode.children[0].children[0].getAttribute("checked"));
        // console.log(value);
        console.log(row);
    }
};
// 门岗 是否合法
var $sentry = $("#sentry");
// var lasttd = $('#sentry').find('td:last-child').html();
// var lasttd = $sentry.Element.getElementByTagName("td");
// console.log(lasttd);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


$.ajax({
    "url": "/car-management/menu/showMenu.action",
    "type": "get",
    "data": {},
    "dataType": "jsonp", //数据类型为jsonp  
    "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数
    "success": function success(res) {
        console.log(res);
        var menuli = "";
        for (var i = 0; i < res.length; i++) {
            menuli = '<li class="sidebar-dropdown">' + '<a class="sidebar_dropdown_hover" href="#"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-' + res[i].url + '"></use></svg> <span>' + res[i].name + '</span><span class="badge">' + res[i].childrenMenus.length + '</span></a>' + '<div class="sidebar-submenu">' + '<ul class="menuli_ulli' + i + '">' + '</ul>' + '</div>' + '</li>';
            $("#myTab").append(menuli);
            var menuli_ulli = "";
            for (var k = 0; k < res[i].childrenMenus.length; k++) {
                // console.log("i=" + i, "k=" + k);
                menuli_ulli += '<li class="' + res[i].childrenMenus[k].url + '"><a href="#' + res[i].childrenMenus[k].url + '" data-toggle="tab">' + res[i].childrenMenus[k].name + '</a> </li>';
                $(".menuli_ulli" + i).html(menuli_ulli);
            }
            // console.log(menuli_ulli);
        }

        // console.log(menuli);
        $(".sidebar-dropdown > a").click(function () {
            console.log(this);
            $(".sidebar-submenu").slideUp(250);
            if ($(this).parent().hasClass("active")) {
                $(".sidebar-dropdown").removeClass("active");
                $(this).parent().removeClass("active");
            } else {
                $(".sidebar-dropdown").removeClass("active");
                $(this).next(".sidebar-submenu").slideDown(250);
                $(this).parent().addClass("active");
            }
        });
        $("#toggle-sidebar").click(function () {
            $(".page-wrapper").toggleClass("toggled");
        });
        // $(".carTrack").click(function() {
        //     $("#carTrack").append("<iframe class='iframebg' src='../map/cartrack.html' width='100%' height='800px' scrolling='no' frameborder='no' border='0'></iframe>");
        // });
    },
    "error": function error(data) {
        console.log(data);
        console.log("cuo" + data);
    }
});

/***/ })
/******/ ]);