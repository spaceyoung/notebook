<template>
  <Header />
  <v-main class="pt-lg-0">
    <v-container class="pa-0" fluid>
      <v-row class="ma-0">
        <v-col class="search" cols="12" lg="3">
          <Search />
        </v-col>
        <v-col class="contents px-4 py-8 pa-sm-8" cols="12" lg="9">
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

<style></style>