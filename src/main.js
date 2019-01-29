import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'

var config = {
  apiKey: "AIzaSyA8DwMHR3lr_9dsQy4yYDcAIVMb2Io4E2Q",
  authDomain: "todolist-6dd80.firebaseapp.com",
  databaseURL: "https://todolist-6dd80.firebaseio.com",
  projectId: "todolist-6dd80",
  storageBucket: "todolist-6dd80.appspot.com",
  messagingSenderId: "4083858646"
};
firebase.initializeApp(config);

Vue.use(VueFire)

export const db = firebase.firestore()

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
