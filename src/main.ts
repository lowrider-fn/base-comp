import Vue from 'vue'

import App from './App'
import store from './store/index'
import './assets/normalize.css'
Vue.config.productionTip = false

new Vue({
	store,
	render: (h) => h(App),
}).$mount('#app')
