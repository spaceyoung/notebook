<template>
  <v-btn class="flex-0-0 align-self-end order-first pa-0" size="large" flat @click="cancelRecord">
    <v-icon icon="mdi-window-close" size="x-large" />
  </v-btn>
</template>
  
  <script setup>
  defineProps({
    cancelRecord: { type: Function, required: true },
  });
  </script>
  
  <style scoped>
  .v-btn {
    min-width: 52px;
    background-color: transparent;
  }
  .v-btn::v-deep .v-btn__overlay {
    background-color: transparent;
  }
  </style>