import { createRouter, createWebHashHistory } from 'vue-router';

const Home = () => import('@/views/Home.vue');
const SignUp = () => import('@/views/SignUp.vue');
const MyPage = () => import('@/views/MyPage.vue');
const SearchResult = () => import('@/views/SearchResult.vue');
const Record = () => import('@/views/Record.vue');
const Modify = () => import('@/views/Modify.vue');
const EndModify = () => import('@/views/EndModify.vue');

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/signup', name: 'signUp', component: SignUp },
    { path: '/mypage', name: 'myPage', component: MyPage },
    { path: '/searchresult', name: 'searchResult', component: SearchResult },
    { path: '/record/:id(\\d+)', name: 'record/id', component: Record },
    { path: '/modify/:id(\\d+)', name: 'modify/id', component: Modify },
    { path: '/endmodify/:id(\\d+)', name: 'endmodify/id', component: EndModify }
  ]
});

export default router;