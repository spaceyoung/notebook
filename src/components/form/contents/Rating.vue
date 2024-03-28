<template>
  <div class="mb-12">
    <span class="d-flex align-center mb-3">
      <v-icon class="mr-2" icon="mdi-book-edit" />
      나의 평점
      <em class="ml-1">(선택)</em>
    </span>
    <v-rating
      v-model="book.rating"
      density="compact"
      active-color="#ca4f34"
      half-increments
      clearable
    />
  </div>
</template>

<script setup>
defineProps({
  book: { type: Object, required: true },
});
</script>

<style scoped>
.v-rating {
  color: #777;
}
</style>