<!-- 在线部署的网页不起作用， 即使是默认的404 -->
<script setup>
	import DefaultTheme from 'vitepress/theme'

	const { Layout } = DefaultTheme
</script>

<template>
	<Layout>
		<template #not-found>

		</template>
	</Layout>
</template>