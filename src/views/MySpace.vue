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
  <div class="flex justify-center items-center relative top-20 inset-0 ">
    <h2 v-if="authStore.user" class=" grid place-items-start  py-8 px-20 rounded-lg bg-gray-100 shadow-xl"> My Space: {{ authStore.user.email }}
      <button @click="changePasswordButton"  class=" bg-gray-200 p-2 my-1 rounded-xl hover:bg-[#ede8e3] hover:text-amber-900 ">Change password</button>
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
      <button @click="logout" class=" bg-gray-200 p-2 my-1 rounded-xl hover:bg-[#ede8e3] hover:text-amber-900 ">Log out</button><br>
    </h2>
  </div>

    
</template>