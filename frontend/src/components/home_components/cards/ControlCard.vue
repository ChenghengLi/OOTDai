<template>
    <div class="product__card"  @click="selectControl">
        <img
            :src="image_url"
            :alt="brand"
            class="product__image"
            loading="lazy"
        />
        <div class="product__header">
            <span class="brand">{{ brand }}</span>
        </div>
        <p class="product__name">{{ productName }}</p>
    </div>
</template>

<script>
export default {
    name: "ProductCard",
    props: [
        "productId",
        "image_url",
        "brand",
        "productName",
    ],
    computed: {
        formattedPrice() {
            return this.currency + " " + this.price.toFixed(2);
        },
    },
    methods: {
        selectControl() {
            this.$emit('controlSelected', this.productId);
        }
    },
    
};
</script>

<style scoped>
.product__card {
    border: 1px solid var(--grey);
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.05s ease-in;
    padding: 15px;
    text-align: left;
    border-radius: 15px;
    color: #222;
    cursor: pointer;
    max-height: 75vh;
}

.product__image {
    max-height: 500px; /* Set a fixed height */
    width: 100%; /* Ensure the image takes the full width of its container */
    object-fit: cover; /* Cover the container without distorting the image */
    border-radius: 5px;
}

.product__name {
    padding-block: 10px;
    font-family: 'Open Sans', sans-serif; /* Use a modern and clean font */
    font-size: 1.7rem; /* Adjust the font size as desired */
    line-height: 1.5; /* Add some line spacing */
    text-transform: capitalize; /* Capitalize the first letter of each word */
    letter-spacing: 0.5px; /* Add some letter spacing */
}

.product__name span {
    display: inline-block; /* Make each phrase a separate inline block */
    margin-right: 5px; /* Add spacing between phrases */
}

.product__name span:last-child {
    margin-right: 0; /* Remove the right margin from the last phrase */
}

.product__header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
    text-align: center;
}

.brand {
    font-size: 2rem;
    display: inline-block;
    font-weight: 700;
}




</style>
