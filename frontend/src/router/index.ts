import type { App } from 'vue';
import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from 'vue-router';

// 公共路由（无需 layout）
const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/register/index.vue'),
  },
];

// 私有路由（需要 layout 包裹）
const privateRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
      },
      // 系统管理
      {
        path: '/system/log',
        component: () => import('@/views/system/log.vue'),
      },
      {
        path: '/system/config',
        component: () => import('@/views/system/config.vue'),
      },
      {
        path: '/system/notice',
        component: () => import('@/views/system/notice.vue'),
      },

      // 用户管理
      { path: '/user/role', component: () => import('@/views/user/role.vue') },
      { path: '/user/menu', component: () => import('@/views/user/menu.vue') },

      // 权限管理
      {
        path: '/permission/dept',
        component: () => import('@/views/permission/dept.vue'),
      },

      // 多级菜单
      {
        path: '/nested/level3-1',
        component: () => import('@/views/nested/level3-1.vue'),
      },
      {
        path: '/nested/level3-2',
        component: () => import('@/views/nested/level3-2.vue'),
      },

      // 组件功能
      {
        path: '/feature/transform',
        component: () => import('@/views/feature/transform.vue'),
      },
      {
        path: '/feature/file/upload',
        component: () => import('@/views/feature/file/upload.vue'),
      },
      {
        path: '/feature/file/download',
        component: () => import('@/views/feature/file/download.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...publicRoutes, ...privateRoutes],
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}

export { router };
