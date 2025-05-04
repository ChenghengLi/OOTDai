<template>
  <!-- <div class="header w-100">
   <h1>
    LEVEL OF C.
   </h1>
  </div> -->
  <div class="w-100">
   <article>
    <div class="">
     <div class="card" @click="mysteryControl">
        <div class="img-container">
            <img :src="require('@/assets/images/mystery.png')" />
        </div>
        <div class="card-content">
          <h2 class="card-title red">
           MYSTERY
          </h2>
          <div class="card-subtitle">
            <h3>DESIGNER'S CHOICE</h3>
          </div>
          <p class="card-text">
           LIMITED to <br> V pet social media
          </p>
          <p class="controlcard-footer">
           3 MIN
          </p>
     </div>
     </div>
    </div>
    <div class="">
     <div class="card" @click="mediumControl">
      <div class="img-container">
        <img :src="require('@/assets/images/half.png')"/>
      </div>
      <div class="card-content">
        <h2 class="card-title pink">
            HALF
           </h2>
           <div class="card-subtitle">
             <h3 class="pink">
                 TOP PICK
             </h3>
           </div>
           <p class="card-text">
            LIMITED to <br>V pet social media
           </p>
           <p class="controlcard-footer">
            6 MIN
           </p>
      </div>
    
     </div>
    </div>
    <div class="">
     <div class="card" @click="fullControl">
      <div class="img-container">
        <img :src="require('@/assets/images/full.png')"/>
      </div>
      <div class="card-content">
        <h2 class="card-title orange">
            FULL
           </h2>
           <div class="card-subtitle">
             <h3></h3>
           </div>
           <p class="card-text">
            FOR EVERYONE
           </p>
           <p class="controlcard-footer">
            9 MIN
           </p>
      </div>
     </div>
    </div>
   </article>
  </div>
</template>

<script>
import FullControl from './products/FullControl.vue';

export default {
    name: "ControlCardDisplayer",
    props: {
      receiveControl: Function
    },
    methods: {
      mysteryControl() {
        this.receiveControl("mystery");
      },
      mediumControl() {
        this.receiveControl("medium");
      },
      fullControl() {
        this.receiveControl("full");
      }
    }
}
</script>

<style>
        img{
            vertical-align: top;
        }
        *{
            margin: 0;
            padding: 0;
            padding-block: 0;
        }
        @font-face {
            font-family: 'Harmoni';
            src: url(@/assets/font/Harmoni.ttf);
        }
        @font-face{
            font-family: 'FZDeSaiHei125S-R-GB';
            src: url(@/assets/font/FZDeSaiHei125S-R-GB.ttf)
        }
        @font-face{
            font-family: 'Playfair Display';
            src: url(@/assets/font/PlayfairDisplay-Bold-4.ttf);
        }
        body {
            font-family: League Spartan,sans-serif;
        }
        .navbar {
            background-color: #f8f5ec;
        }
        .navbar-brand {
            color: #d97b6c;
            font-family: 'Playfair Display', serif;
            font-size: 1.5rem;
        }
        .navbar-nav > li > a {
            color: #333;
        }
        .btn-signup {
            background-color: #d97b6c;
            color: white;
        }
        .header {
            text-align: center;
            margin-top: 3.125rem;
            margin-bottom: 20px;
        }
        .header h1 {
            font-family: 'Playfair Display', serif;
            font-size: 7.5625rem;
            color: #a0c3a3;
        }
        .card {
            display: flex;
            flex-direction: column;
            border: 1px solid #d3c7b7;
            border-radius: 165px;
            text-align: center;
            padding: 17.5px;
            margin: 8.75px;
            position: relative;
            height: 762px;
            width: 330px;

        }
        .card .img-container {
            height: 276px;
            text-align: center;
            line-height: 276px;
        }
        .card-title {
            font-family: 'Harmoni', serif;
            font-size: 96px;
            line-height: 76.8px;
            text-align: center;
            margin: 0px;
            margin-top: 15px;
        }
        .card-subtitle {
            display: flex;
            flex-direction: column;
            justify-content: center;
            font-family: 'Playfair Display', serif;
            height: 130px;
            color: #d3c7b7;
            margin: 0px;
            margin-top: -20px;
        }
        .card-subtitle h3 {
            margin: 0px;
            font-size: 61px;
            vertical-align:middle;
        }
        .card-text {
            font-size: 26px;
            padding-block: 0rem;
            color: #333;
            margin: 0px;
            margin-top: 44px;
            height: 62px;
            font-family: Lustria, Lustria-Regular;
        }
        .controlcard-footer {
            font-size: 23px;
            color: #333;
            margin-top: 27px;
            font-family: GlacialIndifference, GlacialIndifference-Bold;
            height: 27px;
            line-height: 27px;
            font-weight: 700;
            padding-block: 0rem;
        }
        .red {
            color: #ba554c;
        }
        .pink {
            color: #e7b9b4;
        }
        .orange {
            color: #f19586;
        }
        article {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
        }
        @media screen and (max-width: 768px) {
            div{
                box-sizing: border-box;
            }
            article {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .card {
                margin: 0 5.1615vmin;
                width: 85.6771vmin;
                flex-direction: row;
                height: 36.4583vmin;
                border-radius: 18.22915vmin;
                margin-bottom: 4.1667vmin;
            }
            .card .img-container {
                height: 27.474vmin;
                width: 26.0417vmin;
                margin-left: 4.5104vmin;
                margin-top: 2vmin;
            }
            .card .img-container img{
                width: 100%;
                height: 100%;
                
            }
            .card-content {
                flex: 1;
                display: block;
                height: 27.474vmin;
            }
            .card-title{
                font-size: 7.5521vmin;
                line-height: 9.5vmin;
                margin-top: 4.2969vmin;
            }
            .card-subtitle{
                margin: 0;
                padding: 0;
                height: 2.7344vmin;
                margin-top: -0.651vmin;
            }
            .card-subtitle h3{
                font-family: Playfair Display, Playfair Display-Bold;
                font-weight: 700;
                font-size: 4.0365vmin;
                line-height: 2.7344vmin;
            }
            .card-text {
                font-size: 2.474vmin;
                margin-top: 1.9531vmin;
                height: 8.0729vmin;
            }
            .controlcard-footer{
                font-size: 2.3438vmin;
                margin-top: 0;
                height: 2.7514vmin;
                line-height: 2.7514vmin;
            }
        }
</style>
