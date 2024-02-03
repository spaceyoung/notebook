import { reactive, computed } from "vue";
import axios from 'axios';
import { defineStore } from "pinia";
import { useCollection } from 'vuefire';
import { database, myReadingDB, myReadingEndDB } from '@/datasources/firebase';
import { collection, doc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";


export const useMyReadingStore = defineStore("myReading", () => {

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

  const isLoading = computed(() => state.isLoading);
  const myReadingList = computed(() => state.myReadingList);
  const myReadingEndList = computed(() => state.myReadingEndList);
  const searchBookList = computed(() => state.searchBookList);

  return { state, isLoading, myReadingList, myReadingEndList, searchBookList, myReadingProgress, vuefireMyReading, vuefireMyReadingEnd, closeDateDialog };
},
  {
    persist: true,
  });