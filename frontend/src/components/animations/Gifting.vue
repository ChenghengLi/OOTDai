<script>
import  mobileImg  from "@/assets/images/animations/gift/Gift_Back_Mobile.png";
import  img  from "@/assets/images/animations/gift/Gift_Back.png";

import  acc_fore  from "@/assets/images/animations/gift/gift_acc_fore.png";
import  acc_fore_mobile  from "@/assets/images/animations/gift/gift_acc_fore_mobile.png";
import  art_fore  from "@/assets/images/animations/gift/gift_art_fore.png";
import  art_fore_mobile  from "@/assets/images/animations/gift/gift_art_fore_mobile.png";
import  ev_fore  from "@/assets/images/animations/gift/gift_ev_fore.png";
import  ev_fore_mobile  from "@/assets/images/animations/gift/gift_ev_fore_mobile.png";

import art1 from "@/assets/images/animations/gift/gift_art1.png"
import art2 from "@/assets/images/animations/gift/gift_art2.png"
import art3 from "@/assets/images/animations/gift/gift_art3.png"
import art4 from "@/assets/images/animations/gift/gift_art4.png"
import art5 from "@/assets/images/animations/gift/gift_art5.png"


import acc1 from "@/assets/images/animations/gift/gift_acc1.png"
import acc2 from "@/assets/images/animations/gift/gift_acc2.png"
import acc3 from "@/assets/images/animations/gift/gift_acc3.png"
import acc4 from "@/assets/images/animations/gift/gift_acc4.png"
import acc5 from "@/assets/images/animations/gift/gift_acc5.png"
import acc6 from "@/assets/images/animations/gift/gift_acc6.png"

import ev1 from "@/assets/images/animations/gift/gift_ev1.png"
import ev2 from "@/assets/images/animations/gift/gift_ev2.png"
import ev3 from "@/assets/images/animations/gift/gift_ev3.png"
import ev4 from "@/assets/images/animations/gift/gift_ev4.png"

import '@animxyz/core';
import { XyzTransitionGroup } from '@animxyz/vue3';

export default {
    name: 'GiftingAnimation',
    props: {
        prodName:"",
        quote: "",
        author: "",
        personalizationSet: {
            type: Array,
            required: true
        },
        startCustomization: {
            type: Function,
            required: true
        },
        nextStep: {
            type: Function,
            required: true
        },
        nextPage: {
            type: Function,
            required: true
        },
    },
    data () {
        return {
            background: img,
            mobileBackground: mobileImg,
            icons_art: [art1,art2,art3,art4,art5],
            icons_acc: [acc1,acc2,acc3,acc4,acc5,acc6],
            icons_ev: [ev1,ev2,ev3,ev4],
            foregrounds: [acc_fore, art_fore, ev_fore],
            foregrounds_mobile:[acc_fore_mobile, art_fore_mobile, ev_fore_mobile],
            mobileBreakpoint: 640,
            startAnimation: false
        }
    },
    mounted() {
        // console.log("gift is playing");
        // Trigger "out" animation after a short delay
    // setTimeout(() => {
    // this.showIcons = false;
    // }, 1500); 
    },
    methods: {
        startAnimationFunction() {
            if (this.nextStep && !this.nextStep()) {
                return;
            }
            this.startAnimation = true;
            setTimeout(() => {
                this.startAnimation = false;
                this.nextPage();
            }, 10000);
        }
    },
    components: {
        XyzTransitionGroup
    }
}

</script>

