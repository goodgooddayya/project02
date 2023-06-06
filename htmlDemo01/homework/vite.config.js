import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 引入插件
import AutoImport from 'unplugin-auto-import/vite';
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports:['vue']// 将vue作为全局变量导入，在组件中不再需要单独导入
    })
  ]
});




