<template>
  <div ref="ejdaha" class="relative text-red-900" style="color:#1f2c34">
    <!-- ready event is emitted by VTab upon rendering -->
    <v-tab @ready="() => slide(value)" :ref="tab.id" v-for="tab in tabs" :key="tab.id"
      @click.native="onTabClick(tab.id)" :tab="tab" 
      :class="{'v-tab--active': value == tab.id, ...classes}">
    </v-tab>
    <div ref="slider"
      :class="sliderClasses"></div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Vue, { PropOptions } from 'vue';
import { TabOptions } from '../@types';

export default Vue.extend({
  props: {
    tabs: <PropOptions<Array<TabOptions>>> Array,
    sliderColor: String,
    color: String,
    backgroundColor: String,
    // this is only used for first slider rendering when VTabs are ready
    value: {}
  },
  data: () => ({
  }),
  
  mounted() {
    this.slide(this.value)
  },
  computed: {
    classes(): object {
      return {
        [this.color]: this.color,
        [this.backgroundColor]: this.backgroundColor,
      }
    },
    sliderClasses(): object {
      return {
        [this.sliderColor]: this.sliderColor,
        'transition-all duration-200': true,
        'absolute w-1': true,
      }
    }
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
      console.log(el);
      
      // Here i need to update dom instantly, so i didn't use style binding
      (this.$refs.slider as HTMLElement).style.height = el.scrollHeight + 'px';
      (this.$refs.slider as HTMLElement).style.top = el.offsetTop + 'px';
    }
  },
  components: {
    VTab: require('@/molecules/VTab.vue').default,
  }
})
</script>

