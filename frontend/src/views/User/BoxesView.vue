<template>
    <main-header />
  
    <section class="gallery__section">
      <h1><span>Our </span> GIFT BOXES</h1>
      <div class="gallery">
        <a class="gallery__image__container" href="#offers">
          <img src="../../assets/images/gallery-everlast.jpg" />
          <p>EVERLAST</p>
        </a>
        <a class="gallery__image__container" href="#offer-everlast">
          <img src="../../assets/images/gallery-artistico.jpg" />
          <p>ARTISTICO</p>
        </a>
        <a class="gallery__image__container" href="#offer-artistico">
          <img src="../../assets/images/gallery-accompania.jpg" />
          <p>ACCOMPANIA</p>
        </a>
      </div>
    </section>
    <section class="offers__section" id="offers">
      <h1>WHAT WE OFFER?</h1>
      <div class="offer" id="offer-everlast">
        <img
          src="../../assets/images/offer-everlast.png"
          v-motion
          :initial="{ opacity: 0 }"
          :visibleOnce="{
            opacity: 1,
            transition: { duration: 400, delay: 300 },
          }"
        />
        <div class="offer__description">
          <h1>Everlast</h1>
          <p>
            The Everlast gift box embodies the deep, eternal love shared between
            pets and their humans. This thoughtfully curated collection includes a
            personalized lightbox, a cup, a stunning crystal piece, and a keychain
            featuring your pet. Each item serves as a cherished reminder of the
            unbreakable bond that enriches your life, making it the perfect gift
            for celebrating the special connection you have with your furry
            friend.
          </p>
        </div>
      </div>
      <div class="offer" id="offer-artistico">
        <div class="offer__description">
          <h1>Artistico</h1>
          <p>
            The Artistico gift box is perfect for those who embrace their creative
            side and wish to celebrate their beloved pets through art. This unique
            collection includes a personalized painting kit that allows you to
            create your own masterpiece of your pet, along with a puzzle featuring
            a pet-themed design, a leaf bookmark, and an intricate wood carving.
            Each item encourages artistic expression while highlighting the
            special bond you share with your furry friend, making it a thoughtful
            gift for any pet lover.
          </p>
        </div>
        <img
          src="../../assets/images/offer-artistico.png"
          v-motion
          :initial="{ opacity: 0 }"
          :visibleOnce="{
            opacity: 1,
            transition: { duration: 400, delay: 300 },
          }"
        />
      </div>
      <div class="offer" id="offer-accompania">
        <img
          src="../../assets/images/offer-accompania.png"
          v-motion
          :initial="{ opacity: 0 }"
          :visibleOnce="{
            opacity: 1,
            transition: { duration: 400, delay: 300 },
          }"
        />
        <div class="offer__description">
          <h1>Accompania</h1>
          <p>
            The Accompania gift box symbolizes the love between pets and their
            humans that travels with them through life’s journeys. This
            thoughtfully curated collection includes a personalized mirror, a
            versatile tote bag, a customized phone case, a Minimi figurine, a
            Minimi keychain, and a cuddly Furbearer plush. Each portable item is
            designed to ensure that the companionship of your pet is always by
            your side, making it clear that their love is present no matter the
            distance or time.
          </p>
        </div>
      </div>
      <div class="themes">
        <h1>Our Themes</h1>
        <img src="../../assets/images/themes.svg" />
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
    name: "BoxesView",
  };
  </script>
  
  <style scoped>
  @import url("https://fonts.googleapis.com/css2?family=Corinthia:wght@400;700&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap");
  
  .gallery__section {
    padding: 0;
    display: flex;
    align-items: center;
    background-color: #faf9f8;
  }
  
  .gallery__section h1 {
    writing-mode: vertical-rl;
    text-orientation: mixed;
    transform: rotate(180deg);
    font-family: "Baskervville", serif;
  
    display: flex;
    align-items: center;
    border-left: 1px solid black;
    margin: 0;
    padding: 100px 90px;
    font-size: 7rem;
  }
  
  .gallery__section span {
    font-family: "Corinthia", serif;
    margin-bottom: 24px;
  }
  
  .gallery {
    display: flex;
    gap: 32px;
    justify-content: center;
    width: 100%;
    overflow: scroll;
  }
  
  .gallery::-webkit-scrollbar {
    display: none;
  }
  
  .gallery__image__container {
  }
  
  .gallery__image__container p {
    font-family: "Baskervville", serif;
    font-size: 1remx;
  }
  
  .gallery__image__container img {
    aspect-ratio: 3/4;
    width: 400px;
    background-color: #000;
  }
  
  .offers__section {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f6f1ed;
  }
  
  .offers__section h1 {
    font-size: 7rem;
    font-family: "Baskervville", serif;
    padding: 80px 0;
  }
  
  .offer {
    display: flex;
    align-items: start;
    max-width: 960px;
    gap: 24px;
    margin-bottom: 72px;
  }
  
  .offer h1 {
    padding: 12px 0;
    font-size: 6rem;
  }
  
  .offer p {
    font-size: 2rem;
    font-weight: 300;
  }
  
  .offer img {
    width: 470px;
  }
  
  .themes {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .themes h1 {
    font-family: "Baskervville", serif;
    font-size: 6rem;
    font-weight: 500;
    padding: 0;
    margin-top: 32px;
  }
  </style>
  