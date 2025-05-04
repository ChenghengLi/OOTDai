<template>
    <section class="journey-main">
        <div class="info-section">
            <p class="section-description">
                Ever seen an outfit you loved and wished you knew where to find it? Just upload a photo of any clothing
                item, and our system will instantly search the Inditex collection (like Zara) to find the most similar
                pieces.
            </p>
            <p class="section-description">
                It’s quick, easy, and kind of magical. Upload a pic, get results, and start shopping your look—no
                detective work needed.
                <br><br><br>
            </p>
        </div>
        <div class="content-container">
            <!-- Left section for single photo upload -->
            <div class="upload-section">
                <div class="preview-container" v-if="selectedFile">
                    <img :src="selectedFile.url" alt="Uploaded preview" class="preview-image">
                </div>
                <div class="upload-placeholder" v-else>
                    <div class="placeholder-content">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none"
                            stroke="#cfc5b3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                        <span>Upload an image to start</span>
                    </div>
                </div>
                <div class="button-group">
                    <input type="file" id="file-input" @change="handleFileUpload" accept="image/*">
                    <label for="file-input" class="custom-file-upload" style="background-color: #A1866F; color: white;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="17 8 12 3 7 8"></polyline>
                            <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                        {{ selectedFile ? 'Change photo' : 'Upload photo' }}
                    </label>

                    <button class="take-photo-btn" @click="takePicture"
                        style="background-color: #A1866F; color: white;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z">
                            </path>
                            <circle cx="12" cy="13" r="4"></circle>
                        </svg>
                        Take a picture
                    </button>
                </div>

                <!-- Camera video element (hidden by default) -->
                <div class="camera-container" v-if="isCameraOpen">
                    <div class="camera-wrapper">
                        <video ref="cameraVideo" class="camera-video" autoplay playsinline></video>
                        <canvas ref="cameraCanvas" class="camera-canvas"></canvas>
                        <div class="camera-controls">
                            <button class="capture-btn" @click="capturePhoto">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                </svg>
                            </button>
                            <button class="close-camera-btn" @click="closeCamera">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right section for list of links with small images -->
            <div class="links-section">
                <h3 class="section-title">Similar Clothes</h3>
                <div v-if="isLoading" class="loading-container">
                    <div class="loading-spinner"></div>
                    <p>Searching for similar items...</p>
                </div>
                <div class="links-list-container" v-else>
                    <ul class="links-list" v-if="sortedSearchResults.length > 0">
                        <li v-for="(item, index) in sortedSearchResults" :key="index">
                            <a :href="item.link" target="_blank" class="link-item"
                                :class="{ 'selected': selectedLinkIndex === index }"
                                @click.prevent="selectImageLink(item)">
                                <div class="thumbnail">
                                    <img :src="getItemThumbnail(item)" alt="Product thumbnail">
                                    <div class="discount-badge" v-if="hasDiscount(item)">
                                        {{ calculateDiscountPercentage(item) }}% OFF
                                    </div>
                                </div>
                                <div class="link-text">
                                    <span class="item-name">{{ item.name }}</span>
                                    <div class="item-price" v-html="formatPrice(item.price)"></div>
                                    <div class="buy-now-btn">Buy Now</div>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <div v-else-if="hasSearched" class="no-results">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
                            stroke="#888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            <line x1="8" y1="11" x2="14" y2="11"></line>
                        </svg>
                        <p>No similar clothes found.</p>
                        <p>Try another image or adjust your search.</p>
                    </div>
                    <div v-else class="start-instructions">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
                            stroke="#cfc5b3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <p>Upload a photo and click search to find similar clothes.</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="action-buttons">
            <button @click="tryItOn" :disabled="!canSearch" class="try-it-on-button"
                :class="{ 'button-ready': canSearch && !isLoading }">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path
                        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
                    </path>
                </svg>
                Try It On
            </button>
            <button @click="handleSearch" :disabled="!canSearch" class="search-button"
                :class="{ 'search-ready': canSearch && !isLoading }">
                <svg v-if="!isLoading" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <div v-if="isLoading" class="button-spinner"></div>
                {{ isLoading ? 'Searching...' : 'Search' }}
            </button>
        </div>
    </section>
</template>

<script>
import Swal from 'sweetalert2';
import { searchProductsByImage } from '@/apis/inditex.js';
import axios from 'axios';
import SubHeader from "@/components/SubHeader.vue";
import MainHeader from "@/components/MainHeader.vue";

