<template>
  <v-dialog v-model="deleteModal">
    <v-container>
      <v-row class="justify-center">
        <v-col cols="12" sm="9" md="6" lg="4">
          <v-card class="justify-center pa-2">
            <v-card-text class="pa-10">정말 기록을 삭제하시겠어요?</v-card-text>
            <v-card-actions class="justify-center">
              <v-btn class="px-5" variant="outlined" size="large" @click="deleteModal = false">취소하기</v-btn>
              <v-btn class="emphasis px-5" size="large" flat @click="deleteRecord">삭제하기</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  deleteRecord: { type: Function, required: true },
});

const deleteModal = ref(false);
</script>

<style scoped>
.v-dialog .v-card .v-card-text {
  font-weight: 500;
  color: #333;
}
</style>