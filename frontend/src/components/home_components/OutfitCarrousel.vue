<template>
  <div class="results-container" v-if="showResults">
    <!-- Grid layout with uploads on left, recommendations on right -->
    <div class="results-grid">
      <!-- Left side - Uploaded items -->
      <div class="uploads-section">
        <h3>Your Items</h3>
        <div class="uploads-grid">
          <!-- User photo -->
          <div class="upload-item">
            <h4>Your Photo</h4>
            <div class="preview-container">
              <img :src="userPhoto.url" alt="Your photo" class="preview-image">
            </div>
            <div class="item-details" v-if="personStyle">
              <p><span>Style:</span> {{ personStyle.style }}</p>
              <p v-if="personStyle.body_type"><span>Body Type:</span> {{ personStyle.body_type }}</p>
              <p v-if="personStyle.colors && personStyle.colors.length > 0">
                <span>Colors:</span> {{ personStyle.colors.join(', ') }}
              </p>
            </div>
          </div>
          
          <!-- Clothing items -->
          <div class="upload-item" v-for="(item, index) in clothingItems" :key="'clothing-' + index">
            <h4>Clothing Item {{ index + 1 }}</h4>
            <div class="preview-container">
              <img :src="item.url" alt="Clothing item" class="preview-image">
            </div>
            <div class="item-details" v-if="garment">
              <p><span>Type:</span> {{ garment.type }}</p>
              <p><span>Color:</span> {{ garment.color }}</p>
              <p v-if="garment.style"><span>Style:</span> {{ garment.style }}</p>
              <p v-if="garment.formality"><span>Formality:</span> {{ garment.formality }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Right side - Outfit recommendations carousel -->
      <div class="recommendations-section">
        <h3>Recommended Outfit Combinations</h3>
        
        <!-- Carousel navigation -->
        <div class="carousel-nav">
          <button @click="prevOutfit" class="nav-button" :disabled="currentOutfitIndex === 0">
            <span>←</span>
          </button>
          <div class="carousel-indicator">
            <span v-for="(outfit, index) in outfits" :key="'indicator-' + index" 
                  :class="{ 'active': currentOutfitIndex === index }"
                  @click="setOutfit(index)">
              •
            </span>
          </div>
          <button @click="nextOutfit" class="nav-button" :disabled="currentOutfitIndex === outfits.length - 1">
            <span>→</span>
          </button>
        </div>
        
        <!-- Carousel content -->
        <div class="carousel-content">
          <div class="outfit-details" v-if="currentOutfit">
            <h4>{{ currentOutfit.name }}</h4>
            <p class="occasion"><span>Perfect for:</span> {{ currentOutfit.occasion }}</p>
            <p class="styling-tip"><span>Styling Tip:</span> {{ currentOutfit.styling_tip }}</p>
            
            <!-- Items grid -->
            <div class="outfit-items-grid">
              <div class="outfit-item" v-for="(item, itemIndex) in currentOutfit.items" :key="'item-' + itemIndex">
                <div class="item-image-placeholder" v-if="!item.imageUrl">
                  <div class="placeholder-text">{{ item.type }}</div>
                  <div class="loading-indicator" v-if="item.isGenerating">Generating image...</div>
                </div>
                <div class="item-image-container" v-else>
                  <img :src="item.imageUrl" :alt="item.name" class="item-image">
                </div>
                <div class="item-info">
                  <h5>{{ item.name }}</h5>
                  <p v-if="item.description">{{ item.description }}</p>
                  <!-- Item action buttons -->
                  <div class="item-actions">
                    <button class="action-button try-on-button" @click="tryOn(item)">
                      Try On
                    </button>
                    <button class="action-button find-it-button" @click="findIt(item)">
                      Find It
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Back button -->
    <button @click="$emit('reset')" class="back-button">
      Start Over
    </button>
  </div>
</template>

<script>
import { ref, computed, watch, nextTick, onMounted } from 'vue';
import { generateImageWithDalle } from '@/apis/openai';
import Swal from 'sweetalert2';

export default {
  name: 'OutfitResultsComponent',
  props: {
    userPhoto: {
      type: Object,
      required: true
    },
    clothingItems: {
      type: Array,
      required: true
    },
    recommendations: {
      type: Object,
      required: true
    },
    showResults: {
      type: Boolean,
      default: false
    }
  },
  emits: ['reset'],
  
  setup(props, { emit }) {
    // Reactive state
    const currentOutfitIndex = ref(0);
    const generatedImages = ref({});
    
    // Computed properties
    const garment = computed(() => props.recommendations?.garment || null);
    
    const outfits = computed(() => {
      if (props.recommendations?.outfits) {
        return props.recommendations.outfits.map(outfit => {
          return {
            ...outfit,
            items: outfit.items.map(item => {
              const itemKey = `${outfit.name}-${item.name}`;
              return {
                ...item,
                isGenerating: !!item.isGenerating,
                imageUrl: generatedImages.value[itemKey] || null
              };
            })
          };
        });
      }
      return [];
    });
    
    const personStyle = computed(() => props.recommendations?.person_style || null);
    
    const currentOutfit = computed(() => {
      if (outfits.value && outfits.value.length > 0) {
        return outfits.value[currentOutfitIndex.value];
      }
      return null;
    });
    
    // Methods
    const prevOutfit = () => {
      if (currentOutfitIndex.value > 0) {
        currentOutfitIndex.value--;
        generateOutfitImages(currentOutfitIndex.value);
      }
    };
    
    const nextOutfit = () => {
      if (currentOutfitIndex.value < outfits.value.length - 1) {
        currentOutfitIndex.value++;
        generateOutfitImages(currentOutfitIndex.value);
      }
    };
    
    const setOutfit = (index) => {
      if (index >= 0 && index < outfits.value.length) {
        currentOutfitIndex.value = index;
        generateOutfitImages(index);
      }
    };
    
    // Button action handlers - implemented directly
    const tryOn = (item) => {
      Swal.fire({
        title: 'Virtual Try On',
        text: `Initiating virtual try-on for ${item.name || item.type || 'this item'}. This will launch our virtual try on room feature.`,
        icon: 'info',
        confirmButtonText: 'Continue'
      });
    };
    
    const findIt = (item) => {
      Swal.fire({
        title: 'Find This Item',
        html: `Looking for ${item.name || item.type || 'this item'} in Inditex stores near you.<br>Will redict you to find the product page.`,
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      });
      
      // Simulate redirecting to a product page after timer
      setTimeout(() => {
        // In a real app, this would redirect to the actual product page
        console.log('Redirecting to product page for:', item);
      }, 2000);
    };
    
    const generateItemImage = async (outfitName, item) => {
      // Create a unique key for this outfit-item combination
      const itemKey = `${outfitName}-${item.name}`;
      
      // Skip if image already generated
      if (generatedImages.value[itemKey]) {
        return;
      }
      
      // Mark as generating
      item.isGenerating = true;
      
      try {
        // Create prompt with item details
        const prompt = `Create a highly realistic image of the following fashion item:
        ${item.name} - ${item.type}
        ${item.description || ''}
        
        Style: 
        ultra-realistic product photo, full view of the entire item only, the entire item must appear fully visible, pure white background (RGB 255,255,255), no shadows, no reflections, studio lighting, centered, isolated, high-resolution
        
        The product should appear fully visible and centered.
        The background must be completely pure white (RGB 255,255,255) with no shadows or color gradients.
        Show the textures, color reflections, and material shine clearly.`;
        
        // Call DALL-E API to generate image
        const imageUrl = await generateImageWithDalle(prompt);
        generatedImages.value[itemKey] = imageUrl[0].url;
        item.imageUrl = imageUrl[0].url;
      } catch (error) {
        console.error(`Failed to generate image for ${item.name}:`, error);
      } finally {
        // Mark as no longer generating
        item.isGenerating = false;
      }
    };
    
    const generateOutfitImages = async (outfitIndex) => {
      const outfit = outfits.value[outfitIndex];
      if (!outfit) return;
      
      // Generate images for all items in the outfit concurrently
      const promises = outfit.items.map(item => generateItemImage(outfit.name, item));
      await Promise.all(promises);
    };
    
    // Watchers
    watch(() => props.recommendations, () => {
      currentOutfitIndex.value = 0;
    }, { deep: true });
    
    watch(() => props.showResults, (newVal) => {
      if (newVal && outfits.value && outfits.value.length > 0) {
        nextTick(() => {
          generateOutfitImages(currentOutfitIndex.value);
        });
      }
    });
    
    // Generate images when component is mounted if results are already showing
    onMounted(() => {
      if (props.showResults && outfits.value && outfits.value.length > 0) {
        generateOutfitImages(currentOutfitIndex.value);
      }
    });
    
    return {
      currentOutfitIndex,
      generatedImages,
      garment,
      outfits,
      personStyle,
      currentOutfit,
      prevOutfit,
      nextOutfit,
      setOutfit,
      tryOn,
      findIt,
      generateItemImage,
      generateOutfitImages
    };
  }
};
</script>

<style scoped>
.results-container {
  margin: 30px auto;
  max-width: 1200px;
  font-family: sans-serif;
}

.results-title {
  font-size: 32px;
  font-family: Playfair Display, serif;
  text-align: center;
  color: #f19586;
  margin-bottom: 30px;
}

.results-grid {
  display: flex;
  gap: 30px;
}

/* Left side - Uploads */
.uploads-section {
  flex: 1;
  min-width: 300px;
}

.uploads-section h3,
.recommendations-section h3 {
  font-size: 24px;
  font-family: Playfair Display, serif;
  color: #514f4c;
  margin-bottom: 20px;
  text-align: center;
}

.uploads-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.upload-item {
  border: 3px solid #cfc5b3;
  border-radius: 8px;
  padding: 15px;
  background-color: #f8f8f8;
  transition: transform 0.2s;
}

.upload-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.upload-item h4 {
  font-size: 18px;
  margin-bottom: 10px;
  color: #514f4c;
}

.preview-container {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 15px;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.preview-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.item-details p {
  margin: 5px 0;
  font-size: 14px;
  color: #666;
}

.item-details span {
  font-weight: bold;
  color: #514f4c;
}

/* Right side - Recommendations */
.recommendations-section {
  flex: 2;
  min-width: 400px;
}

.carousel-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.nav-button {
  background: #ffffff;
  border: 2px solid #cfc5b3;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  color: #514f4c;
  transition: all 0.3s ease;
}

.nav-button:hover:not(:disabled) {
  background-color: #f19586;
  border-color: #f19586;
  color: white;
}

.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.carousel-indicator {
  display: flex;
  margin: 0 20px;
}

.carousel-indicator span {
  margin: 0 5px;
  font-size: 30px;
  color: #cfc5b3;
  cursor: pointer;
  transition: all 0.3s ease;
}

.carousel-indicator span:hover {
  color: #f19586;
}

.carousel-indicator span.active {
  color: #f19586;
}

.carousel-content {
  border: 3px solid #cfc5b3;
  border-radius: 8px;
  padding: 20px;
  background-color: white;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.outfit-details h4 {
  font-size: 22px;
  color: #f19586;
  margin-bottom: 10px;
  text-align: center;
}

.occasion, .styling-tip {
  margin-bottom: 15px;
  color: #666;
  line-height: 1.5;
}

.occasion span, .styling-tip span {
  font-weight: bold;
  color: #514f4c;
}

.outfit-items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
  margin-bottom: 30px;
}

.outfit-item {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.outfit-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.item-image-placeholder {
  background-color: #f0f0f0;
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.loading-indicator {
  position: absolute;
  font-size: 12px;
  color: #514f4c;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 5px 10px;
  border-radius: 3px;
  bottom: 10px;
}

.placeholder-text {
  text-transform: capitalize;
  color: #666;
  font-weight: bold;
}

.item-image-container {
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
}

.item-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.item-info {
  padding: 15px;
}

.item-info h5 {
  margin: 0 0 8px 0;
  color: #514f4c;
  font-size: 16px;
}

.item-info p {
  margin: 0 0 12px 0;
  font-size: 13px;
  color: #666;
  line-height: 1.4;
}

/* Item action buttons */
.item-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.action-button {
  flex: 1;
  padding: 8px 0;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.try-on-button {
  background-color: #a1866f;
  color: white;
}

.try-on-button:hover {
  background-color: #8a7260;
}

.find-it-button {
  background-color: #f19586;
  color: white;
}

.find-it-button:hover {
  background-color: #e07e6f;
}

/* Back button */
.back-button {
  display: block;
  width: 200px;
  height: 45px;
  margin: 30px auto;
  background-color: #cfc5b3;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #b9aa8c;
}

/* Responsive styles */
@media screen and (max-width: 768px) {
  .results-grid {
    flex-direction: column;
  }
  
  .uploads-section, .recommendations-section {
    min-width: auto;
  }
  
  .preview-container {
    height: 150px;
  }
  
  .outfit-items-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>