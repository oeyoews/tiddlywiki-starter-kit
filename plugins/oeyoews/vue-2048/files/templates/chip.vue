<template hidden>
	<template hidden>
		<transition :css="false" @enter="enter">
			<div class="chip" :style="style">{{ chip.value }}</div>
		</transition>
	</template>
</template>