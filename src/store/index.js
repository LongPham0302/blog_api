import Vue from 'vue'
import Vuex from 'vuex'
import moduleEx from './moduleExample'
import modulespost from './modelPost'
import modulesuser from './modelUser'

Vue.use(Vuex)
const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        isLoading: false
    },
    actions: {
        SetLoading({ commit }, loading = false) {
            commit('SET_LOADING', loading)
        }
    },
    mutations: {
        SET_LOADING: (state, loading = false) => {
            state.isLoading = loading;
        }
    },
    modules: {
        moduleEx,
        post: modulespost,
        user: modulesuser
    }
})
export default store;