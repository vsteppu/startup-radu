<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';

const email = ref('vstepu@gmail.com')
const password = ref('vstepu@gmail.com')
const confirmationpassword = ref('vstepu@gmail.com')

const router = useRouter();
const userStore = useAuthStore();

const register = async () => {
    const user = await userStore.registerUser(email.value, password.value);
    if (user) {
      router.push('/');
    } else {
      console.log(userStore.errorMessage); // Afișează mesajul de eroare
    }
  };

</script>

<template>
  <h2>Register</h2>
  <div v-if="password.value === confirmationpassword.value">
    <form @submit.prevent="register">
      <input v-model="email" placeholder="Enter email" type="email"><br>
      <input v-model="password" placeholder="Enter password" type="password"><br>
      <input v-model="confirmationpassword" placeholder="Enter password" type="password"><br>
      <button @click="register">Submit</button>
      <p>{{ userStore.errorMessage }}</p>
    </form>
  </div>

</template>