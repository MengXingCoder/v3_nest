<template>
  <ul class="menu">
    <li v-for="item in menuList" :key="item.id" class="menu-item">
      <!-- 如果有 path，说明是可点击的叶子节点 -->
      <template v-if="item.path">
        <router-link :to="item.path" class="menu-link" active-class="active">
          {{ item.title }}
        </router-link>
      </template>

      <!-- 如果没有 path 但有 children，说明是父级菜单（折叠项） -->
      <template v-else-if="item.children && item.children.length">
        <div class="menu-parent" @click="toggle(item.id)">
          {{ item.title }}
          <span class="arrow">{{
            expandedKeys.includes(item.id) ? '▼' : '▶'
          }}</span>
        </div>
        <div v-show="expandedKeys.includes(item.id)" class="submenu">
          <RecursiveMenu
            :menu-list="item.children"
            @update-expanded="emitExpanded"
          />
        </div>
      </template>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { MenuItem } from '@/types/menu';

const props = defineProps<{
  menuList: MenuItem[];
}>();

const emit = defineEmits<{
  (e: 'updateExpanded', keys: string[]): void;
}>();

// 控制展开的菜单 ID 列表（简单版，可用 Pinia 管理）
const expandedKeys = ref<string[]>([]);

const toggle = (id: string) => {
  if (expandedKeys.value.includes(id)) {
    expandedKeys.value = expandedKeys.value.filter(k => k !== id);
  } else {
    expandedKeys.value.push(id);
  }
  emit('updateExpanded', expandedKeys.value);
};

// 向上透传展开状态（用于跨层级同步）
const emitExpanded = (keys: string[]) => {
  expandedKeys.value = keys;
  emit('updateExpanded', keys);
};
</script>

<style scoped>
.menu {
  list-style: none;
  padding: 0;
  margin: 0;
}
.menu-item {
  margin: 4px 0;
}
.menu-link,
.menu-parent {
  display: block;
  padding: 8px 16px;
  text-decoration: none;
  color: #333;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.2s;
}
.menu-link:hover,
.menu-parent:hover {
  background-color: #f0f0f0;
}
.menu-link.active {
  background-color: #e6f7ff;
  font-weight: bold;
}
.arrow {
  float: right;
  font-size: 12px;
  color: #999;
}
.submenu {
  padding-left: 16px;
}
</style>
