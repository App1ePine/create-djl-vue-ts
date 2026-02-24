import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';
import { staticRoutes } from './staticRoutes';

const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutes as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export default router;
