<script setup>
import { computed } from "vue";
const props = defineProps({
  content: String,
  lang: String,
});

const langClass = computed(() => {
  if (props.lang === "html") {
    return "language-html";
  }
  return "language-css";
});

const format = computed(() => {
  if (props.lang === "html") {
    return props.content;
  }
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
  <div>
    <pre><code :class="langClass"><slot>{{ format }}</slot></code></pre>
  </div>
</template>
