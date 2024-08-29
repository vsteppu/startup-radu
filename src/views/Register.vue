<script setup>
import { ref } from 'vue';
import { useRegisterStore } from '../stores/registerStore.js';
import { useRouter } from 'vue-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/Firebase';

// Crearea instanței de store
const feedbackMessage = ref('')
const email = ref('')
const password = ref('')
const repeatPassword = ref('')
const router = useRouter();

const userStore = useRegisterStore();

const register = async () => {
  if (email.value && password.value) {
    const userExists = userStore.users.find(u => u.email === email.value);
    if (userExists) {
      feedbackMessage.value = 'User already exists';
    } else {
      try {
        await createUserWithEmailAndPassword(auth, email.value, password.value);
        feedbackMessage.value = 'User registered successfully';
        router.push('/');
        // Redirecționare sau alte acțiuni post-înregistrare
      } catch (error) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            feedbackMessage.value = 'This email is already in use.';
            break;
          case 'auth/invalid-email':
            feedbackMessage.value = 'Invalid email address.';
            break;
          case 'auth/weak-password':
            feedbackMessage.value = 'The password is too weak.';
            break;
          default:
            feedbackMessage.value = 'An unexpected error occurred: ' + error.message;
        }
      }
    }
    } else {
      feedbackMessage.value = 'Please enter both email and password';
    }
  };

</script>

<template>
  <h2>Register</h2>
  <form @submit.prevent="register">
    <input v-model="email" placeholder="Enter email">
    <input v-model="password" placeholder="Enter password" type="password">
    <input v-if="password == repeatPassword" v-model="repeatPassword" placeholder="Repeat password" type="password">
    <p v-else>Please introduce the same passwords</p>
    <button @click="register">Submit</button>
    <p>{{ feedbackMessage }}</p>
  </form>

</template>