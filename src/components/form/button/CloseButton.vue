<template>
    <v-btn class="close-button pa-0" size="large" flat @click="cancelRecord">
      <v-icon icon="mdi-window-close" size="x-large" />
    </v-btn>
  </template>
  
  <script setup>
  defineProps({
    cancelRecord: { type: Function, required: true },
  });
  </script>
  
  <style scoped>

  </style>