<script setup>
import { computed } from "vue";
const props = defineProps({
  content: String,
});

const format = computed(() => {
  const v = props.content
    .split(";")
    .filter((i) => i)
    .map((i) => {
      return "  " + i.replace(/\s+/g, " ").trim();
    })
    .join(";\n");

  return "{\n" + v + ";\n}";
});
</script>
<template>
  <div class="my-5">
    <pre><code class="language-css"><slot>{{ format }}</slot></code></pre>
  </div>
</template>
