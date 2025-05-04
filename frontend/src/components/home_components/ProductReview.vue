<template>
  <section class="review__section">
    <h1>What our customers are saying...</h1>
    <div class="video__container">
      <div
        v-for="(video, index) in videos"
        :key="index"
        class="video__wrapper"
        v-motion
        :initial="{ opacity: 0, scale: 0.9 }"
        :visibleOnce="{ opacity: 1, scale: 1, transition: { delay: 200, duration:300 } }"
      >
        <video
          @mouseover="playVideo"
          @mouseout="pauseAndResetVideo"
          muted
          loop
          preload="metadata"
        >
          <source
            :src="require(`@/assets/videos/${video}.mp4`)"
            type="video/mp4"
          />
        </video>
        <svg
          class="play__button"
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25 0C31.6304 0 37.9893 2.63392 42.6777 7.32233C47.3661 12.0107 50 18.3696 50 25C50 31.6304 47.3661 37.9893 42.6777 42.6777C37.9893 47.3661 31.6304 50 25 50C18.3696 50 12.0107 47.3661 7.32233 42.6777C2.63392 37.9893 0 31.6304 0 25C0 18.3696 2.63392 12.0107 7.32233 7.32233C12.0107 2.63392 18.3696 0 25 0ZM4.6875 25C4.6875 30.3872 6.82756 35.5538 10.6369 39.3631C14.4462 43.1724 19.6128 45.3125 25 45.3125C30.3872 45.3125 35.5538 43.1724 39.3631 39.3631C43.1724 35.5538 45.3125 30.3872 45.3125 25C45.3125 19.6128 43.1724 14.4462 39.3631 10.6369C35.5538 6.82756 30.3872 4.6875 25 4.6875C19.6128 4.6875 14.4462 6.82756 10.6369 10.6369C6.82756 14.4462 4.6875 19.6128 4.6875 25ZM19.9344 16.3344L33.2594 24.3312C33.3745 24.4008 33.4698 24.4989 33.5359 24.6161C33.602 24.7332 33.6367 24.8655 33.6367 25C33.6367 25.1345 33.602 25.2668 33.5359 25.3839C33.4698 25.5011 33.3745 25.5992 33.2594 25.6687L19.9344 33.6656C19.8159 33.737 19.6806 33.7756 19.5422 33.7776C19.4039 33.7795 19.2676 33.7447 19.1471 33.6767C19.0267 33.6087 18.9264 33.5099 18.8567 33.3905C18.7869 33.271 18.7501 33.1352 18.75 32.9969V17.0063C18.7495 16.8677 18.7859 16.7314 18.8555 16.6115C18.925 16.4917 19.0252 16.3924 19.1458 16.3241C19.2663 16.2557 19.4029 16.2206 19.5415 16.2224C19.68 16.2242 19.8157 16.2629 19.9344 16.3344Z"
            fill="#FFFDF4"
            fill-opacity="0.4"
          />
        </svg>
      </div>
    </div>
    <div class="review__container">
      <review-card
        :name="reviews[0].name"
        :quote="reviews[0].quote"
        v-motion
        :initial="{ opacity: 0 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 200 } }"
      />
      <review-card
        background="var(--cosmic-latte)"
        :name="reviews[0].name"
        :quote="reviews[0].quote"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 350 } }"
      />
      <review-card
        :name="reviews[0].name"
        :quote="reviews[0].quote"
        v-motion
        :initial="{ opacity: 0 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 200 } }"
      />
    </div>
  </section>
</template>

<script>
import ReviewCard from "./cards/ReviewCard.vue";
export default {
  name: "ProductReview",
  props: {},
  data() {
    return {
      videos: ["accompania", "everlast", "artistico"],
      reviews: [
        {
          name: "Jane Doe",
          quote:
            "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
        },
      ],
    };
  },
  methods: {
    playVideo(event) {
      event.target.play(); // Play the video
    },
    pauseAndResetVideo(event) {
      event.target.pause(); // Pause the video
      event.target.currentTime = 0; // Reset video to the beginning
    },
  },
  components: {
    ReviewCard,
  },
};
</script>

<style scoped>
.review__section {
  background-color: var(--linen);
  overflow: hidden;
  padding: 60px 12px;
}

.review__section h1 {
  font-family: "Baskervville", serif;
  font-size: 36px;
  margin: 20px auto 40px auto;
  width: fit-content;
  text-align: center;
  padding: 8px;
  line-height: 1;
}

.video__wrapper {
  position: relative;
  display: inline-block;
}

video {
  width: 300px;
}

.video__wrapper:hover .play__button {
  opacity: 0;
}

.play__button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  transition: opacity .1s linear;
}

.video__container {
  margin: auto;
  display: flex;
  gap: 20px;
  overflow-x: scroll;
}

.review__container {
  display: flex;
  gap: 10px;
  position: relative;
  overflow-x: scroll;
  overflow-y: visible;

  margin-top: 80px;
}

@media (min-width: 968px) {
  .video__container {
    justify-content: center;
  }

  .review__container {
    justify-content: center;
  }
}

@media (min-width: 1200px) {
  video {
    width: 360px;
  }
  .review__container div:nth-child(1) {
    transform: translateX(50px);
    z-index: 0;
    align-self: flex-end;
  }
  .review__container div:nth-child(2) {
    margin-bottom: 40px;
    z-index: 1;
  }
  .review__container div:nth-child(3) {
    transform: translateX(-50px);
    align-self: flex-end;
    z-index: 0;
  }
}
</style>
