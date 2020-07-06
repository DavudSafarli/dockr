<template>
  <div class="home p-3">
    <container-list :containers="containers"></container-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Container } from '@/@types';

export default Vue.extend({
  data: () => ({
    containers: [] as Array<Container>,
  }),
  created() {
    this.loadContainers()
  },
  methods: {
    loadContainers() {
      window.api.GetContainers().then(containersJSON => {
        this.containers = JSON.parse(JSON.parse(containersJSON))
      }).catch(e => {
        console.error(e)
      })
    }
  },
  components: {
    ContainerList: () => import('@/templates/containers/ContainerList.vue'),
  }
})

</script>

