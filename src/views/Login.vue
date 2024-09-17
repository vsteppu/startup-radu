<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore.js';
import { useRouter } from 'vue-router';


const email = ref('shtepuvlad@gmail.com');
const emailtosend = ref('');
const password = ref('vstepugmail.9999');
const errorMessage = ref('');
const isActive = ref('true');
const errorCodes = {
      'auth/invalid-credential': 'Invalid Login or Password. Try to type again',
      'auth/too-many-requests': 'Too many requests to log in. Change your password or try later.',
      'auth/invalid-email' :'Make sure if Email is typed',
      'auth/missing-password':'Make sure if password is typed',
    }

const router = useRouter()
const authStore = useAuthStore();

const login = async () => {
  try {
    // de inclus if pentru verificarea email si password inainte sa trimita pe auth
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
    if (email.value !== '') {
      await authStore.checkUserExists(email.value);
      isActive.value = true
    } else {
      isActive.value = false
      if (emailtosend.value !== '') {
        console.log('forgot password form-link sent to: ' + emailtosend.value)
        isActive.value = true
      } else {
        console.log('Complete the email field')
        isActive.value = false
      }
    }
  } catch (error) {
    errorMessage.value = 'This error ocured' + error.message;
  }
}
/* 
const sendviaemail = () => {
  if (emailtosend.value !== '') {
    console.log('forgot password form-link sent to: ' + emailtosend.value)
    isActive.value = true
  } else {
    isActive.value = false
  }

}
 */


</script>

<template>
  <div>
    <h2>Log in</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
      <p @click="forgotButton">Forgot Password?</p>
      <button type="submit">Login</button>
    </form>
    <p v-if="!isActive">
      Change Password via Email: <br>
      <input v-model="emailtosend" type="email" placeholder="Type email to send form-link" /><br>
      <button @click="forgotButton">Send</button>
    </p>
  </div>
</template>