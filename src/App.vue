<template>
  <v-app>
    <AppLayout />
    <teleport to="#info-modal">
      <InfoModal />
    </teleport>
  </v-app>
</template>

<script setup>
// CSS stylesheet
import '@/assets/css/reset.css';
import '@/assets/css/common.css';
import '@/assets/css/components/modal.css';

import AppLayout from '@/layouts/AppLayout.vue';
import InfoModal from '@/components/modal/InfoModal.vue';
</script>

<style scoped>
.app .v-application {
  background-image: url(./assets/bg.png);
}
</style>