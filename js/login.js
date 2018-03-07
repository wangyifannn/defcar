// 获取验证码，页面加载显示验证码信息
var changecode = 0;
$(".vercode").click(function() {
    changecode++;
    console.log(this.src);
    this.src = "http://192.168.0.222:8080/car-management/user/code.action?changecode=" + changecode;
})

var pass = document.getElementsByClassName("pass_input")[0];
var users = {};
var successUser = {};
$(document).ready(function() {
    // 获取 localStoage 的userinfo信息
    var local_user = window.localStorage.getItem("userinfo");
    local_user = JSON.parse(local_user);
    console.log(local_user);
    if (local_user != null) {
        $(".pass_input").val(local_user.pass);
        $(".user_input").val(local_user.name);
    }
    // 密码是否可见
    var flag = false;
    // 点击登录按钮进行判断
    $(".login_btn").click(function() {
        // 登录
        $.ajax({
            url: "http://192.168.0.222:8080/car-management/user/login.action",
            type: "get",
            data: {
                username: $(".user_input").val(),
                password: $(".pass_input").val(),
                verifyCode: $(".vercode_input").val()
            },
            dataType: "jsonp", //数据类型为jsonp  
            jsonp: "jsonpCallback", //服务端用于接收callback调用的function名的参数  
            success: function(data) {
                // var date = JSON.stringify(data);
                console.log(data);
                if (data.ret == false) {
                    $(".logininfo_group").html(data.msg);
                    successUser.flag = false;
                } else {
                    $(".logininfo_group").html(data.msg);
                    successUser.name = $(".user_input").val();
                    successUser.pass = $(".pass_input").val();
                    successUser.flag = true;
                    window.localStorage.successUser = JSON.stringify(successUser);
                    window.location.href = "../index.html";
                }
            }
        })
    });

    $("#rember").prop("checked") == false;
    // 选择下次自动登陆。存入localStorage;
    var motionLogin = document.getElementsByName("autologin")[0];
    console.log(motionLogin);
    console.log(motionLogin.checked);
    motionLogin.onclick = function() {
        if (motionLogin.checked) {
            console.log(true);
            users.name = $(".user_input").val();
            users.pass = $(".pass_input").val();
            // users.pass = $.md5($(".pass_input").val());
            console.log(users);
            // localStorage只支持string类型的存储。
            window.localStorage.userinfo = JSON.stringify(users);
        } else {
            console.log(false);
            window.localStorage.removeItem("userinfo");
        }
    }
})