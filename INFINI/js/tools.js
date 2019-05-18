// 完美运动框架
function move(obj,json,fnEnd){
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        var bStop = true; //假设所有值的目标都已经达到
        for(var attr in json){

            var current = 0;
            if(attr == "opacity")
            {
                current = Math.round(parseFloat(getStyle(obj,attr))*100);
            }
            else
            {
                current = parseInt(getStyle(obj,attr));
            }

            var speed = (json[attr] - current)/6;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            if(current != json[attr])
            {
                bStop = false; //判断每个目标是否到达，只要没到达，就将bStop=false
            }

            if(attr == "opacity")
            {
                obj.style.opacity = ( current + speed )/100;
                obj.style.filter = "alpha(opacity:"+ (current + speed) +")";
            }
            else
            {
                obj.style[attr] = current + speed + "px";
            }

        }

        //运动停止条件
        if(bStop)
        {
            clearInterval(obj.timer);
            if(fnEnd)fnEnd();
        }

    },30);

}

//链式运动框架  (带有对透明度的处理)  而且运动的速度有快到慢   推荐使用
//https://github.com/zlqGitHub/HTML-CSS-JS/tree/master/JS框架
function move2(obj,attr,iTarget,fnEnd){
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){

        var current = 0;
        if(attr == "opacity")
        {
            current = Math.round(parseFloat(getStyle(obj,attr))*100);   //Math.round 四舍五入
        }
        else
        {
            current = parseInt(getStyle(obj,attr));
        }

        var speed = (iTarget - current)/1.1;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

        if(current == iTarget)
        {
            clearInterval(obj.timer);
            if(fnEnd)fnEnd();   //首先判断是否有回调函数
        }
        else
        {
            if(attr == "opacity")
            {
                obj.style.opacity = ( current + speed )/100;
                obj.style.filter = "alpha(opacity:"+ (current + speed) +")";
            }
            else
            {
                obj.style[attr] = current + speed + "px";
            }
        }

    },30);
}

//获取任何元素的属性值，从浏览器的角度出发
function getStyle(obj,name){
    //兼容性处理
    //火狐、谷歌上的兼容
    if(window.getComputedStyle){
        return getComputedStyle(obj,null)[name];
    }
    //IE上兼容
    else{
        return obj.currentStyle[name];
    }
}
// 改变切换按钮透明度
function changeOpacity(obj,x){
    obj.style.opacity = x/100;
    obj.style.filter = "alpha(opacity:"+x+")";
}

//点击时触发  用来设置iframe高度
var timerH;
function  _click(obj) {
    setHeight();
    timerH = setTimeout(function () {
        _click(obj);
    },0);
}

//设置iframe高度
function setHeight() {
    Height = parseFloat(sessionStorage.getItem("ofHeight")) + 100;
    // Height = Height.toString();
    // console.log(typeof Height);
    // iframe.height = Height;
    // iframe.style.height = Height + "px";
    move2(iframe,"height",Height);
}

//二、为对象绑定事件   https://github.com/zlqGitHub/HTML-CSS-JS/commit/ddec754292d5f39d6a8274a706a691f723d87031
/*
	定义个函数，来为指定的元素绑定响应函数
		参数：1.obj 要绑定事件的duix
		      2.eventStr 事件的字符串 (不要on)
		      3.callback 回调函数

 */
function bind(obj,eventStr,callback){
    if(obj.addEventListener){
        //大部分浏览器
        obj.addEventListener(eventStr,callback,false);
    }else{
        /*
            this是由调用方式决定
            callback.call(obj)  可以修改this

         */

        //IE8一下的浏览器
        // obj.attachEvent("on"+eventStr,callback);
        obj.attachEvent("on"+eventStr,function(){
            /*
                call()方法为函数对象的方法，可以改变调用函数的对象(参数是谁谁就是this)，此处的this指obj对象
             */
            callback.call(obj);   //使得对象obj执行回调函数
            console.log("IE执行");
        });

    }
}

//三、类的操作
//定义一个函数，用来向一个元素中添加指定的class属性值
/*
	参数：obj 要添加class属性的元素
		  cn(className) 要添加的属性值
 */
function addClass(obj , cn){
    if(!hasClass(obj,cn)){
        obj.className += " " + cn;
    }
}
//定义一个函数判断元素中是否含有className
/*
	参数：obj 要判断的元素
		  cn(className) 要判断的属性值
	如果有返回true 否则返回false
 */
function hasClass(obj , cn){
    //通过正则式去判断
    // var reg = /b2/;      //表示字符串中是否有b2
    // var reg = /\bb5\b/;   //表示字符串中是否有独立的 b5 存在
    // var reg = /\bcn\b/;     这样的话cn不能作为变量来使用，因此使用构造函数(new)

    var reg = new RegExp("\\b"+cn+"\\b");  //转义字符
    // alert(reg);
    return reg.test(obj.className);
}
//定义一个函数删除元素的class属性值
function removeClass(obj , cn){
    var reg = new RegExp("\\b"+cn+"\\b");
    //使用replace将class属性值替换为空
    obj.className = obj.className.replace(reg , "");
}
//定义一个函数用来切换class
/*
	toggleClass()
		如果元素有cn则删除
		如果没有则添加
 */
function toggleClass(obj , cn){
    var reg = /\ {1,}/g;
    // alert(reg);
    obj.className = obj.className.replace(reg , " ");     //清除掉多余的空格
    if(hasClass(obj , cn)){
        removeClass(obj , cn);
    }
    else{
        addClass(obj , cn);
    }
}



/*
	JS中去除字符串两端的空格
 */
function trim(str){ //删除左右两端的空格
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
function ltrim(str){ //删除左边的空格
    return str.replace(/(^\s*)/g,"");
}
function rtrim(str){ //删除右边的空格
    return str.replace(/(\s*$)/g,"");
}