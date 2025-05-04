<template>
  <div class="journey-main">
    <p class="section-description">
      Upload your outfit and get an instant style score. Rate other looks too—so we learn your taste and give better suggestions.
    </p>
    <p class="section-description">
      The more you rate, the better your style picks get. Simple and smart.
      <br><br><br>
    </p>
    <!-- Main content container -->
    <div class="content-container" v-if="!showResults">
      <!-- Left section for person photo upload and occasion selection -->
      <div class="upload-section">
        <h3>Person Photo</h3>
        <div class="preview-container" v-if="personPhoto">
          <img :src="personPhoto.url" alt="Person photo" class="preview-image">
        </div>
        <div class="upload-placeholder" v-else>
          <span>Upload person photo here</span>
        </div>
        <div class="button-group">
          <input type="file" id="person-photo-input" @change="handlePersonPhotoUpload" accept="image/*">
          <label for="person-photo-input" class="custom-file-upload" style="background-color: #A1866F; color: white;">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            {{ personPhoto ? 'Change photo' : 'Upload photo' }}
          </label>
          <button class="take-photo-btn" @click="takePicture('person')" style="background-color: #A1866F; color: white;">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
              <circle cx="12" cy="13" r="4"></circle>
            </svg>
            Take a picture
          </button>
        </div>
        
        <!-- Occasion selector -->
        <div class="occasion-selector">
          <h3>Select Occasion</h3>
          <select v-model="selectedOccasion" class="occasion-dropdown">
            <option value="" disabled>Choose an occasion</option>
            <option v-for="occasion in occasions" :key="occasion" :value="occasion">
              {{ occasion }}
            </option>
          </select>
          <div class="custom-occasion">
            <input 
              type="text" 
              v-model="customOccasion" 
              placeholder="Or enter a custom occasion..." 
              class="custom-occasion-input"
            >
          </div>
        </div>
      </div>

      <!-- Right section for multiple clothing uploads -->
      <div class="clothing-section">
        <h3>Your Clothing Items</h3 text-align="center">
        <div class="clothing-items">
          <!-- List of uploaded clothing items -->
          <div v-for="(item, index) in clothingItems" :key="index" class="clothing-item">
            <div class="preview-container">
              <img :src="item.url" alt="Clothing item" class="preview-image">
              <button @click="removeClothingItem(index)" class="remove-btn">×</button>
            </div>
          </div>
          
          <!-- Upload new item placeholder -->
          <div class="clothing-item" v-if="clothingItems.length < maxClothingItems">
            <div class="upload-placeholder">
              <span>Add clothing item</span>
            </div>
            <div class="button-group">
              <input type="file" id="clothing-input-new" @change="handleClothingUpload" accept="image/*">
              <label for="clothing-input-new" class="custom-file-upload" style="background-color: #A1866F; color: white;">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                Upload item
              </label>
              <button class="take-photo-btn" @click="takePicture('clothing')" style="background-color: #A1866F; color: white;">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                  <circle cx="12" cy="13" r="4"></circle>
                </svg>
                Take a picture
              </button>
            </div>
          </div>
        </div>
        <p v-if="clothingItems.length >= maxClothingItems" class="max-items-note">
          Maximum number of items reached ({{ maxClothingItems }})
        </p>
      </div>
    </div>

    <!-- Results view - shown after processing -->
    <div v-if="showResults" class="evaluation-container">
      <!-- Summary Dashboard -->
      <div class="summary-card">
        <h2>Outfit Evaluation Summary</h2>
        <div class="summary-content">
          <div class="score-circle">
            <span>{{ styleRecommendations.overall_evaluation.percentage }}%</span>
            <p>Score: {{ styleRecommendations.overall_evaluation.total_score }}/60</p>
          </div>
          <div class="verdict">
            <h3>{{ styleRecommendations.overall_evaluation.verdict }}</h3>
            <p>{{ styleRecommendations.overall_evaluation.summary }}</p>
          </div>
        </div>
        <button @click="toggleDetails" class="details-toggle">
          {{ showDetails ? 'Hide Details' : 'Show Details' }}
        </button>
      </div>

      <!-- Detailed Analysis (Collapsible) -->
      <div v-if="showDetails" class="details-container">
        <!-- Person Analysis -->
        <div class="analysis-section">
          <h3 @click="toggleSection('person')" class="section-header">
            Person Analysis
            <span>{{ sections.person ? '▲' : '▼' }}</span>
          </h3>
          <div v-if="sections.person" class="section-content">
            <p><strong>Style Category:</strong> {{ styleRecommendations.person_analysis.style_category }}</p>
            <p><strong>Color Palette:</strong> {{ styleRecommendations.person_analysis.color_palette.join(', ') }}</p>
            <p><strong>Body Type:</strong> {{ styleRecommendations.person_analysis.body_type }}</p>
            <p><strong>Notable Features:</strong> {{ styleRecommendations.person_analysis.notable_features }}</p>
          </div>
        </div>

        <!-- Garment Analysis -->
        <div class="analysis-section">
          <h3 @click="toggleSection('garment')" class="section-header">
            Garment Analysis
            <span>{{ sections.garment ? '▲' : '▼' }}</span>
          </h3>
          <div v-if="sections.garment" class="section-content">
            <p><strong>Type:</strong> {{ styleRecommendations.garment_analysis.type }}</p>
            <p><strong>Color:</strong> {{ styleRecommendations.garment_analysis.color }}</p>
            <p><strong>Style Category:</strong> {{ styleRecommendations.garment_analysis.style_category }}</p>
            <p><strong>Formality Level:</strong> {{ styleRecommendations.garment_analysis.formality_level }}/10</p>
            <p><strong>Season Appropriateness:</strong> {{ styleRecommendations.garment_analysis.season_appropriateness }}</p>
          </div>
        </div>

        <!-- Occasion Analysis -->
        <div class="analysis-section">
          <h3 @click="toggleSection('occasion')" class="section-header">
            Occasion Analysis
            <span>{{ sections.occasion ? '▲' : '▼' }}</span>
          </h3>
          <div v-if="sections.occasion" class="section-content">
            <p><strong>Formality Required:</strong> {{ styleRecommendations.occasion_analysis.formality_required }}/10</p>
            <p><strong>Typical Dress Code:</strong> {{ styleRecommendations.occasion_analysis.typical_dress_code }}</p>
            <p><strong>Environmental Factors:</strong> {{ styleRecommendations.occasion_analysis.environmental_factors }}</p>
          </div>
        </div>

        <!-- Compatibility Scores -->
        <div class="analysis-section">
          <h3 @click="toggleSection('compatibility')" class="section-header">
            Compatibility Scores
            <span>{{ sections.compatibility ? '▲' : '▼' }}</span>
          </h3>
          <div v-if="sections.compatibility" class="section-content">
            <h4>Person-Garment Match</h4>
            <div class="score-item">
              <p><strong>Style Harmony:</strong> {{ styleRecommendations.compatibility_scores.person_garment_match.style_harmony.score }}/10</p>
              <p>{{ styleRecommendations.compatibility_scores.person_garment_match.style_harmony.explanation }}</p>
            </div>
            <div class="score-item">
              <p><strong>Color Coordination:</strong> {{ styleRecommendations.compatibility_scores.person_garment_match.color_coordination.score }}/10</p>
              <p>{{ styleRecommendations.compatibility_scores.person_garment_match.color_coordination.explanation }}</p>
            </div>
            <div class="score-item">
              <p><strong>Fit Appropriateness:</strong> {{ styleRecommendations.compatibility_scores.person_garment_match.fit_appropriateness.score }}/10</p>
              <p>{{ styleRecommendations.compatibility_scores.person_garment_match.fit_appropriateness.explanation }}</p>
            </div>
            <h4>Garment-Occasion Match</h4>
            <div class="score-item">
              <p><strong>Formality Appropriateness:</strong> {{ styleRecommendations.compatibility_scores.garment_occasion_match.formality_appropriateness.score }}/10</p>
              <p>{{ styleRecommendations.compatibility_scores.garment_occasion_match.formality_appropriateness.explanation }}</p>
            </div>
            <div class="score-item">
              <p><strong>Functional Suitability:</strong> {{ styleRecommendations.compatibility_scores.garment_occasion_match.functional_suitability.score }}/10</p>
              <p>{{ styleRecommendations.compatibility_scores.garment_occasion_match.functional_suitability.explanation }}</p>
            </div>
            <div class="score-item">
              <p><strong>Cultural Alignment:</strong> {{ styleRecommendations.compatibility_scores.garment_occasion_match.cultural_alignment.score }}/10</p>
              <p>{{ styleRecommendations.compatibility_scores.garment_occasion_match.cultural_alignment.explanation }}</p>
            </div>
          </div>
        </div>

        <!-- Improvement Suggestions -->
        <div class="analysis-section" v-if="styleRecommendations.overall_evaluation.percentage < 80">
          <h3 @click="toggleSection('improvements')" class="section-header">
            Improvement Suggestions
            <span>{{ sections.improvements ? '▲' : '▼' }}</span>
          </h3>
          <div v-if="sections.improvements" class="section-content">
            <ul>
              <li v-for="(suggestion, index) in styleRecommendations.overall_evaluation.improvement_suggestions" :key="index">
                {{ suggestion }}
              </li>
            </ul>
          </div>
        </div>

        <!-- NEW: Uploaded Items Display Section -->
        <div class="uploaded-items-results">
          <h3>Evaluated Items</h3>
          <div class="uploaded-items-grid">
            <!-- Person Photo -->
            <div class="uploaded-item">
              <img :src="personPhoto.url" alt="Person photo" class="uploaded-item-img">
              <div class="uploaded-item-caption">Person</div>
            </div>
            
            <!-- Clothing Items -->
            <div v-for="(item, index) in clothingItems" :key="index" class="uploaded-item">
              <img :src="item.url" alt="Clothing item" class="uploaded-item-img">
              <div class="uploaded-item-caption">Item {{ index + 1 }}</div>
            </div>
          </div>
          
          <div class="occasion-display">
            <p><strong>Selected Occasion:</strong> {{ effectiveOccasion }}</p>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <button @click="resetAndScrollToTop" class="reset-button">Back to Upload</button>
      </div>
    </div>

    <!-- Loading state -->
    <div class="processing-state" v-if="loading">
      <product-preloader>{{ loader_text }}</product-preloader>
    </div>

    <!-- Find combinations button - only visible in upload step -->
    <button 
      v-if="!showResults"
      @click="getEvaluation" 
      :disabled="!canFindCombinations || loading" 
      class="find-combinations-button"
    >
      {{ loading ? 'Processing...' : 'Find Combinations' }}
    </button>

    <!-- Camera video element (hidden by default) -->
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
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import { callOpenAI, parseModelResponse, combine_short, system_prompt_evaluator } from "@/apis/openai";
import ProductPreloader from "@/components/preloaders/ProductPreloader.vue";
import SubHeader from "@/components/SubHeader.vue";
import MainHeader from "@/components/MainHeader.vue";
  
