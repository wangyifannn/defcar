// 获取验证码，页面加载显示验证码信息
var changecode = 0;
$(".vercode").click(function() {
    changecode++;
    console.log(this.src);
    this.src = "http://192.168.2.228:8080/car-management/user/code.action?changecode=" + changecode;
})

var pass = document.getElementsByClassName("pass_input")[0];
$(document).ready(function() {
    // 密码是否可见
    var flag = false;
    // 点击登录按钮进行判断
    $(".login_btn").click(function() {
        // $.ajax({
        //     url: "http://192.168.2.228:8080/car-management/user/login.action",
        //     type: "get",
        //     data: {
        //         username: $(".user_input").val(),
        //         password: $(".pass_input").val(),
        //         verifyCode: $(".vercode_input").val()
        //     },
        //     dataType: "jsonp", //数据类型为jsonp  
        //     jsonp: "jsonpCallback", //服务端用于接收callback调用的function名的参数  
        //     success: function(data) {
        //         var date = JSON.stringify(data);
        //         console.log(date);
        window.location.href = "../index.html";
        //     }
        // })
    })
})