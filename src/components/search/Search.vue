<template>
  <div class="inner mx-auto">
    <div class="sec-header mb-10">
      <h2 class="sec-title mb-5">
        <router-link :to="{ name: 'home' }">공책</router-link>
      </h2>
      <h3 class="sec-sub-title">Note, Book</h3>
      <span class="sec-desc"><em>책</em>으로 <em>기록</em>하는 <em>공간</em></span>
    </div>
    <v-form>
      <v-select v-model="state.selectOption" :items="state.options" class="mb-5" variant="outlined" hide-details="auto" />
      <v-text-field v-model.trim="searchWord" label="어떤 책을 기록하시나요?" variant="outlined"
      append-inner-icon="mdi-magnify" clear-icon="mdi-close-circle-outline" clearable hide-details="auto"
      @keyup.enter="searchWordHandler" @click:append-inner="searchWordHandler" />
    </v-form>
    <v-btn v-if="currentUser" class="emphasis hidden-md-and-down" size="large" flat @click="logout">로그아웃</v-btn>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useSearchStore } from '@/stores/search';
import { useMemberStore } from '@/stores/member';

const searchWord = ref('');
const router = useRouter();
const { state, searchBook } = useSearchStore();
const { logout } = useMemberStore();
const currentUser = computed(() => useMemberStore().currentUser);

const searchWordHandler = () => {
  router.push({ name: 'searchResult' });
  searchBook(searchWord.value);
  searchWord.value = '';
};
</script>

<style scoped>
.inner {
  width: 75%;
  position: relative;
}
.sec-header .sec-title {
  font-size: 3.8em;
  line-height: 1;
}
.v-form .v-text-field::v-deep .v-field {
  background-color: rgba(255, 255, 255, .5);
}
.v-btn {
  background-color: transparent;
  position: absolute;
  left: 50%;
  bottom: -25%;
  transform: translate(-50%, 0);
}

/******************************
      max-width: 599px;
******************************/
@media all and (max-width: 599px) {
  .sec-header .sec-title {
    font-size: 3.2em;
  }
  .sec-header .sec-sub-title,
  .sec-header .sec-desc {
    font-size: 1.5em;
  }
}
</style>