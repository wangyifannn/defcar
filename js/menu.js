$.ajax({
    "url": "http://192.168.0.222:8080/car-management/menu/showMenu.action",
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
                '<a class="sidebar_dropdown_hover" href="#"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-' + res[i].url + '"></use></svg> <span>' +
                res[i].name + '</span><span class="badge">' + res[i].childrenMenus.length + '</span></a>' +
                '<div class="sidebar-submenu">' +
                '<ul class="menuli_ulli' + i + '">' +
                '</ul>' +
                '</div>' +
                '</li>';
            $("#myTab").append(menuli);
            var menuli_ulli = "";
            for (var k = 0; k < res[i].childrenMenus.length; k++) {
                menuli_ulli += '<li class="' + res[i].childrenMenus[k].url + '"><a href="#' + res[i].childrenMenus[k].url + '" data-toggle="tab">' + res[i].childrenMenus[k].name + '</a> </li>';
                $(".menuli_ulli" + i).html(menuli_ulli);
            }
        }

        $(".sidebar-dropdown > a").click(function() {
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
        $("#toggle-sidebar").click(function() {
            $(".page-wrapper").toggleClass("toggled");
        });
        // 点击选中切换页面并改变面包屑导航路径
        $(".sidebar-submenu ul li").click(function() {
            changBread(breadli1, this.parentNode.parentNode.parentNode.children[0].children[1].innerText, this.innerText);
            var sib = $(this).parent().parent().parent().siblings();
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
        // $(".carTrack").click(function() {
        //     $("#carTrack").append("<iframe class='iframebg' src='../map/cartrack.html' width='100%' height='800px' scrolling='no' frameborder='no' border='0'></iframe>");
        // });
        // $(".carList").click(function() {
        //     $('#carListtable').bootstrapTable('destroy');
        //     window.location.hash = "pagenum=1";
        //     loadCarList(1, 10);
        // });
        // 车辆录入
        $(".carTypeIn").click(function() {
            window.location.hash = "";
        });
        // 临时车辆列表
        $(".carList").click(function() {
            $('#carListtable').bootstrapTable('destroy');
            addAuditMenu("#carList .auditMenus", 0);
            loadCarList();
        });
        // 车辆列表
        $(".finishAuditList").click(function() {
            $('#finishAuditTable').bootstrapTable('destroy');
            loadsucAudit();
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
    },
    "error": function(data) {
        console.log(data);
        console.log("cuo" + data);
    }
})


// 解决tabs标签在当前页面点击后，再次点击，失效问题。
function removecss(box) {
    $(".sidebar-submenu a").removeClass("active");
}