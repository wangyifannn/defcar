// 维修申请
// 车辆编号校验
$("#maintainTypeIn .vSn").bind('input porpertychange', function() {
    console.log($("#maintainTypeIn .vSn").val());
    if ($("#maintainTypeIn .vSn").val() == null || $("#maintainTypeIn .vSn").val() == "") {
        return;
    } else {
        $.ajax({
            url: "http://192.168.0.106:8080/car-management/car/check/" + $("#maintainTypeIn .vSn").val() + "/1.action",
            type: "get",
            "dataType": "jsonp", //数据类型为jsonp  
            "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
            success: function(res) {
                console.log(res);
                if (res.ret == false) {
                    $(".m_vSn_tips").html("车辆编号正确");
                    $("#send_btn").attr("disabled", false);
                    $.ajax({
                        type: "get",
                        url: "http://192.168.0.106:8080/car-management/carMaintain/check/" + $("#maintainTypeIn .vSn").val() + ".action",
                        "dataType": "jsonp", //数据类型为jsonp  
                        "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
                        data: {},
                        success: function(dat) {
                            console.log(dat);
                            if (dat.ret == false) {
                                $(".send_tips").html("车辆已在维修列表");
                                $(".m_vSn_tips").html("车辆已在维修列表");
                                $("#send_btn").attr("disabled", true);
                            } else {
                                $("#send_btn").attr("disabled", false);
                                $(".send_tips").html("");
                            }
                        }
                    });
                } else {
                    $("#send_btn").attr("disabled", true);
                    $(".m_vSn_tips").html("车辆编号不正确");
                }
            }
        });

    }
});

function addmaintain(url, da, that, box) {
    console.log(da);
    $.ajax({
        type: "get",
        url: "http://192.168.0.106:8080/car-management" + url,
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
                loadMaintainList(1, 10, "", "");
                $('#coord_model').modal('hide');
                toastr.success('维修协调员填写信息提交成功', '维修协调员填写', messageOpts);
            } else {
                $(box).html(res.msg);
                $(".maintainform").show();
                toastr.warning('维修协调员填写信息提交失败', '维修协调员填写', messageOpts);
                return;
            }
        }
    });
}
$("#send_btn").click(function() {
    var url = "/carMaintain/PutInCarMaintainApply.action";
    var maintain_form_data = $(".send_form").serializeObject();

    maintain_form_data.send_time = changeDateFormat(new Date().getTime());
    console.log(maintain_form_data);
    var that = this;
    addmaintain(url, maintain_form_data, that, ".send_tips");
});
// 维修协调员填写
$("#m_submit_btn").click(function() {
    var url = "/carMaintain/coordination.action";
    var maintain_form_data = $(".finish_form").serializeObject();
    maintain_form_data.infoid = getHashParameter("id");
    console.log(maintain_form_data);
    var that = this;
    addmaintain(url, maintain_form_data, that, "");
});
// 维修列表
var mainpageNum = 1;

