<template>
  <h1>{{ title }}</h1>
  <div data-testid="counter">{{ count }}</div>
  <button @click="increaseCount">Add</button>
</template>
<script setup lang="ts">
import { ref } from "vue";

defineProps<{ title: string }>();
const count = ref(0);
const increaseCount = () => {
  count.value = count.value + 1;
};
</script>''
