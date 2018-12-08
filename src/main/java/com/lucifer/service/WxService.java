package com.lucifer.service;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.lucifer.exception.WxAuthenticationException;
import com.lucifer.mapper.WxUserMapper;
import com.lucifer.model.WxInfo;

import com.lucifer.utils.Constant;
import com.lucifer.utils.HttpClientUtils;

import org.apache.http.Header;
import org.apache.http.HttpException;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.hibernate.validator.internal.util.privilegedactions.GetMethod;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;
import java.util.UUID;

/**
 * Created by Administrator on 2017/6/24.
 */
@Component
public class WxService {

    @Value("${wx.secret}")
    private String secret;

    @Value("${wx.appId}")
    private String appId;

    @Resource
    private WxUserMapper wxUserDao;

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    final Logger logger = LoggerFactory.getLogger(this.getClass());

    private ObjectMapper objectMapper = new ObjectMapper();

    @PostConstruct
    public void init(){
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    public WxInfo getWxInfo(String code) throws IOException, WxAuthenticationException, JSONException {
        String url =  "https://api.weixin.qq.com/sns/oauth2/access_token?appid=#{appId}&secret=#{secret}&code=#{code}&grant_type=authorization_code";
        url = url.replace("#{appId}",appId);
        url = url.replace("#{secret}",secret);
        url = url.replace("#{code}",code);
        logger.info("url is : {}",url);
        String resultString = HttpClientUtils.get(url);
        //JSONObject resultJ=  new JSONObject(resultString);
        logger.info("resultString is : {}",resultString);
        Map resultMap = objectMapper.readValue(resultString,Map.class);
        //WxInfo wxInfo = objectMapper.readValue(resultString,WxInfo.class);
        WxInfo wxInfo = new WxInfo();

        if (resultMap.get("errcode") !=  null) {
            throw new WxAuthenticationException("认证失败");
        }

        wxInfo.setAccessToken((String) resultMap.get("access_token"));
        wxInfo.setWxId((String) resultMap.get("openid"));

        this.syncWeixinUserInfo(wxInfo);
        return wxInfo;
    }

    private void syncWeixinUserInfo(WxInfo user) throws IOException, JSONException {
        JSONObject jsonObject = this.getWeixinUserInfo(user.getAccessToken(), user.getWxId());
        user.setAvatar(jsonObject.getString("headimgurl"));
        user.setNickName(jsonObject.getString("nickname"));
        //user.setCity(jsonObject.getString("city"));
        //user.setProvince(jsonObject.getString("province"));
    }

    private JSONObject getWeixinUserInfo(String accessToken,String openId) throws  IOException, JSONException {
        HttpClient httpClient = HttpClients.createDefault();
        HttpGet httpGet = new HttpGet("https://api.weixin.qq.com/sns/userinfo?access_token="+accessToken+"&openid="+openId);
        //GetMethod get = new GetMethod("https://api.weixin.qq.com/sns/userinfo?access_token="+accessToken+"&openid="+openId);
        HttpResponse httpResponse = httpClient.execute(httpGet);
        Header[] headers = httpResponse.getAllHeaders();
        int statusCode = httpResponse.getStatusLine().getStatusCode();
        logger.info("statusCode:"+statusCode);
        for(Header h : headers){
            //log.info(h);
        }
        String result = EntityUtils.toString(httpResponse.getEntity());
        logger.info(result);
        JSONObject resultJ=  new JSONObject(result);
        return resultJ;
    }

    public void loginByCode(String code,  HttpServletResponse response) throws JSONException, WxAuthenticationException, IOException {
        WxInfo wxInfo = this.getWxInfo(code);
        WxInfo dbWxInfo = wxUserDao.getWxUserByWxId(wxInfo.getWxId());
        if (null == dbWxInfo) {
            wxUserDao.insertWxUser(wxInfo);
        }
        String token = UUID.randomUUID().toString();
        //stringRedisTemplate.opsForValue().set(Constant.CACHE_KEY_PERSISTENCE_TOKEN_PRE+token,wxInfo.getWxId());
        this.writeToken(token,wxInfo.getWxId());
        Cookie c2 = new Cookie("token",token);
//设置生命周期为1小时，秒为单位
        c2.setPath("/");
        c2.setMaxAge(12 * 30 * 24 * 3600);
        response.addCookie(c2);
    }

    public void writeToken(String token,String wxId){
        stringRedisTemplate.opsForValue().set(Constant.CACHE_KEY_PERSISTENCE_TOKEN_PRE+token,wxId);
    }
    public String getWxIdByToken(String token){
        return stringRedisTemplate.opsForValue().get(Constant.CACHE_KEY_PERSISTENCE_TOKEN_PRE+token);
    }

}