<template>
    <div class="animation-container">
        <picture>
            <source :media="`(max-width: ${mobileBreakpoint}px)`" :srcset="mobileBackground" />
            <img
            :src="background"
            class="gift-background"
            alt="Gift background"
            />
        </picture>
        <div v-if="prodName === 'Accompania'" class="place-container">
            <picture>
                <source :media="`(max-width: ${mobileBreakpoint}px)`"  :srcset="foregrounds_mobile[0]" />
                <img  :src="foregrounds[0]" id="foreground" :class="{ animate: startAnimation }"/>
            </picture>
        
            <div :class="'icon '+this.prodName">
                    <XyzTransitionGroup
                        class="icon-group"
                        appear
                        xyz="
                        out-fade-50%">
                <template v-if="!startAnimation">
                    <img v-for="(icon, index) in icons_acc" :key="index" :src="icon"
                        :class="[ { gray: !personalizationSet[index].isComplete }]"
                         @click="startCustomization(index)"
                    />
                        </template>
                    </XyzTransitionGroup>
            </div>
        </div>

        <div v-else-if="prodName === 'Everlast'" class="place-container">
            <picture>
                <source :media="`(max-width: ${mobileBreakpoint}px)`"  :srcset="foregrounds_mobile[2]" />
                <img  :src="foregrounds[2]" id="foreground" :class="{ animate: startAnimation }"/>
            </picture>
        
            <div :class="'icon '+this.prodName">
                    <XyzTransitionGroup
                        class="icon-group"
                        appear
                        xyz="
                        out-fade-50%">
                <template v-if="!startAnimation">
                    <img v-for="(icon, index) in icons_ev" :key="index" :src="icon"
                        :class="[ { gray: !personalizationSet[index].isComplete }]"
                         @click="startCustomization(index)"
                    />
                        </template>
                    </XyzTransitionGroup>
            </div>
        </div>

        
        <div v-else-if="prodName === 'Artistico'" class="place-container">
            <picture>
                <source :media="`(max-width: ${mobileBreakpoint}px)`" :srcset="foregrounds_mobile[1]" />
                <img  :src="foregrounds[1]" id="foreground" :class="{ animate: startAnimation }"/>
            </picture>
        
            <div :class="'icon '+this.prodName">
                    <XyzTransitionGroup
                        class="icon-group"
                        appear
                        xyz="
                        out-fade-50%">
                <template v-if="!startAnimation">
                    <img v-for="(icon, index) in icons_art" :key="index" :src="icon"
                        :class="[ { gray: !personalizationSet[index].isComplete }]"
                         @click="startCustomization(index)"
                    />
                        </template>
                    </XyzTransitionGroup>
            </div>
        </div>
    
        <div v-if="startAnimation" class="centered">
            <h1>"{{ this.quote }}"</h1>
            <h3>{{ this.author }}</h3>
        </div>
    </div>
    <div class="next-button-container">
        <button @click="startAnimationFunction" :disabled="startAnimation">Next</button>
    </div>
</template>

<style scoped>
img {
    max-width: 100%;
    max-height: 100%;
    width: 100%;
    height: 100%;
    display: block;
}

.place-container {
    position: absolute;
    left:0;
    top:5%;
}

.place-container:has(.Everlast) {
    top:-17%;
    img#foreground {
    transform: scaleY(0.6);
    }
} 

.place-container:has(.Artistico) {
    top:15%;
} 

img#foreground {
    position: relative;
    left: 0%;
    bottom: 100%;
    opacity: 0.7;
}
.animate {
  animation: fade 1s 0s ease-in-out both;
}
@keyframes fade {
    100%{
        opacity:0;
    }
}

.icon img{
    position: absolute;
    width: 19vw;
    height: 19vw;
}

.xyz-out {
   --xyz-rotate-x: 90deg;
    --xyz-rotate-z: 180deg;
    --xyz-stagger: 0.1s;
    --xyz-duration: 5s;
    --xyz-perspective: 100px;
    --xyz-translate-z: 100px;
    --xyz-translate-y: 10vh;
    --xyz-origin: 250%;
    /*--xyz-ease: cubic-bezier(.38,1.43,.6,.8); */
    --xyz-ease: cubic-bezier(.64,1.24,.55,.99);
}

.Accompania {
.xyz-out {
--xyz-translate-y: 100vh;
}
/* first icon */
img:nth-of-type(1) {
    left: -2.5%;
    bottom: 30%;
}
img:nth-of-type(2) {
    bottom: 46%;
    left: 6%;
}
img:nth-of-type(3) {
    bottom: 47%;
    left: 20.5%;
}
img:nth-of-type(4){
    bottom: 64%;
    left: 28%;
}
img:nth-of-type(5){
    bottom: 46%;
    left: 36%;
}
img:nth-of-type(6){
    bottom: 72%;
    left: 43%;
}
}

.Everlast {
    img:nth-of-type(1){
        bottom: 31%;
        left: -2.5%;
    }
    img:nth-of-type(2){
        bottom: 42%;
        left: 8.5%;
    }
    img:nth-of-type(3){
        bottom: 45%;
        left: 23%;
    }
    img:nth-of-type(4){
        bottom: 47%;
        left: 37%;
    }
}

.Artistico {
/* first icon */
img:nth-of-type(1) {
    left: -0.5%;
    bottom: 45%;
}
img:nth-of-type(2) {
    bottom: 60%;
    left: 9%;
}
img:nth-of-type(3) {
    bottom: 40%;
    left: 18.5%;
}
img:nth-of-type(4){
    bottom: 65%;
    left: 28%;
}
img:nth-of-type(5){
    bottom: 55%;
    left: 40%;
}
}

