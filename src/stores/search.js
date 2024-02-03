import { defineStore } from "pinia";

export const useSearchStore = defineStore("search", () => {
  const ttbKey = "ttbcheo4150851003";
  const baseURL = `/api/ItemSearch.aspx?ttbkey=${ttbKey}&MaxResults=50&start=1&SearchTarget=Book&output=JS&Cover=Big&Version=20131101&Querytype=`;
  const DetailBaseURL = `/api/ItemLookUp.aspx?ttbkey=${ttbKey}&itemIdType=ISBN13&output=JS&Cover=Big&Version=20131101&ItemId=`;

  const state = reactive({
    infoDialog: true,
    isLoading: false,
    options: ['제목으로 검색', '작가명으로 검색'],
    selectOption: '제목으로 검색',
  });

  // 도서 검색 및 결과 저장
  const searchBook = async (searchWord) => {
    state.isLoading = true;
    const results = await searchBookBase(searchWord);
    searchBookDetail(results);
    state.isLoading = false;
  };

  // 도서 기본정보 검색
  const searchBookBase = async (searchWord) => {
    // 제목으로 검색
    if (state.selectOption === state.options[0]) {
      const response = await axios.get(baseURL + `Title&Query=${searchWord}`);
      const results = response.data.item;
      state.searchBookList = [];
      return results;
    }
    //작가명으로 검색
    else if (state.selectOption === state.options[1]) {
      const response = await axios.get(baseURL + `Author&Query=${searchWord}`);
      const results = response.data.item;
      state.searchBookList = [];
      return results;
    };
  };

  // 도서 상세정보 검색 및 결과 저장
  const searchBookDetail = async (results) => {
    try {
      for (const result of results) {
        if (result.isbn13) {
          const detailResponse = await axios.get(DetailBaseURL + result.isbn13);
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

  return { state, searchBook };
});