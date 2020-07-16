<template>
  <div class="flex border-b items-center">
    <v-icon class="w-8 mr-2 -mt-1" :options=backIconOptions></v-icon>
    <container-list-item class="flex-grow" :container=container></container-list-item>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Vue, { PropOptions } from 'vue';
import { store } from '../../store';
import { IconOptions } from '../../@types';
import { COLOR } from '../../utils/colors';

export default Vue.extend({
  computed: {
    container() {
      return store.containers[this.$route.params.id]
    },
    backIconOptions(): IconOptions {
      return {
        iconComponent: require('@/assets/icons/buttons/left.svg'),
        removeHoverEffect: true,
        class: {},
        onclick: () => this.$router.push({name: 'home'})
      }
    }
  },
  components: {
    VIcon: require('@/atoms/buttons/VIcon.vue').default,
    ContainerListItem: require('@/organisms/ContainerListItem.vue').default,
  }
})
</script>

