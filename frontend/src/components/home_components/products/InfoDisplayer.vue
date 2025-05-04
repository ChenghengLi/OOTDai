<template>
    <div class="container">
      <h2>{{ profileType }}</h2>
      <h3>{{ controlType }}</h3>
      <div class="pet-info">
        <h4>{{ petName }}</h4>
        <p>{{ petType }}</p>
        <a :href="`https://instagram.com/${instagram}`" target="_blank">{{ instagram }}</a>
      </div>
      <div class="images">
        <img v-for="(image, index) in images" :key="index" :src="image" alt="Pet Image" class="pet-image"/>
      </div>
      <p>{{ comments }}</p>
      <div>{{ theme }}</div>
      <div v-if="controlType !== 'mystery box'">
        <div v-for="(product, index) in product" :key="index">
          <h4>{{ product.name }}</h4>
          <p v-if="controlType === 'medium control' && product.professional">Professional: Yes</p>
          <p v-else-if="controlType === 'full control'">Professional: {{ product.professional ? 'Yes' : 'No' }}</p>
          <div v-if="product.showComponent">
            <p>Image Selected: {{ product.currentComponent.props.imagesList[0] }}</p>
            <p>Color Selected: {{ product.currentComponent.emits.selection[0] }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CustomComponent',
    props: {
      profileType: String,
      controlType: String,
      petName: String,
      petType: String,
      instagram: String,
      images: Array,
      comments: String,
      theme: String,
      product: Array
    }
  }
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    color: #333;
  }
  
  .pet-info, .images, .pet-image {
    margin-bottom: 20px;
  }
  
  .pet-image {
    width: 100%;
    max-width: 200px;
    height: auto;
    border-radius: 10px;
  }
  
  a {
    color: #2a7f62;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
  </style>