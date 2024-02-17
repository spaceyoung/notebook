<template>
  <v-card v-for="searchBookItem in searchBookList" :key="searchBookItem.isbn" class="d-flex pa-1 pa-sm-3" flat>
    <v-img :src="searchBookItem.cover" :alt="searchBookItem.title" class="flex-0-0 mr-6 mr-sm-8" cover />
    <div class="d-flex flex-1-1 flex-column py-1 py-sm-2">
      <v-card-item class="mb-1 pa-0">
        <v-card-title>{{ searchBookItem.title }}</v-card-title>
      </v-card-item>
      <v-card-text class="pa-0">
        <span>{{ searchBookItem.author }}</span>
        <span>{{ searchBookItem.publisher }}</span>
        <span>{{ searchBookItem.pubDate }}</span>
      </v-card-text>
      <v-card-actions class="align-self-end pa-0">
        <router-link :to="{ name: 'record/id', params: { id: searchBookItem.isbn } }">
          <v-btn class="emphasis px-4" variant="outlined" size="large">기록하기</v-btn>
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

<style scoped>
.v-card-text span:first-child {
  display: -webkit-box;
  white-space: normal;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.v-card-actions .v-btn {
  font-size: .95em;
}
.v-card-actions .v-btn::v-deep .v-btn__content {
  color: #fff;
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