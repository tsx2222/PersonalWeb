import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isPause:false
  },
  mutations: {
    go(state) {
      this.state.isPause = false
    },
    stop(state){
      this.state.isPause = true
    }
  },
  actions: {
  },
  modules: {
  }
})
