<template>
  <div>
    <!-- 如果数据已加载，则显示进度页面，否则显示预加载 -->
    <div v-if="loaded">
      <!-- 进度页面 -->
      <div v-if="!inCustomization"  class="main-page">
        <div v-if="profileType==='memorialize'">
          <star-animation
            :quoteText="'Love is a shooting star that lands in your heart and lives forever'" 
            :numStars="personalizationSets.length"
            :authorText="'DANIELLE STEEL'"
            :startCustomization="startCustomization"
            :personalizationSet="personalizationSets"
            :nextStep="endCustomization"
            :nextPage="nextPage"
          >
          </star-animation>
        </div>
        <div v-else-if="profileType==='temporary-separation'">
          <away-home
            :prodName="prodName"
            :quote="'Missing you comes in waves. Tonight I\'m swimming'"
            :author="'UNKNOWN'"
            :personalizationSet="personalizationSets"
            :startCustomization="startCustomization"
            :nextStep="endCustomization"
            :nextPage="nextPage"
          />
        </div>
        <div v-else-if="profileType==='animal-love'">
          <wild
            :prodName="prodName"
            :quote="'In your wild eyes, I found my story'"
            :author="'UNKNOWN'"
            :personalizationSet="personalizationSets"
            :startCustomization="startCustomization"
            :nextStep="endCustomization"
            :nextPage="nextPage"
          />
        </div>
        <div v-else-if="profileType==='love'">
          <heart-animation
            :prodName="prodName"
            :quote="'Love is a shooting star that lands in your heart, and lives forever.'"
            :author="'UNKNOWN'"
            :personalizationSet="personalizationSets"
            :startCustomization="startCustomization"
            :nextStep="endCustomization"
            :nextPage="nextPage"
          />
        </div>
        <div v-else>
          <gifting 
            :prodName="prodName"
            :quote="`A gift from the heart touches the soul`"
            :author="'UNKNOWN'"
            :personalizationSet="personalizationSets"
            :startCustomization="startCustomization"
            :nextStep="endCustomization"
            :nextPage="nextPage"
          />
        </div>
        
      </div>

      <!-- 定制页面 -->
      <div v-else>
        <custom-level-card
          v-if="currentIndex !== null && configurationType === '' && personalizationSets[currentIndex].components.length > 0"
          :setConfigurationType="setConfigurationType"
          :productName="personalizationSets[currentIndex].name"
          :showed_image_amount="personalizationSets[currentIndex].currentComponent.props.showed_image_amount"
        />
        <component
          v-if="currentIndex !== null && configurationType === 'simple' && personalizationSets[currentIndex].components.length > 0"
          :is="componentMap[personalizationSets[currentIndex].currentComponent.id]"
          v-bind="personalizationSets[currentIndex].currentComponent.props"
          @updateSelection="handleSelection"
          @next="finishCustomization"
        />
        <component
          v-if="currentIndex !== null && configurationType === 'custom' && personalizationSets[currentIndex].components.length > 0"
          :is="'SimpleConfigurationComponent'"
          @next="finishCustomization"
        />
        <!-- 返回按钮（可选，用于取消定制） -->
        <button @click="cancelCustomization" class="cancel-button">Cancel Customization</button>
      </div>
    </div>

    <!-- 未加载时，显示预加载组件 -->
    <product-preloader v-else>Loading…</product-preloader>
  </div>
</template>

<script>
import PersonalizationButton from './PersonalizationButton.vue';
import ImageSelector from './ImageSelector.vue';
import ColorSelector from './ColorSelector.vue';
import ProductPreloader from '@/components/preloaders/ProductPreloader.vue';
import StarAnimation from '@/components/animations/StarAnimation.vue';
import AwayHome from '@/components/animations/AwayHome.vue';
import Gifting from '@/components/animations/Gifting.vue';
import Wild from '@/components/animations/Wild.vue';
import CustomLevelCard from '../cards/CustomLevelCard.vue';
import QuoteInputor from './QuoteInputor.vue';
import HeartAnimation from '@/components/animations/HeartAnimation.vue';

