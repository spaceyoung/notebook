<template>
  <div class="book-buttons d-flex">
    <v-btn v-if="modifyTerm" class="delete-button ma-0 mr-sm-auto px-8" variant="outlined" size="large">
      삭제하기
      <DeleteModal activator="parent" :deleteRecord="deleteRecord" />
    </v-btn>
    <v-btn class="cancel-button ma-0 px-8" variant="outlined" size="large" @click="cancelRecord">취소하기</v-btn>
    <v-btn v-if="modifyTerm" class="modify-button ma-0 ml-sm-5 px-8" variant="outlined" size="large"
      @click="modifyRecord">수정하기</v-btn>
    <v-btn v-else class="record-button ma-0 ml-sm-5 px-8" variant="outlined" size="large" @click="addRecord">기록하기</v-btn>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import DeleteModal from '@/components/modal/DeleteModal.vue';

defineProps({
  deleteRecord: { type: Function, required: false },
  cancelRecord: { type: Function, required: true },
  modifyRecord: { type: Function, required: false },
  addRecord: { type: Function, required: false },
});

const currentRoute = useRoute();
const modifyTerm = currentRoute.name === 'modify/id' || currentRoute.name === 'endmodify/id';
</script>

<style scoped>
.modify .book-buttons {
  flex-wrap: wrap;
}
</style>