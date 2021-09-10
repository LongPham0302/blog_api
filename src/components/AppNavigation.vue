<template>
  <nav>
    <ul class="ass1-header__menu">
      <li>
        <a href="javascript:void(0)">Danh mục</a>
        <div class="ass1-header__nav" style="display: none">
          <div class="container">
            <ul>
              <li
                v-for="item in categories"
                v-bind:key="categories.id"
                v-bind:categories="categories"
              >
                <router-link v-bind:to="getLinkCategory(item)">{{
                  item.text
                }}</router-link>
              </li>
            </ul>
          </div>
          <div class="ass1-header__menu-transition"></div>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapState } from "vuex";
import { removeVietnameseFromString } from "../helps";
import $ from "jquery";

export default {
  name: "app-navigation",
  computed: {
    ...mapState({ categories: (state) => state.post.categories }),
  },
  methods: {
    getLinkCategory(category) {
      return {
        name: "home-page",
        query: {
          text: removeVietnameseFromString(category.text),
          tagIndex: parseInt(category.id),
        },
      };
    },
  },
  mounted() {
    $(".ass1-header__menu li > a").click(function (e) {
      // $(".ass1-header__nav").hide();
      $(this).parent().find(".ass1-header__nav").slideToggle(300, "swing");
    });

    $(".ass1-header__nav ul li > a").click(function (e) {
      $(this).parents(".ass1-header__nav").slideUp(300, "swing");
    });
  },
};
</script>

<style>
.ass1-header__nav > .container ul {
  width: 100%;
  flex-wrap: wrap;
  flex-direction: row;
}
.ass1-header__nav > .container ul li {
  width: 25%;
}
.ass1-header__nav > .container ul li:first-child {
  margin-top: 8px;
}
</style>
