import { createRouter, createWebHashHistory } from 'vue-router';

import Home from '@/views/Home.vue';
import SearchResult from '@/views/SearchResult.vue';
import Record from '@/views/Record.vue';
import Modify from '@/views/Modify.vue';
import EndModify from '@/views/EndModify.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/searchresult', name: 'searchResult', component: SearchResult },
    { path: '/record/:id(\\d+)', name: 'record/id', component: Record },
    { path: '/modify/:id(\\d+)', name: 'modify/id', component: Modify },
    { path: '/endmodify/:id(\\d+)', name: 'endmodify/id', component: EndModify }
  ]
});

export default router;