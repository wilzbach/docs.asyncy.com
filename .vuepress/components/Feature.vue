<template>
  <component
    class="feature"
    :is="isExternal(link) ? 'a' : 'router-link'"
    :to="!isExternal(link) ? link : undefined"
    :href="isExternal(link) ? link : undefined"
  >
    <div class="columns is-centered is-vcentered">
      <a-div size="10">
        <a-media class="feature-svg">
          <FeatureIcon
            :name="icon"
            slot="left"
          />
          <h2>{{ title }}</h2>
          <p>{{ description }}</p>
        </a-media>
      </a-div>
      <a-div
        size="2"
        class="is-hidden-mobile"
      >
        <component
          class="button is-primary is-link"
          link
          :is="isExternal(link) ? 'a-button' : 'router-link'"
          :to="!isExternal(link) ? link : undefined"
          :url="isExternal(link) ? { href: link, target: '' } : undefined"
        >
          <a-icon icon="arrow" />
        </component>
      </a-div>
    </div>
  </component>
</template>

<script>
import { isExternal } from '../theme/util'

export default {
  name: 'Feature',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: undefined
    },
    link: {
      type: String,
      required: true
    }
  },
  methods: {
    isExternal
  }
}
</script>