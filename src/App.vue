<script setup>
import { useRegisterStore } from '@/stores/registerStore.js';

const userStore = useRegisterStore();

</script>

<template>

  <p><router-link to="/">Home</router-link></p>
  <p><router-link to="/Favorite">Saved</router-link></p>

  <p v-if="!userStore.user"><router-link to="/Login">Log in</router-link></p>

  <p v-if="userStore.user"><router-link to="/MySpace">Logged in as: {{ userStore.user.email }}</router-link></p>
  <p v-else><router-link to="/Register">Register</router-link></p>

  <div class="container">
    <router-view></router-view>
  </div>

</template>