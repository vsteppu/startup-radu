<script setup>
import { ref } from 'vue';
import { useRegisterStore } from '../stores/registerStore.js';

// Crearea instanței de store
const feedbackMessage = ref('')
const email = ref('')
const password = ref('')

const userStore = useRegisterStore();

const register = () => {
  if (email.value && password.value) {
    const userExists = userStore.users.find(u => u.email === email.value);
    if (userExists) {
      feedbackMessage.value = 'User already exists';
    } else {
      userStore.checkUserEmail(email.value, password.value);
      feedbackMessage.value = 'User registered successfully';
    }
  } else {
    feedbackMessage.value = 'Please enter both email and password';
  }
};


</script>

<template>
  <input v-model="email" placeholder="Enter email">
  <input v-model="password" placeholder="Enter password" type="password">
  <button @click="register">Submit</button>
  <p>{{ feedbackMessage }}</p>

</template>