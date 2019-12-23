import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import "@/assets/app.scss"
import routes from './route';

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({routes});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
