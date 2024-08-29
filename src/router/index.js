// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import { useRegisterStore } from '../stores/registerStore.js';

import Home from '../views/Home.vue';
import Favorite from '../views/Saved.vue';
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';
import MySpace from '@/views/MySpace.vue';



const routes = [
  { path: '/', component: Home },
  { path: '/favorite', component: Favorite },
  { path: '/register', component: Register },
  { path: '/Login', component: Login },
  { path: '/MySpace', component: MySpace },

  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  const userStore = useRegisterStore()
  const isAuthenticated = userStore.user;
  if (
    // make sure the user is authenticated
    !isAuthenticated &&
    // ❗️ Avoid an infinite redirect
    to.path !== '/Login'
  ) {
    // redirect the user to the login page
    return { path: '/Login' };
  }
});

export default router;