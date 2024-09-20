<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';
import { errorCodes } from '@/errors/autherrors'



const router = useRouter();
const authStore = useAuthStore();

const email = ref('shtepuvlad@gmail.com')
const password = ref('vstepuGmail.9999')
const confirmationpassword = ref('vstepuGmail.9999')
const errorMessage = ref('')
const isPasswordVisible = ref(false);
/* const errorCodes = {
  'auth/email-already-in-use': 'Email alredy in use',
  'auth/missing-email': 'Email is missing'
}
 */
const register = async () => {
  try {
    //validateFormForEmail(email.value);
    //validateFormForPassword(password.value, confirmationpassword.value);
    const user = await authStore.registerUser(email.value, password.value);
    if (user) {
      router.push('/');
    }
  } catch (error) {
    errorMessage.value = errorCodes[error.code] ?? error.message;
  }
}

const togglePasswordVisibiliti = () =>{
isPasswordVisible.value=!isPasswordVisible.value
} 

</script>

<template>
  <h2>Register</h2>
  <form @submit.prevent="register">
    <input v-model="email" placeholder="Enter email" type="email">
    <br>
    <input v-model="password" placeholder="Enter password" :type="isPasswordVisible ? 'text':'password'">
    <br>
    <input v-model="confirmationpassword" placeholder="Enter password" :type="isPasswordVisible ? 'text':'password'">
    <br>
    <button @click="togglePasswordVisibiliti" type="button">
      {{ isPasswordVisible ? 'Hide Passwords' : 'Show  Passwords' }}
    </button>
    <br>
    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
  </form>
  <button @click="register">Submit</button>

</template>