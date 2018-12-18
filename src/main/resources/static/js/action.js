
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