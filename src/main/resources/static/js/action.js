
var intervalId = null;
var processCurrent = 0;
function increaseProcess(){
    processCurrent = processCurrent + 1;
    if (processCurrent>99) {
        processCurrent = 99;
    }
    showProcess(processCurrent);
}

function showProcess(process){
    $(".process-text").text(process +  "%");
    $(".process-line-relative").css("width",process +  "%");
}

//页面 ready 完成开始显示进度条加载效果
$(document).ready(function(){
    intervalId = setInterval(function(){
    },500)
});

//页面 load 完成 显示 100% 并显示下一页
$(window).load(function(){
    clearInterval(intervalId);
    processCurrent = 100;
    showProcess(processCurrent);
    setTimeout(toInitPage,1000);
});

function toInitPage(){
    swiper.slideTo(2);
}

$(document).ready(function(){
    $(".button-start").touchClick(function (){
        swiper.slideTo(3);
        setTimeout(openRule,2000);
    });
});

function openRule(){
    layer.open({
          type: 1,
          shade: false,
          title: false, //不显示标题
          content: $('#page-alert-rule'), //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
          cancel: function(){
            //layer.msg('捕获就是从页面已经存在的元素上，包裹layer的结构', {time: 5000, icon:6});
          }
        });
}