export default {
    name: "AdaptiveUploaderBody",
    data() {
        return {
            windowWidth: window.innerWidth,
            selectedFile: null,
            uploadedFile: null, // To store the server-uploaded file data
            selectedLinkIndex: -1,
            searchResults: [],
            isLoading: false,
            hasSearched: false,
            serverUrl: "http://188.166.157.200:3000", // Replace with your server URL
            isCameraOpen: false,
            cameraStream: null
        };
    },
    components: {
        SubHeader,
        MainHeader
    },
    computed: {
        isSmallScreen() {
            return this.windowWidth < 768;
        },
        canSearch() {
            // Can search if a file is uploaded
            return this.selectedFile !== null && !this.isLoading;
        },
        sortedSearchResults() {
            // Sort search results by price (cheapest to most expensive)
            if (!this.searchResults || this.searchResults.length === 0) return [];

            return [...this.searchResults].sort((a, b) => {
                const priceA = a.price && a.price.value && a.price.value.current ? a.price.value.current : 0;
                const priceB = b.price && b.price.value && b.price.value.current ? b.price.value.current : 0;
                return priceA - priceB;
            });
        }
    },
    methods: {
        handleResize() {
            this.windowWidth = window.innerWidth;
        },
        async handleFileUpload(event) {
            const files = event.target.files;
            if (files.length > 0) {
                const file = files[0];

                // Read file for preview
                const reader = new FileReader();
                reader.onload = (e) => {
                    // Store preview URL
                    this.selectedFile = {
                        url: e.target.result,
                        file: file
                    };

                    // Reset selected link and search results when uploading a new file
                    this.selectedLinkIndex = -1;
                    this.searchResults = [];
                    this.hasSearched = false;
                    this.uploadedFile = null; // Reset the server file
                };
                reader.readAsDataURL(file);
            }
            event.target.value = '';
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
                    this.uploadedFile = response.data.file;
                    return response.data.file.publicUrl;
                } else {
                    throw new Error(response.data.message || 'Upload failed');
                }
            } catch (error) {
                console.error('Error uploading image to server:', error);
                Swal.fire({
                    title: 'Upload Error',
                    text: 'Failed to upload image to server. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                return null;
            }
        },

        async takePicture() {
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

                    // Update selected file
                    this.selectedFile = {
                        url: dataUrl,
                        file: file
                    };

                    // Reset other values just like when uploading a file
                    this.selectedLinkIndex = -1;
                    this.searchResults = [];
                    this.hasSearched = false;
                    this.uploadedFile = null;

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

        selectImageLink(item) {
            this.selectedLinkIndex = this.searchResults.findIndex(result => result.id === item.id);

            // You can emit an event or handle the selection
            this.$emit('item-selected', item);

            // Navigate to the item link since the entire card is now clickable
            window.open(item.link, '_blank');
        },

        async handleSearch() {
            if (this.canSearch) {
                try {
                    this.isLoading = true;
                    this.hasSearched = true;

                    let imageUrl;

                    // Check if we need to upload to server
                    if (!this.uploadedFile && this.selectedFile.file) {
                        // Upload the image to server first
                        imageUrl = await this.uploadImageToServer(this.selectedFile.file);

                        if (!imageUrl) {
                            throw new Error('Failed to get public URL from server');
                        }
                    } else if (this.uploadedFile) {
                        // If already uploaded, use that URL
                        imageUrl = this.uploadedFile.publicUrl;
                    } else {
                        throw new Error('No file selected for upload');
                    }

                    console.log('Image URL:', imageUrl);

                    // Call the API function with the server image URL
                    await searchProductsByImage(imageUrl).then(
                        (response) => {
                            // Mock response
                            this.searchResults = response.data;
                            console.log('Search results:', this.searchResults);
                        }
                    );

                    if (this.searchResults.length === 0) {
                        Swal.fire({
                            title: 'No Results',
                            text: 'No similar clothes found. Try another image.',
                            icon: 'info',
                            confirmButtonText: 'OK'
                        });
                    }
                } catch (error) {
                    console.error('Error searching for similar clothes:', error);
                    Swal.fire({
                        title: 'Error',
                        text: 'Failed to search for similar clothes. Please try again.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                    this.searchResults = [];
                } finally {
                    this.isLoading = false;
                }
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Please upload a photo or take a picture first.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        },

        extractNumberPattern(url) {
  const match = url.match(/(\d{13}-\d+)\.jpg$/);
  return match ? match[1] : null;
},

        // New method for Try It On button
        tryItOn() {
            if (this.canSearch) {
                // Navigate to virtual try-on page with the current image
                if (this.selectedFile) {
                    const imageUrl = this.uploadImageToServer(this.selectedFile.file).then(
                        (url) => {
                            const id = this.extractNumberPattern(url);
                            this.$router.push('/try-on/' + id);
                           
                        }
                    );
                }
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Please upload a photo or take a picture first.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        },

        // Check if item has a discount
        hasDiscount(item) {
            if (!item.price || !item.price.value) return false;
            const current = item.price.value.current;
            const original = item.price.value.original;
            return original && original > current;
        },

        // Calculate discount percentage
        calculateDiscountPercentage(item) {
            if (!this.hasDiscount(item)) return 0;

            const current = item.price.value.current;
            const original = item.price.value.original;
            const discountPercent = Math.round(((original - current) / original) * 100);
            return discountPercent;
        },

        // Format price with currency
        formatPrice(price) {
            if (!price || !price.value || !price.value.current) return 'Price not available';

            const current = price.value.current;
            const original = price.value.original;
            const currency = price.currency || 'EUR';

            // If there's an original price (meaning it's on sale)
            if (original && original > current) {
                return `<span class="current-price">${current.toFixed(2)} ${currency}</span> <span class="original-price">${original.toFixed(2)} ${currency}</span>`;
            }

            return `<span class="current-price">${current.toFixed(2)} ${currency}</span>`;
        },

        // Get thumbnail URL or placeholder
        getItemThumbnail(item) {
            return item.thumbnail || 'http://188.166.157.200:3000/uploads/1746305614724-434399644.jpg';
        }
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleResize);
        // Make sure to close camera if component is destroyed
        this.closeCamera();
    }
};
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

.journey-main {
    position: relative;
    min-height: 100vh;
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
    background-color: #fafafa;
}

.main-title {
    margin-top: 20px;
    margin-bottom: 40px;
    font-size: 36px;
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    text-align: center;
    color: #f19586;
    letter-spacing: 0.5px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.05);
}

.journey-main input {
    display: none;
}

/* Content container with two sections */
.content-container {
    display: flex;
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    gap: 40px;
    flex: 1;
}

/* Left upload section */
.upload-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
}

.preview-container,
.upload-placeholder {
    width: 100%;
    height: 350px;
    border: 3px solid #cfc5b3;
    margin-bottom: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-color: #f8f8f8;
    border-radius: 12px;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    position: relative;
}

/* Fixed image display size */
.preview-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    /* This ensures the image keeps its aspect ratio */
    max-width: 100%;
    max-height: 100%;
    position: absolute;
}

.upload-placeholder:hover {
    border-color: #f19586;
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.placeholder-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
    color: #888;
    font-size: 18px;
}

.button-group {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.journey-main .custom-file-upload,
.journey-main .take-photo-btn {
    width: 100%;
    padding: 15px 0;
    text-align: center;
    background: #ffffff;
    font-size: 17px;
    font-family: sans-serif;
    font-weight: 500;
    color: #514f4c;
    border: 3px solid #cfc5b3;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06);
}

.journey-main .custom-file-upload:hover,
.journey-main .take-photo-btn:hover {
    background-color: #f5f5f5;
    transform: translateY(-3px);
    border-color: #f19586;
    color: #f19586;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
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

/* Right links section */
.links-section {
    flex: 1;
    border: 3px solid #cfc5b3;
    padding: 25px;
    max-height: 550px;
    overflow-y: auto;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    scrollbar-width: thin;
    scrollbar-color: #cfc5b3 #f8f8f8;
}

.links-section::-webkit-scrollbar {
    width: 8px;
}

.links-section::-webkit-scrollbar-track {
    background: #f8f8f8;
    border-radius: 10px;
}

.links-section::-webkit-scrollbar-thumb {
    background-color: #cfc5b3;
    border-radius: 10px;
}

.section-title {
    font-size: 26px;
    font-family: 'Playfair Display', serif;
    margin-bottom: 20px;
    color: #514f4c;
    text-align: center;
    position: relative;
    padding-bottom: 10px;
}

.section-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background-color: #f19586;
    border-radius: 3px;
}

.links-list-container {
    height: calc(100% - 50px);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.links-list {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 20px;
}

.link-item {
    display: flex;
    flex-direction: column;
    padding: 15px;
    border: 1px solid #e0e0e0;
    transition: all 0.3s ease;
    border-radius: 10px;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
    height: 100%;
    text-decoration: none;
    color: inherit;
    background-color: white;
}

.link-item {
    display: flex;
    flex-direction: column;
    padding: 15px;
    border: 1px solid #e0e0e0;
    transition: all 0.3s ease;
    border-radius: 10px;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
    height: 100%;
    text-decoration: none;
    color: inherit;
    background-color: white;
}

.link-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    border-color: #f19586;
}

.link-item.selected {
    background-color: #fcf8f0;
    border-color: #f19586;
    box-shadow: 0 0 0 2px #f19586, 0 8px 16px rgba(0, 0, 0, 0.1);
}

.thumbnail {
    width: 100%;
    height: 180px;
    overflow: hidden;
    margin-bottom: 15px;
    border-radius: 8px;
    border: 1px solid #f0f0f0;
    position: relative;
}

.discount-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #f19586;
    color: white;
    padding: 5px 8px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: bold;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.link-item:hover .thumbnail img {
    transform: scale(1.05);
}

.link-text {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.item-name {
    font-size: 16px;
    color: #514f4c;
    font-weight: 600;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}

.item-price {
    font-size: 16px;
    margin: 8px 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
}

.current-price {
    color: #f19586;
    font-weight: bold;
}

.original-price {
    text-decoration: line-through;
    color: #888;
    font-size: 14px;
    font-weight: normal;
}

.buy-now-btn {
    width: 100%;
    background-color: #cfc5b3;
    color: #514f4c;
    padding: 10px 0;
    border-radius: 25px;
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
    margin-top: auto;
}

.link-item:hover .buy-now-btn {
    background-color: #f19586;
    color: white;
}

/* No results and start instructions */
.no-results,
.start-instructions {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
    color: #888;
    gap: 15px;
    padding: 40px 0;
}

.no-results p,
.start-instructions p {
    font-size: 16px;
    margin: 0;
    max-width: 80%;
}

/* Action buttons container */
.action-buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin: 35px auto;
}

/* Try It On button */
.journey-main .try-it-on-button {
    width: 180px;
    height: 56px;
    border-radius: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 20px;
    font-family: 'Playfair Display', serif;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, #dcd3c3, #e9e3d7);
    color: #514f4c;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.journey-main .try-it-on-button:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: 0.5s;
}

.journey-main .try-it-on-button.button-ready:hover {
    background: linear-gradient(135deg, #f5a697, #f8beb3);
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(241, 149, 134, 0.3);
}

.journey-main .try-it-on-button.button-ready:hover:before {
    left: 100%;
}

.journey-main .try-it-on-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

/* Search button - Improved styling */
.journey-main .search-button {
    width: 180px;
    height: 56px;
    border-radius: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 20px;
    font-family: 'Playfair Display', serif;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, #cfc5b3, #dcd3c3);
    color: #514f4c;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.journey-main .search-button:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: 0.5s;
}

.journey-main .search-button.search-ready:hover {
    background: linear-gradient(135deg, #f19586, #f5a697);
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(241, 149, 134, 0.3);
}

.journey-main .search-button.search-ready:hover:before {
    left: 100%;
}

.journey-main .search-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

/* Loading indicators */
.loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 200px;
    gap: 20px;
}

.loading-spinner,
.button-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #f19586;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

.button-spinner {
    width: 24px;
    height: 24px;
    border-width: 3px;
    border-top-color: #ffffff;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

/* Responsive styles */
@media screen and (max-width: 992px) {
    .links-list {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
}

@media screen and (max-width: 768px) {
    .content-container {
        flex-direction: column;
        gap: 30px;
    }

    .main-title {
        font-size: 28px;
        margin-top: 15px;
        margin-bottom: 25px;
    }

    .preview-container,
    .upload-placeholder {
        height: 250px;
        margin-bottom: 20px;
    }

    .links-section {
        max-height: 400px;
    }

    .section-title {
        font-size: 22px;
        margin-bottom: 15px;
    }

    .links-list {
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 15px;
    }

    .thumbnail {
        height: 150px;
    }

    .item-name {
        font-size: 14px;
    }

    .item-price {
        font-size: 14px;
    }

    .action-buttons {
        flex-direction: column;
        gap: 15px;
        align-items: center;
        margin: 25px auto;
    }

    .journey-main .search-button,
    .journey-main .try-it-on-button {
        width: 170px;
        height: 50px;
        font-size: 18px;
    }

    .camera-wrapper {
        height: 60vh;
    }
}

/* Extra small devices */
@media screen and (max-width: 576px) {
    .links-list {
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
    }

    .link-item {
        padding: 10px;
    }

    .thumbnail {
        height: 130px;
        margin-bottom: 10px;
    }

    .item-name {
        font-size: 13px;
        -webkit-line-clamp: 1;
    }

    .item-price {
        font-size: 13px;
        margin: 5px 0;
    }

    .buy-now-btn {
        padding: 8px 0;
        font-size: 12px;
    }

    .discount-badge {
        font-size: 10px;
        padding: 3px 6px;
    }

    .camera-controls {
        bottom: 20px;
    }

    .capture-btn {
        width: 60px;
        height: 60px;
    }
}

/* Very small devices */
@media screen and (max-width: 400px) {
    .links-list {
        grid-template-columns: 1fr;
    }

    .thumbnail {
        height: 180px;
    }
}
</style>