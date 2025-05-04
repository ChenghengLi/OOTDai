<template>
  <div>
    <div class="quote-container clearfix">
        <div class="text-left">
            <div class="central-part red-font">"central part of</div> 
            <div class="exceptional red-font">"Exceptional</div>
            <div class="family red-font">FAMILY"</div>
            <div class="visual-stimuli red-font">associated visual stimuli"</div>
            <div class="miss-you red-font">I MISS YOU</div>
        </div>
            
        <div class="text-right">
            <div class="start-building start">START</div>
            <div class="start-building building">BUILDING</div>
            <div class="story">what’s your story?</div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'ProfileCardDisplayer',
    data() {}
}
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    @font-face {
        font-family: 'radley';
        src: url(@/assets/font/Radley-Regular.ttf);
    }
    @font-face {
        font-family: 'kage';
        src: url(@/assets/font/KAGE_DEMO_FONT-Black.otf);
    }
    @font-face{
        font-family: 'anton';
        src: url(@/assets/font/Anton-Regular.ttf);
    }
    @font-face{
        font-family: 'intro-script';
        src: url(@/assets/font/IntroScriptDemo-Medium.otf);
    }
    @font-face {
        font-family: 'Horizon';
        src: url(@/assets/font/Horizon.otf);
    }
    @font-face{
        font-family: 'lustria';
        src: url(@/assets/font/Lustria-Regular.ttf);
    }
    @font-face{
        font-family: 'aemstel-lineoutside';
        src: url(@/assets/font/aemstel-lineoutside.otf);
    }
    .red-font{
        color: #ba554c;
    }
    body {
        font-family: 'Roboto', sans-serif;
        background-color: #f8f9fa;
    }
    .central-part{
        position: absolute;
        top: 0;
        right: 4.5313vw;
        font-size: 3.9063vw;
        font-family: radley, serif;
        width: 26.1979vw;
        height: 4.6875vw;
        line-height: 4.6875vw;
    }
    .exceptional {
        position:absolute;
        right: 25.2083vw;
        top: 0;
        width: 20.3646vw;
        height: 6.0417vw;
        font-size: 4.1667vw;
        font-family: kage, serif;
        line-height: 20.3646vw;
        z-index: 1;
    }
    .family{
        position: absolute;
        right: 0vw;
        top: 4.2188vw;
        height: 7.2396vw;
        width: 25.6771vw;
        line-height: 7.2396vw;
        font-size: 8.3854vw;
        font-weight: 700;
        font-family: Anton, Anton-Regular;
        
    }
    .visual-stimuli{
        position: absolute;
        top: 12.3438vw;
        right: 3.3333vw;
        height: 4.0104vw;
        width: 39.2188vw;
        font-family: intro-script, serif;
        font-size: 3.9583vw;
        line-height: 4.0104vw;
        height: 4.0104vw;
        font-weight: 700;
    }
    .miss-you{
        position: absolute;
        right: 0.3125vw;
        top: 16.25vw;
        height: 5.1042vw;
        line-height: 5.1042vw;
        width: 40.6771vw;
        font-family: Horizon, sans-serif;
        font-size: 5.2083vw;
        font-weight: 700;
    }
    .start-building {
        font-family: aemstel-lineoutside, sans-serif;
        color: #d3e0dc;
        font-size: 6.7188vw;
        font-weight: bold;
    }
    .start {
        position: absolute;
        width: 23.2813vw;
        height: 6.7188vw;
        line-height: 6.7188vw;
        top: 3.1771vw;
        left: 3.125vw;
    }
    .building{
        position: absolute;
        width: 28.0729vw;
        height: 6.7188vw;
        line-height: 6.7188vw;
        top: 11.0938vw;
        left: 0.7161vw;
    }
    .story {
        position: absolute;
        top: 18.2813vw;
        left: 6.0938vw;
        width: 29vw;
        height: 3.0729vw;
        font-family: 'Roboto', sans-serif;
        color: #d3e0dc;
        font-size: 3.0729vw;
        text-align: right;
        line-height: 3.0729vw;
        /* margin-top: -1.0417vw; */
    }
    .text-center {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
    .text-left {
        float: left;
        height: 22.6563vw;
        width: 41.6667vw;
        margin-left: 2.0833vw;
        position: relative;
    }
    .text-right{
        float: left;
        height: 22.6563vw;
        width: 35.2604vw;
        position: relative;
    }
    .clearfix:after {
        content: '.';
        height: 0;
        display: block;
        clear: both;
    }
    .hexagon {
        display: inline-block;
        width: 11.25vw;
        height: 13.0729vw;
        background-color: #f8f9fa;
        font-family: lustria, serif;
        clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        margin: 1.0417vw;
        font-size: 0.9375vw;
        font-weight: bold;
        color: white;
        margin-bottom: -2.6042vw;
    }
    .hexagon span {
        display: inline-block;
        margin: 3.125vw 0;
        font-size: 1.8229vw;
        height: 6.7708vw;
    }
    .text-center div:nth-child(1) .hexagon{
        background-color: #e7b9b4;
        line-height: 6.7708vw;
    }
    .text-center div:nth-child(2) .hexagon {
        background-color: #f19586;
        line-height: 6.7708vw;
    }
    .text-center div:nth-child(3) .hexagon {
        background-color: #c2dace;
        line-height: 6.7708vw;
    }
    .text-center div:nth-child(4) .hexagon {
        background-color: #d0ccb9;
        line-height: 1.2;
    }
    .text-center div:nth-child(5) .hexagon {
        background-color: #dbc394;
        line-height: 1.2;
    }
    .quote-container {
        margin-bottom: 2.6042vw;
        width: 79.0104vw;
        margin: 0 auto;
    }

</style>