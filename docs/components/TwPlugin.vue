<script setup>
import { computed } from 'vue';

const props = defineProps(['name']);
const baseurl = 'https://neotw.vercel.app/#';
const href = computed(() => {
  return baseurl + encodeURIComponent('$:/plugins/oeyoews/' + props.name);
});
</script>

<template>
  <a :href="href" rel="noopener noreferrer" target="_blank">
    {{ name }}
  </a>
</template>
