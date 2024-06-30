<template>
	<div class="flex items-center rounded-md bg-gray-200 dark:bg-gray-700 px-2 py-1 shrink-0 cursor-pointer gap-1">
		<div v-html="icon" class="flex" />
		<div class="font-semibold" :class="[`text-${color}-500`]">{{ text }}</div>
		<div class="text-sm text-gray-600 dark:text-gray-400">
			<count-to :start-val="0" :end-val="number" :duration="2000"></count-to>
		</div>
	</div>
</template>