export default {
    name: "ClothingUploaderComponent",
    components: {
      ProductPreloader,
      SubHeader,
      MainHeader
    },
    data() {
      return {
        windowWidth: window.innerWidth,
        personPhoto: null,
        clothingItems: [],
        maxClothingItems: 5,
        step: 1,
        loading: false,
        loader_text: "Finding your best combinations...",
        isThisLoading: true,
        currentGender: null,
        parsedClothingResponse: null,
        loaderInterval: null,
        showResults: false,
        styleRecommendations: null,
        showDetails: false,
        sections: {
          person: false,
          garment: false,
          occasion: false,
          compatibility: false,
          improvements: false
        },
        selectedOccasion: "",
        customOccasion: "",
        occasions: [
          "Casual Day Out",
          "Office Work",
          "Formal Event",
          "Wedding",
          "Date Night",
          "Workout",
          "Beach Day",
          "Party",
          "Business Meeting",
          "Job Interview"
        ],
        // New properties for camera functionality
        isCameraOpen: false,
        cameraStream: null,
        captureTarget: null, // 'person' or 'clothing'
        captureIndex: null, // For clothing items
      };
    },
    computed: {
      isSmallScreen() {
        return this.windowWidth < 768;
      },
      canFindCombinations() {
        const hasOccasion = this.selectedOccasion !== "" || this.customOccasion !== "";
        return this.personPhoto !== null && this.clothingItems.length > 0 && hasOccasion;
      },
      effectiveOccasion() {
        return this.customOccasion !== "" ? this.customOccasion : this.selectedOccasion;
      }
    },
    methods: {
      handleResize() {
        this.windowWidth = window.innerWidth;
      },
      handlePersonPhotoUpload(event) {
        const files = event.target.files;
        if (files.length > 0) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.personPhoto = { url: e.target.result };
          };
          reader.readAsDataURL(files[0]);
        }
        event.target.value = '';
      },
      handleClothingUpload(event) {
        const files = event.target.files;
        if (files.length > 0 && this.clothingItems.length < this.maxClothingItems) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.clothingItems.push({ 
              url: e.target.result,
              id: Date.now()
            });
          };
          reader.readAsDataURL(files[0]);
        }
        event.target.value = '';
      },
      removeClothingItem(index) {
        this.clothingItems.splice(index, 1);
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
        this.showResults = false;
        this.styleRecommendations = null;
        this.showDetails = false;
        this.sections = {
          person: false,
          garment: false,
          occasion: false,
          compatibility: false,
          improvements: false
        };
      },
      toggleDetails() {
        this.showDetails = !this.showDetails;
      },
      toggleSection(section) {
        this.sections[section] = !this.sections[section];
      },
      setRandomLoaderTexts() {
        const maleLoaderTexts = [
          "Looking sharp! Analyzing your style preferences...",
          "Checking what looks best on you...",
          "Finding the perfect fit for your build...",
          "Matching these items to your style...",
          "Analyzing how these would look on you...",
          "Building your personalized style guide..."
        ];
        const femaleLoaderTexts = [
          "Curating the perfect look for you...",
          "Analyzing these pieces with your style...",
          "Finding your ideal fashion match...",
          "Styling these items for your silhouette...",
          "Creating your personalized fashion palette...",
          "Designing your unique fashion statement..."
        ];
        const loaderTexts = this.currentGender === 'MALE' ? maleLoaderTexts : femaleLoaderTexts;
        let textIndex = Math.floor(Math.random() * loaderTexts.length);
        if (this.loaderInterval) {
          clearInterval(this.loaderInterval);
        }
        this.loader_text = loaderTexts[textIndex];
        this.loaderInterval = setInterval(() => {
          if (!this.isThisLoading) {
            clearInterval(this.loaderInterval);
            return;
          }
          let newIndex;
          do {
            newIndex = Math.floor(Math.random() * loaderTexts.length);
          } while (newIndex === textIndex && loaderTexts.length > 1);
          textIndex = newIndex;
          this.loader_text = loaderTexts[textIndex];
        }, 3000);
        return this.loaderInterval;
      },
      async getEvaluation() {
        if (!this.personPhoto) {
          Swal.fire({
            title: 'Missing Person Photo',
            text: 'Please upload a photo of yourself to find combinations.',
            icon: 'error',
          });
          return;
        }
        if (this.clothingItems.length === 0) {
          Swal.fire({
            title: 'Missing Clothing Items',
            text: 'Please upload at least one clothing item to find combinations.',
            icon: 'error',
          });
          return;
        }
        if (!this.effectiveOccasion) {
          Swal.fire({
            title: 'Missing Occasion',
            text: 'Please select or enter an occasion for your outfit.',
            icon: 'error',
          });
          return;
        }
        try {
          this.loading = true;
          this.isThisLoading = true;
          this.step = 2;
          this.currentGender = null;
          this.parsedClothingResponse = null;
          this.showResults = false;
          this.loader_text = "Analyzing your photos...";
          const personImage = this.personPhoto;
          console.log('Person Image:', personImage);
          console.log('Clothing Items:', this.clothingItems);
          console.log('Occasion:', this.effectiveOccasion);
          const systemPrompt = system_prompt_evaluator;
          const userPrompt2 = "Please provide a detailed analysis of the PERSON in the first image, followed by an analysis of the clothing items in the subsequent images.";
          const images = [];
          images.push({
            type: "url",
            data: personImage.url
          });
          this.clothingItems.forEach(item => {
            images.push({
              type: "url",
              data: item.url
            });
          });
          await callOpenAI(
            combine_short,
            userPrompt2,
            images,
            "gpt-4o-mini"
          ).then((response) => {
            const parsedResponse = parseModelResponse(response);
            this.parsedClothingResponse = parsedResponse;
            if (parsedResponse && parsedResponse.gender) {
              const gender = parsedResponse.gender.toUpperCase();
              this.currentGender = gender === "MEN" || gender === "MALE" ? "MALE" : "FEMALE";
              this.setRandomLoaderTexts();
            }
          });
          if (!this.currentGender) {
            this.currentGender = "MALE";
            this.setRandomLoaderTexts();
          }
          const userPrompt = "Here are images of myself and some combinations of clothes that I want to wear for a specific occasion. The first image shows a PERSON, the subsequent images show GARMENTS, and the occasion is: " + this.effectiveOccasion + ". Evaluate if the garments are suitable for this person to wear to this specific occasion. Provide detailed analysis and scoring across all evaluation categories.";
          const response = await callOpenAI(
            systemPrompt,
            userPrompt,
            images,
            "gpt-4o-mini"
          );
          if (response) {
            this.styleRecommendations = parseModelResponse(response);
            console.log('Style Recommendations:', this.styleRecommendations);
            let feedbackText = "Analysis complete. We've found some great outfit combinations!";
            this.displayFeedback(feedbackText);
            this.showResults = true;
          } else {
            throw new Error('Invalid response from style analysis');
          }
        } catch (error) {
          console.error('Error generating style combinations:', error);
          this.isThisLoading = false;
          if (this.loaderInterval) {
            clearInterval(this.loaderInterval);
          }
          Swal.fire({
            title: 'Error',
            text: 'There was a problem generating your style combinations. Please try again.',
            icon: 'error',
          });
        } finally {
          this.loading = false;
          this.isThisLoading = false;
        }
      },
      sendToChat() {
        const chatData = {
          personPhoto: this.personPhoto,
          clothingItems: this.clothingItems,
          occasion: this.effectiveOccasion,
          recommendations: this.styleRecommendations
        };
        console.log('Data prepared for chat:', chatData);
        Swal.fire({
          title: 'Sent to Chat',
          text: 'Your outfit data has been sent to the chat system for further assistance.',
          icon: 'success',
          confirmButtonText: 'Continue'
        });
      },
      resetAndScrollToTop() {
        // Clear all data first
        this.showResults = false;
        this.styleRecommendations = null;
        this.showDetails = false;
        this.sections = {
          person: false,
          garment: false,
          occasion: false,
          compatibility: false,
          improvements: false
        };
        
        // Scroll to top of the page
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        
        // Reset all input fields and selections
        // This ensures previous information is completely deleted
        if (this.confirmResetAll) {
          this.personPhoto = null;
          this.clothingItems = [];
          this.selectedOccasion = "";
          this.customOccasion = "";
        }
      },
      // Update your original resetComponent method to use this new one
      resetComponent() {
        // Show confirmation dialog
        this.$swal({
          title: 'Reset Evaluation',
          text: 'Would you like to start completely fresh or keep your uploaded photos?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Start Fresh',
          cancelButtonText: 'Keep Photos'
        }).then((result) => {
          this.confirmResetAll = result.isConfirmed;
          this.resetAndScrollToTop();
        });
      },
      // New camera methods
      async takePicture(target, index = null) {
        this.captureTarget = target; // 'person' or 'clothing'
        this.captureIndex = index; // Only used for clothing items
        
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
            
            // Update the correct image based on the capture target
            if (this.captureTarget === 'person') {
              this.personPhoto = { url: dataUrl };
            } else if (this.captureTarget === 'clothing') {
              if (this.captureIndex !== null && this.clothingItems[this.captureIndex]) {
                // Replace existing clothing item
                this.$set(this.clothingItems, this.captureIndex, { 
                  url: dataUrl, 
                  id: Date.now() 
                });
              } else {
                // Add new clothing item
                if (this.clothingItems.length < this.maxClothingItems) {
                  this.clothingItems.push({ 
                    url: dataUrl, 
                    id: Date.now() 
                  });
                }
              }
            }
            
            // Close camera
            this.closeCamera();
          }, 'image/jpeg', 0.95);
        }
      },
      
      closeCamera() {// Stop camera stream
        if (this.cameraStream) {
          this.cameraStream.getTracks().forEach(track => track.stop());
          this.cameraStream = null;
        }
        
        // Close camera view
        this.isCameraOpen = false;
        this.captureTarget = null;
        this.captureIndex = null;
      }
    },
    mounted() {
      window.addEventListener('resize', this.handleResize);
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.handleResize);
      if (this.loaderInterval) {
        clearInterval(this.loaderInterval);
      }
      // Make sure to close camera if component is destroyed
      this.closeCamera();
    },
    watch: {
      selectedOccasion() {
        if (this.selectedOccasion !== "") {
          this.customOccasion = "";
        }
      }
    }
  };
