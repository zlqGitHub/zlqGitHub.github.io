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
		// console.log(allLi);
		var allLiW = 0;    //所有li的宽度
		for(var i = 0 ; i < allLi.length ; i++){
			allLiW += $(allLi[0]).width();
		}
		if(allLiW > parentW){
			$ul.css({
				"width":allLiW+"px",
				"background":"#333333",
			});
		}
		else{
			$ul.removeAttr("style");
		}
		
		
	});
	
	
	
});
