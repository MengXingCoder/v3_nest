// utils/menuData.ts
import type { MenuItem } from '@/types/menu';

export const menuData: MenuItem[] = [
  {
    id: 'home',
    title: '首页',
    path: '/',
    name: 'Dashboard',
  },
  {
    id: 'system',
    title: '系统管理',
    children: [
      { id: 'log', title: '系统日志', path: '/system/log' },
      { id: 'config', title: '系统配置', path: '/system/config' },
      { id: 'notice', title: '通知公告', path: '/system/notice' },
    ],
  },
  {
    id: 'user',
    title: '用户管理',
    children: [
      { id: 'role', title: '角色管理', path: '/user/role' },
      { id: 'menu', title: '菜单管理', path: '/user/menu' },
    ],
  },
  {
    id: 'permission',
    title: '权限管理',
    children: [{ id: 'dept', title: '部门权限', path: '/permission/dept' }],
  },
  {
    id: 'nested',
    title: '多级菜单',
    children: [
      {
        id: 'level1',
        title: '一级菜单',
        children: [
          {
            id: 'level2',
            title: '二级菜单',
            children: [
              { id: 'level3-1', title: '三级菜单1', path: '/nested/level3-1' },
              { id: 'level3-2', title: '三级菜单2', path: '/nested/level3-2' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'feature',
    title: '组件功能',
    children: [
      { id: 'transform', title: '数据转换', path: '/feature/transform' },
      {
        id: 'file',
        title: '文件处理',
        children: [
          { id: 'upload', title: '文件上传', path: '/feature/file/upload' },
          { id: 'download', title: '文件下载', path: '/feature/file/download' },
        ],
      },
    ],
  },
];
