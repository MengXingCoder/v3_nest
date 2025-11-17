<script setup lang="ts">
import { useCounterStore } from '@/stores';
const store = useCounterStore();
</script>

<template>
  <div>
    <h1>Home</h1>
    <p>Count: {{ store.count }}</p>
    <button @click="store.increment">+1</button>
  </div>
</template>
