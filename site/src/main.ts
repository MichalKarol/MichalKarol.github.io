import Vue from 'vue';
import VueMeta from 'vue-meta';
// @ts-ignore
import VueAnalytics from 'vue-analytics';
import App from './App.vue';
import router from './router';
import store from './store';
import resource from 'vue-resource';
import './registerServiceWorker';

Vue.config.productionTip = false;
Vue.use(resource);
Vue.use(VueMeta, { refreshOnceOnNavigation: true});
Vue.use(VueAnalytics, { id: 'UA-113165493-4', router });

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
