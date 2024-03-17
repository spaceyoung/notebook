import { reactive, computed } from "vue";
import axios from 'axios';
import { defineStore } from "pinia";

export const useSearchStore = defineStore("search", () => {
  const ttbKey = import.meta.env.VITE_ALADIN_APP_KEY;
  const baseURL = `/api/ItemSearch.aspx?ttbkey=${ttbKey}&MaxResults=50&SearchTarget=Book&output=JS&Cover=Big&Version=20131101&Querytype=`;
  const detailBaseURL = `/api/ItemLookUp.aspx?ttbkey=${ttbKey}&itemIdType=ISBN13&output=JS&Cover=Big&Version=20131101&ItemId=`;

  const state = reactive({
    isLoading: false,
    options: ['제목으로 검색', '작가명으로 검색'],
    selectOption: '제목으로 검색',
    saveSearchWord: '',
    searchBookList: [],
  });
  const isLoading = computed(() => state.isLoading);
  const searchBookList = computed(() => state.searchBookList);

  // 도서 검색 및 결과 저장
  const searchBook = async (searchWord) => {
    state.isLoading = true;
    state.searchBookList = [];
    const results = await searchBookBase(searchWord);
    await searchBookDetail(results);
    setTimeout(() => { state.isLoading = false; }, 1000);
  };

  // 더 보기 클릭 시 도서 추가 검색 및 결과 저장
  const searchBookMore = async (searchWord) => {
    const results = await searchBookMoreBase(searchWord);
    await searchBookDetail(results);
  }

  // 도서 기본정보 검색
  const searchBookBase = async (searchWord) => {
    const results = [];
    // 제목으로 검색
    if (state.selectOption === state.options[0]) {
      const response = await axios.get(baseURL + `Title&Query=${searchWord}&start=1`);
      results.push(response.data.item);
    }
    // 작가명으로 검색
    else if (state.selectOption === state.options[1]) {
      const response = await axios.get(baseURL + `Author&Query=${searchWord}&start=1`);
      results.push(response.data.item);
    };
    return results;
  };

  // 더 보기 클릭 시 도서 기본정보 추가 검색
  const searchBookMoreBase = async () => {
    const results = [];
    // 제목으로 검색
    if (state.selectOption === state.options[0]) {
      if (state.searchBookList.length === 50) {
        const response = await axios.get(baseURL + `Title&Query=${state.saveSearchWord}&start=2`);
        results.push(response.data.item);
      }
      else if (state.searchBookList.length === 100) {
        const response = await axios.get(baseURL + `Title&Query=${state.saveSearchWord}&start=3`);
        results.push(response.data.item);
      }
      else if (state.searchBookList.length === 150){
        const response = await axios.get(baseURL + `Title&Query=${state.saveSearchWord}&start=4`);
        results.push(response.data.item);
      }
    }
    // 작가명으로 검색
    else if (state.selectOption === state.options[1]) {
      if (state.searchBookList.length === 50) {
        const response = await axios.get(baseURL + `Author&Query=${state.saveSearchWord}&start=2`);
        results.push(response.data.item);
      }
      else if (state.searchBookList.length === 100) {
        const response = await axios.get(baseURL + `Author&Query=${state.saveSearchWord}&start=3`);
        results.push(response.data.item);
      }
      else if (state.searchBookList.length === 150){
        const response = await axios.get(baseURL + `Author&Query=${state.saveSearchWord}&start=4`);
        results.push(response.data.item);
      }
    };
    return results;
  }

  // 도서 상세정보 검색 및 결과 저장
  const searchBookDetail = async (results) => {
    try {
      for (const result of results) {
        for (const resultBook of result) {
          const detailResponse = await axios.get(detailBaseURL + resultBook.isbn13);
          const detailResult = detailResponse.data.item[0];
          state.searchBookList.push({
            title: detailResult.title,
            cover: detailResult.cover,
            author: detailResult.author,
            publisher: detailResult.publisher,
            pubDate: detailResult.pubDate,
            isbn: detailResult.isbn13,
            description: detailResult.description,
            page: detailResult.subInfo.itemPage
          });
        }
      };
    } catch (error) {
      console.log('** 다음 오류가 발생했습니다 **');
      if (error instanceof Error) console.log(error.message);
      else console.log(error);
    }
  };

  return { state, isLoading, searchBookList, searchBook, searchBookMore };
},
  {
    persist: true,
  });