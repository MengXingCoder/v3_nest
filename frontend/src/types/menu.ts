// types/menu.ts
export interface MenuItem {
  id: string | number;
  title: string; // 显示名称
  path?: string; // 对应路由 path（用于跳转）
  name?: string; // 对应路由 name（可选）
  icon?: string; // 图标（可选）
  children?: MenuItem[]; // 子菜单
  hidden?: boolean; // 是否隐藏（如某些路由仅用于嵌套，不显示）
}
