<template>
    <section class="journey-main">
      <p class="section-description">
          Upload a photo of your current outfit, and we'll help you level it up! 
          Our system finds the best matching items to complete or improve your look.
      </p>
      <p class="section-description">
          Whether you're missing the perfect shoes or want a smarter top to go with those jeans, we've got you covered.
          <br><br><br>
      </p>
      <div class="content-container" v-if="!showResults">
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
                  <label for="user-photo-input" class="custom-file-upload" style="background-color: #A1866F; color: white;">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17 8 12 3 7 8"></polyline>
                          <line x1="12" y1="3" x2="12" y2="15"></line>
                      </svg>
                      {{ userPhoto ? 'Change photo' : 'Upload photo' }}
                  </label>
                  <button class="take-photo-btn" @click="takePicture('user')" style="background-color: #A1866F; color: white;">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                          <circle cx="12" cy="13" r="4"></circle>
                      </svg>
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
                          <label for="clothing-input-1" class="custom-file-upload" style="background-color: #A1866F; color: white;">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                  <polyline points="17 8 12 3 7 8"></polyline>
                                  <line x1="12" y1="3" x2="12" y2="15"></line>
                              </svg>
                              {{ clothingItem1 ? 'Change item' : 'Upload item' }}
                          </label>
                          <button class="take-photo-btn" @click="takePicture('clothing1')" style="background-color: #A1866F; color: white;">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                                  <circle cx="12" cy="13" r="4"></circle>
                              </svg>
                              Take a picture
                          </button>
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
                          <label for="clothing-input-2" class="custom-file-upload" style="background-color: #A1866F; color: white;">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                  <polyline points="17 8 12 3 7 8"></polyline>
                                  <line x1="12" y1="3" x2="12" y2="15"></line>
                              </svg>
                              {{ clothingItem2 ? 'Change item' : 'Upload item' }}
                          </label>
                          <button class="take-photo-btn" @click="takePicture('clothing2')" style="background-color: #A1866F; color: white;">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                                  <circle cx="12" cy="13" r="4"></circle>
                              </svg>
                              Take a picture
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <!-- Results view - shown after processing -->
      <outfit-results-component
          v-if="showResults && !loading"
          :user-photo="userPhoto"
          :clothing-items="getClothingItems"
          :recommendations="styleRecommendations"
          :show-results="showResults"
          @reset="resetComponent"
      ></outfit-results-component>

      <!-- Loading state -->
      <div class="processing-state" v-if="loading">
          <product-preloader>{{ loader_text }}</product-preloader>
      </div>

      <!-- Find combinations button - only visible in upload step -->
      <button 
          v-if="!showResults"
          @click="findCombinations" 
          :disabled="!canFindCombinations || loading" 
          class="find-combinations-button"
      >
          {{ loading ? 'Processing...' : 'Find Combinations' }}
      </button>

      <!-- Camera view container -->
      <div class="camera-container" v-if="isCameraOpen">
          <div class="camera-wrapper">
              <video ref="cameraVideo" class="camera-video" autoplay playsinline></video>
              <canvas ref="cameraCanvas" class="camera-canvas"></canvas>
              <div class="camera-controls">
                  <button class="capture-btn" @click="capturePhoto">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                      </svg>
                  </button>
                  <button class="close-camera-btn" @click="closeCamera">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                  </button>
              </div>
          </div>
      </div>
    </section>
</template>

<script>
import Swal from 'sweetalert2';
import { callOpenAI, combine_system_prompt, parseModelResponse, combine_short } from "@/apis/openai"; // Adjust the import path as necessary
import ProductPreloader from "@/components/preloaders/ProductPreloader.vue";
import OutfitResultsComponent from "./OutfitCarrousel.vue";
import SubHeader from "@/components/SubHeader.vue";
import MainHeader from "@/components/MainHeader.vue";

