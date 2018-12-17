
function openWxLogin(){
    //alert(1);
  var lineLink = window.location.href;
  if(lineLink.indexOf("?") != -1)
  {
      lineLink = lineLink.split("?")[0];
      console.log(lineLink);
  }
    setSessionCookie("login_redirect_url",lineLink);
    window.location.href = "/wx/login?random="+Math.random();
}

function getUserInfo(){
    var url = "/wx/get-user-info";
    var request =$.ajax({
       type: 'get',
       url: url,
       dataType: 'json'
    });

    request.fail(function( jqXHR, textStatus ) {
            alert("not ok");
            openWxLogin();
    });

    request.done(function(data) {

        if (data.ok) {
                alert("ok")
        }else {
            alert("not ok");
            openWxLogin();
        }

    });
}

$("document").ready(function(){
    //getUserInfo();
});




var swiper = new Swiper('.swiper-container', {
  direction: 'vertical',
  noSwiping : true,
  autoHeight:true,
  pagination: {
    clickable: true,
  },
});

var startScroll, touchStart, touchCurrent;
swiper.slides.on('touchstart', function (e) {
    startScroll = this.scrollTop;
    touchStart = e.targetTouches[0].pageY;
}, true);
swiper.slides.on('touchmove', function (e) {
    touchCurrent = e.targetTouches[0].pageY;
    var touchesDiff = touchCurrent - touchStart;
    var slide = this;
    var onlyScrolling =
            ( slide.scrollHeight > slide.offsetHeight ) && //allow only when slide is scrollable
            (
                ( touchesDiff < 0 && startScroll === 0 ) || //start from top edge to scroll bottom
                ( touchesDiff > 0 && startScroll === ( slide.scrollHeight - slide.offsetHeight ) ) || //start from bottom edge to scroll top
                ( startScroll > 0 && startScroll < ( slide.scrollHeight - slide.offsetHeight ) ) //start from the middle
            );
    if (onlyScrolling) {
        e.stopPropagation();
    }
}, true);