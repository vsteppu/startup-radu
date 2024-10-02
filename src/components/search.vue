<script setup>
import { ref, defineEmits } from 'vue';

const searchQuery = ref('web');
const industry = ref('dev');
const geo = ref('usa');

const emit = defineEmits(['submit']);
</script>

<template>
  <header>
    <div>
      <input v-model="searchQuery" @keyup.enter="emit('submit', searchQuery, geo, industry)" />
      <select v-model="geo">
        <option value="usa">USA</option>
        <option value="japan">Japan</option>
      <option value="uk">UK</option>
      </select>
      <select v-model="industry">
        <option value="dev">Programming</option>
        <option value="data-science">Data Science</option>
        <option value="seo">SEO</option>
      </select>
      <button @click="emit('submit', searchQuery, geo, industry)">Search</button>
    </div>
  </header>
</template>
