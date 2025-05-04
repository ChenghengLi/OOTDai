<template>
    <main-header />
    <sub-header
      heading="OUR SETS"
      subHeading="Select one of the features to begin your fashion journey"
    />
    <div class="container">
      <div class="product__container" v-if="loaded">
        <div class="background-grid">
          <div class="bg-column bg-1">
            <product-card
              v-if="products[0]"
              :productId="products[0]._id"
              :productName="products[0].name"
              :brand="products[0].brand"
              :price="products[0].price"
              :currency="products[0].currency"
              :ratings="products[0].rating"
              :image_url="products[0].images[0]"
              :in_stock="products[0].in_stock"
              @click="$router.push('/search-outfit')"
            />
          </div>
          <div class="bg-column bg-2">
            <product-card
              v-if="products[1]"
              :productId="products[1]._id"
              :productName="products[1].name"
              :brand="products[1].brand"
              :price="products[1].price"
              :currency="products[1].currency"
              :ratings="products[1].rating"
              :image_url="products[1].images[0]"
              :in_stock="products[1].in_stock"
              @click="$router.push('/create-outfit')"
            />
          </div>
          <div class="bg-column bg-3">
            <product-card
                v-if="products[2]"
                :productId="products[2]._id"
                :productName="products[2].name"
                :brand="products[2].brand"
                :price="products[2].price"
                :currency="products[2].currency"
                :ratings="products[2].rating"
                :image_url="products[2].images[0]"
                :in_stock="products[2].in_stock"
                @click="$router.push('/valorate-outfit')"
            />
            </div>
        </div>
      </div>
      <product-preloader v-else> Loading products... </product-preloader>
    </div>
    <main-footer />
  </template>
  

<script>
import SubHeader from "@/components/SubHeader.vue";
import ProductCard from "@/components/home_components/cards/ProductCard.vue";
import ProductPreloader from "@/components/preloaders/ProductPreloader.vue";

import MainHeader from "@/components/MainHeader.vue";
import MainFooter from "@/components/MainFooter.vue";


export default {
    name: "ShopView",
    components: {
        SubHeader,
        ProductCard,
        MainHeader,
        MainFooter,
        "product-preloader": ProductPreloader,
    },
    data() {
        return {
            products: [],
            page: 1,
            loaded: false,
            total: 0,
        };
    },
    created() {
        this.getProducts();
    },
    methods: {
        getProducts() {
            this.loaded = false;
            fetch("/data/products.json")
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    this.products = data.results.map((product) => {
                        product.images[0] = product.images[0].replace(
                            "http",
                            "https"
                        );
                        
                        return product;
                    });
                    this.total = Math.ceil(data.results.length / 12);
                    this.loaded = true;
                })
                .catch((err) => {
                    console.log(err);
                    this.loaded = false;
                });
        },
        fetchNewPage(page) {
            this.page = page;
            this.getProducts();
            window.scrollTo(0, 0);
        },
    },
};
</script>

<style>
.btn {
    border: none;
    background-color: #f2f2f2;
    padding-inline: 20px;
    height: 40px;
    border: 2px solid var(--grey-2);
    font-size: 1.7rem;
    margin-inline: 5px;
    cursor: pointer;
}

.back-btn,
.next-btn {
    background-color: #f2f2f2;
    color: black;
}

.btn:hover {
    background-color: #083e46;
    border-color: #083e46;
    color: white;
}

.btn-active {
    background-color: #083e46;
    color: white;
    border-color: #083e46;
}

.pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2rem 0;
}

.product__container {
    display: flex;
    justify-content: space-between; /* Distribuye los tres productos en izquierda, centro y derecha */
    align-items: center;
    flex-wrap: nowrap; /* No permite que se vayan a otra fila */
    gap: 2rem; /* Opcional: espacio entre los productos */
    padding: 2rem 0;
}

.product__card {
  max-width: 320px; /* Aumenta esto */
  padding: 1rem;     /* Añade si no está */
  scale: 1.25;       /* Opcional para hacerlo un poco más grande visualmente */
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

/* Overlay semitransparente */
.bg-column::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.25); /* Cambia opacidad aquí */
  z-index: 1;
}

/* Eleva el contenido por encima del overlay */
.bg-column > * {
  position: relative;
  z-index: 2;
}

/* Fondos individuales */
.bg-1 {
  background-image: url('~@/assets/images/first.jpg');
}

.bg-2 {
  background-image: url('~@/assets/images/second.jpg');
}

.bg-3 {
  background-image: url('~@/assets/images/third.jpg');
}


@keyframes rollDown {
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

</style>
