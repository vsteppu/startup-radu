<script setup>
import { useAuthStore } from '@/stores/authStore.js';
import { useRouter } from 'vue-router';
import { auth } from '@/firebase/Firebase';
import { ref } from 'vue';

const router = useRouter()
const authStore = useAuthStore();

const currentPassword = ref('vstepugmail.9999')
const newPassword = ref('vstepugmail.11111')
const confirmNewPassword = ref('vstepugmail.11111')
const error = ref('')
const errorMessage = ref('')
const isReauthenticate = ref(false)
const isActive = ref(false)


const reauthenticateuser = async () => {
  const succes = await authStore.reauthenticateUser(currentPassword.value);
  isReauthenticate.value = succes
  console.log(isReauthenticate.value)
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
  } catch (error) {
    errorMessage.value = error.message;
  }
}


</script>

<template>
  <h2 v-if="authStore.user"> My Space: {{ authStore.user.email }}
    <br>
    <button @click="logout">Log out</button><br>
    <button @click="changePasswordButton">Change password</button>
    <div v-if="isActive">
      <input v-model="currentPassword" type="password" placeholder="Type current password"><br>
      <button @click="reauthenticateuser">ReauthenticateUser</button>
      <div v-if="isReauthenticate">
        <input v-model="newPassword" type="password" placeholder="Type new password"><br>
        <input v-model="confirmNewPassword" type="password" placeholder="Confirm new password"><br>
        <button @click="changepassword">ChangePassword</button>
      </div>

      {{ error }} {{ errorMessage }}

    </div>

  </h2>
  <h3 v-else><router-link to="/Login">Please Log in</router-link></h3>


</template>