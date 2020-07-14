<template>
  <v-tabs @input="$emit('input', $event)" :tabs="tabs" :currentTabId="value"></v-tabs>
</template>

<script lang="ts">
// @ is an alias to /src
import Vue, { PropOptions } from 'vue';

export default Vue.extend({
  props: {
    tabs: Array,
    value: {}
  },
  components: {
    VTabs: () => import('@/organisms/VTabs.vue'),
  }
})
</script>

