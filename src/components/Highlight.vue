<script setup>
import { ref } from "vue";

const props = defineProps({
  label: String,
});

const isHover = ref(false);
</script>

<template>
  <div
    class="hover:outline-dashed outline-2 outline-blue-400 relative overflow-hidden"
    @mouseover="isHover = true"
    @mouseleave="isHover = false"
  >
    <slot></slot>
    <div
      class="bg-slate-800 text-white rounded-bl absolute right-0 top-0 px-2 text-sm capitalize"
      :class="{
        hidden: !isHover,
      }"
    >
      {{ props.label }}
    </div>
  </div>
</template>
