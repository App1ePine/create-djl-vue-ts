import type { RouteRecordRaw } from 'vue-router';

export const staticRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/demo',
  },
  {
    path: '/demo',
    name: 'demo',
    component: () => import('@/views/demo/index1.vue'),
  },
];
