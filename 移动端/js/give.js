$(function(){
	//获取赠送页面总的所有里元素
	var $lis = $(".contents ul li");

	for(var i = 0 ; i < $lis.length ; i++){
		console.log($($lis[i]).attr("tag"));
		// tag 属性0代表可领取   1代表已领取
		$($lis[i]).on("click",function(){
			if($(this).attr("tag") == 0){
				window.location.href = "./canGive.html";
			}
			else{
				window.location.href = "./gived.html";
			}
		})
		
	}
})