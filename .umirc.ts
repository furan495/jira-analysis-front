import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  history: { type: 'hash' },
  routes: [
    {
      path: '/', component: '@/layouts/index', routes: [
        { path: 'login', component: '@/pages/login' },
        { path: 'index', component: '@/pages/index' },
        { path: 'detail', component: '@/pages/detail' },
      ]
    },
  ],
  proxy: {
    '/api': {
      target: 'http://localhost:8888/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    }
  }
});
