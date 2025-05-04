<template>
    <main-header />
    <sub-header heading="Personalization" :subHeading="getStep()" />
    <div class="container">
        <div class="row justify-content-center" v-if="loaded && step === 0">
            <profile-card class="col-lg-2 col-md-3 col-12 mt-3 mb-5 mx-lg-auto mx-md-3" v-for="(product, index) in profiles" :key="index" :productId="product._id"
                :productName="product.name" :brand="product.brand" :image_url="product.images[0]"
                @profileSelected="receiveProfile" />
        </div>

        <div class="input__container" v-else-if="loaded && step === 1">

            <input-camp title="Give Us Your Pet Name" placeholder="Enter your pet's name" v-model="petName"
                :text="petName" @textUpdated="receivePet" />

            <selector-camp :title="'Which type of pet'" :items="options" placeholder="Type of pet" :modelValue="petType"
                @selectorUpdate="receivePetType" />
            <input-camp title="Intagram" placeholder="@MyFavPet" :text="instagram" @textUpdated="receiveInsta" />
            <p>We will send you a request by @Myoxytocin if the account is private.</p>
            <image-uploader title="Upload Images of Your Pet" :images_list="images" @imageUploaded="receiveImages" />

            <p>These images will be used to personalized your produts.</p>
            <button class="actionButton" @click="next">NEXT</button>
        </div>

        <div class="product__container" v-else-if="loaded && step === 2">
            <control-card v-for="(product, index) in controls" :key="index" :productId="product._id"
                :brand="product.brand" :image_url="product.images[0]" @controlSelected="receiveControl" />

        </div>

        <div class="input__container" v-else-if="loaded && step === 3 && controlType === 'medium'">
            <medium-control :images="images" @updateProduct="receiveProduct" />

        </div>
        <div class="input__container" v-else-if="loaded && step === 3 && controlType === 'full'">
            <full-control :images="images" @updateProduct="receiveProduct" />

        </div>

        <div class="input__container" v-else-if="loaded && step === 4">
            <text-camp title="Any special request?" placeholder="I would like ..." @textUpdated="receiveComents" />
            <selector-camp :title="'Which theme would you like?'" :items="themes" placeholder="Theme"
                :modelValue="theme" @selectorUpdate="receiveTheme" />
            <button class="actionButton" @click="next">NEXT</button>
        </div>

        <!--
            <div class="input__container" v-else-if="loaded && step === 5">
            <info-displayer :profileType="profileType" :controlType="controlType" :petName="petName" :petType="petType"
                :instagram="instagram" :images="images" :coments="coments" :theme="theme" :product="product" />

        </div>
        -->
        <product-preloader v-else> Loading... </product-preloader>

    </div>




    <main-footer />
</template>

<script>
import SubHeader from "@/components/SubHeader.vue";
import ProfileCard from "@/components/home_components/cards/ProfileCard.vue";
import ControlCard from "@/components/home_components/cards/ControlCard.vue";
import ProductPreloader from "@/components/preloaders/ProductPreloader.vue";
import InputCamp from "@/components/home_components/products/InputCamp.vue";
import ImageUploader from "@/components/home_components/products/ImageUploader.vue";
import TextCamp from "@/components/home_components/products/TextCamp.vue";
import SelectorCamp from "@/components/home_components/products/SelectorCamp.vue";
import MainHeader from "@/components/MainHeader.vue";
import MainFooter from "@/components/MainFooter.vue";
import ActionButton from "@/components/ActionButton.vue";
import Swal from 'sweetalert2';
import PersonalizationButton from "@/components/home_components/products/PersonalizationButton.vue";
import ImageSelector from "@/components/home_components/products/ImageSelector.vue";

import MediumControl from "@/components/home_components/products/MediumControl.vue";
import FullControl from "@/components/home_components/products/FullControl.vue";
import InfoDisplayer from "@/components/home_components/products/InfoDisplayer.vue"



