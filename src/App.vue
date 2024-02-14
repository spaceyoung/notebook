<template>
  <v-app>
    <Layout />
    <teleport to="#info-modal">
      <InfoModal />
    </teleport>
  </v-app>
</template>

<script setup>
// css stylesheet
import '@/assets/css/reset.css';
import '@/assets/css/common.css';

import Layout from '@/layout/Layout.vue';
import InfoModal from '@/components/modal/InfoModal.vue';
</script>

<style>
.app .v-application {
  background-image: url(./assets/bg.png);
}
</style>