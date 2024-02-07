<template>
  <v-col class="search" cols="12" lg="3">
    <div class="inner mx-auto">
      <div class="sec-header mb-10">
        <h2 class="sec-title mb-5">
          <router-link :to="{ name: 'home' }">공책</router-link>
        </h2>
        <h3 class="sec-sub-title">Note, Book</h3>
        <span class="sec-desc"><em>책</em>으로 <em>기록</em>하는 <em>공간</em></span>
      </div>
      <v-form class="search-form">
        <v-select v-model="state.selectOption" :items="state.options" class="search-option text-black mb-5"
          variant="outlined" hide-details="auto" />
        <v-text-field v-model.trim="searchWord" class="search-input" label="어떤 책을 기록하시나요?" variant="outlined"
          append-inner-icon="mdi-magnify" clear-icon="mdi-close-circle-outline" clearable hide-details="auto"
          @keyup.enter="searchWordHandler" @click:append-inner="searchWordHandler" />
      </v-form>
    </div>
  </v-col>
</template>

<script setup>
// css stylesheet
import '@/assets/css/components/search.css';

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useNotebookStore } from '@/stores/index';

const searchWord = ref('');
const router = useRouter();
const { state, searchBook } = useNotebookStore();
const searchWordHandler = () => {
  router.push({ name: 'searchResult' });
  searchBook(searchWord.value);
  searchWord.value = '';
};
</script>

<style></style>