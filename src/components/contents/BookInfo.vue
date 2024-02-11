<template>
  <!-- <div class="book-info">
    <slot name="bookInfo"></slot>
  </div> -->
  <div class="book-item mb-12" variant="flat">
    <v-img :src="book.cover" :alt="book.title" class="book-cover mr-sm-15 mb-8 mb-sm-0" cover></v-img>
    <div class="book-info">
      <v-card-item class="mb-2 pa-0">
        <v-card-title class="book-title">{{ book.title }}</v-card-title>
      </v-card-item>
      <v-card-text class="mb-7 pa-0">
        <span class="book-author">{{ book.author }}</span>
        <span class="book-publisher">{{ book.publisher }}</span>
        <span class="book-pubdate">{{ book.pubDate }}</span>
      </v-card-text>
      <v-card-text class="pa-0">
        <span class="book-page"><em class="mr-3">페이지수</em>{{ book.page }}쪽</span>
        <span class="book-isbn"><em class="mr-3">ISBN</em>{{ book.isbn }}</span>
      </v-card-text>
    </div>
  </div>
</template>

<script setup>
defineProps({
  book: { type: Object, required: true },
});
</script>

<style scoped>
.contents .book-item {
  align-items: center;
  width: auto;
}
.contents .book-info .book-title {
  font-size: 1.3em;
}

/********************
max-width: 599px
*********************/
@media all and (max-width: 599px) {
  .contents .book-item {
    flex-direction: column;
  }
  .contents .book-info {
    text-align: center;
  }
  .contents .book-info span {
    font-size: 1.15em;
  }
  .contents .book-cover {
    width: 147px;
    height: 200px;
  }
  .contents .book-info .book-title {
    margin-bottom: 5px;
    font-size: 1.25em;
  }
}
</style>