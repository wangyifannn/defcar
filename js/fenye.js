		//信号量
		var pageNum = 1;
		var maxPage = 9;
		clickPaging();
		showData();

		function showData() {
		    $.get("http://192.168.0.106:8080/car-management/car/pageQuery.action?size=10&page=" + pageNum, function(response) {
		        var obj = JSON.parse(response);
		        console.log(obj);
		        var html = '';
		        for (var i = 0; i < obj.postList.length; i++) {
		            // var item = obj.postList[i];
		            // html += `<div class="row">
		            // 			<div class="cols">
		            // 				<div class="col col1"><a href='javascript:;'>${item.name}</a></div>
		            // 				<div class="col col2">${item.postType}</div>
		            // 				<div class="col col3">${item.workPlace}</div>
		            // 				<div class="col col4">${item.recruitNum}</div>
		            // 				<div class="col col5">${item.publishDate}</div>
		            // 				<div class="row_btn"></div>
		            // 			</div>
		            // 			<div class="detail">
		            // 				<div className="serviceCondition">
		            // 					<h5>入职资格： </h5>
		            // 					${item.serviceCondition}</div> 
		            // 				<div className="workContent">
		            // 					<h5>工作内容： </h5>
		            // 					${item.workContent}</div>
		            // 			</div>
		            // 		</div>`;
		        }
		        $(".content").html(html);

		        $(".row").click(function() {
		            $(this).children(".detail").stop(true).slideToggle();
		        })
		    })
		}

		function clickPaging() {
		    //根据不同情况有不同的7小格的序号编排（看笔记）：
		    if (pageNum >= 1 && pageNum <= 3) {
		        // 	 			console.log($("pageNav li"))
		        $(".pageNav li").eq(0).html("1");
		        $(".pageNav li").eq(1).html("2");
		        $(".pageNav li").eq(2).html("3");
		        $(".pageNav li").eq(3).html("4");
		        $(".pageNav li").eq(4).html("…");
		        $(".pageNav li").eq(5).html(maxPage - 1);
		        $(".pageNav li").eq(6).html(maxPage);
		        //cur
		        $(".pageNav li").eq(pageNum - 1).addClass("cur").siblings().removeClass("cur");
		    } else if (pageNum <= maxPage && pageNum >= maxPage - 2) {
		        $(".pageNav li").eq(0).html("1");
		        $(".pageNav li").eq(1).html("2");
		        $(".pageNav li").eq(2).html("…");
		        $(".pageNav li").eq(3).html(maxPage - 3);
		        $(".pageNav li").eq(4).html(maxPage - 2);
		        $(".pageNav li").eq(5).html(maxPage - 1);
		        $(".pageNav li").eq(6).html(maxPage);
		        //cur
		        $(".pageNav li").eq(pageNum - maxPage - 1).addClass("cur").siblings().removeClass("cur");
		    } else {
		        $(".pageNav li").eq(0).html("1");
		        $(".pageNav li").eq(1).html("…");
		        $(".pageNav li").eq(2).html(pageNum - 1);
		        $(".pageNav li").eq(3).html(pageNum);
		        $(".pageNav li").eq(4).html(pageNum + 1);
		        $(".pageNav li").eq(5).html("…");
		        $(".pageNav li").eq(6).html(maxPage);
		        //cur
		        $(".pageNav li").eq(3).addClass("cur").siblings().removeClass("cur");
		    }
		}
		bindEvent();
		//监听
		function bindEvent() {

		    $(".pageNav li").click(function(event) {
		        //写"…"的小格格不能被点击 方式1
		        // 	 			if(event.target.nodeName === "LI"){
		        // 	 				var obj = event.target;
		        // 	 				
		        // 	 				var str=obj.innerText;

		        // 	 				if(str == "…"){
		        // 	 					return;
		        // 	 				}
		        // 	 			}

		        //写"…"的小格格不能被点击 方式2
		        if ($(this).html() == "…") {
		            return;
		        }

		        //改变信号量
		        pageNum = parseInt($(this).html());

		        //调用ajax，切换分页按钮样式
		        showData();
		        clickPaging();

		        //更新URL的hash
		        window.location.hash = pageNum;

		    });
		}