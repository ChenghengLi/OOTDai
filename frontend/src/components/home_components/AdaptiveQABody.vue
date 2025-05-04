<template>
    <section class="journey-main">
         <div class="oxytocin">
             <img src="@/assets/journey/oxytocin@2x.png" alt="">
         </div>
         <div class="img1" :style="img1Style">
             <img :src="img1Src" alt="">
         </div>
         <div class="img2" :style="img2Style">
             <img :src="img2Src" alt="">
         </div>
         <p :style="{ color : questioncolor }">
             {{ question }}
         </p>
         <input type="text" v-model="inputValue" :placeholder="placeholder">
         <br>
         <button @click="handleNext">
             Next
         </button>
 
    </section>
 </template>
 
 <script>
 import Swal from 'sweetalert2';
 export default {
     name: "AdaptiveQABody",
     props: {
         questioncolor: String,
         question: String,
         placeholder: String,
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
            windowWidth: window.innerWidth,
            inputValue: '',
            resolvedImg1Src: '',
            resolvedImg2Src: ''   
         };
     },
     created() {
        this.resolveImageSources();
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
         resolveImageSources() {
            try {
                this.resolvedImg1Src = require(`@/assets/journey/${this.img1src.split('/').pop()}`);
            } catch (e) {
                console.error(`Cannot find module '@/assets/journey/${this.img1src.split('/').pop()}'`);
            }
            try {
                this.resolvedImg2Src = require(`@/assets/journey/${this.img2src.split('/').pop()}`);
            } catch (e) {
                console.error(`Cannot find module '@/assets/journey/${this.img2src.split('/').pop()}'`);
            }
        },
         handleResize() {
             this.windowWidth = window.innerWidth;
         },
         handleNext(){
            if(this.inputValue!=''){
                this.$emit('textUpdated', this.inputValue);
                this.onNext();
            } else{
                Swal.fire({
                    title: 'Error',
                    text: 'Please fill the data realated to your Oxytocin',
                    icon: 'error',
                });
            }
             
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
         height: 970px;
     }
     .journey-main p{
         display: block;
         margin-top: 165px;
         height: 58px;
         line-height: 58px;
         font-size: 59px;
         font-family: Playfair Display, Playfair Display-Bold;
         font-weight: 700;
         text-align: center;
         color: #f19586;
         white-space: nowrap;
     }
     .journey-main input{
         padding-left: 25px;
         display: block;
         margin: 35px auto;
         width: 584px;
         height: 98px;
         background: #ffffff;
         font-size: 32px;
         font-family: Glacial Indifference, Glacial Indifference-Regular;
         font-weight: 400;
         color: #514f4c;
         border: 3px solid #cfc5b3; 
     }
     .journey-main button{
         width: 210px;
         height: 53px;
         border-radius: 26px;
         position: absolute;
         top: 220px;
         left: 50%;
         margin-left: 105px;
         background-color: #cfc5b3;
         font-size: 31px;
         font-family: Glacial Indifference, Glacial Indifference-Bold;
         font-weight: 700;
         color: #514f4c;
     }
     .journey-main .oxytocin{
         position: absolute;
         z-index: -1;
         bottom: 124px;
         right: 6.5px;
         width: 595px;
         height: 414px;
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
         .journey-main p{
             margin-top: 125px;
         }
         .journey-main{
             height: 600px;
         }
     }
     @media screen and (max-width: 768px){
         .journey-main{
             height: 106.3021vmin;
         }
         .journey-main p{
             margin-top: 21.4843vmin;
             height: 7.5521vmin;
             line-height: 7.5521vmin;
             font-size: 6.6823vmin;
         }
         .journey-main input{
             padding-left: 3.2552vmin;
             margin: 4.5573vmin auto;
             width: 76.0417vmin;
             height: 12.7604vmin;
             font-size: 4.1667vmin;
             color: #514f4c;
             border: 0.3906vmin solid #cfc5b3; 
         }
         .journey-main button{
             width: 27.3438vmin;
             height: 6.901vmin;
             border-radius: 3.3854vmin;
             top: 28.6458vmin;
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
     }
 </style>
 