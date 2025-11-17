import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { setupRouter } from '@/router/index';
import { setupStore } from './stores';
// 引入 Element Plus 样式
import 'element-plus/dist/index.css';

// 全局注册所有组件（开发阶段用，生产环境需要按需引入）
import ElementPlus from 'element-plus';
const app = createApp(App);

setupStore(app);
setupRouter(app);
app.use(ElementPlus);
app.mount('#app');
