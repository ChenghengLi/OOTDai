<template>
  <header>
    <!-- <div v-if="showPromotion" class="promotion__container">
      <p>FREE SHIPPING ON ORDERS OVER $50</p>
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        @click="showPromotion = false"
      >
        <path
          d="M0.758057 11.243L6.00106 6L11.2441 11.243M11.2441 0.757L6.00006 6L0.758057 0.757"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div> -->
    <div class="container">
      <nav class="top__navigation">
        <router-link to="/">
          <img src="../assets/images/logo.png" class="logo" alt="logo" />
        </router-link>


        <!-- <div class="mobile-menu">
          <router-link to="/cart" class="mobile-cart" aria-label="Go to cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              fill="currentColor"
              class="bi bi-bag"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"
              />
            </svg>
            <div class="qty" v-if="cart.length >= 1">
              <span>{{ cart.length }}</span>
            </div>
          </router-link>

          <svg
            @click="showNav"
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            fill="currentColor"
            class="bi bi-list open-btn"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </div> -->
      </nav>
    </div>
    <div
      class="nav__container"
      :class="{ 'nav__container--hidden': !showNavbar }"
    >
      <!-- <router-link @click="hideNav" to="/">Home</router-link> -->
      <router-link @click="hideNav" to="/about">OUR STORY</router-link>
      <router-link @click="hideNav" to="/try-on">VIRTUAL TRY ON</router-link>
      <router-link @click="hideNav" to="/shop">PRODUCTS</router-link>
    </div>
  </header>
</template>

<script>
import { auth } from "@/firebase/init.js";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { mapState, mapActions, mapGetters } from "vuex";
import ActionButton from "./ActionButton.vue";

export default {
  components: { ActionButton },
  name: "MainHeader",
  props: {
    msg: String,
  },
  data() {
    return {
      isLoggedIn: false,
      showSideNav: false,
      showDropDown: false,
      userDetails: {
        displayName: null,
        email: null,
        emailVerified: false,
        isAnonymous: false,
      },
      showPromotion: true,
      showNavbar: true,
      lastScrollPosition: 0,
    };
  },
  methods: {
    ...mapActions(["remove_user"]),
    showNav() {
      this.showSideNav = true;
    },
    hideNav() {
      this.showSideNav = false;
    },
    async logout() {
      try {
        await signOut(auth);
        this.$router.push("/");
        this.isLoggedIn = false;
        console.log("User signed out");
      } catch (error) {
        console.error("Error signing out: ", error.message);
      }
    },

    onScroll() {
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollPosition < 0) {
        return;
      }
      // Stop executing this function if the difference between
      // current scroll position and last scroll position is less than some offset
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
        return;
      }
      this.showNavbar = currentScrollPosition < this.lastScrollPosition;
      this.lastScrollPosition = currentScrollPosition;
    },
  },
  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isLoggedIn = true;
        console.log("is logged in? ", this.isLoggedIn);
        console.log("user:", user);

        this.userDetails.displayName = user.displayName;
        this.userDetails.email = user.email;
        this.userDetails.emailVerified = user.emailVerified;
        this.userDetails.isAnonymous = user.isAnonymous;
      } else {
        this.isLoggedIn = false;
        this.userDetails = {
          displayName: null,
          email: null,
          emailVerified: false,
          isAnonymous: false,
        };
      }
    });
    window.addEventListener("scroll", this.onScroll);
  },
  computed: {
    ...mapState(["user", "cart"]),
    ...mapGetters(["getHash"]),
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
  background-color: transparent;

  position: sticky;
  top: 0;
  width: 100%;
  z-index: 3;
}

.container {
  background-color: var(--cosmic-latte);
  width: 100%;
  max-width: none;
  position: relative;
  z-index: 2;
}

.top__navigation {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 85px;
}

.logo {
height: 10rem;
}

.nav__links a,
.log-out {
  padding-inline: 15px;
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--dark-blue);
  transition: all 0.25s ease-in-out;
  line-height: 2rem;
}

.nav__links .log-out {
  background-color: transparent;
}

a.active__page,
.nav__links a:hover,
.mobile-menu a:hover {
  color: var(--dark-blue);
}

.nav__links {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 4rem;
}

