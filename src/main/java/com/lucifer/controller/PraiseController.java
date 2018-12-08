package com.lucifer.controller;

import com.lucifer.mapper.PraiseMapper;
import com.lucifer.utils.Constant;
import com.lucifer.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.Random;

@RestController
public class PraiseController {

    @Autowired
    PraiseMapper praiseMapper;

    @Resource
    private StringRedisTemplate stringRedisTemplate;

    Random random = new Random();

    @RequestMapping(value = "/praise/save")
    public Result praise(){
        //praiseMapper.increase(new Random(10).nextInt());
        stringRedisTemplate.opsForValue().increment(Constant.KEY_TOTAL_PRAISE_COUNT,random.nextInt(10));
        return Result.ok();
    }

    @RequestMapping(value = "/praise/get")
    public Result getPraiseCount(){
        String value =   stringRedisTemplate.opsForValue().get(Constant.KEY_TOTAL_PRAISE_COUNT);
                //praiseMapper.getPraiseCount();
        return Result.ok(Integer.valueOf(value));
    }
}
