<template>
    <div class="selector-container">
      <h3 class="title">{{ title }}</h3>
      <select v-model="selectedItem" @change="updateSelection">
        <option disabled value="">{{ placeholder }}</option>
        <option v-for="(item, index) in items" :key="index" :value="item">
          {{ item }}
        </option>
      </select>
    </div>
  </template>
  
  <script>
  import { ref, watch } from 'vue';
  
  export default {
    name: 'SelectorComponent',
    props: {
      title: String,
      items: Array,
      modelValue: [String, Number, Object], // Accepts String, Number, or Object depending on what your items array contains
      placeholder: {
        type: String,
        default: 'Please select an option'
      }
    },
    emits: ['selectorUpdate'],
    setup(props, { emit }) {
      const selectedItem = ref(props.modelValue);
  
      // Emit the updated value to the parent component
      const updateSelection = () => {
        emit('selectorUpdate', selectedItem.value);
      };
  
      // Watch for external changes to modelValue and update the local selectedItem accordingly
      watch(() => props.modelValue, (newValue) => {
        selectedItem.value = newValue;
      });
  
      return { selectedItem, updateSelection };
    }
  }
  </script>
  
  <style scoped>
  .selector-container {
    max-width: 700px;
    margin: 0 auto;
    width: 100%;
  }
  
  .title {
    margin-bottom: 10px;
  }
  
  select {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    box-sizing: border-box;
    /* Default font size for small screens */
    font-size: 14px; 
  }
  
  /* Medium screens (e.g., tablets) */
  @media (min-width: 600px) {
    select {
      font-size: 16px;
    }
  }
  
  /* Large screens (e.g., desktops) */
  @media (min-width: 992px) {
    select {
      font-size: 18px;
    }
  }
  </style>
  