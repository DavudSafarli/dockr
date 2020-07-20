<template>
  <input type="text" spellcheck="false" v-bind:value="value" @input="$emit('input', $event.target.value)"
    class="bg-gray-700 text-gray-500 outline-none px-1 leading-7 w-full">
</template>

<script lang="ts">
// @ is an alias to /src
import Vue, { PropOptions } from 'vue';

export default Vue.extend({
  props: {
    value: String
  },
  computed: {
    classes() : object {
      return {
        
      }
    }
  }
})
</script>