export default {
  name: "ClothingUploaderComponent",
  components: {
      ProductPreloader,
      SubHeader,
      MainHeader,
      OutfitResultsComponent
  },
  data() {
      return {
          windowWidth: window.innerWidth,
          userPhoto: null,
          clothingItem1: null,
          clothingItem2: null,
          step: 1,
          loading: false,
          loader_text: "Finding your best combinations...",
          isThisLoading: true,
          currentGender: null,
          parsedClothingResponse: null,
          loaderInterval: null,
          showResults: false,
          styleRecommendations: null,
          // Camera-related properties
          isCameraOpen: false,
          cameraStream: null,
          captureTarget: null, // 'user', 'clothing1', or 'clothing2'
      };
  },
  computed: {
      isSmallScreen() {
          return this.windowWidth < 768;
      },
      canFindCombinations() {
          // Can proceed if user photo and at least one clothing item is uploaded
          return this.userPhoto !== null && (this.clothingItem1 !== null || this.clothingItem2 !== null);
      },
      getClothingItems() {
          // Return an array of all clothing items
          const items = [];
          if (this.clothingItem1) {
              items.push(this.clothingItem1);
          }
          if (this.clothingItem2) {
              items.push(this.clothingItem2);
          }
          return items;
      }
  },
  methods: {
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
      // Camera Methods
      async takePicture(target) {
          this.captureTarget = target; // 'user', 'clothing1', or 'clothing2'
          
          try {
              // Check if camera is available
              if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                  throw new Error('Camera not supported by your browser');
              }
              
              // Request camera access
              this.cameraStream = await navigator.mediaDevices.getUserMedia({
                  video: {
                      facingMode: 'environment', // Use back camera if available
                      width: { ideal: 1280 },
                      height: { ideal: 720 }
                  },
                  audio: false
              });
              
              // Open camera view
              this.isCameraOpen = true;
              
              // Wait for DOM update then set video stream
              this.$nextTick(() => {
                  const video = this.$refs.cameraVideo;
                  if (video) {
                      video.srcObject = this.cameraStream;
                  }
              });
          } catch (error) {
              console.error('Error accessing camera:', error);
              Swal.fire({
                  title: 'Camera Error',
                  text: `Couldn't access your camera: ${error.message}`,
                  icon: 'error',
                  confirmButtonText: 'OK'
              });
          }
      },
      
      capturePhoto() {
          const video = this.$refs.cameraVideo;
          const canvas = this.$refs.cameraCanvas;
          
          if (video && canvas) {
              // Set canvas dimensions to match video
              const width = video.videoWidth;
              const height = video.videoHeight;
              canvas.width = width;
              canvas.height = height;
              
              // Draw current video frame to canvas
              const ctx = canvas.getContext('2d');
              ctx.drawImage(video, 0, 0, width, height);
              
              // Convert canvas to file
              canvas.toBlob(async (blob) => {
                  // Create a file from the blob
                  const file = new File([blob], "camera-photo.jpg", { type: "image/jpeg" });
                  
                  // Create a data URL for preview
                  const dataUrl = canvas.toDataURL('image/jpeg');
                  
                  // Update the appropriate image based on the capture target
                  if (this.captureTarget === 'user') {
                      this.userPhoto = { url: dataUrl };
                  } else if (this.captureTarget === 'clothing1') {
                      this.clothingItem1 = { url: dataUrl };
                  } else if (this.captureTarget === 'clothing2') {
                      this.clothingItem2 = { url: dataUrl };
                  }
                  
                  // Close camera
                  this.closeCamera();
              }, 'image/jpeg', 0.95);
          }
      },
      
      closeCamera() {
          // Stop camera stream
          if (this.cameraStream) {
              this.cameraStream.getTracks().forEach(track => track.stop());
              this.cameraStream = null;
          }
          
          // Close camera view
          this.isCameraOpen = false;
          this.captureTarget = null;
      },
      
      displayFeedback(text) {
          Swal.fire({
              title: 'Analysis Complete',
              text: text,
              icon: 'success',
              confirmButtonText: 'Continue'
          });
      },
      resetComponent() {
          // Reset to initial state
          this.showResults = false;
          this.styleRecommendations = null;
      },
      setRandomLoaderTexts() {
          // Text options for male users
          const maleLoaderTexts = [
              "Looking sharp! Analyzing your style preferences...",
              "Checking what looks best on you...",
              "Finding the perfect fit for your build...",
              "Matching these items to your masculine style...",
              "Analyzing how these would look on you...",
              "Building your personalized style guide..."
          ];

          // Text options for female users
          const femaleLoaderTexts = [
              "Curating the perfect look for you...",
              "Analyzing these pieces with your feminine style...",
              "Finding your ideal fashion match...",
              "Styling these items for your silhouette...",
              "Creating your personalized fashion palette...",
              "Designing your unique fashion statement..."
          ];

          // Select the appropriate text list based on gender
          const loaderTexts = this.currentGender === 'MALE' ? maleLoaderTexts : femaleLoaderTexts;
          
          // Keep track of indices and phases for the rotation
          let textIndex = Math.floor(Math.random() * loaderTexts.length);
          let phase = 0;
          let lastPhase = -1;
          
          // Clear any existing interval
          if (this.loaderInterval) {
              clearInterval(this.loaderInterval);
          }
          
          // Initial text setting
          this.loader_text = loaderTexts[textIndex];
          
          // Set up the text rotation interval
          this.loaderInterval = setInterval(() => {
              // Stop if loading is done
              if (!this.isThisLoading) {
                  clearInterval(this.loaderInterval);
                  return;
              }
              
              // Alternate between generic texts and clothing info
              if (phase !== lastPhase) {
                  lastPhase = phase;
                  
                  // Phase 0: Use a random loader text
                  if (phase === 0) {
                      // Get a new random index (different from previous)
                      let newIndex;
                      do {
                          newIndex = Math.floor(Math.random() * loaderTexts.length);
                      } while (newIndex === textIndex && loaderTexts.length > 1);
                      
                      textIndex = newIndex;
                      this.loader_text = loaderTexts[textIndex];
                      
                      // Move to clothing phase if we have clothing data
                      if (this.parsedClothingResponse && 
                          this.parsedClothingResponse.clothing && 
                          this.parsedClothingResponse.clothing.length > 0) {
                          phase = 1;
                      }
                  } 
                  // Phase 1: Show first clothing item
                  else if (phase === 1 && 
                           this.parsedClothingResponse.clothing && 
                           this.parsedClothingResponse.clothing[0]) {
                      const item = this.parsedClothingResponse.clothing[0];
                      if (item.type && item.color) {
                          this.loader_text = `You are wearing a ${item.type} with ${item.color} color!`;
                      }
                      
                      // Move to phase 2 if we have a second clothing item
                      if (this.parsedClothingResponse.clothing.length > 1) {
                          phase = 2;
                      } else {
                          phase = 0; // Back to random texts
                      }
                  } 
                  // Phase 2: Show second clothing item
                  else if (phase === 2 && 
                           this.parsedClothingResponse.clothing && 
                           this.parsedClothingResponse.clothing[1]) {
                      const item = this.parsedClothingResponse.clothing[1];
                      if (item.type && item.color) {
                          this.loader_text = `You are also wearing a ${item.type} with ${item.color} color!`;
                      }
                      
                      // Back to random texts
                      phase = 0;
                  } else {
                      // If something went wrong, default to phase 0
                      phase = 0;
                  }
              } else {
                  // Just increment phase when we're ready for a change
                  // If we have items 0..N, phase cycles through 0..N+1 (random, item1, item2, etc.)
                  const maxPhase = this.parsedClothingResponse?.clothing?.length || 0;
                  phase = (phase + 1) % (maxPhase + 1);
              }
          }, 5000);
          
          return this.loaderInterval;
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
              this.isThisLoading = true;
              this.step = 2;
              this.currentGender = null;
              this.parsedClothingResponse = null;
              this.showResults = false;

              // Initialize loader text with default
              this.loader_text = "Analyzing your photos...";

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

              const userPrompt2 = "Please provide a detailed analysis of the PERSON, and the FOLLOWING which are UP to TWO garments. ";

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

              // First call to get gender info
              await callOpenAI(
                  combine_short,
                  userPrompt2,
                  images,
                  "gpt-4o-mini"
              ).then((response) => {
                  // Parse the model response
                  const parsedResponse = parseModelResponse(response);
                  
                  // Save parsed response for later use
                  this.parsedClothingResponse = parsedResponse;
                  
                  // Set gender for loader text selection
                  if (parsedResponse && parsedResponse.gender) {
                      const gender = parsedResponse.gender.toUpperCase();
                      this.currentGender = gender === "MEN" || gender === "MALE" ? "MALE" : "FEMALE";
                      
                      // Now start the loader text rotation with the gender information
                      this.setRandomLoaderTexts();
                  }
              });

              // If we couldn't determine gender, start with generic texts
              if (!this.currentGender) {
                  this.currentGender = "MALE"; // Default
                  this.setRandomLoaderTexts();
              }

              // Call the OpenAI API using the provided function for main processing
              const response = await callOpenAI(
                  systemPrompt,
                  userPrompt,
                  images,
                  "gpt-4o-mini"
              );

              // Process the response
              if (response) {
                  this.styleRecommendations = parseModelResponse(response);
                  
                  // In a real implementation, you would process the actual AI response:
                  // this.styleRecommendations = parseModelResponse(response);
                  
                  console.log('Style Recommendations:', this.styleRecommendations);

                  // Generate feedback text for display
                  let feedbackText = "";
                  if (this.parsedClothingResponse && this.parsedClothingResponse.clothing) {
                      this.parsedClothingResponse.clothing.forEach((item, index) => {
                          if (item.type && item.color) {
                              feedbackText += `You've attached a ${item.type} with ${item.color} color! `;
                              
                              if (index < this.parsedClothingResponse.clothing.length - 1 && 
                                  this.parsedClothingResponse.clothing[index + 1].type) {
                                  feedbackText += "Also, ";
                              }
                          }
                      });
                  }
                  
                  // Show feedback if we have any
                  if (feedbackText) {
                      this.displayFeedback(feedbackText);
                  }
                  
                  // Set showResults to true to display the results view
                  this.showResults = true;
              } else {
                  throw new Error('Invalid response from style analysis');
              }
          } catch (error) {
              console.error('Error generating style combinations:', error);
              this.isThisLoading = false;
              
              // Clear any running interval
              if (this.loaderInterval) {
                  clearInterval(this.loaderInterval);
              }

              Swal.fire({
                  title: 'Error',
                  text: 'There was a problem generating your style combinations. Please try again.',
                  icon: 'error',
              });
          } finally {
              // Always set loading to false when done
              this.loading = false;
              this.isThisLoading = false;
          }
      }
  },
  mounted() {
      window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
      window.removeEventListener('resize', this.handleResize);
      // Clear any running interval when component is unmounted
      if (this.loaderInterval) {
          clearInterval(this.loaderInterval);
      }
      // Make sure to close the camera when component is unmounted
      this.closeCamera();
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

.journey-main {
  position: relative;
  min-height: 100vh;
  padding: clamp(20px, 5vw, 50px);
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
  box-sizing: border-box;
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
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
  height: 120px;}

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

/* Camera styles */
.camera-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
}

