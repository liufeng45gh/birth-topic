
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
    if (processCurrent < 60 ){
        setTimeout(doLoadFinish,3000);
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
          area: ['90%', '65%'],
           closeBtn: 0 //不显示关闭按钮
        });
}

function closeRuleAlert(){
    layer.closeAll();
    parent.layer.closeAll();
    $("#bg-music").get(0).pause();
    startCountDown();
}

var intervalCountDown = null;

var indexCountDown = 15;

var loadingIndex = null;

function startCountDown(){
    indexCountDown = 15;
    intervalCountDown = setInterval(countDownNext, 1000);
}

function countDownNext(){
    indexCountDown = indexCountDown - 1;
    if (indexCountDown <= 0) {
        indexCountDown = 0;
        clearInterval(intervalCountDown);
        loadingIndex = layer.load(0, {shade: false}); //0代表加载的风格，支持0-2
        setTimeout(submitSelect,5000);
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
        var selectCount = $(".cell-btn-selected").length;
         if (selectCount >= 10) {
            return;
         }
        var url = $(this).attr("src").replace("icon","select");
        $(this).attr("src",url);
        $(this).addClass("cell-btn-selected");
        isRight = $(this).attr("isRight");
        if (isRight == 1) {
            $("#right-music").get(0).play();
        }else{
            $("#wrong-music").get(0).play();
        }
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
            loadingIndex = layer.load(0, {shade: false}); //0代表加载的风格，支持0-2
            setTimeout(submitSelect,5000);
            //submitSelect();
        }

}

function submitSelect(){
       //alert("submit");
       layer.close(layer.index);
       var rightCount = 0;
        $(".cell-btn-selected").each(function (){
             isRight = $(this).attr("isRight");
            if (isRight == 1 ) {
                rightCount ++;
            }
        });

        if (rightCount == 10) {
            swiper.slideTo(5);
        }else if (rightCount == 9) {
            swiper.slideTo(4);
        }else {
            swiper.slideTo(4);
            $("#5-title-lv").attr("src","/images/5/title-lv-1.png");
            $("#5-star").attr("src","/images/5/star-3.png");
        }
        if (isMusicOn) {
            $("#bg-music").get(0).play();
        }

}

$(function(){
    $(".btn-again").touchClick(function (){
        //window.location.href = "?random="+ Math.random();
         var lineLink = window.location.href;
         if(lineLink.indexOf("?") != -1)
         {
             lineLink = lineLink.split("?")[0];
             console.log(lineLink);
         }
       window.location.href = lineLink+"?random=" + Math.random();
    });
});

$(function(){
    $(".btn-share").touchClick(function (){
        //window.location.href = "?random="+ Math.random();
        layer.open({
                type: 1,

                title: false, //不显示标题
                skin: 'rule-alert',


                content: $('#page-alert-share'), //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
                area: ['19rem', '13rem'],
                shadeClose : true,
                offset: ['0rem', ' 21rem'],
                 closeBtn: 0 //不显示关闭按钮
              });
    });
});

$(function(){
    $("#button-info-submit").touchClick(function(){
        var  phone = $(".phone-bound").val();
        if (isEmpty(phone)) {
            //layer.msg('手机号不能为空',{time:1000000*1000});
            layer.msg('手机号不能为空');
            return;
        }

        if(!(/^1[3|4|5|7|8][0-9]\d{8,11}$/.test(phone))){
             layer.msg('手机号格式不正确');
            return ;
        }

        var  realName = $(".real-bound").val();
        if (isEmpty(realName)) {
            layer.msg('真实姓名不能为空');
            return;
        }

        var  department = $(".department-bound").val();
        if (isEmpty(department)) {
            layer.msg('部门不能为空');
            return;
        }
        var data_send = {};
        data_send.phone = phone;
        data_send.name = realName;
        data_send.department = department;

         var url = "/invitation/save";
            var invite_request =$.ajax({
               type: 'post',
               url: url,
               data: data_send,
               dataType: 'json'
            });

            invite_request.fail(function( jqXHR, textStatus ) {
                 //openWeiboLogin();
                layer.msg("操作异常,重复录入的手机号");

            });

            invite_request.done(function(data) {
                   layer.open({
                    type: 1,

                    title: false, //不显示标题
                    skin: 'rule-alert',
                    style: 'position:fixed;  width: 90%; height: 45%; border:none;',

                    content: $('#page-alert-success'), //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
                    area: ['90%', '65%'],
                     closeBtn: 0 //不显示关闭按钮
                  });

            });
    });
})

var isMusicOn = true;
$(function(){
    $(".music-switch").touchClick(function(){

        if (isMusicOn == true) {
             $(".music-switch").attr("src", "/images/2/music-off.jpg");
               $("#bg-music").get(0).pause();
            isMusicOn = false;
        }else {
              $(".music-switch").attr("src", "/images/2/music-on.jpg");
                $("#bg-music").get(0).play();
               isMusicOn = true;
        }

    });
});