$.ajax({
    "url": "http://192.168.0.222:8080/car-management/menu/menuList.action",
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
                '<a class="sidebar_dropdown_hover" href="#"><img src="./img/index/home.png" alt=""> <span>' + res[i].name + '</span><span class="badge">' + res[i].childrenMenus.length + '</span></a>' +
                '<div class="sidebar-submenu">' +
                '<ul class="menuli_ulli' + i + '">' +
                '</ul>' +
                '</div>' +
                '</li>';
            // console.log(menuli);
            $("#myTab").append(menuli);
            var menuli_ulli = "";
            for (var k = 0; k < res[i].childrenMenus.length; k++) {
                // console.log("i=" + i, "k=" + k);
                menuli_ulli += '<li><a href="#driverList" data-toggle="tab">' + res[i].childrenMenus[k].name + '</a> </li>';
                $(".menuli_ulli" + i).html(menuli_ulli);
            }
            // console.log(menuli_ulli);
        }
        // console.log(menuli);
        // 
        $(".sidebar-dropdown > a").click(function() {
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

        $("#toggle-sidebar").click(function() {
            $(".page-wrapper").toggleClass("toggled");
        });
    },
    "error": function(res) {
        console.log(res);
    }
})