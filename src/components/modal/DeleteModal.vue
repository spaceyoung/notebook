<template>
  <v-dialog v-model="state.deleteModal" class="modal delete">
    <v-container>
      <v-row class="justify-center">
        <v-col cols="12" sm="9" md="6" lg="4">
          <v-card class="modal-box pa-2">
            <v-card-text class="modal-desc pa-10">정말 기록을 삭제하시겠어요?</v-card-text>
            <v-card-actions class="modal-buttons">
              <v-spacer />
              <v-btn class="cancel-button px-5" variant="outlined" size="large"
                @click="state.deleteModal = false">취소하기</v-btn>
              <v-btn class="delete-button px-5" variant="outlined" size="large" @click="deleteRecord">삭제하기</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-dialog>
</template>

<script setup>
import { useNotebookStore } from '@/stores/index';

defineProps({
  deleteRecord: { type: Function, required: true },
});

const { state } = useNotebookStore();
</script>