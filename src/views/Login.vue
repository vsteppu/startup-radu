<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore.js';
import { useRouter } from 'vue-router';

const email = ref('vstepu@gmail.com');
const password = ref('123456');

const router = useRouter()
const userStore = useAuthStore();

const login = async () => {
  const user = await userStore.authUser(email.value, password.value);
  if (user) {
    router.push('/');
  } else {
    console.log(userStore.errorMessage); // Afișează mesajul de eroare
  }
};

</script>

<template>
  <div>
    <h2>Log in</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
    <p>{{ userStore.errorMessage }}</p>
  </div>
</template>