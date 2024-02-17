<template>
  <v-card class="d-flex justify-center align-center mx-n4 my-n8 ma-sm-n8" flat>
    <div>
      <Vue3Lottie :animationData="LoadingAnimation" loop autoplay />
      <span class="d-block">불러오는 중...</span>
    </div>
  </v-card>
</template>

<script setup>
import { Vue3Lottie } from 'vue3-lottie';
import LoadingAnimation from '@/assets/loading.json';
</script>

<style scoped>
.v-card {
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, .8);
  position: absolute;
  z-index: 100;
}
.v-card span {
  font-size: 1.8em;
  font-family: LeeSeoyun, Roboto, "돋움", dotum, AppleGothic, sans-serif;
  text-align: center;
  color: #333;
}
</style>