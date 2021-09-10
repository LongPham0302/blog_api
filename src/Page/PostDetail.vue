<template>
  <div class="container">
    <!--sections-->
    <div class="row">
      <div class="col-lg-8">
        <!--section-->
        <div
          class="ass1-section__list"
          v-if="getDataPostDetail && getDataPostDetail.post"
        >
          <div class="ass1-section">
            <post-item v-bind:post="getDataPostDetail.post" />
          </div>
          <ul>
            <li v-for="item in getDataPostDetail.categories" v-bind:key="item.TAG_ID">
              <!-- {{ item.tag_value }} -->
              <router-link v-bind:to="getLinkCategory(item)">
                {{ item.tag_value }}
              </router-link>
            </li>
          </ul>
          <post-comment-add />

          <post-comments v-bind:comment="getDataPostDetail.comments" />
        </div>
      </div>
      <div class="col-lg-4">
        <sidebar />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar";
import PostItem from "../components/PostItem";
import PostFeeling from "../components/PostFeeling";
import PostComments from "../components/PostComments";
import PostCommentAdd from "../components/PostCommentAdd";
import { mapActions, mapGetters } from "vuex";
import { removeVietnameseFromString } from "../helps";

export default {
  name: "post-detail",
  components: {
    Sidebar,
    PostFeeling,
    PostComments,
    PostCommentAdd,
    PostFeeling,
    PostItem,
  },
  data() {
    return {
      postId: this.$route.params.id,
    };
  },
  watch: {
    $route(to, from) {
      this.postId = to.params.id;
      this.fechDataPostDetail();
      console.log(to, from);
    },
  },
  created() {
    this.fechDataPostDetail();
  },
  computed: {
    ...mapGetters({ getDataPostDetail: "post/getDataPostDetail" }),
  },
  methods: {
    ...mapActions({ getPostDetailById: "post/getPostDetailById" }),
    fechDataPostDetail() {
      this.getPostDetailById(this.postId).then((res) => {
        if (!res.ok) {
          this.$router.push("/");
        }
      });
    },
    getLinkCategory(category) {
      return {
        name: "home-page",
        query: {
          text: removeVietnameseFromString(category.tag_value),
          tagIndex: parseInt(category.tag_index),
        },
      };
    },
  },
};
</script>

<style>
.ass1-section__post-detail {
  margin-top: 44px;
}
.ass1-section__post-detail .ass1-section .ass1-section {
  box-shadow: none;
  padding: 0;
  border-bottom: solid 1px #f3f3f3;
}
.list-categories {
  padding-bottom: 20px;
}
.list-categories ul {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -5px;
}
.list-categories ul li {
  margin: 5px;
}
.list-categories ul li a {
  color: #333;
  font-size: 14px;
  display: block;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 3px 10px;
  transition: all 0.3s ease;
}
.list-categories ul li a:hover {
  background-color: #333;
  border-color: #333;
  color: #fff;
}
/* .ass1-section__post-detail > .ass1-section {
        padding: 0;
    } */
</style>
