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