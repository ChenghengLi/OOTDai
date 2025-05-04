<script>
import  mobileBack  from "@/assets/images/animations/wild/wild_back_mobile.png";
import  back  from "@/assets/images/animations/wild/wild_back_desktop.png";

import mobileFore_back from "@/assets/images/animations/wild/wild_fore_mobile1.png"
import  mobileFore_ground  from "@/assets/images/animations/wild/wild_fore_mobile.png";
import  fore  from "@/assets/images/animations/wild/wild_fore_desktop.png";

import bear from "@/assets/images/animations/wild/bear.png"
import bird from "@/assets/images/animations/wild/bird.png"
import cheetah from "@/assets/images/animations/wild/cheetah.png"
import elephant from "@/assets/images/animations/wild/elephant.png"
import frog from "@/assets/images/animations/wild/frog.png"
import tiger from "@/assets/images/animations/wild/tiger.png"

import acc1 from "@/assets/images/animations/wild/wild_acc1.png"
import acc2 from "@/assets/images/animations/wild/wild_acc2.png"
import acc3 from "@/assets/images/animations/wild/wild_acc3.png"
import acc4 from "@/assets/images/animations/wild/wild_acc4.png"
import acc5 from "@/assets/images/animations/wild/wild_acc5.png"
import acc6 from "@/assets/images/animations/wild/wild_acc6.png"

import ev1 from "@/assets/images/animations/wild/wild_ev1.png"
import ev2 from "@/assets/images/animations/wild/wild_ev2.png"
import ev3 from "@/assets/images/animations/wild/wild_ev3.png"
import ev4 from "@/assets/images/animations/wild/wild_ev4.png"

import art1 from "@/assets/images/animations/wild/wild_art1.png"
import art2 from "@/assets/images/animations/wild/wild_art2.png"
import art3 from "@/assets/images/animations/wild/wild_art3.png"
import art4 from "@/assets/images/animations/wild/wild_art4.png"
import art5 from "@/assets/images/animations/wild/wild_art5.png"

export default {
    name: 'WildLoveAnimation',
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
            background: back,
            mobileBackground: mobileBack,
            icons_art: [art5,art4,art3,art2,art1],
            icons_acc: [acc6,acc5,acc4,acc3,acc2,acc1],
            icons_ev: [ev4,ev3,ev2,ev1],
            animals_art: [bird, cheetah, tiger, frog, bear],
            animals_acc: [bird, elephant, tiger, frog, cheetah, bear],
            animals_ev: [bird, frog, tiger, bear],
            foreground: fore,
            mobileForeground: mobileFore_ground,
            mobileForeback: mobileFore_back,
            startAnimation: false,
            mobileBreakpoint: 690
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
            <source :media="`(max-width: ${mobileBreakpoint}px)`" :srcset="mobileBackground" />
            <img
            :src="background"
            class="wild-background"
            alt="Wild background"
            />
        </picture>

        <img
            :src="mobileForeback"
            class="leaf-background"
            alt="Leaf background"
        />

        <div class="centered">
            <h2 v-if="startAnimation" id="first">"In your wild eyes,</h2>
            <h2 v-if="startAnimation" id="first">I found our story."</h2>
            <h2 v-if="startAnimation" id="second">{{ this.author }}</h2>
        </div>


        <template v-if="prodName === 'Accompania'">
 
            <div v-if="startAnimation" :class="prodName">
                <div class="icon">
                    <img v-for="(book, index) in icons_acc" :key="index" :src="book" id="book"/>
                </div>
                <img v-for="(animal, index) in animals_acc" :src="animal" 
                    class='animal'
                    :id="`animal-${index}`"
                    :key="index"
                />
            </div>
            <div v-else :class="prodName">
                <div class="static">
                    <img v-for="(book, index) in icons_acc" :key="index" :src="book" id="book"
                        :class="{ gray: !personalizationSet[index].isComplete }"
                        @click="startCustomization(index)"
                    />
                </div>
            </div>
        </template>

        <template v-if="prodName === 'Everlast'">
            <div v-if="startAnimation" :class="prodName">
                <div class="icon">
                    <img v-for="(book, index) in icons_ev" :key="index" :src="book"  id="book"/>
                </div>
                <img v-for="(animal, index) in animals_ev" :src="animal" 
                    class='animal'
                    :id="`animal-${index}`"
                    :key="index"
                />
            </div>
            <div v-else :class="prodName">
                <div class="static">
                    <img v-for="(book, index) in icons_ev" :key="index" :src="book" id="book"
                        :class="{ gray: !personalizationSet[index].isComplete }"
                        @click="startCustomization(index)"
                    />
                </div>
            </div>

        </template>

        <template v-if="prodName === 'Artistico'">
            <div v-if="startAnimation" :class="prodName">
                    <div class="icon">
                    <img v-for="(book, index) in icons_art" :key="index" :src="book" 
                    id="book"/>
                </div>
                <img v-for="(animal, index) in animals_art" :src="animal" 
                    class='animal'
                    :id="`animal-${index}`"
                    :key="index"
                />
            </div>
            <div v-else :class="prodName">
                    <div class="static">
                    <img v-for="(book, index) in icons_art" :key="index" :src="book" id="book"
                        :class="{ gray: !personalizationSet[index].isComplete }"
                        @click="startCustomization(index)"
                    />
                </div>
            </div>
        </template>

        <picture v-if="startAnimation">
            <source :media="`(max-width: ${mobileBreakpoint}px)`" :srcset="mobileForeground" />
            <img :src="foreground" id="foreground"/>
        </picture>
        
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

img#foreground {
    z-index:1;
    position: absolute;
    left: 0%;
    bottom: 0%;
}

