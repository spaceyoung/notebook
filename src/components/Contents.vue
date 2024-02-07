<template>
  <v-col class="contents px-4 py-8 pa-sm-8" cols="12" lg="9">
    <!-- <Loading v-if="isLoading" /> -->
    <router-view />
  </v-col>
</template>

<script setup>
// css stylesheet
import '@/assets/css/components/contents.css';

// import { useNotebookStore } from '@/stores/index';
// import Loading from '@/components/contents/Loading.vue';
// const isLoading = computed(() => useNotebookStore().isLoading);
</script>

<style></style>