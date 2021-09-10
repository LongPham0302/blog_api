<template>
  <div class="ass1-section__list">
    <post-item v-for="item in getListPost" v-bind:key="item.PID" v-bind:post="item" />
    <button
      v-on:click="handleLoadMore"
      v-if="getListPost && getListPost.length"
      class="load-more ass1-btn"
    >
      <span>Xem thêm</span>
    </button>
    <div v-else>danh sách rỗng</div>
  </div>
</template>
<script>
import PostItem from "./PostItem.vue";
import { mapGetters, mapActions } from "vuex";
import { PAGE_SIZE, CURRENT_PAGE } from "../constants";
export default {
  components: { PostItem },
  name: "post-list",
  data() {
    return {
      pagesize: PAGE_SIZE,
      currPage: CURRENT_PAGE,
      tagIndex: parseInt(this.$route.query.tagIndex),
    };
  },
  computed: {
    ...mapGetters({ getListPost: "post/getListPost" }),
  },
  watch: {
    $route(to, from) {
      this.tagIndex = to.query.tagIndex;
      this.currPage = 1;
    },
  },
  methods: {
    ...mapActions({ getListPostHasPaging: "post/getListPostHasPaging" }),
    handleLoadMore() {
      this.currPage = this.currPage + 1;
      let obj = {
        pagesize: this.pagesize,
        currPage: this.currPage,
        tagIndex: this.tagIndex,
      };
      this.getListPostHasPaging(obj);
    },
  },
};
</script>
