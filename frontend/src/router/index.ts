import type { App } from 'vue';
import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from 'vue-router';
const publicRoutes = [
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
] as RouteRecordRaw[];
const privateRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/layout/index.vue'), // ← 布局组件
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
      },
      // 其他需要 layout 的页面...
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
