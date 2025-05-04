<template>
  <div
    class="review__card"
    :style="{
      backgroundColor: background,
      border: background ? 'none' : '1px solid var(--bistre)',
    }"
  >
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_70_103)">
        <path
          d="M0.5 12.0001V22.2858H10.7857V12.0001H3.9286C3.9286 8.21914 7.00478 5.14295 10.7857 5.14295V1.71436C5.11384 1.71436 0.5 6.32819 0.5 12.0001Z"
          fill="#3A4F39"
        />
        <path
          d="M24.5001 5.14295V1.71436C18.8282 1.71436 14.2144 6.32819 14.2144 12.0001V22.2858H24.5001V12.0001H17.643C17.643 8.21914 20.7191 5.14295 24.5001 5.14295Z"
          fill="#3A4F39"
        />
      </g>
      <defs>
        <clipPath id="clip0_70_103">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0.5)"
          />
        </clipPath>
      </defs>
    </svg>
    <p>{{ quote }}</p>
    <div>- {{ name }}</div>
  </div>
</template>

<script>
export default {
  name: "ReviewCard",
  components: {},
  props: {
    background: String,
    quote: String,
    name: String,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
.review__card {
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  text-align: center;
  max-width: 450px;
  min-width: 320px;
  gap: 16px;
  height: 250px;
}

.review__card p {
    font-size: 16px;
}

.review__card div {
    font-size: 16px;
    font-weight: 500;
}

@media (min-width:1200px) {
    .review__card {
        padding: 40px 40px;

    }
}
</style>
