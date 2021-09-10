<template>
  <div class="ass1-head-user" v-if="userInfor">
    <div class="ass1-head-user__content">
      <div class="ass1-head-user__image">
        <a href="#"><img v-bind:src="getAvatar" /></a>
      </div>
      <div class="ass1-head-user__info">
        <div class="ass1-head-user__info-head">
          <div class="ass1-head-user__name">
            <span>{{ userInfor.fullname }}</span>
            <i><img src="/dist/fonts/emotion/svg/Verified.svg" alt="Verified" /></i>
          </div>
          <div class="w-100"></div>
          <a
            href="#"
            v-on:click.prevent="Monitor"
            v-if="!isCurrrentUser"
            class="ass1-head-user__btn-follow ass1-btn"
          >
            Theo dõi
          </a>
          <template>
            <router-link
              v-if="isCurrrentUser"
              v-bind:to="{ name: 'change-password', params: { id: userInfor.USERID } }"
              class="ass1-head-user__btn-follow ass1-btn"
            >
              Đổi mật khẩu
            </router-link>
            <router-link
              v-if="isCurrrentUser"
              v-bind:to="{ name: 'user-profile', params: { id: userInfor.USERID } }"
              class="ass1-head-user__btn-follow ass1-btn"
            >
              Profile
            </router-link>
          </template>
        </div>
        <div class="ass1-head-user__info-statistic">
          <div class="ass1-btn-icon">
            <i class="icon-Post"></i><span>Bài viết:{{ countPost }} </span>
          </div>
          <div class="ass1-btn-icon">
            <i class="icon-Followers"></i><span>Theo dõi: 0</span>
          </div>
          <div class="ass1-btn-icon">
            <i class="icon-Following"></i><span>Đang theo dõi:0</span>
          </div>
        </div>
        <p></p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "user-page-info",
  data() {
    return { counter: 0 };
  },
  props: {
    userInfor: { type: Object, default: null },
    countPost: { type: Number, default: 0 },
  },
  computed: {
    ...mapGetters({
      currentUser: "user/currentUser",
    }),
    ...mapState({ listTask: (state) => state.post.userFlowing }),

    getAvatar() {
      if (this.userInfor.profilepicture) {
        return this.userInfor.profilepicture;
      } else {
        return "/dist/images/default-avatar.png";
      }
    },
    isCurrrentUser() {
      if (this.userInfor && this.currentUser) {
        if (this.userInfor.USERID == this.currentUser.USERID) return true;
      }
      return false;
    },
  },
};
</script>

<style></style>
