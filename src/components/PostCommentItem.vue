<template>
  <div class="ass1-comments__section">
    <a href="#" class="ass1-comments__avatar ass1-avatar"
      ><img v-bind:src="renderAvatar" alt=""
    /></a>
    <div class="ass1-comments__content">
      <a href="#" class="ass1-comments__name">{{ cmt.fullname }}</a>
      <span class="ass1-comments__passed">{{ formatTimeCmt }}</span>
      <p>
        {{ cmt.comment }}
      </p>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "post-comment-item",
  props: {
    cmt: { type: Object, default: {} },
  },
  computed: {
    formatTimeCmt() {
      moment.locale("vi");
      return moment(this.cmt.time_added).fromNow();
    },
    renderAvatar() {
      if (this.cmt && this.cmt.profilepicture) {
        return this.cmt.profilepicture;
      }
      return "https://scontent.fhan14-2.fna.fbcdn.net/v/t1.6435-9/233185040_567287524403942_1074400347427152608_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=lc6KDmmydbQAX-I378p&_nc_ht=scontent.fhan14-2.fna&oh=b59ab6ece7bd969663b9473f7ec8084b&oe=614847E2";
    },
  },
};
</script>

<style>
.ass1-comments__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
