<template>
  <main-header />
  <section class="hero__section">
    <div class="hero__left">
      <div
        class="hero__title"
        v-motion
        :initial="{ opacity: 0, x: 50 }"
        :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 400 } }"
      >
        OOTDai
        <hr />
      </div>
      <div
        class="hero__banner"
        v-motion
        :initial="{ opacity: 0 }"
        :visibleOnce="{ opacity: 1, transition: { duration: 700 } }"
      >
        <h1>DISCOVER YOUR STYLE JOURNEY</h1>
      </div>
    </div>
    <img class="hero__right" src="../../assets/images/process-hero.jpg" />
  </section>
  <section class="process__section">
    <h2>HOW IT WORKS?</h2>
    <h1
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 400 } }"
    >
      YOU Snap It,
    </h1>
    <h1
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 400 } }"
    >
      OOTDai Styles It
    </h1>

    <!-- Step 1 (on top) -->
    <div class="process__step step-primary">
      <img
        src="../../assets/images/process-image1.png"
        class="process__icon"
        v-motion
        :initial="{ opacity: 0 }"
        :visibleOnce="{ opacity: 1, transition: { duration: 400, delay: 600 } }"
      />
      <div class="process__number__container">
        <div
          class="process__number"
          v-motion
          :initial="{ opacity: 0 }"
          :visibleOnce="{ opacity: 1, transition: { duration: 400, delay: 400 } }"
        >
          01
        </div>
      </div>
      <div class="process__description">
        <h3>Snap or Upload</h3>
        <p>Take a photo or upload one from your gallery to start your style search.</p>
      </div>
    </div>

    <!-- Horizontal group container -->
    <div class="process__horizontal-group">
      <!-- Step 2 -->
      <div class="process__step">
        <div class="process__number__container">
          <div class="process__number">02</div>
        </div>
        <div class="process__description">
          <h3>Find Similar Pieces</h3>
          <p>Instantly discover similar items from the Inditex catalog using visual search.</p>
        </div>
        <img src="../../assets/images/process-image2.png" class="process__icon" />
      </div>

      <!-- Step 3 -->
      <div class="process__step">
        <img src="../../assets/images/process-image3.png" class="process__icon" />
        <div class="process__number__container">
          <div class="process__number">03</div>
        </div>
        <div class="process__description">
          <h3>Create Your Outfit</h3>
          <p>Mix and match the items you love into a fully styled OOTD.</p>
        </div>
      </div>

      <!-- Step 4 -->
      <div class="process__step">
        <div class="process__number__container">
          <div class="process__number">04</div>
        </div>
        <div class="process__description">
          <h3>Rate & Share</h3>
          <p>Rate your looks, share them with friends, or get inspired by others.</p>
        </div>
        <img src="../../assets/images/process-image4.png" class="process__icon" />
      </div>
    </div>
  </section>

  <main-footer />
</template>

<script>
import SubHeader from "@/components/SubHeader.vue";
import ServiceSection from "@/components/home_components/ServiceSection.vue";
import MainHeader from "@/components/MainHeader.vue";
import MainFooter from "@/components/MainFooter.vue";
export default {
  components: { SubHeader, ServiceSection, MainHeader, MainFooter },
  name: "AboutView",
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Corinthia:wght@400;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap");

.hero__section {
  background-color: #f3f1e7; /* Fondo café suave */
  padding: 15rem;
  display: flex;
  justify-content: center;
  align-self: center;
}

.hero__left {
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 100px;
  justify-content: center;
}

.hero__title {
  display: flex;
  font-family: "Corinthia", serif;
  font-weight: 200;
  font-style: normal;
  font-size: 10rem;
  text-wrap: nowrap;
  align-items: center;
  gap: 32px;
  color: #5a4b3c; /* Color café */
  line-height: 1;
}

.hero__title hr {
  width: 100%;
  overflow: hidden;
  height: 4px;
  opacity: 1;
  background-color: #d1bfa7; /* Café claro */
}

.hero__banner {
  background-color: #efddca;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 32px;
  width: 80rem;
  position: relative;
  z-index: 1;
}

.hero__banner h1 {
  font-family: "Baskervville", serif;
  font-size: 7rem;
  line-height: 1.5;
  font-weight: 500;
  color: #3c2e1f; /* Color oscuro café */
}

.hero__right {
  background-color: #000;
  position: relative;
  width: 65rem;
  height: 65rem;
  z-index: 0;
}

.process__section {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f6f1ed;
  padding: 5rem 1rem;
}

.process__section h2 {
  font-size: 3.5rem;
  color: #bc4749;
  margin-bottom: 24px;
  margin-top: 80px;
}

.process__section h1 {
  font-size: 6rem;
  font-family: "Baskervville", serif;
  line-height: 1.2;
  color: #5a4b3c;
}



.process__description span {
  font-weight: 500;
}




.process__step {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  gap: 40px;
  margin-top: 60px;
}

.process__icon {
  width: 200px;
  height: 200px;
  border-radius: 15px;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.process__number__container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
}

.process__number {
  font-size: 2.5rem;
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #d1bfa7;
  border-radius: 50%;
  background-color: #fff8e1;
}

.process__description {
  max-width: 300px;
  text-align: center;
}

.process__description h3 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #5a4b3c;
  font-family: "Baskervville", serif;
}

.process__description p {
  font-size: 1.2rem;
  font-weight: 300;
  color: #444;
}





@media (max-width: 1300px) {
  .hero__section {
    overflow: hidden;
  }

  .hero__banner {
    width: 55rem;
  }

  .hero__title {
    font-size: 8rem;
  }

  .hero__banner h1 {
    font-size: 5rem;
  }

  .hero__right {
    width: 55rem;
    height: 55rem;
  }
}

@media (max-width: 920px) {
  .hero__section {
    padding: 100px;
    overflow: hidden;
  }

  .hero__banner {
    width: 35rem;
  }

  .hero__title {
    font-size: 6rem;
  }

  .hero__banner h1 {
    font-size: 3rem;
  }

  .hero__right {
    width: 45rem;
    height: 45rem;
  }
}

@media (max-width: 776px) {
  .hero__section {
    padding: 0;
    overflow: hidden;
    display: flex;
    justify-content: center;
    position: relative;
  }

  .hero__banner {
    width: 70%;
    position: unset;
  }

  .hero__title {
    display: none;
  }

  .hero__banner h1 {
    font-size: 6vw;
  }

  .hero__left {
    position: absolute;
    flex-direction: row;
    justify-content: flex-end;
    gap: 0;
    width: 100%;
    z-index: 1;
    bottom: 4rem;
    right: 0;
  }

  .hero__right {
    aspect-ratio: 1 / 1;
    width: 100%;
    height: auto;
  }
}

@media (max-width: 768px) {
  .process__step {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  .process__description {
    max-width: 90%;
  }

  .process__icon {
    width: 80%;
    height: auto;
  }
}

</style>
