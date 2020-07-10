<template>
  <span :class="classes">
    <slot/>
  </span>
</template>

<script lang="ts">
// @ is an alias to /src
import Vue, { PropOptions } from 'vue';
enum Size {
  Primary = "lg",
  Secondary = "sm",
}
export default Vue.extend({
  props: {
    size: <PropOptions<Size>> String,
    nocolor: <PropOptions<boolean>> Boolean,
  },
  computed: {
    classes() : object {
      return {
        "font-bold": this.size == Size.Primary,
        "text-xs": this.size == Size.Secondary,
        "text-gray-600": this.size == Size.Secondary && !this.nocolor
      }
    }
  }
})
</script>



