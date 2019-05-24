$(function(){
	//获取赠送页面总的所有里元素
	var $lis = $("#contents ul li");
	console.log($lis)
	for(var i = 0 ; i < $lis.length ; i++){
		// tag 属性0代表可领取   1代表已领取
		$($lis[i]).on("click",function(){
			window.location.href = "./buyGift2.html";
		})
		
	}
})