import Vue from 'vue'
import store from 'vuex'
import axios from 'axios'

Vue.prototype.$axios = axios
store.$axios = axios