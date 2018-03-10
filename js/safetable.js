// $("#safe .form-horizontal").hide();
// 加载权限列表
loadrightsList(".safe_check_box");
var checkmenu_val = [];
var safe_check_val = [];
// 加载菜单列表
$.ajax({
    "url": "../json/datatable.json",
    "type": "get",
    "dataType": "jsonp", //数据类型为jsonp  
    "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
    "success": function(res) {
        console.log(res);
        var MenuList = "";
        // for (var i = 0; i < res.length; i++) {
        //     MenuList = '<div mid=' + res[i].mid + ' class="MenuList' + i + ' menulist_height">' +
        //         '<label for="">' + res[i].name + ':</label>&nbsp;&nbsp' +
        //         '</div>';
        //     $(".safe_menuList").append(MenuList);
        //     var MenuList_checkbox = "";
        //     for (var k = 0; k < res[i].childrenMenus.length; k++) {
        //         MenuList_checkbox += '&nbsp;&nbsp&nbsp;&nbsp;<input name="mid" mid="' + res[i].childrenMenus[k].mid + '" type="checkbox" value="' + res[i].childrenMenus[k].name + '">' + res[i].childrenMenus[k].name;
        //     }
        //     $(".MenuList" + i).append(MenuList_checkbox);
        // }
        // console.log(MenuList);
        // 判断选择菜单 多选选项
        var menuobj = document.getElementsByName("mid");
        console.log(menuobj);

        for (k in menuobj) {
            menuobj[k].onclick = function() {
                console.log(this.checked);
                if (this.checked) {
                    console.log(this.parentNode.getAttribute("mid"));
                    // console.log(this.getAttribute("mid"));
                    checkmenu_val.push(this.getAttribute("mid"));
                    // console.log(checkmenu_val);
                } else {
                    // console.log($.inArray(this.getAttribute("mid"), checkmenu_val));
                    if ($.inArray(this.getAttribute("mid"), checkmenu_val) != -1) {
                        checkmenu_val.remove(this.getAttribute("mid"));
                        // console.log(checkmenu_val);
                    }
                }
                // 判断是否添加父级菜单id
                // 当点击this,for循环判断当前this和他的兄弟节点的checked ，如果有一个为true，则添加父级mid到数组中
                // 如果当前this和他的兄弟节点的checked,没有一个为true,则将父级mid从数组删除。  将这个条件作为if条件判断相对简单，上面可作为else语句
                // var thisSiblings;
                console.log($(this).parent().children("input"));
                var menus_inputs = $(this).parent().children("input");
                // var menus_inputs_false = $(this).parent().children("input");
                var flagfalse = menus_inputs.length;

                for (var n = 0; n < menus_inputs.length; n++) {
                    // 判断是否选择
                    if (menus_inputs[n].checked == false) {
                        // flagfalse = flagfalse + 1;
                        // 如果没有找到，返回-1
                        if ($.inArray(this.parentNode.getAttribute("mid"), checkmenu_val) == -1) {
                            checkmenu_val.push(this.parentNode.getAttribute("mid"));
                        }
                    } else {
                        flagfalse = flagfalse - 1;
                    }
                }
                if (flagfalse == menus_inputs.length) {
                    console.log("全为false");
                    checkmenu_val.remove(this.parentNode.getAttribute("mid"));
                }
                console.log(flagfalse);
                console.log(checkmenu_val);
            }
        };
    },
    "error": function(res) {
        console.log(res);
    }
});
//加载 角色列表
$.ajax({
    "url": "../json/datatable.json",
    "type": "get",
    // "dataType": "jsonp", //数据类型为jsonp  
    // "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
    "success": function(res) {
        console.log(res);
        createTable("#safeList", "toolbar_safeList", res,
            "rid", "name", "keyWord", "remark", "operator", "", true, true,
            "检测编号", "检查项目", "要求", "状态", "备注", "",
            true, safeOperateEventsDel, safeOperateFormatterDel);
        var addsafebtn = document.getElementById("btn_add_safe");
        // 返回用户列表
        $(".removesafe_btn").click(function() {
            // $("#safe .form-horizontal").hide();
            $("#safe_list").show();
        });
        // 重置按鈕
        $(".resetsafe_btn").click(function() {
            console.log("重置按钮");
            formReset();
        });
    },
    "error": function(res) {
        console.log(res);
    }
});
var $tableUserList = $('#safeList');

function safeOperateFormatterDel(value, row, index) {
    return [
        '<button type="button" id="safe_btn_mydel" class="safeOfA btn btn-default optionBth  btn-sm" style="margin-right:15px;">删除</button>'
    ].join('');
}
var safedelarr = [];
window.safeOperateEventsDel = {
    'click #safe_btn_mydel': function(e, value, row, index) {
        console.log(row);
        safedelarr.push(row.pid);
        console.log($(this).parent().parent());
        $(this).parent().parent().remove();
        // 删除权限操作
        $.ajax({
            "url": "/car-management/safe/deletesafe.action",
            "type": "get",
            "data": {
                "rids[]": safedelarr
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