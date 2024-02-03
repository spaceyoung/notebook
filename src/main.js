import { createApp } from 'vue';
// import './style.css';
import App from './App.vue';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { en, ko } from 'vuetify/locale';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css';
// Router
import router from './router/index';
// Pinia
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
// Vuefire
import { VueFire, VueFireFirestoreOptionsAPI } from 'vuefire';
// Lottie
import Vue3Lottie from 'vue3-lottie';

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  locale: {
    locale: 'ko',
    fallback: 'en',
    messages: { en, ko },
  },
});
const pinia = createPinia();
const app = createApp(App);

pinia.use(piniaPluginPersistedstate);
app.use(vuetify).use(router).use(pinia)
  .use(Vue3Lottie, { name: 'LottieAnimation' })
  .use(VueFire, {
    modules: [VueFireFirestoreOptionsAPI()],
  }).mount('#app');