<template>
  <template v-for="searchBookListGroup in searchBookList">
    <v-card
      v-for="searchBookItem in searchBookListGroup"
      :key="searchBookItem.isbn"
      class="d-flex pa-1 pa-sm-3"
      flat
    >
      <!-- 도서 표지 -->
      <v-img
        :src="searchBookItem.cover"
        :alt="searchBookItem.title"
        class="flex-0-0 mr-6 mr-sm-8"
        cover
      />
      <div class="d-flex flex-1-1 flex-column py-1 py-sm-2">
        <!-- 도서 제목 -->
        <v-card-item class="mb-1 pa-0">
          <v-card-title>{{ searchBookItem.title }}</v-card-title>
        </v-card-item>
        <!-- 도서 기본정보(작가명, 출판사, 출판일) -->
        <v-card-text class="pa-0">
          <span>{{ searchBookItem.author }}</span>
          <span>{{ searchBookItem.publisher }}</span>
          <span>{{ searchBookItem.pubDate }}</span>
        </v-card-text>
        <!-- 기록하기 버튼 -->
        <v-card-actions class="align-self-end pa-0">
          <v-btn
            class="px-4"
            variant="tonal"
            size="large"
            color="#ca4f34"
            @click="router.push({ name: 'record/id', params: { id: searchBookItem.isbn } })"
          >
            기록하기
          </v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </template>
</template>

<script setup>
import { useRouter } from 'vue-router';

defineProps({
  searchBookList: { type: Array, required: true },
});

const router = useRouter();
</script>

<style scoped>
.v-card-text span:first-child {
  display: -webkit-box;
  white-space: normal;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.v-card-actions .v-btn::v-deep span {
  font-size: 1.05em;
  color: inherit;
}

/******************************
      max-width: 599px;
******************************/
@media all and (max-width: 599px) {
  .v-card-text span:first-child {
    display: block;
    white-space: nowrap;
  }
  .v-card-actions .v-btn {
    height: 40px;
  }
}
</style>