.animation-container {
    position: relative;
    height: 85vh;
    min-height: 350px;
    width: 100vw;
    left: 0%;
    overflow: clip;
}
.gift-background {
    position:relative;
    left:0%;
}

.centered {
    position: absolute;
    color: var(--linen);
    z-index: 1;
    top: 60%;
    left: 50%;
    width: 60%;
    transform: translate(-50%, -60%);
    animation: fadeQuote 2.5s 5s ease-in-out both;
}

h1 {
    font-family: 'Nickainley', sans-serif;
    font-size: 10vh;
    line-height: 10rem;
}

@font-face { 
    font-family: 'Nickainley'; 
    src: url('/src/assets/font/Nickainley-Normal.otf') format('opentype'); 
    font-weight: normal; 
    font-style: normal; 
 } 
 @font-face { 
    font-family: 'Poppins Light'; 
    src: url('/src/assets/font/Poppins-Light.ttf') format('opentype'); 
    font-weight: normal; 
    font-style: normal; 
 } 

h3 {
    padding-top: 10px;
    font-family: 'Poppins Light', sans-serif;
    letter-spacing: 5px;

    
}


@keyframes fadeQuote {
    0% {
        left: 45%;
        opacity: 0;
    }
    100% {
        opacity:1;
    }
}

/* Mobile stylings */
@media only screen and (max-width: 640px) {
    .place-container{
        top:-5%;
    }
    .icon img {
        width: 30vw;
        height: 30vw;
    }

    .xyz-out {
        --xyz-origin: 150%;
    }
.place-container:has(.Accompania){
        top:0%;
    }  
    .Accompania {
    .xyz-out{
        --xyz-translate-y: 10vh;
    }

    /* first icon */
    img:nth-of-type(1) {
        left: -3%;
        bottom: 52%;
    }
    img:nth-of-type(2) {
        bottom: 63%;
        left: 10%;
    }
    img:nth-of-type(3) {
        bottom: 64%;
        left: 34%;
    }
    img:nth-of-type(4){
        bottom: 74%;
        left: 47%;
    }
    img:nth-of-type(5){
        bottom: 63%;
        left: 60%;
    }
    img:nth-of-type(6){
        bottom: 78%;
        left: 71%;
    }
}
.place-container:has(.Everlast) {
  left: -10%;
  /* top: 5%; */
  top: 50vw;
  img#foreground {
    transform: scaleY(1.5);
    }
}
.Everlast {
    img:nth-of-type(1){
        /* bottom: 63%; */
        bottom: 75%;
        left: 9%;
    }
    img:nth-of-type(2){
        /* bottom: 72%; */
        bottom: 87%;
        left: 31%;
    }
    img:nth-of-type(3){
        /* bottom: 75%; */
        bottom: 92%;
        left: 53%;
    }
    img:nth-of-type(4){
        /* bottom: 77%; */
        bottom: 86%;
        left: 75%;
    }
}
.place-container:has(.Artistico) {
  left: 5%;
  top: 25%;
    img#foreground {
    transform: scaleY(1.5);
    }
}
.Artistico {
/* first icon */
img:nth-of-type(1) {
    left: -5%;
    bottom: 67%;
}
img:nth-of-type(2) {
    bottom: 86%;
    left: 10%;
}
img:nth-of-type(3) {
    bottom: 79%;
    left: 28%;
}
img:nth-of-type(4){
    bottom: 97%;
    left: 45%;
}
img:nth-of-type(5){
    bottom: 91%;
    left: 62%;
}
}
.centered{
    width: 80%;
    top:65%;
}
    h1 {
        font-size: 5rem;
        line-height: 6rem;
    }
    h3 {
        font-size: 2rem;
    }
}
@media only screen and (min-width:641px) and (max-width: 768px) {
.icon img {
    width: 22vw;
    height: 22vw;
}
.place-container:has(.Everlast) {
    top:-6%;
}

.Accompania {
    .xyz-out{
    --xyz-translate-y: 50vh;
    --xyz-origin: 200%;
    }
}
.Everlast {
    img:nth-of-type(2){
        bottom: 37%;
    }
    img:nth-of-type(3){
        bottom: 40%;
    }
    img:nth-of-type(4){
        bottom: 46%;
    }
}

h1 {
    font-size: 9vh;
}
}
.gray { 
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    
    filter: grayscale(100%);
	
    filter: gray;
}

.next-button-container {
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
}

.next-button-container button {
    color: black;
    border: none;
    padding: 10px 20px;
    font-size: 1.5rem;
    cursor: pointer;
    /* transition: background-color 0.3s ease; */
}

/* .next-button-container button:hover {
    background-color: pink;
} */
</style>