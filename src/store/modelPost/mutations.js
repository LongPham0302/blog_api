export default {
    SET_LIST_POSTS(state, data) {
        state.ListPosts = data;
    },
    PUSH_LIST_POSTS(state, data) {
        state.ListPosts = [...state.ListPosts, ...data]
    },
    SET_POST_DETAIL(state, data) {
        state.PostDetail = data
    },
    PUST_LIST_COMMENTS(state, comment) {
        state.PostDetail.comment.push(comment);
    }
}