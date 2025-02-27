<template>
	<!-- bg-gray-200 dark:bg-gray-700  -->
	<div class="flex items-center rounded-md px-2 py-1 shrink-0 cursor-pointer gap-1"
		:class="[`border-${color}-400/70`, 'border-[2px]','border-solid', `bg-${color}-500/20`]">
		<div v-html="icon" class="flex" />
		<div class="font-semibold" :class="[`text-${color}-500`]">{{ text }}
		</div>
		<div class="text-sm text-gray-600 dark:text-gray-400">
			<count-to :start-val="0" :end-val="number" :duration="2000"></count-to>
		</div>
	</div>
</template>