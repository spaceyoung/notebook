<template>
  <v-hover v-for="myReadingItem in myReadingList" :key="myReadingItem.isbn" v-slot="{ isHovering, props }">
    <v-card v-bind="props" class="book-item pa-1 pa-sm-3" variant="flat">
      <v-img :src="myReadingItem.cover" :alt="myReadingItem.title" class="book-cover mr-6 mr-sm-8" cover />
      <div class="book-info py-1 py-sm-2">
        <v-card-item class="mb-1 pa-0">
          <v-card-title class="book-title">{{ myReadingItem.title }}</v-card-title>
        </v-card-item>
        <v-card-text class="pa-0">
          <span class="book-author">{{ myReadingItem.author }}</span>
          <span class="book-publisher">{{ myReadingItem.publisher }}</span>
          <span class="book-pubdate">{{ myReadingItem.pubDate }}</span>
        </v-card-text>
        <div class="book-progress">
          <span class="book-reading-start mb-1 mb-sm-2"><em class="mr-2">독서 시작</em>{{
            myReadingItem.formattedReadingStartDate }}</span>
          <v-progress-linear :model-value="myReadingProgress(myReadingItem)" class="book-progress-bar mb-0 mb-sm-1"
            :height="9" color="#ca4f34" rounded />
          <span class="book-progress-percent">{{ myReadingProgress(myReadingItem) }}</span>
        </div>
      </div>
      <v-overlay :model-value="isHovering" class="modify-overlay" scrim="#8c6542" contained>
        <router-link :to="{ name: 'modify/id', params: { id: myReadingItem.isbn } }">
          <v-btn class="modify-overlay-button" size="large">수정하기</v-btn>
        </router-link>
      </v-overlay>
    </v-card>
  </v-hover>
</template>

<script setup>
import { computed } from 'vue';
import { useRecordStore } from '@/stores/record';

const myReadingList = computed(() => useRecordStore().myReadingList);
const myReadingProgress = (myReadingItem) => {
  return `${Math.round(myReadingItem.readingPage / myReadingItem.page * 100)}%`;
};
</script>

<style></style>