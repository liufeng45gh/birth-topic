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
    <!--
    <script  type="text/javascript" src="https://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script  type="text/javascript" src="/js/wx-share.js?version=1.0"></script>
    -->
</head>
<body>

<div id="page-alert-rule" style="display: none;">
    <#include "3-page.ftl">
</div>

<div class="swiper-container">
    <div class="swiper-wrapper">
        <div class="swiper-slide">
            <#include "1-page.ftl">
        </div>
        <div class="swiper-slide">
            <#include "2-page.ftl">
        </div>
        <div class="swiper-slide" >
           <div class="blank-div">

           </div>
        </div>

        <div class="swiper-slide">
            <#include "4-page.ftl">
        </div>
        <div class="swiper-slide">
            <#include "5-page.ftl">
        </div>

        <div class="swiper-slide">
            <#include "6-page.ftl">
        </div>


    </div>
    <!-- Add Pagination -->

    <div class="arrow-down" id="nextPage"></div>


</div>



<script  src="/js/index.js"></script>
<script  src="/js/action.js"></script>
</body>


</html>