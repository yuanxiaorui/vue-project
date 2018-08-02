import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
    count: 1
}

const mutations = {
    add: function(state, n) {
        state.count+=n
    },
    reduce(state) {
        state.count-=1
    }
}

const getters = {
    count: function(state) {
        // return state.count+=100
        return state.count
    }
}

const actions = {
    addActions(context) {
        setTimeout(() => {
            context.commit('add',10)
        },1000)
        console.log('我比reduce提前执行');
    },
    reduceAction({commit}) {
        commit('reduce')
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})