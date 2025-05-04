<template>
    <div v-for="(data, index) in dataByTyp" :key="index">
        <component :is="data.component" v-bind="data.props" :onNext="onNext" v-if="step==index" v-on="getEventHandlers(data.props.question)"></component>
    </div>
</template>

<script>
import AdaptiveQABody from "@/components/home_components/AdaptiveQABody.vue";
import AdaptivePBody from "@/components/home_components/AdaptivePBody.vue";
import AdaptiveUploaderBody from "@/components/home_components/AdaptiveUploaderBody.vue";

export default {
  name: 'AdaptiveInformationInput',
  props: {
    dataByTyp: Array,
    finalNext: Function
  },
  data(){
    return {
        step: 0,
        name : ""
    }
  },
  methods: {
    onNext(){
        if(this.step == this.dataByTyp.length-1){
            // console.log(dataByTyp);
            // this.$emit('updateProduct', this.personalizationSets);
            console.log('onNext: finalNext called');
            (()=>{
                this.finalNext();
            })();
        }else{
            this.step = this.step + 1;
        }
    },
    getEventHandlers(question) {
        if (question === 'Who is your oxytocin?') {
        return {
            textUpdated: this.handleOxytocinName,
        };
        } else if (question === 'What is their species?') {
        return {
            textUpdated: this.handleSpecies,
        };
        } else if (question === "Upload 10 images"){
            return {
                selectedfiles: this.handleFileUpload,
            };
        } else if (question === "Enter your pet social media"){
            return {
                textUpdated: this.handleInstagram,
            };
        } else {
            return {};
        }
    },
    handleOxytocinName(value) {
        this.name = value;
        this.$emit("updateName", this.name);
    },
    handleSpecies(value) {
        this.$emit("updatePetType", value);
    },
    handleInstagram(value) {
        this.$emit("updateInstagram", value);
    },
    handleFileUpload(value) {
        this.$emit('selectedfiles', value);
    }
  },
  components: {
      AdaptiveQABody,
      AdaptivePBody,
      AdaptiveUploaderBody
  },
  computed: {
  },

  // Your component logic here
};
</script>

<style scoped>
/* Your styles here */
</style>