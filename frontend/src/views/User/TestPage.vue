<template>
    <main-header />
    <sub-header  v-if="!isIpad" heading="Personalization" :subHeading="getStep()" />
    <div v-for="(data, index) in dataByTyp" :key="index">
        <component :is="data.component" v-bind="data.props" :onNext="onNext" v-if="step==index"></component>
    </div>
    <main-footer />
</template>

<script>
import MainHeader from "@/components/MainHeader.vue";
import SubHeader from "@/components/SubHeader.vue";
import MainFooter from "@/components/MainFooter.vue";
import AdaptiveQABody from "@/components/home_components/AdaptiveQABody.vue";
import AdaptivePBody from "@/components/home_components/AdaptivePBody.vue";
import AdaptiveUploaderBody from "@/components/home_components/AdaptiveUploaderBody.vue";
import component from "vue3-paystack";

export default {
    name: "TestPage",
    data() {
        return {
            wild_animal: [
                {
                    component: "AdaptiveQABody",
                    props:{
                        img2src: require('@/assets/journey/wild-animal-love@2x.png'),
                        img1src: require('@/assets/journey/wild-animal-pet1@2x.png'),
                        img2Width: 804,
                        img2Height: 270,
                        img2Left: 2,
                        img2Bottom: -32,
                        img1Width: 261.44,
                        img1Height: 323.78,
                        img1Left: 30,
                        img1Bottom: 154.22,
                        question:"Who is your oxytocin?",
                        questioncolor: "#DBC394",
                        placeholder:"Enter your oxytocin's name"
                    }
                },
                {
                    component: "AdaptiveQABody",
                    props:{
                        img2src: require('@/assets/journey/wild-animal-love@2x.png'),
                        img1src: require('@/assets/journey/wild-animal-pet2@2x.png'),
                        img2Width: 804,
                        img2Height: 270,
                        img2Left: 2,
                        img2Bottom: -32,
                        img1Width: 230,
                        img1Height: 158,
                        img1Left: 314,
                        img1Bottom: 142,
                        question:"What is their species?",
                        questioncolor: "#DBC394",
                        placeholder:"Enter species name"
                    }
                },
                {
                    component: "AdaptivePBody",
                    props:{
                        img2src: require('@/assets/journey/wild-animal-love@2x.png'),
                        img1src: require('@/assets/journey/wild-animal-pet3@2x.png'),
                        img2Width: 804,
                        img2Height: 270,
                        img2Left: 2,
                        img2Bottom: -32,
                        img1Width: 217,
                        img1Height: 310,
                        img1Left: 40.75,
                        img1Bottom: 126.84,
                        disclaimer: "Disclaimer & Privacy Notice: \nThe photos will be used for product design only. If the pet account is private, we will request follow @myoxytocin_pets. Your order will be cancelled and you will receive a full refund if the request is not accepted in 24hours.  It is recommended that you choose the gifting option only if your loved ones’ pet account is public.  Or, you can select full control or gift card option. \nPlease select next to proceed.",
                    }
                },
                {
                    component: "AdaptiveUploaderBody",
                    props:{
                        img1src: require('@/assets/journey/wild-animal-love@2x.png'),
                        img2src: require('@/assets/journey/wild-animal-pet4@2x.png'),
                        img1Width: 804,
                        img1Height: 270,
                        img1Left: 2,
                        img1Bottom: -32,
                        img2Width: 215,
                        img2Height: 284,
                        img2Left: 32,
                        img2Bottom: 194.81,
                        question:"(optional) upload 10 images",
                        questioncolor: "#DBC394",
                        placeholder:""
                    }
                },
            ],
            gifting: [
                {
                    component: "AdaptiveQABody",
                    props:{
                        img2src: require('@/assets/journey/gifting-pet1@2x.png'),
                        img1src: require('@/assets/journey/gifting@2x.png'),
                        img2Width: 252,
                        img2Height: 394,
                        img2Left: 10,
                        img2Bottom: 60,
                        img1Width: 730,
                        img1Height: 239,
                        img1Left: 75,
                        img1Bottom: -15,
                        question:"Who is your oxytocin?",
                        questioncolor: "#F19586",
                        placeholder:"Enter your oxytocin's name"
                    }
                },
                {
                    component: "AdaptiveQABody",
                    props:{
                        img2src: require('@/assets/journey/gifting@2x.png'),
                        img1src: require('@/assets/journey/gifting-pet2@2x.png'),
                        img2Width: 730,
                        img2Height: 239,
                        img2Left: 75,
                        img2Bottom: -15,
                        img1Width: 350,
                        img1Height: 272,
                        img1Left: 0,
                        img1Bottom: 75,
                        question:"What is their species?",
                        questioncolor: "#F19586",
                        placeholder:"Enter species name"
                    }
                },
                {
                    component: "AdaptiveUploaderBody",
                    props:{
                        img1src: require('@/assets/journey/gifting@2x.png'),
                        img2src: require('@/assets/journey/wild-animal-pet4@2x.png'),
                        img1Width: 730,
                        img1Height: 239,
                        img1Left: 75,
                        img1Bottom: -15,
                        img2Width: 215,
                        img2Height: 284,
                        img2Left: 32,
                        img2Bottom: 134,
                        question:"upload 10 images",
                        questioncolor: "#F19586",
                        placeholder:""
                    }
                },
                {
                    component: "AdaptivePBody",
                    props:{
                        img2src: require('@/assets/journey/gifting@2x.png'),
                        img1src: require('@/assets/journey/wild-animal-pet3@2x.png'),
                        img2Width: 730,
                        img2Height: 239,
                        img2Left: 75,
                        img2Bottom: -15,
                        img1Width: 217,
                        img1Height: 310,
                        img1Left: 40.75,
                        img1Bottom: 126.84,
                        disclaimer: "Disclaimer & Privacy Notice: \nThe photos will be used for product design only. If the pet account is private, we will request follow @myoxytocin_pets. Your order will be cancelled and you will receive a full refund if the request is not accepted in 24hours.  It is recommended that you choose the gifting option only if your loved ones’ pet account is public.  Or, you can select full control or gift card option. \nPlease select next to proceed.",
                    }
                },
                
                {
                    component: "AdaptiveQABody",
                    props:{
                        img1src: require('@/assets/journey/gifting@2x.png'),
                        img2src: require('@/assets/journey/gifting-pet5@2x.png'),
                        img1Width: 730,
                        img1Height: 239,
                        img1Left: 75,
                        img1Bottom: -15,
                        img2Width: 194,
                        img2Height: 213,
                        img2Left: 20,
                        img2Bottom: 158,
                        question:"Enter your pet social media",
                        questioncolor: "#F19586",
                        placeholder:"@Instagram"
                    }
                },
                {
                    component: "AdaptiveUploaderBody",
                    props:{
                        img1src: require('@/assets/journey/gifting@2x.png'),
                        img2src: require('@/assets/journey/wild-animal-pet4@2x.png'),
                        img1Width: 730,
                        img1Height: 239,
                        img1Left: 75,
                        img1Bottom: -15,
                        img2Width: 215,
                        img2Height: 284,
                        img2Left: 32,
                        img2Bottom: 134,
                        question:"(optional)upload 10 images",
                        questioncolor: "#F19586",
                        placeholder:""
                    }
                },
            ],
            love: [
                {
                    component: "AdaptiveQABody",
                    props:{
                        img2src: require('@/assets/journey/love@2x.png'),
                        img1src: require('@/assets/journey/love-pet1@2x.png'),
                        img2Width: 613.3,
                        img2Height: 239.2,
                        img2Left: 57.2,
                        img2Bottom: -15.6,
                        img1Width: 252.2,
                        img1Height: 252.2,
                        img1Left: 39,
                        img1Bottom: 155.792,
                        question:"Who is your oxytocin?",
                        questioncolor: "#E5A7A1",
                        placeholder:"Enter your oxytocin's name"
                    }
                },
                {
                    component: "AdaptiveQABody",
                    props:{
                        img2src: require('@/assets/journey/love@2x.png'),
                        img1src: require('@/assets/journey/love-pet2@2x.png'),
                        img2Width: 613.3,
                        img2Height: 239.2,
                        img2Left: 57.2,
                        img2Bottom: -15.6,
                        img1Width: 292.5,
                        img1Height: 295.1,
                        img1Left: 53.456,
                        img1Bottom: 92.014,
                        question:"What is their species?",
                        questioncolor: "#E5A7A1",
                        placeholder:"Enter species name"
                    }
                },
                {
                    component: "AdaptiveUploaderBody",
                    props:{
                        img1src: require('@/assets/journey/love@2x.png'),
                        img2src: require('@/assets/journey/love-pet3@2x.png'),
                        img1Width: 613.3,
                        img1Height: 239.2,
                        img1Left: 57.2,
                        img1Bottom: -15.6,
                        img2Width: 215,
                        img2Height: 284,
                        img2Left: 7.8,
                        img2Bottom: 140.5,
                        question:"upload 10 images",
                        questioncolor: "#E5A7A1",
                        placeholder:""
                    }
                },
                
                {
                    component: "AdaptivePBody",
                    props:{
                        img2src: require('@/assets/journey/love@2x.png'),
                        img1src: require('@/assets/journey/wild-animal-pet3@2x.png'),
                        img2Width: 613.3,
                        img2Height: 239.2,
                        img2Left: 57.2,
                        img2Bottom: -15.6,
                        img1Width: 217,
                        img1Height: 310,
                        img1Left: 40.75,
                        img1Bottom: 126.84,
                        disclaimer: "Disclaimer & Privacy Notice: \nThe photos will be used for product design only. If the pet account is private, we will request follow @myoxytocin_pets. Your order will be cancelled and you will receive a full refund if the request is not accepted in 24hours.  It is recommended that you choose the gifting option only if your loved ones’ pet account is public.  Or, you can select full control or gift card option. \nPlease select next to proceed.",
                    }
                },
                {
                    component: "AdaptiveQABody",
                    props:{
                        img1src: require('@/assets/journey/love@2x.png'),
                        img2src: require('@/assets/journey/memorial-pet5@2x.png'),
                        img1Width: 613.3,
                        img1Height: 239.2,
                        img1Left: 57.2,
                        img1Bottom: -15.6,
                        img2Width: 194,
                        img2Height: 213,
                        img2Left: 20.38,
                        img2Bottom: 144,
                        question:"Enter your pet social media",
                        questioncolor: "#E5A7A1",
                        placeholder:"@Instagram"
                    }
                },
                {
                    component: "AdaptiveUploaderBody",
                    props:{
                        img1src: require('@/assets/journey/love@2x.png'),
                        img2src: require('@/assets/journey/love-pet3@2x.png'),
                        img1Width: 613.3,
                        img1Height: 239.2,
                        img1Left: 57.2,
                        img1Bottom: -15.6,
                        img2Width: 215,
                        img2Height: 284,
                        img2Left: 7.8,
                        img2Bottom: 140.5,
                        question:"(optional)upload 10 images",
                        questioncolor: "#E5A7A1",
                        placeholder:""
                    }
                },
                
            ],
            away_from_home: [
                {
                    component: "AdaptiveQABody",
                    props:{
                        img2src: require('@/assets/journey/away-from-home-pet1@2x.png'),
                        img1src: require('@/assets/journey/away-from-home@2x.png'),
                        img2Width: 174.66,
                        img2Height: 313,
                        img2Left: 24.34,
                        img2Bottom: 131,
                        img1Width: 698,
                        img1Height: 273,
                        img1Left: 29.38,
                        img1Bottom: -20,
                        question:"Who is your oxytocin?",
                        questioncolor: "#C2B59B",
                        placeholder:"Enter your oxytocin's name"
                    }
                },
                {
                    component: "AdaptiveQABody",
                    props:{
                        img2src: require('@/assets/journey/away-from-home-pet2@2x.png'),
                        img1src: require('@/assets/journey/away-from-home@2x.png'),
                        img2Width: 264,
                        img2Height: 289,
                        img2Left: 23.38,
                        img2Bottom: 156,
                        img1Width: 698,
                        img1Height: 273,
                        img1Left: 29.38,
                        img1Bottom: -20,
                        question:"What is their species?",
                        questioncolor: "#C2B59B",
                        placeholder:"Enter species name"
                    }
                },
                {
                    component: "AdaptiveUploaderBody",
                    props:{
                        img1src: require('@/assets/journey/away-from-home@2x.png'),
                        img2src: require('@/assets/journey/love-pet3@2x.png'),
                        img2Width: 222,
                        img2Height: 292.22,
                        img2Left: 2,
                        img2Bottom: 106,
                        img1Width: 698,
                        img1Height: 273,
                        img1Left: 29.38,
                        img1Bottom: -20,
                        question:"upload 10 images",
                        questioncolor: "#C2B59B",
                        placeholder:""
                    }
                },
                
                {
                    component: "AdaptivePBody",
                    props:{
                        img2src: require('@/assets/journey/away-from-home@2x.png'),
                        img1src: require('@/assets/journey/wild-animal-pet3@2x.png'),
                        img2Width: 698,
                        img2Height: 273,
                        img2Left: 29.38,
                        img2Bottom: -20,
                        img1Width: 217,
                        img1Height: 310,
                        img1Left: 40.75,
                        img1Bottom: 126.84,
                        disclaimer: "Disclaimer & Privacy Notice: \nThe photos will be used for product design only. If the pet account is private, we will request follow @myoxytocin_pets. Your order will be cancelled and you will receive a full refund if the request is not accepted in 24hours.  It is recommended that you choose the gifting option only if your loved ones’ pet account is public.  Or, you can select full control or gift card option. \nPlease select next to proceed.",
                    }
                },
                {
                    component: "AdaptiveQABody",
                    props:{
                        img1src: require('@/assets/journey/away-from-home@2x.png'),
                        img2src: require('@/assets/journey/memorial-pet5@2x.png'),
                        img1Width: 698,
                        img1Height: 273,
                        img1Left: 29.38,
                        img1Bottom: -20,
                        img2Width: 194,
                        img2Height: 213,
                        img2Left: 20.38,
                        img2Bottom: 144,
                        question:"Enter your pet social media",
                        questioncolor: "#C2B59B",
                        placeholder:"@Instagram"
                    }
                },
                {
                    component: "AdaptiveUploaderBody",
                    props:{
                        img1src: require('@/assets/journey/away-from-home@2x.png'),
                        img2src: require('@/assets/journey/love-pet3@2x.png'),
                        img1Width: 698,
                        img1Height: 273,
                        img1Left: 29.38,
                        img1Bottom: -20,
                        img2Width: 215,
                        img2Height: 284,
                        img2Left: 7.8,
                        img2Bottom: 110.5,
                        question:"(optional)upload 10 images",
                        questioncolor: "#C2B59B",
                        placeholder:""
                    }
                },
                
            ],
            memorial: [
                {
                    component: "AdaptiveQABody",
                    props:{
                        img2src: require('@/assets/journey/memorial@2x.png'),
                        img1src: require('@/assets/journey/memorial-pet1@2x.png'),
                        img2Width: 924,
                        img2Height: 247,
                        img2Left: 49,
                        img2Bottom: -37,
                        img1Width: 310,
                        img1Height: 331,
                        img1Left: 61,
                        img1Bottom: 77.53,
                        question:"Who is your oxytocin?",
                        questioncolor: "#85AC98",
                        placeholder:"Enter your oxytocin's name"
                    }
                },
                {
                    component: "AdaptiveQABody",
                    props:{
                        img2src: require('@/assets/journey/memorial@2x.png'),
                        img1src: require('@/assets/journey/memorial-pet2@2x.png'),
                        img2Width: 924,
                        img2Height: 247,
                        img2Left: 49,
                        img2Bottom: -37,
                        img1Width: 408,
                        img1Height: 317,
                        img1Left: 41.38,
                        img1Bottom: 74.53,
                        question:"What is their species?",
                        questioncolor: "#85AC98",
                        placeholder:"Enter species name"
                    }
                },
                {
                    component: "AdaptiveUploaderBody",
                    props:{
                        img1src: require('@/assets/journey/love-pet3@2x.png'),
                        img2src: require('@/assets/journey/memorial@2x.png'),
                        img1Width: 222,
                        img1Height: 292.22,
                        img1Left: 2,
                        img1Bottom: 106,
                        img2Width: 924,
                        img2Height: 247,
                        img2Left: 49,
                        img2Bottom: -37,
                        question:"upload 10 images",
                        questioncolor: "#85AC98",
                        placeholder:""
                    }
                },
                
                {
                    component: "AdaptivePBody",
                    props:{
                        img2src: require('@/assets/journey/memorial@2x.png'),
                        img1src: require('@/assets/journey/wild-animal-pet3@2x.png'),
                        img2Width: 924,
                        img2Height: 247,
                        img2Left: 49,
                        img2Bottom: -37,
                        img1Width: 217,
                        img1Height: 310,
                        img1Left: 40.75,
                        img1Bottom: 126.84,
                        disclaimer: "Disclaimer & Privacy Notice: \nThe photos will be used for product design only. If the pet account is private, we will request follow @myoxytocin_pets. Your order will be cancelled and you will receive a full refund if the request is not accepted in 24hours.  It is recommended that you choose the gifting option only if your loved ones’ pet account is public.  Or, you can select full control or gift card option. \nPlease select next to proceed.",
                    }
                },
                {
                    component: "AdaptiveQABody",
                    props:{
                        img1src: require('@/assets/journey/memorial@2x.png'),
                        img2src: require('@/assets/journey/memorial-pet5@2x.png'),
                        img1Width: 924,
                        img1Height: 247,
                        img1Left: 49,
                        img1Bottom: -37,
                        img2Width: 194,
                        img2Height: 213,
                        img2Left: 20.38,
                        img2Bottom: 144,
                        question:"Enter your pet social media",
                        questioncolor: "#85AC98",
                        placeholder:"@Instagram"
                    }
                },
                {
                    component: "AdaptiveUploaderBody",
                    props:{
                        img1src: require('@/assets/journey/memorial@2x.png'),
                        img2src: require('@/assets/journey/love-pet3@2x.png'),
                        img1Width: 924,
                        img1Height: 247,
                        img1Left: 49,
                        img1Bottom: -37,
                        img2Width: 215,
                        img2Height: 284,
                        img2Left: 7.8,
                        img2Bottom: 110.5,
                        question:"(optional)upload 10 images",
                        questioncolor: "#85AC98",
                        placeholder:""
                    }
                },
                
            ],
            step: 0
        };
    },
    methods: {
        // ...mapActions(["set_products"]),
        goToSecondJourney(){
            this.$router.push('/journey/two')
        },
        getStep() {
            if (this.step == 0)
                return "Personalize your set to your style";
            if (this.step == 1)
                return "Who’s your oxytocin: name & species";
            if(this.step == 2)
                return "What’s your preferred level of control";
            return `Personalize your set to your style`;
        },
        onNext(){
            if(this.step == this[this.typ].length-1){
                console.log(this[this.typ]);
                this.$emit('updateProduct', this.personalizationSets);
            }else{
                this.step = this.step + 1;
            }
        }
    },
    components: {
        MainHeader,
        MainFooter,
        SubHeader,
        AdaptiveQABody,
        AdaptivePBody,
        AdaptiveUploaderBody
    },
    computed: {
        isIpad() {
            return window.innerWidth >= 768 && window.innerWidth <= 1024;
        },
        typ() {
            return this.$route.params.typ;
        },
        id() {
            return this.$route.params.id;
        },
        dataByTyp() {
            return this[this.typ];
        },
    },
    async created() {

    },
};
</script>

<style scoped>

</style>
