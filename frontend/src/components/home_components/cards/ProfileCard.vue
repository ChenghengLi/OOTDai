<template>
    <div class="hexagon"  @click="selectProfile">
        <span v-html="formattedBrandName"></span>
    </div>
</template>

<script>

import { defineComponent, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';


export default {
    name: "ProductCard",
    props: [
        "productId",
        "brand",
        "productName",
        "color"
    ],
    mounted() {
        // set background color
        this.$el.style.backgroundColor = this.color;
        if (this.brand.split(' ').length > 1) {
            // set line-height to 1.2
            this.$el.style.lineHeight = "1.2";
        }
    },
    computed: {
        formattedBrandName() {
            return this.brand.split(' ').join('<br>');
        }
    },
    methods: {
        selectProfile() {
            this.$emit('profileSelected', this.productId);
        }
    },
};
</script>

<style scoped>
    .hexagon {
        transition: transform 0.05s ease-in;
        cursor: pointer;
        text-align: center;
        display: inline-block;
        width: 216px;
        height: 251px;
        background-color: #f8f9fa;
        
        clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        margin: 20px;
        font-size: 18px;
        font-weight: bold;
        color: white;
        background-color: #e7b9b4;
        line-height: 130px;
        transition-duration: 0.1s;
    }
    .hexagon:hover {
        transform: scale(1.1);
    }
    .hexagon span {
        font-family: lustria, serif;
        display: inline-block;
        margin: 60px 0;
        font-size: 35px;
        height: 130px;
    }

</style>