.animation-container {
    position: relative;
    height: 85vh;
    min-height: 400px;
    width: 100vw;
    left: 0%;
    overflow: clip;
}

.wild-background {
    position:relative;
    left:0%;
}

.leaf-background {
    display:none;
}


img.animal {
    position: absolute;
    z-index: 1;
    left: 0%;
}
#animal-5{
    bottom: -20%;
    left: 50%;
    transform: translate(-50%);
    height: 60vh;
    width: 50vh;
    min-height: 270px;
    animation: bookDown 1.5s 7.5s ease-in alternate-reverse both 2;
    
}

#animal-4{
    z-index:2;
    height: 15vw;
    width: 40vw;
    bottom: 14%;
    left: 0%; 
    max-height: 25vh;
    animation: cheetah 1.6s 6s ease-in alternate-reverse both 2;
}

#animal-3{
    height: 15vw;
    width: 40vw;
    left: unset;
    right: 0%;
    bottom: 27%;
    max-height: 25vh;
    animation: frog 1.6s 4.5s ease-in alternate-reverse both 2;
}

#animal-2{
    height: 20vw;
    width: 45vw;
    bottom: 36%;
    max-height: 30vh;
    animation: tiger 1.6s 3s ease-in alternate-reverse both 2;
}

#animal-1{
    height: 45vw;
    width: 40vw;
    left: unset;
    right: 0%;
    bottom: 55%;
    animation: elephant 1.6s 1.5s ease-in alternate-reverse both 2;
}
#animal-0{
    left: 50%;
    transform: translate(-50%);
    top: -1%;
    height: 40vh;
    width: 40vw;
    animation: bird 1.5s ease-in alternate-reverse both 2;
}

.Accompania{
    #animal-0{
    height: 30vh;
    }
    #book{
        height:60vh;
    }
}

.Accompania .icon, .Accompania .static {
    img:nth-of-type(1) {
            bottom: 37%;
        }
        img:nth-of-type(2) {
            bottom: 22%;
        }
        img:nth-of-type(3) {
            bottom: 12%;
        }
        img:nth-of-type(4) {
            bottom: 2%;
        }
        img:nth-of-type(5) {
            bottom: -7%;
        }
        img:nth-of-type(6) {
            bottom: -17%;
        }
}


