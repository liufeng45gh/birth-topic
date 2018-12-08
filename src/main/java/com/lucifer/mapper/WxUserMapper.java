package com.lucifer.mapper;


import com.lucifer.model.WxInfo;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.ResultMap;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

/**
 * Created by Administrator on 2017/6/24.
 */
@Component
public interface WxUserMapper {


    @ResultMap("WxInfoMap")
    @Select("select * from user where wx_id=#{wxId}")
    public WxInfo getWxUserByWxId(@Param("wxId") String wxId);

    @Insert(" insert into user\n" +
            "        (wx_id, nick_name,avatar,created_at,updated_at)\n" +
            "        values\n" +
            "        (#{wxId},#{nickName},#{avatar},now(),now())")
    public Integer insertWxUser(WxInfo wxInfo);
}
