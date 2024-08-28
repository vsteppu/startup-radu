<template>
  <router-link to="/">Home</router-link>|
  <router-link to="/Favorite">Saved</router-link>|
  <router-link to="/Login">Log in</router-link>|
  <router-link to="/Register">Register</router-link>

  <div class="container"> 
    <router-view></router-view>
  </div>
  
</template>