<template>
  <v-form class="ma-auto">
    <v-card class="pa-5" flat>
      <v-card-item class="mb-9 pa-0">
        <v-card-title class="mb-2">로그인</v-card-title>
        <v-card-subtitle>로그인하고 나만의 독서 기록을 채워나가요 📕</v-card-subtitle>
      </v-card-item>
      <v-card-text class="mb-6 pa-0">
        <div class="mb-3">
          <span class="d-block mb-2">이메일</span>
          <v-text-field v-model="state.loginUserData.email" placeholder="이메일을 입력해주세요." variant="outlined" prepend-inner-icon="mdi-email-outline" />
        </div>
        <div>
          <span class="d-block mb-2">비밀번호</span>
          <v-text-field v-model="state.loginUserData.password" :append-inner-icon="visiblePassword ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visiblePassword ? 'text' : 'password'" placeholder="비밀번호를 입력해주세요." variant="outlined"
            prepend-inner-icon="mdi-lock-outline" @click:append-inner="visiblePassword = !visiblePassword" />
        </div>
      </v-card-text>
      <v-card-actions class="mb-16 pa-0">
        <v-btn class="emphasis" size="x-large" flat @click="login">이메일로 로그인하기</v-btn>
      </v-card-actions>
      <v-card-actions class="flex-column pa-0">
        <v-btn class="ma-0 mb-3" variant="tonal" size="large" color="#ca4f34" @click="loginWithGoogle">구글 계정으로 로그인</v-btn>
        <router-link :to="{ name: 'signUp' }">
          <v-btn class="ma-0" variant="text" size="large" append-icon="mdi-chevron-right">회원 가입</v-btn>
        </router-link>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script setup>
import { ref } from 'vue';
import { useMemberStore } from '@/stores/member';

const visiblePassword = ref(false);
const { state, loginWithEmail, loginWithGoogle } = useMemberStore();
const login = async () => {
  await loginWithEmail();
  state.loginUserData.email = '';
  state.loginUserData.password = '';
};
</script>

<style scoped>
.v-form {
  width: 60%;
}
.v-card {
  background-color: transparent;
}
.v-card .v-card-title,
.v-card .v-card-subtitle {
  text-align: center;
}
.v-card .v-card-text {
  font-weight: 500;
  font-size: 1em;
  color: #333;
}
.v-card .v-card-actions::v-deep a,
.v-card .v-card-actions .v-btn {
  width: 100%;
}
.v-card .v-card-actions::v-deep a .v-btn .v-btn__overlay {
  background-color: transparent;
}

/******************************
      max-width: 959px;
******************************/
@media all and (max-width: 959px) {
  .v-form {
    width: 75%;
  }
}

/******************************
      max-width: 599px;
******************************/
@media all and (max-width: 599px) {
  .v-form {
    width: 95%;
  }
}
</style>