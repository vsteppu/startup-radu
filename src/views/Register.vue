<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';

// Crearea instanței de store
/* const email = ref('')
const password = ref('')
const confirmationpassword = ref('') */
const email = ref('hhh2345@gmail.com')
const password = ref('880')
const confirmationpassword = ref('880')

const router = useRouter();
const userStore = useAuthStore();


console.log(password.value === confirmationpassword.value)
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
      <input v-model="email" placeholder="Enter email"><br>
      <input v-model="password" placeholder="Enter password" type="password"><br>
      <input v-model="confirmationpassword" placeholder="Enter password" type="password"><br>
      <button @click="register">Submit</button>
      <p>{{ userStore.errorMessage }}</p>
    </form>
  </div>

</template>