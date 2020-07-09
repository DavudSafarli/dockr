<template>
  <div class="home">
    <container-list :containers="containers"></container-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Containers } from '@/@types';

export default Vue.extend({
  data: () => ({
    containers: {} as Containers,
  }),
  created() {
    this.loadContainers()
  },
  methods: {
    loadContainers() {
      window.api.GetContainers().then(containers => {
        this.containers = containers
      })
    }
  },
  components: {
    ContainerList: () => import('@/templates/containers/ContainerList.vue'),
  }
})

</script>

