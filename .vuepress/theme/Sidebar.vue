<template>
  <div
    class="sidebar"
    v-scroll="handleScroll"
  >
    <div class="is-hidden-tablet">
      <div class="sidebar-selector-inactive">
        <a-select
          :value="getTitle"
          fold-icon
          @open="openSidebarAndCurrentItem"
        />
      </div>
      <div class="sidebar-selector-active">
        <a-select
          v-for="(item, i) of items"
          ref="sidebarItems"
          @close="closeSidebarOnAllSelectClosed"
          :value="item.title"
          :path="item.path"
          :key="`mobile-sidebar-${_uid}-${i}`"
        >
          <li
            v-for="(child, cid) in item.headers"
            :key="`mobile-sidebar-${_uid}-${i}-${cid}`"
          >
            <router-link
              @click.native="closeSidebar"
              :to="`${item.path}#${child.slug}`"
            >{{ child.title }}</router-link>
          </li>
        </a-select>
      </div>
    </div>
    <div :class="{ 'is-hidden-mobile': true, 'shorten': shortenSidebar }">
      <NavLinks />
      <slot name="top" />
      <ul
        class="sidebar-links"
        v-if="items.length"
      >
        <li v-for="(item, i) in items">
          <SidebarGroup
            v-if="item.type === 'group'"
            :item="item"
            :first="i === 0"
            :open="i === openGroupIndex"
            :collapsable="item.collapsable"
            @toggle="toggleGroup(i)"
          />
          <SidebarLink
            v-else
            :item="item"
          />
        </li>
      </ul>
      <slot name="bottom" />
    </div>
  </div>
</template>

<script>
import SidebarGroup from './SidebarGroup.vue'
import SidebarLink from './SidebarLink.vue'
import NavLinks from './NavLinks.vue'
import { isActive } from './util'

export default {
  components: { SidebarGroup, SidebarLink, NavLinks },
  props: ['items'],
  computed: {
    getTitle: function () {
      if (this.$route.path === '/') return 'Home'
      const item = this.items.find(i => i.path === this.$route.path)
      return item ? item.title : ''
    }
  },
  data () {
    return {
      openGroupIndex: 0,
      shortenSidebar: false,
    }
  },
  created () {
    this.refreshIndex()
  },
  watch: {
    '$route' () {
      this.refreshIndex()
    }
  },
  methods: {
    closeSidebarOnAllSelectClosed: function () {
      if (this.$refs.sidebarItems.findIndex(item => item.open === true) === -1) {
        this.closeSidebar()
      }
    },
    closeSidebar: function () {
      this.$emit('toggle-sidebar', false)
    },
    openSidebarAndCurrentItem: function () {
      const current = this.$refs.sidebarItems.find(i => i.$attrs.path === this.$route.path)
      if (current) {
        // current.open = false
        current.invalidate = true
        current.open = true
      }
      this.$emit('toggle-sidebar', true)
    },
    refreshIndex () {
      const index = resolveOpenGroupIndex(
        this.$route,
        this.items
      )
      if (index > -1) {
        this.openGroupIndex = index
      }
    },
    toggleGroup (index) {
      this.openGroupIndex = index === this.openGroupIndex ? -1 : index
    },
    isActive (page) {
      return isActive(this.$route, page.path)
    },
    handleScroll (evt, el) {
      if (window.scrollY >= (window.document.body.clientHeight - window.innerHeight - 328)) {
        this.shortenSidebar = true;
      } else {
        this.shortenSidebar = false;
      }
    },
  }
}

function resolveOpenGroupIndex (route, items) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (item.type === 'group' && item.children.some(c => isActive(route, c.path))) {
      return i
    }
  }
  return -1
}
</script>

<style lang="stylus">
@import './styles/config.styl';

.sidebar.home-sidebar .sidebar-internal {
  position: relative;

  &.shorten {
    position: relative;
    bottom: auto;
  }
}

.sidebar {
  height: auto;

  .sidebar-selector-inactive {
    display: block;
  }

  .sidebar-selector-active {
    display: none;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }

  a {
    display: inline-block;
  }

  .nav-links {
    display: none;
    border-bottom: 1px solid $borderColor;
    padding: 0.5rem 0 0.75rem 0;

    a {
      font-weight: 600;
    }

    .nav-item, .repo-link {
      display: block;
      line-height: 1.25rem;
      font-size: 1.1em;
      padding: 0.5rem 0 0.5rem 1.5rem;
    }
  }

  .sidebar-links {
    // padding: 1.5rem 0;
  }

  .sidebar-links {
    padding-left: 2rem;
    position: relative;

    li {
      padding: 0.25rem;
      margin-top: 0.75rem;

      &:last-child {
        padding-bottom: 0.75rem;
      }

      cursor: pointer;

      .sidebar-sub-headers {
        border-left: 2px solid #c6c7dc;
        margin-left: 1rem;
      }

      &.sidebar-sub-header {
        a {
          color: #7b7b8f;

          &.active {
            color: #000;
            font-weight: bold;
          }
        }
      }

      .tags {
        margin-top: 0.5rem;
      }

      &:not(.sidebar-sub-header) > a.active {
        position: relative;
        color: $accentColor;
        font-weight: bold;

        &:before {
          content: '';
          display: block;
          width: 0.25rem;
          height: 2rem;
          position: absolute;
          top: -0.2rem;
          left: 0;
          margin-left: -1.375rem;
          bottom: 0;
          border-radius: 0.25rem;
          background-color: $accentColor;
        }
      }
    }
  }
}
</style>
