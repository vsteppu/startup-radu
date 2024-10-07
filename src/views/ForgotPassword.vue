<script setup>
import { ref } from 'vue';
import { validateFormForEmail } from '@/utilities/validationerrors.js'
import { useAuthStore } from '../stores/authStore.js';

const authStore = useAuthStore();

const email = ref('shtepuvlad@gmail.com');
const errorMessage = ref('')
const wasSent = ref(false)

const forgotButton = async () => {
  try {
    validateFormForEmail(email.value);
    await authStore.sendResetLink(email.value)
    wasSent.value = true
  } catch (error) {
    errorMessage.value = error.message;
  }
}
</script>

<template>
  <div class="flex justify-center items-center relative top-20 inset-0  ">
    <div class=" justify-center w-2/5 py-8 px-20 rounded-lg bg-gray-100 shadow-xl">
      <p class="font-bold text-lg ">Change Password via Email</p>
      <div class="flex w-full"> 
        <input v-model="email" class=" w-full border rounded-l-xl bg-gray-200 my-2 pl-3 py-1 h-9 " type="email" placeholder="Enter your email"><br>
        <button @click="forgotButton" class="w-32 h-9 my-2 px-2 border rounded-r-xl bg-gray-200   ">Send Link</button><br>
      </div>
        <p v-if="wasSent" class="text-yellow-700">Email for reset password was sent</p>
        <router-link to="/" class=" hover:text-yellow-700 " >Go back home</router-link><br>
    </div>
  </div>

</template>