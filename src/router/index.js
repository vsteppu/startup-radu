// src/router.js
import { createRouter, createWebHistory } from "vue-router";
import { useRegisterStore } from "../stores/registerStore.js";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '@/firebase/Firebase';


import Home from "../views/Home.vue";
import Favorite from "../views/Saved.vue";
import Register from "@/views/Register.vue";
import Login from "@/views/Login.vue";
import MySpace from "@/views/MySpace.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/favorite", component: Favorite },
  { path: "/register", component: Register },
  { path: "/Login", component: Login },
  { path: "/MySpace", component: MySpace },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useRegisterStore(); 
  const isAuthenticated = userStore.user;

  if (
    to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated
  ) {
    next("/login"); // Redirecționează către login dacă ruta necesită autentificare
  } else {
    next(); // Permite navigarea
  }
});

export default router