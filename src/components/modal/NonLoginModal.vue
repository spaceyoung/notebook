<template>
  <v-dialog v-model="NonLoginModal">
    <v-container>
      <v-row class="justify-center">
        <v-col cols="12" sm="9" md="6" lg="4">
          <v-card class="justify-center pa-2">
            <v-card-text class="pa-10">독서 기록을 위해서는 로그인이 필요해요.</v-card-text>
            <v-card-actions class="justify-center">
              <v-btn
                class="px-5"
                variant="outlined"
                size="large"
                @click="NonLoginModal = false"
              >
                취소하기
              </v-btn>
              <v-btn
                class="emphasis px-5"
                size="large"
                flat
                @click="router.push({ name: 'login' })"
              >
                로그인하러 가기
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const NonLoginModal = ref(false);
const router = useRouter();
</script>

<style scoped>
.v-dialog .v-card .v-card-text {
  font-weight: 500;
  color: #333;
}
</style>