.Everlast {
    #book{
        height:80vh;
    }
    #animal-1{
        height: 15vw;
    width: 40vw;
    left: unset;
    right: 0%;
    max-height: 25vh;
    bottom: 38%;
        animation-name: frog
    } 
    #animal-2{
        bottom: 14%;
    }
    #animal-3{
    bottom: -20%;
    left: 50%;
    transform: translate(-50%);
    height: 60vh;
    width: 50vh;
    min-height: 270px;
    max-height:unset;
    animation: bookDown 1.5s 4.5s ease-in alternate-reverse both 2;
    }

.icon, .static{
    img:nth-of-type(1) {
            bottom: 8%;
        }
        img:nth-of-type(2) {
            bottom: -5%;
        }
        img:nth-of-type(3) {
            bottom: -19%;
        }
        img:nth-of-type(4) {
            bottom: -31%;
        }
}
.icon img:nth-of-type(1){
    animation-duration: 2.8s;
}
.icon img:nth-of-type(4){
    animation: bookDown 1.5s 6s ease-in forwards;
}
}

.Artistico{
    #book{
        height:70vh;
    }
    #animal-1{
    transform: rotateY(180deg);
    height: 15vw;
    width: 40vw;
    bottom: 40%;
    max-height: 25vh;
    } 
    #animal-2{
        bottom: 20%;
        max-height: 30vh;
    }
        #animal-3{
        bottom: 13%;
        max-height: 20vh;
    }
    #animal-4{
        bottom: -20%;
        left: 50%;
        transform: translate(-50%);
        height: 60vh;
        width: 50vh;
        min-height: 270px;
        max-height: unset;
        animation: bookDown 1.5s 6s ease-in alternate-reverse both 2;
    }

.icon, .static{
    img:nth-of-type(1) {
            bottom: 25%;
        }
        img:nth-of-type(2) {
            bottom: 3%;
        }
        img:nth-of-type(3) {
            bottom: -8%;
        }
        img:nth-of-type(4) {
            bottom: -20%;
        }
        img:nth-of-type(5) {
            z-index: 1;
            bottom: -31%; 
        }
}

.icon img:nth-of-type(5){
    animation: bookDown 1.5s 7.5s ease-in forwards;
}

}

@keyframes cheetah {
    0%{
        left: -2%;
    }
    100% {
        left: -50vw;
    }
}

@keyframes frog {
    0%{
       right:0%;
    }
    100% {
        right:-50%;
    }
}

@keyframes tiger {
    0%{
        left: 0%;
    }
    100% {
        left: -50vw;
    }
}

@keyframes elephant {
    0%{
        right: 0%;
    }
    100% {
        right: -50%;
    }
}

@keyframes bird {
    0%{
        top: 0%;
    }
    100% {
        top: -50vh;
    }
}

/* Book styling */

.icon img, .static img{
    position: absolute;
    z-index: 0;
    left: 0%;
    bottom: 0%;
    display:grid;

    /* name duration timing-function delay iteration-count direction fill-mode; */
}

#book{
    width: 70vh;
    height: 70vh; 
    left: 50%;
    transform: translateX(-50%);
}

.icon {
/* bottom book icon */
img:nth-of-type(6) {
    animation: bookDown 1.5s 9s ease-in forwards;
}
img:nth-of-type(5) {
    z-index:2;
    animation: bookLeft 2.5s 7.5s ease-in forwards;
}
img:nth-of-type(4) {
    animation: bookRight 2.5s 6s ease-in forwards;
}
img:nth-of-type(3){
    animation: bookLeft 2.5s 4.5s ease-in forwards;
}
img:nth-of-type(2){
    animation: bookRight 2.5s 3s ease-in forwards;
}
img:nth-of-type(1){
    animation: bookUp 2.5s 1.5s ease-in forwards;
}
}

