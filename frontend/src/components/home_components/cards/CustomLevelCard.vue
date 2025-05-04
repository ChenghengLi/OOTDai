<template>
  <div class="content">
    <div class="content-top">
      {{ productName.toUpperCase()}}
    </div>
    <div class="content-center">
      <div class="content-left">
        <div class="image-container">
          <div
            class="cloudimage-360"
            id="gurkha-suv-a"
            :data-folder="'/assets/360_degree/'+productName+'/'"
            data-filename-x="{index}.jpg"
            :data-amount-x="showed_image_amount"
          ></div>
        </div>
      </div>
      <div class="content-right">
        <div class="selection" @click="setConfigurationType('simple')">
          <div class="img-div">
            <img src="@/assets/journey/selection.gif" >
          </div>
          <div class="explain-text">
            Leave it to our professionals
          </div>
          <div class="name-text">
            DESIGNER’S PICK
          </div>
        </div>
        <div class="selection" @click="setConfigurationType('custom')">
          <div class="img-div">
            <img src="@/assets/journey/selection.png" >
          </div>
          <div class="explain-text">
            Personalize yourself 
          </div>
          <div class="name-text">
            CREATIVE'S PICK
          </div>
        </div>
      </div>
    </div>
  </div>
  <main-footer />
</template>

<script>
export default {
    name: "CustomLevelCard",
    props: {
      setConfigurationType: {
        type: Function,
        required: true
      },
      productName: {
        type: String,
        required: true
      },
      showed_image_amount: {
        type: Number,
        required: true
      }
    },
    mounted() {
      window.CI360.init();
    },
    data() {
        return {
        };
    },
    components: {
      },
    methods:{
    }
}
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
img {
  width: 100%;
  height: 100%;
}
.content{
  position: relative;
  overflow: hidden;
}
.content-top{
  width: 36.8333vw;
  position: absolute;
  left: 51.1667vw;
  top: 8.6667vw;
  font-size: 3.75vw;
  font-family: Glacial Indifference, Glacial Indifference-Bold;
  font-weight: 700;
  text-align: center;
  color: #514f4c;
}
.content-center{
  height: 48.75vw;
}
.content-left, .content-right{
  float: left;
}
.content-right input{
  width: 27.3333vw;
  height: 3.75vw;
  margin-top: 1.4583vw;
  margin-left: 5.9167vw;
  font-size: 2.9167vw;
  padding-left: 0.8333vw;
}
.selection{
  cursor: pointer;
  width: 18.1667vw;
  height: 23.3333vw;
  float: left;
  margin-top: 17.25vw;
  margin-left: 5.5vw;
  text-align: center;
}
.selection .img-div{
  width: 16.6667vw;
  height: 15.8333vw;
  margin-left: 0.75vw;
}
.selection:nth-child(2) .img-div{
  width: 13.6221vw;
  margin-left: 2.225vw;
}
.selection .explain-text{
  display: inline-block;
  background: #f2f2f2;
  font-size: 1.25vw;
  font-family: Glacial Indifference, Glacial Indifference-Regular;
  font-weight: 700;
  color: #000000;
  line-height: 2.5vw;
  border-radius: 0.5833vw;
  margin-top: 1.6667vw;
  text-align: center;
  padding: 0 0.8333vw;
}
.selection .name-text{
  margin-top: 1.0833vw;
  font-size: 2.0833vw;
  font-family: Playfair Display, Playfair Display-Bold;
  font-weight: 700;
  text-align: left;
  color: #d0ccb9;
  line-height: 3.5vw;
}
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 37vw;
  height: 35.75vw;
  overflow: hidden;
  border-radius: 1.6667vw;
  margin-top: 7.1667vw;
  margin-left: 8.3333vw;
  float: left;
}
.actionButton {
  display: block;
  width: 12vw;
  height: 3vw;
  background: #cfc5b3;
  border-radius: 1.5vw;
  cursor: pointer;
  margin-top: 2.75vw;
  margin-left: 5.6667vw;
  font-size: 1.8333vw;
  font-family: Glacial Indifference, Glacial Indifference-Bold;
  font-weight: 700;
  text-align: center;
  color: #514f4c;
}
@media screen and (max-width: 768px) {
  .content-top{
    position: absolute;
    top: 12.3698vw;
    left: 50%;
    transform: translateX(-50%);
    font-size: 7.1615vw;
  }
  .content-center{
    height: 159.2448vw;
    overflow: hidden;
  }
  .content-left, .content-right{
    float: none;
    display: block;
  }
  .image-container{
    margin-top: 26.4323vw;
    margin-left: 15.2344vw;
    width: 68.3594vw;
    height: 66.0156vw;
  }
  .selection{
    width: 39.7135vw;
    height: 52.2135vw;
    margin-top: 4.0365vw;
  }
  .selection .img-div{
    width: 38.2813vw;
    height: 35.026vw;
  }
  .selection:nth-child(2) .img-div{
    width: 31.288vw;
    margin-left: 4vw;
  }
  .selection .explain-text{
    font-size: 2.6042vw;
    line-height: 5.2083vw;
    border-radius: 0.651vw;
    margin-top: 3.5156vw;
    padding: 0 1.3021vw;
  }
  .selection .name-text{
    margin-top: 2.2135vw;
    font-size: 4.5573vw;
    line-height: 7.8125vw;
  }
  .selection:nth-child(1){
    margin-left: 9.2448vw;
  }
  .selection:nth-child(2){
    margin-left: 3.4635vw;
  }
}
</style>