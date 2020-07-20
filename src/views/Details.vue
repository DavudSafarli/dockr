<template>
  <div class="details h-screen flex flex-col">
    <header-container class="pr-12 pl-2 py-3"></header-container>
    <div class="flex-grow flex  min-h-0">
      <div class="mt-4 w-1/5 mx-auto">
        <tab-list v-model="currentTab" :tabs="tabs" class=""></tab-list>
      </div>
      <component class="w-8/12" :is="currentTabComponent"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { store } from '@/store';
import { TabOptions, Dict } from '@/@types';

enum Tabs {
  Inspect = "Inspect",
  Logs = "Logs",
  Stats = "Stats",
}

const componentMap = {
  [Tabs.Inspect]: 'ContainerInspectPane',
  [Tabs.Logs]: 'ContainerLogsPane',
  [Tabs.Stats]: 'ContainerStatsPane',
}

const iconMap = {
  [Tabs.Inspect]: require(`@/assets/icons/tabs/fingerprint.svg`),
  [Tabs.Logs]: require(`@/assets/icons/tabs/bug.svg`),
  [Tabs.Stats]: require(`@/assets/icons/tabs/analytics.svg`),
}

const tabOptions = Object.keys(Tabs)
  .reduce((acc, tabName): Dict<TabOptions> => {
    acc[tabName] = {
      id: tabName,
      title: tabName,
      iconOptions: {
        removeHoverEffect: true,
        iconComponent: iconMap[tabName]
      }
    }
    return acc
  }, {} as Dict<TabOptions>)

export default Vue.extend({
  created() {
    this.$options['tabs'] = tabOptions
  },
  data: () => ({
    currentTab: Tabs.Logs,
  }),
  computed: {
    container() {
      return store.containers[this.$route.params.id]
    },
    currentTabComponent() {
      return componentMap[this.currentTab]
    },
    tabs() {
      return Object.values(this.$options['tabs']);
    }
  },
  components: {
    VTabs: require('@/organisms/VTabs.vue').default,
    TabList: require('@/templates/detailsPanes/TabList.vue').default,
    ContainerInspectPane: require('@/templates/detailsPanes/ContainerInspectPane.vue').default,
    ContainerLogsPane: require('@/templates/detailsPanes/ContainerLogsPane.vue').default,
    ContainerStatsPane: require('@/templates/detailsPanes/ContainerStatsPane.vue').default,
    HeaderContainer: require('@/templates/detailsPanes/HeaderContainer.vue').default,
	}
})

</script>

<style lang="scss">
.basis-0 {
  flex-basis: 0;
}
</style>
