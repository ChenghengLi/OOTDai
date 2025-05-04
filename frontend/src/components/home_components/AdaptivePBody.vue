<template>
   <section class="journey-main">
        <div class="disclaimer">
          <p>
            {{ disclaimer}}
        </p>
        </div>
        <!-- <input type="text" placeholder="Enter species name"> -->
        <br>
        <button @click="onNext">
             Next
         </button>
         <div class="oxytocin">
             <img src="@/assets/journey/oxytocin@2x.png" alt="">
         </div>
         <div class="img1" :style="img1Style">
             <img :src="img1Src" alt="">
         </div>
         <div class="img2" :style="img2Style">
             <img :src="img2Src" alt="">
         </div>
   </section>
  </template>
  
  <script>
  export default {
      name: "AdaptivePBody",
      props: {
          disclaimer: String,
          img1Width: Number,
          img1Height: Number,
          img1Left: Number,
          img1Bottom: Number,
          img2Width: Number,
          img2Height: Number,
          img2Left: Number,
          img2Bottom: Number,
          nextLink: String,
          img1src: {
              type: String,
              // default: () => require('@/assets/journey/parrot@2x.png')
          },
          img2src: {
              type: String,
              // default: () => require('@/assets/journey/gifting@2x.png')
          },
          onNext: {
             type: Function,
             required: true
         }
      },
      data() {
          return {
              windowWidth: window.innerWidth
          };
      },
      computed: {
          isSmallScreen() {
              return this.windowWidth < 768;
          },
          img1Style() {
              console.log('img1Width:', this.img1Width);
              return {
                  width: this.computeVmin(this.img1Width),
                  height: this.computeVmin(this.img1Height),
                  left: this.computeVmin(this.img1Left),
                  bottom: this.computeVmin(this.img1Bottom)
              };
          },
          img2Style() {
              return {
                  width: this.computeVmin(this.img2Width),
                  height: this.computeVmin(this.img2Height),
                  left: this.computeVmin(this.img2Left),
                  bottom: this.computeVmin(this.img2Bottom)
              };
          },
          img1Src(){
            return require(`@/assets/journey/${this.img1src.split('/').pop()}`);
         },
         img2Src(){
            return require(`@/assets/journey/${this.img2src.split('/').pop()}`);
         }
      },
      methods: {
          computeVmin(value) {
              return this.isSmallScreen ? `${value / 7.68}vmin` : `${value}px`;
          },
          handleResize() {
              console.log('window.innerWidth:', window.innerWidth);
              this.windowWidth = window.innerWidth;
          }
      },
      mounted() {
          window.addEventListener('resize', this.handleResize);
      },
      beforeUnmount() {
          window.removeEventListener('resize', this.handleResize);
      }
  };
  </script>
  
  <style scoped>
  *{
        padding: 0;
        margin: 0;
    }
    img{
        width: 100%;
        height: 100%;
    }
    .journey-main{
        position: relative;
        height: 925px;
    }
    /* .journey-main .disclaimer{
      margin: 75px 220px 200px 220px
    } */
    .journey-main .disclaimer{
        margin-top: 125px;
    }
    .journey-main .disclaimer p{
        display: block;
        /* height: 58px; */
        width: 570px;
        height: 433px;
        margin: 0 auto;
        line-height: 41px;
        font-size: 29px;
        font-family: Glacial Indifference, Glacial Indifference-Regular;
        font-weight: 400;
        text-align: left;
        color: #000;
    }
    .journey-main button{
        width: 210px;
        height: 53px;
        border-radius: 26px;
        position: absolute;
        top: 500px;
        left: 50%;
        margin-left: 105px;
        background-color: #cfc5b3;
        font-size: 31px;
        font-family: Glacial Indifference, Glacial Indifference-Bold;
        font-weight: 700;
        color: #514f4c;
        z-index: 1;
    }
    .journey-main .oxytocin{
        position: absolute;
        bottom: 124px;
        right: 6.5px;
        width: 595px;
        height: 414px;
        z-index: -2;
    }
    .journey-main .oxytocin img{
        opacity:0.12;
    }
    .journey-main .img1{
         position: absolute;
         z-index: -1;
     }
     .journey-main .img2{
         position: absolute;
         z-index: -1;
     }
    @media screen and (min-width:992px) {
        .journey-main .disclaimer{
            margin: 75px 140px 200px 140px;
        }
        .journey-main{
            height: 730px;
        }
    }
    @media screen and (max-width: 768px){
      .journey-main{
          position: relative;
          height: 120.4427vmin;
      }
      .journey-main .disclaimer{
        margin-top: 16.2760vmin;
      }
      .journey-main .disclaimer p{
          width: 74.2188vmin;
          height: 56.3802vmin;
          margin: 6.276vmin auto;
          line-height: 5.3385vmin;
          font-size: 3.776vmin;
      }
  
      .journey-main button{
        width: 27.3438vmin;
        height: 6.901vmin;
        border-radius: 3.3854vmin;
        position: absolute;
        top: 65.1042vmin;
        left: 50%;
        margin-left: 13.6719vmin;
        font-size: 4.0365vmin;
      }
      .journey-main .oxytocin{
          position: absolute;
          bottom: 16.1458vmin;
          right: 0.8464vmin;
          width: 77.474vmin;
          height: 53.9063vmin;
      }
      .journey-main .oxytocin img{
          opacity:0.12;
      }
    }
  </style>
  