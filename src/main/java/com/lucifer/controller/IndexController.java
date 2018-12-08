package com.lucifer.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@Controller
public class IndexController {

    @RequestMapping(value = {"/","index"})
    public String index(HttpServletRequest request){
        request.setAttribute("independent",false);
        return  "index";
    }

    @RequestMapping("/test")
    public String test(){
        return  "redirect:/swiper/demos/090-vertical.html";
    }

    @RequestMapping(value = "5-place")
    public String _5_place(HttpServletRequest request){
        request.setAttribute("independent",true);
        return "5-place";
    }


}
