<template>
    <div class="clothing-uploader">
      <div class="content-container">
        <!-- Left section for user photo upload -->
        <div class="upload-section">
          <h3>Your Photo</h3>
          <div class="preview-container" v-if="userPhoto">
            <img :src="userPhoto.url" alt="Your photo" class="preview-image">
          </div>
          <div class="upload-placeholder" v-else>
            <span>Upload your photo here</span>
          </div>
          <div class="button-group">
            <input type="file" id="user-photo-input" @change="handleUserPhotoUpload" accept="image/*">
            <label for="user-photo-input" class="custom-file-upload">
              {{ userPhoto ? 'Change photo' : 'Upload photo' }}
            </label>
            <button class="take-photo-btn" @click="takePicture">
              Take a picture
            </button>
          </div>
        </div>
  
        <!-- Right section for clothing uploads -->
        <div class="clothing-section">
          <h3>Your Clothing Items (Max 2)</h3>
          <div class="clothing-items">
            <!-- First clothing item -->
            <div class="clothing-item">
              <div class="preview-container" v-if="clothingItem1">
                <img :src="clothingItem1.url" alt="Clothing item 1" class="preview-image">
              </div>
              <div class="upload-placeholder" v-else>
                <span>Clothing item 1</span>
              </div>
              <div class="button-group">
                <input type="file" id="clothing-input-1" @change="handleClothingUpload1" accept="image/*">
                <label for="clothing-input-1" class="custom-file-upload">
                  {{ clothingItem1 ? 'Change item' : 'Upload item' }}
                </label>
              </div>
            </div>
  
            <!-- Second clothing item -->
            <div class="clothing-item">
              <div class="preview-container" v-if="clothingItem2">
                <img :src="clothingItem2.url" alt="Clothing item 2" class="preview-image">
              </div>
              <div class="upload-placeholder" v-else>
                <span>Clothing item 2</span>
              </div>
              <div class="button-group">
                <input type="file" id="clothing-input-2" @change="handleClothingUpload2" accept="image/*">
                <label for="clothing-input-2" class="custom-file-upload">
                  {{ clothingItem2 ? 'Change item' : 'Upload item' }}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Loading state -->
      <div class="processing-state" v-if="loading">
        <product-preloader>{{ loadingMessages[currentMessageIndex] }}</product-preloader>
      </div>
  
      <button @click="findCombinations" :disabled="!canFindCombinations || loading" class="find-combinations-button">
        {{ loading ? 'Processing...' : 'Find Combinations' }}
      </button>
    </div>
  </template>
  
  <script>
  import Swal from 'sweetalert2';
  import { callOpenAI, combine_system_prompt, parseModelResponse } from "@/apis/openai"; // Adjust the import path as necessary
  import ProductPreloader from "@/components/preloaders/ProductPreloader.vue";
  
  export default {
    name: "ClothingUploaderComponent",
    components: {
      ProductPreloader
    },
    data() {
      return {
        windowWidth: window.innerWidth,
        userPhoto: null,
        clothingItem1: null,
        clothingItem2: null,
        step: 1,
        loading: false,
        loadingMessages: [
          "Analyzing your style...",
          "Matching with clothing items...",
          "Creating outfit combinations...",
          "Finding the perfect look...",
          "Almost ready with your style recommendations..."
        ],
        currentMessageIndex: 0,
        loadingInterval: null
      };
    },
    computed: {
      isSmallScreen() {
        return this.windowWidth < 768;
      },
      canFindCombinations() {
        // Can proceed if user photo and at least one clothing item is uploaded
        return this.userPhoto !== null && (this.clothingItem1 !== null || this.clothingItem2 !== null);
      }
    },
    methods: {
      startLoadingMessageRotation() {
        // Reset the current message index
        this.currentMessageIndex = 0;
        
        // Set up an interval to change the message every 5 seconds
        this.loadingInterval = setInterval(() => {
          // Increment the message index, cycling back to the beginning if needed
          this.currentMessageIndex = (this.currentMessageIndex + 1) % this.loadingMessages.length;
        }, 5000); // 5000 milliseconds = 5 seconds
      },
      
      stopLoadingMessageRotation() {
        // Clear the interval when loading is done
        if (this.loadingInterval) {
          clearInterval(this.loadingInterval);
          this.loadingInterval = null;
        }
      },
      
      handleResize() {
        this.windowWidth = window.innerWidth;
      },
      handleUserPhotoUpload(event) {
        const files = event.target.files;
        if (files.length > 0) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.userPhoto = { url: e.target.result };
          };
          reader.readAsDataURL(files[0]);
        }
        event.target.value = '';
      },
      handleClothingUpload1(event) {
        const files = event.target.files;
        if (files.length > 0) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.clothingItem1 = { url: e.target.result };
          };
          reader.readAsDataURL(files[0]);
        }
        event.target.value = '';
      },
      handleClothingUpload2(event) {
        const files = event.target.files;
        if (files.length > 0) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.clothingItem2 = { url: e.target.result };
          };
          reader.readAsDataURL(files[0]);
        }
        event.target.value = '';
      },
      takePicture() {
        // In a real app, this would use the device camera
        Swal.fire({
          title: 'Camera',
          text: 'This would open your device camera to take a picture.',
          icon: 'info',
          confirmButtonText: 'Got it'
        });
      },
      async findCombinations() {
        // Check if we can proceed
        if (!this.canFindCombinations) {
          Swal.fire({
            title: 'Missing Items',
            text: 'Please upload your photo and at least one clothing item to find combinations.',
            icon: 'error',
          });
          return;
        }
  
        try {
          // Set loading state to true
          this.loading = true;
          
          // Start the loading message rotation
          this.startLoadingMessageRotation();
          
          // Prepare the images
          const personImage = this.userPhoto;
  
          // Create array of garment images (filtering out null items)
          const garmentImages = [];
          if (this.clothingItem1) {
            garmentImages.push(this.clothingItem1);
          }
          if (this.clothingItem2) {
            garmentImages.push(this.clothingItem2);
          }
  
          console.log('Person Image:', personImage);
          console.log('Garment Images:', garmentImages);
  
          // Create the system prompt
          const systemPrompt = combine_system_prompt;
  
          // Create the user prompt
          const userPrompt = "Here are two images. The first image shows a PERSON, and the FOLLOWING image shows ALL THE GARMENTS. " +
            "Analyze both images to determine if the garment fits the person's style, and provide " +
            "complete outfit recommendations that incorporate the garment.";
  
          // Prepare images array for the OpenAI API function
          const images = [];
  
          // Add person image first
          images.push({
            type: "url",
            data: personImage.url
          });
  
          // Add all garment images
          garmentImages.forEach(item => {
            images.push({
              type: "url",
              data: item.url
            });
          });
  
          this.step = 2; // Move to the next step
  
          // Call the OpenAI API using the provided function
          const response = await callOpenAI(
            systemPrompt,
            userPrompt,
            images,
            "gpt-4o-mini"  // Use the specified model
          ).then((response) => {
            // Check if the response is valid
            console.log(parseModelResponse(response));
          });
  
          // Process the response
          if (response) {
            const styleRecommendations = response;
  
            console.log('Style Recommendations:', styleRecommendations);
  
            // Emit event with results
            this.$emit('combinations-found', {
              userPhoto: this.userPhoto,
              clothingItems: garmentImages,
              recommendations: styleRecommendations
            });
          } else {
            throw new Error('Invalid response from style analysis');
          }
        } catch (error) {
          console.error('Error generating style combinations:', error);
  
          Swal.fire({
            title: 'Error',
            text: 'There was a problem generating your style combinations. Please try again.',
            icon: 'error',
          });
        } finally {
          // Always set loading to false when done
          this.loading = false;
          
          // Stop the loading message rotation
          this.stopLoadingMessageRotation();
        }
      }
    },
    mounted() {
      window.addEventListener('resize', this.handleResize);
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.handleResize);
      // Make sure to clean up any running intervals when component is unmounted
      this.stopLoadingMessageRotation();
    }
  };
  </script>
  
  <style scoped>
  * {
    padding: 0;
    margin: 0;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .clothing-uploader {
    display: flex;
    flex-direction: column;
    padding: 20px;
    position: relative;
  }
  
  input {
    display: none;
  }
  
  h3 {
    font-size: 24px;
    font-family: Playfair Display, serif;
    margin-bottom: 15px;
    color: #514f4c;
    text-align: center;
  }
  
  /* Content container with two sections */
  .content-container {
    display: flex;
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    gap: 30px;
    flex: 1;
  }
  
  /* Left upload section */
  .upload-section {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .preview-container,
  .upload-placeholder {
    width: 100%;
    height: 300px;
    border: 3px solid #cfc5b3;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-color: #f8f8f8;
  }
  
  .upload-placeholder {
    color: #888;
    font-size: 18px;
  }
  
  .preview-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
  
  .button-group {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 20px;
  }
  
  .custom-file-upload,
  .take-photo-btn {
    width: 100%;
    padding: 15px 0;
    text-align: center;
    background: #ffffff;
    font-size: 18px;
    font-family: sans-serif;
    font-weight: 400;
    color: #514f4c;
    border: 3px solid #cfc5b3;
    cursor: pointer;
    transition: background-color 0.3s;
    border-radius: 5px;
  }
  
  .custom-file-upload:hover,
  .take-photo-btn:hover {
    background-color: #f0f0f0;
  }
  
  /* Right clothing section */
  .clothing-section {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .clothing-items {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .clothing-item {
    display: flex;
    flex-direction: column;
  }
  
  .clothing-item .preview-container,
  .clothing-item .upload-placeholder {
    height: 120px;
  }
  
  /* Loading state */
  .processing-state {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.85);
    z-index: 10;
  }
  
  /* Find combinations button */
  .find-combinations-button {
    width: 250px;
    height: 53px;
    border-radius: 26px;
    margin: 30px auto;
    display: block;
    background-color: #f19586;
    font-size: 24px;
    font-family: sans-serif;
    font-weight: 700;
    color: white;
    border: none;
    cursor: pointer;
    transition: opacity 0.3s;
  }
  
  .find-combinations-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  /* Responsive styles */
  @media screen and (max-width: 768px) {
    .content-container {
      flex-direction: column;
      gap: 20px;
    }
  
    .preview-container,
    .upload-placeholder {
      height: 200px;
    }
  
    .clothing-item .preview-container,
    .clothing-item .upload-placeholder {
      height: 100px;
    }
  
    .find-combinations-button {
      width: 200px;
      height: 45px;
      font-size: 18px;
      margin: 20px auto;
    }
  }
  </style>