import Vue from 'vue'
import App from './App.vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

new Vue({
  el: '#app',
  render: h => h(App)
})

// var client: Client = window
//       // @ts-ignore
//       .require('electron')
//       .remote.require('./main')
//       .getSshClient()