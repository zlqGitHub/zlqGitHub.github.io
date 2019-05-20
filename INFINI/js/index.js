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
	
	var changeTo;
	// console.log(window.visualViewport.width);
	//当前屏幕大小改变是动态设置mask蒙层的高度
	window.onresize = function(){
		oCurrentW = oImg.offsetHeight;
		for(var i = 0 ; i < oMasks.length ; i++){
			oMasks[i].style.height = oCurrentW + "px";
		}

		//根据页面大小动态处理轮播图的自适应
		changeTo = parseInt(window.visualViewport.width * 0.94);
		
		// console.log(window)
		// if(window.innerWidth < 1200){
			//获取手机端的屏幕宽度
			document.querySelector("#lunbo").style.width = changeTo + "px";
		// }
		document.querySelector("#lunbo .lunboContainer").style.width = changeTo + "px";
		document.querySelector("#lunbo .lunboContainer .imgs").style.width = changeTo * 6 + "px";
		document.querySelector("#lunbo .lunboContainer .des").style.width = changeTo + "px";
		var changeLis = document.querySelectorAll("#lunbo .lunboContainer .imgs li");
		for(var i = 0 ; i < changeLis.length ; i++){
			changeLis[i].style.width = changeTo + "px";
			// console.log(changeLis[i].style.width)
		}
		
		
	}
	
	
	window.onresize();
	// 点击切换轮播图
	var oContainer = document.querySelector(".lunboContainer");
	var oPrev = document.querySelector(".prev");
	var oNext = document.querySelector(".next");
	var oUl = document.querySelectorAll(".imgs");
	var oLis = document.querySelectorAll(".imgs li");
	var oPs = document.querySelectorAll(".des p");
	var oCircles = document.querySelectorAll(".circles div");
	var currentShow;
	for(var i = 0 ; i < oCircles.length ; i++){
		oCircles[i].index = i;
	}
	for(var i = 0 ; i < oLis.length ; i++){
		oLis[i].index = i;
	}
	oUl[0].style.left = -changeTo + "px";   //默认显示第二张图片
	// console.log(oUl);
	// 上一张
	oPrev.onclick = function(){
		clearTimeout(timer);
		currentShow = document.querySelector(".currentShow");
		//设置des
		console.log(currentShow.index);
		for(var i = 0 ; i < oPs.length ; i++){
			oPs[i].style.top = 25 + "px";
			oPs[i].style.display = "none";
			oCircles[i].style.background = "#999999";
			oCircles[i].style.border = "";
			oCircles[i].style.padding = "";
			if(currentShow.index == 2){
				oCircles[0].style.background = "transparent";
				oCircles[0].style.border = "1px solid #9C9C9C";
				oCircles[0].style.padding = "3px";
				oPs[0].style.display = "block";
				move(oPs[0],{top:0});
			}else if(currentShow.index == 1){
				oCircles[3].style.background = "transparent";
				oCircles[3].style.border = "1px solid #9C9C9C";
				oCircles[3].style.padding = "3px";
				oPs[3].style.display = "block";
				move(oPs[3],{top:0});
			}else if(currentShow.index == 0){
				oCircles[2].style.background = "transparent";
				oCircles[2].style.border = "1px solid #9C9C9C";
				oCircles[2].style.padding = "3px";
				oPs[2].style.display = "block";
				move(oPs[2],{top:0});
			}else{
				oCircles[1].style.background = "transparent";
				oCircles[1].style.border = "1px solid #9C9C9C";
				oCircles[1].style.padding = "3px";
				oPs[1].style.display = "block";
				move(oPs[1],{top:0});
			}		
		}		
		
		if(currentShow.index == 0){
			oUl[0].style.left = -changeTo * (oLis.length-2) + "px";
			oLis[currentShow.index].className = "";
			oLis[oLis.length-3].className = "currentShow";
			move(oUl[0],{left:-changeTo*3});
			return;
		}
		//使用动画效果 
		move(oUl[0],{left:-(currentShow.index-1) * changeTo})
		//切换类
		//清空前一次显示的li元素的类
		currentShow.className = "";
		//设置下一个显示的li元素的类
		oLis[currentShow.index-1].className = "currentShow";
		timer = setInterval(function(){
			oNext.onclick();
		},3000);

	}
	// 下一张
	oNext.onclick = function(){
		currentShow = document.querySelector(".currentShow");
		
		//设置des
		// console.log(currentShow.index);
		for(var i = 0 ; i < oPs.length ; i++){
			oPs[i].style.top = 25 + "px";
			oPs[i].style.display = "none";
			oCircles[i].style.background = "#999999";
			oCircles[i].style.border = "";
			oCircles[i].style.padding = "";
			if(i == currentShow.index){
				oCircles[i].style.background = "transparent";
				oCircles[i].style.border = "1px solid #9C9C9C";
				oCircles[i].style.padding = "3px";
				oPs[i].style.display = "block";
				// oPs[i].style.top = 0 + "px";
				move(oPs[i],{top:0});
			}else if(currentShow.index == 4){
				oCircles[0].style.background = "transparent";
				oCircles[0].style.border = "1px solid #9C9C9C";
				oCircles[0].style.padding = "3px";
				oPs[0].style.display = "block";
				move(oPs[0],{top:0});
			}		
		}
		
		//到最后一张图片的时候
		if(currentShow.index == oLis.length - 2){
			oUl[0].style.left = 0 + "px";
			oLis[currentShow.index].className = "";
			oLis[1].className = "currentShow";
			move(oUl[0],{left:-changeTo});
			return;
		}
		// oUl[0].style.left = -(currentShow.index+1) * changeTo + "px";
		//使用动画效果 
		move(oUl[0],{left:-(currentShow.index+1) * changeTo})
		//切换类
		//清空前一次显示的li元素的类
		currentShow.className = "";
		//设置下一个显示的li元素的类
		oLis[currentShow.index+1].className = "currentShow";
			
		// timer = setInterval(function(){
		// 	oNext.onclick();
		// },3000);
	}
	
	//设置定时器
	timer = setInterval(function(){
		oNext.onclick();
	},3000);
	
	//点击小圆圈触发的事件 
	for(var i = 0 ; i < oCircles.length ; i++){
		oCircles[i].onclick = function(){
			clearTimeout(timer);
			currentShow = document.querySelector(".currentShow");
			move(oUl[0],{left:-changeTo*(this.index+1)});
			oLis[currentShow.index].style.className = "";
			oLis[this.index].style.className = "currentShow";
			for(var i = 0 ; i < oCircles.length ; i++){
				oPs[i].style.top = 25 + "px";
				oPs[i].style.display = "none";
				oCircles[i].style.background = "#999999";
				oCircles[i].style.border = "";
				oCircles[i].style.padding = "";
			}
			oCircles[this.index].style.background = "transparent";
			oCircles[this.index].style.border = "1px solid #9C9C9C";
			oCircles[this.index].style.padding = "3px";
			oPs[this.index].style.display = "block";
			move(oPs[this.index],{top:0});
			
			// setTimeout(function(){
			// 	timer = setInterval(function(){
			// 		oNext.onclick();
			// 	},3000);
			// },3000);
			
		}
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
		
}