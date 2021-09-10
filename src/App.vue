<template>
  <div id="app">
    <app-header v-if="isRenderHeader" />
    <main>
      <div class="container">
        <router-view></router-view>
      </div>
    </main>
    <app-footer v-if="isRenderFooter" />
    <loading v-bind:class="{ show: isLoading }" />
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import Loading from "./components/Loading";
import $ from "jquery";
import { mapActions, mapState } from "vuex";
export default {
  name: "app",
  components: {
    AppHeader,
    AppFooter,
    Loading,
  },
  computed: {
    ...mapState(["isLoading"]),

    isRenderHeader() {
      var arrRouter = ["login", "register"];
      var routerName = this.$route.name;
      if (arrRouter.indexOf(routerName) !== -1) return false;
      return true;
    },
    isRenderFooter() {
      var arrRouter = ["home-page", "post-detail"];
      var routerName = this.$route.name;
      if (arrRouter.indexOf(routerName) !== -1) return false;
      return true;
    },
  },
  methods: {
    ...mapActions({
      getListPostHasPaging: "post/getListPostHasPaging",
      checkPost: "user/checklogin",
    }),
  },

  created() {
    this.checkPost();
  },
};
</script>

<style></style>
