<template>
  <div class="color-select-container">

    <h3 class="product-title">
      {{ name }}
    </h3>
    <div class="main-container justify-items-center">
      <div class="imgs-container">
        <div
          class="cloudimage-360"
          id="gurkha-suv"
          :data-folder="'/assets/360_degree/'+name+'/'"
          data-filename-x="{index}.jpg"
          :data-amount-x="showed_image_amount"
        ></div>
      </div>

      <div class="selector-container">
        <h4 class="title">{{ title }}</h4>
          <div class="colors">
            <div v-for="(color, index) in colorsList" :key="index" class="color-container"
              :class="{ 'selected': isSelected(index) }" @click="toggleSelection(index)"
              :style="{ backgroundColor: color }"></div>
          </div>

      </div>
    </div>
    <div class="button-container">
        <button class="actionButton" @click="cancel">Back</button>
        <button class="actionButton" @click="next">Next</button>

      </div>
  </div>
  
</template>

<script>
export default {
  name: 'ColorSelectComponent',
  props: {
    name: String,
    title: String,
    showed_image_amount: Number,
    colors: {
      type: Array,
      default: () => []
    },
    maxSelect: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      colorsList: this.colors,
      selectedIndices: []
    }
  },
  methods: {
    toggleSelection(index) {
      const selectedIndex = this.selectedIndices.indexOf(index);
      if (selectedIndex !== -1) {
        this.selectedIndices.splice(selectedIndex, 1);
      } else {
        if (this.selectedIndices.length >= this.maxSelect) {
          this.selectedIndices.shift(); // Remove the oldest selected index
        }
        this.selectedIndices.push(index);
      }
      this.$emit('updateSelection', this.selectedIndices.map(i => this.colorsList[i]));
    },
    isSelected(index) {
      return this.selectedIndices.includes(index);
    },
    next() {
      console.log(this.colorsList);
      this.$emit('next', "nextProduct");
    }
  },  
  mounted() {
    window.CI360.init();
  }
}
</script>

<style scoped>
.color-select-container {
  max-width: 50vw;
  margin: 0 auto;
  width: 100%;
}
.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 1vw;
}
.button-container > :first-child {
  transform: translateX(-100%);
}

.button-container > :last-child {
  transform: translateX(100%);
}
.main-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1vw;
}
.product-title {
  margin-top: 5.5vw;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 24.65vw;
  height: 2.15vw;
  font-size: 2.75vw;
  font-family: BaskervilleDisplayPT, BaskervilleDisplayPT-Bold;
  font-weight: 700;
  text-align: center;

  color: #514f4c;
}
.imgs-container {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  margin-top: 4.15vw;
  border-radius: 1.6667vw;
  width: 25vw;
  height: 25vw;
  overflow: hidden;
}
.title{
  margin-top: 14.15vw;
  height: 1.55vw;
  font-size: 2.05vw;
  font-family: Glacial Indifference, Glacial Indifference-Italic;
  font-weight: 400;
  text-align: center;
  color: #000000;
  line-height: 2.05vw;
}
.colors {
  display: grid;
  grid-template-columns: repeat(auto-fit, 3vw);
  gap: 1vw;
  /* Reduced gap for a more compact layout */
  justify-content: center;
  /* Center the grid items */
  margin-top: 1vw;
}

.color-container {
  width: 3vw;
  /* Smaller size for a more minimalist design */
  height: 3vw;
  cursor: pointer;
  border: 0.05vw solid transparent;
  /* Subtler border */
  border-radius: 50%;
  /* Softer corners */
  border: 0.05vw solid #000000;
  /* Black border for non-selected colors */
}

.color-container.selected {
  border-color: #218838;
  /* Green border for selected colors, kept for clarity */
}

.actionButton {
  width: 8vw;
  height: 2.05vw;
  border-radius: 1.025vw;
  background: #cfc5b3;
  color: black;
  border: none;
  font-size: 1.4vw;
  font-family: Glacial Indifference, Glacial Indifference-Bold;
  font-weight: 700;
  text-align: center;
  cursor: pointer;
  margin-top: 1vw;
}
@media screen and (max-width: 768px){
  .main-container {
    grid-template-columns: 1fr;
    place-items: center; /* 水平和垂直居中 */
  }
  .color-select-container{
    max-width: 100vw;
  }
  .product-title {
    margin-top: 10.4167vw;
    height: 9.1146vw;
    width: 120%;
    font-size: 7.1615vw;
    font-family: BaskervilleDisplayPT, BaskervilleDisplayPT-Bold;
    font-weight: 700;
    text-align: center;
    color: #514f4c;
  }
  .imgs-container {
    margin-top: 4.9479vw;
    height: 67.7083vw;
    width: 67.7083vw;
  }
  .title{
    margin-top: 5.2083vw;
    font-size: 4.9479vw;
    line-height: 5.599vw;
    height: 5.4688vw;
  }
  .color-container{
    width: 9.7656vw;
    height: 9.7656vw;

  }
  .colors {
    margin-top: 4.4271vw;
    grid-template-columns: repeat(auto-fit, 13.0208vw);
  }
  .button-container {
    margin-top: 18.2292vw;
  }
  .button-container > :first-child {
    transform: translateX(100%);
  }

  .button-container > :last-child {
    transform: translateX(-100%);
  }
  .actionButton {
    width: 19.0104vw;
    height: 4.9479vw;
    border-radius: 2.474vw;
    font-size: 3.2552vw;
  }
}
</style>
