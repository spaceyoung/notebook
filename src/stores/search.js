import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { defineStore } from 'pinia';

export const useSearchStore = defineStore('search', () => {
  const ttbKey = import.meta.env.VITE_ALADIN_APP_KEY;
  const baseURL = `/api/ItemSearch.aspx?ttbkey=${ttbKey}&MaxResults=40&SearchTarget=Book&output=JS&Cover=Big&Version=20131101&Querytype=`;
  const detailBaseURL = `/api/ItemLookUp.aspx?ttbkey=${ttbKey}&itemIdType=ISBN13&output=JS&Cover=Big&Version=20131101&ItemId=`;

  const router = useRouter();

  const state = reactive({
    isLoading: false,
    options: ['제목으로 검색', '작가명으로 검색'],
    selectOption: '제목으로 검색',
    saveSearchWord: null, //사용자 입력 검색어 저장
    searchResults: [], // 1차 저장할 검색 결과
    searchBookList: [], // 사용자 화면에 표시할 최종 검색 도서 목록
  });
  const isLoading = computed(() => state.isLoading);
  const searchBookList = computed(() => state.searchBookList);

  // 도서 검색 및 결과 저장
  const searchBook = async (searchWord) => {
    state.isLoading = true;
    state.searchBookList = []; // 저장된 이전 목록 초기화
    try {
      await searchBookBase(searchWord);
      if (state.searchResults[0]) await searchBookDetail(state.searchResults[0]); // 검색 결과가 있는 경우만 상세정보 검색
    }
    catch (error) {
      alert(`도서 검색 중 서버 오류가 발생했습니다😥 다시 시도해주세요.`);
      await router.push({ name: 'home' });
      router.go(0);
    }
    state.isLoading = false;
  };

  // 더 보기 클릭 시 도서 상세정보 추가 검색 및 결과 저장
  const searchBookMore = async () => {
    try {
      if (state.searchBookList.length === 1 && state.searchResults.length >= 2) await searchBookDetail(state.searchResults[1]);
      else if (state.searchBookList.length === 2 && state.searchResults.length >= 3) await searchBookDetail(state.searchResults[2]);
      else if (state.searchBookList.length === 3 && state.searchResults.length >= 4) await searchBookDetail(state.searchResults[3]);
      else if (state.searchBookList.length === 4 && state.searchResults.length === 5) await searchBookDetail(state.searchResults[4]);
    }
    catch (error) {
      alert(`도서 검색 중 서버 오류가 발생했습니다😥 다시 시도해주세요.`);
      await router.push({ name: 'home' });
      router.go(0);
    }
  };

  // 도서 기본정보 검색
  const searchBookBase = async (searchWord) => {
    state.searchResults = []; // 저장된 이전 결과 초기화
    // 제목으로 검색
    if (state.selectOption === state.options[0]) {
      for (let startPage = 1; startPage <= 5; startPage++) {
        const response = await axios.get(baseURL + `Title&Query=${searchWord}&start=${startPage}`);
        const filterResponse = response.data.item.filter(item => item.isbn13); //isbn이 있는 도서 선별
        if (filterResponse.length > 0) state.searchResults.push(filterResponse);
        else break;
      }
    }
    // 작가명으로 검색
    else if (state.selectOption === state.options[1]) {
      for (let startPage = 1; startPage <= 5; startPage++) {
        const response = await axios.get(baseURL + `Author&Query=${searchWord}&start=${startPage}`);
        const filterResponse = response.data.item.filter(item => item.isbn13); //isbn이 있는 도서 선별
        if (filterResponse.length > 0) state.searchResults.push(filterResponse);
        else break;
      }
    }
  };

  // 도서 상세정보 검색 및 결과 저장
  const searchBookDetail = async (results) => {
    const searchBookListGroup = [];
    for (const result of results) {
      const detailResponse = await axios.get(detailBaseURL + result.isbn13);
      const detailResult = detailResponse.data.item[0];
      searchBookListGroup.push({
        title: detailResult.title,
        cover: detailResult.cover,
        author: detailResult.author,
        publisher: detailResult.publisher,
        pubDate: detailResult.pubDate,
        isbn: detailResult.isbn13,
        description: detailResult.description,
        page: detailResult.subInfo.itemPage,
      });
    }
    state.searchBookList.push(searchBookListGroup);
  };

  return {
    state,
    isLoading,
    searchBookList,
    searchBook,
    searchBookMore
  };
},
  {
    persist: true,
  }
);