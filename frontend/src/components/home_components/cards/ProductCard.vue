<template>
  <div
    class="product__card"
    :class="'bg-' + index"
  >
    <img :src="image_url" :alt="brand" class="product__image" loading="lazy" />
    <div class="product__info d-flex justify-content-center">
      <p class="product__name">{{ productName }}</p>
    </div>
  </div>
</template>

<script>
import { getCurrentWatcher } from 'vue';

export default {
  name: "ProductCard",
  props: [
  "index",
  "productId",
  "image_url",
  "brand",
  "productName",
  "price",
  "currency",
  "ratings",
  "in_stock",
],
  computed: {
    formattedPrice() {
      return this.currency + " " + this.price.toFixed(2);
    },
  },
};
</script>

<style scoped>
.product__card {
  transition: transform 0.05s ease-in;
  border-radius: 10px;
  color: var(--bistre);
  transition: 0.2s all linear;
  cursor: pointer;
  flex-shrink: .2;
  max-width: 320px;
  box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.25);

}

.product__card:hover {
  scale: 1.025;
  border: 1px solid rgba(0, 0, 0, 0.02);
  box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.25);
}

.product__card:hover .product__image {
  border: none;
  border-radius: 10px 10px 0 0;
}

.product__image {
  max-height: 400px; /* Set a fixed height */
  width: 100%; /* Ensure the image takes the full width of its container */
  object-fit: cover; /* Cover the container without distorting the image */
  border-radius: 10px;

  transition: 0.2s all linear;
}

.product__info {
  display: flex;
  justify-content: space-between;
  padding: 0 8px;
}

.product__name {
  color: var(--bistre);
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.price {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.price span {
  font-size: 1.6rem;
  font-weight: 700;
}
</style>
