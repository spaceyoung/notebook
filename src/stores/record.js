import { reactive, computed } from "vue";
import { defineStore } from "pinia";
import { useCollection } from 'vuefire';
import { database, myReadingDB, myReadingEndDB } from '@/datasources/firebase';
import { collection, doc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";

export const useRecordStore = defineStore("record", () => {
  const state = reactive({
    isLoading: false,
    myReadingList: [],
    myReadingEndList: [],
    recordBookDefault: {
      platform: null,
      readingState: null,
      readingStartDate: null,
      readingEndDate: null,
      formattedReadingStartDate: null,
      formattedReadingEndDate: null,
      readingPage: null,
      rating: 0,
      sentence: '',
      review: '',
    },
  });
  const isLoading = computed(() => state.isLoading);
  const myReadingList = computed(() => state.myReadingList);
  const myReadingEndList = computed(() => state.myReadingEndList);

  // 독서 중 데이터 조회
  const inquiryMyReading = () => {
    state.isLoading = true;
    try {
      const myReading = useCollection(myReadingDB);
      if (myReading) state.myReadingList = myReading;
      else alert('데이터 조회에 실패했습니다.');
    } catch (error) {
      alert(`다음 오류가 발생했습니다 : ${error}`);
    };
    setTimeout(() => { state.isLoading = false; }, 1000);
  };

  // 독서 완료 데이터 조회
  const inquiryMyReadingEnd = () => {
    state.isLoading = true;
    try {
      const myReadingEnd = useCollection(myReadingEndDB);
      if (myReadingEnd) state.myReadingEndList = myReadingEnd;
      else alert('데이터 조회에 실패했습니다.');
    } catch (error) {
      alert(`다음 오류가 발생했습니다 : ${error}`);
    };
    setTimeout(() => { state.isLoading = false; }, 1000);
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
      readingStartDate: myReadingItem.readingStartDate,
      formattedReadingStartDate: myReadingItem.formattedReadingStartDate,
      readingEndDate: myReadingItem.readingEndDate,
      formattedReadingEndDate: myReadingItem.formattedReadingEndDate,
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
      readingStartDate: myReadingEndItem.readingStartDate,
      formattedReadingStartDate: myReadingEndItem.formattedReadingStartDate,
      readingEndDate: myReadingEndItem.readingEndDate,
      formattedReadingEndDate: myReadingEndItem.formattedReadingEndDate,
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

  return { state, isLoading, myReadingList, myReadingEndList, inquiryMyReading, inquiryMyReadingEnd, addMyReading, updateMyReading, deleteMyReading, addMyReadingEnd, updateMyReadingEnd, deleteMyReadingEnd };
},
  {
    persist: true,
  });