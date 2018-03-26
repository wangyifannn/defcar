$.ajax({
    "url": "http://192.168.0.222:8080/car-management/menu/showMenu.action",
    // "url": "../json/menu.json",
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
                // console.log("i=" + i, "k=" + k);
                menuli_ulli += '<li class="' + res[i].childrenMenus[k].url + '"><a href="#' + res[i].childrenMenus[k].url + '" data-toggle="tab">' + res[i].childrenMenus[k].name + '</a> </li>';
                $(".menuli_ulli" + i).html(menuli_ulli);
            }
        }

        $(".sidebar-dropdown > a").click(function() {
            // console.log(this.parentNode.parentNode.parentNode.children[0].children[1].innerText);
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
            // console.log(this);
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
        // $(".carTrack").click(function() {
        //     $("#carTrack").append("<iframe class='iframebg' src='../map/cartrack.html' width='100%' height='800px' scrolling='no' frameborder='no' border='0'></iframe>");
        // });
        $(".carList").click(function() {
            $('#carListtable').bootstrapTable('destroy');
            loadCarList(1, 10);
        });
        $(".rights").click(function() {
            $("html").append("<script type='text/javascript' src='./js/rightstable.js'></script>");
        });
        $(".role").click(function() {
            $("html").append("<script type='text/javascript' src='./js/roletable.js'></script>");
        });
        $(".user").click(function() {
            $("html").append("<script type='text/javascript' src='./js/usertable.js'></script>");
        });
        $(".menu").click(function() {
            $("html").append("<script type='text/javascript' src='./js/menutable.js'></script>");
        });
    },
    "error": function(data) {
        console.log(data);
        console.log("cuo" + data);
    }
})