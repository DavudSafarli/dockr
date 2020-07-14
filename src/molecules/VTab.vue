<template>
	<div class="flex items-center px-2 py-1">
		<div class="w-6 h-6 mr-4">
			<v-icon :options="options.iconOptions"
			class="w-full h-full border-none">i</v-icon>
		</div>
		<span>{{options.title}}</span>
	</div>
</template>

<script lang="ts">
// @ is an alias to /src
import Vue, { PropOptions } from 'vue';
import { IconOptions } from '../@types';
import { once } from 'lodash'

const on = once(function() {
  //@ts-ignore
  this.$emit("ready")
})
export default Vue.extend({
	props: {
    options: <PropOptions<IconOptions>> Object
  },
  mounted() {
    on.call(this)
  },
  components: {
		// fingerprint.svg
		VIcon: () => import('@/atoms/buttons/VIcon.vue'),
		VText: () => import('@/atoms/texts/VText.vue'),
	}
})
</script>

