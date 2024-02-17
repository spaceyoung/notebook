<template>
  <div class="sec-header">
    <h2 class="sec-title mb-4">나의 기록</h2>
  </div>
  <v-tabs v-model="state.selectTab" class="flex-0-0">
    <v-tab v-for="tab in state.tabs" :key="tab.id" :value="tab.id" class="emphasis">{{ tab.label }}</v-tab>
  </v-tabs>
  <keep-alive>
    <component :is="state.selectTab === 'MyReading' ? MyReading : MyReadingEnd" />
  </keep-alive>
</template>

<script setup>
import { reactive } from 'vue';
import MyReading from '@/components/tab/MyReading.vue';
import MyReadingEnd from '@/components/tab/MyReadingEnd.vue';

const state = reactive({
  tabs: [
    { id: 'MyReading', label: '독서 중' },
    { id: 'MyReadingEnd', label: '독서 완료' }
  ],
  selectTab: 'MyReading',
});
</script>

<style scoped>
.v-tabs .v-btn {
  width: 50%;
  font-family: LeeSeoyun, Roboto, "돋움", dotum, AppleGothic, sans-serif;
  color: #999;
  background-color: transparent;
}
.v-tabs .v-btn:hover {
  color: #fff;
  background: transparent url(@/assets/tab_bg_active.png) no-repeat center;
  background-size: contain;
}
.v-tabs .v-btn.v-tab--selected {
  color: #fff;
  background-image: url(@/assets/tab_bg_active.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
.v-tabs .v-btn::v-deep .v-btn__content {
  font-size: 1.9em;
}

/******************************
      max-width: 599px;
******************************/
@media all and (max-width: 599px) {
  .v-tabs .v-btn::v-deep .v-btn__content {
    font-size: 1.7em;
  }
}
</style>