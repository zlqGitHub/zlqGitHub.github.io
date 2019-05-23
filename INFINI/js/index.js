window.onload = function(){
	var timer = null;
	var oImg = document.getElementsByClassName("currentW")[0];
	var oCurrentW = oImg.offsetHeight;    //当前内容区图片的宽度
	var oMasks = document.querySelectorAll(".item .mask");  //获取所有的mask蒙层 
	// console.log(oMasks);
	//页面加载时先设置mask的高度
	for(var i = 0 ; i < oMasks.length ; i++){
		oMasks[i].style.height = oCurrentW + "px";
	}

	//点击导航栏后切换到对应的目录
	var tarbars = document.querySelectorAll(".tarbar li a");
	var oHome = document.getElementById("HOME");
	var oWork = document.getElementById("WORK");
	var oContanct = document.getElementById("CONTANCT");
	var oJoin = document.getElementById("JOIN");
	
	var show1 = document.getElementById("lunbo");
	var show2 = document.getElementById("des");
	var show3 = document.getElementById("links");
	var show4 = document.getElementById("works");
	var show5 = document.getElementById("join");
	var show6 = document.getElementById("footer");
	
	var lunboH = document.getElementById("lunbo").offsetTop;
	var workH = document.getElementById("WORK").scrollHeight;

	var obj = document.documentElement || document.body;

	oHome.onclick = function(){
		changeA(this);
		$("html,body").animate({ scrollTop: 0 });
	}
	
	oWork.onclick = function(){
		console.log(show4.offsetTop)
		changeA(this);
		$("html,body").animate({ scrollTop: show4.offsetTop - 90});
		console.log(show4.offsetTop)
	}
	
	oContanct.onclick = function(){
		$("html,body").animate({ scrollTop: show6.offsetTop });
		changeA(this);
		obj.scrollTop = 2000;
	}
	
	oJoin.onclick = function(){
		changeA(this);
		show1.style.display = "none";
		show2.style.display = "none";
		show3.style.display = "none";
		show4.style.display = "none";
		show5.style.display = "block";
		$("html,body").animate({ scrollTop: 0});
		
	}
	
	//动态切换选项栏a的class
	function changeA(obj){
		for(var i = 0 ; i < tarbars.length ; i++){
			tarbars[i].className = "";
		}
		obj.className = "active";
		console.log(obj.id)
		if(obj.id != "JOIN"){
			show1.style.display = "block";
			show2.style.display = "block";
			show3.style.display = "block";
			show4.style.display = "block";
			show5.style.display = "none";
		}
	}
	
	
	
	//获取所有的li元素及其父元素ul
	var contianer = document.querySelector(".contianer ul");
	var lis = document.querySelectorAll(".contianer ul li");
	//获取所有的des中的p元素
	var ps = document.querySelectorAll(".des p");
	//获取轮播图对应的小圆圈div
	var divs = document.querySelectorAll(".circles div");
	
	for (var i = 0; i < lis.length; i++) {
		lis[i].index = i;
	}
	for (var i = 0; i < ps.length; i++) {
		ps[i].index = i;
		divs[i].index = i;
	}
	
	//获取左右按钮
	var prev = document.querySelector(".prev");
	var next = document.querySelector(".next");
	var currentShow;
	next.onclick = function() {
		clearTimeout(timer);
		currentShow = document.querySelector(".show");
		currentShow.className = ""; //将其类清空
		//切换对应的des
		clearStyle(ps,divs);   //清楚默认样式
		if (currentShow.index == lis.length - 1) {
			contianer.style.left = 0 + "px";
			lis[1].className = "show";
			ps[0].style.display = "block";
			divs[0].style.border = "2px solid #999";
			divs[0].style.background = "transparent";
			// contianer.style.left = -lis[0].offsetWidth + "px";
			move(contianer, {
				left: -lis[0].offsetWidth
			})
			move(ps[0],{top:0});
			start();
			return;
		}
		lis[currentShow.index + 1].className = "show";
		// console.log(currentShow.index)
		ps[currentShow.index].style.display = "block";
		divs[currentShow.index].style.border = "2px solid #999";
		divs[currentShow.index].style.background = "transparent";
		// contianer.style.left = -lis[0].offsetWidth * (currentShow.index+1) + "px";
		move(contianer, {
			left: -lis[0].offsetWidth * (currentShow.index + 1)
		})
		move(ps[currentShow.index],{top:0});
		start();
	
	}
	prev.onclick = function() {
		clearTimeout(timer);
		currentShow = document.querySelector(".show");
		currentShow.className = ""; //将其类清空
		//切换对应的des
		clearStyle(ps,divs);   //清楚默认样式
		if (currentShow.index == 0) {
			contianer.style.left = -lis[0].offsetWidth * (lis.length - 1) + "px";
			lis[lis.length - 2].className = "show";
			ps[lis.length-3].style.display = "block";
			divs[lis.length-3].style.border = "2px solid #999";
			divs[lis.length-3].style.background = "transparent";
			// contianer.style.left = -lis[0].offsetWidth + "px";
			move(contianer, {
				left: -lis[0].offsetWidth * (lis.length - 2)
			})
			move(ps[lis.length-3],{top:0});
			start();
			return;
		}
		if (currentShow.index == 1){
			ps[lis.length-2].style.display = "block";
			divs[lis.length-2].style.border = "2px solid #999";
			divs[lis.length-2].style.background = "transparent";
			move(ps[lis.length-2],{top:0});
		}else{
			ps[currentShow.index-2].style.display = "block";
			divs[currentShow.index-2].style.border = "2px solid #999";
			divs[currentShow.index-2].style.background = "transparent";
			move(ps[currentShow.index-2],{top:0});
		}
		
		lis[currentShow.index - 1].className = "show";
		console.log(currentShow.index)
		// contianer.style.left = -lis[0].offsetWidth * (currentShow.index+1) + "px";
		move(contianer, {
			left: -lis[0].offsetWidth * (currentShow.index - 1)
		})
		start();
	}
	
	//清楚默认的样式
	function clearStyle(obj1,obj2){
		for(var i = 0 ; i < obj1.length ; i++){
			obj1[i].style.display = "none";
			obj1[i].style.top = "25px";
			obj2[i].style.border = "none";
			obj2[i].style.background = "#999";
		}
	}
	
	//设置定时器让轮播图自动播放
	function start(){
		timer = setInterval(res => {
			next.onclick();
		}, 2000)
	}
	start();
	
	//点击小圆圈触发的事件
	for(var i = 0 ; i < divs.length ; i++){
		divs[i].onclick = function(){
			//先清空定时器
			clearTimeout(timer);
			clearStyle(ps,divs);   //清空默认样式
			currentShow = document.querySelector(".show");
			currentShow.className = "";   //将当前显示元素的类去掉
			lis[this.index+1].className = "show";   //给点击后对应索引的元素添加
			move(contianer,{left:-lis[0].offsetWidth * (this.index + 1)})
			console.log(this.index);
			//设置当前小圆圈的样式
			this.style.border = "2px solid #999";
			this.style.background = "transparent";
			//设置对应的des描述
			ps[this.index].style.display = "block";
			move(ps[this.index],{top:0});
			
			//重新启动定时器
			start();
		}
	}
	
	//当前屏幕大小改变是动态设置mask蒙层的高度
	window.onresize = function(){
		oCurrentW = oImg.offsetHeight;
		for(var i = 0 ; i < oMasks.length ; i++){
			oMasks[i].style.height = oCurrentW + "px";
		}
	
		//页面加载时将container的offsetLeft向左移动一张图片大小
		contianer.style.left = -lis[0].offsetWidth + "px";
	}
	window.onresize();
		
}