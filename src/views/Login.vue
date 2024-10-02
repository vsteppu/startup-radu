<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore.js';
import { useRouter } from 'vue-router';
import { validateFormForEmail } from '@/utilities/validationerrors.js'
import { errorCodes } from '@/utilities/autherrors'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('shtepuvlad@gmail.com');
const password = ref('vstepuGmail.9999');
const errorMessage = ref('');
const authErrors = ref('');
const isPasswordVisible = ref(false);

/* 
const errorCodes = {
  'auth/invalid-credential': 'Invalid Login or Password. Try to type again',
  'auth/too-many-requests': 'Too many requests to log in. Change your password or try later.',
  'auth/invalid-email': 'Make sure if Email is typed',
  'auth/missing-password': 'Make sure if password is typed',
} 
*/

const login = async () => {
  try {
    validateFormForEmail(email.value);
    const user = await authStore.authUser(email.value, password.value);
    if (user) { router.push('/'); }
  } catch (error) {
    errorMessage.value = errorCodes[error.code] ?? error.message;
  }
};




const togglePasswordVisibiliti = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}

</script>

<template>
  <div>
    <h2>Log in</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" /><br>
      <input :type="isPasswordVisible ? 'text' : 'password'" v-model="password" placeholder="Password" />
      <button @click="togglePasswordVisibiliti" type="button">{{ isPasswordVisible ? 'Hide' : 'Show' }} </button><br>
      <router-link to="/forgotpasslink">Forgot Password</router-link><br>
      <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
      <button type="submit">Login</button>
    </form>
  </div>
  <router-view></router-view>
</template>