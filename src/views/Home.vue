<template>
  <div class="home">
    <container-list :containers="containers"></container-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Containers } from '@/@types';
import { Message } from '../@types/events';
import { ContainerState } from '../@types/enums/ContainerState';

export default Vue.extend({
  data: () => ({
    containers: {} as Containers,
  }),
  mounted() {
    this.registerListener()
    this.loadContainers()
  },
  destroyed() {
    this.unregisterListener()
  },
  methods: {
    registerListener() {
      window.api.Events.RegisterEventListener(this.eventHandler)
    },
    eventHandler(message: Message) {
      let container = this.containers[message.id!]

      if(message.Action == "start") {
        container.State = ContainerState.running
      }else if(message.Action == "die") {
        container.State = ContainerState.exited
      }else if(message.Action == "destroy") {
        this.$delete(this.containers, message.id!)
      }

    },
    unregisterListener() {
      window.api.Events.UnregisterEventListener()
    },
    loadContainers() {
      window.api.Container.List().then(containers => {
        this.containers = containers
      })
    }
  },
  components: {
    ContainerList: () => import('@/templates/containers/ContainerList.vue'),
  }
})

</script>

