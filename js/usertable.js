$("#user .form-horizontal").hide();
loadrightsList(".user_check_box");

//用户管理模块： 用户列表
function loadUserList() {
    $.ajax({
        "url": "http://192.168.0.222:8080/car-management/user/userList.action",
        "type": "get",
        "dataType": "jsonp", //数据类型为jsonp  
        "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
        "success": function(res) {
            console.log(res);
            $('#userList').bootstrapTable('destroy');
            createTable("#userList", "toolbar_userList", res,
                "uid", "nickname", "username", "telephone", "status", "createTime", true, true,
                "用户id", "昵称", "用户名", "电话", "状态", "创建日期",
                true, userOperateEventsDel, userOperateFormatterDel);
            // createTable("#userList", "toolbar_userList", res, true, true, "uid");
            var addbtn = document.getElementById("btn_add");
            // 点击添加用戶按鈕
            addbtn.onclick = function() {
                $("#user_rightbox").hide();
                $("#user .form-horizontal").show();
                // 判断用户角色权限的 多选选项
                var obj = document.getElementsByName("rids");
                var check_val = [];
                console.log(obj);
                for (k in obj) {
                    obj[k].onclick = function() {
                        console.log(this.checked);
                        if (this.checked) {
                            // console.log(this);
                            // console.log(this.getAttribute("rid"));
                            check_val.push(this.getAttribute("rid"));
                        } else {
                            if ($.inArray(this.getAttribute("rid"), role_check_val) != -1) {
                                role_check_val.remove(this.getAttribute("rid"));
                                console.log(role_check_val);
                            }
                        }
                    }
                };
                console.log(check_val);

                // 确认添加用户
                $(".adduser_btn").click(function() {
                    var username = $("input[name='user_name']").val();
                    console.log(username);
                    console.log($("input[name='user_email']").val());
                    console.log($("input[name='user_nickname']").val());
                    console.log($("input[name='sex']:checked").val());
                    console.log(check_val);
                    var adduserFormData = "";
                    // 向数据库添加用户
                    //添加用户角色表单， 数据库加载角色列表
                    $.ajax({
                        "url": "http://192.168.0.222:8080/car-management/user/addUser.action",
                        "type": "get",
                        "data": {
                            "username": $("input[name='user_name']").val(),
                            "password": $("input[name='user_pass']").val(),
                            "telephone": $("input[name='user_phone']").val(),
                            "email": $("input[name='user_email']").val(),
                            "nickname": $("input[name='user_nickname']").val(),
                            "remark": $(".user_remark").val(),
                            "sex": $("input[name='sex']:checked").val(),
                            "rids[]": check_val
                        },
                        "dataType": "jsonp", //数据类型为jsonp  
                        "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数
                        "success": function(res) {
                            console.log(res);
                            if (res.ret) {
                                $(".user_tips").html("添加成功，您可以返回用户列表进行查看");
                            } else {
                                $(".user_tips").html("添加失败，请联系管理员");
                            }
                        },
                        "error": function(res) {
                            console.log(res);
                            $(".user_tips").html("添加失败，请联系管理员");
                        }
                    })
                });
                // 取消添加用戶表單
                $(".my_remove_btn").click(function() {
                    $("#user .form-horizontal").hide();
                    $("#user_rightbox").show();
                    loadUserList();
                });
                // 重置按鈕
                $(".my_reset_btn").click(function() {
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

loadUserList();
var $tableUserList = $('#userList');
$(function() {
    $('#toolbar2').find('select').change(function() {
        $tableUserList.bootstrapTable('destroy').bootstrapTable({
            exportDataType: $(this).val()
        });
    });
})

function userOperateFormatterDel(value, row, index) {
    return [
        '<button type="button" id="user_btn_mydel" class="RoleOfA btn btn-default optionBth  btn-sm" style="margin-right:15px;">删除</button>'
    ].join('');
}
var userdelarr = [];
window.userOperateEventsDel = {
    'click #user_btn_mydel': function(e, value, row, index) {
        console.log(row);
        userdelarr.length = 0;
        userdelarr.push(row.uid);
        console.log($(this).parent().parent());
        $(this).parent().parent().remove();
        // 删除用户操作
        $.ajax({
            "url": "http://192.168.0.222:8080/car-management/user/delete.action",
            "type": "get",
            "data": {
                "ids[]": userdelarr
            },
            "dataType": "jsonp", //数据类型为jsonp  
            "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数
            "success": function(res) {
                console.log(res);
                if (res.ret) {
                    // alert("删除成功");
                }
            },
            "error": function(res) {
                console.log(res);
            }
        })
    }
};