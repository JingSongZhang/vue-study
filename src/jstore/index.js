import Vue from 'vue'
import Vuex from './jvuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0
  },
  mutations: {
    add(state){
      state.counter++
    }
  },
  actions: {
    add({commit}, payload){
      setTimeout(() => {
        console.log(payload)
        commit('add')
      }, 300)
    }
  },
  getters: {
    doubleCounter(state) {
      return state.counter * 2
    }
  },
  modules: {
  }
})
