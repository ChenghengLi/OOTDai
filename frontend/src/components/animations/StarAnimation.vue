<template>
  <div class="stars-animation-container">
   <div class="yellow-stars-container">
     <div 
       v-for="(star, idx) in yellowStarsArr" 
       :key="`yellow-${idx}`"
       :class="`yellow-${idx}`"
     >
       <img 
        :ref="el => yellowStarIcons[idx] = el"
        :src="star"
        alt="yellow star" 
        :class="['yellow-star-icon', { gray: !personalizationSet[idx].isComplete }]"
        :style="{ 
          left: `${adjustedYellowStarPositions[idx].x}%`, 
          top: `${adjustedYellowStarPositions[idx].y}%`,
          transform: `rotate(${adjustedYellowStarPositions[idx].rotation}deg)`,
          scale: `${adjustedYellowStarPositions[idx].scale}`
        }"
        @click="startCustomization(idx)"
       />
     </div>
   </div>
    <div v-for="(star, idx) in whiteStarPositions" :key="`white-${idx}`">
      <img 
        :ref="el => whiteStarIcons[idx] = el"
        :src="whiteStar"
        alt="white star"
        class="white-star-icon"
        :style="{ left: `${star.x}%`, top: `${star.y}%` }"
      />
    </div>
    <div class="centered">
      <div ref="quote" class="quote">"{{ quoteText }}"</div>
      <div ref="author" class="author">{{ authorText }}</div>
    </div>
    <button :disabled="isAnimating" @click="startAnimation">Next</button>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import whiteStar from "@/assets/images/animations/white-star.svg";
import yellowStar from "@/assets/images/animations/yellow-star.svg";
import art1 from "@/assets/images/animations/star/star_art1.png"
import art2 from "@/assets/images/animations/star/star_art2.png"
import art3 from "@/assets/images/animations/star/star_art3.png"
import art4 from "@/assets/images/animations/star/star_art4.png"
import art5 from "@/assets/images/animations/star/star_art5.png"

import acc1 from "@/assets/images/animations/star/star_acc1.png"
import acc2 from "@/assets/images/animations/star/star_acc2.png"
import acc3 from "@/assets/images/animations/star/star_acc3.png"
import acc4 from "@/assets/images/animations/star/star_acc4.png"
import acc5 from "@/assets/images/animations/star/star_acc5.png"
import acc6 from "@/assets/images/animations/star/star_acc6.png"

import ev1 from "@/assets/images/animations/star/star_ev1.png"
import ev2 from "@/assets/images/animations/star/star_ev2.png"
import ev3 from "@/assets/images/animations/star/star_ev3.png"
import ev4 from "@/assets/images/animations/star/star_ev4.png"
import { gsap } from "gsap";

