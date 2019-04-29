<template>
  <component
    class="feature"
    :is="isExternal(link) ? 'a' : 'router-link'"
    :to="!isExternal(link) ? link : undefined"
    :href="isExternal(link) ? link : undefined"
  >
    <div class="columns is-centered is-vcentered">
      <s-div size="10">
        <s-media class="feature-svg">
          <FeatureIcon
            :name="icon"
            slot="left"
          />
          <h2>{{ title }}</h2>
          <p>{{ description }}</p>
        </s-media>
      </s-div>
      <s-div
        size="2"
        class="is-hidden-mobile"
      >
        <component
          class="button is-primary is-link"
          link
          :is="isExternal(link) ? 's-button' : 'router-link'"
          :to="!isExternal(link) ? link : undefined"
          :url="isExternal(link) ? { href: link, target: '' } : undefined"
        >
          <s-icon icon="arrow" />
        </component>
      </s-div>
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