// JavaScript Document
(function($) {
    $.fn.extend({
        "slideUp": function(value) {
            var docthis = this;
            // console.log(docthis);
            //默认参数
            value = $.extend({
                "li_h": "41",
                "time": 2000,
                "movetime": 1500
            }, value)

            //向上滑动动画
            function autoani() {
                $(".line li:first").animate({ "margin-top": 6 - value.li_h }, value.movetime, function() {
                    $(this).css("margin-top", 0).appendTo(".line");
                })
            }

            //自动间隔时间向上滑动
            var anifun = setInterval(autoani, value.time);
            //悬停时停止滑动，离开时继续执行
            $(docthis).children("li").hover(function() {
                clearInterval(anifun); //清除自动滑动动画
            }, function() {
                anifun = setInterval(autoani, value.time); //继续执行动画
            })
        }
    })
})(jQuery)