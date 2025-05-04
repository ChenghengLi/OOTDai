<template>
    <div>
      <h3 class="title">{{ title }}</h3>
      <div class="button-container">
        <button class="left-button" @click="handleProfessionalClick">Let Professional Personalize</button>
        <button class="right-button" @click="handlePersonalizeClick">Personalize Yourself</button>
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    name: 'PersonalizationButtons',
    props: ['title'], // Declare the title prop

    data() {
      return {
        professional: "" // Initialize professional state
      };
    },
    methods: {
    handleProfessionalClick() {
 
      this.professional = true;
      this.$emit('updateProfessional', this.professional); // Emit the professional state to the parent
    },
    handlePersonalizeClick() {
      this.professional = false;
      this.$emit('updateProfessional', this.professional); // Emit the professional state to the parent
    }
  }
  }
  </script>
  <style scoped>
  .button-container {
    display: flex;
    width: 100%;
    /* Adjust the height for big screens */
    height: 60vh; /* vh unit ensures the height is based on the viewport height */
  }
  
  .left-button, .right-button {
    /* Adjust the button heights for big screens */
    font-size: 2rem;
    height: 100%; /* This ensures buttons fill the container height */
  }
  
  .left-button {
    background-color: #F6E8E0;
    width: 69%;
    /* Additional styles for the left button */
  }
  
  .right-button {
    background-color: #F6E8E0;
    width: 30%;
    margin-left: 1% ;
    /* Additional styles for the right button */
  }
    .title {
    margin-bottom: 10px;
  }
  
  /* Styles for small screens */
  @media (max-width: 768px) {
    .button-container {
      flex-direction: column;
      height: auto; /* Auto height to accommodate total height of both buttons */
    }
  
    .left-button, .right-button {
      width: 100%; /* Buttons occupy full container width */
      /* Adjust heights to maintain 70-30 ratio */
      height: 38vh; /* vh unit ensures the height is based on the viewport height */
    }
  
    .right-button {
      height: 18vh; /* Adjusted for the 70-30 height ratio */
      margin-left: 0px; margin-top: 1%;
    }
  }
  </style>
  