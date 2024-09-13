// src/router.js
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from "pinia";

import Home from "../views/Home.vue";
import Favorite from "../views/Saved.vue";
import Register from "@/views/Register.vue";
import Login from "@/views/Login.vue";
import MySpace from "@/views/MySpace.vue";



const routes = [
  { path: "/", name: Home, component: Home, meta: { requiresAuth: true } },
  { path: "/favorite", name: Favorite, component: Favorite, meta: { requiresAuth: true } },
  { path: "/myspace", name: MySpace, component: MySpace, meta: { requiresAuth: true } },
  { path: "/register", name: Register, component: Register, meta: { requiresAuth: false } },
  { path: "/login", name: Login, component: Login, meta: { requiresAuth: false } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from) => {

  const authStore = useAuthStore()
  const { user } = storeToRefs(authStore)

  if (!authStore.isAuthenticated() && to.meta.requiresAuth === true) {
    return { path: '/login' }
  } else {
    return true
  }
})

export default router