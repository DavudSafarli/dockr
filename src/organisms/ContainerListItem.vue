<template>
  <div class="group flex justify-between">
    <container-brief class="" :brief="containerBriefInfo"></container-brief>
    <container-button-group :buttonOptions="buttonOptions"></container-button-group>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Vue, { PropOptions } from 'vue';
import { Container, ContainerBriefInfo, IconOptions } from '@/@types';
import { ContainerState } from '../@types/enums/ContainerState';

export default Vue.extend({
  created() {
    this.$options['playIcon'] = () => import(`@/assets/icons/buttons/play_circle_filled.svg`)
    this.$options['pauseIcon'] = () => import(`@/assets/icons/buttons/pause_circle_filled.svg`)
  },
  props: {
    container: <PropOptions<Container>> {
      type: Object
    },
  },
  methods: {
    getIconRenderFunc() {
      if(this.container.State == ContainerState.running)
        return this.$options['pauseIcon']
      else
        return this.$options['playIcon']
    },
    onRun() {
      if (this.container.State == ContainerState.running) {
        window.api.Container.Stop(this.container.Id).then(console.log)
      }else {
        window.api.Container.Start(this.container.Id).then(console.log)
      }
    }
  },
  computed: {
    buttonOptions(): Array<IconOptions> {
      const arr: Array<IconOptions> = [];
      arr.push(this.runButtonOptions)
      
      arr.forEach(e => e.class = "border-river hover:border-belize text-river hover:text-belize")
      return arr
    },
    runButtonOptions(): IconOptions {
      const iconRendererFunc = this.getIconRenderFunc()
      return {
        iconComponent: iconRendererFunc,
        onclick: this.onRun
      }
    },
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

