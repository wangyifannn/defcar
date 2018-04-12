// 维修申请
// 车辆编号校验
$("#maintainTypeIn .vSn").bind('input porpertychange', function() {
    console.log($("#maintainTypeIn .vSn").val());
    if ($("#maintainTypeIn .vSn").val() == null || $("#maintainTypeIn .vSn").val() == "") {
        return;
    } else {
        checkParams("/carMaintain/check/" + $("#maintainTypeIn .vSn").val() + ".action", ".m_vSn_tips", "", "#send_btn");
        // 维修状态校验，验证是否已经在维修列表
        $.ajax({
            type: "get",
            url: "http://192.168.0.222:8080/car-management/carMaintain/check/" + $("#maintainTypeIn .vSn").val() + ".action",
            "dataType": "jsonp", //数据类型为jsonp  
            "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
            data: {},
            success: function(res) {
                console.log(res);
                if (res.ret == false) {
                    $(".send_tips").html("车辆已在维修列表");
                    $("#send_btn").attr("disabled", true);
                } else {
                    $("#send_btn").attr("disabled", false);
                    $(".send_tips").html("");
                }
            }
        });
    }
});

function addmaintain(url, da, that, box) {
    console.log(da);
    $.ajax({
        type: "get",
        url: "http://192.168.0.222:8080/car-management" + url,
        "dataType": "jsonp", //数据类型为jsonp  
        "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
        data: da,
        success: function(res) {
            console.log(res);
            if (res.ret == true) {
                $(box).html(res.msg);
                $(that).parent().attr("href", "#maintainList");
                $('a[href="#maintainList"]').tab('show');
                $(".maintainform").hide();
                loadMaintainList(1, 10);
            } else {
                $(box).html(res.msg);
                $(".maintainform").show();
                return;
            }
        }
    });
}
$("#send_btn").click(function() {
    var url = "/carMaintain/PutInCarMaintainApply.action";
    var maintain_form_data = $(".send_form").serializeObject();
    var that = this;
    addmaintain(url, maintain_form_data, that, ".send_tips");
});
// 维修协调员填写
$("#m_submit_btn").click(function() {
    var url = "/carMaintain/coordination.action";
    var maintain_form_data = $(".finish_form").serializeObject();
    maintain_form_data.id = getHashParameter("id");
    console.log(maintain_form_data);
    var that = this;
    addmaintain(url, maintain_form_data, that, ".maintainPeople_tips");
});
// 维修列表
// 添加一行数据
$("#addrow_btn").click(function() {
    // var randomId = 100 + ~~(Math.random() * 100);
    // $table.bootstrapTable('insertRow', {
    //     index: 0,
    //     row: {
    //         id: randomId,
    //         name: 'Item ' + randomId,
    //         price: '$' + randomId
    //     }
    // });
});
var mainpageNum = 1;