export default {
  props: {
    quoteText: {
      type: String,
      required: true
    },
    authorText: {
      type:String,
      required:true
    },
    numStars: {
      type: Number,
      required: true
    },
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
  setup(props) {
    const yellowStarIcons = ref([]);
    const whiteStarIcons = ref([]);
    const quote = ref(null);
    const isAnimating = ref(false);
    const icons_art = ref([art1, art2, art3, art4, art5]);
    const icons_acc = ref([acc1, acc2, acc3, acc4, acc5, acc6]);
    const icons_ev= ref([ev1,ev2,ev3,ev4]);
    const yellowStarsArr = computed(() =>  {
      if (props.numStars === 6) {
        return icons_acc.value;
      } else if (props.numStars === 5) {
        return icons_art.value;
      } else if (props.numStars === 4) {
        return icons_ev.value;
      } else {
        // Default fallback
        return Array(props.numStars).fill(yellowStar);
      }
    }
    );

    const whiteStarPositions =ref([])
    // const mouseEnterHandlers = [];
    // const mouseLeaveHandlers = [];

    const fourStarsInitPos = [
      { x: 40, y: 20, rotation: 270, scale: 1 },  // top left
      { x: 65, y: 30, rotation: 30 , scale: 1.2},  // top right
      { x: 20, y: 50, rotation: 120, scale: 1.3 }, // bottom left
      { x: 45, y: 60, rotation: 30, scale: 1 }  // bottom right
    ];

    const fiveStarsInitPos = [
      { x: 25, y: 15, rotation: -30, scale: 1 },  // top left
      { x: 65, y: 15, rotation: 90, scale: 1.1 },  // top right
      { x: 45, y: 40, rotation: 90, scale: 1.3 },  // center
      { x: 15, y: 60, rotation: 120, scale: 1.25 }, // bottom left
      { x: 70, y: 60, rotation: -20, scale: 1 }  // bottom right
    ]

    const sixStarsInitPos = [
      { x: 20, y: 10, rotation: 30, scale: 1 },  // top left
      { x: 70, y: 10, rotation: 60, scale: 1.1 },  // top right
      { x: 35, y: 45, rotation: 90, scale: 1.1 },  // middle left
      { x: 55, y: 30, rotation: 150, scale: 1.15 }, // middle right
      { x: 20, y: 65, rotation: 210, scale: 1 }, // bottom left
      { x: 60, y: 70, rotation: 240, scale: 1 }  // bottom right
    ]

    let adjustedYellowStarPositions;
    let initialPositions;

    if (props.numStars === 4) {
      initialPositions = fourStarsInitPos;
      adjustedYellowStarPositions = ref([...fourStarsInitPos]);
    } else if (props.numStars === 5) {
      initialPositions = fiveStarsInitPos;
      adjustedYellowStarPositions = ref([...fiveStarsInitPos]);
    } else if (props.numStars === 6) {
      initialPositions = sixStarsInitPos;
      adjustedYellowStarPositions = ref([...sixStarsInitPos]);
    } else {
      console.error("Invalid number of stars");
    }

    // adjusts the positions of the yellow stars based on screen width
    // Makes it so we don't need to make 3 seperate animation components differing only in their styling
    const updateStarPositions = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth < 768) { // phones and tablets
        if (props.numStars == 4) {
          adjustedYellowStarPositions.value = [
            { x: 35, y: 20, rotation: 270, scale: 1},  // top left
            { x: 65, y: 35, rotation: 30, scale: 1.2},  // top right
            { x: 20, y: 45, rotation: 120, scale: 1.3 }, // bottom left
            { x: 45, y: 60, rotation: 30, scale: 1 }  // bottom right
          ]
        } else if (props.numStars == 5) {
            adjustedYellowStarPositions.value = [
              { x: 15, y: 10, rotation: -30, scale: 1 },  // top left
              { x: 65, y: 20, rotation: 90, scale: 1.1 },  // top right
              { x: 25, y: 40, rotation: 30, scale: 1.3 },  // center
              { x: 15, y: 70, rotation: 240, scale: 1.25 }, // bottom left
              { x: 60, y: 55, rotation: -20, scale: 1 }  // bottom right
            ]
        } else {
           adjustedYellowStarPositions.value = [
            { x: 35, y: 8, rotation: 30, scale: 1 },  // top left
            { x: 65, y: 20, rotation: 60, scale: 1.1 },  // top right
            { x: 20, y: 30, rotation: 270, scale: 1.1 }, // middle left
            { x: 58, y: 45, rotation: 90, scale: 1.15 },  // middle right
            { x: 20, y: 58, rotation: 210, scale: 1 }, // bottom left
            { x: 60, y: 69, rotation: 240, scale: 1 }  // bottom right
          ]
        }
      } else {
        // Large devices (laptops and desktops)
        adjustedYellowStarPositions.value = [...initialPositions]; // No adjustment
      }
    };

    // const handleMouseEnter = (starIcon, idx) => {
    //   const initRotation = initialPositions[idx].rotation
    //   gsap.to(starIcon, { scale: 1.3, rotation: initRotation + 15, duration: 0.2 });
    // };
    // const handleMouseLeave = (starIcon, idx) => {
    //   const initRotation = initialPositions[idx].rotation
    //   gsap.to(starIcon, { scale: 1, rotation: initRotation, duration: 0.2 });
    // };

    // generates random background stars for the animation; each layer is 100%
    const generateWhiteStarPositions = (startLayer, endLayer, numStarsPerLayer) => {
      const starPositions = []
      for (let i = startLayer; i < endLayer; i++) {
        for(let j = 0; j < numStarsPerLayer; j++) {
          const starInfo = {
            x: Math.random() * 80 + 10, // Random x position (10-90%)
            y: Math.random() * 100 + (i * 100),  // Random y position (0-100%)
            rotation: (Math.random() * 360) // Random rotation (360 deg)
          }
          starPositions.push(starInfo)
        }
      }
      return starPositions
    }

    const startAnimation = () => {
      // resetAnimation();
      if (props.nextStep && !props.nextStep()) {
        return;
      }
      isAnimating.value = true;

      const tl = gsap.timeline({
        onComplete: () => {
          // isAnimating.value = false;
          // resetAnimation();
        }
      });


      yellowStarIcons.value.forEach((starIcon, idx) => {
        
        // starIcon.removeEventListener('mouseenter', mouseEnterHandlers[idx]);
        // starIcon.removeEventListener('mouseleave', mouseLeaveHandlers[idx]);
        const starTl = gsap.timeline();

        starTl.to(starIcon, { rotation: 360*2, duration: 1.5 });

        // Yellow stars move downwards
        starTl.to(starIcon, { 
          y: '+=100vh', 
          duration: 2, 
          rotation: 1080,
          ease: "power4.in" 
        
        });

        starTl.to(starIcon, { display:'none' });

        tl.add(starTl, 0.25);
      });

      whiteStarIcons.value.forEach((starIcon, idx) => {
        const starTl = gsap.timeline();

        // White stars move upwards
        starTl.to(starIcon, { 
          y: '-=100vh', 
          duration: 3.5,
          ease: "power4.in",
        });

        tl.to(".quote, .author", {
        scale: 1.25, 
        opacity: 1,
        duration: 2,
        display:'grid'
      })
        starTl.to(starIcon, { 
          y: '-=600vh', 
          duration: 16,
          ease: "power4"
        });

        tl.add(starTl, 0);
        tl.to({}, { duration: 5, onComplete: props.nextPage });
      });

      
    };

    onMounted(() => {
      updateStarPositions();
      window.addEventListener("resize", updateStarPositions);


      // add hover effect to yellow star
      // yellowStarIcons.value.forEach((starIcon, idx) => {
      //   // Store the event handler functions
      //   const mouseEnter = () => handleMouseEnter(starIcon, idx);
      //   const mouseLeave = () => handleMouseLeave(starIcon, idx);

      //   mouseEnterHandlers.push(mouseEnter);
      //   mouseLeaveHandlers.push(mouseLeave);

      //   starIcon.addEventListener('mouseenter', mouseEnter);
      //   starIcon.addEventListener('mouseleave', mouseLeave);
      // });

      if (whiteStarPositions.value.length === 0) {
    whiteStarPositions.value = generateWhiteStarPositions(0, 10, 20);
  }
      // setTimeout(startAnimation, 1500); 
      
    });

    onUnmounted(() => {
      window.removeEventListener("resize", updateStarPositions);
      // yellowStarIcons.value.forEach((starIcon, idx) => {
      //   if (starIcon) {
      //     starIcon.removeEventListener('mouseenter', mouseEnterHandlers[idx]);
      //     starIcon.removeEventListener('mouseleave', mouseLeaveHandlers[idx]);
      //   }
      // });

      console.log('star animation stopped')
    });

    return {
      yellowStarIcons,
      whiteStarIcons,
      yellowStarsArr,
      whiteStarPositions,
      isAnimating,
      startAnimation,
      whiteStar,
      yellowStar,
      quote,
      // handleMouseEnter,
      // handleMouseLeave,
      adjustedYellowStarPositions,
    };
  }, 
  
}
</script>

