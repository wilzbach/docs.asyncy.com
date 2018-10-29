<template>
  <header class="navbar">
    <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')"/>
    <router-link to="/" class="home-link">
      <!-- <a-logo /> -->
      <a-logo icon variant="light" />
      <a-badge state="primary" class="text--light home-badge" lower>Beta</a-badge>
    </router-link>
    <div class="links">
      <AlgoliaSearchBox v-if="isAlgoliaSearch" :options="algolia"/>
      <SearchBox v-else-if="$site.themeConfig.search !== false"/>
      <NavLinks class="can-hide"/>
    </div>
  </header>
</template>

<script>
import SidebarButton from './SidebarButton.vue'
import AlgoliaSearchBox from './AlgoliaSearchBox'
import SearchBox from './SearchBox.vue'
import NavLinks from './NavLinks.vue'

export default {
  components: { SidebarButton, NavLinks, SearchBox, AlgoliaSearchBox },
  computed: {
    algolia () {
      return this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
    },
    isAlgoliaSearch () {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName
    }
  }
}
</script>

<style lang="scss">
@import "@asyncy/vue/dist/sass/utils/_breakpoint.scss";

.home-link {
  // vertical-align: middle;
  display: inline-flex !important;
  flex: 0 0 auto;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  height: 100%;
  padding: .75rem 2rem;
  svg {
    height: 30px;
    margin-right: .5rem;
  }
  .home-badge {
    @include breakpoint(max s) {
      display: none !important;
    }
  }
}
</style>
<style lang="stylus">
@import './styles/config.styl'

.navbar
  // padding 1.3rem 30px
  // line-height $navbarHeight - 2.6rem
  position relative
  a, span, img
    display inline-block
  .logo
    height $navbarHeight - 2.7rem
    min-width $navbarHeight - 2.6rem
    margin-right 0.8rem
    vertical-align top
  .links
    font-size 0.9rem
    position absolute
    padding-right 2rem
    padding-top 0
    top 0
    right 0
    height 100%
    display flex
    align-items center
    box-sizing border-box

@media (max-width: $MQMobile)
  .navbar
    padding-left 4rem
    .can-hide
      display none
</style>
