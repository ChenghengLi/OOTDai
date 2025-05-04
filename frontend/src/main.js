import "bootstrap/dist/css/bootstrap.css"; // Import Bootstrap styles
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import { MotionPlugin } from "@vueuse/motion";
// import the package
import VueAwesomePaginate from "vue-awesome-paginate";
import VueAnimXyz from '@animxyz/vue3'
import '@animxyz/core'

// import the necessary css file
import "vue-awesome-paginate/dist/style.css";
createApp(App)
  .use(router)
  .use(store)
  .use(VueAwesomePaginate)
  .use(MotionPlugin)
  .use(VueAnimXyz)
  .mount("#app");
