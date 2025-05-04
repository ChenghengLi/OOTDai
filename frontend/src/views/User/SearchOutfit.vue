<template>
    <main-header />
    <sub-header
    subHeading="Find Your Favourite Clothes"/>
 <div class="container-fluid">
        <div class="row justify-content-center" v-if="loaded">
            <ClothFinder @image-selected="handleImageSelected" />
        </div>
        <product-preloader v-else> Loading... </product-preloader>
    </div>
    <main-footer />
</template>

<script>
import SubHeader from "@/components/SubHeader.vue";
import ProductPreloader from "@/components/preloaders/ProductPreloader.vue";
import MainHeader from "@/components/MainHeader.vue";
import MainFooter from "@/components/MainFooter.vue";
import Swal from 'sweetalert2';
import ClothFinder from "@/components/home_components/ClothFinder.vue";

export default {
    name: "ShopView",
    components: {
        SubHeader,
        MainHeader,
        MainFooter,
        "product-preloader": ProductPreloader,
        ClothFinder
    },
    data() {
        return {
            loaded: false,
            selectedImage: null
        };
    },
    created() {
        // Simulate loading data
        setTimeout(() => {
            this.loaded = true;
        }, 1000);
    },
    methods: {
        handleImageSelected(imageData) {
            this.selectedImage = imageData;
            // You can handle the selected image data here
            // For example, redirect to next page or show a success message
            Swal.fire({
                title: 'Success!',
                text: 'Image selected successfully. Moving to next step.',
                icon: 'success',
                confirmButtonText: 'Continue'
            }).then(() => {
                // Navigate to next step or handle as needed
                // this.$router.push('/next-step');
            });
        }
    }
};
</script>

<style scoped>
.container-fluid {
    padding-left: 0;
    padding-right: 0;
    min-height: 500px;
}

.row {
    margin: 0;
}
</style>