<template>
  <div class="image-selector-container">
    <!-- 大图预览区域 -->
    <div class="content-top">
      {{ name.toUpperCase() }}
    </div>
    <div class="content-center">
      <div class="content-left">
        <div class="image-container">
          <div
            class="cloudimage-360"
            id="gurkha-suv"
            :data-folder="'/assets/360_degree/'+name+'/'"
            data-filename-x="{index}.jpg"
            :data-amount-x="showed_image_amount"
            data-transformation="w=444&h=429&func=fit"
          ></div>
        </div>
      </div>
      <div class="content-right">
        <div class="main-preview-area">
          <div class="selected-preview">
            <template v-if="selectedImages.length > 0">
              <img 
                v-for="(img, index) in selectedImages" 
                :key="'preview-'+index"
                :src="img.url" 
                class="main-preview-image"
                @click="showFullscreen(img.url)"
              />
            </template>
            <div v-else class="empty-prompt">
              <span>Select at least one image</span>
            </div>
          </div>
        </div>

        <!-- 缩略图选择区域 -->
        <div class="thumbnail-selector">
          <!-- <h3 class="section-title">{{ title }}</h3> -->
          
          <div class="thumbnail-grid">
            <!-- 合并后的图片列表 -->
            <div 
              v-for="(image, index) in combinedList" 
              :key="index"
              class="thumbnail-item"
              :class="{ 'selected': isSelected(index) }"
              @click="toggleSelection(index)"
            >
              <img 
                :src="image.thumbnail || image.url" 
                class="thumbnail-image"
                @click.stop="showFullscreen(image.url)"
              />
              <!-- 选择指示器 -->
              <div class="selection-indicator">
                <div class="base-circle" :class="{ 'selected': isSelected(index) }"></div>
                <div class="checkmark" v-if="isSelected(index)">✓</div>
              </div>
            </div>

            <!-- 上传按钮 -->
            <div 
              v-if="uploadedImages.length < maxUpload" 
              class="thumbnail-item upload-card" 
              @click="triggerUpload"
            >
              <input 
                type="file" 
                ref="fileInput" 
                hidden 
                multiple 
                accept="image/*"
                @change="handleFileUpload"
              >
              <div class="upload-content">
                <span class="plus-icon">+</span>
                <span class="upload-text">upload image</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="button-container">
      <button class="actionButton" @click="cancel">Back</button>
      <button class="actionButton" @click="next">Next</button>

    </div>

    <!-- 全屏预览 -->
    <div v-if="fullscreenImage" class="fullscreen-preview" @click="fullscreenImage = null">
      <img :src="fullscreenImage" class="fullscreen-image" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageSelector',
  props: {
    title: {
      type: String,
      default: 'select images'
    },
    imageList: {
      type: Array,
      default: () => [],
      validator: list => Array.isArray(list) && list.every(i => !!i.url)
    },
    maxSelection: {
      type: Number,
      default: 3,
      validator: v => v >= 1
    },
    maxUpload: {
      type: Number,
      default: 4
    },
    name: {
      type: String,
      required: true
    },
    showed_image_amount: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      selectedIndices: [],
      uploadedImages: [],
      fullscreenImage: null
    };
  },
  mounted(){
      window.CI360.init();
  },
  computed: {
    combinedList() {
      return [...this.imageList, ...this.uploadedImages];
    },
    selectedImages() {
      return this.selectedIndices.map(i => this.combinedList[i]);
    }
  },
  methods: {
    toggleSelection(index) {
      const position = this.selectedIndices.indexOf(index);
      if (position === -1) {
        if (this.selectedIndices.length >= this.maxSelection) {
            alert(`You can select up to ${this.maxSelection} images`);
          return;
        }
        this.selectedIndices = [...this.selectedIndices, index];
      } else {
        this.selectedIndices = this.selectedIndices.filter(i => i !== index);
      }
      this.$emit('updateSelection', this.selectedIndices.map(i => this.combinedList[i]));
    },
    isSelected(index) {
      return this.selectedIndices.includes(index);
    },
    triggerUpload() {
      this.$refs.fileInput.click();
    },
    async handleFileUpload(event) {
      const files = Array.from(event.target.files || []);
      if (files.length + this.uploadedImages.length > this.maxUpload) {
        alert(`You can upload up to ${this.maxUpload} images`);
        event.target.value = '';
        return;
      }

      const uploads = await Promise.all(
        files.map(async file => {
          const thumbnail = await this.generateThumbnail(file);
          return {
            url: URL.createObjectURL(file),
            thumbnail,
            name: file.name
          };
        })
      );
      
      this.uploadedImages = [...this.uploadedImages, ...uploads];
      event.target.value = '';
    },
    generateThumbnail(file) {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = 200;
          canvas.height = 200;
          ctx.drawImage(img, 0, 0, 200, 200);
          resolve(canvas.toDataURL('image/jpeg'));
        };
        img.src = URL.createObjectURL(file);
      });
    },
    handleCancel() {
      this.selectedIndices = [];
      this.uploadedImages = [];
      this.$emit('cancel');
    },
    handleConfirm() {
      const selected = this.selectedImages.map(img => ({
        original: img.url,
        thumbnail: img.thumbnail
      }));
      this.$emit('confirm', selected);
    },
    showFullscreen(url) {
      this.fullscreenImage = url;
    },
    next() {
      this.$emit('next', "nextProduct");
    }
  }
};
</script>

