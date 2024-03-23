import { computed } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { useMemberStore } from '@/stores/member';

const currentUser = computed(() => useMemberStore().currentUser);

const Home = () => import('@/views/Home.vue');
const Login = () => import('@/views/Login.vue');
const SignUp = () => import('@/views/SignUp.vue');
const SearchResult = () => import('@/views/SearchResult.vue');
const Record = () => import('@/views/Record.vue');
const ReadingModify = () => import('@/views/ReadingModify.vue');
const ReadingEndModify = () => import('@/views/ReadingEndModify.vue');

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/', name: 'home', component: Home,
      beforeEnter: () => {
        if (!currentUser.value) return { name: 'login' };
      },
    },
    { path: '/signup', name: 'signUp', component: SignUp },
    { path: '/login', name: 'login', component: Login },
    { path: '/searchresult', name: 'searchResult', component: SearchResult },
    { path: '/record/:id(\\d+)', name: 'record/id', component: Record },
    { path: '/readingmodify/:id(\\d+)', name: 'readingModify/id', component: ReadingModify },
    { path: '/readingendmodify/:id(\\d+)', name: 'readingEndModify/id', component: ReadingEndModify },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;