export default {
  name: 'FullControl',
  components: {
    PersonalizationButton,
    ImageSelector,
    ColorSelector,
    QuoteInputor,
    ProductPreloader,
    StarAnimation,
    AwayHome,
    Gifting,
    CustomLevelCard,
    Wild,
    HeartAnimation
  },
  props: {
    profileType: {
      type: String,
      // default: 'gifting',
      required: true
    },
    images: {
      type: Array,
      default: () => []
    },
    prodName: {
      type: String,
      default: 'Everlast'
    }
  },
  data() {
    return {
      loaded: false,            // 数据是否加载完成
      inCustomization: false,   // 是否处于定制页面
      currentIndex: null,       // 当前定制的产品索引
      componentMap: {           // 组件映射表
        PersonalizationButton,
        ImageSelector,
        ColorSelector,
        QuoteInputor
      },
      personalizationSets: [],   // 产品列表，每个产品包含定制信息
      configurationType: '',
      customizationStep: 0
    };
  },
  mounted() {
    this.fetchPersonalizationSets();
  },
  methods: {
    /**
     * 获取产品定制数据
     */
     async fetchPersonalizationSets() {
        this.loaded = false;
        fetch("/data/personalization/sets2.json")
                .then((response) => response.json())
                .then((data) => {
                    this.personalizationSets = data[this.prodName].products.map((product, index) => {
                        product.showComponent = index === 0 ? true : false;
                        
                        for (let i = 0; i < product.components.length; i++) {
                            if (product.components[i].id === "ImageSelector") {
                                product.components[i].props.imagesList = this.images
                            }
                            // product.components[i].emits = {};
                        }
                        if (product.components.length > 0)
                            product.currentComponent = product.components[0];
                        else
                            product.isComplete = true;
                        this.loaded = true;
                        return product;
                    });
                    console.log(this.personalizationSets);
                })
                .catch((err) => {
                    console.log(err);
                    this.loaded = false;
                });
      },
    /**
     * 开始定制某个产品
     * @param {Number} index - 产品索引
     */
    startCustomization(index) {
      if(this.personalizationSets[index].components.length === 0) {
        alert('This product is not customizable.');
        return;
      }
      this.currentIndex = index;
      // 如果产品只能专业化，直接跳过选择页面
      if(this.personalizationSets[index].professional === true){
        this.setConfigurationType('simple');
      }
      this.inCustomization = true;
      // 确保只有一个产品在定制中
      // 可选：滚动到顶部
      window.scrollTo(0, 0);
    },

    setConfigurationType(type) {
      this.configurationType = type;
    },

    /**
     * 完成定制后，更新产品状态并返回进度页面
     */
    finishCustomization() {
      if (this.customizationStep >= this.personalizationSets[this.currentIndex].components.length - 1) {
        this.personalizationSets[this.currentIndex].isComplete = true;
        this.customizationStep = 0;
        this.personalizationSets[this.currentIndex].currentComponent = this.personalizationSets[this.currentIndex].components[0];
        this.inCustomization = false;
        this.currentIndex = null;
        // 返回顶部
        window.scrollTo(0, 0);
        this.setConfigurationType('');
        // 可选择在此处触发事件或调用 API 保存定制结果
        // this.$emit('updateProduct', this.personalizationSets);
      } else {
        this.customizationStep++;
        this.personalizationSets[this.currentIndex].currentComponent = this.personalizationSets[this.currentIndex].components[this.customizationStep];
        if (this.personalizationSets[this.currentIndex].currentComponent.id === "ImageSelector") {
          this.personalizationSets[this.currentIndex].currentComponent.props = {
            title: "Select Image",
            imagesList: this.images,
            maxSelect: 1
          };
        }
      }
      // // aaaaaa
      // if (this.currentIndex !== null) {
      //   this.personalizationSets[this.currentIndex].isComplete = true;
      // }
      // this.inCustomization = false;
      // this.currentIndex = null;
      // // 返回顶部
      // window.scrollTo(0, 0);
      // this.setConfigurationType('');
      // // 可选择在此处触发事件或调用 API 保存定制结果
      // // this.$emit('updateProduct', this.personalizationSets);
    },
    endCustomization() {
      for (let i = 0; i < this.personalizationSets.length; i++) {
        if (!this.personalizationSets[i].isComplete) {
          alert('Please complete all products before finishing.');
          return false;
        }
      }
      return true;
    },
    nextPage(){
      this.$emit('updateProduct', this.personalizationSets);
    },

    /**
     * 取消定制，返回进度页面
     */
    cancelCustomization() {
      this.inCustomization = false;
      
      this.customizationStep = 0;
      this.personalizationSets[this.currentIndex].currentComponent = this.personalizationSets[this.currentIndex].components[0];
      // 返回顶部
      this.currentIndex = null;
      window.scrollTo(0, 0);
      this.setConfigurationType('');
    },

    /**
     * 处理子组件的选择更新
     * @param {Object} selection - 选择数据
     */
    handleSelection(selection) {
      console.log('选择更新:', selection);
      this.personalizationSets[this.currentIndex].currentComponent.emits.selection = selection;

      // 可在此处保存选择数据到 personalizationSets[currentIndex] 中
    }
  }
};
</script>

<style scoped>
.progress-buttons {
  display: flex;
  justify-content: space-around;
  /* flex-wrap: wrap;
  gap: 1rem; */
  margin-top: 1rem;
}

.progress-button {
  padding: 0.75rem 1.5rem;
  border: none;
  color: #fff;
  cursor: pointer;
  border-radius: 4px;
  font-size: 1rem;
}

.progress-button.grey {
  background-color: grey;
}

.progress-button.yellow {
  background-color: yellow;
  color: #000;
}

.cancel-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #ff4d4f;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.end-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #52c41a;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.main-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
  width: auto;
  scroll-margin-top: 20px; /* Adjust this value as needed */
}
</style>