<template>
  <v-dialog v-model="infoModal" persistent>
    <v-container>
      <v-row class="justify-center">
        <v-col cols="12" sm="9" lg="6" xl="4">
          <v-card class="justify-center px-4 px-sm-8 py-8">
            <v-card-title class="py-0">안내사항</v-card-title>
            <v-card-subtitle class="mb-2">Information</v-card-subtitle>
            <v-card-text class="py-6">
              <p class="mb-3">본 사이트는 개인 포트폴리오 작업물입니다.</p>
              <p>알라딘의 Open API를 사용하고 있으며, 불가피한 서버 오류로 인해 검색 시 원하는 결과가 제공되지 않을 수 있습니다. 검색어를 상세하게 입력할수록 오류없이 정확한 결과를 얻을 수
                있습니다🙂</p>
            </v-card-text>
            <v-card-actions class="justify-center pa-0">
              <v-btn class="emphasis" size="large" flat @click="infoModal = false">확인</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue';

const infoModal = ref(true);
</script>

<style scoped>
</style>