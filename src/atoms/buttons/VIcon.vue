<template>
  <button type="button" style="transition: all .15s ease"
    :class="classes">
    <component :is="options.iconComponent" 
    v-on="events"></component>
  </button>
</template>

<script lang="ts">
// @ is an alias to /src
import Vue, { PropOptions } from 'vue';
import { IconOptions } from '../../@types';

export default Vue.extend({
  props: {
    options: <PropOptions<IconOptions>> Object
  },
  computed: {
    classes(): object {
      return {
        'p-0.5 w-8': true,
        'border rounded-full': true,
        'fill-current': true,
        'focus:outline-none': true,
        'hover:shadow-md hover:-mt-1': !this.options.removeHoverEffect,
        ...this.options.class,
      }
    },
    events(): object {
      let events = {};
      if (this.options.onclick)
        events['click'] = this.options.onclick;
      
      return events;
    }
  },
})
</script>

