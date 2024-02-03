<template>
  <v-dialog v-model="state.infoDialog" class="modal" persistent>
    <v-container>
      <v-row>
        <v-col cols="12" sm="9" lg="6" xl="4">
          <v-card class="modal-box px-4 px-sm-8 py-8">
            <v-card-title class="modal-title py-0">안내사항</v-card-title>
            <v-card-subtitle class="modal-sub-title mb-2">Information</v-card-subtitle>
            <v-card-text class="modal-desc py-6">
              <p class="mb-3">본 사이트는 개인 포트폴리오 작업물입니다.</p>
              <p>알라딘의 Open API를 사용하고 있으며, 불가피한 서버 오류로 인해 검색 시 원하는 결과가 제공되지 않을 수 있습니다. 검색어를 상세하게 입력할수록 오류없이 정확한 결과를 얻을 수
                있습니다🙂</p>
            </v-card-text>
            <v-card-actions class="modal-button">
              <v-btn variant="outlined" @click="state.infoDialog = false">확인</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-dialog>
</template>

<script setup>
// css stylesheet
import '@/assets/css/components/modal.css';

import { useNotebookStore } from '@/stores/index';
const { state } = useNotebookStore();
</script>

<style></style>