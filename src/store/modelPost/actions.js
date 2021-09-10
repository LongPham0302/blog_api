import axiosInstance from "../../plugin/axios";
import { PAGE_SIZE, CURRENT_PAGE } from "../../constants";
import { CONFIG_ACCESS_TOKEN } from '../../constants'

export default {

    async getListPostHasPaging({ commit }, { pagesize = PAGE_SIZE, currPage = CURRENT_PAGE, tagIndex = null }) {
        commit('SET_LOADING', true, { root: true })
        try {

            var config = {
                params: {
                    currPage,
                    pagesize,
                }
            }
            if (tagIndex) {
                config.params.tagIndex = tagIndex
                var result = await axiosInstance.get('/post/getListByCategory.php', config);
            } else {
                var result = await axiosInstance.get('/post/getListPagination.php', config);

            }
            commit('SET_LOADING', false, { root: true })

            if (result.data.status == 200) {
                if (currPage === 1) {
                    commit('SET_LIST_POSTS', result.data.posts)
                } else if (currPage > 1) {
                    commit('PUSH_LIST_POSTS', result.data.posts)
                }
            }

        } catch (err) {
            commit('SET_LOADING', false, { root: true });
            console.log('lỗi', err)
        }
    },
    async getPostDetailById({ commit, dispatch }, postId) {
        commit('SET_LOADING', true, { root: true });
        try {
            var result = await axiosInstance.get('/post/post.php?postid=' + postId);

            if (result.data.status === 200) {
                var promiseUser = dispatch('user/getUserById', result.data.data.post.USERID, { root: true })
                var promiseComments = dispatch('getListCommentByPostid', postId)

                let [resultUser, resultComments] = await Promise.all([promiseUser, promiseComments]);
                let dataPostDetail = {
                    ...result.data.data,
                    comment: []
                }
                if (resultComments.ok) {
                    dataPostDetail.comment = resultComments.comment
                }
                commit('SET_LOADING', false, { root: true });
                commit('SET_POST_DETAIL', dataPostDetail)
                return {
                    ok: true,
                    data: result.data,
                    error: true
                }
            }
        } catch (error) {
            commit('SET_LOADING', false, { root: true });
            return {
                ok: false,
                error: error.message
            }
        }
    },
    async getListPostSearch({ commit }, searchStr) {
        try {
            var result = await axiosInstance.get('/post/search.php?query=' + searchStr);
            console.log(result);
            if (result.data.status === 200) {
                console.log(result);

                return {
                    ok: true,
                    post: result.data.posts
                }
            } else {
                return {
                    ok: false
                }
            }
        } catch (error) {
            commit('SET_LOADING', false, { root: true });
            return {
                ok: false,
                error: error.message
            }
        }
    },
    async createNewPost({ commit }, {
        post_content = '',
        category = '',
        url_image = '',
        obj_image = null
    }) {
        try {
            let bodyFormData = new FormData();
            bodyFormData.append('category', category)
            bodyFormData.append('url_image', url_image)
            bodyFormData.append('post_content', post_content)
            if (obj_image) {
                bodyFormData.append('obj_image', obj_image)
            }
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
                }
            }

            var result = await axiosInstance.post('/post/addNew.php', bodyFormData, config);
            console.log('addNew', result);
            if (result.data.status === 200) {
                return {
                    ok: true,
                    data: result.data.data // posts - categories
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
    async getListCommentByPostid({ commit }, postid) {
        try {
            var result = await axiosInstance.get('/comment/comments.php?postid=' + postid);
            if (result.status === 200) {
                return {
                    ok: true,
                    comment: result.data.comments
                }
            } else {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch (error) {

        }
    },
    async addNewComment({ commit, rootState }, { comment = '', postid = null }) {
        try {
            let data = {
                comment,
                postid
            }
            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
                }
            }
            var result = await axiosInstance.post('/comment/add_new.php', data, config);
            console.log('result', result);
            if (result.data.status === 200) {
                let comment = {
                    ...result.data.body,
                    fullname: rootState.user.currentUser.fullname,
                    profilepicture: rootState.user.currentUser.profilepicture,
                }
                commit('PUST_LIST_COMMENTS', comment);

                return {
                    ok: true,
                    comment: comment
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
                error: result.data.error
            }
        }
    }
}