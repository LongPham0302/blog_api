<template>
  <main>
    <div class="container">
      <div class="row">
        <div class="col-lg-8">
          <post-list />
        </div>
        <div class="col-lg-4">
          <sidebar />
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import PostList from "../components/PostList.vue";
import Sidebar from "../components/Sidebar.vue";
import { mapActions } from "vuex";
export default {
  components: { Sidebar, PostList },
  name: "homepage",
  watch: {
    $route(to, from) {
      var tagIndex = to.query.tagIndex;
      if (tagIndex) {
        this.getListPostHasPaging({ tagIndex });
      } else {
        this.getListPostHasPaging({});
      }
    },
  },
  created() {
    var tagIndex = this.$route.query.tagIndex;
    this.getListPostHasPaging({ tagIndex });
  },
  methods: {
    ...mapActions({
      getListPostHasPaging: "post/getListPostHasPaging",
    }),
  },
};
</script>
