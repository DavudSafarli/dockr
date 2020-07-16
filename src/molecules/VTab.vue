<template>
	<div class="flex items-center px-2 py-1 cursor-pointer v-tab">
		<div class="w-6 h-6 mr-4">
			<v-icon :options="tab.iconOptions"
			class="w-full h-full border-none">i</v-icon>
		</div>
		<span>{{tab.title}}</span>
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
    tab: <PropOptions<IconOptions>> Object
  },
  mounted() {
    on.call(this)
  },
  components: {
		VIcon: () => import('@/atoms/buttons/VIcon.vue'),
		VText: () => import('@/atoms/texts/VText.vue'),
	}
})
</script>

<style lang="scss">
.v-tab {
	position: relative;
	// &::after {
	// 	content: "";
	// 	position: absolute;
	// 	right: 0;
	// 	top: 0;
	// 	left: 0;
	// 	bottom: 0;
		background-color: currentColor;
		// opacity: 0;
	// }
	&:hover {
		// &::after {
			opacity: 0.95;
		// }
	}
	&--active, &--active:hover {
		// &::after {
			opacity: 0.85;
		// }
	}
}
</style>