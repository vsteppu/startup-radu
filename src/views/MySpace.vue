<script setup>
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

</script>

<template>
    My Space:<p v-if="userStore.user">{{ userStore.user.email }}</p>
    <button @click="logout">Log out</button>
</template>