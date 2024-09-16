<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';

const email = ref('vstepu39@gmail.com')
const password = ref('vstepugmail.9999')
const confirmationpassword = ref('vstepugmail.9999')
const error = ref('')

const router = useRouter();
const authStore = useAuthStore();

const register = async () => {
  if (password.value === confirmationpassword.value) {
    const user = await authStore.registerUser(email.value, password.value);
    if (user) {
      router.push('/');
    } else {
      console.log(authStore.errorMessage); // Afișează mesajul de eroare
    }
  } else {
    error.value = 'Passwords are not the same';
    console.log('Passwords are not the same')
  }
};

</script>

<template>
  <h2>Register</h2>
  <form @submit.prevent="register">
    <input v-model="email" placeholder="Enter email" type="email"><br>
    <input v-model="password" placeholder="Enter password" type="password"><br>
    <input v-model="confirmationpassword" placeholder="Enter password" type="password"><br>
    {{ authStore.errorMessage }} {{ error }}

  </form>
  <button @click="register">Submit</button>

</template>