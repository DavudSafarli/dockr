<template>
  <div ref="ejdaha" class="relative">
    <!-- ready event is emitted by VTab upon rendering -->
    <v-tab @ready="() => slide(currentTabId)" :ref="tab.id" v-for="tab in tabs" :key="tab.id"
      @click.native="onTabClick(tab.id)" :options="tab">
    </v-tab>
    <div ref="slider"
      :class="{'absolute w-1 bg-red-500': true, 'transition-all duration-200': transition}"></div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Vue, { PropOptions } from 'vue';
import { ITabOptions } from '../@types';

export default Vue.extend({
  props: {
    tabs: <PropOptions<Array<ITabOptions>>> Array,
    // this is only used for first slider rendering when VTabs are ready
    currentTabId: {}
  },
  data: () => ({
    transition: false,
  }),
  watch: {

  },
  mounted() {
    this.slide(this.currentTabId)
    this.transition = true
  },
  methods: {
    onTabClick(tabId) {
      this.$emit('input', tabId)
      this.slide(tabId)
    },
    slide(tabId) {
      // when called from mounted, $refs are undefined
      // when called by @ready event, $refs are OK
      // slide fn. must be called to initialize its position after refs are defined
      // calling slide fn. on mounted 
      let el = this.$refs[tabId]?.[0].$el as HTMLElement | null;
      if(!el) return
      // Here i need to update dom instantly, so i didn't use style binding
      (this.$refs.slider as HTMLElement).style.height = el.scrollHeight + 'px';
      (this.$refs.slider as HTMLElement).style.top = el.offsetTop + 'px';
    }
  },
  components: {
    VTab: () => import('@/molecules/VTab.vue'),
  }
})
</script>

