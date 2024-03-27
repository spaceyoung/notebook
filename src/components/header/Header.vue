<template>
  <v-app-bar
    class="hidden-lg-and-up px-5 px-sm-10"
    scroll-behavior="elevate"
  >
    <!-- 로고 -->
    <v-app-bar-title class="ma-0">
      <h1>
        <router-link :to="{ name: 'home' }">
          공책
          <span>Note, Book</span>
        </router-link>
      </h1>
    </v-app-bar-title>
    <!-- 로그아웃 메뉴 -->
    <v-menu v-if="currentUser" transition="slide-y-transition">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          class="ma-0"
          icon="mdi-logout"
          flat
        />
      </template>
      <v-list class="py-1" elevation="5">
        <v-list-item class="px-2">
          <v-btn
            size="large"
            prepend-icon="mdi-logout"
            @click="logout"
          >
            로그아웃
          </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup>
import { computed } from 'vue';
import { useMemberStore } from '@/stores/member';

const memberStore = useMemberStore();
const { logout } = memberStore;
const currentUser = computed(() => memberStore.currentUser);
</script>

<style scoped>
header.v-app-bar {
  background-color: rgba(202, 79, 52, 0.9);
}
header.v-app-bar::v-deep .v-toolbar__content {
  font-size: 1.1em;
  font-family: LeeSeoyun, Roboto, '돋움', dotum, AppleGothic, sans-serif;
  color: #fff;
}
header.v-app-bar .v-btn {
  width: 40px;
  height: 40px;
  color: #fff;
}
</style>