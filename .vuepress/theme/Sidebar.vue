<template>
  <div
    class="sidebar"
    v-scroll="handleScroll"
  >
    <div class="is-hidden-tablet">
      <div class="sidebar-selector-inactive">
        <s-select
          :value="getTitle"
          fold-icon
          @open="openSidebarAndCurrentItem"
        />
      </div>
      <div class="sidebar-selector-active sidebar-links">
        <s-select
          v-for="(item, i) of items"
          ref="sidebarItems"
          @close="closeSidebarOnAllSelectClosed"
          :value="item.title"
          :path="item.path"
          :class="[{ active: isActive(item) }]"
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
        </s-select>
      </div>
    </div>
    <div :class="{ 'is-hidden-mobile': true, 'shorten': shortenSidebar }">
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
import { isActive } from './util'

export default {
  components: { SidebarGroup, SidebarLink },
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
