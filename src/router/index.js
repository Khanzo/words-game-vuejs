import Vue from 'vue';
import VueRouter from 'vue-router';
import Error from '../components/Error.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Game',
    component: () => import('../views/Game.vue'),
  },
  {
    path: '/score',
    name: 'Score',
    component: () => import('../views/Score.vue'),
  },
  {
    path: '*',
    name: 'NotFound',
    component: Error,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
