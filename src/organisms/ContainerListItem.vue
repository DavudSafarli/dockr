<template>
  <div class="flex justify-between">
    <container-brief :brief="containerBriefInfo"></container-brief>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Vue, { PropOptions } from 'vue';
import { Container, ContainerBriefInfo } from '@/@types';

export default Vue.extend({
  props: {
    container: <PropOptions<Container>> {
      type: Object
    }
  },
  computed: {
    containerBriefInfo() : ContainerBriefInfo {
      return {
        name: this.container?.Names.join(","),
        image: this.container?.Image,
        ports: this.container?.Ports,
        state: this.container?.State,
        status: this.container?.Status,
      }
    }
  },
  components: {
    ContainerBrief: () => import('@/molecules/containers/ContainerBrief.vue'),
  }
})
</script>

