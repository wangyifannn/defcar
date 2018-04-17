// 加载权限列表

var checkmenu_val = [];
var role_check_val = [];

// 加载菜单列表
$.ajax({
    "url": "http://192.168.0.106:8080/car-management/menu/menuList.action",
    "type": "get",
    "dataType": "jsonp", //数据类型为jsonp  
    "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
    "success": function(res) {
        console.log(res);
        var MenuList = "";
        for (var i = 0; i < res.length; i++) {
            MenuList = '<div mid=' + res[i].mid + ' class="MenuList' + i + ' menulist_height">' +
                '<label for="">' + res[i].name + ':</label>&nbsp;&nbsp' +
                '</div>';
            // console.log(MenuList);
            $(".role_menuList").append(MenuList);
            var MenuList_checkbox = "";
            for (var k = 0; k < res[i].childrenMenus.length; k++) {
                // console.log("i=" + i, "k=" + k);
                MenuList_checkbox += '&nbsp;&nbsp&nbsp;&nbsp;<input name="mid" mid="' + res[i].childrenMenus[k].mid + '" type="checkbox" value="' + res[i].childrenMenus[k].name + '">' + res[i].childrenMenus[k].name;
            }
            $(".MenuList" + i).append(MenuList_checkbox);
            // console.log(MenuList_checkbox);
        }
        // console.log(MenuList);
        // 判断选择菜单 多选选项
        var menuobj = document.getElementsByName("mid");
        // console.log(menuobj);
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

function loadRoleList() {
    //加载 角色列表
    $.ajax({
        "url": "http://192.168.0.106:8080/car-management/role/roleList.action",
        "type": "get",
        "dataType": "jsonp", //数据类型为jsonp  
        "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
        "success": function(res) {
            console.log(res);
            $('#roleList').bootstrapTable('destroy');
            createTable("#roleList", "toolbar_roleList", res,
                "rid", "name", "keyWord", "remark", "operator", "createTime", true, true,
                "角色编号", "名称", "关键字", "备注", "创建人", "创建日期",
                true, roleOperateEventsDel, roleOperateFormatterDel, "client");
            var addrolebtn = document.getElementById("btn_add_role");
            // 点击添加用戶按鈕
            addrolebtn.onclick = function() {
                $("#role_list").hide();
                $("#role .form-horizontal").show();
                // var role_checkobj = document.getElementById("role").getElementsByTagName("input");
                var role_checkobj = document.getElementsByName("rolepid");
                // var role_checkobj = rolebox.;
                // var role_checkobj = $("#role>input[name='rids']");
                console.log(role_checkobj);
                // var role_check_val = [];
                for (k in role_checkobj) {
                    // console.log(role_checkobj[k]);
                    role_checkobj[k].onclick = function() {
                        // console.log("sssssssssssssssss");
                        console.log(this.checked);
                        if (this.checked) {
                            console.log(this.getAttribute("pid"));
                            role_check_val.push(this.getAttribute("pid"));
                        } else {
                            if ($.inArray(this.getAttribute("pid"), role_check_val) != -1) {
                                role_check_val.remove(this.getAttribute("pid"));
                                console.log(role_check_val);
                            }
                        }
                    }
                };

                // 确认添加角色
                $(".role_commit_btn").click(function() {
                    console.log(checkmenu_val);
                    console.log(role_check_val);
                    console.log(checkmenu_val.toString());
                    console.log($("input[name='role_name']").val());
                    $.ajax({
                        "url": "http://192.168.0.106:8080/car-management/role/addRole.action",
                        "type": "get",
                        "data": {
                            "name": $("input[name='role_name']").val(),
                            "keyWord": $("input[name='role_keywords']").val(),
                            "remark": $("input[name='role_remark']").val(),
                            "pids[]": role_check_val,
                            "mids": checkmenu_val.toString()
                        },
                        "dataType": "jsonp", //数据类型为jsonp  
                        "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数
                        "success": function(res) {
                            console.log(res);
                            if (res.ret) {
                                $(".role_tips").html("添加成功，您可以返回角色列表进行查看");
                            } else {
                                $(".role_tips").html("添加失败，请联系管理员");
                            }
                        },
                        "error": function(res) {
                            console.log(res);
                            $(".role_tips").html("添加失败，请联系管理员");
                        }
                    })
                });
                // 返回角色列表
                $(".removerole_btn").click(function() {
                    $("#role .form-horizontal").hide();
                    $("#role_list").show();
                    loadRoleList();
                });
                // 重置按鈕
                $(".resetrole_btn").click(function() {
                    console.log("重置按钮");
                    formReset();
                });
            };
        },
        "error": function(res) {
            console.log(res);
        }
    });
}

var $tableUserList = $('#roleList');

function roleOperateFormatterDel(value, row, index) {
    return [
        '<button type="button" id="role_btn_mydel" class="RoleOfA btn btn-default optionBth  btn-sm" style="margin-right:15px;">删除</button>'
    ].join('');
}
var roledelarr = [];
window.roleOperateEventsDel = {
    'click #role_btn_mydel': function(e, value, row, index) {
        console.log(row);
        roledelarr.push(row.rid);
        // console.log($(this).parent().parent());
        $(this).parent().parent().remove();
        console.log(roledelarr);
        // 删除权限操作
        $.ajax({
            "url": "http://192.168.0.106:8080/car-management/role/deleteRole.action",
            "type": "get",
            "data": {
                "rids[]": roledelarr
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