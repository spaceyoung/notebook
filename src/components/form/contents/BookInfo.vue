<template>
  <v-card class="d-flex flex-column flex-sm-row mb-12" flat>
    <!-- 도서 표지 -->
    <v-img
      :src="book.cover"
      :alt="book.title"
      class="flex-0-0 mr-sm-12 mr-lg-15 mb-8 mb-sm-0"
      cover
    />
    <div class="d-flex flex-1-1 flex-column">
      <!-- 도서 제목 -->
      <v-card-item class="mb-2 pa-0">
        <v-card-title class="mb-1">{{ book.title }}</v-card-title>
      </v-card-item>
      <!-- 도서 기본정보(작가명, 출판사, 출판일) -->
      <v-card-text class="mb-7 pa-0">
        <span class="d-block">{{ book.author }}</span>
        <span>{{ book.publisher }}</span>
        <span>{{ book.pubDate }}</span>
      </v-card-text>
      <!-- 도서 상세정보(페이지수, ISBN) -->
      <v-card-text class="pa-0">
        <span class="d-block">
          <em class="mr-3">페이지수</em>{{ book.page }}쪽
        </span>
        <span class="d-block">
          <em class="mr-3">ISBN</em>{{ book.isbn }}
        </span>
      </v-card-text>
    </div>
  </v-card>
</template>

<script setup>
defineProps({
  book: { type: Object, required: true },
});
</script>

<style scoped>
.v-card {
  align-items: center;
  width: auto;
  background-color: transparent;
}
.v-card .v-card-title {
  font-size: 1.3em;
}

/******************************
      max-width: 959px;
******************************/
@media all and (max-width: 959px) {
  .v-card .v-card-title {
    font-size: 1.25em;
  }
}

/******************************
      max-width: 599px;
******************************/
@media all and (max-width: 599px) {
  .v-card {
    text-align: center;
  }
  .v-card span {
    font-size: 1.15em;
  }
  .v-card .v-img {
    width: 147px;
    height: 200px;
  }
}
</style>