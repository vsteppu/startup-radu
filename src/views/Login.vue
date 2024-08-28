<template>
    <div>
      <h2>Log in</h2>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      <p>{{ errorMessage }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { signInWithEmailAndPassword } from 'firebase/auth';
  import { auth } from '@/firebase/Firebase.js';

      const email = ref('');
      const password = ref('');
      const errorMessage = ref('');
  
      const login = async () => {
        try {
          await signInWithEmailAndPassword(auth, email.value, password.value);
          // Handle successful login (e.g., redirect to another page)
        } catch (error) {
          errorMessage.value = error.message;
        }
      };

  </script>
  