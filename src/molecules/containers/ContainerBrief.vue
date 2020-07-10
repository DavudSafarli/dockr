<template>
  <div class="flex flex-col items-start leading-none">
    <div class="flex items-end">
      <v-text size="lg" :class="nameClasses">{{shortName}}</v-text>
      <v-text size="sm">{{brief.image}}</v-text>
    </div>
    <div>
      <v-text size="sm" nocolor :class="nameClasses">{{stateBrief}}</v-text>
      <v-text size="sm">{{portString}}</v-text>
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Vue, { PropOptions } from 'vue';
import { ContainerBriefInfo, Port } from '@/@types/index.d.ts';
import { ContainerState } from '@/@types/enums/ContainerState';

export default Vue.extend({
  props: {
    brief: <PropOptions<ContainerBriefInfo>> Object,
  },
  computed: {
    nameClasses(): object {
      const isRunning = this.brief.state.in([ContainerState.running])
      return {
        'mr-2': true,
        'text-success': isRunning,
        'group-hover:text-success-light': isRunning,
        'text-gray-600': !isRunning,
        'group-hover:text-gray-900': !isRunning,
      }
    },
    shortName(): string {
      return this.brief?.name?.substr(0, 40)
    },
    stateBrief() : string {
      let b = this.brief
      return b.state
    },
    portString(): string {
      return this.brief.ports!
      .reduce((acc, port): string[] => {
        if (!port.PublicPort) null;
        else if (port.PrivatePort != port.PublicPort)
          acc.push(`${port.PrivatePort} : ${port.PublicPort}`)
        else
          acc.push(port.PrivatePort.toString())

        return acc;
      }, [] as string[])
      .join(", ")
    }
  },
  components: {
    VText: () => import('@/atoms/texts/VText.vue'),
  }
})
</script>


