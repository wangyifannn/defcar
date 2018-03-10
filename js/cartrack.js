 $(".guijibox").hide();
 $(".controlbox").show();
 $(".uparrow").click(function() {
     $(".control_box").slideToggle("slow");
 });

 $(".curr_btn").click(function() {
     $(".controlbox").show();
     $(".guijibox").hide();
     $(".pointerTabLeft").removeClass("pointerTabRight");
 });
 $(".guiji_btn").click(function() {
     console.log("guiji");
     $(".guijibox").show();
     $(".controlbox").hide();
     $(".pointerTabLeft").addClass("pointerTabRight");
 });
 //时间选择器
 var myDate = new Date();
 console.log(myDate);
 var date2 = new Date(myDate);
 date2.setDate(myDate.getDate() - 30);
 console.log(date2);

 laydate.render({
     elem: '#startDate',
     type: 'datetime',
     value: date2,
     theme: '#041473' //自定义颜色主题
 });
 laydate.render({
     elem: '#endDate',
     type: 'datetime',
     value: myDate,
     theme: '#041473' //自定义颜色主题

 });


 // 清楚地图覆盖物
 function Clear(inputid) { //清除
     map.clearOverlays(); //清除图层覆盖物
     //  document.getElementById(inputid).value = ""; //清除搜索框结构
 }



 $("#currenttrack_btn").click(function() {
     console.log("实时轨迹按钮");
     $("#cmapcontainer").show();
     $("#amapcontainer").hide();
     console.log("隐藏#amap");
     Clear("current_input");
     searchCurrentcar();
     //  searchCar();
     //  setTimeout(searchCar, 1000); //动态生成新的点。
 });
 //回车提交事件
 $("body").keydown(function() {
     if (event.keyCode == "13") { //keyCode=13是回车键
         // console.log(this);
         //  map.clearOverlays(); //清除图层覆盖物
         //  searchCar();
     }
 });