export default {
    name: "ShopView",
    components: {
        SubHeader,
        ProfileCard,
        MainHeader,
        MainFooter,
        ControlCard,
        InputCamp,
        ImageUploader,
        SelectorCamp,
        TextCamp,
        ActionButton,
        PersonalizationButton,
        ImageSelector,
        MediumControl,
        FullControl,
        InfoDisplayer,
        "product-preloader": ProductPreloader,
    },
    data() {
        return {
            product: "",
            profiles: [],
            controls: [],
            options: [],
            themes: ["Love", "present"],
            page: 1,
            loaded: false,
            total: 0,
            step: 0,

            //Profile type
            profileType: "",

            //Control type
            controlType: "",

            //PetType
            petName: "",
            petType: "",
            instagram: "",

            //Images
            images: [],

            //Coments
            coments: "",

            //Theme
            theme: "",

            //Product
            product: {},


        };
    },
    created() {
        this.getProfiles();
        this.getControls();
        this.getOptions();
        this.productID = this.$route.params.id;
    },
    methods: {
        ...mapActions(["add_to_cart"]),
        getProfiles() {
            this.loaded = false;
            fetch("/data/personalization/profile.json")
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    this.profiles = data.results.map((product) => {
                        product.images[0] = product.images[0];

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

        getControls() {
            this.loaded = false;
            fetch("/data/personalization/control.json")
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    this.controls = data.results.map((product) => {
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
        getOptions() {
            this.loaded = false;
            fetch("/data/personalization/petsTypes.json")
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    this.options = data.pets
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
        receiveProfile(profile) {
            console.log(profile);
            this.profileType = profile;
            this.next();
        },
        receiveControl(control) {
            console.log(control);
            this.controlType = control;
            if (this.controlType == "mystery")
                this.step = 4;
            else
                this.next();
        },
        receivePet(pet) {
            console.log(pet);
            this.petName = pet;
        },
        receiveImages(images) {
            console.log(images);
            this.images = images;
            this.$router.push('/cart/' + this.productID);
        },
        receiveInsta(insta) {
            console.log(insta);
            this.instagram = insta;
        },
        receivePetType(petType) {
            console.log(petType);
            this.petType = petType;
        },
        receiveComents(coments) {
            console.log(coments);
            this.coments = coments;
        },
        receiveTheme(theme) {
            console.log(theme);
            this.theme = theme;
        },
        receiveProduct(product) {
            console.log(product);
            this.product = product;
            this.step = this.step + 1;
            let item = {
                    ...this.product,
                    quantity: 1,
                    size: "",
            };
            this.add_to_cart(item);
        },
        next() {
            if (this.step === 1) {
                if(this.petName === "" || this.petType === "" || this.images.length < 10){
                    Swal.fire({
                    title: 'Error',
                    text: 'Please fill all the fields and upload at least 10 photos',
                    icon: 'error',
                    });
                    return;
                }
            } else if (this.step === 3 && this.controlType === 'mystery') {
                if (this.theme === "") {
                    Swal.fire({
                        title: 'Error',
                        text: 'Please select a theme',
                        icon: 'error',
                    });
                    return;
                }
            }
            this.step = this.step + 1;
            console.log(this.step);
        },
        back() {
            this.step = this.step - 1;
        },
        getStep() {
            return `Step ${this.step + 1} of 10`;
        },
    },
    beforeRouteLeave(to, from, next) {
        if (this.step === 4 && this.controlType === 'mystery') {
            this.step = 2;
            next(false);
        }
        else if (this.step !== 0) {
            this.back();
            next(false);
        }
       else
            next();
    },
    watch: {
    // Watch the 'step' data property
    step(newValue, oldValue) {
      // Scroll to the top of the page whenever 'step' changes
      window.scrollTo(0, 0);
    }
  },
};
</script>

<style scoped>
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

.swal2-popup {
    font-size: 1.6rem !important;
    font-family: Georgia, serif;
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

.input__container {
    padding-bottom: 100px;
    text-align: center;
    border-radius: 8px;
    margin: 0 auto;
    width: 100%;
}

.actionButton {
    background-color: var(--dark-green);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 1.7rem;
    cursor: pointer;
    margin-top: 20px;
}
</style>

