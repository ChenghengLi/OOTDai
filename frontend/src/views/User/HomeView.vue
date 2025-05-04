<template>
  <main-header />
  <section class="hero__section">
    <div class="hero__text">
      <div
        v-motion
        :initial="{ opacity: 0, x: -50 }"
        :visibleOnce="{ opacity: 1, x: 0 }"
      >
        <h1><span>Dress Smart</span> Own Your Style </h1>
        <p>
          Love an outfit? Upload it and instantly find similar dresses and looks online. From everyday styles to trending fits, discover and shop fashion that matches your vibe—effortlessly.
        </p>

        <a href="#icon__section">Start Now</a>
      </div>
    </div>

    <img
      ref="heroImage"
      v-motion
      :initial="{ opacity: 0, y: 60 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 300 } }"
      src="@/assets/images/hero.png"
    />
  </section>
  <!-- <service-section />
    <section class="feature__section">
        <div class="container">
            <featured-products :featuredProducts="featuredProducts" />
        </div>
    </section>

    <banner-section /> -->
  <section class="icon__section" id="icon__section">
    <ul class="icon__container">
      <li
        v-motion
        :initial="{ opacity: 0, scale: 0.6 }"
        :visibleOnce="{ opacity: 1, scale: 1 }"
        :delay="400"
      >
        <svg
          width="45"
          height="45"
          viewBox="0 0 45 45"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.5 40.0313L19.7813 37.5563C10.125 28.8 3.75 23.0062 3.75 15.9375C3.75 10.1438 8.2875 5.625 14.0625 5.625C17.325 5.625 20.4562 7.14375 22.5 9.525C24.5438 7.14375 27.675 5.625 30.9375 5.625C36.7125 5.625 41.25 10.1438 41.25 15.9375C41.25 23.0062 34.875 28.8 25.2187 37.5563L22.5 40.0313Z"
            fill="#2B2118"
          />
        </svg>

        <p>STYLISH</p>
      </li>
      <li
        v-motion
        :initial="{ opacity: 0, scale: 0.6 }"
        :visibleOnce="{ opacity: 1, scale: 1 }"
        :delay="600"
      >
      <svg
          width="45"
          height="45"
          viewBox="0 0 45 45"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.5 40.0313L19.7813 37.5563C10.125 28.8 3.75 23.0062 3.75 15.9375C3.75 10.1438 8.2875 5.625 14.0625 5.625C17.325 5.625 20.4562 7.14375 22.5 9.525C24.5438 7.14375 27.675 5.625 30.9375 5.625C36.7125 5.625 41.25 10.1438 41.25 15.9375C41.25 23.0062 34.875 28.8 25.2187 37.5563L22.5 40.0313Z"
            fill="#2B2118"
          />
        </svg>
        <p>PERSONALIZED</p>
      </li>
      <li
        v-motion
        :initial="{ opacity: 0, scale: 0.6 }"
        :visibleOnce="{ opacity: 1, scale: 1 }"
        :delay="800"
      >
        <svg
          width="45"
          height="45"
          viewBox="0 0 45 45"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.5 40.0313L19.7813 37.5563C10.125 28.8 3.75 23.0062 3.75 15.9375C3.75 10.1438 8.2875 5.625 14.0625 5.625C17.325 5.625 20.4562 7.14375 22.5 9.525C24.5438 7.14375 27.675 5.625 30.9375 5.625C36.7125 5.625 41.25 10.1438 41.25 15.9375C41.25 23.0062 34.875 28.8 25.2187 37.5563L22.5 40.0313Z"
            fill="#2B2118"
          />
        </svg>
        <p>SIMPLE</p>
      </li>
    </ul>
  </section>

  <new-arrivals
    :newArrivals="newArrivals"
    @product-clicked="showProductDescription"
  />
  <!--<advert-section />-->
  <product-description
    :isVisible="isDescriptionVisible"
    :product="selectedProduct"
  />

  <main-footer />
</template>

<script>
import ServiceSection from "@/components/home_components/ServiceSection.vue";
import BannerSection from "@/components/home_components/BannerSection.vue";
import NewArrivals from "@/components/home_components/products/NewArrivals.vue";
import AdvertSection from "@/components/home_components/AdvertSection.vue";
import FeaturedProducts from "@/components/home_components/products/FeaturedProducts.vue";
import ActionButton from "@/components/ActionButton.vue";
import MainHeader from "@/components/MainHeader.vue";
import NewsLetter from "@/components/NewsLetter.vue";
import MainFooter from "@/components/MainFooter.vue";
import ProductDescription from "@/components/home_components/ProductDescription.vue";
import ProductReview from "@/components/home_components/ProductReview.vue";
import {searchProductsByImage} from "@/apis/inditex";

