<script>
import  mobileBack  from "@/assets/images/animations/away/away_mobile.png";
import  mobileWave  from "@/assets/images/animations/away/away_wave_mobile.png";

import  back  from "@/assets/images/animations/away/away_desktop.png";
import  wave  from "@/assets/images/animations/away/away_wave_desktop.png";

import art1 from "@/assets/images/animations/away/away_art_color1.png"
import art2 from "@/assets/images/animations/away/away_art2.png"
import art3 from "@/assets/images/animations/away/away_art3.png"
import art4 from "@/assets/images/animations/away/away_art4.png"
import art5 from "@/assets/images/animations/away/away_art5.png"

import acc1 from "@/assets/images/animations/away/away_acc_color1.png"
import acc2 from "@/assets/images/animations/away/away_acc2.png"
import acc3 from "@/assets/images/animations/away/away_acc3.png"
import acc4 from "@/assets/images/animations/away/away_acc4.png"
import acc5 from "@/assets/images/animations/away/away_acc5.png"
import acc6 from "@/assets/images/animations/away/away_acc6.png"

import ev1 from "@/assets/images/animations/away/away_ev_color1.png"
import ev2 from "@/assets/images/animations/away/away_ev2.png"
import ev3 from "@/assets/images/animations/away/away_ev3.png"
import ev4 from "@/assets/images/animations/away/away_ev4.png"


//idea: pass in an array as prop to tell you which heart icons to light up. this would prolly be array of booleans and with each "next" press you change that step index to true.
export default {
    name: 'AwayAnimation',
    props: {
        prodName:"",
        quote: "",
        author: "",
        personalizationSet: {
            type: Array
        },
        startCustomization: {
            type: Function
        },
        nextStep: {
            type: Function
        },
        nextPage: {
            type: Function
        },
    },
    data () {
        return {
            background: back,
            mobileBackground: mobileBack,
            foreground: wave,
            mobileForeground: mobileWave,
            icons_art: [art1, art2, art3, art4, art5],
            icons_acc: [acc1, acc2, acc3, acc4, acc5, acc6],
            icons_ev: [ev1,ev2,ev3,ev4],
            startAnimation: false
        }
    },
    mounted() {
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
    }
}

</script>

<template>
    <div class="animation-container">
        <picture>
            <source media="(max-width: 750px)" :srcset="mobileBackground" />
            <img
            :src="background"
            class="away-background"
            alt="Away background"
            />
        </picture>
        
        <div v-if="prodName === 'Accompania'" :class="'icon '+this.prodName">
            <img v-for="(icon, index) in icons_acc" :src="icon" :key="index"
            :class="[ { gray: !personalizationSet[index].isComplete }]"
            @click="startCustomization(index)"
            />
        </div>
        <div v-else-if="prodName === 'Everlast'" :class="'icon '+this.prodName">
            <img v-for="(icon, index) in icons_ev" :src="icon" :key="index"
            :class="[{ gray: !personalizationSet[index].isComplete }]"
            @click="startCustomization(index)"
            />
        </div>
        <div v-else-if="prodName === 'Artistico'" :class="'icon '+this.prodName">
            <img v-for="(icon, index) in icons_art" :src="icon" :key="index"
            :class="[{ gray: !personalizationSet[index].isComplete }]"
            @click="startCustomization(index)"
            />
        </div>
        
        
        <!-- foreground-->
        <picture>
            <source media="(max-width: 750px)" :srcset="mobileForeground" />
            <img
            v-if="this.startAnimation"
            :src="foreground"
            class="away-foreground"
            alt="Wave"
        /> 
        </picture>
        
        <div v-if="this.startAnimation" class="centered">
            <h1>"{{this.quote}}"</h1>
            <h3>{{ this.author }}</h3>
        </div>

        <div class="next-button-container">
            <button @click="startAnimationFunction">Next</button>
        </div>

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
.icon img {
    position: absolute;
    z-index: 0;
    width: 30vw;
    height: 30vw;
    left: 5%;
    bottom: 20%;
    display:flex;
}
/* Position for small screens*/
.Accompania {
/* first icon */
img:nth-of-type(1) {
    left: 1%;
    bottom: -2%;
}
img:nth-of-type(2) {
    left: 14%;
    bottom: 17%;
}
img:nth-of-type(3) {
    left: 50%;
    bottom: 12%;
}
img:nth-of-type(4){
    left: 66%;
    bottom: 0%;
}
img:nth-of-type(5){
    left: 63%;
    bottom: 35%;
}
img:nth-of-type(6){
    left: -5%;
    bottom: 29%;
}
}
.Everlast {
/* first icon */
img:nth-of-type(1) {
    left: -1%;
    bottom: 25%;
    transform: scale(0.9);
}
img:nth-of-type(2) {
    left: 12%;
    bottom: -3%;
}
img:nth-of-type(3) {
    left: 54%;
    bottom: 29%;
}
img:nth-of-type(4){
    left: 47%;
    bottom: -2%;
}
}

