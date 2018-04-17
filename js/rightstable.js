//加载 权限列表


function loadRightsList() {
    $.ajax({
        "url": "http://192.168.0.106:8080/car-management/permission/permissionList.action",
        "type": "get",
        "dataType": "jsonp", //数据类型为jsonp  
        "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
        "success": function(res) {
            console.log(res);
            $('#rightsList').bootstrapTable('destroy');
            createTable("#rightsList", "toolbar_rightsList", res,
                "pid", "name", "keyWord", "remark", "operator", "createTime", true, true,
                "权限编号", "名称", "关键字", "备注", "创建人", "创建日期",
                true, rightsOperateEventsDel, rightsOperateFormatterDel, "client");
            // createTable("#rightsList", "toolbar_rightsList", res, true, true, "uid");
            var addRightsbtn = document.getElementById("btn_add_rights");
            // 点击添加用戶按鈕
            addRightsbtn.onclick = function() {
                $("#rights_list").hide();
                $("#rights .form-horizontal").show();
                // 确认添加权限
                $(".addrights_btn").click(function() {
                    $.ajax({
                        "url": "http://192.168.0.106:8080/car-management/permission/addPermission.action",
                        "type": "get",
                        "data": {
                            "name": $("input[name='rights_name']").val(),
                            "keyWord": $("input[name='rights_keywords']").val(),
                            "remark": $("input[name='rights_remark']").val()
                        },
                        "dataType": "jsonp", //数据类型为jsonp  
                        "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数
                        "success": function(res) {
                            console.log(res);
                            if (res.ret) {
                                $(".rights_tips").html("添加成功，您可以返回权限列表进行查看");
                            } else {
                                $(".rights_tips").html("添加失败，请联系管理员");
                            }
                        },
                        "error": function(res) {
                            console.log(res);
                            $(".rights_tips").html("添加失败，请联系管理员");

                        }
                    })
                });

                // 取消添加用戶表單
                $(".removerights_btn").click(function() {
                    $("#rights .form-horizontal").hide();
                    $("#rights_list").show();
                    loadRightsList();
                });

                // 重置按鈕
                $(".resetrights_btn").click(function() {
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

var $tableRightsList = $('#rightsList');

function rightsOperateFormatterDel(value, row, index) {
    return [
        '<button type="button" id="rights_btn_mydel" class="RoleOfA btn btn-default optionBth  btn-sm" style="margin-right:15px;">删除</button>'
    ].join('');
}
var rightsdelarr = [];
window.rightsOperateEventsDel = {
    'click #rights_btn_mydel': function(e, value, row, index) {
        console.log(row);
        rightsdelarr.push(row.pid);
        // console.log($(this).parent().parent());
        $(this).parent().parent().remove();
        // 删除权限操作
        $.ajax({
            "url": "http://192.168.0.106:8080/car-management/permission/deletePermission.action",
            "type": "get",
            "data": {
                "pids[]": rightsdelarr
            },
            "dataType": "jsonp", //数据类型为jsonp  
            "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数
            "success": function(res) {
                console.log(res);
                $("#rightsList").bootstrapTable('refresh');
                loadRightsList();
            },
            "error": function(res) {
                console.log(res);
            }
        })
    }
};