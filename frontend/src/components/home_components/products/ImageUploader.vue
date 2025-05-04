<template>
    <div class="image-upload-container">
      <h3 class="title">{{ title }}</h3> <!-- Display the title -->
      <input type="file" @change="handleImageUpload" multiple class="upload-btn"/>
      <div class="uploaded-images">
        <div v-for="(image, index) in images" :key="index" class="image-container">
          <img :src="image.url" :alt="`Uploaded Image ${index + 1}`" class="uploaded-image"/>
          <button @click="removeImage(index)" class="delete-btn">Delete</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ImageUploadComponent',
    props:  {
      title: String,
      images_list: {
        type: Array,
        default: [] // Set the default value for the text prop
      }
    }, // Declare the title prop
    data() {
      return {
        images: this.images_list
      }
    },
    methods: {
      handleImageUpload(event) {
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.images.push({ url: e.target.result });
            this.$emit('imageUploaded', this.images);
          };
          reader.readAsDataURL(files[i]);
        }
        event.target.value = '';
      },
      removeImage(index) {
        this.images.splice(index, 1);
        this.$emit('imageUploaded', this.images);
      }
    }
  }
  </script>
  
  <style scoped>
  .image-upload-container {
    max-width: 700px;
    margin: 0 auto;
    width: 100%; /* Ensure the container takes up 100% of its parent's width */
  }
  
  .upload-btn {
    width: 100%; /* Make the upload button occupy 100% of the component's width */
    cursor: pointer;
    padding: 10px; /* Optional: Add some padding for better visual appearance */
    margin-bottom: 20px; /* Optional: Add some space between the upload button and the images */
  }
  
  .title {
    margin-bottom: 10px; /* Optional: Add some space between the title and the upload button */
  }	
  .uploaded-images {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 10px;
    margin-top: 20px;
  }
  
  .image-container {
    position: relative;
    width: 100%;
    padding-top: 100%; /* This maintains the aspect ratio */
    overflow: hidden;
  }
  
  .uploaded-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
  
  .delete-btn {
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: #218838; /* Placeholder green color, replace with the exact color from the image */
    color: white;
    border: none;
    border-radius: 4px;
    padding: 5px;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .delete-btn:hover {
    background-color: #1e7a34; /* Darker shade for hover effect, adjust based on the exact color from the image */
  }
  </style>
  