<template>
    <div class="hands" :class="{ 'hands-close': isClose }">
      <img :src="closedHandsImg" class="hands-closed" v-show="isClose">
      <img :src="openHandsImg" class="hands-opened" v-show="!isClose">
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch} from 'vue'
  import closedHandsImg from '../../assets/images/heart_animations/hands/Hand_Closed.png'
  import openHandsImg from '../../assets/images/heart_animations/hands/Hand_Open.png'
  

  const props = defineProps({
    initialClose: {
      type: Boolean,
      default: false
    }
  })

  const isClose = ref(props.initialClose)
  
  watch(() => props.initialClose, (newVal) => {
    isClose.value = newVal
  })
  </script>
  
  <style scoped>
  .hands {
    position: absolute;
    z-index: 3;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0);
    transition: all 2s cubic-bezier(0.4, 0, 0.2, 1);
    filter: brightness(0) invert(1)
  }
  
  .hands img {
    width: 1300px;
    display: block;
    vertical-align: bottom;
  }
  
  @media (max-width: 1400px) {
    .hands img {
      width: 1100px;
    }
  }
  
  @media (max-width: 768px) {
    .hands img {
      width: 900px;
    }
  }
  
  @media (max-width: 480px) {
    .hands img {
      width: 700px;
    }
  }
  .hands-opened {
    z-index: -1;
  }
  .hands-close {
    transform: translate(-50%, 0);
  }
  
  .hands-closed, .hands-opened {
    transition: opacity 1.5s ease-in-out;
  }
  </style> 