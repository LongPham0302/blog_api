<template>
  <div class="ass1-section__item" v-if="post">
    <div class="ass1-section">
      <post-item-head v-bind:post="post" />
      <post-item-content v-bind:post="post" />
      <post-item-footer v-bind:post="post" />
    </div>
  </div>
</template>
<script>
import PostItemContent from "./PostItemContent.vue";
import PostItemFooter from "./PostItemFooter.vue";
import PostItemHead from "./PostItemHead.vue";
export default {
  components: { PostItemHead, PostItemContent, PostItemFooter },
  name: "post-item",
  props: {
    post: { type: Object, default: null },
  },
};
</script>
