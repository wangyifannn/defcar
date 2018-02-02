var $table = $('#table');
$(function() {
    $('#toolbar').find('select').change(function() {
        $table.bootstrapTable('destroy').bootstrapTable({
            exportDataType: $(this).val()
        });
    });
})

function operateFormatter(value, row, index) {
    return [
        '<button type="button" id="btn_mydel" class="RoleOfA btn btn-default  btn-sm" style="margin-right:15px;">轨迹</button>',
        '<button type="button" id="btn_mytetail" class="RoleOfB btn btn-default  btn-sm" style="margin-right:15px;">详情</button>',
        '<button type="button" id="btn_mytetail" class="RoleOfB btn btn-default  btn-sm" style="margin-right:15px;">授权</button>'
    ].join('');
}

window.operateEvents = {
    'click .RoleOfA': function(e, value, row, index) {

        alert("A");
    },
    'click .RoleOfB': function(e, value, row, index) {
        // alert("B");
        // console.log(this.parentNode.parentNode.children[0].children[0].getAttribute("checked"));
        // console.log(value);
        console.log(row);
        window.location = "../../bailian/汽车管理系统/html/carDetail.html";
    }
};
// window.operateEvents1 = {
//     "click #btn_mydel": function(e, value, row, index) {
//         var $this = $(this.parentNode.parentNode);
//         // console.log($this.attr("className", "selected"));
//         console.log(row.state);
//         if (row.state == true) {
//             $this.removeClass("selected");
//             // console.log($this.children(".bs-checkbox input").prop("checked"));
//             $this.children(".bs-checkbox input").prop("checked", "checked");
//             row.state = false;
//         } else if (row.state == undefined || row.state == false) {
//             row.state = true;
//             // console.log("row.state不等于true,改为" + row.state)
//             $this.children(".bs-checkbox input").prop("checked", "");
//             $this.addClass("selected");
//         }
//         //编辑详情事件
//         // $(this).parent
//         console.log(this);
//         // console.log($(this));
//         console.log(this.parentNode.parentNode.children[0].children[0]);
//         console.log(this.parentNode.parentNode);
//         // console.log(this.parentNode.parentNode.children[0].children[0].getAttribute("checked"));
//         // detailmodal.open();
//     }
// }

// window.operateEvents2 = {
//     "click #btn_mydeail": function(e, value, row, index) {
//         var $this = $(this.parentNode.parentNode);
//         // console.log($this.attr("className", "selected"));
//         console.log(row.state);
//         if (row.state == true) {
//             $this.removeClass("selected");
//             // console.log($this.children(".bs-checkbox input").prop("checked"));
//             $this.children(".bs-checkbox input").prop("checked", "checked");
//             row.state = false;
//         } else if (row.state == undefined || row.state == false) {
//             row.state = true;
//             // console.log("row.state不等于true,改为" + row.state)
//             $this.children(".bs-checkbox input").prop("checked", "");
//             $this.addClass("selected");
//         }
//         //编辑详情事件
//         // $(this).parent
//         console.log(this);
//         // console.log($(this));
//         console.log(this.parentNode.parentNode.children[0].children[0]);
//         console.log(this.parentNode.parentNode);
//         // console.log(this.parentNode.parentNode.children[0].children[0].getAttribute("checked"));
//         // detailmodal.open();
//     }
// }

// function operateFormatter1(value, row, index) {
//     return [
//         '<button id="btn_mydel" type="button" class="RoleOfA btn-default bt-select btn btn-primary">删除</button>',
//     ].join('');
// }

// function operateFormatter2(value, row, index) {
//     return [
//         '<button id="btn_mydeail" type="button" class="RoleOfA btn-default bt-select btn btn-primary car_detail_btn">详情</button>',
//     ].join('');
// }

// var car_detail_btn = document.getElementsByClassName("car_detail_btn");
// var detailBtn = document.getElementById("btn_myimport");
// console.log(detailBtn);
// console.log(car_detail_btn);
// car_detail_btn.onclick = function() {
// window.location = "../html/carDetail.html";
// }