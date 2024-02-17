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

<script setup>
</script>

<style scoped>
header.v-app-bar {
  background-color: rgba(202, 79, 52, .9);
}
header.v-app-bar::v-deep .v-toolbar__content {
  font-size: 1.1em;
  font-family: LeeSeoyun, Roboto, "돋움", dotum, AppleGothic, sans-serif;
  color: #fff;
}
</style>