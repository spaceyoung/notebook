import { reactive, computed } from "vue";
import { useRouter } from 'vue-router';
import { defineStore } from "pinia";
import { auth, database } from '@/datasources/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
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

  // 이메일로 회원 가입
  const signUpWithEmail = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, state.signUpUserData.email, state.signUpUserData.password);
      const user = userCredential.user;
      addUserData(user);
      return user;
    } catch (error) {
      alert(`회원 가입 중 다음 오류가 발생했습니다 : ${error}`);
      return false;
    }
  };

  // 데이터베이스 users에 사용자 정보 추가
  const addUserData = async (user) => {
    const docRef = doc(database, 'users', user.uid, 'info', user.uid);
    await setDoc(docRef, {
      uid: user.uid,
      email: user.email,
      creationTime: user.metadata.creationTime,
    });
  };

  // 이메일로 로그인
  const loginWithEmail = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, state.loginUserData.email, state.loginUserData.password);
      const user = userCredential.user;
      state.currentUser = user.uid;
      router.push({ name: 'myPage' });
    } catch (error) {
      alert(`로그인 시도 중 다음 오류가 발생했습니다 : ${error}`);
    }
  };

  // 로그아웃
  const logout = async () => {
    try {
      await signOut(auth);
      router.push({ name: 'home' });
      state.currentUser = '';
    } catch (error) {
      alert(`로그아웃 시도 중 다음 오류가 발생했습니다 : ${error}`);
    }
  };

  return { state, currentUser, loginWithEmail, signUpWithEmail, logout };
},
  {
    persist: true,
  });