// 初始化加载维修列表
function loadMaintainList(mainpageNum, size, gid) {
    var data;
    var url;
    if (mainpageNum == "" || size == "") {
        alert("维修列表分页参数有误");
        return;
    } else {
        data = {
            "page": mainpageNum,
            "size": size
        }
        url = "http://192.168.0.222:8080/car-management/carMaintain/pageQueryCarMaintain.action";
    }
    $.ajax({
        "url": url,
        "type": "get",
        "data": data,
        "async": false,
        "dataType": "jsonp", //数据类型为jsonp  
        "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
        "success": function(res) {
            window.location.hash = "pagenum=" + mainpageNum;
            console.log(res);
            var ress;
            if (res.rows) {
                ress = res.rows;
            } else {
                ress = res;
            }
            $('#tablescreen').bootstrapTable('destroy');
            initmaintain(ress, "#toolbar_tablescreen");
            var maxPage = Math.ceil(res.total / data.size);
            if (maxPage >= 9) {
                maintainPagings(maxPage, ".pageMaintain ul", ".pageMaintain li");
            } else {
                maintainPaging(maxPage, mainpageNum - 1, ".pageMaintain ul", ".pageMaintain li");
            }
        },
        "error": function(res) {
            console.log(res);
        }
    });
}
// 维修列表
function initmaintain(res, toolbarid) {
    $("#tablescreen").bootstrapTable({
        data: res,
        toggle: "table",
        toolbar: toolbarid,
        editable: true,
        columns: [
            [{
                "title": "测试车辆维修列表",
                "halign": "center",
                "align": "center",
                // 合并维修列表 表头的列单元
                "colspan": 14
            }],
            [{
                field: 'id',
                title: "序号",
                valign: "middle",
                align: "center",
                colspan: 1,
                rowspan: 2,
                width: "3%"

            }, {
                title: "送修申请表",
                valign: "middle",
                align: "center",
                colspan: 6,
                rowspan: 1
            }, {
                field: 'carMaintainApply',
                title: "双方协商日期",
                valign: "middle",
                align: "center",
                colspan: 1,
                rowspan: 2,
                width: "7%",
                background: '#BFEBEB',
                disabled: false, //是否禁用编辑
                formatter: function(value, row, index) {
                    if (value == null) {
                        return "";
                    } else {
                        return value.appointedtime
                    }
                }
            }, {
                title: "维修协调员填写",
                valign: "middle",
                align: "center",
                colspan: 6,
                rowspan: 1
            }],
            [{
                field: 'vSn',
                title: '车辆编号',
                valign: "middle",
                align: "center",
                width: "7%"
            }, {
                field: 'carMaintainApply',
                title: '停放地点',
                valign: "middle",
                align: "center",
                width: "8%",
                formatter: function(value, row, index) {
                    if (value == null) {
                        return "";
                    } else {
                        return value.send_park
                    }
                }
            }, {
                field: 'carMaintainApply',
                title: '送修人',
                valign: "middle",
                align: "center",
                width: "8%",
                formatter: function(value, row, index) {
                    // return value.time
                    if (value == null) {
                        return "";
                    } else {
                        return value.sendPeople
                    }
                }
            }, {
                field: 'carMaintainApply',
                title: '送修日期',
                valign: "middle",
                align: "center",
                width: "8%",
                formatter: function(value, row, index) {
                    // return value.time
                    if (value == null) {
                        return "";
                    } else {
                        return value.send_time
                    }
                }
            }, {
                field: 'carMaintainApply',
                title: '送修原因',
                valign: "middle",
                align: "center",
                width: "8%",
                formatter: function(value, row, index) {
                    // return value.time
                    if (value == null) {
                        return "";
                    } else {
                        return value.reason
                    }
                }
            }, {
                field: 'carMaintainApply',
                title: '备注',
                valign: "middle",
                align: "center",
                width: "10%",
                formatter: function(value, row, index) {
                    // return value.time
                    if (value == null) {
                        return "";
                    } else {
                        return value.send_remark
                    }
                }
            }, {
                field: 'maintenancecoordination',
                title: '工作内容',
                valign: "middle",
                align: "center",
                width: "13%",
                formatter: function(value, row, index) {
                    // return value.time
                    if (value == null) {
                        return "";
                    } else {
                        return value.work
                    }
                }
            }, {
                field: 'maintenancecoordination',
                title: '操作人',
                valign: "middle",
                align: "center",
                width: "8%",
                formatter: function(value, row, index) {
                    // return value.time
                    if (value == null) {
                        return "";
                    } else {
                        return value.operator
                    }
                }

            }, {
                field: 'maintenancecoordination',
                title: '完成日期',
                valign: "middle",
                align: "center",
                width: "8%",
                formatter: function(value, row, index) {
                    // return value.time
                    if (value == null) {
                        return "";
                    } else {
                        return value.finish_time
                    }
                }

            }, {
                field: 'maintenancecoordination',
                title: '停放地点',
                valign: "middle",
                align: "center",
                width: "8%",
                formatter: function(value, row, index) {
                    // return value.time
                    if (value == null) {
                        return "";
                    } else {
                        return value.finish_park
                    }
                }
            }, {
                field: 'maintenancecoordination',
                title: '备注',
                valign: "middle",
                align: "center",
                width: "8%",
                formatter: function(value, row, index) {
                    // return value.time
                    if (value == null) {
                        return "";
                    } else {
                        return value.remark
                    }
                }
            }, {
                field: 'operate',
                title: '操作',
                valign: "middle",
                align: 'center',
                // colspan: 1,
                // rowspan: 2,
                width: "4%",
                events: maintainListoperateEvents,
                formatter: maintainListFormatter
            }]
        ]
    })
}

