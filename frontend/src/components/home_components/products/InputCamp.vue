<template>
    <div class="text-input-container">
      <h3 class="title">{{ title }}</h3>
      <input type="text" :placeholder="placeholder" v-model="inputText" @input="handleTextInput" class="input-field"/>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TextInputComponent',
    props: {
      title: String,
      placeholder: String,
      text: {
        type: String,
        default: '' // Set the default value for the text prop
      }
    },
    data() {
      return {
        inputText: this.text // Initialize inputText with the prop value
      };
    },
    methods: {
      handleTextInput() {
        this.$emit('textUpdated', this.inputText);
      }
    }
  }
  </script>
  
  <style scoped>
  .text-input-container {
    max-width: 700px;
    margin: 0 auto;
    width: 100%;
  }
  
  .input-field {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    box-sizing: border-box; /* Ensures padding does not affect the overall width */
  }
  
  .title {
    margin-bottom: 10px;
  }
  </style>
  