<style scoped>
.image-container{
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  margin-top: 4.15vw;
  border-radius: 1.6667vw;
  width: 25vw;
  height: 25vw;
  overflow: hidden;
}
.content-top{
  margin-top: 5.5vw;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  height: 2.15vw;
  font-size: 2.75vw;
  font-family: BaskervilleDisplayPT, BaskervilleDisplayPT-Bold;
  font-weight: 700;
  text-align: center;
  color: #514f4c;
}
.image-selector-container {
  --primary-color: #2196f3;
  --spacing: 0.8vw;
  max-width: 60vw;
  margin: 0 auto;
  padding: var(--spacing);
}

.main-preview-area {
  margin-bottom: 0.1vw;
  border: 0.05vw solid #eee;
  border-radius: 0.4vw;
  overflow: hidden;
  background: #f8f9fa;
  min-height: 19vw;
}

.selected-preview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(7.5vw, 1fr));
  gap: 0.8vw;
  padding: 0.8vw;
}

.main-preview-image {
  width: 100%;
  height: 19vw;
  object-fit: contain;
  border-radius: 0.2vw;
  box-shadow: 0 0.1vw 0.4vw rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
  cursor: zoom-in;
}

.empty-prompt {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 19vw;
  color: #666;
  font-size: 1vw;
}


.section-title {
  margin: 0 0 1.2vw;
  color: #333;
  font-weight: 500;
}

.thumbnail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(4vw, 1fr));
  gap: 0.8vw;
  padding: 0.8vw;
  background: #fff;
  border-radius: 0.4vw;
}

.thumbnail-item {
  position: relative;
  aspect-ratio: 1;
  border: 0.1vw solid transparent;
  border-radius: 0.4vw;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #f8f9fa;
}

.thumbnail-item:hover {
  border-color: var(--primary-color);
  box-shadow: 0 0.1vw 0.4vw rgba(33, 150, 243, 0.2);
}

.thumbnail-item.selected {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 0.15vw rgba(33, 150, 243, 0.2);
}

.thumbnail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 选择指示器样式 */
.selection-indicator {
  position: absolute;
  top: 0.4vw;
  right: 0.4vw;
  width: 1vw;
  height: 1vw;
}

.base-circle {
  width: 100%;
  height: 100%;
  border: 0.1vw solid var(--primary-color);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.2s ease;
}

.base-circle.selected {
  background: var(--primary-color);
  border-color: var(--primary-color);
}

.checkmark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 0.7vw;
  pointer-events: none;
}

/* 上传按钮样式 */
.upload-card {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.1vw dashed #ccc;
  background: rgba(255,255,255,0.8);
}

.upload-card:hover {
  border-color: var(--primary-color);
  background: rgba(33, 150, 243, 0.05);
}

.upload-content {
  text-align: center;
  color: #666;
}

.plus-icon {
  font-size: 1.2vw;
  display: block;
  margin-bottom: 0.2vw;
  color: var(--primary-color);
}

/* 操作按钮 */
.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 0.8vw;
  margin-top: 1.6vw;
  padding-top: 1.6vw;
  border-top: 0.05vw solid #eee;
}

.btn {
  padding: 0.6vw, 1.2vw;
  border: none;
  border-radius: 0.3vw;
  font-size: 0.8vw;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn.primary {
  background: var(--primary-color);
  color: white;
}

.btn.primary:hover {
  background: #1976d2;
}

.btn.secondary {
  background: #f8f9fa;
  color: #666;
  border: 0.05vw solid #ddd;
}

.btn.secondary:hover {
  background: #f1f3f5;
}

/* 全屏预览 */
.fullscreen-preview {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.fullscreen-image {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
}
.content-center{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1vw;
}
.content-right{
  padding: 1vw;
  margin-top: 3.35vw;
}
.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 1vw;
}
.button-container > :first-child {
  transform: translateX(-100%);
}

.button-container > :last-child {
  transform: translateX(100%);
}
.actionButton {
  width: 8vw;
  height: 2.05vw;
  border-radius: 1.025vw;
  background: #cfc5b3;
  color: black;
  border: none;
  font-size: 1.4vw;
  font-family: Glacial Indifference, Glacial Indifference-Bold;
  font-weight: 700;
  text-align: center;
  cursor: pointer;
  margin-top: 1vw;
}
@media (max-width: 768px) {
  .image-selector-container{
    max-width: 80vw;
  }
  .content-left{
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .content-right{
    width: 80%;
  }
  .main-preview-image {
    height: 39vw;
  }
  .content-top{
    text-align: center;
    width: 140%;
    font-size: 7.1615vw;
  }
  .thumbnail-grid {
    grid-template-columns: repeat(auto-fill, minmax(21vw, 1fr));
  }
  .button-container {
    margin-top: 5.2292vw;
  }
  .button-container > :first-child {
    transform: translateX(50%);
  }

  .button-container > :last-child {
    transform: translateX(-50%);
  }
  .actionButton {
    width: 19.0104vw;
    height: 4.9479vw;
    border-radius: 2.474vw;
    font-size: 3.2552vw;
  }
  .content-center{
    grid-template-columns: 1fr;
    place-items: center; /* 水平和垂直居中 */
  }
  .image-container{
    margin-top: 11.9479vw;
    height: 67.7083vw;
    width: 67.7083vw;
  }
  .empty-prompt {
    font-size: 2.9479vw;
  }
  .selection-indicator{
    top: 1.0417vw;
    right: 1.0417vw;
    width: 10vw;
    height: 10vw;
  }
  .upload-text{
    font-size: 2.9479vw;
  }
  .plus-icon{
    font-size: 4vw;
  }
  .checkmark{
    font-size: 5vw;
  }
}
</style>