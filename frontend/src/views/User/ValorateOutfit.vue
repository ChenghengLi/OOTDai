<template>
    <main-header />
    <sub-header margin-top="0px"
    subHeading="Get a score from your outfit!"/>
    <div class="container-fluid styling-app">
        <div class="row justify-content-center" v-if="loaded">
            <!-- Just the component, nothing else -->
            <cloth-evaluator
                @combinations-found="handleCombinationsFound"
                @send-to-chat="handleSendToChat" 
            />
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
import ClothEvaluator from '@/components/home_components/ClothEvaluator.vue';

export default {
    name: "StylingView",
    components: {
        SubHeader,
        MainHeader,
        MainFooter,
        "product-preloader": ProductPreloader,
        ClothEvaluator,
    },
    data() {
        return {
            loaded: true,
            outfitData: null
        };
    },
    methods: {
        handleCombinationsFound(data) {
            console.log('Combinations found:', data);
            this.outfitData = data;
            // You could navigate to a results page or update state to show results
            // this.$router.push({ name: 'results', params: { id: data.id } });
        },
        handleSendToChat(data) {
            console.log('Sending to chat:', data);
            // Here you would integrate with your chat system
            // For example, you might save this data and redirect to a chat page:
            this.$store.dispatch('chat/initializeWithOutfitData', data);
            this.$router.push({ name: 'chat' });
            
            // Or you could open a chat widget/modal:
            // this.$store.commit('chat/openChatWithData', data);
        }
    }
}
</script>

<style scoped>
.styling-app {
    width: 100%;
    min-height: 100vh;
    background-color: #ffffff;
    font-family: sans-serif;
    padding-top: 30px;
    padding-bottom: 50px;
}

.row {
    margin: 0;
}

@media (max-width: 768px) {
    .styling-app {
        padding-top: 15px;
        padding-bottom: 30px;
    }
}
</style>