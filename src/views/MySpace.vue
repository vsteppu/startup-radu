<script setup>
import { useAuthStore } from '@/stores/authStore.js';
import { useRouter } from 'vue-router';
import { auth } from '@/firebase/Firebase';
import { ref } from 'vue';

const router = useRouter()
const authStore = useAuthStore();

const currentPassword = ref('vstepuGmail.9999')
const newPassword = ref('vstepugmail.11111')
const confirmNewPassword = ref('vstepugmail.11111')
const error = ref('')
const errorMessage = ref('')
const isReauthenticate = ref(false)
const isActive = ref(false)
const isPasswordVisible = ref(false);
const isReauthenticatePasswordVisible = ref(false);

const reauthenticateuser = async () => {
  const succes = await authStore.reauthenticateUser(currentPassword.value);
  isReauthenticate.value = succes
  console.log('Value of isReauthenticate =' + isReauthenticate.value)
  return succes
};

const changepassword = async () => {
  if (newPassword.value === confirmNewPassword.value) {
    if (isReauthenticate.value) {
      const user = await authStore.changePassword(newPassword.value)
      if (user) {
        router.push('/')
      } else {
        console.log(authStore.errorMessage);
      }
    } else {
      error.value = 'Reautentificarea eșuată. Te rugăm să încerci din nou.';
    }
  }
}

const changePasswordButton = () => {
  isActive.value = !isActive.value
}

const logout = async () => {
  try {
    await auth.signOut();
    authStore.setUser(null);
    router.push('/')
  } catch (error) {
    errorMessage.value = error.message;
  }
}

const togglePasswordVisibiliti = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}

const toggleReauthenticatePasswordVisibiliti = () => {
  isReauthenticatePasswordVisible.value = !isReauthenticatePasswordVisible.value
}

</script>

<template>
  <h2 v-if="authStore.user"> My Space: {{ authStore.user.email }}
    <br>
    <p @click="changePasswordButton" style="cursor: pointer; font-size: 16px;">Change password</p>
    <div v-if="isActive">
      <input v-model="currentPassword" :type="isReauthenticatePasswordVisible ? 'text' : 'password'"
        placeholder="Type current password">
      <button @click="toggleReauthenticatePasswordVisibiliti" type="button">
        {{ isReauthenticatePasswordVisible ? 'Hide Password' : 'Show Password' }} </button>
      <br>
      <button @click="reauthenticateuser" style="cursor: pointer;">ReauthenticateUser</button>
      <div v-if="isReauthenticate">
        <input v-model="newPassword" :type="isPasswordVisible ? 'text' : 'password'" placeholder="Type new password">
        <input v-model="confirmNewPassword" :type="isPasswordVisible ? 'text' : 'password'" placeholder="Confirm new password">
        <button @click="togglePasswordVisibiliti" type="button">
          {{ isPasswordVisible ? 'Hide Password' : 'Show Password' }} </button>
          <br>
        <button @click="changepassword">ChangePassword</button>
      </div>
      {{ error }} {{ errorMessage }}
    </div>
    <button @click="logout">Log out</button><br>
  </h2>


</template>