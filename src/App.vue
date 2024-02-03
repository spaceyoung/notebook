<template>
  <v-app>
    <Header />
    <v-main class="pt-lg-0">
      <v-container class="pa-0" fluid>
        <v-row class="ma-0">
          <Search />
          <Contents />
        </v-row>
      </v-container>
    </v-main>
    <teleport to="#modal">
      <Modal />
    </teleport>
  </v-app>
</template>

<script setup>
// css stylesheet
import '@/assets/css/reset.css';
import '@/assets/css/common.css';

import Header from '@/components/Header.vue';
import Search from '@/components/Search.vue';
import Contents from '@/components/Contents.vue';
import Modal from '@/components/Modal.vue';
</script>

<style>
.app .v-application {
  background-image: url(./assets/bg.png);
}
</style>