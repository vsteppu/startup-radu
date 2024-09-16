<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore.js';
import { useRouter } from 'vue-router';

const email = ref('vstepu39@gmail.com');
const password = ref('vstepugmail.9999');

const router = useRouter()
const authStore = useAuthStore();

const login = async () => {
  const user = await authStore.authUser(email.value, password.value);
  if (user) {
    router.push('/');
  } else {
    console.log(authStore.errorMessage); // Afișează mesajul de eroare
  }
};

</script>

<template>
  <div>
    <h2>Log in</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <p style="color: tan;">Forgot Password?</p>
      <button type="submit">Login</button>
    </form>
    <p>{{ authStore.errorMessage }}</p>
  </div>
</template>