<style scoped>
.stars-animation-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  height: 85vh;
  width: 100vw;
  background-color: #0b0b22;
}

.yellow-stars-container {
  width: 100%;
  height: 60%;
}

.yellow-star-icon {
  position: absolute;
  height: 25vw;
  width: auto;
  z-index: 2;
}



.white-star-icon {
  position: absolute;
  height: 20px;
  width: 20px;
  z-index: 1;
  opacity: 1;
}

button {
  position: absolute;
  z-index:1;
  bottom: 20px;
  left: 50%;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.centered {
    position: absolute;
    color: white;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.quote, .author {
  display:none;
  opacity: 0;
  text-align: center;
  z-index: 0;
}


.quote {
  font-family: 'Nickainley', sans-serif;
  font-size: 3rem;
  font-weight: bold;
}
.author {
  font-family: 'Poppins Light', sans-serif;
  padding-top: 50px;
  font-size: 2rem;
  letter-spacing: 5px;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* Small devices such as large phones (640px and up) */
@media only screen and (min-width: 640px) {
  .yellow-star-icon {
    height: 20vw;
    width: auto;
  }
  .quote {
  font-size:5rem;
}
}

/* Medium devices such as tablets (768px and up) */
@media only screen and (min-width: 768px) {
  .yellow-star-icon {
    height: 18vw;
    width: auto;
  }
  .quote {
  font-size:5rem;
  }
}

/* Large devices such as laptops (1024px and up) */
@media only screen and (min-width: 1024px) {
  .yellow-star-icon {
    height: 15vw;
    width: auto;
  }
  .quote {
  font-size:5rem;
  }

}

/* Largest devices such as desktops (1280px and up) */
@media only screen and (min-width: 1280px) {
  .yellow-star-icon {
    height: 12vw;
    width: auto;
  }
  .quote {
    font-size: 7rem;
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

</style>
