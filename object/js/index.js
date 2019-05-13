$(function () {
    //jQuery可以多次、重复给元素绑定事件
    $(window).on("resize",function () {
        // console.log($(window).width());
        //获取页面中的所有item
        var $itemAll = $("#carousel .item");
        // console.log($itemAll);

        //获取当前屏幕的大小
        let clientW = $(window).width();
        let isShowBigImage = clientW >= 800;   //设置临界值

        //循环迭代设置对应的轮播图片
        $itemAll.each(function (index,item) {
            //console.log(item);
            //获取到当前需要展示的具体图片路径
            let src = isShowBigImage ? $(item).data("lg-img") : $(item).data("sm-img");
            let imgUrl = 'url("'+src+'")';
            //设置背景
            $(item).css("backgroundImage",imgUrl);

            if(!isShowBigImage){
                let $img = "<img src='"+src+"'>";
                //在加入节点之前需要先清空，否则会出现图片叠加
                $(item).empty().append($img);
            }
            else{
                $(item).empty();
            }
        });
    })
    //页面已加载就开始执行    使用trigger立即执行函数
    $(window).trigger("resize");

    //动态改变产品特色区域的选项卡的滚动
    $(window).on("resize",function () {
        //获取ul及所有的li
        let $ul = $("#product .nav");
        //console.log($ul);
        // let $allLis = $("[role=\"presentation\"]",$ul);
        let $allLis = $("[role='presentation']",$ul);

        //获取父元素及当前ul的宽度
        let parentW = $ul.parent().width();
        let ulW = 0;
        $allLis.each(function (index,item) {
            ulW += $(item).width();
        });

        if(ulW > parentW){
            // $ul.css("width",ulW);
            $ul.css({
                "width": ulW + "px"
            })
        }
        else{
            $ul.removeAttr("style");
        }
    });

    //点击头部选项卡显示出对应的内容
    let allLis = $("#header .nav li");
    let $hot = $("#hot");
    //点击热门课程
    $(allLis[2]).on("click",function () {
        //console.log($hot.offset().top);
        //通过动画效果来实现页面的滚动
        $("html,body").animate({scrollTop:$("#hot").offset().top},1000)
    })

    //点击关于我们
    let $about = $("#about");
    $(allLis[0]).on("click",function () {
        $("html,body").animate({"scrollTop":$about.offset().top},1000);
    });


    // 工具提示框初始化
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
});