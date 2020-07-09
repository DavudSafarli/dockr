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
    this.registerListener()
    this.loadContainers()
  },
  beforeDestroy() {
    this.unregisterListener()
  },
  methods: {
    registerListener() {
      window.api.Events.RegisterEventListener((data) => {
        console.log(data);
      })
    },
    unregisterListener() {
      window.api.Events.UnregisterEventListener()
    },
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

