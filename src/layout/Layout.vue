<template>
  <Header />
  <v-main class="pt-lg-0">
    <v-container class="pa-0" fluid>
      <v-row class="ma-0">
        <v-col class="search d-flex flex-column justify-center" cols="12" lg="3">
          <Search />
        </v-col>
        <v-col class="contents d-flex flex-column px-4 py-8 pa-sm-8" cols="12" lg="9">
          <router-view />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
// css stylesheet
import '@/assets/css/components/contents.css';

import Header from '@/components/header/Header.vue';
import Search from '@/components/search/Search.vue';
</script>

<style scoped>
.contents {
  height: 100vh;
  max-height: 100vh;
  border-left: 2px solid #ca4f34;
  background-color: rgba(255, 255, 255, .6);
  position: relative;
  overflow: hidden;
}

/******************************
      max-width: 1279px;
******************************/
@media all and (max-width: 1279px) {
  .search {
    height: 450px;
  }
  .contents {
    height: auto;
    min-height: calc(100vh - 514px);
    max-height: none;
    border-top: 2px solid #ca4f34;
    border-left: none;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
  }
}

/******************************
      max-width: 599px;
******************************/
@media all and (max-width: 599px) {
  .search {
    height: 400px;
  }
  .contents {
    min-height: calc(100vh - 464px);
  }
}
</style>