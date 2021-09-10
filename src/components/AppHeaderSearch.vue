<template>
  <div class="ass1-header__search">
    <form v-on:submit.prevent="handleSearch">
      <label>
        <input
          v-model="querySearch"
          type="search"
          name="search-text"
          class="form-control"
          placeholder="Nhập từ khóa ..."
        />
        <i class="icon-Search"></i>
      </label>
    </form>
  </div>
</template>

<script>
export default {
  name: "app-header-search",
  data() {
    return {
      querySearch: "",
    };
  },
  watch: {
    $route(to, from) {
      this.querySearch = to.query.query;
    },
  },
  methods: {
    handleSearch() {
      if (this.querySearch) {
        this.$router.push({
          name: "search",
          query: { query: this.querySearch },
        });
      }
      this.querySearch = "";
    },
  },
};
</script>

<style></style>
