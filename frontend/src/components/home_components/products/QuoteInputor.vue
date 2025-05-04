<template>
  <div class="content">
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
        <p class="question-one">ARE THERE ANY QUOTES YOU LIKE?</p>
        <p class="question-two">OR, THE QUOTE WILL BE CHOSEN BASED ON YOUR THEME </p>
        <input type="text" @input="handleSelection">
        <button class="actionButton" @click="next">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: "QuoteInputor",
    props: {
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
          quote: ""
        };
    },
    mounted(){
      window.CI360.init();
    },
    methods:{
      next() {
        this.$emit('next', "nextProduct");
      },
      handleSelection(event){
        this.quote = event.target.value;
        this.$emit('updateSelection', this.quote);
      }
    }
}
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
.content{
  position: relative;
  overflow: hidden;
}
.content-top{
  position: absolute;
  left: 51.1667vw;
  top: 8.6667vw;
  font-size: 3.75vw;
  font-family: Glacial Indifference, Glacial Indifference-Bold;
  font-weight: 700;
  text-align: left;
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
.question-one{
  font-size: 1.8333vw;
  font-family: Glacial Indifference, Glacial Indifference-Regular;
  font-weight: 400;
  text-align: left;
  color: #514f4c;
  margin-top: 15.3333vw;
  margin-left: 5.5833vw;

}
.question-two{
  margin-top: 1vw;
  margin-left: 5.5833vw;
  font-size: 1.25vw;
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
    text-align: center;
    position: relative;
    width: 140%;
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
  .question-one{
    margin-top: 102.474vw;
    margin-left: 10.2865vw;
    font-size: 4.8177vw;
    line-height: 6.3802vw;
  }
  .question-two{
    margin-top: 2.2135vw;
    /* margin-left: 10.2865vw; */
    font-size: 2.9948vw;
  }
  .content-right input{
    width: 76.1719vw;
    height: 10.4167vw;
    margin-top: 4.2969vw;
    margin-left: 11.0677vw;
    font-size: 8.4635vw;
    padding-left: 2.6042vw;
  }
  .actionButton {
    margin-top: 7.5521vw;
    margin-left: 10.2865vw;
    border-radius: 4.1016vw;
    width: 32.5521vw;
    height: 8.2031vw;
    font-size: 4.8177vw;
  }
}
</style>