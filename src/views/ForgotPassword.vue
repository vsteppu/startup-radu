<script setup>
import { ref } from 'vue';
import { isValidateEmail } from '@/utilities/utilities'
import { useAuthStore } from '../stores/authStore.js';

const authStore = useAuthStore();

const email = ref('shtepuvlad@gmail.com');
const errorMessage = ref('')
const wasSent = ref(false)

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
  Change Password via Email <br>
  <input v-model="email" type="email" placeholder="Enter your email"><br>
  <button @click="forgotButton">Send Link</button><br>
  <p v-if="wasSent" style="color: chocolate;">Email for reset password was sent</p>
  <router-link to="/">Go back home</router-link><br>

</template>