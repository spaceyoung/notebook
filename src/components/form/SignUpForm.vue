<template>
  <v-form class="ma-auto">
    <v-card class="pa-5" flat>
      <v-window v-model="signUpStep">
        <v-window-item :value="1">
          <v-card-title class="mb-9">회원 가입</v-card-title>
          <v-card-text class="mb-6 pa-0">
            <div class="mb-3">
              <span class="d-block mb-2">이메일</span>
              <v-text-field v-model="state.signUpUserData.email" placeholder="이메일을 입력해주세요." variant="outlined" prepend-inner-icon="mdi-email-outline" />
            </div>
            <div class="mb-3">
              <span class="d-block mb-2">비밀번호</span>
              <v-text-field v-model="state.signUpUserData.password" :append-inner-icon="visiblePassword ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visiblePassword ? 'text' : 'password'" placeholder="비밀번호를 입력해주세요." variant="outlined"
                prepend-inner-icon="mdi-lock-outline" @click:append-inner="visiblePassword = !visiblePassword" />
            </div>
            <div>
              <span class="d-block mb-2">비밀번호 확인</span>
              <v-text-field v-model="state.signUpUserData.passwordCheck" :append-inner-icon="visiblePasswordCheck ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visiblePasswordCheck ? 'text' : 'password'" placeholder="비밀번호를 재입력해주세요." variant="outlined"
                prepend-inner-icon="mdi-lock-outline" @click:append-inner="visiblePasswordCheck = !visiblePasswordCheck" />
            </div>
          </v-card-text>
          <v-card-actions class="flex-column pa-0">
            <v-btn class="emphasis mb-16" size="x-large" flat @click="signUp">가입하기</v-btn>
            <router-link :to="{ name: 'home' }">
              <v-btn class="ma-0" size="large" prepend-icon="mdi-chevron-left" flat>로그인 화면으로 돌아가기</v-btn>
            </router-link>
          </v-card-actions>
        </v-window-item>
        <v-window-item :value="2">
          <v-card-title class="mb-5">공책에 오신 것을 환영해요!</v-card-title>
          <v-card-text class="mb-10 pa-0">로그인하고 나만의 독서 기록을 채워나가요 📕</v-card-text>
          <v-card-actions class="pa-0">
            <router-link :to="{ name: 'home' }">
              <v-btn class="emphasis" size="large">로그인하러 가기</v-btn>
            </router-link>
          </v-card-actions>
        </v-window-item>
      </v-window>
    </v-card>
  </v-form>
</template>

<script setup>
import { ref } from 'vue';
import { useMemberStore } from '@/stores/member';

const signUpStep = ref(1);
const visiblePassword = ref(false);
const visiblePasswordCheck = ref(false);
const { state, signUpWithEmail } = useMemberStore();

const signUp = async () => {
  const signUpResult = await signUpWithEmail();
  if (signUpResult) signUpStep.value = 2;
  state.signUpUserData.email = '';
  state.signUpUserData.password = '';
  state.signUpUserData.passwordCheck = '';
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
.v-card .v-card-actions::v-deep a,
.v-card .v-card-actions .v-btn {
  width: 100%;
}
.v-window .v-window-item:nth-child(2) .v-card-text{
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