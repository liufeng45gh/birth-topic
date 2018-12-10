package com.lucifer.controller;

import com.lucifer.exception.WxAuthenticationException;

import com.lucifer.model.WxInfo;
import com.lucifer.service.WxService;
import com.lucifer.utils.Result;
import com.lucifer.utils.StringHelper;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by Administrator on 2017/6/23.
 */

@Controller
@RequestMapping("/wx")
public class WxLoginController {

    @Value("${wx.appId}")
    private String AppId;

    @Value("${wx.redirect_uri}")
    private String redirectURI;

    @Resource
    private WxService wxService;




    @RequestMapping(value="/login-by-code",method = RequestMethod.GET)
    public String loginByCode(@RequestParam  String code, HttpServletResponse response, HttpServletRequest request) throws JSONException, WxAuthenticationException, IOException {
        wxService.loginByCode(code,response);
        Cookie[] cookies = request.getCookies();
        String loginRedirectUrl = null;
        if(null != cookies) {
            for (Cookie cookie: cookies) {
                if (cookie.getName().equals("login_redirect_url")) {
                    loginRedirectUrl = cookie.getValue();
                    break;
                }
            }
        }

        if (!StringHelper.isEmpty(loginRedirectUrl)) {
            return "redirect:"+loginRedirectUrl;
        }
        return "redirect:/";
    }

    @RequestMapping(value="/login",method = RequestMethod.GET)
    public String toLogin(){
        return "redirect:https://open.weixin.qq.com/connect/oauth2/authorize?appid="+AppId+"&redirect_uri="+ redirectURI;
        //return "redirect: https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7933d55ea3872f4d&redirect_uri=https%3a%2f%2fwww.jd.com&response_type=code&scope=snsapi_userinfo&state=vote#wechat_redirect";
    }

    @RequestMapping(value="/get-user-info",method = RequestMethod.GET)
    @ResponseBody
    public Result getWxUserByWxId(@CookieValue("token") String wxId){
        if (null == wxId) {
            return Result.fail("no token cookie value");
        }
        WxInfo wxInfo = wxService.getWxUserByWxId(wxId);
        if (null == wxInfo) {
            return  Result.fail("wxInfo get turn out null");
        }

        return Result.ok(wxInfo);
    }
}
