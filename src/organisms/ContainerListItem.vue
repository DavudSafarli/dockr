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
    this.$options['bashIcon'] = () => import(`@/assets/icons/buttons/bash.svg`)
    this.$options['deleteIcon'] = () => import(`@/assets/icons/buttons/delete_forever.svg`)
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
    onRun(e: Event) {
      e.stopPropagation()
      if (this.container.State == ContainerState.running) {
        window.api.Container.Stop(this.container.Id).then(console.log)
      }else {
        window.api.Container.Start(this.container.Id).then(console.log)
      }
    },
    onBash(e: Event) {
      e.stopPropagation()
      if (this.container.State != ContainerState.running) return

      window.api.Container.Bash(this.container.Id).then(console.log)
    },
    onDelete(e: Event) {
      e.stopPropagation()
      window.api.Container.Remove(this.container.Id).then(console.log)
    },
  },
  computed: {
    buttonOptions(): Array<IconOptions> {
      const arr: Array<IconOptions> = [];
      arr.push(this.runButtonOptions)
      arr.push(this.bashButtonOptions)
      arr.push(this.deleteButtonOptions)
      
      return arr
    },
    bashButtonOptions(): IconOptions {
      const isRunning = this.container.State.in([ContainerState.running])
      const iconRendererFunc = this.$options['bashIcon']
      return {
        iconComponent: iconRendererFunc,
        onclick: this.onBash,
        class: {
          'cursor-not-allowed': !isRunning,
          'border rounded-full': true,
          'border-off text-off': !isRunning,
          'border-river text-river hover:border-belize hover:text-belize': isRunning
        },
        removeHoverEffect: !isRunning,
      }
    },
    deleteButtonOptions(): IconOptions {
      const isRunning = this.container.State.in([ContainerState.running])
      const iconRendererFunc = this.$options['deleteIcon']
      return {
        iconComponent: iconRendererFunc,
        onclick: this.onDelete,
        class: {
          'border-river text-river hover:border-belize hover:text-belize p-1': true,
          'border rounded-full': true,
        },
      }
    },
    runButtonOptions(): IconOptions {
      const iconRendererFunc = this.getIconRenderFunc()
      return {
        iconComponent: iconRendererFunc,
        onclick: this.onRun,
        class: {
          'border-river text-river hover:border-belize hover:text-belize': true,
          'border rounded-full': true,
        }
      }
    },
    containerBriefInfo() : ContainerBriefInfo {
      return {
        name: this.container?.Names.join(','),
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

