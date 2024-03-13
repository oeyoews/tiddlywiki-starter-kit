<template>
	<div class="flex items-center rounded-md bg-gray-200 dark:bg-gray-700 px-2 py-1 shrink-0">
		<span v-html="icon" />
		<span class="ml-1 font-semibold" :class="[`text-${color}-500`]">{{ text }}</span> <span
			class="ml-2 text-sm text-gray-600 dark:text-gray-400"> {{ number }} </span>
	</div>
</template>