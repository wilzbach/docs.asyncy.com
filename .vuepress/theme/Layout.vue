<template>
  <div>
    <div class="hero" v-if="$page.frontmatter.home">
      <a-stars absolute class="hero-stars" />
      <h1>Documentation</h1>
      <a-asset class="hero-book" variant="book" />
    </div>
    <div class="theme-container"
      v-waves
      :class="pageClasses"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd">
      <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar"/>
      <div class="sidebar-mask" @click="toggleSidebar(false)"></div>
      <Sidebar :items="sidebarItems" @toggle-sidebar="toggleSidebar" :class="{ 'home-sidebar': $page.frontmatter.home }">
        <slot name="sidebar-top" slot="top"/>
        <slot name="sidebar-bottom" slot="bottom"/>
      </Sidebar>
      <div class="custom-layout" v-if="$page.frontmatter.layout">
        <component :is="$page.frontmatter.layout"/>
      </div>
      <Page v-else :sidebar-items="sidebarItems" :class="{ home: $page.frontmatter.home }">
        <slot name="page-top" slot="top"/>
        <slot name="page-bottom" slot="bottom"/>
      </Page>
    </div>
    <a-footer dark class="app-footer" />
  </div>
</template>

<script>
import Vue from 'vue'
import nprogress from 'nprogress'
import Navbar from './Navbar.vue'
import Page from './Page.vue'
import Sidebar from './Sidebar.vue'
import store from '@app/store'
import { resolveSidebarItems } from './util'
import throttle from 'lodash.throttle'

export default {
  components: { Page, Sidebar, Navbar },
  data () {
    return {
      isSidebarOpen: false,
      os: 'unknown'
    }
  },

  computed: {
    shouldShowNavbar () {
      const { themeConfig } = this.$site
      const { frontmatter } = this.$page
      if (
        frontmatter.navbar === false ||
        themeConfig.navbar === false) {
        return false
      }
      return (
        this.$title ||
        themeConfig.logo ||
        themeConfig.repo ||
        themeConfig.nav ||
        this.$themeLocaleConfig.nav
      )
    },
    shouldShowSidebar () {
      const { frontmatter } = this.$page
      return (
        !frontmatter.layout &&
        frontmatter.sidebar !== false &&
        this.sidebarItems.length
      )
    },
    sidebarItems () {
      return resolveSidebarItems(
        this.$page,
        this.$route,
        this.$site,
        this.$localePath
      )
    },
    pageClasses () {
      const userPageClass = this.$page.frontmatter.pageClass
      return [
        {
          'no-navbar': !this.shouldShowNavbar,
          'sidebar-open': this.isSidebarOpen,
          'no-sidebar': !this.shouldShowSidebar
        },
        userPageClass
      ]
    }
  },

  created () {
    this.fetchOperatingSystem()
    if (this.$ssrContext) {
      this.$ssrContext.title = this.$title
      this.$ssrContext.lang = this.$lang
      this.$ssrContext.description = this.$page.description || this.$description
    }
  },

  mounted () {
    // update title / meta tags
    this.currentMetaTags = []
    const updateMeta = () => {
      document.title = this.$title
      document.documentElement.lang = this.$lang
      const meta = [
        {
          name: 'description',
          content: this.$description
        },
        ...(this.$page.frontmatter.meta || [])
      ]
      this.currentMetaTags = updateMetaTags(meta, this.currentMetaTags)
    }
    this.$watch('$page', updateMeta)
    updateMeta()

    window.addEventListener('scroll', this.onScroll)

    // configure progress bar
    nprogress.configure({ showSpinner: false })

    this.$router.beforeEach((to, from, next) => {
      if (to.path !== from.path && !Vue.component(to.key)) {
        nprogress.start()
      }
      next()
    })

    this.$router.afterEach(() => {
      nprogress.done()
      this.isSidebarOpen = false
    })
  },

  beforeDestroy () {
    updateMetaTags(null, this.currentMetaTags)

    window.removeEventListener('scroll', this.onScroll)
  },

  methods: {
    fetchOperatingSystem: function () {
      if (navigator.appVersion.indexOf("Win") !== -1) {
        this.$page.os = 'windows'
      } else if (navigator.appVersion.indexOf("Mac") !== -1) {
        this.$page.os = 'macos'
      } else if (navigator.appVersion.indexOf("X11") !== -1) {
        this.$page.os = 'unix'
      } else if (navigator.appVersion.indexOf("Linux") !== -1) {
        this.$page.os = 'linux'
      } else {
        this.$page.os = 'unknown'
      }
    },
    toggleSidebar (to) {
      this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
    },
    // side swipe
    onTouchStart (e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      }
    },
    onTouchEnd (e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x
      const dy = e.changedTouches[0].clientY - this.touchStart.y
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true)
        } else {
          this.toggleSidebar(false)
        }
      }
    },
    onScroll: throttle(function () {
      this.setActiveHash()
    }, 300),
    setActiveHash () {
      const sidebarLinks = [].slice.call(document.querySelectorAll('.sidebar-link'))
      const anchors = [].slice.call(document.querySelectorAll('.header-anchor'))
        .filter(anchor => sidebarLinks.some(sidebarLink => sidebarLink.hash === anchor.hash))

      const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)

      for (let i = 0; i < anchors.length; i++) {
        const anchor = anchors[i]
        const nextAnchor = anchors[i + 1]

        const isActive = i === 0 && scrollTop === 0 ||
          (scrollTop >= anchor.parentElement.offsetTop + 10 &&
            (!nextAnchor || scrollTop < nextAnchor.parentElement.offsetTop - 10))

        if (isActive && this.$route.hash !== anchor.hash) {
          store.disableScrollBehavior = true
          this.$router.replace(anchor.hash, () => {
            // execute after scrollBehavior handler.
            this.$nextTick(() => {
              store.disableScrollBehavior = false
            })
          })
          return
        }
      }
    }
  }
}

