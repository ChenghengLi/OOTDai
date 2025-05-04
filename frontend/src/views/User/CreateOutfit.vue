<template>
    <main-header />
    <sub-header
    subHeading="Find Your Favourite Best Combinations"/>
 <div class="container-fluid">
        <div class="row justify-content-center" v-if="loaded">
      <!-- Just the component, nothing else -->
      <clothing-uploader-component @combinations-found="handleCombinationsFound" />
    </div>
        <product-preloader v-else> Loading... </product-preloader>
    </div>
    <main-footer />
</template>

  <script>

import SubHeader from "@/components/SubHeader.vue";
import ProductPreloader from "@/components/preloaders/ProductPreloader.vue";
import MainHeader from "@/components/MainHeader.vue";
import MainFooter from "@/components/MainFooter.vue";
import ClothingUploaderComponent from '@/components/home_components/ClothCombiner.vue';

export default {
    name: "ShopView",
    components: {
        SubHeader,
        MainHeader,
        MainFooter,
        "product-preloader": ProductPreloader,
        ClothingUploaderComponent
    } ,
    data() {
        return {
            loaded: true,
        };
    },
    methods: {
      handleCombinationsFound(data) {
        console.log('Combinations found:', data);
        // Handle the results here - you might navigate to a results page
        // or update state to show results
      }
      
    }
  }
  </script>
  
  <style scoped>
  .styling-app {
    width: 100%;
    min-height: 100vh;
    background-color: #ffffff;
    font-family: sans-serif;
  }
  </style>