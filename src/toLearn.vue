<template>
    <form @submit.prevent="handleRegister">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRegisterStore } from '@/stores/userStore';
  
  // Crearea instanței de store
  const userStore = useRegisterStore();
  
  // Declarațiile reactive pentru email și parolă
  const email = ref('');
  const password = ref('');
  
  // Funcția pentru a gestiona înregistrarea
  const handleRegister = () => {
    // Înregistrează utilizatorul folosind metoda store-ului
    userStore.registerUser(email.value, password.value);
    // Resetează câmpurile
    email.value = '';
    password.value = '';
  };
  </script>
  