.nav__links a::after,
.mobile-menu a::after {
  content: "";
  display: block;
  position: relative;
  top: 2px;
  height: 2px;
  left: 0;
  width: 0;
  background-color: var(--dark-blue);
  border-radius: 6px;
  transition: width 0.25s ease;
}

.nav__links a:hover::after,
.mobile-menu a:hover::after {
  width: 70%;
}

.nav__links a.router-link-exact-active::after {
  width: 70%;
}

.nav__links .auth-link::after,
.dropdown .dropdown-link::after {
  display: none;
}

.desktop-cart {
  display: initial;
  position: relative;
}

.qty {
  height: 18px;
  width: 18px;
  text-align: center;
  display: flex;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--dark-blue);
  font-size: 14px;
  color: white;
  font-weight: 500;
  position: absolute;
  top: -4px;
  right: 4px;
}

.nav-profile {
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  margin-left: 15px;
  background: transparent;
}

.nav-profile img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}

.nav-profile .name {
  font-size: 1.8rem;
}

.nav-profile svg {
  font-size: 1.8em;
  cursor: pointer;
  font-weight: 900;
}

.dropdown {
  background-color: white;
  z-index: 2;
  border-radius: 8px;
  border: 1px solid var(--grey-2);
  position: absolute;
  top: 35px;
  right: 0;
  transition: 0.25s;
  width: 170px;
}

.dropdown-profile {
  padding: 10px;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-bottom: 1px solid var(--grey-2);
}

.dropdown svg {
  font-size: 1.6rem;
  cursor: pointer;
  font-weight: 900;
}

.dropdown .dropdown-logout {
  font-size: 1.7rem;
}

.dropdown .dropdown-link {
  font-size: 1.6rem;
  color: #222;
  background-color: transparent;
  padding: 10px;
  width: 100%;
  transition: background-color 0.25s;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 18px;
  font-weight: 400;
}

.dropdown .dropdown-link:hover {
  color: var(--dark-green);
}

.dropdown-name {
  font-weight: 500;
}

/* Media Query */

@media (max-width: 460px) {
  .nav__links {
    right: 0;
    width: 100%;
    padding: 0 2rem;
    justify-content: space-between;
  }
}

@media (max-width: 870px) {
  .mobile-menu {
    display: flex;
    gap: 1.5rem;
    color: var(--text);
  }

  .mobile-menu svg {
    cursor: pointer;
    font-size: 2rem;
  }

  .mobile-menu .open-btn {
    font-size: 2.4rem;
    font-weight: 900;
  }

  /* .nav__links {
    align-items: flex-start;
    justify-content: flex-start;
    gap: 2.2rem;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: -55%;
    width: 55%;
    z-index: 2;
    padding: 2rem 3rem;
    background-color: white;
    height: 100%;
    box-shadow: 0 40px 60px rgba(0, 0, 0, 0.1);
    transition: 0.25s;
  } */

  .activeNav {
    right: 0;
  }

  .nav__links a,
  .log-out {
    padding: 0.5rem 0;
    font-size: 1.8rem;
  }

  .nav__links a:hover::after {
    width: 2.5rem;
  }

  .nav__links a.router-link-exact-active::after {
    width: 2.5rem;
  }

  .close-btn {
    display: initial;
  }

  .mobile-cart {
    position: relative;
    z-index: 1;
  }
  .qty {
    align-items: center;
  }
  .log-out {
    display: initial;
  }
}

.promotion__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #b22100;
  padding: 0 3rem;
  height: 40px;
}
.promotion__container p {
  color: #fff;
  padding-block: 0;
  margin: 0;
  line-height: 1;
  font-size: 14px;
  font-weight: 600;
}

.nav__container {
  height: 45px;
  background-color: #2b2118;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 45px;
  transition: 0.35s all ease-out;
  z-index: 1;

  @media screen and (min-width: 652px) {
    gap: 100px;
  }
  @media screen and (min-width: 1200px) {
    gap: 150px;
  }
}
.nav__container a {
  font-size: 14px;
  font-weight: 700;
  color: #fff;
}
.nav__container.nav__container--hidden {
  box-shadow: none;
  transform: translate3d(0, -100%, 0);
}

.nav__container a:hover {
  color: var(--text);
}
</style>
