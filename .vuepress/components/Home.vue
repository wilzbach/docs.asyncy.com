<template>
  <div class="home">
    <div
      class="features has-padding-bottom-medium"
      v-if="data.features && data.features.length"
    >
      <Feature
        v-for="(feature, index) in data.features"
        :key="index"
        :title="feature.title"
        :description="feature.description"
        :link="feature.link"
        :icon="feature.icon"
      />
    </div>
  </div>
</template>

<script>
import Feature from './Feature.vue'

export default {
  name: 'Home',
  components: { Feature },
  computed: {
    data () {
      return this.$page.frontmatter
    }
  }
}
</script>
