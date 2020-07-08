<template>
  <div class="flex justify-between">
    <container-brief :brief="containerBriefInfo"></container-brief>
    <container-button-group :buttonOptions="$options.buttonOptions"></container-button-group>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Vue, { PropOptions } from 'vue';
import { Container, ContainerBriefInfo, IconOptions } from '@/@types';
import { ContainerState } from '../@types/enums/ContainerState';

export default Vue.extend({
  props: {
    container: <PropOptions<Container>> {
      type: Object
    },
    buttons: <PropOptions<Array<IconOptions>>> Array
  },
  created() {
    // @ts-ignore
    this.$options.buttonOptions = this.getButtonOptions();
  },
  methods: {
    getButtonOptions(): Array<IconOptions> {
      const arr: Array<IconOptions> = [];
      arr.push(this.getStartButtonOptions())
      
      arr.forEach(e => e.class = "border-river hover:border-belize text-river hover:text-belize")
      return arr
    },
    getStartButtonOptions(): IconOptions {
      const c = this.container;
      const iconName = c.State == ContainerState.running ? "pause_circle_filled" : "play_circle_filled";
      return {
        iconComponent: () => import(`@/assets/icons/buttons/${iconName}.svg`),
      }
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
    ContainerButtonGroup: () => import('@/molecules/containers/ContainerButtonGroup.vue'),
  }
})
</script>

