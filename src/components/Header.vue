<template>
  <v-app-bar class="header hidden-lg-and-up px-10" scroll-behavior="elevate">
    <v-app-bar-title class="ma-0">
      <h1 class="logo">
        <router-link :to="{ name: 'home' }">공책</router-link>
      </h1>
    </v-app-bar-title>
    <span class="sub-title">Note, Book</span>
  </v-app-bar>
</template>

<script>
// css stylesheet
import '@/assets/css/components/header.css';
</script>

<style></style>