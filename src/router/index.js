// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Favorite from '../views/Saved.vue';
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';



const routes = [
  { path: '/', component: Home },
  { path: '/favorite', component: Favorite },
  { path: '/register', component: Register },
  { path: '/Login', component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;