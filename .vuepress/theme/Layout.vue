<template>
  <div class="docs">
    <a-jumbo
      :size="$route.path === '/' ? 'medium' : undefined"
      :small="$route.path === '/' ? 'Documentation' : ''"
      :title="getTitle"
    >
      <a-navbar
        slot="header"
        :items="menuItems"
        dark
        @logo="$router.push('/')"
      />
      <h2
        slot="title"
        class="is-size-2 is-hidden-mobile is-title-small-jumbo has-text-weight-bold has-text-white"
        v-if="$route.path !== '/'"
        v-text="getTitle"
      />
      <!-- <p
        slot="small"
        v-if="$route.path !== '/'"
        class="is-small-small-jumbo is-size-8 has-text-uppercase has-text-centered has-text-weight-bold has-letter-spacing-xlarge"
      >
        Documentation
      </p> -->
    </a-jumbo>
    <a-layout
      margin="medium"
      background="light"
      foreground="white"
      rounded
      shadow
      outside
      narrow
    >
      <a-container
        :class="pageClasses"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
      >
        <a-div
          size="full"
          padding="min"
          class="bordered-bottom-light"
        >
          <a-level class="is-mobile">
            <template slot="left">
              <a-icon
                class="is-hidden-mobile"
                icon="home"
                height="14"
                width="24"
                fill="gray-2"
              />
              <span class="is-size-8 has-line-height-5 has-text-gray-2 has-text-weight-semibold has-text-uppercase">Documentation</span>
            </template>
            <a-button
              link
              class="has-height-auto"
              slot="right"
              :url="{ href: editPageLink, target: '' }"
            >
              Edit this page
              <svg
                width="24px"
                height="16px"
                style="vertical-align:sub"
                viewBox="0 0 16 16"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <g
                  fill="#5805fc"
                  fill-rule="evenodd"
                >
                  <path d="M9.5894518,3.16666667 L11.8333333,5.4105482 L12.6989884,4.54489315 C12.947369,4.29651258 12.947369,3.89396361 12.6989884,3.64558304 L11.354417,2.30101162 C11.1060364,2.05263105 10.7034874,2.05263105 10.4551069,2.30101162 L9.5894518,3.16666667 Z M10.9819768,6.26190476 L8.73809524,4.01802323 L2.18114091,10.5749776 L1.73236461,13.2676354 L4.42502245,12.8188591 L10.9819768,6.26190476 Z M4.8132539,13.9747615 L1.09896819,14.5938091 C0.691521776,14.6617169 0.338283122,14.3084782 0.406190858,13.9010318 L1.02523848,10.1867461 C1.04586572,10.0629826 1.1046482,9.94875714 1.19336934,9.860036 L9.60375029,1.44965505 C10.3223221,0.731083237 11.4872017,0.731083237 12.2057735,1.44965505 L13.5503449,2.79422648 C14.2689168,3.51279829 14.2689168,4.6776779 13.5503449,5.39624971 L5.139964,13.8066307 C5.05124286,13.8953518 4.93701737,13.9541343 4.8132539,13.9747615 Z" />
                </g>
              </svg>
            </a-button>
          </a-level>
        </a-div>
        <a-div
          size="one-fifth-desktop is-one-quarter-tablet"
          class="sidebar-sticky is-font-graphik"
        >
          <perfect-scrollbar>
            <Sidebar
              :items="sidebarItems"
              @toggle-sidebar="toggleSidebar"
              :class="{ 'home-sidebar': $page.frontmatter.home }"
            >
              <slot
                name="sidebar-top"
                slot="top"
              />
              <slot
                name="sidebar-bottom"
                slot="bottom"
              />
            </Sidebar>
          </perfect-scrollbar>
        </a-div>
        <a-div
          size="8-desktop is-7-tablet"
          class="is-offset-1 custom-layout is-font-graphik"
        >
          <AlgoliaSearchBox
            v-if="isAlgoliaSearch"
            :options="algolia"
          />
          <component
            v-if="$page.frontmatter.layout"
            class="page"
            :is="$page.frontmatter.layout"
          />
          <Page
            v-else
            :sidebar-items="sidebarItems"
          >
            <slot
              name="page-top"
              slot="top"
            />
            <slot
              name="page-bottom"
              slot="bottom"
            />
          </Page>
        </a-div>
      </a-container>
    </a-layout>
    <a-join
      footer
      is-paddingless
    />
    <a-footer dark />
  </div>
</template>

<script>
import Vue from 'vue'
import nprogress from 'nprogress'
import Page from './Page.vue'
import Sidebar from './Sidebar.vue'
import AlgoliaSearchBox from './AlgoliaSearchBox'
import store from '@app/store'
import { resolveSidebarItems, normalize, outboundRE, endingSlashRE } from './util'
import throttle from 'lodash.throttle'

export default {
  components: { Page, Sidebar, AlgoliaSearchBox },
  data () {
    return {
      isSidebarOpen: false,
      os: 'unknown'
    }
  },

  computed: {
    editPageLink () {
      if (this.$page.frontmatter.editLink === false) {
        return
      }
      const {
        repo,
        editLinks,
        docsDir = '',
        docsBranch = 'master',
        docsRepo = repo
      } = this.$site.themeConfig

      let path = normalize(this.$page.path)
      if (endingSlashRE.test(path)) {
        path += 'README.md'
      } else {
        path += '.md'
      }

      if (docsRepo && editLinks) {
        const base = outboundRE.test(docsRepo)
          ? docsRepo
          : `https://github.com/${docsRepo}`
        return (
          base.replace(endingSlashRE, '') +
          `/edit/${docsBranch}` +
          (docsDir ? '/' + docsDir.replace(endingSlashRE, '') : '') +
          path
        )
      }
    },
    getTitle () {
      if (this.$route.path === '/') return 'Welcome home.'
      const item = this.sidebarItems.find(i => i.path === this.$route.path)
      return item ? item.title : ''
    },
    algolia () {
      return this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
    },
    isAlgoliaSearch () {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName
    },
    menuItems () {
      const { themeConfig } = this.$site
      return themeConfig.nav
    },
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

  beforeMount () {
    this.fetchOperatingSystem()
  },

  created () {
    if (this.$ssrContext) {
      this.$ssrContext.title = this.$title
      this.$ssrContext.lang = this.$lang
      this.$ssrContext.description = this.$page.description || this.$description
    }
  },

  mounted () {
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
      this.fetchOperatingSystem()
      nprogress.done()
      this.isSidebarOpen = false
    })
  },

  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  },

  methods: {
    fetchOperatingSystem: function () {
      this.$page.os = getOperatingSystem()
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
          if (!this.isSidebarOpen) {
            this.$router.replace(anchor.hash, () => {
              // execute after scrollBehavior handler.
              this.$nextTick(() => {
                store.disableScrollBehavior = false
              })
            })
          }
          return
        }
      }
    }
  }
}

function getOperatingSystem () {
  if (navigator.appVersion.indexOf("Win") !== -1) {
    return 'windows'
  } else if (navigator.appVersion.indexOf("Mac") !== -1) {
    return 'macos'
  } else if (navigator.appVersion.indexOf("X11") !== -1) {
    return 'unix'
  } else if (navigator.appVersion.indexOf("Linux") !== -1) {
    return 'linux'
  } else {
    return 'unknown'
  }
}
</script>

<style src="prismjs/themes/prism-tomorrow.css"></style>
<style src="./styles/theme.scss" lang="scss"></style>
