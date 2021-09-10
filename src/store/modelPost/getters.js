export default {
    getListPost: state => {
        return state.ListPosts;
    },
    getDataPostDetail(state, commit, rootState) {
        if (state.PostDetail) {
            var USERID = state.PostDetail.post.USERID;
            var user = rootState.user.users[USERID];

            if (user) {
                var data = {
                    post: {
                        ...state.PostDetail.post,
                        fullname: user.fullname,
                        profilepicture: user.profilepicture
                    },
                    categories: state.PostDetail.categories,
                    comments: state.PostDetail.comment,
                }
                return data;
            }
        }
    },

}