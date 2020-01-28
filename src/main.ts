import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import VueGtag from 'vue-gtag';
import '@babel/polyfill';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';

Vue.config.productionTip = false;

Vue.use(VueGtag, {
    config: { id: 'UA-88119919-2' },
  }, router);

new Vue({
    router,
    store,
    vuetify,
    async  beforeCreate() {
        this.$store.dispatch('init');
        //    this.$mount('#app')
    },
    render: (h) => h(App),
}).$mount('#app');
