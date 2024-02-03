<template>
  <div class="sec-header">
    <h2 class="sec-title mb-4">나의 기록</h2>
  </div>
  <v-tabs v-model="state.selectTab" class="reading-tabs flex-0-0" grow>
    <v-tab v-for="tab in state.tabs" :key="tab.id" :value="tab.id">{{ tab.label }}</v-tab>
  </v-tabs>
  <keep-alive>
    <component :is="state.selectTab === 'MyReading' ? MyReading : MyReadingEnd"></component>
  </keep-alive>
</template>

<script setup>
import { useNotebookStore } from '@/stores/index';
import MyReading from '@/components/home/MyReading.vue';
import MyReadingEnd from '@/components/home/MyReadingEnd.vue';
const { state } = useNotebookStore();
</script>

<style>
.reading-tabs .v-btn {
  font-family: LeeSeoyun, Roboto, "돋움", dotum, AppleGothic, sans-serif;
  letter-spacing: -1px;
  color: #999;
}
.reading-tabs .v-btn:hover {
  color: #fff;
  background: transparent url(@/assets/tab_bg_active.png) no-repeat center;
}
.reading-tabs .v-btn.v-tab--selected {
  color: #fff;
  background-image: url(@/assets/tab_bg_active.png);
  background-repeat: no-repeat;
  background-position: center;
}
.reading-tabs .v-btn .v-btn__content {
  font-size: 1.9em;
}

/********************
max-width: 599px
*********************/
@media all and (max-width: 599px) {
  .reading-tabs .v-btn__content {
    font-size: 1.7em;
  }
}
</style>