<template>
  <div>
    <container-list-item :data-container-id="container.Id" @click.native="onClick"
    v-for="container in containers" 
    :key="container.Id" :container="container"
    class="py-3 border-b px-12 cursor-pointer hover:bg-gray-300">
    </container-list-item>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Vue, { PropOptions } from 'vue';
import { Containers } from '@/@types';
import { Routes } from '../../router';

export default Vue.extend({
  props: {
    containers: <PropOptions<Containers>> {
      type: Object
    }
  },
  methods: {
    onClick(e: MouseEvent) {
      const id = (e.currentTarget! as HTMLTextAreaElement).getAttribute("data-container-id")
      const container = this.containers[id!]
      
      this.$router.push({name: Routes.Details, params: {
        id: id!,
      }})
    }
  },
  components: {
    ContainerListItem: () => import('@/organisms/ContainerListItem.vue'),
  }
})
</script>

