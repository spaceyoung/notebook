<template>
  <v-form
    ref="readingModifyForm"
    class="view d-flex flex-column px-0 py-3 px-sm-8 px-lg-15 py-lg-5"
    flat
  >
    <FormContentsLayout :book="myReadingItem" />
    <FormButtons
      :deleteRecord="deleteRecord"
      :cancelRecord="cancelRecord"
      :modifyRecord="modifyRecord"
    />
    <CloseButton :cancelRecord="cancelRecord" />
  </v-form>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useRecordStore } from '@/stores/record';

import FormContentsLayout from '@/layouts/FormContentsLayout.vue';
import FormButtons from '@/components/form/button/FormButtons.vue';
import CloseButton from '@/components/form/button/CloseButton.vue';

const readingModifyForm = ref(false);
const deleteModal = ref(false);

const currentRoute = useRoute();
const router = useRouter();
const id = currentRoute.params.id;

const recordStore = useRecordStore();
const { updateMyReading, deleteMyReading, addMyReadingEnd } = recordStore;
const myReadingList = computed(() => recordStore.myReadingList);
const myReadingItem = myReadingList.value.find(myReadingItem => myReadingItem.isbn === id);

// 파이어베이스 DB에 저장된 timeStamp 형식 변환
myReadingItem.readingStartDate = new Date(myReadingItem.readingStartDate.seconds * 1000);

// 삭제하기
const deleteRecord = () => {
  deleteModal.value = false;
  deleteMyReading(myReadingItem.id);
  router.push({ name: 'home' });
};

// 취소하기
const cancelRecord = () => { router.back(); };

// 수정하기
const modifyRecord = async () => {
  const { valid } = await readingModifyForm.value.validate();
  if (valid && myReadingItem.platform && myReadingItem.readingState) {
    // 독서 상태가 '독서 중'이면 myReading 업데이트
    if (myReadingItem.readingState === '독서 중') {
      updateMyReading(myReadingItem.id, myReadingItem);
    }
    // 독서 상태가 '독서 완료'면 myReadingEnd에 저장
    else if (myReadingItem.readingState === '독서 완료') {
      addMyReadingEnd(myReadingItem);
      deleteMyReading(myReadingItem.id);
    }
    router.push({ name: 'home' });
  }
  else alert ('기록에 필요한 정보를 정확하게 입력해주세요😢');
};
</script>

<style scoped>
</style>