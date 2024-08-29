<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/Firebase.js';
import { useRegisterStore } from '../stores/registerStore.js';

const email = ref('');
const password = ref('');
const errorMessage = ref('');

const router = useRouter();
const userStore = useRegisterStore();

const login = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;
    
    userStore.setUser(user); // Salvează detaliile utilizatorului în store

    router.push('/'); // Redirecționează utilizatorul după autentificare
  } catch (error) {
    errorMessage.value = error.message;
  }
};
</script>

<template>
  <form @submit.prevent="login">
    <input v-model="email" placeholder="Enter email" />
    <input v-model="password" placeholder="Enter password" type="password" />
    <button @click="login">Login</button>
    <p>{{ errorMessage }}</p>
  </form>
</template>
