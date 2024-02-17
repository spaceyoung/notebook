<template>
  <v-hover v-for="myReadingEndItem in myReadingEndList" :key="myReadingEndItem.isbn" v-slot="{ isHovering, props }">
    <v-card v-bind="props" class="book-item d-flex pa-1 pa-sm-3" flat>
      <v-img :src="myReadingEndItem.cover" :alt="myReadingEndItem.title" class="book-cover flex-0-0 mr-6 mr-sm-8" cover />
      <div class="book-info d-flex flex-1-1 flex-column py-1 py-sm-2">
        <v-card-item class="mb-1 pa-0">
          <v-card-title class="book-title">{{ myReadingEndItem.title }}</v-card-title>
        </v-card-item>
        <v-card-text class="pa-0">
          <span class="book-author d-block">{{ myReadingEndItem.author }}</span>
          <span class="book-publisher">{{ myReadingEndItem.publisher }}</span>
          <span class="book-pubdate">{{ myReadingEndItem.pubDate }}</span>
        </v-card-text>
        <v-card-text class="book-progress flex-0-0 pa-0">
          <span class="book-reading-start d-block">
            <em class="mr-2">독서 시작</em>{{ myReadingEndItem.formattedReadingStartDate}}
          </span>
          <span class="book-reading-end d-block">
            <em class="mr-2">독서 완료</em>{{ myReadingEndItem.formattedReadingEndDate }}
          </span>
        </v-card-text>
      </div>
      <v-overlay :model-value="isHovering" class="modify-overlay justify-center align-center" scrim="#8c6542" contained>
        <router-link :to="{ name: 'endmodify/id', params: { id: myReadingEndItem.isbn } }">
          <v-btn class="modify-overlay-button" size="large">수정하기</v-btn>
        </router-link>
      </v-overlay>
    </v-card>
  </v-hover>
</template>

<script setup>
import { computed } from 'vue';
import { useRecordStore } from '@/stores/record';

const myReadingEndList = computed(() => useRecordStore().myReadingEndList);
</script>

<style scoped>
.v-overlay .v-btn:hover {
  background-color: #ca4f34;
}
.v-overlay .v-btn:hover::v-deep .v-btn__content {
  color: #fff;
}
</style>