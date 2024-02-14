<template>
  <v-card v-for="searchBookItem in searchBookList" :key="searchBookItem.isbn" class="book-item pa-1 pa-sm-3"
    variant="flat">
    <v-img :src="searchBookItem.cover" :alt="searchBookItem.title" class="book-cover mr-6 mr-sm-8" cover />
    <div class="book-info py-1 py-sm-2">
      <v-card-item class="mb-1 pa-0">
        <v-card-title class="book-title">{{ searchBookItem.title }}</v-card-title>
      </v-card-item>
      <v-card-text class="mb-auto pa-0">
        <span class="book-author">{{ searchBookItem.author }}</span>
        <span class="book-publisher">{{ searchBookItem.publisher }}</span>
        <span class="book-pubdate">{{ searchBookItem.pubDate }}</span>
      </v-card-text>
      <v-card-actions class="book-record-button pa-0">
        <router-link :to="{ name: 'record/id', params: { id: searchBookItem.isbn } }">
          <v-btn class="px-4" variant="outlined" size="large">기록하기</v-btn>
        </router-link>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script setup>
defineProps({
  searchBookList: { type: Array, required: true },
});
</script>

<style></style>