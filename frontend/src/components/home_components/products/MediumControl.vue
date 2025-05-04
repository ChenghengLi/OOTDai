<template>

  <div>
    <div v-for="(product, index) in personalizationSets" :key="index" v-if="loaded">
      <personalization-button v-if="product.showComponent && deciding" :title="product.name"
        @updateProfessional="handleUpdateProfessional" />
      <component v-if="product.showComponent && !deciding" :is="product.currentComponent.id"
        v-bind="product.currentComponent.props" @updateSelection="handleSelection" @next="next" />

    </div>
    <product-preloader v-else> Loading... </product-preloader>

  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import PersonalizationButton from './PersonalizationButton.vue';
import ImageSelector from './ImageSelector.vue';
import ColorSelector from './ColorSelector.vue';
import ProductPreloader from "@/components/preloaders/ProductPreloader.vue";

export default {
  components: {
    PersonalizationButton,
    ImageSelector,
    ColorSelector,
    ProductPreloader,
  },
  props: {
    images: {
      type: Array,
      default: []
    },
  },
  data() {
    return {
      personalizationSets: [],
      step: 0,
      deciding: true,
      loaded: false
    };
  },
  mounted() {
    this.fetchPersonalizationSets();
  },
  methods: {
    async fetchPersonalizationSets() {
      this.loaded = false;
      fetch("/data/personalization/sets.json")
        .then((response) => response.json())
        .then((data) => {
          this.personalizationSets = data.Everlast.products.map((product, index) => {
            product.showComponent = index === 0 ? true : false;
            product.professional = true;
            product.currentComponent = product.components[0];
            if (product.currentComponent.id === "ImageSelector") {
              product.currentComponent.props = {
                title: "Select Image",
                imagesList: this.images,
                maxSelect: 1
              };
            }
            this.loaded = true;
            return product;
          });
          console.log(this.personalizationSets);
        })
        .catch((err) => {
          console.log(err);
          this.loaded = false;
        });
    },
    handleUpdateProfessional(professional) {
      // Handle the professional state here
      console.log('Professional state updated:', professional);
      if (professional) {
        this.personalizationSets[this.step].showComponent = false;
        this.step = this.step + 1;
        if(this.step == this.personalizationSets.length - 1){
          this.$emit('updateProduct', this.personalizationSets);
          return
        }
        this.personalizationSets[this.step].showComponent = true;
      } else {
        this.deciding = false;
        this.personalizationSets[this.step].professional = false;
      }

    },
    handleSelection(selection) {
      console.log('Selection:', selection);
      this.personalizationSets[this.step].currentComponent.emits.selection = selection;
    },
    next() {

      if (this.step == this.personalizationSets.length - 1) {
        console.log(this.personalizationSets);
        this.$emit('updateProduct', this.personalizationSets);
      } else {
        this.personalizationSets[this.step].showComponent = false;
        this.step = this.step + 1;
        this.personalizationSets[this.step].showComponent = true;
        this.deciding = true;
      }
    }
  },
  watch: {
    // Watch the 'step' data property
    step(newValue, oldValue) {
      // Scroll to the top of the page whenever 'step' changes
      window.scrollTo(0, 0);
    }
  }
};
</script>