import axiosInstance from "../../plugin/axios";
import { parseJwt } from "../../helps";
import { CONFIG_ACCESS_TOKEN } from '../../constants'

export default {
    async getUserById({ commit }, userid) {
        try {
            var result = await axiosInstance.get('/member/member.php?userid=' + userid);
            if (result.data.status === 200) {
                commit('SET_USER_INFO', result.data.user)
                return {
                    ok: true,
                    data: result.data.user,
                    error: null
                }
            } else {
                return {
                    ok: false
                }
            }

        } catch (error) {
            return {
                ok: false,
                error: error.message
            }
        }
    },
    async login({ commit, dispatch }, { email = '', password = '' }) {
        try {
            let data = {
                email,
                password
            }
            var result = await axiosInstance.post('/member/login.php', data);
            if (result.data.status === 200) {

                commit('SET_USER_INFO', result.data.user)
                commit('SET_LOGIN_INFO', result.data)
                console.log('result', result);
                dispatch('getListPostByUserId', result.data.user.USERID);
                return {
                    ok: true,
                    error: null,
                    data: result.data
                }
            } else {
                return {
                    ok: false,
                    error: result.data.error
                }
            }

        } catch (error) {
            return {
                ok: false,
                error: error.message,
            }
        }
    },
    async checklogin({ commit, dispatch }) {
        try {
            let tokenLocal = localStorage.getItem(CONFIG_ACCESS_TOKEN)
            let userObj = parseJwt(tokenLocal)
            if (userObj) {
                let promiseUser = dispatch('getUserById', userObj.id);
                let promisePostUser = dispatch('getListPostByUserId', userObj.id)
                let [resultUser, resultPosrUser] = await Promise.all([promiseUser, promisePostUser])
                if (resultUser.ok && resultPosrUser.ok) {
                    let data = {
                        user: resultUser.data, //user: resultUser.data
                        token: tokenLocal
                    }
                    commit('SET_LOGIN_INFO', data)
                    return {
                        ok: true,
                        error: null
                    }
                }
            }
            return {
                ok: false
            }
        } catch (error) {
            return {
                ok: false,
                error: error.message
            }
        }
    },
    async logout({ commit }) {
        commit('SET_LOGOUT')
    },
    async getListPostByUserId({ commit }, userid) {
        try {
            let config = {
                params: {
                    userid
                },
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
                }
            }
            let results = await axiosInstance.get('/post/getListPostUserID.php', config);
            if (results.data.status === 200) {
                let objData = {
                    post: results.data.posts,
                    userid: userid
                }
                commit('SET_POST_INFO', objData)
                return {
                    ok: true,
                    error: null,
                    post: results.data.posts || []
                }
            }
            return {
                ok: false
            }
        } catch (error) {
            return {
                ok: false,
                error: error.message
            }
        }
    },
    async register({ commit, dispatch }, data) {
        try {
            let result = await axiosInstance.post('/member/register.php', data);
            if (result.data.status === 200) {
                commit('SET_USER_INFO', result.data.user)
                commit('SET_LOGIN_INFO', result.data)
                dispatch('getListPostByUserId', result.data.user.USERID);
                return {
                    ok: true
                }
            } else {
                return {
                    ok: false,
                    error: erro.data.error
                }
            }
        } catch (error) {
            return {
                ok: false,
                error: error.message
            }
        }
    },
    async updateProfile({ commit }, { fullname = '', description = '', gender = '', objFile = null }) {
        try {
            let bodyFormData = new FormData();

            bodyFormData.append('gender', gender);
            bodyFormData.append('fullname', fullname);
            bodyFormData.append('description', description);

            // For avatar
            if (objFile) {
                bodyFormData.append('avatar', objFile);
            }

            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
                }
            }

            let result = await axiosInstance.post('/member/update.php', bodyFormData, config);
            console.log('result', result);
            if (result.data.status === 200) {
                commit('SET_CURRENT_USER', result.data.user);
                return {
                    ok: true,
                    user: result.data.user
                }
            } else {
                return {
                    ok: false,
                    error: result.data.error
                }
            }

        } catch (error) {
            return {
                ok: false,
                error: error.message
            }
        }
    },
    async changePassword({ commit }, data) {
        try {
            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
                }
            }

            let result = await axiosInstance.post('/member/password.php', data, config);
            if (result.data.status === 200) {
                return {
                    ok: true,
                    message: result.data.message
                }
            } else {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch (error) {
            return {
                ok: false,
                error: error.message
            }
        }
    }
}