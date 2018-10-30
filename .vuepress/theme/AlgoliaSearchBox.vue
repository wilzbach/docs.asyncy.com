<template>
  <form id="search-form" class="search-box">
    <input id="algolia-search-input" class="search-query" placeholder="Search documentation">
  </form>
</template>

<script>
export default {
  props: ['options'],
  mounted () {
    this.initialize()
  },
  methods: {
    initialize () {
      Promise.all([
        import(/* webpackChunkName: "docsearch" */ 'docsearch.js/dist/cdn/docsearch.min.js'),
        import(/* webpackChunkName: "docsearch" */ 'docsearch.js/dist/cdn/docsearch.min.css')
      ]).then(([docsearch]) => {
        docsearch = docsearch.default
        docsearch(Object.assign(this.options, {
          debug: true,
          inputSelector: '#algolia-search-input'
        }))
      })
    }
  },
  watch: {
    options (newValue) {
      this.$el.innerHTML = '<input: id="algolia-search-input" class="search-query">';
      this.initialize(newValue)
    }
  }
}
</script>

<style lang="scss">
@import "@asyncy/vue/dist/sass/utils/_breakpoint.scss";

.search-query {
  vertical-align: baseline !important;
}

.ds-dropdown-menu {
  min-width: 350px !important;
}
</style>