.Artistico {
img:nth-of-type(1) {
    left: 17%;
    bottom: -3%;
}
img:nth-of-type(2) {
    left: 4%;
    bottom: 23%;
}
img:nth-of-type(3) {
    left: 40%;
    bottom: 15%;
}
img:nth-of-type(4){
    left: 61%;
    bottom: 5%;
}
img:nth-of-type(5){
    left: 66%;
    bottom: 37%;
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
.away-background {
    position:relative;
    z-index: 0;
    left:0%;
}
.away-foreground {
    position: absolute;
    z-index: 1;
    left:0%;
    transform: scale(1.05)
    scaleY(1.1);
    animation: wave-out 3.5s cubic-bezier( 0.61, -0.02,.81,.81) both reverse,
    bob 10s 3.5s ease-in-out
     infinite;
}

@keyframes wave-out {
    0% {
        top: 5%;
    }
    100% {
        top: -110%;
    }
}
@keyframes bob {
    25% {
        top: -15%;
    }
    50% {
        top: 8%
    }
    75% {
        top: -5%
    }
    100% {
        top:5%;
    }
}

.centered {
    position: absolute;
    color: var(--bistre);
    z-index: 1;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -30%);
    width: 65vw;
    animation: fadeQuote 2.5s 5s ease-in-out both
}

h1 {
    font-family: 'Nickainley', sans-serif;
    font-size: 11vh;
    line-height: 10rem;
}

h3 {
    font-family: 'Poppins Light', sans-serif;
    padding-top: 10px;
    letter-spacing: 5px;
}

@keyframes fadeQuote {
    0% {
        top: 20%;
        opacity: 0;
    }
    100% {
        opacity:1;
    }
    
}

@media only screen and (max-width: 450px) {
 /* Adjusting postiions for smaller screen. */
 .icon img {
    width: 45vw;
    height: 45vw;
 }
 .Accompania{
    img:nth-of-type(4){
    left: 60%;
    }
 }

 .Artistico{
    img:nth-of-type(1) {
    left: 0%;
}
img:nth-of-type(2) {
    left: -8%;
}
img:nth-of-type(3) {
    left: 33%;
}
 }

 .Everlast{
    img{
        width: 50vw;
        height: 50vw;
    }
    img:nth-of-type(1) {
    left: -2%;
    bottom: 31%;
}
img:nth-of-type(2) {
    left: 4%;
    bottom: 2%;
}
img:nth-of-type(3) {
    left: 54%;
    bottom: 26%;
    transform: scale(0.9);
}
img:nth-of-type(4){
    left: 49%;
    bottom: 0%;
    transform: scale(1.2);
}
 }

 .centered {
     width: 90vw;   
 }

 h1{
    font-size: 5rem;
    line-height: normal;
 }
}

@media only screen and (min-width: 451px) and (max-width: 770px) {
 /* Adjusting postiions for smaller screen. */
 .icon img {
    width: 40vw;
    height: 40vw;
 }
 .Artistico{
    img:nth-of-type(1) {
    left: 7%;
}
img:nth-of-type(2) {
    left: -5%;
}
img:nth-of-type(3) {
    left: 33%;
}
 }
 .centered {
     width: 75vw;   
 }
 h1{
    font-size: 6rem;
    line-height: normal;
 }
}
@media only screen and (min-width: 771px) and (max-width: 1200px) {
 /* Adjusting postiions for smaller screen. */
 .icon img {
    width: 35vw;
    height: 35vw;
 }

 .Accompania {
/* first icon */
img:nth-of-type(1) {
    left: 1%;
    bottom: -7%;
}
img:nth-of-type(2) {
    left: 22%;
    bottom: 17%;
}
img:nth-of-type(3) {
    left: 45%;
    bottom: -2%;
}
img:nth-of-type(4){
    left: 66%;
    bottom: -4%;
}
img:nth-of-type(5){
    left: 68%;
    bottom: 35%;
}
img:nth-of-type(6){
    left: -5%;
    bottom: 29%;
}
}

 .Everlast{
    img:nth-of-type(2) {
    left: 16%;
    }
    img:nth-of-type(3) {
    left: 65%;
    }
 }
 .Artistico{
    img:nth-of-type(1) {
    left: 7%;
}
img:nth-of-type(2) {
    left: -5%;
}
img:nth-of-type(3) {
    left: 33%;
}
 }
}

@media only screen and (min-width: 1201px) {
    .icon img {
        width: 27vw;
        height: 27vw;
    }
    .Accompania {
/* first icon */
img:nth-of-type(1) {
    left: 8%;
    bottom: -6%;
}
img:nth-of-type(2) {
    left: 27%;
    bottom: 15%;
}
img:nth-of-type(3) {
    left: 53%;
    bottom: 7%;
}
img:nth-of-type(4){
    left: 70%;
    bottom: -7%;
}
img:nth-of-type(5){
    left: 73%;
    bottom: 32%;
}
img:nth-of-type(6){
    left: 0%;
    bottom: 20%;
}
}
.Everlast {
/* first icon */
img:nth-of-type(1) {
    left: 3%;
    bottom: 17%;
}
img:nth-of-type(2) {
    left: 24%;
    bottom: -2%;
}
img:nth-of-type(3) {
    left: 62%;
    bottom: 18%;
}
img:nth-of-type(4){
    left: 45%;
    bottom: -3%;
}
}

.Artistico {
img:nth-of-type(1) {
    left: 15%;
    bottom: -7%;
}
img:nth-of-type(2) {
    left: 0%;
    bottom: 23%;
}
img:nth-of-type(3) {
    left: 40%;
    bottom: 9%;
}
img:nth-of-type(4){
    left: 61%;
    bottom: 0%;
}
img:nth-of-type(5){
    left: 66%;
    bottom: 37%;
}
}

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
/* 
.next-button-container button:hover {
    background-color: pink;
} */
.gray { 
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    
    filter: grayscale(100%);
	
    filter: gray;
}
</style>