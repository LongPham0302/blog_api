import Vue from 'vue';
import { CONFIG_ACCESS_TOKEN } from '../../constants'

export default {
    SET_USER_INFO(state, user) {
        Vue.set(state.users, user.USERID, user)
    },
    SET_POST_INFO(state, { post, userid }) {
        Vue.set(state.post, userid, post)
    },
    SET_LOGIN_INFO(state, { user = null, token = '', message = '' }) {
        localStorage.setItem(CONFIG_ACCESS_TOKEN, token)
        state[CONFIG_ACCESS_TOKEN] = token;
        state.currentUser = user;
    },
    SET_LOGOUT(state) {
        state[CONFIG_ACCESS_TOKEN] = '';
        state.currentUser = null;
        // 'ACCESS_TOKEN'
        localStorage.removeItem(CONFIG_ACCESS_TOKEN)
    },
    SET_CURRENT_USER(state, user) {
        state.currentUser = user;
    }
}