<template>
  <Loading v-if="isLoading" />
  <template v-else>
    <div class="sec-header mb-3">
      <h2 class="sec-title my-2"><span>'{{state.saveSearchWord}}'</span> 검색 결과 {{ searchResultsNumber() }}권</h2>
      <p class="sec-desc">최대 200권까지 검색할 수 있어요 🔎</p>
    </div>
    <div class="view d-flex flex-column">
      <v-sheet>
        <v-infinite-scroll mode="manual" @load="loadMore">
          <v-list v-if="state.searchResults.length > 0" class="d-flex flex-wrap px-0 py-8 pa-sm-8">
            <SearchResultBook :searchBookList="searchBookList" />
          </v-list>
          <!-- 검색 결과가 존재하지 않을 경우 -->
          <template v-if="state.searchResults.length === 0" v-slot:load-more="{ props }">
            <div v-bind="props" class="my-12">
              <p><span>검색 결과가 존재하지 않아요😢</span>다른 검색어로 입력해주세요.</p>
            </div>
          </template>
          <!-- 검색 결과 도서 목록이 한 페이지 이하일 경우 -->
          <template v-else-if="state.searchResults.length === 1" v-slot:load-more="{ props }">
            <p v-bind="props">마지막 검색 결과에 도달했어요 📕</p>
          </template>
          <!-- 검색 결과 도서 목록이 두 페이지 이상일 경우 -->
          <template v-else v-slot:load-more="{ props }">
            <v-btn v-bind="props" variant="tonal" size="large">검색 결과 더 보기</v-btn>
          </template>
          <template v-slot:loading>
            <v-progress-circular size="40" color="#ca4f34" indeterminate />
          </template>
          <template v-slot:empty>
            <p>마지막 검색 결과에 도달했어요 📕</p>
          </template>
        </v-infinite-scroll>
      </v-sheet>
    </div>
  </template>
</template>

<script setup>
import { computed } from 'vue';
import { useSearchStore } from '@/stores/search';
import Loading from '@/components/loading/Loading.vue';
import SearchResultBook from '@/components/card/SearchResultBook.vue';

const { state, searchBookMore } = useSearchStore();
const isLoading = computed(() => useSearchStore().isLoading);
const searchBookList = computed(() => useSearchStore().searchBookList);

const searchResultsNumber = () => {
  let sum = 0;
  state.searchResults.forEach(result => sum += result.length);
  return sum;
}

const loadMore = async ({ done }) => {
  await searchBookMore();
  if (searchBookList.value.length !== state.searchResults.length) done('ok');
  else done('empty');
};
</script>

<style scoped>
.sec-title {
  font-size: 1.6em;
  line-height: 1.3;
}
.sec-title span {
  color: #ca4f34;
}
.sec-desc {
  font-size: .9em;
  font-family: Pretendard, Roboto, "돋움", dotum, AppleGothic, sans-serif;
}
.v-infinite-scroll::-webkit-scrollbar {
  display: none;
}
.v-infinite-scroll::v-deep .v-infinite-scroll__side {
  padding: 0;
}
.v-infinite-scroll > div > div > p {
  font-size: 1.5em;
  font-family: LeeSeoyun, Roboto, "돋움", dotum, AppleGothic, sans-serif;
  text-align: center;
}

/******************************
      max-width: 599px;
******************************/
@media all and (max-width: 599px) {
  .v-infinite-scroll > div > div > p {
    font-size: 1.3em;
  }
}
</style>