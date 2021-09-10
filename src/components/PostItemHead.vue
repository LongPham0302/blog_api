<template>
  <div class="ass1-section__head">
    <router-link v-bind:to="getUserLink" class="ass1-section__avatar ass1-avatar">
      <img v-bind:src="getAvatar" />
    </router-link>
    <div>
      <router-link
        v-if="querySearch"
        v-bind:to="getUserLink"
        class="ass1-section__name"
        v-html="formatFullname"
      >
      </router-link>
      <router-link v-else v-bind:to="getUserLink" class="ass1-section__name"
        >{{ formatFullname }}
      </router-link>
      <span class="ass1-section__passed">{{ formatTimeAdded }}</span>
    </div>
  </div>
</template>
<script>
import { replaceAll } from "../helps";
import moment from "moment";
export default {
  name: "post-item-head",
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
    getAvatar() {
      if (this.post.profilepicture) {
        return this.post.profilepicture;
      } else {
        return "/dist/images/default-avatar.png";
      }
    },
    getUserLink() {
      let userid = this.post.USERID || 1;
      return { name: "user-page", params: { id: userid } };
    },
    formatTimeAdded() {
      moment.locale("vi");
      return moment(this.post.time_added).fromNow();
    },
    formatFullname() {
      if (this.querySearch) {
        return replaceAll(
          this.post.fullname,
          this.querySearch,
          `<mark>${this.querySearch}</mark>`
        );
      } else {
        return this.post.fullname;
      }
    },
  },
};
</script>
