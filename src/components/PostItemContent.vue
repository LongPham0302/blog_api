<template>
  <div class="ass1-section__content">
    <p v-if="!querySearch">{{ formatFullnamePost }}</p>
    <p v-else="querySearch" v-html="formatFullnamePost"></p>
    <div class="ass1-section__image">
      <router-link v-bind:to="getUserLink">
        <img v-bind:src="post.url_image" alt="" />
      </router-link>
    </div>
  </div>
</template>
<script>
import { replaceAll } from "../helps";

export default {
  name: "post-item-content",
  props: {
    post: { type: Object, default: null },
  },
  data() {
    return { querySearch: this.$route.query.query };
  },
  watch: {
    $route(to, from) {
      this.querySearch = to.query.query;
    },
  },
  computed: {
    getUserLink() {
      return { name: "post-detail", params: { id: this.post.PID } };
    },
    formatFullnamePost() {
      if (this.querySearch) {
        return replaceAll(
          this.post.post_content,
          this.querySearch,
          `<mark>${this.querySearch}</mark>`
        );
      } else {
        return this.post.post_content;
      }
    },
  },
};
</script>
