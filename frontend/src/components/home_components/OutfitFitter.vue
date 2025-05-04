<template>
  <section class="tryon-main">
    <h1 class="main-title">Virtual Try-On</h1>
    
    <!-- Initial Layout - Before Try-On -->
    <div class="content-container" v-if="!hasTriedOn">
      <!-- Left section for person upload -->
      <div class="upload-section person-section">
        <h3 class="upload-title">Your Photo</h3>
        <div class="preview-container" v-if="personImage">
          <img :src="personImage.url" alt="Your photo" class="upload-preview">
        </div>
        <div class="upload-placeholder" v-else>
          <div class="placeholder-content">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#cfc5b3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>Upload your photo</span>
          </div>
        </div>
        <div class="button-group">
          <input type="file" id="person-input" @change="handlePersonUpload" accept="image/*">
          <label for="person-input" class="custom-file-upload" style="background-color: #A1866F; color: white;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            {{ personImage ? 'Change photo' : 'Upload photo' }}
          </label>
          
          <button class="take-photo-btn" @click="takePicture('person')" style="background-color: #A1866F; color: white;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
              <circle cx="12" cy="13" r="4"></circle>
            </svg>
            Take a picture
          </button>
        </div>
      </div>
      
      <!-- Right section for clothing upload -->
      <div class="upload-section clothing-section">
        <h3 class="upload-title">Clothing Item</h3>
        <div class="preview-container" v-if="clothingImage">
          <img :src="clothingImage.url" alt="Clothing item" class="upload-preview">
        </div>
        <div class="upload-placeholder" v-else>
          <div class="placeholder-content">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#cfc5b3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6.5 12h11M16 6l4 6-4 6M8 6L4 12l4 6"></path>
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            </svg>
            <span>Upload clothing</span>
          </div>
        </div>
        <div class="button-group">
          <input type="file" id="clothing-input" @change="handleClothingUpload" accept="image/*">
          <label for="clothing-input" class="custom-file-upload" style="background-color: #A1866F; color: white;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            {{ clothingImage ? 'Change item' : 'Upload item' }}
          </label>
          
          <button class="take-photo-btn" @click="takePicture('clothing')" style="background-color: #A1866F; color: white;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
              <circle cx="12" cy="13" r="4"></circle>
            </svg>
            Take a picture
          </button>
        </div>
      </div>
    </div>

    <!-- Try-On button (only shown in initial layout) -->
    <div class="try-on-button-container" v-if="!hasTriedOn">
      <button @click="startTryOn" :disabled="!canGenerate" class="try-on-button" :class="{ 'button-ready': canGenerate && !isGenerating }">
        <svg v-if="!isGenerating" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        <div v-if="isGenerating" class="button-spinner"></div>
        {{ isGenerating ? 'Generating...' : 'Try It On' }}
      </button>
    </div>
    
    <!-- After Try-On Layout -->
    <div class="content-container after-tryon" v-if="hasTriedOn">
      <!-- Top section for result canvas -->
      <div class="result-section">
        <div class="preview-container" v-if="combinedImage">
          <img :src="combinedImage" alt="Try-on result" class="preview-image">
        </div>
        <div class="result-placeholder" v-else>
          <div class="placeholder-content">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#cfc5b3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span>Your virtual try-on result will appear here</span>
          </div>
        </div>
        
        <!-- Action buttons -->
        <div class="action-buttons">
          <button @click="generateTryOn" :disabled="!canGenerate" class="try-again-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
              <path d="M3 3v5h5"></path>
            </svg>
            {{ isGenerating ? 'Generating...' : 'Try Again' }}
          </button>
          <button @click="saveResult" :disabled="!combinedImage" class="save-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
              <polyline points="17 21 17 13 7 13 7 21"></polyline>
              <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
            Save Photo
          </button>
        </div>
      </div>
      
      <!-- Bottom section for small uploads after try-on -->
      <div class="small-uploads-container">
        <!-- Person photo small upload -->
        <div class="small-upload-box">
          <h3 class="upload-title">Your Photo</h3>
          <div class="small-preview-container" v-if="personImage">
            <img :src="personImage.url" alt="Your photo" class="small-upload-preview">
          </div>
          <div class="small-upload-placeholder" v-else>
            <div class="placeholder-content">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#cfc5b3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </div>
          <div class="small-button-group">
            <input type="file" id="person-input-small" @change="handlePersonUpload" accept="image/*">
            <label for="person-input-small" class="small-custom-upload">Change</label>
          </div>
        </div>
        
        <!-- Clothing photo small upload -->
        <div class="small-upload-box">
          <h3 class="upload-title">Clothing Item</h3>
          <div class="small-preview-container" v-if="clothingImage">
            <img :src="clothingImage.url" alt="Clothing item" class="small-upload-preview">
          </div>
          <div class="small-upload-placeholder" v-else>
            <div class="placeholder-content">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#cfc5b3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6.5 12h11M16 6l4 6-4 6M8 6L4 12l4 6"></path>
              </svg>
            </div>
          </div>
          <div class="small-button-group">
            <input type="file" id="clothing-input-small" @change="handleClothingUpload" accept="image/*">
            <label for="clothing-input-small" class="small-custom-upload">Change</label>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Camera modal -->
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
import axios from 'axios';
import {runFashnAI, getFashnAIStatus} from '@/apis/pixelcut.js'; // Adjust the import based on your project structure

