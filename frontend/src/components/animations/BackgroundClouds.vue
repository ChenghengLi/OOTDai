<template>
    <div class="clouds-container">
      <div class="clouds">
        <img v-for="(cloud, index) in clouds" 
             :key="index" 
             :src="cloud.src" 
             :class="['cloud', `cloud-${index}`]" 
             :style="cloud.style">
      </div>
      <div class="quote-box" :class="{ 'show-quote': props.showQuote }">
        <div class="quote-text">
          <p class="quote-line">"Where there is love,</p>
          <p class="quote-line">there is life"</p>
        </div>
        <p class="quote-author">GANDHI</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, defineProps} from 'vue'
  
  import leftCloudBottom from '../../assets/images/heart_animations/clouds/Left_Cloud_Bottom.png'
  import leftCloudMiddle from '../../assets/images/heart_animations/clouds/Left_Cloud_Middle.png'
  import leftCloudTop from '../../assets/images/heart_animations/clouds/Left_Cloud_Top_(close_In).png'
  import rightCloudBottom from '../../assets/images/heart_animations/clouds/Right_Cloud_Bottom.png'
  import rightCloudMiddleBottom from '../../assets/images/heart_animations/clouds/Right_Cloud_Middle-bottom_(close_In).png'
  import rightCloudMiddleTop from '../../assets/images/heart_animations/clouds/Right_Cloud_Middle-top.png'
  import rightCloudTop from '../../assets/images/heart_animations/clouds/Right_Cloud_Top.png'

  const props = defineProps({
    showQuote: {
      type: Boolean,
      default: false
    }
  });

  const clouds = ref([
    { src: leftCloudBottom, style: { top: '40%', left: '-40px', width: '700px', animationDelay: '0s' } },
    { src: leftCloudMiddle, style: { top: '10%', left: '-40px', width: '700px', animationDelay: '-5s' } },
    { src: leftCloudTop, style: { top: '1%', left: '-40px', width: '600px', animationDelay: '-10s' } },
    { src: rightCloudBottom, style: { top: '45%', right: '-40px', width: '800px', animationDelay: '-7s' } },
    { src: rightCloudMiddleBottom, style: { top: '20%', right: '-40px', width: '650px', animationDelay: '-2s' } },
    { src: rightCloudMiddleTop, style: { top: '5%', right: '-40px', width: '600px', animationDelay: '-8s' } },
    { src: rightCloudTop, style: { top: '1%', right: '-40px', width: '600px', animationDelay: '-3s' } }
  ])
  </script>
  
  <style scoped>
  .clouds-container {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  
  .clouds {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  
  .cloud {
    position: absolute;
    opacity: 0.8;
    animation: float 20s infinite ease-in-out;
  }
  
  
  @media (max-width: 768px) {
    .cloud {
      width: 90% !important;
      animation: float-mobile 20s infinite ease-in-out;
    }
    .quote-line {
      font-size: 5.2rem !important;
    }
    .quote-author {
      font-size: 3.3rem !important;
    }
  }
  
  @media (max-width: 480px) {
    .cloud {
      width: 80% !important;
      animation: float-mobile 20s infinite ease-in-out;
    }
    .quote-box {
        top: 20% !important;
    }
    .quote-line {
      font-size: 3.5rem !important;
    }
    .quote-author {
      font-size: 1.5rem !important;
    }
  }
  
  @keyframes float {
    0% {
      transform: translate(0, 0);
    }
    25% {
      transform: translate(40px, -15px);
    }
    50% {
      transform: translate(0, -25px);
    }
    75% {
      transform: translate(-40px, -15px);
    }
    100% {
      transform: translate(0, 0);
    }
  }
  
  @keyframes float-mobile {
    0% {
      transform: translate(0, 0);
    }
    25% {
      transform: translate(15px, -8px);
    }
    50% {
      transform: translate(0, -12px);
    }
    75% {
      transform: translate(-15px, -8px);
    }
    100% {
      transform: translate(0, 0);
    }
  }
  
  .quote-box {
    position: absolute;
    top: 2%;
    left: 50%;
    transform: translateX(-50%);
    background-color: transparent;
    padding: 0;
    border-radius: 0;
    z-index: 10;
    max-width: 800px;
    text-align: center;
    opacity: 0;
    visibility: hidden;
    transition: opacity 1s ease-in-out, visibility 1s ease-in-out;
  }
  
  .quote-box.show-quote {
    opacity: 1;
    visibility: visible;
  }
  
  .quote-text {
    margin-bottom: 15px;
  }
  
  .quote-line {
    font-family: 'Nickainley', sans-serif;
    font-size: 5.5rem;
    color: #333;
    line-height: 1.4;
    margin: 0;
  }
  
  .quote-author {
    font-family: 'Poppins Light', sans-serif;
    font-weight: 300;
    font-size: 3.4rem;
    color: #333;
    margin-top: 20px;
    letter-spacing: 1px;
  }
  </style>