function maintainListFormatter(value, row, index) {
    return [
        '<button type="button" id="btn_maintaindel" class="RoleOfA btn btn-default  btn-sm" style="margin-right:15px;">删除</button>',
        '<a href="#" data-toggle="tab"><button type="button" id="btn_maintainpeople" class="RoleOfB btn btn-default  btn-sm" style="margin-right:15px;">填写</button></a>'
    ].join('');
}
window.maintainListoperateEvents = {
    'click #btn_maintaindel': function(e, value, row, index) {
        $(this).parent().parent().remove();
        // 删除维修列表操作
        $.ajax({
            "url": "http://192.168.0.222:8080/car-management/carMaintain/delete/" + row.id + ".action",
            "type": "get",
            "data": {},
            "dataType": "jsonp", //数据类型为jsonp  
            "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数
            "success": function(res) {
                console.log(res);
                if (res.ret) {
                    var indexs = parseInt(index / 10);
                    loadMaintainList(indexs + 1, 10, "");
                }
            },
            "error": function(res) {
                console.log(res);
            }
        })
    },
    'click #btn_maintainpeople': function(e, value, row, index) {
        // $(".maintainform").show();
        $("#coord_model #vSn").val(row.vSn);
        $("#coord_model #vSn").attr("readOnly", true);
        $('#coord_model').modal();
        window.location.hash = "pagenum=" + getHashParameter("pagenum") + "&id=" + row.id + "&vSn=" + row.vSn; //车辆数据库编号
    }
};
// 分页---------------------------------------------------------------------
// 分页——————————————————————————————————————————————————————————————————————————————————————————————
function maintainPagings(maxPage, pageul, pageli) {
    var lis = "";
    for (var p = 1; p < 8; p++) {
        lis += "<li>" + p + "</li>";
    }
    $(pageul).html(lis);
    //根据不同情况有不同的7小格的序号编排（看笔记）：
    if (mainpageNum >= 1 && mainpageNum <= 3) {
        $(pageli).eq(0).html("1");
        $(pageli).eq(1).html("2");
        $(pageli).eq(2).html("3");
        $(pageli).eq(3).html("4");
        $(pageli).eq(4).html("…");
        $(pageli).eq(5).html(maxPage - 1);
        $(pageli).eq(6).html(maxPage);
        //cur
        $(pageli).eq(mainpageNum - 1).addClass("cur").siblings().removeClass("cur");
    } else if (mainpageNum <= maxPage && mainpageNum >= maxPage - 2) {
        $(pageli).eq(0).html("1");
        $(pageli).eq(1).html("2");
        $(pageli).eq(2).html("…");
        $(pageli).eq(3).html(maxPage - 3);
        $(pageli).eq(4).html(maxPage - 2);
        $(pageli).eq(5).html(maxPage - 1);
        $(pageli).eq(6).html(maxPage);
        //cur
        $(pageli).eq(mainpageNum - maxPage - 1).addClass("cur").siblings().removeClass("cur");
    } else {
        $(pageli).eq(0).html("1");
        $(pageli).eq(1).html("…");
        $(pageli).eq(2).html(mainpageNum - 1);
        $(pageli).eq(3).html(mainpageNum);
        $(pageli).eq(4).html(mainpageNum + 1);
        $(pageli).eq(5).html("…");
        $(pageli).eq(6).html(maxPage);
        //cur
        $(pageli).eq(3).addClass("cur").siblings().removeClass("cur");
    }
    $(pageli).click(function(event) {
        if ($(this).html() == "…") {
            return;
        }
        //改变信号量
        mainpageNum = parseInt($(this).html());
        //调用ajax，切换分页按钮样式
        // console.log(mainpageNum);
        loadMaintainList(mainpageNum, 10, "");
        maintainPagings(maxPage, ".pageMaintain ul", ".pageMaintain li");
        //更新URL的hash
        window.location.hash = "pagenum=" + mainpageNum;

    });
}


function maintainPaging(maxPage, i, pageul, pageli) {
    $(pageul).html("");
    var lis = "";
    for (var p = 1; p < maxPage + 1; p++) {
        lis += "<li>" + p + "</li>";
    }
    $(pageul).html(lis);
    $(pageli).eq(i).addClass("cur").siblings().removeClass("cur");
    // 点击时间
    $(pageli).click(function(event) {
        //改变信号量
        mainpageNum = parseInt($(this).html());
        //调用ajax，切换分页按钮
        loadMaintainList(mainpageNum, 10, "");
        maintainPaging(maxPage, mainpageNum, ".pageMaintain ul", ".pageMaintain li");
        //更新URL的hash
        window.location.hash = "pagenum=" + mainpageNum;
    });
}