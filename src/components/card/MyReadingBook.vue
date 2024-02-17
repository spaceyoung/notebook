<template>
  <v-hover v-for="myReadingItem in myReadingList" :key="myReadingItem.isbn" v-slot="{ isHovering, props }">
    <v-card v-bind="props" class="d-flex pa-1 pa-sm-3" flat>
      <v-img :src="myReadingItem.cover" :alt="myReadingItem.title" class="flex-0-0 mr-6 mr-sm-8" cover />
      <div class="d-flex flex-1-1 flex-column py-1 py-sm-2">
        <v-card-item class="mb-1 pa-0">
          <v-card-title>{{ myReadingItem.title }}</v-card-title>
        </v-card-item>
        <v-card-text class="pa-0">
          <span class="d-block">{{ myReadingItem.author }}</span>
          <span>{{ myReadingItem.publisher }}</span>
          <span>{{ myReadingItem.pubDate }}</span>
        </v-card-text>
        <v-card-text class="flex-0-0 pa-0">
          <span class="d-block mb-1 mb-sm-2">
            <em class="mr-2">독서 시작</em>{{ myReadingItem.formattedReadingStartDate }}
          </span>
          <v-progress-linear :model-value="myReadingProgress(myReadingItem)" class="mb-0 mb-sm-1"
            :height="9" color="#ca4f34" rounded />
          <span class="d-block pr-1">{{ myReadingProgress(myReadingItem) }}</span>
        </v-card-text>
      </div>
      <v-overlay :model-value="isHovering" class="justify-center align-center" scrim="#8c6542" contained>
        <router-link :to="{ name: 'modify/id', params: { id: myReadingItem.isbn } }">
          <v-btn size="large">수정하기</v-btn>
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

<style scoped>
.v-progress-linear {
  border: 1px solid #333;
}
.v-progress-linear + span {
  font-size: .95em;
  text-align: right;
  color: #ca4f34;
}
.v-overlay .v-btn:hover {
  background-color: #ca4f34;
}
.v-overlay .v-btn:hover::v-deep .v-btn__content {
  color: #fff;
}
</style>