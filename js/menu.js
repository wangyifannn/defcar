$.ajax({
    // "url": "../../../car/CarMangae0/json/menu.json",
    "url": "http://192.168.0.106:8080/car-management/menu/showMenu.action", //要登陆
    // "url": "http://192.168.0.106:8080/car-management/menu/menuList.action",
    "type": "get",
    "data": {},
    "dataType": "jsonp", //数据类型为jsonp  
    "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数
    "success": function(res) {
        console.log(res);
        var menuli = "";
        for (var i = 0; i < res.length; i++) {
            menuli =
                '<li class="sidebar-dropdown">' +
                '<a class="sidebar_dropdown_hover two_a" href="#"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-' + res[i].url + '"></use></svg><span>' +
                res[i].name + '</span><span class="badge">' + res[i].childrenMenus.length + '</span></a>' +
                '<div class="sidebar-submenu">' +
                '<ul class="menuli_ulli' + i + '">' +
                '</ul>' +
                '</div>' +
                '</li>';
            $("#myTab").append(menuli);
            var menuli_ulli = "";
            for (var k = 0; k < res[i].childrenMenus.length; k++) {
                var menuli_ulli_menu3li = "";
                if (res[i].childrenMenus[k].childrenMenus.length > 0) {
                    for (var j = 0; j < res[i].childrenMenus[k].childrenMenus.length; j++) {
                        menuli_ulli_menu3li += '<li class="' + res[i].childrenMenus[k].childrenMenus[j].url + '"><a href="#' + res[i].childrenMenus[k].childrenMenus[j].url + '" data-toggle="tab">' + res[i].childrenMenus[k].childrenMenus[j].name + '</a> </li>';
                    }
                    menuli_ulli += '<li class="sidebar-dropdown threeMenu">' +
                        '<a class="sidebar_dropdown_hover three_a" href="#"><span>' +
                        res[i].childrenMenus[k].name + '</span><span class="badge">' + res[i].childrenMenus[k].childrenMenus.length + '</span></a>' +
                        '<div class="sidebar-submenu">' +
                        '<ul class="menuli_ulli_menu3li' + i + '">' + menuli_ulli_menu3li + '</ul>' +
                        '</div>' +
                        '</li>';
                } else {
                    menuli_ulli += '<li class="' + res[i].childrenMenus[k].url + '"><a href="#' + res[i].childrenMenus[k].url + '" data-toggle="tab">' + res[i].childrenMenus[k].name + '</a> </li>';
                }
                $(".menuli_ulli" + i).html(menuli_ulli);
            }
        }
        $(".sidebar-dropdown > a.two_a").click(function() {
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
        $(".three_a").click(function() {
            if ($(this).parent().hasClass("active")) {
                $(".sidebar-dropdown").removeClass("active");
                $(this).parent().removeClass("active");
                $(this).parent().parent().parent().parent().addClass("active"); //给父级加上active;
                $(this).siblings(".sidebar-submenu").slideUp(250);
            } else {
                $(this).parent().addClass("active");
                $(this).parent().parent().parent().parent().addClass("active"); //给父级加上active;
                $(this).next(".sidebar-submenu").slideDown(250);
            }
        })
        $(".carList").click(function() {
            $(this).children().css({ color: "#1B6DDA" });
            $(this).siblings().children().css({ color: "white" });
        })
        $(".carTypeIn").click(function() {
            $(this).children().css({ color: "#1B6DDA" });
            $(this).siblings().children().css({ color: "white" });
        })
        $("#toggle-sidebar").click(function() {
            $(".page-wrapper").toggleClass("toggled");
        });
        // 点击选中切换页面并改变面包屑导航路径
        $(".sidebar-submenu ul li").click(function() {
            if ($(this).parent().parent().parent().hasClass("threeMenu")) {
                var ss = '<li>' + $(this).parent().parent().siblings().children()[0].innerText + "/" + '</li><li>' + this.innerText + '</li>';
                changBread(breadli1, this.parentNode.parentNode.parentNode.children[0].innerText, ss);
            } else if ($(this).hasClass("threeMenu")) {
                changBread(breadli1, this.parentNode.parentNode.parentNode.children[0].children[1].innerText, "车辆录入");
            } else {
                changBread(breadli1, this.parentNode.parentNode.parentNode.children[0].children[1].innerText, this.innerText);

            }
            var sib = $(this).parent().parent().parent().siblings();
            for (var i = 0; i < sib.length; i++) {
                $(sib[i]).removeClass("active");
                if (sib[i].children[1]) {
                    var li2 = sib[i].children[1].children[0];
                    for (var j = 0; j < li2.children.length; j++) {
                        $(li2.children[j]).removeClass("active");
                    }
                }
            }
        });
        //驾驶员管理
        $(".driverList ").click(function() {
            $("#driverTypeIn").removeClass("active");
            $("#driverList").addClass("active");
            loadDriverList(1, 10);
        });
        // 车辆录入
        $(".carTypeIn").click(function() {
            window.location.hash = "";
        });
        // 临时车辆列表
        $(".carList").click(function() {
            $('#carListtable').bootstrapTable('destroy');
            addAuditMenu("#carList .auditMenus", 0);
            loadCarList(JSON.stringify({
                "vSn": null
            }));
        });
        // 车辆列表
        $(".finishAuditList").click(function() {
            $('#finishAuditTable').bootstrapTable('destroy');
            loadsucAudit();
            // 修改侧边菜单，兄弟的孩子的active都去掉
            $(this).siblings().children().removeClass("active");
            $(".finishAuditList").siblings().children().children().children().removeClass("active");
            $(".finishAuditList").siblings().children().children().children().children().css({ color: "white" });
        });
        $(".maintainList").click(function() {
            $('#maintainList').bootstrapTable('destroy');
            window.location.hash = "pagenum=1";
            loadMaintainList(1, 10);
        });
        $(".rights").click(function() {
            loadRightsList();
            $("#rights_list").show();
            $("#add_rights_form").hide();
            // $("html").append("<script type='text/javascript' src='./js/rightstable.js'></script>");
        });
        $(".role").click(function() {
            loadRoleList();
            loadrightsList(".role_check_box", "rolepid");
            $("#role_list").show();
            $("#role .form-horizontal").hide();
        });
        $(".user").click(function() {
            //----解决用户列表点解添加按钮，再点击角色管理等其他选项，再回来点击用户管理时页面失效问题------------------------------------------------------
            $("#user .form-horizontal").hide();
            $("#user_rightbox").show();
            //----------------------------------------------------------
            loadrolesList(".user_check_box", "rolepid");
            loadUserList();
            // $("html").append("<script type='text/javascript' src='./js/usertable.js'></script>");
        });
        $(".menu").click(function() {
            $("#menu .form-horizontal").hide();
            loadMenuList();
            // $("html").append("<script type='text/javascript' src='./js/menutable.js'></script>");
        });
        // 点击维修申请，重置申请表单
        $(".maintainTypeIn").click(function() {
            myformReset();
            $(".send_tips").html("");
        })
    },
    "error": function(data) {
        console.log("cuo" + data);
    }
})


// 解决tabs标签在当前页面点击后，再次点击，失效问题。
function removecss(box) {
    $(".sidebar-submenu a").removeClass("active");
}