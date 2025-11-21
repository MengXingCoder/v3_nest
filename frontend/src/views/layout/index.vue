<!-- views/layout/index.vue -->
<template>
  <div class="layout">
    <div class="sidebar">
      <RecursiveMenu :menu-list="menuData" @update-expanded="handleExpand" />
    </div>
    <div class="main-content">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { menuData } from '@/utils/menuData';
import RecursiveMenu from '@/components/RecursiveMenu.vue';

// 可选：把展开状态存到 localStorage 或 Pinia（这里简化）
const handleExpand = (keys: string[]) => {
  console.log('当前展开的菜单:', keys);
  // 可以存到 store 或 localStorage 实现刷新保留状态
};
</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}
.sidebar {
  width: 220px;
  background-color: #fff;
  border-right: 1px solid #eee;
  overflow-y: auto;
}
.main-content {
  flex: 1;
  padding: 20px;
  background-color: #fafafa;
}
</style>
