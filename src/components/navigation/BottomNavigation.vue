<template>
  <v-bottom-navigation
    v-model="selectNavigation"
    class="hidden-sm-and-up rounded-t"
    mandatory
    grow
  >
    <v-btn v-if="!currentUser" value="login" @click="navigateHome">
      <v-icon icon="mdi-login" />
      로그인
    </v-btn>
    <v-btn v-else value="home" @click="navigateHome">
      <v-icon icon="mdi-book-open-page-variant" />
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
.v-btn::v-deep .v-btn__content {
  font-size: 1.4em;
  font-family: LeeSeoyun, Roboto, "돋움", dotum, AppleGothic, sans-serif;
}
.v-btn::v-deep:hover .v-btn__overlay {
  background-color: #bbb;
}
.v-btn--active {
  color: #ca4f34;
}
.v-btn--active::v-deep .v-btn__overlay {
  background-color: transparent;
}
</style>