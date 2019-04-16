<template>
  <form class="search-form">
    <a-input
      placeholder="Search documentation"
      id="algolia-search-input"
      background="light"
      :icon-right="['a-icon', { icon: 'search'}]"
    />
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
          inputSelector: '#algolia-search-input input'
        }))
      })
    }
  },
  watch: {
    options (newValue) {
      this.$el.innerHTML = '<input: id="algolia-search-input" class="search-query input">';
      this.initialize(newValue)
    }
  }
}
</script>

<style lang="scss">
.search-form {
  padding: 2rem 0 !important;
}

.algolia-autocomplete {
  .input {
    padding-right: 2.25rem !important;
  }

  &,
  &.algolia-autocomplete-right .ds-dropdown-menu {
    width: 100%;
    max-width: 100%;
  }
  .ds-dropdown-menu {
    min-width: auto !important;
  }
}
</style>
