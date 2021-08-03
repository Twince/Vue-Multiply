import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const options = {
    // You can set your default options here
};

Vue.use(Toast, options);

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app') 
