
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