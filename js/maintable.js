var $tablescreen = $('#tablescreen');

$(function() {
    $('#toolbar_tablescreen').find('select').change(function() {
        $tablescreen.bootstrapTable('destroy').bootstrapTable({
            exportDataType: $(this).val()
        });
    });
})

function operateFormattermainScreen(value, row, index) {
    return [
        // '<button type="button" id="btn_mydel" class="RoleOfA btn btn-default  btn-sm" style="margin-right:15px;">轨迹</button>',
        '<button type="button" id="btn_mytetail" class="RoleOfB btn btn-default  btn-sm" style="margin-right:15px;">置顶</button>'
        // '<button type="button" id="btn_mytetail" class="RoleOfB btn btn-default  btn-sm" style="margin-right:15px;">授权</button>'
    ].join('');
}

window.operateEventsmainScreen = {
    'click .RoleOfB': function(e, value, row, index) {
        // alert("B");
        // console.log(this.parentNode.parentNode.children[0].children[0].getAttribute("checked"));
        // console.log(value);
        console.log(row);
    }
};
// 门岗 是否合法
var $sentry = $("#sentry");
// var lasttd = $('#sentry').find('td:last-child').html();
// var lasttd = $sentry.Element.getElementByTagName("td");
// console.log(lasttd);