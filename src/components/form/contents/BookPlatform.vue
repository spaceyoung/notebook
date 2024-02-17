<template>
  <div class="mb-12">
    <span class="d-flex align-center mb-3">
      <v-icon icon="mdi-book-edit-outline" class="mr-2" />플랫폼
    </span>
    <v-chip-group v-model="book.platform" class="pa-0" mandatory>
      <v-chip v-for="platform in platforms" :value="platform" class="ma-0 px-6" variant="outlined" size="large">{{ platform }}</v-chip>
    </v-chip-group>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  book: { type: Object, required: true }
});

const platforms = ref(['종이책', '전자책', '오디오북']);
</script>

<style scoped>
</style>