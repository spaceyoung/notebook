<template>
  <v-form ref="signUpForm" class="ma-auto">
    <v-card class="pa-5" flat>
      <v-window v-model="state.signUpStep">
        <!-- 회원 가입 step 1 -->
        <v-window-item :value="1">
          <v-card-title class="mb-9">회원 가입</v-card-title>
          <v-card-text class="mb-6 pa-0">
            <div class="mb-3">
              <span class="d-block mb-2">이메일</span>
              <v-text-field
                v-model="state.signUpUserData.email"
                :rules="emailRule"
                placeholder="이메일을 입력해주세요."
                variant="outlined"
                prepend-inner-icon="mdi-email-outline"
              />
            </div>
            <div class="mb-3">
              <span class="d-block mb-2">비밀번호</span>
              <v-text-field
                v-model="state.signUpUserData.password"
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
            <div>
              <span class="d-block mb-2">비밀번호 확인</span>
              <v-text-field
                v-model="state.signUpUserData.passwordCheck"
                :rules="passwordCheckRule"
                :append-inner-icon="visiblePasswordCheck ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visiblePasswordCheck ? 'text' : 'password'"
                placeholder="비밀번호를 재입력해주세요."
                variant="outlined"
                prepend-inner-icon="mdi-lock-outline"
                @click:append-inner="visiblePasswordCheck = !visiblePasswordCheck"
              />
            </div>
          </v-card-text>
          <v-card-actions class="flex-column pa-0">
            <v-btn
              class="emphasis mb-16"
              size="x-large"
              flat
              @click="handleSignUp"
            >
              이메일로 회원 가입하기
            </v-btn>
            <v-btn
              :ripple="false"
              class="ma-0"
              size="large"
              prepend-icon="mdi-chevron-left"
              flat
              @click="router.push({ name: 'login' })"
            >
              로그인 화면으로 돌아가기
            </v-btn>
          </v-card-actions>
        </v-window-item>
        <!-- 회원 가입 step 2 -->
        <v-window-item :value="2">
          <v-card-title class="mb-5">공책에 오신 것을 환영해요!</v-card-title>
          <v-card-text class="mb-10 pa-0">회원 가입 후 자동으로 로그인되었어요.</v-card-text>
          <v-card-actions class="pa-0">
            <v-btn
              class="emphasis"
              size="large"
              @click="router.push({ name: 'home' })"
            >
              나만의 독서 기록 채우러 가기
            </v-btn>
          </v-card-actions>
        </v-window-item>
      </v-window>
    </v-card>
  </v-form>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMemberStore } from '@/stores/member';

const signUpForm = ref(null);
const visiblePassword = ref(false);
const visiblePasswordCheck = ref(false);

const router = useRouter();

const memberStore = useMemberStore();
const { state, emailRule, passwordRule, passwordCheckRule, signUpWithEmail } = memberStore;

// 회원 가입
const handleSignUp = async () => {
  const { valid } = await signUpForm.value.validate();
  if (valid) await signUpWithEmail();
  state.signUpUserData.email = null;
  state.signUpUserData.password = null;
  state.signUpUserData.passwordCheck = null;
};
</script>

<style scoped>
.v-form {
  width: 50%;
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
.v-window .v-window-item:nth-child(2) .v-card-text {
  font-weight: 400;
  color: #777;
  text-align: center;
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