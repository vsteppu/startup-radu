<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';

const email = ref('shtepuvlad@gmail.com')
const password = ref('vstepugmail.9999')
const confirmationpassword = ref('vstepugmail.9999')
const errorMessage = ref('')
const errorCodes = {
  'auth/email-already-in-use': 'Email alredy in use',
  'auth/missing-email': 'Email is missing'
}

const router = useRouter();
const authStore = useAuthStore();

const isValidateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const register = async () => {
  try {
    if (email.value.trim() === '') throw new Error('Enter the email adress');
    if (!isValidateEmail(email.value)) throw new Error('Enter the valid email adress');
    if (password.value !== confirmationpassword.value) throw new Error('Passwords are not the same');
    const user = await authStore.registerUser(email.value, password.value);
    if (user) {
      router.push('/');
    }
  } catch (error) {
    errorMessage.value = errorCodes[error.code] ?? error.message;
  }
}


</script>

<template>
  <h2>Register</h2>
  <form @submit.prevent="register">
    <input v-model="email" placeholder="Enter email" type="email"><br>
    <input v-model="password" placeholder="Enter password" type="password"><br>
    <input v-model="confirmationpassword" placeholder="Enter password" type="password"><br>
    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
  </form>
  <button @click="register">Submit</button>

</template>