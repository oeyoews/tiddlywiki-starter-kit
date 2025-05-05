<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  name: string;
}>();
const baseurl = 'https://tiddlywiki-starter-kit.oeyoews.top/#';
const href = computed(() => {
  return baseurl + encodeURIComponent('$:/plugins/oeyoews/' + props.name);
});
const betterName = computed(() => {
  return props.name.replace('-', ' ').toUpperCase();
});
</script>

<template>
  <a
    :href="href"
    rel="noopener noreferrer"
    target="_blank"
    :title="name"
    class="font-bold !no-underline"
  >
    🧩 {{ betterName }}
  </a>
</template>
