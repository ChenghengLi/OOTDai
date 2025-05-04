<template>
    <div class="text-input-container">
      <h4 class="title">{{ title }}</h4>
      <textarea v-model="inputText" :placeholder="placeholder" @input="handleTextInput" class="input-field"></textarea>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TextCamp',
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
        inputText: this.text
      }
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
  min-height: 350px;
  margin-bottom: 20px;
  box-sizing: border-box; /* Ensures padding does not affect the overall width */
  height: 150px; /* Adjust this value to increase the height of the textarea */
}

.title {
  margin-bottom: 10px;
}
</style>