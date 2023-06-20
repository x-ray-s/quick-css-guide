<script setup>
const props = defineProps({
  caption: String,
  source: String,
});
</script>
<template>
  <figure>
    <img :src="props.source" alt="" width="350" />
    <figcaption class="text-xs">{{ props.caption }}</figcaption>
  </figure>
</template>