</script>

<style scoped>
/* Base styles */

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  line-height: 1.6;
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
    

h3 {
  font-size: 24px;
  font-family: 'Playfair Display', serif;
  margin-bottom: 15px;
  color: #514f4c;
  text-align: center;
}

/* Content container layout */
.content-container {
    display: flex;
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    gap: 30px;
    flex: 1;
}

/* Upload sections */
.upload-section{
  flex: 1;
  display: flex;
  flex-direction: column;
}

.clothing-section {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.preview-container, .upload-placeholder {
  width: 100%;
  height: 280px;
  border: 2px solid #cfc5b3;
  border-radius: 8px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #f9f9f9;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: border-color 0.3s;
}

.preview-container:hover {
  border-color: #f19586;
}

.upload-placeholder {
  color: #888;
  font-size: 16px;
}

.preview-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

/* Buttons and inputs */
input[type="file"] {
  display: none;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 15px;
}

.custom-file-upload, .take-photo-btn {
  width: 100%;
  padding: 12px 0;
  text-align: center;
  background: #ffffff;
  font-size: 16px;
  font-weight: 500;
  color: #514f4c;
  border: 2px solid #cfc5b3;
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 6px;
}

.custom-file-upload:hover, .take-photo-btn:hover {
  background-color: #f8f4ee;
  border-color: #f19586;
}

/* Clothing items section */
.clothing-items {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.clothing-item {
    display: flex;
    flex-direction: column;
}

.clothing-item .preview-container, .clothing-item .upload-placeholder {
  height: 140px;
}

.remove-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: rgba(241, 149, 134, 0.8);
  color: white;
  border: none;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 5;
  transition: background-color 0.2s;
}

.remove-btn:hover {
  background-color: rgba(224, 123, 106, 1);
}

/* Occasion selector */
.occasion-selector {
  margin-top: 15px;
  width: 100%;
}

.occasion-dropdown {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 2px solid #cfc5b3;
  border-radius: 6px;
  background-color: #ffffff;
  color: #514f4c;
  margin-bottom: 12px;
  transition: border-color 0.3s;
}

.occasion-dropdown:focus {
  border-color: #f19586;
  outline: none;
}

.custom-occasion-input {
  display: block !important;
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 2px solid #cfc5b3;
  border-radius: 6px;
  background-color: #ffffff;
  color: #514f4c;
  transition: border-color 0.3s;
}

.custom-occasion-input:focus {
  border-color: #f19586;
  outline: none;
}

/* Find combinations button */
.find-combinations-button {
  width: 220px;
  height: 50px;
  border-radius: 25px;
  margin: 30px auto;
  display: block;
  background-color: #f19586;
  font-size: 18px;
  font-weight: 600;
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(241, 149, 134, 0.3);
}

.find-combinations-button:hover:not(:disabled) {
  background-color: #e07b6a;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(241, 149, 134, 0.4);
}

.find-combinations-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Processing state */
.processing-state {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 1000;
  backdrop-filter: blur(3px);
}

/* Results view styling */
.evaluation-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 10px;
}

