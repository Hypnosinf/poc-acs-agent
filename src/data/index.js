import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Store functionality
import modules from './modules'

// Create a new store
export default new Vuex.Store({
  modules
})
