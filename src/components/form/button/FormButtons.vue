<template>
  <v-item-group class="d-flex flex-wrap justify-center">
    <!-- 삭제하기 버튼 -->
    <v-btn
      v-if="modifyTerm"
      class="ma-0 mr-sm-auto px-8"
      variant="outlined"
      size="large"
    >
      삭제하기
      <DeleteModal activator="parent" :deleteRecord="deleteRecord" />
    </v-btn>
    <!-- 취소하기 버튼 -->
    <v-btn
      class="ma-0 px-8"
      variant="outlined"
      size="large"
      @click="cancelRecord"
    >
      취소하기
    </v-btn>
    <!-- 수정하기 버튼 -->
    <v-btn
      v-if="modifyTerm"
      class="emphasis order-first order-sm-last ma-0 ml-sm-5 px-8"
      size="large"
      flat
      @click="modifyRecord"
    >
      수정하기
    </v-btn>
    <!-- 기록하기 버튼 -->
    <v-btn
      v-else
      class="emphasis ma-0 ml-sm-5 px-8"
      size="large"
      flat
      @click="addRecord"
    >
      기록하기
      <NonLoginModal v-if="!currentUser" activator="parent" />
    </v-btn>
  </v-item-group>
</template>

<script setup>
import { useRoute } from 'vue-router';
import DeleteModal from '@/components/modal/DeleteModal.vue';
import NonLoginModal from '@/components/modal/NonLoginModal.vue';

defineProps({
  deleteRecord: { type: Function, required: false },
  cancelRecord: { type: Function, required: true },
  modifyRecord: { type: Function, required: false },
  addRecord: { type: Function, required: false },
  currentUser: { type: Object, required: false },
});

const currentRoute = useRoute();

// 수정하기 버튼 렌더링 조건
const modifyTerm = currentRoute.name === 'readingModify/id' || currentRoute.name === 'readingEndModify/id';
</script>

<style scoped>
/******************************
      max-width: 599px;
******************************/
@media all and (max-width: 599px) {
  .v-item-group {
    gap: 15px 20px;
  }
  .v-item-group .v-btn {
    width: calc((100% - 20px) / 2);
  }
  .v-item-group .v-btn:last-child {
    width: 100%;
  }
}
</style>