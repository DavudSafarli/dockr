<template>
  <div class="flex flex-col items-start leading-none">
    <div class="flex items-end ">
      <v-text size="lg" class="mr-2">{{shortName}}</v-text>
      <v-text size="sm">{{brief.image}}</v-text>
    </div>
    <div class="">
      <v-text size="sm" class="mr-2">{{stateBrief}}</v-text>
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
    shortName(): string {
      return this.brief?.name?.substr(0, 40)
    },
    stateBrief() : string {
      let b = this.brief
      if (b.state == ContainerState.running) {
        return `${b.state} ${b.status.split(' ').slice(-2).join(' ')}`
      }
      else if (b.state == ContainerState.exited) {
        return `${b.state} ${b.status.split(' ').slice(-3).join(' ')}`
      }
      return ""
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


