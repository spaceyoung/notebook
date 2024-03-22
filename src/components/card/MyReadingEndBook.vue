<template>
  <v-hover v-for="myReadingEndItem in myReadingEndList" :key="myReadingEndItem.isbn" v-slot="{ isHovering, props }">
    <v-card v-bind="props" class="d-flex pa-1 pa-sm-3" flat>
      <v-img :src="myReadingEndItem.cover" :alt="myReadingEndItem.title" class="flex-0-0 mr-6 mr-sm-8" cover />
      <div class="d-flex flex-1-1 flex-column py-1 py-sm-2">
        <v-card-item class="mb-1 pa-0">
          <v-card-title>{{ myReadingEndItem.title }}</v-card-title>
        </v-card-item>
        <v-card-text class="pa-0">
          <span class="d-block">{{ myReadingEndItem.author }}</span>
          <span>{{ myReadingEndItem.publisher }}</span>
          <span>{{ myReadingEndItem.pubDate }}</span>
        </v-card-text>
        <v-card-text class="flex-0-0 pa-0">
          <span class="d-block">
            <em class="mr-2">독서 시작</em>{{ myReadingEndItem.formattedReadingStartDate }}
          </span>
          <span class="d-block">
            <em class="mr-2">독서 완료</em>{{ myReadingEndItem.formattedReadingEndDate }}
          </span>
        </v-card-text>
      </div>
      <v-overlay :model-value="isHovering" class="justify-center align-center" scrim="#8c6542" contained>
        <v-btn size="large" @click="router.push({ name: 'endmodify/id', params: { id: myReadingEndItem.isbn } })">수정하기</v-btn>
      </v-overlay>
    </v-card>
  </v-hover>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useRecordStore } from '@/stores/record';

const router = useRouter();
const myReadingEndList = computed(() => useRecordStore().myReadingEndList);
</script>

<style scoped>
</style>