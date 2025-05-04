<template>
  <section class="description__section">
    <div
      class="description__container"
      :style="{ display: isVisible ? 'flex' : 'none' }"
      v-if="product"
    >
      <div
        class="description__text"
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1, transition: { duration: 500 } }"
      >
        <h1>{{ product.name }}</h1>
        <p>{{ product.description }}</p>
        <div class="price__section">
          <button @click="$router.push(product.router)">
            {{product.click }}
          </button>
        </div>
      </div>
      <img
      :src="require(`../../assets/images/${product.name.toLowerCase()}.png`)"
      v-motion
        :initial="{ opacity: 0, x:20 }"
        :enter="{ opacity: 1, x:0, transition: { duration: 500 } }"
    </div>
  </section>
</template>

<script>
export default {
  name: "ProductDescription",
  props: {
    isVisible: Boolean,
    index: Number,
    product: Object,
  },
  methods: {},
};
</script>

<style scoped>
.description__section {
  padding: 0;
  background-color: var(--bistre);
}

.description__container {
  background-color: var(--bistre);
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
  transform-origin: top;
  transform: scaleY(1);
  flex-direction: column-reverse;
  color: var(--cosmic-latte);
  padding: 100px 16px;
}

.description__text {
  padding: 12px;
}

.description__text h1 {
  font-family: "Baskervville", serif;
  margin: 20px 0;
}

.description__text p {
  color: var(--cosmic-latte);
  margin-bottom: 50px;
  font-weight: 300;
}

.description__text .price__section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price__section span {
  font-size: 20px;
  font-weight: 500;
}

.description__text button {
  padding: 8px 20px;
  font-family: "Baskervville", serif;
  font-size: 16px;
}

.description__container img {
  border-radius: 5px;
}

@media (min-width: 940px) {
  .description__container {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    max-width: 1200px;
    margin: auto;
  }
  .description__container img {
    max-width: 550px;
  }
}

@media (min-width: 1200px) {
  .description__container {
    gap: 100px;
  }
}
</style>
