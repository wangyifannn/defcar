// 接车点检
$("#carCheck_btn").click(function() {
    // console.log("ss");
    console.log(window.location.hash);
    console.log($("input[name='carfacade']:checked").val());
    carid = window.location.hash;
    console.log(carid);
    var carCheckdata = {
        "carfacade": $("input[name='carfacade']:checked").val(),
        "item": $("#item").val(),
        "tools": $("#tools").val(),
        "sparetype": $("#sparetype").val(), //备用轮胎
        "jack": $("#jack").val(),
        "warningboard": $("#warningboard").val(),
        "fire": $("#fire").val(),
        "keys": $("#keys").val(),
        "ododmeter": $("#ododmeter").val(),
        "pickone": $("#pickone").val(),
        "telephone": $("input[name='send_iphone']").val(),
        "send_p": $("#send_p").val(),
        "time": $("input[name='receivecar']").val(),
        "vin": $("#vin").val(),
        "engineNumber": $("#engineNumber").val(),
        "carid": carid,
        "remark": $("input[name='remark']").val()
    };
    console.log(carCheckdata);
    // requestTypein(".drivetypein_tips", "http://192.168.0.106:8080/car-management/carDriver/add.action", carCheckdata);
});