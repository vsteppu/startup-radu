<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { isValidateEmail, isValidPassword} from '@/utilities/utilities'
import { useRouter } from 'vue-router';
import { validateFormForEmail, validateFormForPassword } from '@/errors/validationerrors.js'



const router = useRouter();
const authStore = useAuthStore();
const isValidPass = isValidPassword();

const email = ref('shtepuvlad@gmail.com')
const password = ref('vstepuGmail.9999')
const confirmationpassword = ref('vstepuGmail.9999')
const errorMessage = ref('')
const isPasswordVisible = ref(false);
const errorCodes = {
  'auth/email-already-in-use': 'Email alredy in use',
  'auth/missing-email': 'Email is missing'
}

const register = async () => {
  try {
    validateFormForEmail(email.value);
    validateFormForPassword(password.value, confirmationpassword.value);
    /* 
    if (email.value.trim() === '') throw new Error('Enter the email adress');
    if (!isValidateEmail(email.value)) throw new Error('Enter the valid email adress');
    if (password.value.length <= 6 ) throw new Error('Passwords must have at least 6 charaters ');
    if (!isValidPass.hasSpecialChar(password.value)) throw new Error("Passwords must have at least one of this /[@.,\\]/ charaters" );
    if (!isValidPass.hasLowerCase(password.value)) throw new Error("Passwords must have at least one lowercase charater" );
    if (!isValidPass.hasUpperCase(password.value)) throw new Error("Passwords must have at least one uppercase charater" );
    if (password.value !== confirmationpassword.value) throw new Error('Passwords are not the same'); */
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