// 初始化加载维修列表
function loadMaintainList(mainpageNum, size, vSn, status) {
    var data;
    var url;
    if (mainpageNum == "" || size == "") {
        alert("维修列表分页参数有误");
        return;
    } else {
        data = {
            "page": mainpageNum,
            "size": size,
            "vSn": vSn,
            "status": status
        }
        url = "http://192.168.0.106:8080/car-management/carMaintain/pageQueryCarMaintain.action";
    }
    console.log(data);
    $.ajax({
        "url": url,
        "type": "get",
        "data": data,
        "success": function(res) {
            console.log(res);
            console.log(res.rows);
            window.location.hash = "pagenum=" + mainpageNum;
            var ress;
            if (res.rows) {
                ress = res.rows;
            } else {
                ress = res;
            }
            $('#tablescreen').bootstrapTable('destroy');
            console.log(ress);
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
    $('#tablescreen').bootstrapTable('destroy');
    $("#tablescreen").bootstrapTable({
        data: res,
        toggle: "table",
        toolbar: toolbarid,
        columns: [
            [{
                "title": "测试车辆维修列表",
                "halign": "center",
                "align": "center",
                // 合并维修列表 表头的列单元
                "colspan": 15
            }],
            [{
                field: 'ids',
                title: "序号",
                valign: "middle",
                align: "center",
                colspan: 1,
                rowspan: 2,
                width: "3%",
                formatter: function(value, row, index) {
                    return index + 1
                }
            }, {
                title: "送修申请表",
                valign: "middle",
                align: "center",
                colspan: 7,
                rowspan: 1
            }, {
                field: 'status',
                title: "当前状态",
                valign: "middle",
                align: "center",
                colspan: 1,
                rowspan: 2,
                width: "5%",
                background: '#BFEBEB',
                formatter: function(value, row, index) {
                    var a = "";
                    if (value == null) {
                        var a = '';
                    } else if (value == "1") {
                        var a = '<span style="color:red">排队中</span>';
                    } else if (value == "2") {
                        var a = '<span style="color:green">维修中</span>';
                    } else if (value == "3") {
                        var a = '<span style="color:blue">已维修</span>';
                    } else {
                        var a = '<span>已完成</span>';
                    }
                    return a;
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
                width: "6%"
            }, {
                field: 'carMaintainApply',
                title: '停放地点',
                valign: "middle",
                align: "center",
                width: "7%",
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
                width: "6%",
                formatter: function(value, row, index) {
                    if (value == null) {
                        return "";
                    } else {
                        return value.sendPeople
                    }
                }
            }, {
                field: 'carMaintainApply',
                title: '维修项目',
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
                title: '送修日期',
                valign: "middle",
                align: "center",
                width: "7%",
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
                title: "要求完成日期",
                valign: "middle",
                align: "center",
                // colspan: 1,
                // rowspan: 2,
                width: "7%",
                background: '#BFEBEB',
                formatter: function(value, row, index) {
                    if (value == null) {
                        return "";
                    } else {
                        return value.appointedtime
                    }
                }
            }, {
                field: 'carMaintainApply',
                title: '备注',
                valign: "middle",
                align: "center",
                width: "5%",
                formatter: function(value, row, index) {
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
                width: "6%",
                formatter: function(value, row, index) {
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
                width: "5%",
                formatter: function(value, row, index) {
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
                width: "5%",
                formatter: function(value, row, index) {
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
                width: "5%",
                formatter: function(value, row, index) {
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
                width: "4%",
                formatter: function(value, row, index) {
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
                width: "12%",
                events: maintainListoperateEvents,
                formatter: maintainListFormatter
            }]
        ]
    })
}

function maintainListFormatter(value, row, index) {
    return [
        '<button type="button" id="btn_maintaindel" class="RoleOfA btn btn-default  btn-sm my_btn" style="margin-right:10px;">删除</button>',
        '<button type="button" id="btn_maintainTop" class="RoleOfA btn btn-default  btn-sm my_btn" style="margin-right:10px;">置顶</button>',
        '<button type="button" id="btn_ChangeStatus" class="RoleOfA btn btn-default  btn-sm my_btn" style="margin-right:10px;margin-top:5px;">维修</button>',
        '<a href="#" data-toggle="tab"><button type="button" id="btn_maintainpeople" class="RoleOfB btn btn-default  btn-sm my_btn" style="margin-right:10px;margin-top:5px;">填写</button></a>'
    ].join('');
}
window.maintainListoperateEvents = {
    'click #btn_maintaindel': function(e, value, row, index) {
        $(this).parent().parent().remove();
        // 删除维修列表操作
        $.ajax({
            "url": "http://192.168.0.106:8080/car-management/carMaintain/delete.action",
            "type": "get",
            "data": {
                "infoid": row.id
            },
            "dataType": "jsonp", //数据类型为jsonp  
            "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数
            "success": function(res) {
                console.log(res);
                if (res.ret) {
                    var indexs = parseInt(index / 10);
                    loadMaintainList(indexs + 1, 10, "", "");
                }
            },
            "error": function(res) {
                console.log(res);
            }
        })
    },
    'click #btn_maintainpeople': function(e, value, row, index) {
        myformReset();
        $("#coord_model #vSn").val(row.vSn);
        $("#coord_model #vSn").attr("readOnly", true);
        $('#coord_model').modal();
        window.location.hash = "pagenum=" + getHashParameter("pagenum") + "&id=" + row.id + "&vSn=" + row.vSn; //车辆数据库编号
    },
    // 置顶操作
    'click #btn_maintainTop': function(e, value, row, index) {
        window.location.hash = "pagenum=" + getHashParameter("pagenum") + "&id=" + row.id + "&vSn=" + row.vSn; //车辆数据库编号
        $.ajax({
            "url": "http://192.168.0.106:8080/car-management/carMaintain/top.action",
            "type": "get",
            "data": {
                "infoid": row.id
            },
            "dataType": "jsonp", //数据类型为jsonp  
            "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数
            "success": function(res) {
                console.log(res);
                if (res.ret) {
                    loadMaintainList(1, 10, "", "");
                }
            },
            "error": function(res) {
                console.log(res);
            }
        })
    },
    // 修改维修状态操作
    'click #btn_ChangeStatus': function(e, value, row, index) {
        var mainArr = [];
        mainArr.push(row.id);
        var mainString = mainArr.join(",");
        window.location.hash = "pagenum=" + getHashParameter("pagenum") + "&id=" + row.id + "&vSn=" + row.vSn; //车辆数据库编号
        $.ajax({
            "url": "http://192.168.0.106:8080/car-management/carMaintain/startMaintain.action",
            "type": "post",
            "data": {
                "ids": mainString
            },
            "dataType": "jsonp", //数据类型为jsonp  
            "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数
            "success": function(res) {
                console.log(res);
                if (res.ret) {
                    toastr.success('维修状态修改成功', '维修', messageOpts);
                    loadMaintainList(1, 10, "", "");
                } else {
                    toastr.warning('维修状态修改失败', '维修', messageOpts);
                }
            },
            "error": function(res) {
                console.log(res);
            }
        })
    }
};
$("#auditLit_search_btn").click(function() {
    $('#tablescreen').bootstrapTable('destroy');
    loadMaintainList(1, 10, $(".mainList_vSn").val(), $("#mainList_status").val());
    // loadCarList(s_data);
});
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
        loadMaintainList(mainpageNum, 10, "", "");
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
        loadMaintainList(mainpageNum, 10, "", "");
        maintainPaging(maxPage, mainpageNum, ".pageMaintain ul", ".pageMaintain li");
        //更新URL的hash
        window.location.hash = "pagenum=" + mainpageNum;
    });
}