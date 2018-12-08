package com.lucifer.mapper;


import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;

public interface PraiseMapper {

    @Update("update  system_value set value = value + #{number} where skey = 'praise_count'")
    Integer increase(@Param(value = "number") Integer number);

    @Update("select value from  system_value where skey =  'praise_count'")
    Integer getPraiseCount();
}
