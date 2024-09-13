<script setup>
import { useAuthStore } from '@/stores/authStore.js';

const userStore = useAuthStore();

</script>

<template>
  <div>
    <router-link to="/">Home</router-link>
    <router-link to="/Favorite">Saved</router-link>
    <router-link v-if="!userStore.user" to="/Login">Log in</router-link>
    <router-link v-if="userStore.user" to="/MySpace">Logged in as: {{ userStore.user.email }}</router-link>
    <router-link v-else to="/Register">Register</router-link>
  </div>

  <div class="container">
    <router-view></router-view>
  </div>

</template>