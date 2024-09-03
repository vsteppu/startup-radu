<script setup>

import { onBeforeMount } from 'vue';
import { useRegisterStore } from '@/stores/registerStore.js';
import { auth } from '@/firebase/Firebase';

const userStore = useRegisterStore();

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


</template>