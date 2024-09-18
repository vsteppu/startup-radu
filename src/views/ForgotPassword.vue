<script setup>
import { useAuthStore } from '@/stores/authStore.js';
import { useRouter } from 'vue-router';
import { auth } from '@/firebase/Firebase';
import { ref } from 'vue';

const router = useRouter()
const authStore = useAuthStore();

const newPassword = ref('vstepugmail.11111')
const confirmNewPassword = ref('vstepugmail.11111')
const errorMessage = ref('')
const isReset = ref(false)

const changepassword = async () => {
  if (newPassword.value === confirmNewPassword.value) {
    const user = await authStore.changePassword(newPassword.value)
      if (user) {
        router.push('/')
      } else {
        console.log(authStore.errorMessage);
      }
  }
}

const changePasswordButton = () => {
  isReset.value = !isActive.value
}



</script>

<template>
  Change Password via Email: <br>
  <input v-model="newPassword" type="password" placeholder="New Password"><br>
  <input v-model="confirmNewPassword" type="password" placeholder="Confirm Password"><br>
  <button @click="changepassword">Reset password</button>
</template>