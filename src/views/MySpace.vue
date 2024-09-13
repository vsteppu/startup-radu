<script setup>

import { onBeforeMount } from 'vue';
import { useAuthStore } from '@/stores/authStore.js';
import { auth } from '@/firebase/Firebase';

const userStore = useAuthStore();

const logout = async () => {
  try {
    await auth.signOut();
    userStore.setUser(null);
  } catch (error) {
    errorMessage.value = error.message;
  }
};
    
onBeforeMount(async () => {
      await userStore.user; 
    });

</script>

<template>
  <h2  v-if="userStore.user"> My Space:  {{ userStore.user.email }} 
     <button @click="logout">Log out</button>
  </h2>
  <h3 v-else><router-link to="/Login">Please Log in</router-link></h3>


</template>