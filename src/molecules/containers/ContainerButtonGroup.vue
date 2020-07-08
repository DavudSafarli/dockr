<template>
  <div class="flex items-center">
    <v-icon v-for="(button, i) in buttonOptions" :key="i" :options="button"
    class="mx-1">i</v-icon>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Vue, { PropOptions } from 'vue';
import { IconOptions } from '../../@types';

export default Vue.extend({
  props: {
    buttonOptions: <PropOptions<Array<IconOptions>>> Array,
  },
  components: {
    VIcon: () => import('@/atoms/buttons/VIcon.vue'),
  }
})
</script>