/* up */
@keyframes bookUp{
    100%{
        bottom: 150vh;
        display:none;
    }
}
/* right */
@keyframes bookRight{
    100%{
        left: 150vw;
        display:none;
    }
}
/* left */
@keyframes bookLeft{
    100%{
        left: -50vw;
        display:none;
    }
}
/* down */
@keyframes bookDown{
    100%{
        bottom: -50vh;
        display:none;
    }
}
@keyframes fadeQuote {
    0% {
        opacity: 0;
    }
    100% {
        opacity:1;
    }
    
}

.centered {
    position: absolute;
    z-index:0;
    color: var(--linen);
    top: 55%;
    left: 50%;
    text-align:center;
    transform: translate(-50%, -55%);
    max-width: 50vh;
    animation: fadeQuote 0.1s 1.5s linear both;
}

h2#first {
    font-weight: bold;
    font-family: 'Nickainley', sans-serif;
    
} 

h2#second {
    padding-top: 10px;
    font-family: 'Poppins Light', sans-serif;
    font-size: 2rem;
    letter-spacing: 5px;
} 

@media (max-width: 690px) {
    .leaf-background {
        display:block;
        position: absolute;
        top: 20%;
        left: -1%;
        height: 35vh;
        width: auto;
    }

    #animal-0{
            height: 20vh;
            width: 60vw;
        }
        .icon, .static {
        /* bottom book icon */
        img:nth-of-type(1) {
            animation-duration: 2.5s;
        }
    }
    .Accompania {
        #animal-0{
            height: 20vh;
            width: 60vw;
            animation-duration: 1.55s;
        }

        #book{
            width: 50vh;
            height: 45vh;
        }  

        .icon, .static {
        /* bottom book icon */
        img:nth-of-type(6) {
            bottom: 13%;
        }
        img:nth-of-type(5) {
            z-index:0;
            bottom: 20%;
        }
        img:nth-of-type(4) {
            bottom: 27%;
        }
        img:nth-of-type(3){
            bottom: 35%;
        }
        img:nth-of-type(2){
                bottom: 42%;
        }

        img:nth-of-type(1){
                bottom: 53%;
        }
        }

        #animal-5{
        bottom: 10%;
        }

        #animal-4{
            z-index:1;
            bottom: 42%;
        }

        #animal-3{
            left: unset;
            right: -10%;
            bottom: 50%;
        }

        #animal-2{
            bottom: 57%;
        }

        #animal-1{
            bottom: 70%;
        }
    }

    .Everlast {
        #book{
            height: 65vh;
            width: 60vh;
        }
        
        #animal-1{
            bottom: 60%;
        }
        #animal-2{
            bottom: 45%;
            height: 25vw;
        }
       #animal-3{
            bottom: 14%;
        }

        .icon, .static {
        /* bottom book icon */
        img:nth-of-type(4) {
            bottom: 3%;
        }
        img:nth-of-type(3){
            bottom: 13%;
        }
        img:nth-of-type(2){
                bottom: 24%;
        }
        img:nth-of-type(1){
                bottom: 35%;
                /* animation-duration: 2.7s; */
        }
    }
    }

    .Artistico {
        #book[data-v-6d3059aa] {
        width: 50vh;
        height: 55vh;
    }
        #animal-1{
            bottom: 65%;
        }
        #animal-2{
            bottom: 50%;
            height: 26vw;
        }

        #animal-3{
            bottom: 45%;
        }
        #animal-4{
            bottom: 14%;
            z-index:1;
        }

        .icon, .static {
        /* bottom book icon */
        img:nth-of-type(5) {
            z-index:1;
            bottom: 6%;
        }
        img:nth-of-type(4) {
            bottom: 14%;
        }
        img:nth-of-type(3){
            bottom: 23%;
        }
        img:nth-of-type(2){
                bottom: 32%;
        }
        img:nth-of-type(1){
                bottom: 49%;
                animation-duration: 2.4s;
                
        }
    }
    }

    .centered {
        top: 35%;
        animation-delay: 1.5s;
    }
    h2#first {
        font-size: 3rem;
    } 

    h2#second {
        font-size: 1.5rem;
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