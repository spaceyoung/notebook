import { reactive, computed } from "vue";
import { useRouter } from 'vue-router';
import { defineStore } from "pinia";
import { auth, database } from '@/datasources/firebase';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const useMemberStore = defineStore("member", () => {
  const router = useRouter();
  const state = reactive({
    signUpUserData: {
      email: '',
      password: '',
      passwordCheck: '',
    },
    loginUserData: {
      email: '',
      password: '',
    },
    currentUser: '',
  });
  const currentUser = computed(() => state.currentUser);

  // 이메일 입력 필드 유효성 검사
  const emailRule = [
    value => !!value || '이메일을 입력해주세요.',
    value => {
      const emailPattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
      return emailPattern.test(value) || '이메일 형식으로 입력해주세요.';
    }
  ]

  // 비밀번호 입력 필드 유효성 검사
  const passwordRule = [
    value => !!value || '비밀번호를 입력해주세요.',
    value => {
      const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*_]).{8,15}$/;
      return passwordPattern.test(value) || '영문자, 숫자, 특수문자(!@#$%^&*_) 조합의 8~15자로 입력해주세요.'
    }
  ]

  // 비밀번호 입력 필드 확인 유효성 검사
  const passwordCheckRule = [
    value => !!value || '비밀번호를 재입력해주세요.',
    value => state.signUpUserData.password === value || '비밀번호가 일치하지 않아요. 다시 확인해주세요.'
  ]

  // 이메일로 회원 가입
  const signUpWithEmail = async () => {
    try {
      await createUserWithEmailAndPassword(auth, state.signUpUserData.email, state.signUpUserData.password);
      state.currentUser = auth.currentUser;
      addUserData(auth.currentUser);
    } catch (error) {
      alert(`회원 가입 중 다음 오류가 발생했습니다 : ${error}`);
    }
  };
  
  
  // 이메일로 로그인
  const loginWithEmail = async () => {
    try {
      await signInWithEmailAndPassword(auth, state.loginUserData.email, state.loginUserData.password);
      state.currentUser = auth.currentUser;
      router.push({ name: 'home' });
    } catch (error) {
      alert(`로그인 시도 중 다음 오류가 발생했습니다 : ${error}`);
    }
  };

  // 구글 계정으로 로그인
  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      state.currentUser = auth.currentUser;
      addUserData(auth.currentUser);
      router.push({ name: 'home' });
    } catch (error) {
      alert(`구글 로그인 시도 중 다음 오류가 발생했습니다 : ${error}`);
    }
  };

  // 데이터베이스 users에 사용자 정보 추가
  const addUserData = async (currentUser) => {
    const docRef = doc(database, 'users', currentUser.uid, 'info', currentUser.uid);
    await setDoc(docRef, {
      uid: currentUser.uid,
      email: currentUser.email,
      creationTime: currentUser.metadata.creationTime,
    });
  };
  
  // 로그아웃
  const logout = async () => {
    try {
      await signOut(auth);
      state.currentUser = auth.currentUser;
      router.push({ name: 'login' });
    } catch (error) {
      alert(`로그아웃 시도 중 다음 오류가 발생했습니다 : ${error}`);
    }
  };

  return { state, currentUser, emailRule, passwordRule, passwordCheckRule, loginWithEmail, signUpWithEmail, loginWithGoogle, logout };
},
  {
    persist: true,
  });