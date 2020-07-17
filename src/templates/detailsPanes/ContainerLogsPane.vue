<template>
  <div class="flex flex-col">
    <div class="flex-1 min-h-0 overflow-x-auto">
      <div>
        <div v-for="(log, i) in logs" :key="i">{{log}}</div>
      </div>
    </div>
    <div class="py-3">footer</div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Vue, { PropOptions } from 'vue';
import { store } from '../../store';
import { Container } from '../../@types';

export default Vue.extend({
  data: () => ({
    logs: [] as Array<string>,
  }),
  computed: {
    container(): Container {
      return store.containers[this.$route.params.id]
    },
  },
  async created() {
    let data = await window.api.Container.Logs(this.container.Id)
    this.logs = data.split('\n');
  },
})
</script>

