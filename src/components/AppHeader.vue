<template>
  <header>
    <div class="ass1-header" v-if="currentUser">
      <div class="container">
        <router-link to="/" class="ass1-logo">Blog Meme </router-link>

        <app-navigation />

        <app-header-search />

        <router-link to="/upload" class="ass1-header__btn-upload ass1-btn">
          <i class="icon-Upvote"></i> Upload
        </router-link>

        <!-- If Not Login -->
        <router-link v-if="!isLogin" to="/login" class="ass1-header__btn-upload ass1-btn">
          Login
        </router-link>

        <!-- If Already Login -->
        <div v-else class="wrapper-user">
          <a class="user-header">
            <span class="avatar">
              <img v-bind:src="getAvatar" alt="avatar" />
            </span>
            <span class="email">{{ currentUser.email }}</span>
          </a>

          <div v-on:click="handleLogout" class="logout">Logout</div>
        </div>
      </div>
    </div>
    <router-link
      v-if="this.currentUser"
      v-bind:to="LinkUser"
      class="ass1-head-user__btn-follow ass1-btn tt"
    >
      Profile
    </router-link>
  </header>
</template>

<script>
import AppHeaderSearch from "./AppHeaderSearch";
import AppNavigation from "./AppNavigation";
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  name: "app-header",
  components: {
    AppNavigation,
    AppHeaderSearch,
  },
  computed: {
    ...mapGetters({
      isLogin: "user/isLogin",
      currentUser: "user/currentUser",
      isLogin: "user/isLogin",
    }),
    getAvatar() {
      if (this.currentUser.profilepicture) {
        return this.currentUser.profilepicture;
      } else {
        return "/dist/images/default-avatar.png";
      }
    },
    LinkUser() {
      return {
        name: "user-page",
        params: {
          id: this.currentUser.USERID,
        },
      };
    },
  },
  methods: {
    ...mapActions({ logout: "user/logout" }),
    handleLogout() {
      var check = confirm("bạn muốn out ?");
      this.logout().then((res) => {
        this.$router.push("/login");
      });
    },
  },
};
</script>

<style scoped>
.user-header {
  position: relative;
  color: #1e1633;
  transition: all 0.2s ease;
  display: inline-block;
}
.user-header:hover {
  color: #3482e2;
}
.user-header > span {
  display: inline-block;
  vertical-align: middle;
}
.user-header .avatar {
  width: 35px;
  height: 35px;
  margin-right: 4px;
  border-radius: 100%;
  overflow: hidden;
}
.user-header .avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.wrapper-user {
  position: relative;
}
.logout {
  right: 0;
  top: 100%;
  position: absolute;
  background-color: #fff;
  padding: 10px 30px;
  min-width: 150px;
  text-align: right;
  border-radius: 3px;
  box-shadow: 0 0 5px 0px rgba(0, 0, 0, 0.1);
  z-index: 0;
  transition: all 0.3s ease;
  opacity: 0;
  pointer-events: none;
  cursor: pointer;
}
.wrapper-user .logout:hover,
.wrapper-user .user-header:hover + .logout {
  opacity: 1;
  z-index: 2;
  pointer-events: auto;
}
.ass1-header__nav > .container ul {
  flex-direction: row;
  flex-wrap: wrap;
}
.ass1-header__nav > .container ul li {
  flex: 0 0 25%;
  max-width: 25%;
}
.ass1-header__nav > .container ul li:first-child {
  margin-top: 8px;
}
.tt {
  margin-left: 90%;
  width: 100px;
}
</style>
