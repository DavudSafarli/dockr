<template>
  <div>
    <container-list-item v-for="container in containers" 
    :key="container.Id" :container="container"
    class="py-3 border-b px-12 cursor-pointer hover:bg-gray-300">
    </container-list-item>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Vue, { PropOptions } from 'vue';
import { Container } from '@/@types';

export default Vue.extend({
  props: {
    containers: <PropOptions<Array<Container>>> {
      type: Array
    }

  },
  components: {
    ContainerListItem: () => import('@/organisms/ContainerListItem.vue'),
  }
})
</script>

