<template>
  <v-form
    ref="recordForm"
    class="view d-flex flex-column px-0 py-10 px-sm-8 px-lg-15 py-lg-5"
    flat
  >
    <FormContentsLayout :book="recordBook"/>
    <FormButtons
      :cancelRecord="cancelRecord"
      :addRecord="addRecord"
      :currentUser="currentUser"
    />
    <CloseButton :cancelRecord="cancelRecord" />
  </v-form>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMemberStore } from '@/stores/member';
import { useSearchStore } from '@/stores/search';
import { useRecordStore } from '@/stores/record';

import FormContentsLayout from '@/layouts/FormContentsLayout.vue';
import FormButtons from '@/components/form/button/FormButtons.vue';
import CloseButton from '@/components/form/button/CloseButton.vue';

const recordForm = ref(false);
const selectBook = ref(null);

const currentRoute = useRoute();
const router = useRouter();
const id = currentRoute.params.id;

const memberStore = useMemberStore();
const searchStore = useSearchStore();
const recordStore = useRecordStore();
const { state, addMyReading, addMyReadingEnd } = recordStore;
const currentUser = computed(() => memberStore.currentUser);
const searchBookList = computed(() => searchStore.searchBookList);

// 기록할 도서 정보 처리
searchBookList.value.forEach(searchBookListGroup => {
  selectBook.value = searchBookListGroup.find(searchBookItem => searchBookItem.isbn === id);
});
const recordBook = ref({ ...selectBook.value, ...state.recordBookDefaultInfo });

// 취소하기
const cancelRecord = () => { router.back(); };

// 기록하기
const addRecord = async () => {
  const { valid } = await recordForm.value.validate();
  if (valid && recordBook.value.platform && recordBook.value.readingState) {
    if (recordBook.value.readingState === '독서 중') addMyReading(recordBook.value);
    else if (recordBook.value.readingState === '독서 완료') addMyReadingEnd(recordBook.value);
    router.push({ name: 'home' });
  }
  else alert('기록에 필요한 정보를 정확하게 입력해주세요😢');
};
</script>

<style scoped>
.v-form::v-deep v-item-groups {
  justify-content: center;
}

/******************************
      max-width: 599px;
******************************/
@media all and (max-width: 599px) {
  .v-form::v-deep v-item-groups .v-btn {
    width: calc((100% - 20px) / 2);
  }
}
</style>