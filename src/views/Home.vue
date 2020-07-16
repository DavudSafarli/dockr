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
import { store, mutations } from '../store';

export default Vue.extend({
  mounted() {
    this.registerListener()
  },
  destroyed() {
    this.unregisterListener()
  },
  computed: {
    containers() {
      return store.containers
    }
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
  },
  components: {
    ContainerList: () => import('@/templates/containers/ContainerList.vue'),
  }
})

</script>

