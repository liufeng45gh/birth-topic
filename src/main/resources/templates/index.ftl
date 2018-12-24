<html>
<head>
    <meta charset="UTF-8"/>
    <title>.....</title>
    <link rel="stylesheet" type="text/css" href="/css/style.css?version=1.1"/>
    <link rel="stylesheet" type="text/css" href="/css/page.css?version=1.1"/>
    <link rel="stylesheet" href="/swiper/dist/css/swiper.min.css"/>
    <script  src="/js/jquery-3.1.1.js"></script>
    <script  src="/js/jquery.touchClick.js"></script>
    <script src="/swiper/dist/js/swiper.min.js"></script>
    <script  src="/js/common.js"></script>
    <script  type="text/javascript" src="/layer/layer.js"></script>

    <script  type="text/javascript" src="https://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script  type="text/javascript" src="/js/wx-share.js?version=1.1"></script>

</head>
<body>

<audio id="bg-music" controls="controls" loop="loop" autoplay="autoplay"  style="width:0px;height:0px;visibility:hidden;">
    <source src="/music/music-bg.mp3" />
</audio>

<audio id="right-music" preload="auto"  style="width:0px;height:0px;visibility:hidden;">
    <source src="/music/right.mp3" />
</audio>

<audio id="wrong-music" preload="auto" style="width:0px;height:0px;visibility:hidden;">
    <source src="/music/wrong.mp3" />
</audio>

<div id="page-alert-rule" style="display: none;">
    <#include "3-page.ftl">
</div>

<div id="page-alert-success" style="display: none;">
    <#include "3-success.ftl">
</div>

<div id="page-alert-share" style="display: none;">
    <#include "3-share.ftl">
</div>

<div class="swiper-container">
    <div class="swiper-wrapper">
        <div class="swiper-slide swiper-no-swiping">
            <#include "1-page.ftl">
        </div>
        <div class="swiper-slide swiper-no-swiping">
            <#include "2-page.ftl">
        </div>
        <div class="swiper-slide swiper-no-swiping" >
           <div class="blank-div">

           </div>
        </div>

        <div class="swiper-slide swiper-no-swiping">
            <#include "4-page.ftl">
        </div>
        <div class="swiper-slide swiper-no-swiping">
            <#include "5-page.ftl">
        </div>

        <div class="swiper-slide swiper-no-swiping">
            <#include "6-page.ftl">
        </div>


    </div>
    <!-- Add Pagination -->

    <div class="arrow-down" id="nextPage"></div>


</div>



<script  src="/js/index.js?version=1.0"></script>
<script  src="/js/action.js?version-1.0"></script>


</body>


</html>