<template>
  <div class="sub-heading" :style="{ 
    backgroundColor: bgc
  }">
    <!-- <h2>{{ heading }}</h2> -->
    <p>{{ subHeading }}</p>
  </div>
</template>

<script>
export default {
  name: "SubHeader",
  props: {
    heading: String,
    subHeading: String,
    bgc: {
      type: String,
      default: "var(--dim-blue)",
    },
  },
};
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.sub-heading {
  background-color: var(--dim-blue);
  color: white;
  height: 5vmin;
  display: grid;
  place-content: center;
  text-align: center;
  margin-bottom: 4.5572vmin;
}

.sub-heading p {
  font-size: 3.4635vmin;
  color: white;
}
</style>