<template>
  <v-app>
    <v-app-bar flat class="hidden-lg-and-up">
    </v-app-bar>
    <v-main class="pt-lg-0">
      <v-container fluid>
        <v-row class="h-screen ma-n4">
          <v-col class="d-flex flex-column justify-center" cols="12" lg="3">
            <div class="search sec w-100">
              <div class="sec-header mb-15">
                <h2 class="sec-title">공책</h2>
                <h3 class="sec-sub-title">Note, Book</h3>
                <span class="sec-desc"><em>책</em>으로 <em>기록</em>하는 <em>공간</em></span>
              </div>
              <v-form class="align-self-center">
                <v-select v-model="data.selectOption" :items="data.options" class="mb-5" variant="outlined" hide-details="auto"></v-select>
                <v-text-field v-model.trim="data.searchKeyword" label="어떤 책을 기록하시나요?" variant="outlined"
                append-inner-icon="mdi-magnify" clear-icon="mdi-close-circle-outline" clearable hide-details="auto"
                @keyup.enter="searchBook" @click:append-inner="searchBook"></v-text-field>
              </v-form>
            </div>
          </v-col>
          <v-col class="contents" cols="12" lg="9">
            <div class="sec-header">
              <h2 class="sec-title">나의 기록</h2>
            </div>
            <ul class="result d-flex flex-wrap">
              <li class="book-info" v-for="searchResultItem in data.searchResultList" :key="searchResultItem.isbn">
                <figure class="book-cover">
                  <img :src="searchResultItem.cover" :alt="searchResultItem.title">
                </figure>
                <div class="book-text">
                  <h3 class="book-title">{{ searchResultItem.title }}</h3>
                  <span class="book-author">{{ searchResultItem.author }}</span>
                  <span class="book-publisher">{{ searchResultItem.publisher }}</span>
                </div>
                <button type="button" class="book-record-button">기록하기</button>
              </li>
            </ul>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import axios from 'axios';
import { reactive } from 'vue';

const ttbKey = "ttbcheo4150851003";
const baseURL = `/api/ItemSearch.aspx?ttbkey=${ttbKey}&MaxResults=50&start=1&SearchTarget=Book&output=JS&Cover=Big&CallBack=booksearch&Version=20131101&Querytype=`;
const DetailBaseURL2 = `/api/ItemLookUp.aspx?ttbkey=${ttbKey}&itemIdType=ISBN13&output=JS&Cover=Big&Version=20131101&ItemId=`


const data = reactive({
  selectOption: '제목으로 검색',
  options: ['제목으로 검색', '작가명으로 검색'],
  searchKeyword: '',
  searchResultList: []
});

const searchBook = async () => {
  if (data.selectOption === data.options[0]) {
    const response = await axios.get(baseURL + `Title&Query=${data.searchKeyword}`);
    const results = response.data.item;
    console.log(response.data.item);

    data.searchResultList=[];
    await results.forEach(async (result) => {
      const detailResponse = await axios.get(DetailBaseURL2 + result.isbn13);
      const detailResult = detailResponse.data.item;

      data.searchResultList.push({
        title: result.title,
        cover: result.cover,
        author: result.author,
        publisher: result.publisher,
        isbn: result.isbn,
        description: result.description,
        page: detailResult[0].subInfo.itemPage
      })
    });
  }
  else if (data.selectOption === data.options[1]) {
    const response = await axios.get(baseURL + `Author&Query=${data.searchKeyword}`);
    const results = response.data.item;
    console.log(response.data.item);

    data.searchResultList=[];
    await results.forEach(async (result) => {
      const detailResponse = await axios.get(DetailBaseURL2 + result.isbn13);
      const detailResult = detailResponse.data.item;

      data.searchResultList.push({
        title: result.title,
        cover: result.cover,
        author: result.author,
        publisher: result.publisher,
        isbn: result.isbn,
        description: result.description,
        page: detailResult[0].subInfo.itemPage
      })
    })
  };
};
</script>

<style>
#app .v-application{background: transparent;}

.sec-header .sec-title{font-size: 30px; font-family: LeeSeoyun; color: #111;}
.sec-header .sec-sub-title,
.sec-header .sec-desc{
  display: block;
  line-height: 1.2; font-size: 28px; font-family: LeeSeoyun; color: #555;
}
.sec-header .sec-desc em{color: #ca4f34;}

.search .sec-header .sec-title{font-size: 60px;}
.contents{
  border-left: 2px solid #ca4f34;
  background-color: rgba(255, 255, 255, .6);
}
.book-info{width: 25%;}
.book-cover img{width: 147px; height: 200px;}
</style>
