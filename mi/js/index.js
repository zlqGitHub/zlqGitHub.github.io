$(function(){
	// 鼠标移入购物车后，缓慢显示
	$(".car").on("mouseover",function(){
		$(".carInfo").stop().slideDown(300);
	});
	$(".car").on("mouseout",function(){
		$(".carInfo").stop().slideUp(100);
	});
	
	// 当屏幕变小后适配头部滚动条
	$(window).trigger("resize");
	$(window).on("resize",function(){
		var allLi = $("#header .tarbar-left li");
		var $ul = $("#header .tarbar-left");   //ul的宽度
		var parentW = $ul.parent().width();    //ul父元素的宽度
		console.log(parentW);
		var allLiW = 0;    //所有li的宽度
		for(var i = 0 ; i < allLi.length ; i++){
			allLiW += $(allLi[0]).width();
		}
		if(allLiW > parentW){
			$ul.css({
				"width":1349+"px",
				"background":"#333333",
			});
		}
		else{
			$ul.removeAttr("style");
		}
	});
	
	//通过js实现，当鼠标移入是缓慢显示出来，控制小米、红米等的显示、隐藏
	var allLi2 = $("#carousel .mune li");
	// console.log(allLi2);
	for(var i = 0 ; i < allLi2.length ; i++){
		$(allLi2[i]).on("mouseover",function(){
			// console.log($(this)[0]);
			var elem = $(this)[0];
			// console.log(elem.querySelector("div"));
			$(elem.querySelector("div")).stop().slideDown();
		});
		
		$(allLi2[i]).on("mouseout",function(){
			var elem = $(this)[0];
			$(elem.querySelector("div")).stop().slideUp(80);
		});
	}
	
	//input获取、失去焦点后的操作
	var $input = $("#carousel .top .search input");
	var $btn = $("#carousel .top .search button");
	var $inputTip = $("#carousel .top .search .inputTip");
	// console.log($input);
	$input.on("focusin",function(){
		$(this).css({
			borderColor:"#FF6700",
		});
		$btn.css({
			borderColor:"#FF6700",
		});	
		$inputTip.css("display","block");
	});
	$input.on("focusout",function(){
		$(this).css({
			borderColor:"#E0E0E0",
		});
		$btn.css({
			borderColor:"#E0E0E0",
		});
		$inputTip.css("display","none");
	});
	
	//轮播图的实现
	var $lunboUl = $("#carousel .main .lunbo");     //轮播图ul
	var allLunboLis = $("#carousel .main .lunbo li");   //获取所有的轮播图下的li元素
	var allCircles = $("#carousel .main .circleIndex li div"); 	//获取小圆圈指示器
	//console.log(allCircles);
	for(var i = 0 ; i < allLunboLis.length ; i++){
		allLunboLis[i].index = i;
		allCircles[i].index = i;
	}
	
	var timer = null;    //定时器
	//通过点击小圆圈来实现图片的切换,显示当前点击圆圈对应索引的图片
	for(var i = 0 ; i < allCircles.length ; i++){
		$(allCircles[i]).on("click",function(){
			clearTimeout(timer);
			//console.log(this.index);
			// 点击后对轮播图的处理
			$(allLunboLis[this.index]).siblings().removeClass("currentShow");
			$(allLunboLis[this.index]).stop().animate({opacity:0},600);
			$(allLunboLis[this.index]).addClass("currentShow");
			$(allLunboLis[this.index]).stop().animate({opacity:1},800);
			
			// 点击后对小圆圈的处理
			var $otherLi = $(this).parent().siblings();
			for(var i = 0 ; i < 4 ; i++){   //获取排他的元素
				var circleLis = $otherLi[i].querySelector("div");  
				$(circleLis).removeClass("circleShow");
				
			}
			$(this).addClass("circleShow");
			timer = setInterval(function(){
				$next.trigger("click");
			},3500);
			
		});
		
	}
	
	
	var $prev = $("#carousel .main #prev"); 
	var $next = $("#carousel .main #next"); 
	// 上一张
	$prev.on("click",function(){
		var $li = $("[class*=currentShow]",$lunboUl);
		//console.log($li);
		var index = $li[0].index;   //当前激活元素的index
		$(allLunboLis[index]).removeClass("currentShow");
		$(allLunboLis[index]).stop().animate({
			opacity:0
		},600);
		$(allCircles[index]).removeClass("circleShow");
		if(index > 0){
			$(allLunboLis[index-1]).addClass("currentShow");
			$(allLunboLis[index-1]).stop().animate({
				opacity:1
			},800);
			$(allCircles[index-1]).addClass("circleShow");
		}
		else{
			index = allLunboLis.length-1;
			$(allLunboLis[index]).addClass("currentShow");
			$(allLunboLis[index]).stop().animate({
				opacity:1
			},1000);
			$(allCircles[index]).addClass("circleShow");
		}
	});
	
	// 下一张
	$next.on("click",function(){
		var $li = $("[class*=currentShow]",$lunboUl);
		// console.log($li[0])
		var index = $li[0].index;   //当前激活元素的index
		$(allLunboLis[index]).removeClass("currentShow");
		$(allLunboLis[index]).stop().animate({
			opacity:0
		},600);
		$(allCircles[index]).removeClass("circleShow");
		if(index >= allLunboLis.length-1){
			index = 0;
			$(allLunboLis[index]).addClass("currentShow");
			$(allLunboLis[index]).stop().animate({
				opacity:1
			},800);
			$(allCircles[index]).addClass("circleShow");
		}
		else{
			$(allLunboLis[index+1]).addClass("currentShow");
			$(allLunboLis[index+1]).stop().animate({
				opacity:1
			},1000);
			$(allCircles[index+1]).addClass("circleShow");
		}
	});
	
	// 设置定时器使得轮播图自动播放
	timer = setInterval(function(){
		$next.trigger("click");
	},3500);
	
	// 鼠标移入时div向上运动
	var $bottomLeft = $(".bottomLeft");   //获取所有广告区域左边栏的图标
	var $items = $(".animateShow");
	// console.log($items)
	// 左边栏大广告的动画效果
	for(var i = 0 ; i < $bottomLeft.length ; i++){
		$bottomLeft.on("mouseover",function(){
			this.style.position = "relative";
			move(this,{top:-3});
		});
		$bottomLeft.on("mouseout",function(){
			move(this,{top:0});
		});
	}
	// 中间item的动画效果
	for(var i = 0 ; i < $items.length ; i++){
		$items.on("mouseover",function(){
			this.style.position = "relative";
			move(this,{top:-3});
		});
		$items.on("mouseout",function(){
			move(this,{top:0});
		});
	}
	
	// 回到顶部
	var $goTop = $("#goTop");
	// 时刻监听页面的滚动事件，控制回到顶部按钮的显示与隐藏
	$(window).on("scroll",function(){
		console.log($(window).scrollTop());
		if($(window).scrollTop() > 1500){
			$goTop.css("display","block");
		}else{
			$goTop.css("display","none");
		}
	});
	$goTop.on("click",function(){
		$(window).scrollTop(0);
	});
	
	// 点击内容区中的左右按钮后触发的事件
	//内容区第一个容器
	var $container1 = $("#content #ulContainer1 .showList div");
	var $containerPrev1 = $("#content #ulContainer1 .prev2");
	var $containerNext1 = $("#content #ulContainer1 .next2");
	var $containerLis1 = $("#content #ulContainer1 li");
	
	// console.log($container1.width());
	console.log($container1.offset().left);
	var currentLeft = 0 + "px";
	// 点击左按钮
	$containerPrev1.on("click",function(){
		goLeft($container1,$containerLis1)
	});
	// 点击右按钮
	$containerNext1.on("click",function(){
		goRight($container1);
	});
	
	
	//向左移动
	function goLeft($obj1,$boj2){
		$obj1.css({
			position:"absolute",
			left:currentLeft
		});
		if(parseInt($obj1[0].style.left)  == -($boj2.length - 1)*295){
			//点击失效
			return;
		}
		var toLeft = parseInt($obj1[0].style.left) - 295;
		console.log(toLeft)
		move($obj1[0],{left:toLeft});
		currentLeft = toLeft + "px";
	}
	//向右移动
	function goRight($obj1){
		$obj1.css({
			position:"absolute",
			left:currentLeft
		});
		console.log($obj1[0].style.left);
		if($obj1[0].style.left == "0px"){
			//点击失效
			return;
		}
		var toLeft = parseInt($obj1[0].style.left) + 295;
		console.log(toLeft)
		move($obj1[0],{left:toLeft});
		currentLeft = toLeft + "px";
	}
	
	// 自动触发网页提示
	var $webpageTip = $("#webpageTip");
	console.log($webpageTip[0]);
	setTimeout(function(){
		console.log("test");
		$webpageTip[0].click();
	},100);
	
});
