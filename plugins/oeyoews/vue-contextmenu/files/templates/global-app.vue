<template>
	<!-- drag  -->
	<button
		class="fixed p-2 shadow-sm bg-gray-100 dark:bg-dimmed-700 rounded-full flex items-center hover:scale-105 z-10 opacity-50 hover:opacity-100"
		@click="onContextMenu" v-html="icons.setting" title="Setting"
		:style="{ top: buttonY + 'px', left: buttonX + 'px' }" @mousedown="startDrag"> </button>
</template>