import { mapActions } from "vuex";

export default {
  name: "HomeView",
  data() {
    return {
      products: [],
      isDescriptionVisible: false,
      selectedProduct: null,
    };
  },
  methods: {
    ...mapActions(["set_products"]),
    handleScroll() {
      // Calculate scroll offset for parallax effect
      this.scrollOffset = window.scrollY;
      const heroImage = this.$refs.heroImage;

      if (heroImage) {
        // Apply transform based on scroll position
        const translateY = Math.min(this.scrollOffset * 0.2, 200); // Adjust factor for sensitivity
        heroImage.style.transform = `translateY(${translateY}px)`;
      }
    },
    showProductDescription(product) {
      this.selectedProduct = product;
      this.isDescriptionVisible = true;

      this.$nextTick(() => {
        const container = document.querySelector(".description__container");
        const offset = window.innerWidth > 768 ? 120 : 80; // desired offset in pixels

        if (container) {
          const targetPosition =
            container.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = targetPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth", // Smooth scrolling effect
          });
        }
      });
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);


    searchProductsByImage("https://hips.hearstapps.com/hmg-prod/images/1922350532-6-1-1-1-1610015821.jpg?crop=1.00xw:0.834xh;0,0.0988xh&resize=980:*").then((response) => {
        console.log(response);
      })




          

  },
  beforeDestroy() {
    // Remove scroll event listener
    window.removeEventListener("scroll", this.handleScroll);
  },
  components: {
    ServiceSection,
    BannerSection,
    NewArrivals,
    AdvertSection,
    FeaturedProducts,
    ActionButton,
    MainHeader,
    NewsLetter,
    MainFooter,
    ProductDescription,
    ProductReview,
  },
  computed: {
    featuredProducts() {
      return this.products.slice(1, 5);
    },
    newArrivals() {
      return this.products.slice(5, 9);
    },
  },
  async created() {},
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Baskervville:ital@0;1&display=swap");

/* Hero Section */
.hero__section {
  display: grid;
  grid-template-columns: 1fr;
  height: 90vh;
  padding: 0;
  background-color: var(--cosmic-latte);
  z-index: 1;
  position: relative;
  overflow: hidden;
}

.hero__text {
  padding: 7rem 5rem;
  text-align: center;
  position: absolute;
  font-family: "Baskervville", serif;
  width: 100%;
}

.hero__text div {
  transition: all 0.25s linear;
  font-family: inherit;
}

.hero__text h1 {
  font-size: 4rem;
  line-height: 1.2;
  max-width: 40rem;
  margin: auto;
  margin-bottom: 5rem;
  font-family: inherit;
}

.hero__text h1 span {
  font-family: inherit;
}

.hero__text p {
  display: none;
}

.hero__section img {
  height: 60%;
  justify-self: center;
  align-self: self-end;
  margin-bottom: -50px;
  transition: transform 0.2s ease-out;
  will-change: transform;
  overflow: hidden;
}

.hero__section a {
  line-height: 1;
  padding: 1.3rem 2rem;
  background-color: #2b2118;
  color: #fff;
  border-radius: 3px;
  font-size: 1.5rem;
  text-transform: uppercase;
  font-weight: 400;
}

.icon__section {
  width: 100%;
  background-color: #f6e8e0;
  z-index: 2;
  position: relative;
}

.icon__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 2rem;
  max-width: 1280px;
  gap: 1rem;
  padding: 0;
}

.icon__container li {
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-weight: 400;
  font-size: 1.5rem;
  text-align: center;
  transition: all 0.25s linear;
  margin-top: 0.5rem;
  height: 8rem;
  width: 18rem;
  margin-top: 1.5rem;
}

.icon__container li p {
  height: 4rem;
  line-height: 1;
  font-size: 10px;
}

@media (min-width: 600px) {
  .hero__section img {
    height: 80%;
    margin-bottom: -150px;
  }
  .icon__container li p {
    font-size: 16px;
  }
}

@media (min-width: 1020px) {
  .hero__section {
    grid-template-columns: 3fr 4fr;
  }

  .hero__text {
    position: relative;
    align-self: center;
    transform: translateY(-50px);
  }

  .hero__text h1 {
    font-size: 5rem;
    margin-bottom: 2rem;
  }

  .hero__text p {
    display: block;
    max-width: 40rem;
    margin: auto;
    margin-bottom: 3rem;
  }

  .hero__section img {
    margin-bottom: unset;
    justify-self: auto;
    height: 90%;
  }

  .icon__container {
    gap: 30rem;
    margin: auto;
    justify-content: center;
  }

  .icon__container li {
    width: unset;
  }
}

@media (min-width: 1300px) {
}

/*.title {
    font-family: 'Baskervville', serif;
}*/
</style>
