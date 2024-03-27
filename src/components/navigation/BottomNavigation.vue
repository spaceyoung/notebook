<template>
  <v-bottom-navigation
    v-model="selectNavigation"
    class="hidden-sm-and-up rounded-t-xl"
    mandatory
    grow
  >
    <v-btn v-if="!currentUser" value="login" @click="navigateHome">
      <v-icon>mdi-login</v-icon>
      로그인
    </v-btn>
    <v-btn v-else value="home" @click="navigateHome">
      <v-icon>mdi-book-open-page-variant</v-icon>
      나의 기록
    </v-btn>
  </v-bottom-navigation>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMemberStore } from "@/stores/member";

const selectNavigation = ref(0);

const currentRoute = useRoute();
const router = useRouter();

const memberStore = useMemberStore();
const currentUser = computed(() => memberStore.currentUser);

const navigateHome = () => {
  if (currentRoute.name !== "home") router.push({ name: "home" });
};
</script>

<style scoped>
</style>