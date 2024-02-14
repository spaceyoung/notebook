<template>
  <div class="book-platform mb-12">
    <span class="book-caption mb-3">
      <v-icon icon="mdi-book-edit-outline" class="mr-2" />플랫폼
    </span>
    <v-chip-group v-model="book.platform" class="pa-0" mandatory>
      <v-chip v-for="platform in state.platforms" :value="platform" class="ma-0 px-6" variant="outlined" size="large">{{
        platform
      }}</v-chip>
    </v-chip-group>
  </div>
</template>

<script setup>
defineProps({
  state: { type: Object, required: true },
  book: { type: Object, required: true }
});
</script>

<style></style>