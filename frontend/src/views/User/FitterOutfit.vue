<template>
    <main-header />
    <div class="container-fluid">
      <div class="row justify-content-center" v-if="loaded">
        <!-- Just the component, nothing else -->
        <outfit-fitter-component @outfit-generated="handleOutfitGenerated" />
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
  import OutfitFitterComponent from '@/components/home_components/OutfitFitter.vue';
  
  export default {
    name: "OutfitFitterView",
    components: {
      SubHeader,
      MainHeader,
      MainFooter,
      "product-preloader": ProductPreloader,
      OutfitFitterComponent
    },
    data() {
      return {
        loaded: true,
      };
    },
    methods: {
      handleOutfitGenerated(data) {
        console.log('Outfit generated:', data);
        // Handle the results here - you might navigate to a results page
        // or update state to show results
      }
    }
  }
  </script>
  
  <style scoped>
  .container-fluid {
    padding: 30px 0;
    background-color: #fafafa;
    min-height: calc(100vh - 200px); /* Adjust based on header/footer heights */
  }
  
  .row {
    margin: 0;
  }
  </style>