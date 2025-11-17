<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <nav style="padding: 1rem; background: #f0f0f0">
    <RouterLink to="/">Home</RouterLink> |
    <RouterLink to="/about">About</RouterLink>
  </nav>
  <main style="padding: 1rem">
    <RouterView />
  </main>
</template>
