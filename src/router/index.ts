import ChartPolarLine from '@/components/ChartPolarLine.vue';
import { createRouter, createWebHistory } from 'vue-router';
import ChartPieView from '../views/ChartPieView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'chartPie',
      component: ChartPieView,
    },
    {
      path: '/chart-column',
      name: 'chartColumn',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ChartColumnView.vue'),
    },
    {
      path: '/chart-polar-line',
      name: 'chartPolarLine',
      component: ChartPolarLine,
    },
  ],
});

export default router;
