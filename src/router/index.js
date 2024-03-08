import { computed } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { useMemberStore } from '@/stores/member';

const currentUser = computed(() => useMemberStore().currentUser);

const Home = () => import('@/views/Home.vue');
const Login = () => import('@/views/Login.vue');
const SignUp = () => import('@/views/SignUp.vue');
const SearchResult = () => import('@/views/SearchResult.vue');
const Record = () => import('@/views/Record.vue');
const Modify = () => import('@/views/Modify.vue');
const EndModify = () => import('@/views/EndModify.vue');

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/', name: 'home', component: Home,
      beforeEnter: () => {
        if (!currentUser.value) return { name: 'login' }
      }
    },
    { path: '/signup', name: 'signUp', component: SignUp },
    { path: '/login', name: 'login', component: Login },
    { path: '/searchresult', name: 'searchResult', component: SearchResult },
    { path: '/record/:id(\\d+)', name: 'record/id', component: Record },
    { path: '/modify/:id(\\d+)', name: 'modify/id', component: Modify },
    { path: '/endmodify/:id(\\d+)', name: 'endmodify/id', component: EndModify }
  ]
});

export default router;