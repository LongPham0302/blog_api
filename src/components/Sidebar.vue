<template>
  <aside class="ass1-aside">
    <div class="ass1-content-head__t">
      <div>Bài viết gần đây của bạn.</div>
    </div>
    <div v-if="!isLogin">
      Vui lòng đăng nhập để xem nội dung này
      <router-link to="/login">Đăng nhập</router-link>
    </div>
    <div
      v-else-if="isLogin && getListPostOfCurrentUser && getListPostOfCurrentUser.length"
    >
      <post-item
        v-for="item in getListPostOfCurrentUser"
        v-bind:key="item.PID"
        v-bind:post="item"
      />
    </div>
  </aside>
</template>
<script>
import { mapGetters } from "vuex";
import PostItem from "./PostItem";
export default {
  name: "side-bar",
  components: {
    PostItem,
  },
  computed: {
    ...mapGetters({
      isLogin: "user/isLogin",
      getListPostOfCurrentUser: "user/getListPostOfCurrentUser",
    }),
  },
};
</script>
