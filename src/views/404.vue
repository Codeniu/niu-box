<template>
  <div class="container">
    <a href="" @click="toHome">To Home ></a>
    <img :src="svgImage" />
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import svgImage from '@/assets/404.svg'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const toHome = () => {
      router.push('./home')
    }
    return {
      toHome,
      svgImage,
    }
  },
}
</script>

<style>
.container {
  margin: 0;
  padding: 0;
  display: grid;
  place-items: center;
}

.container img {
  height: 96vh;
}
</style>
