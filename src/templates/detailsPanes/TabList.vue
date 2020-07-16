<template>
  <v-tabs @input="$emit('input', $event)" :tabs="tabs" :value="value"
    v-bind="$options.bindings"
  ></v-tabs>
</template>

<script lang="ts">
// @ is an alias to /src
import Vue, { PropOptions } from 'vue';
import { TabsOptions } from '../../@types';
import { COLOR } from "@/utils/colors";

export default Vue.extend({
  props: {
    tabs: Array,
    value: {}
  },
  created() {
    this.$options['bindings'] = this.getBindings()
  },
  methods: {
    getBindings(): TabsOptions {
      return {
        sliderColor: COLOR.BG_SLIDER,
        color: COLOR.T_BLUE_DARK,
        backgroundColor: COLOR.BG_WHITE,
      }
    }
  },
  components: {
    VTabs: () => import('@/organisms/VTabs.vue'),
  },
  computed: {
  }
})
</script>

