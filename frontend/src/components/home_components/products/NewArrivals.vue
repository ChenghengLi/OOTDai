<template>
  <section class="products" id="products">
    <h2>Get Your <span>Perfect</span> Outfit</h2>
    <p class="highlight"></p>
    <div class="container">
      <div class="background-grid" v-if="newArrivals.length >= 3">
        <div class="bg-column bg-1">
          <product-card
            v-if="newArrivals[0]"
            :productId="newArrivals[0]._id"
            :productName="newArrivals[0].name"
            :brand="newArrivals[0].brand"
            :price="newArrivals[0].price"
            :currency="newArrivals[0].currency"
            :ratings="newArrivals[0].rating"
            :image_url="newArrivals[0].images[0]"
            :in_stock="newArrivals[0].in_stock"
            @click="handleProductClick(newArrivals[0])"
          />
        </div>
        <div class="bg-column bg-2">
          <product-card
            v-if="newArrivals[1]"
            :productId="newArrivals[1]._id"
            :productName="newArrivals[1].name"
            :brand="newArrivals[1].brand"
            :price="newArrivals[1].price"
            :currency="newArrivals[1].currency"
            :ratings="newArrivals[1].rating"
            :image_url="newArrivals[1].images[0]"
            :in_stock="newArrivals[1].in_stock"
            @click="handleProductClick(newArrivals[1])"
          />
        </div>
        <div class="bg-column bg-3">
          <product-card
            v-if="newArrivals[2]"
            :productId="newArrivals[2]._id"
            :productName="newArrivals[2].name"
            :brand="newArrivals[2].brand"
            :price="newArrivals[2].price"
            :currency="newArrivals[2].currency"
            :ratings="newArrivals[2].rating"
            :image_url="newArrivals[2].images[0]"
            :in_stock="newArrivals[2].in_stock"
            @click="handleProductClick(newArrivals[2])"
          />
        </div>
      </div>
      <product-preloader type="inline" v-else>Loading products...</product-preloader>
    </div>
  </section>
</template>

<script>
import ProductCard from "@/components/home_components/cards/ProductCard.vue";
import ProductPreloader from "@/components/preloaders/ProductPreloader.vue";
export default {
  name: "NewArrivals",
  components: {
    ProductCard,
    ProductPreloader,
  },
  data() {
    return {
      newArrivals: [], // Initialize inputText with the prop value
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      fetch("/data/products.json")
        .then((response) => response.json())
        .then((data) => {
          this.newArrivals = data.results.map((product) => {
            product.images[0] = product.images[0].replace("http", "https");

            return product;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleProductClick(index) {
      this.$emit("product-clicked", index);
    },
  },
};
</script>

<style>
.products {
  background-color: #fff;
  padding: 0;
  padding-bottom: 24px;
}

.products h2 {
  font-family: "Baskervville", serif;
  color: var(--bistre);
  font-size: 32px;
  margin-top: 32px;
}

.products h2 span {
  font-family: "Baskervville", serif;
  color: var(--lion);
}

.background-grid {
  display: flex;
  width: 100%;
  gap: 1rem;
}

.bg-column {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  min-height: 750px;
  position: relative;
  overflow: hidden;
  animation: rollDown 1.5s ease-out;
}

.bg-column::before {
  content: "";
  position: absolute;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.25); /* Transparencia */
  z-index: 1;
}

.bg-column > * {
  position: relative;
  z-index: 2;
}

.bg-1 {
  background-image: url('~@/assets/images/first.jpg');
}

.bg-2 {
  background-image: url('~@/assets/images/second.jpg');
}

.bg-3 {
  background-image: url('~@/assets/images/third.jpg');
}

</style>