export default {
  name: "VirtualTryOn",
  data() {
    return {
      personImage: null,
      clothingImage: null,
      combinedImage: null,
      isGenerating: false,
      isCameraOpen: false,
      cameraStream: null,
      currentCameraTarget: null, // 'person' or 'clothing'
      serverUrl: "http://188.166.157.200:3000",
      clothId: null, // To store the clothing ID from route params
      hasTriedOn: false, // Track if user has tried on clothing
    };
  },
  computed: {
    canGenerate() {
      return this.personImage && this.clothingImage && !this.isGenerating;
    }
  },
  methods: {
    handlePersonUpload(event) {
      const files = event.target.files;
      if (files.length > 0) {
        const file = files[0];
        
        // Read file for preview
        const reader = new FileReader();
        reader.onload = (e) => {
          this.personImage = { 
            url: e.target.result,
            file: file
          };
        };
        reader.readAsDataURL(file);
      }
      event.target.value = '';
    },
    
    handleClothingUpload(event) {
      const files = event.target.files;
      if (files.length > 0) {
        const file = files[0];
        
        // Read file for preview
        const reader = new FileReader();
        reader.onload = (e) => {
          this.clothingImage = { 
            url: e.target.result,
            file: file
          };
        };
        reader.readAsDataURL(file);
      }
      event.target.value = '';
    },
    
    takePicture(target) {
      this.currentCameraTarget = target;
      
      try {
        // Check if camera is available
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('Camera not supported by your browser');
        }
        
        // Request camera access
        navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: target === 'person' ? 'user' : 'environment', // Front camera for person, back camera for clothing
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: false
        })
        .then(stream => {
          this.cameraStream = stream;
          this.isCameraOpen = true;
          
          // Wait for DOM update then set video stream
          this.$nextTick(() => {
            const video = this.$refs.cameraVideo;
            if (video) {
              video.srcObject = this.cameraStream;
            }
          });
        })
        .catch(error => {
          console.error('Error accessing camera:', error);
          Swal.fire({
            title: 'Camera Error',
            text: `Couldn't access your camera: ${error.message}`,
            icon: 'error',
            confirmButtonText: 'OK'
          });
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
        canvas.toBlob(blob => {
          // Create a file from the blob
          const file = new File([blob], "camera-photo.jpg", { type: "image/jpeg" });
          
          // Create a data URL for preview
          const dataUrl = canvas.toDataURL('image/jpeg');
          
          // Update selected file based on current target
          if (this.currentCameraTarget === 'person') {
            this.personImage = {
              url: dataUrl,
              file: file
            };
          } else if (this.currentCameraTarget === 'clothing') {
            this.clothingImage = {
              url: dataUrl,
              file: file
            };
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
    },
    
    browseClothes() {
      // Navigate to the clothing search page
      this.$router.push({ name: 'clothes-search' });
    },
    
    async uploadImageToServer(file) {
      try {
        // Create form data for file upload
        const formData = new FormData();
        formData.append('image', file);
        
        // Upload to server
        const response = await axios.post(`${this.serverUrl}/api/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        // Return the public URL if upload successful
        if (response.data.success) {
          return response.data.file.publicUrl;
        } else {
          throw new Error(response.data.message || 'Upload failed');
        }
      } catch (error) {
        console.error('Error uploading image to server:', error);
        throw error;
      }
    },
    
    // Start the try-on process and change layout
    startTryOn() {
      if (!this.canGenerate) {
        Swal.fire({
          title: 'Missing Images',
          text: 'Please provide both your photo and a clothing item.',
          icon: 'warning',
          confirmButtonText: 'OK'
        });
        return;
      }
      
      // First, switch to the try-on layout
      this.hasTriedOn = true;
      
      // Then generate the try-on result
      this.generateTryOn();
    },
    
    // Reset the try-on process but keep in the same layout
    resetTryOn() {
      // Just clear the result image to trigger regeneration
      this.combinedImage = null;
      // Call generateTryOn again
      this.generateTryOn();
    },
    
    async generateTryOn() {
      if (!this.canGenerate) {
        return;
      }
      
      try {
        this.isGenerating = true;
        this.combinedImage = null; // Clear the result image while generating
        
        // Upload both images if not already on server
        let personUrl = this.personImage.serverUrl || await this.uploadImageToServer(this.personImage.file);
        let clothingUrl = this.clothingImage.serverUrl || await this.uploadImageToServer(this.clothingImage.file);
        
        // Save the server URLs
        if (!this.personImage.serverUrl) this.personImage.serverUrl = personUrl;
        if (!this.clothingImage.serverUrl) this.clothingImage.serverUrl = clothingUrl;


        // Call try-on API
        let response = await runFashnAI(personUrl, clothingUrl);
        const id = response.id;
        response = await getFashnAIStatus(id);

        while(response.status !== 'completed' && response.status !== 'failed') {
          console.log('Waiting for try-on to complete...');
          response = await getFashnAIStatus(id);
        }

        this.combinedImage = response.output[0];


      } catch (error) {
        console.error('Error generating try-on:', error);
        Swal.fire({
          title: 'Error',
          text: `Failed to generate try-on: ${error.message}`,
          icon: 'error',
          confirmButtonText: 'OK'
        });
        
        // Fallback behavior for demo - use a placeholder result
        // Remove this in production
        this.combinedImage = 'http://188.166.157.200:3000/uploads/tryon-result-placeholder.jpg';
      } finally {
        this.isGenerating = false;
      }
    },
    
    saveResult() {
      if (this.combinedImage) {
        // Create an anchor element
        const a = document.createElement('a');
        a.href = this.combinedImage;
        a.download = 'virtual-tryon-result.jpg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    },
    
    // When a route param is available, load the clothing item
    async loadClothingFromId(id) {
          // Set the clothing image
          this.clothingImage = {
            url: `http://188.166.157.200:3000/uploads/${id}.jpg`,
            serverUrl: `http://188.166.157.200:3000/uploads/${id}.jpg`, // Already on server
            id: id,
            name: ""
          };
          return true;
    }
  },
  mounted() {
    // Check if we have a clothing ID from route
    const { clothId } = this.$route.params;
    
    if (clothId && clothId !== 'none') {
      this.clothId = clothId;
      this.loadClothingFromId(clothId);
    }
  },
  beforeUnmount() {
    // Make sure to close camera if component is destroyed
    this.closeCamera();
  }
};
</script>

<style scoped>
/* Base styles */
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.tryon-main {
  position: relative;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: #f8f7f5;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.main-title {
  margin-top: 16px;
  margin-bottom: 24px;
  font-size: 36px;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  text-align: center;
  color: #f19586;
  letter-spacing: 0.5px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.05);
}

.tryon-main input {
  display: none;
}

/* Initial layout content container */
.content-container {
  display: flex;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  gap: 24px;
  flex: 1;
}

/* Upload sections in initial layout */
.upload-section {
  flex: 1;
  border: 2px solid #cfc5b3;
  padding: 16px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 6px 12px rgba(0,0,0,0.05);
  height: 420px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.upload-section:hover {
  box-shadow: 0 8px 16px rgba(241, 149, 134, 0.15);
  transform: translateY(-2px);
}

.upload-title {
  font-size: 20px;
  font-family: 'Playfair Display', serif;
  margin-bottom: 12px;
  color: #514f4c;
  text-align: center;
  padding-bottom: 8px;
  border-bottom: 2px solid #f0f0f0;
}

.upload-section .preview-container,
.upload-placeholder {
  width: 100%;
  flex: 1;
  border: 2px dashed #cfc5b3;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #f9f9f9;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.upload-preview {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
}

.upload-placeholder:hover {
  border-color: #f19586;
  background-color: #f9f7f5;
}

.placeholder-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #888;
  font-size: 16px;
  text-align: center;
  padding: 0 20px;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 4px;
}

.tryon-main .custom-file-upload,
.tryon-main .take-photo-btn,
.tryon-main .browse-clothes-btn {
  flex: 1;
  padding: 12px 10px;
  text-align: center;
  background: #ffffff;
  font-size: 14px;
  font-weight: 500;
  color: #514f4c;
  border: 2px solid #cfc5b3;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.tryon-main .custom-file-upload:hover,
.tryon-main .take-photo-btn:hover,
.tryon-main .browse-clothes-btn:hover {
  background-color: #f5f5f5;
  transform: translateY(-2px);
  border-color: #f19586;
  color: #f19586;
  box-shadow: 0 4px 8px rgba(0,0,0,0.08);
}

/* Try-on button container */
.try-on-button-container {
  width: 100%;
  max-width: 1100px;
  margin: 16px auto 0;
  display: flex;
  justify-content: center;
}

/* Try-on button */
.tryon-main .try-on-button {
  min-width: 200px;
  height: 54px;
  border-radius: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  background-color: #f19586;
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.tryon-main .try-on-button:before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: 0.5s;
}

.tryon-main .try-on-button.button-ready:hover {
  background: linear-gradient(135deg, #f19586, #f5a697);
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 8px 16px rgba(241, 149, 134, 0.3);
}

.tryon-main .try-on-button.button-ready:hover:before {
  left: 100%;
}

.tryon-main .try-on-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
}

/* After Try-On Layout */
.content-container.after-tryon {
  flex-direction: column;
  gap: 16px;
  margin-top: 0;
}

/* Result section styling */
.result-section {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.result-section .preview-container,
.result-placeholder {
  width: 100%;
  height: 480px;
  border: 2px solid #cfc5b3;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: white;
  border-radius: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 6px 12px rgba(0,0,0,0.05);
  position: relative;
}

.preview-image {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
}

/* Action buttons */
.action-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 0;
  margin-bottom: 16px;
}

/* Save button and Try Again button */
.tryon-main .save-button,
.tryon-main .try-again-button {
  min-width: 160px;
  height: 48px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #cfc5b3, #dcd3c3);
  color: #514f4c;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.tryon-main .save-button:before,
.tryon-main .try-again-button:before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: 0.5s;
}

.tryon-main .save-button:not(:disabled):hover,
.tryon-main .try-again-button:not(:disabled):hover {
  background: linear-gradient(135deg, #f19586, #f5a697);
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 8px 16px rgba(241, 149, 134, 0.3);
}

.tryon-main .save-button:not(:disabled):hover:before,
.tryon-main .try-again-button:not(:disabled):hover:before {
  left: 100%;
}

.tryon-main .save-button:disabled,
.tryon-main .try-again-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
}

/* Small uploads container */
.small-uploads-container {
  display: flex;
  gap: 16px;
  width: 100%;
}

.small-upload-box {
  flex: 1;
  border: 2px solid #cfc5b3;
  padding: 12px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  height: 180px;
  transition: all 0.3s ease;
}

.small-upload-box:hover {
  box-shadow: 0 6px 12px rgba(241, 149, 134, 0.15);
  transform: translateY(-2px);
}

.small-preview-container,
.small-upload-placeholder {
  width: 100%;
  flex: 1;
  border: 1px dashed #cfc5b3;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.small-upload-preview {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
}

.small-button-group {
  display: flex;
  justify-content: center;
}

.small-custom-upload {
  padding: 8px 16px;
  background: #ffffff;
  font-size: 14px;
  font-weight: 500;
  color: #514f4c;
  border: 1px solid #cfc5b3;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.3s ease;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.small-custom-upload:hover {
  background-color: #f5f5f5;
  border-color: #f19586;
  color: #f19586;
  transform: translateY(-2px);
  box-shadow: 0 3px 6px rgba(0,0,0,0.08);
}

/* Camera modal */
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
  backdrop-filter: blur(5px);
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
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
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
  bottom: 30px;
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
  top: 20px;
  right: 20px;
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

/* Loading indicators */
.button-spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid #ffffff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive styles */
@media screen and (max-width: 992px) {
  .content-container {
    gap: 20px;
  }
  
  .upload-section {
    height: 380px;
  }
  
  .result-section .preview-container,
  .result-placeholder {
    height: 420px;
  }
  
  .small-upload-box {
    height: 160px;
  }
}

@media screen and (max-width: 768px) {
  .content-container {
    flex-direction: column;
    gap: 16px;
  }
  
  .upload-section {
    height: 280px;
  }
  
  .main-title {
    font-size: 28px;
    margin-top: 12px;
    margin-bottom: 20px;
  }
  
  .button-group {
    flex-direction: column;
  }
  
  .result-section .preview-container,
  .result-placeholder {
    height: 350px;
    margin-bottom: 12px;
  }
  
  .small-uploads-container {
    flex-direction: column;
    gap: 12px;
  }
  
  .small-upload-box {
    height: 140px;
  }
  
  .action-buttons {
    flex-direction: column;
    gap: 12px;
    align-items: center;
  }
  
  .tryon-main .save-button,
  .tryon-main .try-again-button,
  .tryon-main .try-on-button {
    width: 100%;
    max-width: 220px;
    height: 44px;
    font-size: 16px;
  }
  
  .camera-wrapper {
    height: 60vh;
  }
}

/* Extra small devices */
@media screen and (max-width: 576px) {
  .tryon-main {
    padding: 12px;
  }
  
  .upload-section {
    height: 240px;
    padding: 12px;
  }
  
  .small-upload-box {
    height: 120px;
    padding: 10px;
  }
  
  .upload-title {
    font-size: 18px;
    margin-bottom: 8px;
  }
  
  .placeholder-content {
    font-size: 14px;
  }
  
  .capture-btn {
    width: 60px;
    height: 60px;
  }
  
  .result-section .preview-container,
  .result-placeholder {
    height: 300px;
  }
}
</style>