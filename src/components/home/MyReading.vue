<template>
  <Loading v-if="isLoading" />
  <div v-else class="my-reading contents-wrap">
    <div v-if="myReadingList.length === 0" class="book-none">
      <p><span>읽은 책을 추가해서</span>나만의 독서 기록을 만들어봐요😉</p>
    </div>
    <v-list v-else class="book-list px-0 py-8 pa-sm-8">
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
              <span class="book-reading-start mb-2"><em class="mr-2">독서 시작</em>{{ myReadingItem.formattedStartDate
              }}</span>
              <v-progress-linear :model-value="myReadingProgress(myReadingItem)" class="book-progress-bar mb-1"
                :height="9" color="#ca4f34" rounded />
              <span class="book-progress-percent">{{ myReadingProgress(myReadingItem) }}</span>
            </div>
            <v-overlay :model-value="isHovering" class="modify-overlay" scrim="#8c6542" contained>
              <router-link :to="{ name: 'modify/id', params: { id: myReadingItem.isbn } }">
                <v-btn class="modify-overlay-button" size="large">수정하기</v-btn>
              </router-link>
            </v-overlay>
          </div>
        </v-card>
      </v-hover>
    </v-list>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useNotebookStore } from '@/stores/index';
import Loading from '@/components/contents/Loading.vue';
const { vuefireMyReading, myReadingProgress } = useNotebookStore();
const isLoading = computed(() => useNotebookStore().isLoading);
const myReadingList = computed(() => useNotebookStore().myReadingList);
vuefireMyReading();
</script>

<style></style>