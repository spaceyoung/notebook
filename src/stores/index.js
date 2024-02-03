import { reactive, computed } from "vue";
import axios from 'axios';
import { defineStore } from "pinia";
import { useCollection } from 'vuefire';
import { database, myReadingDB, myReadingEndDB } from '@/datasources/firebase';
import { collection, doc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";


export const useNotebookStore = defineStore("notebook", () => {
  const ttbKey = import.meta.env.VITE_ALADIN_APP_KEY;
  const baseURL = `/api/ItemSearch.aspx?ttbkey=${ttbKey}&MaxResults=50&SearchTarget=Book&output=JS&Cover=Big&Version=20131101&Querytype=`;
  const DetailBaseURL = `/api/ItemLookUp.aspx?ttbkey=${ttbKey}&itemIdType=ISBN13&output=JS&Cover=Big&Version=20131101&ItemId=`;

  const state = reactive({
    infoDialog: true,
    isLoading: false,
    options: ['제목으로 검색', '작가명으로 검색'],
    selectOption: '제목으로 검색',
    tabs: [
      { id: 'MyReading', label: '독서 중' },
      { id: 'MyReadingEnd', label: '독서 완료' }
    ],
    selectTab: 'MyReading',
    myReadingList: [],
    myReadingEndList: [],
    searchBookList: [],
    platforms: ['종이책', '전자책', '오디오북'],
    readingStates: ['독서 중', '독서 완료'],
    startDialog: false,
    endDialog: false,
    recordBookDefault: {
      platform: null,
      readingState: null,
      startDate: null,
      endDate: null,
      formattedStartDate: null,
      formattedEndDate: null,
      readingPage: null,
      rating: 0,
      sentence: '',
      review: '',
    }
  });

  // 독서 중 데이터 로딩
  const vuefireMyReading = () => {
    state.isLoading = true;
    try {
      const myReading = useCollection(myReadingDB);
      if (myReading) {
        state.myReadingList = myReading;
        state.isLoading = false;
      }
      else {
        alert('데이터 조회에 실패했습니다.');
        state.isLoading = false;
      }
    } catch (error) {
      alert(`다음 오류가 발생했습니다 : ${error}`);
      state.isLoading = false;
    };
  };

  // 독서 완료 데이터 로딩
  const vuefireMyReadingEnd = () => {
    state.isLoading = true;
    try {
      const myReadingEnd = useCollection(myReadingEndDB);
      if (myReadingEnd) {
        state.myReadingEndList = myReadingEnd;
        state.isLoading = false;
      }
      else {
        alert('데이터 조회에 실패했습니다.');
        state.isLoading = false;
      }
    } catch (error) {
      alert(`다음 오류가 발생했습니다 : ${error}`);
      state.isLoading = false;
    };
  };


  const myReadingProgress = (myReadingItem) => {
    return `${Math.round(myReadingItem.readingPage / myReadingItem.page * 100)}%`;
  };


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
      const response = await axios.get(baseURL + `Title&Query=${searchWord}&start=1`);
      const results = response.data.item;
      state.searchBookList = [];
      return results;
    }
    // 작가명으로 검색
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


  // 독서 날짜 Dialog 닫기
  const closeDateDialog = (date, book) => {
    const formattedDate = new Intl.DateTimeFormat('kr', { dateStyle: 'medium' }).format(date);
    if (state.startDialog) {
      book.formattedStartDate = formattedDate;
      state.startDialog = false;
    }
    if (state.endDialog) {
      book.formattedEndDate = formattedDate;
      state.endDialog = false;
    }
  };


  // 데이터베이스 myReading에 독서 중 기록 추가
  const addMyReading = async (recordBook) => {
    recordBook.timeStamp = new Date();
    await setDoc(doc(collection(database, 'myReading')), recordBook);
  };

  // 데이터베이스 myReading 독서 중 기록 수정
  const updateMyReading = async (id, myReadingItem) => {
    await updateDoc(doc(database, 'myReading', id), {
      platform: myReadingItem.platform,
      readingState: myReadingItem.readingState,
      startDate: myReadingItem.startDate,
      formattedStartDate: myReadingItem.formattedStartDate,
      endDate: myReadingItem.endDate,
      formattedEndDate: myReadingItem.formattedEndDate,
      readingPage: myReadingItem.readingPage,
      rating: myReadingItem.rating,
      sentence: myReadingItem.sentence,
      review: myReadingItem.review,
    });
  };

  // 데이터베이스 myReading에서 독서 중 기록 삭제
  const deleteMyReading = async (id) => {
    await deleteDoc(doc(database, 'myReading', id));
  };

  // 데이터베이스 myReadingEnd에 독서 완료 기록 추가
  const addMyReadingEnd = async (recordBook) => {
    recordBook.timeStamp = new Date();
    await setDoc(doc(collection(database, 'myReadingEnd')), recordBook);
  };

  // 데이터베이스 myReadingEnd 독서 완료 기록 수정
  const updateMyReadingEnd = async (id, myReadingEndItem) => {
    await updateDoc(doc(database, 'myReadingEnd', id), {
      platform: myReadingEndItem.platform,
      readingState: myReadingEndItem.readingState,
      startDate: myReadingEndItem.startDate,
      formattedStartDate: myReadingEndItem.formattedStartDate,
      endDate: myReadingEndItem.endDate,
      formattedEndDate: myReadingEndItem.formattedEndDate,
      readingPage: myReadingEndItem.readingPage,
      rating: myReadingEndItem.rating,
      sentence: myReadingEndItem.sentence,
      review: myReadingEndItem.review,
    });
  };

  // 데이터베이스 myReading에서 독서 완료 기록 삭제
  const deleteMyReadingEnd = async (id) => {
    await deleteDoc(doc(database, 'myReadingEnd', id));
  };


  const isLoading = computed(() => state.isLoading);
  const myReadingList = computed(() => state.myReadingList);
  const myReadingEndList = computed(() => state.myReadingEndList);
  const searchBookList = computed(() => state.searchBookList);

  return { state, isLoading, myReadingList, myReadingEndList, searchBookList, myReadingProgress, vuefireMyReading, vuefireMyReadingEnd, searchBook, closeDateDialog, addMyReading, updateMyReading, deleteMyReading, addMyReadingEnd, updateMyReadingEnd, deleteMyReadingEnd };
},
  {
    persist: true,
  });