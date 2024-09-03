<script setup>
import { ref } from 'vue';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/Firebase';
import { useRegisterStore } from '../stores/registerStore.js';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const errorMessage = ref('');

const router = useRouter();
const userStore = useRegisterStore();

const login = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;

    console.log(userCredential);
    console.log(userCredential.user);
    console.log(user.uid);
    console.log(user.email);

    userStore.setUser(user);
    router.push('/');

  } catch (error) {
    errorMessage.value = 'Please enter email and password';
  }
};

</script>

<template>
  <div>
    <h2>Log in</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
    <p>{{ errorMessage }}</p>
  </div>
</template>