<script setup>
import { useAuthStore } from '@/stores/authStore.js';
import { storeToRefs } from 'pinia'

const userStore = useAuthStore();
const { user } = storeToRefs(userStore)

</script>

<template>
  <div class="sticky top-0 flex items-center bg-[#ede8e3] px-32 justify-between shadow-md z-10 ">
    <div class="ml-5 flex content-between text-md font-sl uppercase ">
      <router-link to="/" class=" w-32 flex items-center justify-center "><img src="@/media/Logo001.png" alt="Image" class="h-12 mx-5 my-2"></router-link>
      <router-link to="/" class="nav-item">Home</router-link>
      <router-link to="/Saved" class="nav-item">Saved</router-link>
      <router-link v-if="!userStore.isAuthenticated()" to="/Login" class="nav-item">Log in</router-link>
      <router-link v-if="!userStore.isAuthenticated()" to="/Register" class="nav-item">Register</router-link>
      <router-link v-if="userStore.isAuthenticated()" to="/MySpace" class="nav-item">My Space</router-link>
      <div class="active bottom-0"></div>
    </div>
    <div>
      <a href=""><img src="@/media/Insta.png" alt="Instagram link" class=" opacity-50 h-8 mx-5 my-2"></a>
    </div>
  </div>

  <div >
    <router-view></router-view>
  </div>

</template>

<style scooped>

 .nav-item{
  width: 8rem;
    text-align: center;
    padding-block: 20px;
}
 .active{
    position: absolute;
    height: 1px;
    width: 8rem;
    background-color: black;
    transition: transform 0.2s;
}

.nav-item:nth-child(2):hover ~ .active{
    transform: translateX(8rem);
}

.nav-item:nth-child(3):hover ~ .active{
    transform: translateX(16rem);
}

.nav-item:nth-child(4):hover ~ .active{
    transform: translateX(24rem);
}

.nav-item:nth-child(5):hover ~ .active{
    transform: translateX(32rem);
}
.my-space:nth-child(5):hover ~ .active{
    transform: translateX(32rem);
}
</style>