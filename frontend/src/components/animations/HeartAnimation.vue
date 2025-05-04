<template>
  <div class="animation-container">
    <BackgroundClouds :showQuote="moveDown"/>
    <AnimatedHands :initialClose="moveDown" :style="{ pointerEvents: 'none' }"/>
    <div class="heart" :class="{ 'show-heart': showHeart, 'move-down': moveDown }">
      <div v-if="prodName === 'Accompania'">
        <img v-for="(part, index) in accHeartParts" 
           :key="index"
           :src="part.src"
           :class="['heart-part', `heart-part-${index}`, { gray: !personalizationSet[index].isComplete }]"
           @click="startCustomization(index)"
           :style="part.style">
      </div>

      <div v-else-if="prodName === 'Artistico'">
        <img v-for="(part, index) in artHeartParts" 
           :key="index"
           :src="part.src"
           :class="['heart-part', `heart-part-${index}`, { gray: !personalizationSet[index].isComplete } ]"
           @click="startCustomization(index)"
           :style="part.style">
      </div>

      <div v-else-if="prodName === 'Everlast'">
        <img v-for="(part, index) in evHeartParts" 
           :key="index"
           :src="part.src"
           :class="['heart-part', `heart-part-${index}`, { gray: !personalizationSet[index].isComplete }]"
           @click="startCustomization(index)"
           :style="part.style">
      </div>
      <div class="next-button-container">
        <button :disabled="moveDown" @click="startAnimation">Next</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BackgroundClouds from './BackgroundClouds.vue'
import AnimatedHands from './AnimatedHands.vue'
import acc_heart1 from '../../assets/images/heart_animations/hearts/Heart1.png'
import acc_heart2 from '../../assets/images/heart_animations/hearts/Heart2.png'
import acc_heart3 from '../../assets/images/heart_animations/hearts/Heart3.png'
import acc_heart4 from '../../assets/images/heart_animations/hearts/Heart4.png'
import acc_heart5 from '../../assets/images/heart_animations/hearts/Heart5.png'
import acc_heart6 from '../../assets/images/heart_animations/hearts/Heart6.png'

import art_heart1 from '../../assets/images/heart_animations/hearts/Artistico_5/A1.png'
  import art_heart2 from '../../assets/images/heart_animations/hearts/Artistico_5/A2.png'
  import art_heart3 from '../../assets/images/heart_animations/hearts/Artistico_5/A3.png'
  import art_heart4 from '../../assets/images/heart_animations/hearts/Artistico_5/A4.png'
  import art_heart5 from '../../assets/images/heart_animations/hearts/Artistico_5/A5.png'

  import ev_heart1 from '../../assets/images/heart_animations/hearts/Everlast_4/H1.png'
import ev_heart2 from '../../assets/images/heart_animations/hearts/Everlast_4/H2.png'
import ev_heart3 from '../../assets/images/heart_animations/hearts/Everlast_4/H3.png'
import ev_heart4 from '../../assets/images/heart_animations/hearts/Everlast_4/H4.png'

const props = defineProps({
  prodName: {
    type: String,
    required: true,
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
})

const showHeart = ref(false)
const moveDown = ref(false)
const accHeartParts = ref([
  { 
    src: acc_heart1, 
    style: { 
      animationDelay: '0s',
      left: '54%',
      top: '41%',
      width: '260px'
    } 
  },
  { 
    src: acc_heart2, 
    style: { 
      animationDelay: '0.2s',
      left: '28%',
      top: '26.5%',
      width: '350px'
    } 
  },
  { 
    src: acc_heart3, 
    style: { 
      animationDelay: '0.4s',
      left: '64%',
      top: '3%',
      width: '290px'
    } 
  },
  { 
    src: acc_heart4, 
    style: { 
      animationDelay: '0.6s',
      left: '74%',
      top: '17%',
      width: '210px'
    } 
  },
  { 
    src: acc_heart5, 
    style: { 
      animationDelay: '0.8s',
      left: '90%',
      top: '0%',
      width: '260px'
    } 
  },
  { 
    src: acc_heart6, 
    style: { 
      animationDelay: '1.0s',
      left: '27%',
      top: '4%',
      width: '260px'
    } 
  }
])

const artHeartParts = ref([
    { 
      src: art_heart1, 
      style: { 
        animationDelay: '0s',
        left: '52%',
        top: '46%',
        width: '320px'
      } 
    },
    { 
      src: art_heart2, 
      style: { 
        animationDelay: '0.2s',
        left: '79%',
        top: '4%',
        width: '230px'
      } 
    },
    { 
      src: art_heart3, 
      style: { 
        animationDelay: '0.4s',
        left: '64%',
        top: '9%',
        width: '260px'
      } 
    },
    { 
      src: art_heart4, 
      style: { 
        animationDelay: '0.6s',
        left: '31%',
        top: '22%',
        width: '230px'
      } 
    },
    { 
      src: art_heart5, 
      style: { 
        animationDelay: '0.8s',
        left: '33%',
        top: '5%',
        width: '200px'
      } 
    }
  ])

  const evHeartParts = ref([
  { 
    src: ev_heart1, 
    style: { 
      animationDelay: '0s',
      left: '43%',
      top: '40%',
      width: '310px'
    } 
  },
  { 
    src: ev_heart2, 
    style: { 
      animationDelay: '0.2s',
      left: '75%',
      top: '10%',
      width: '350px'
    } 
  },
  { 
    src: ev_heart3, 
    style: { 
      animationDelay: '0.4s',
      left: '60%',
      top: '17%',
      width: '260px'
    } 
  },
  { 
    src: ev_heart4, 
    style: { 
      animationDelay: '0.6s',
      left: '29%',
      top: '10%',
      width: '230px'
    } 
  }
])
onMounted(() => {
  setTimeout(() => {
    showHeart.value = true
  }, 500)
})
const startAnimation = () => {
  if (props.nextStep && !props.nextStep()) {
    return;
  }
  moveDown.value = true
  setTimeout(() => {
    if (props.nextPage) {
      props.nextPage()
    }
  }, 3000)

  // setTimeout(() => {
  //   moveDown.value = true
  // }, 2500)
}
</script>

<style scoped>
.animation-container {
  width: 100vw;
  height: 85vh;
  min-height: 350px;
  position: relative;
  overflow: hidden;
  background: url('../../assets/images/heart_animations/Background.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
}

.heart {
  position: absolute;
  z-index: 2;
  left: 50%;
  top: 70%;
  transform: translate(-50%, -50%);
  width: 560px;
  height: 560px;
  transition: transform 1s ease-in-out;
  opacity: 0;
}

@media (max-width: 768px) {
  .heart {
    width: 450px;
    height: 450px;
    top: 75%;
  }
  .heart-part {
    transform: translate(-50%, -50%) scale(0.75) !important;
  }
  .move-down {
    transform: translate(-50%, -10%) !important;
  }
}

@media (max-width: 480px) {
  .heart {
    width: 350px;
    height: 350px;
    top: 80%;
  }
  .heart-part {
    transform: translate(-50%, -50%) scale(0.6) !important;
  }
  .move-down {
    transform: translate(-50%, -5%) !important;
  }
}

.heart-part {
  position: absolute;
  opacity: 0;
  transform: translate(-50%, -50%);
}

.show-heart .heart-part {
  animation: showHeartPart 1s forwards;
}

.move-down {
  transform: translate(-50%, -17%);
}

@keyframes showHeartPart {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0) rotate(-30deg);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1) rotate(0);
  }
}

.show-heart {
  opacity: 1;
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
</style> 