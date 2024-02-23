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
      router.push({ name: 'myPage' });
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
      router.push({ name: 'myPage' });
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
      router.push({ name: 'home' });
    } catch (error) {
      alert(`로그아웃 시도 중 다음 오류가 발생했습니다 : ${error}`);
    }
  };

  return { state, currentUser, loginWithEmail, signUpWithEmail, loginWithGoogle, logout };
},
  {
    persist: true,
  });