.camera-wrapper {
    position: relative;
    width: 90%;
    max-width: 800px;
    height: 80vh;
    max-height: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 12px;
}

.camera-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: #000;
}

.camera-canvas {
    display: none;
}

.camera-controls {
    position: absolute;
    bottom: 5%;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 30px;
}

.capture-btn {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: #f19586;
    border: 3px solid white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
}

.capture-btn:hover {
    transform: scale(1.05);
    background-color: #f5a697;
}

.capture-btn svg {
    color: white;
}

.close-camera-btn {
    position: absolute;
    top: 5%;
    right: 5%;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.5);
    border: 2px solid white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
}

.close-camera-btn:hover {
    background-color: rgba(241, 149, 134, 0.8);
}

.close-camera-btn svg {
    color: white;
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
    
    .camera-wrapper {
        height: 60vh;
    }
    
    .capture-btn {
        width: 60px;
        height: 60px;
    }
}

@media screen and (max-width: 576px) {
    .camera-controls {
        bottom: 20px;
    }
    
    .capture-btn {
        width: 50px;
        height: 50px;
    }
    
    .close-camera-btn {
        width: 35px;
        height: 35px;
        top: 15px;
        right: 15px;
    }
    
    .custom-file-upload,
    .take-photo-btn {
        font-size: 16px;
        padding: 12px 0;
    }
}
</style>