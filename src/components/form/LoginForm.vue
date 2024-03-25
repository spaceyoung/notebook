<template>
  <v-form ref="loginForm" class="ma-auto">
    <v-card class="d-flex flex-column pa-5" flat>
      <v-card-item class="mb-6 pa-0">
        <v-card-title class="mb-2">로그인</v-card-title>
        <v-card-subtitle>로그인하고 나만의 독서 기록을 채워나가요 📕</v-card-subtitle>
      </v-card-item>
      <v-card-actions class="align-self-end pa-0">
        <v-btn
          class="ma-0 px-4"
          variant="outlined"
          @click="loginWithTestAccount"
        >
          테스트 계정으로 로그인
        </v-btn>
      </v-card-actions>
      <v-card-text class="mb-6 pa-0">
        <div class="mb-3">
          <span class="d-block mb-2">이메일</span>
          <v-text-field
            v-model="state.loginUserData.email"
            :rules="emailRule"
            placeholder="이메일을 입력해주세요."
            variant="outlined"
            prepend-inner-icon="mdi-email-outline"
          />
        </div>
        <div>
          <span class="d-block mb-2">비밀번호</span>
          <v-text-field
            v-model="state.loginUserData.password"
            :rules="passwordRule"
            :hint="'비밀번호는 영문자, 숫자, 특수문자(!@#$%^&*_) 조합의 8~15자로 입력해주세요.'"
            :append-inner-icon="visiblePassword ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visiblePassword ? 'text' : 'password'"
            placeholder="비밀번호를 입력해주세요."
            variant="outlined"
            prepend-inner-icon="mdi-lock-outline"
            @click:append-inner="visiblePassword = !visiblePassword"
          />
        </div>
      </v-card-text>
      <v-card-actions class="mb-16 pa-0">
        <v-btn
          class="emphasis"
          size="x-large"
          flat
          @click="handleLogin"
        >
          이메일로 로그인
        </v-btn>
      </v-card-actions>
      <v-card-actions class="flex-column pa-0">
        <v-btn
        class="ma-0 mb-3"
          variant="tonal"
          size="large"
          color="#ca4f34"
          @click="loginWithGoogle"
        >
          구글 계정으로 로그인
        </v-btn>
        <v-btn
          :ripple="false"
          class="ma-0"
          size="large"
          append-icon="mdi-chevron-right"
          @click="router.push({ name: 'signUp' })"
        >
          회원 가입
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMemberStore } from '@/stores/member';

const loginForm = ref(null);
const visiblePassword = ref(false);

const router = useRouter();

const memberStore = useMemberStore();
const { state, emailRule, passwordRule, loginWithEmail, loginWithGoogle, loginWithTestAccount } = memberStore;

// 이메일로 로그인
const handleLogin = async () => {
  const { valid } = await loginForm.value.validate();
  if (valid) await loginWithEmail();
  state.loginUserData.email = null;
  state.loginUserData.password = null;
};
</script>

<style scoped>
.v-form {
  width: 55%;
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
.v-card .v-card-actions .v-btn {
  width: 100%;
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