<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore.js';
import { useRouter } from 'vue-router';


const email = ref('shtepuvlad@gmail.com');
const password = ref('vladsteppu@gmail');
const wasSent = ref('');

const errorMessage = ref('');
const errorCodes = {
  'auth/invalid-credential': 'Invalid Login or Password. Try to type again',
  'auth/too-many-requests': 'Too many requests to log in. Change your password or try later.',
  'auth/invalid-email': 'Make sure if Email is typed',
  'auth/missing-password': 'Make sure if password is typed',
}

const router = useRouter()
const authStore = useAuthStore();

const isValidateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const login = async () => {
  try {
    if (email.value.trim() === '') throw new Error('Enter the email adress');

    console.log(isValidateEmail(email.value))
    if (!isValidateEmail(email.value)) throw new Error('Enter the valid email adress');


    const user = await authStore.authUser(email.value, password.value);

    if (user) {
      router.push('/');
    }
  } catch (error) {
    errorMessage.value = errorCodes[error.code] ?? error.message;
  }
};



const forgotButton = async () => {
  try {
    if (email.value.trim() === '') throw new Error('Enter the email adress in email adress field');
    if (!isValidateEmail(email.value)) throw new Error('Enter the valid email adress');
    await authStore.sendResetLink(email.value)
    wasSent.value = true
  } catch (error) {
    errorMessage.value = error.message;
  }
}

</script>

<template>
  <div>
    <h2>Log in</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <p @click="forgotButton" style="cursor: pointer;">
        {{ wasSent ? 'Email with reset password link was sent' : 'Forgot Password' }}
      </p>
      <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
      <button type="submit">Login</button>
    </form>
  </div>
</template>