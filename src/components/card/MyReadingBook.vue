<template>
  <v-hover
    v-for="myReadingItem in myReadingList"
    v-slot="{ isHovering, props }"
    :key="myReadingItem.isbn"
  >
    <v-card
      v-bind="props"
      class="d-flex pa-1 pa-sm-3"
      flat
    >
      <!-- 도서 표지 -->
      <v-img
        :src="myReadingItem.cover"
        :alt="myReadingItem.title"
        class="flex-0-0 mr-6 mr-sm-8"
        cover
      />
      <div class="d-flex flex-1-1 flex-column py-1 py-sm-2">
        <!-- 도서 제목 -->
        <v-card-item class="mb-1 pa-0">
          <v-card-title>{{ myReadingItem.title }}</v-card-title>
        </v-card-item>
        <!-- 도서 기본정보(작가명, 출판사, 출판일) -->
        <v-card-text class="pa-0">
          <span class="d-block">{{ myReadingItem.author }}</span>
          <span>{{ myReadingItem.publisher }}</span>
          <span>{{ myReadingItem.pubDate }}</span>
        </v-card-text>
        <!-- 독서 시작일, 독서량 -->
        <v-card-text class="flex-0-0 pa-0">
          <span class="d-block mb-1 mb-sm-2">
            <em class="mr-2">독서 시작</em>{{ myReadingItem.formattedReadingStartDate }}
          </span>
          <v-progress-linear
            :model-value="myReadingProgress(myReadingItem)"
            :height="9"
            class="mb-0 mb-sm-1"
            color="#ca4f34"
            rounded
          />
          <span class="d-block pr-1">{{ myReadingProgress(myReadingItem) }}</span>
        </v-card-text>
      </div>
      <!-- 독서 기록 수정 오버레이 -->
      <v-overlay
        :model-value="isHovering"
        class="justify-center align-center"
        scrim="#8c6542"
        contained
      >
        <!-- 독서 기록 수정하기 버튼 -->
        <v-btn
          size="large"
          @click="router.push({ name: 'readingModify/id', params: { id: myReadingItem.isbn }})"
        >
          수정하기
        </v-btn>
      </v-overlay>
    </v-card>
  </v-hover>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useRecordStore } from '@/stores/record';

const router = useRouter();

const recordStore = useRecordStore();
const myReadingList = computed(() => recordStore.myReadingList);

// 독서량 progress bar
const myReadingProgress = myReadingItem => `${Math.round((myReadingItem.readingPage / myReadingItem.page) * 100)}%`;
</script>

<style scoped>
.v-progress-linear {
  border: 1px solid #333;
}
.v-progress-linear + span {
  font-size: 0.95em;
  text-align: right;
  color: #ca4f34;
}
.v-overlay .v-btn::v-deep:hover .v-btn__content {
  color: #ca4f34;
}
</style>