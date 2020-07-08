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
        'border rounded-full p-0.5 w-8 fill-current': true,
        [this.options.class!] : this.options.class,
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

