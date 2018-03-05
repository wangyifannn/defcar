$("#menu .form-horizontal").hide();
//加载 菜单列表
$.ajax({
    "url": "http://192.168.0.222:8080/car-management/menu/menuList.action",
    "type": "get",
    "dataType": "jsonp", //数据类型为jsonp  
    "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
    "success": function(res) {
        console.log(res);
        createTable("#menuList", "toolbar_menuList", res,
            "rid", "name", "keyWord", "remark", "operator", "createTime", true, true,
            "角色编号", "名称", "关键字", "备注", "创建人", "创建日期",
            true, menuOperateEventsDel, menuOperateFormatterDel);
        var addmenubtn = document.getElementById("btn_add_menu");
        // 点击添加用戶按鈕
        addmenubtn.onclick = function() {
            $("#menu_list").hide();
            $("#menu .form-horizontal").show();
            // 确认添加角色
            $(".addmenu_btn").click(function() {
                $.ajax({
                    "url": "http://192.168.0.222:8080/car-management/menu/addMenu.action",
                    "type": "get",
                    "data": {
                        "name": $("input[name='menu_name']").val(),
                        "keyWord": $("input[name='menu_keywords']").val(),
                        "remark": $("input[name='menu_remark']").val()
                    },
                    "dataType": "jsonp", //数据类型为jsonp  
                    "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数
                    "success": function(res) {
                        console.log(res);

                    },
                    "error": function(res) {
                        console.log(res);
                    }
                })
            });

            // 取消添加用戶表單
            $(".removemenu_btn").click(function() {
                $("#menu .form-horizontal").hide();
                $("#menu_list").show();
            });

            // 重置按鈕
            $(".resetmenu_btn").click(function() {
                console.log("重置按钮");
                formReset();
            });
        };
    },
    "error": function(res) {
        console.log(res);
    }
});
var $tableUserList = $('#menuList');

function menuOperateFormatterDel(value, row, index) {
    return [
        '<button type="button" id="menu_btn_mydel" class="menuOfA btn btn-default optionBth  btn-sm" style="margin-right:15px;">删除</button>'
    ].join('');
}
var menudelarr = [];
window.menuOperateEventsDel = {
    'click #menu_btn_mydel': function(e, value, row, index) {
        console.log(row);
        menudelarr.push(row.pid);
        // 删除权限操作
        $.ajax({
            "url": "http://192.168.0.222:8080/car-management/menu/deletemenu.action",
            "type": "get",
            "data": {
                "mids[]": menudelarr
            },
            "dataType": "jsonp", //数据类型为jsonp  
            "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数
            "success": function(res) {
                console.log(res);
            },
            "error": function(res) {
                console.log(res);
            }
        })
    }
};