function updateMetaTags (meta, current) {
  if (current) {
    current.forEach(c => {
      document.head.removeChild(c)
    })
  }
  if (meta) {
    return meta.map(m => {
      const tag = document.createElement('meta')
      Object.keys(m).forEach(key => {
        tag.setAttribute(key, m[key])
      })
      document.head.appendChild(tag)
      return tag
    })
  }
}
</script>

<style src="prismjs/themes/prism-tomorrow.css"></style>
<style src="@asyncy/vue/dist/asyncy-vue.css"></style>
<style src="./styles/theme.styl" lang="stylus"></style>
<style lang="scss">
@import "~@asyncy/vue/dist/sass/index.scss";

.app-footer {
  background-color: color(dark);
  .signature {
    margin-bottom: 0;
  }
}

.hero {
  background-color: color(dark);
  z-index: 0;
  .hero-book {
    @include breakpoint(max m) {
      display: none !important;
    }
  }
}

.navbar {
  background-color: color(dark);
  color: color(light);
}

</style>
<style scoped lang="styl">
@import './styles/config.styl';

.hero
  margin-top $navbarHeight
  text-align left
  flex-basis 100%
  flex-grow 1
  color white
  padding 100px 30px 140px
  box-sizing border-box
  position relative
  h1
    font-size 2.2rem
    margin 0
  .hero-stars
    z-index 1
    height 400px
    max-height 400px !important
    min-height auto !important
  .hero-book
    display block
    position absolute
    height 100%
    width 22rem
    right 7rem
    top 0
    z-index 2


.theme-container
  display flex
  position relative
  background #fff
  z-index 5

  &.sidebar-open
    .sidebar.home-sidebar
      min-width $sidebarWidth

  .sidebar.home-sidebar
    margin-top 0
    border-top 1px solid #efefef
    position sticky
    top 4rem
  .page
    display inline-block
    &.home
      padding-left 0 !important

.app-footer
  z-index 20
</style>
