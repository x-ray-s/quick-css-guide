<script setup>
import { ref } from "vue";

const complete = ref(true);

const props = defineProps({
  property: String,
  values: Array,
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="css-rules flex">
    <div class="text-sky-500">{{ property }}</div>
    <div class="text-gray-500 mr-1">:</div>
    <div
      class="text-indigo-600 px-2 rounded-sm cursor-pointer relative underline decoration-dashed underline-offset-2"
      @click="complete = !complete"
    >
      {{ modelValue || values[0] }}
      <div
        class="autocomplete"
        :class="{
          hidden: complete,
        }"
      >
        <div
          v-for="v in values"
          v-if="values.length > 1"
          @click="emit('update:modelValue', v)"
        >
          {{ v }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.autocomplete {
  @apply absolute bg-gray-800 rounded-sm  text-white min-w-[96px] text-sm left-full top-full;
}

.autocomplete > div {
  @apply px-1 hover:bg-gray-700 whitespace-nowrap;
}
</style>
