<script setup>
import { useAuthStore } from '@/stores/authStore.js';
import { storeToRefs } from 'pinia'

const userStore = useAuthStore();
const { user } = storeToRefs(userStore)

</script>

<template>
  <div>
    <router-link to="/">Home</router-link>
    <router-link to="/Saved">Saved</router-link>
    <router-link v-if="!userStore.isAuthenticated()" to="/Login">Log in</router-link>
    <router-link v-if="userStore.isAuthenticated()" to="/MySpace">Logged in as: {{ user.email }}</router-link>
    <router-link v-else to="/Register">Register</router-link>
  </div>

  <div class="container">
    <router-view></router-view>
  </div>

</template>