.summary-card {
  background-color: #fff;
  border-radius: 10px;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.summary-card:hover {
  transform: translateY(-2px);
}

.summary-card h2 {
  font-size: 26px;
  text-align: center;
  color: #514f4c;
  margin-bottom: 20px;
  font-family: 'Playfair Display', serif;
}

.summary-content {
  display: flex;
  align-items: center;
  gap: 30px;
  margin-bottom: 25px;
}

.score-circle {
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  border-radius: 50%;
  background: linear-gradient(135deg, #f19586, #e07b6a);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: bold;
  box-shadow: 0 4px 15px rgba(241, 149, 134, 0.3);
}

.score-circle p {
  font-size: 14px !important;
  margin-top: 5px !important;
  text-align: center;
  margin-bottom: 0 !important;
}

.verdict {
  flex: 1;
}

.verdict h3 {
  color: #514f4c;
  font-size: 24px;
  margin-bottom: 10px;
  text-align: left;
}

.verdict p {
  font-size: 16px;
  color: #555;
  margin: 0 !important;
}

.details-toggle {
  background-color: #cfc5b3;
  color: #514f4c;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s;
  display: block;
  margin: 0 auto;
}

.details-toggle:hover {
  background-color: #b8a89a;
  transform: translateY(-2px);
}

/* Detailed analysis sections */
.details-container {
  margin-top: 25px;
}

.analysis-section {
  margin-bottom: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.3s;
}

.analysis-section:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.section-header {
  background-color: #f8f8f8;
  padding: 15px 20px;
  font-size: 18px;
  color: #514f4c;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s;
  margin: 0;
  font-weight: 600;
}

.section-header:hover {
  background-color: #f0f0f0;
}

.section-content {
  padding: 20px;
  background-color: white;
}

.section-content p {
  margin-bottom: 10px;
  font-size: 15px;
  color: #333;
}

.section-content h4 {
  margin: 20px 0 10px;
  font-size: 17px;
  color: #514f4c;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
}

.score-item {
  margin-bottom: 15px;
  background-color: #f9f9f9;
  padding: 12px;
  border-radius: 6px;
}

.score-item p:first-child {
  font-weight: bold;
  margin-bottom: 6px;
}

.section-content ul {
  list-style: disc;
  padding-left: 20px;
  margin-bottom: 10px;
}

.section-content li {
  margin-bottom: 8px;
}

/* Action buttons */
.action-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
  margin-bottom: 20px;
}

.reset-button {
  background-color: #f19586;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  width: 200px;
}

.reset-button:hover {
  background-color: #e07b6a;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

/* Results display section for uploaded items */
.uploaded-items-results {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 2px solid #eee;
}

.uploaded-items-results h3 {
  margin-bottom: 20px;
  text-align: center;
  color: #514f4c;
}

.uploaded-items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.uploaded-item {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  transition: transform 0.3s;
}

.uploaded-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.uploaded-item-img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.uploaded-item-caption {
  padding: 10px;
  font-size: 14px;
  text-align: center;
  background: #f9f9f9;
}

.max-items-note {
  font-size: 14px;
  color: #888;
  text-align: center;
  margin-top: 5px;
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
  border-radius: 0.75rem;
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
  gap: 1.875rem;
}

.capture-btn {
  width: 4.375rem;
  height: 4.375rem;
  border-radius: 50%;
  background-color: #f19586;
  border: 0.2rem solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 0.2rem 0.625rem rgba(0, 0, 0, 0.3);
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
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  border: 0.125rem solid white;
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
@media screen and (max-width: 940px) {
  .content-container {
    flex-direction: column;
  }
  
  .summary-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .verdict h3 {
    text-align: center;
  }
  
  .clothing-item {
    flex: 0 0 100%;
  }
  
  .uploaded-items-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
}

@media screen and (max-width: 640px) {
  .preview-container, .upload-placeholder {
    height: 220px;
  }
  
  .score-circle {
    width: 100px;
    height: 100px;
    font-size: 28px;
  }
  
  .action-buttons {
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }
  
  .reset-button, .chat-button {
    width: 80%;
  }
  
  .camera-wrapper {
    height: 60vh;
  }
  
  .camera-controls {
    bottom: 1.25rem;
  }
  
  .capture-btn {
    width: 3.75rem;
    height: 3.75rem;
  }
}
</style>