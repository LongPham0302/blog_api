<template>
  <div class="ass1-comments">
    <div class="ass1-comments__head">
      <div class="ass1-comments__title">{{ comment.length }}</div>
      <div class="ass1-comments__options">
        <span>Sắp xếp theo:</span>
        <a href="#" class="ass1-comments__btn-upvote ass1-btn-icon"
          ><i class="icon-Upvote"></i
        ></a>
        <a href="#" class="ass1-comments__btn-down ass1-btn-icon"
          ><i class="icon-Downvote"></i
        ></a>
        <a href="#" class="ass1-comments__btn-expand ass1-btn-icon"
          ><i class="icon-Expand_all"></i
        ></a>
      </div>
    </div>
    <post-comment-item v-for="cmt in comment" v-bind:key="cmt.CID" v-bind:cmt="cmt" />
  </div>
</template>
<script>
import PostCommentItem from "./PostCommentItem.vue";

export default {
  name: "post-comment",
  components: { PostCommentItem },
  props: {
    comment: { type: Array, default: [] },
  },
};
</script>
