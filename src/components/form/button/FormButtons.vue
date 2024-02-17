<template>
  <v-item-groups class="d-flex flex-wrap">
    <v-btn v-if="modifyTerm" class="ma-0 mr-sm-auto px-8" variant="outlined" size="large">
      삭제하기
      <DeleteModal activator="parent" :deleteRecord="deleteRecord" />
    </v-btn>
    <v-btn class="ma-0 px-8" variant="outlined" size="large" @click="cancelRecord">취소하기</v-btn>
    <v-btn v-if="modifyTerm" class="emphasis order-first order-sm-last ma-0 ml-sm-5 px-8" size="large"
      flat @click="modifyRecord">수정하기</v-btn>
    <v-btn v-else class="emphasis ma-0 ml-sm-5 px-8" size="large" flat @click="addRecord">기록하기</v-btn>
  </v-item-groups>
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
/******************************
      max-width: 599px;
******************************/
@media all and (max-width: 599px) {
  v-item-groups {
    gap: 15px 20px;
  }
  v-item-groups .v-btn {
    width: calc((100% - 20px) / 2);
  }
  v-item-groups .v-btn:last-child {
    width: 100%;
  }
}
</style>