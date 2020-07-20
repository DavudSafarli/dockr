<template>
  <div style="transition: all .15s ease" class="inline-flex" v-if="icon || iconComponent"
    :class="classes">
    <component :class="svgClasses" :is="iconC" 
    v-on="events"></component>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Vue, { PropOptions } from 'vue';
import { IconOptions, Dict } from '../../@types';

const sizeMap: Dict<string> = {
  'sm': 'w-6 h-6',
  'md': 'w-8 h-8',
  'lg': 'w-12 h-12',
};

export default Vue.extend({
  props: {
    icon: <PropOptions<string>> String,
    iconComponent: <PropOptions<Function|Object>> {
      type: [Function, Object]
    },
    outerClasses: <PropOptions<object>> Object,
    onclick: <PropOptions<Function>> Function,
    removeHoverEffect: <PropOptions<boolean>> Boolean,
    innerClasses: <PropOptions<object>> Object,
    size: <PropOptions<string>> {
      type: String,
      default: 'md',
    }
  },
  computed: {
    iconC(): Function|Object {
      if(this.iconComponent) {
        return this.iconComponent;
      }
      return () => import(`@/assets/icons/${this.icon}.svg`)
    },
    classes(): object {
      return {
        [sizeMap[this.size]]: true,
        'fill-current': true,
        'focus:outline-none': true,
        'hover:shadow-md hover:-mt-1': !this.removeHoverEffect,
        'cursor-pointer': this.onclick,
        ...this.outerClasses,
      }
    },
    svgClasses(): object {
      return {
        'w-full h-full': true,
        ...this.innerClasses,
      }
    },
    events(): object {
      let events = {};
      if (this.onclick)
        events['click'] = this.onclick;
      
      return events;
    }
  },
})
</script>

