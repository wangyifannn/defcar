var $table2 = $('#table2');
$(function() {
    $('#toolbar2').find('select').change(function() {
        $table2.bootstrapTable('destroy').bootstrapTable({
            exportDataType: $(this).val()
        });
    });
})

function operateFormatterdriver(value, row, index) {
    return [
        '<button type="button" id="driver_btn_mydel" class="RoleOfA btn btn-default optionBth  btn-sm" style="margin-right:15px;">授权</button>',
        '<button type="button" id="driver_btn_mytetail" class="RoleOfB btn btn-default optionBth  btn-sm" style="margin-right:15px;">详情</button>'
    ].join('');
}

window.operateEventsdrive = {
    'click #driver_btn_mydel': function(e, value, row, index) {
        console.log(row);
        alert("A");
    },
    'click #driver_btn_mytetail': function(e, value, row, index) {
        // alert("B");
        // console.log(this.parentNode.parentNode.children[0].children[0].getAttribute("checked"));
        // console.log(value);
        console.log(row);
        window.location = "../../bailian/汽车管理系统/html/driverRecord.html";
    }
};