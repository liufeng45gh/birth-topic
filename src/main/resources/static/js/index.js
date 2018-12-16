
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