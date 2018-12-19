
var intervalId = null;
var processCurrent = 0;
var increaseQuantity = 5;
function increaseProcess(){
    processCurrent = processCurrent + increaseQuantity;
    if (processCurrent>99) {
        processCurrent = 99;
    }
    resetIncreaseQuantity();
    showProcess(processCurrent);
}
function resetIncreaseQuantity(){
    if (processCurrent < 20) {
        increaseQuantity = 5;
    }else if (processCurrent < 40) {
        increaseQuantity = 4;
    }else if (processCurrent < 60) {
         increaseQuantity = 3;
    }else if (processCurrent < 80) {
          increaseQuantity = 2;
    }else if (processCurrent < 90) {
       increaseQuantity = 1;
     }
}

function showProcess(process){
    $(".process-text").text(process +  "%");
    $(".process-line-relative").css("width",process +  "%");
}

//页面 ready 完成开始显示进度条加载效果
$(document).ready(function(){
    intervalId = setInterval(increaseProcess,500)
});

//页面 load 完成 显示 100% 并显示下一页
$(window).on("load",function(){
    if (clearInterval <60 ){
        setTimeout(doLoadFinish,2000);
    }else {
        doLoadFinish();
    }
});

function doLoadFinish(){
    clearInterval(intervalId);
    processCurrent = 100;
    showProcess(processCurrent);
    setTimeout(toInitPage,1000);
}

function toInitPage(){
    swiper.slideTo(1);
}

$(document).ready(function(){
    $(".button-start").touchClick(function (){
        swiper.slideTo(3);
        setTimeout(openRuleAlert,200);
    });
});

function openRuleAlert(){
    layer.open({
          type: 1,

          title: false, //不显示标题
          skin: 'rule-alert',
          style: 'position:fixed;  width: 90%; height: 45%; border:none;',

          content: $('#page-alert-rule'), //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
          area: ['90%', '45%'],
           closeBtn: 0 //不显示关闭按钮
        });
}

function closeRuleAlert(){
    layer.closeAll();
    parent.layer.closeAll();
    startCountDown();
}

var intervalCountDown = null;

var indexCountDown = 60;

function startCountDown(){
    indexCountDown = 60;
    intervalCountDown = setInterval(countDownNext, 1000);
}

function countDownNext(){
    indexCountDown = indexCountDown - 1;
    if (indexCountDown < 0) {
        indexCountDown = 0;
    }
    var number10Position = indexCountDown / 10;
    number10Position = parseInt(number10Position);
    $(".second-1").attr("src","/images/4/" + number10Position + ".png");

    var numberPosition = indexCountDown % 10;
    numberPosition = parseInt(numberPosition);
     $(".second-2").attr("src","/images/4/" + numberPosition + ".png");

}

$(function(){
    $(".cell-btn").click(function () {
        var url = $(this).attr("src").replace("icon","select");
        $(this).attr("src",url);
        $(this).addClass("cell-btn-selected");
        calculateProcess();
    });
});

function calculateProcess(){
       var selectCount = $(".cell-btn-selected").length;

       var number10Position = selectCount / 10;
       number10Position = parseInt(number10Position);
       $(".number-selected-1").attr("src","/images/4/" + number10Position + ".png");

       var numberPosition = selectCount % 10;
       numberPosition = parseInt(numberPosition);
        $(".number-selected-2").attr("src","/images/4/" + numberPosition + ".png");

        if (selectCount == 10) {
            submitSelect();
        }

}

function submitSelect(){
       alert("submit");
}