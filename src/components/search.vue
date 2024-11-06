<script setup>
import { ref, defineEmits } from 'vue';

const searchQuery = ref('web');
const industry = ref('dev');
const geo = ref('usa');

const emit = defineEmits(['submit']);
</script>

<template>
  <header class="flex justify-center">
    <div class=" w-11/12 ">
      <div class="flex ">
        <input 
        v-model="searchQuery" 
        @keyup.enter="emit('submit', searchQuery, geo, industry)" 
        class=" border-[1px] border-gray-100 w-full pl-3 py-2 rounded-t-xl bg-gray-200"
        @focus='(e)=>{e.target.select()}'
        />
      </div>
      <div class="flex">
        <select v-model="geo" class=" border-[1px] border-gray-100 w-full pl-3 py-2 rounded-bl-xl bg-gray-200">
          <option value="usa">USA</option>
          <option value="japan">Japan</option>
          <option value="uk">UK</option>
        </select>
        <select v-model="industry" class=" border-[1px] border-gray-100 w-full pl-3 py-2 rounded-br-xl bg-gray-200">
          <option value="dev">Programming</option>
          <option value="data-science">Data Science</option>
          <option value="seo">SEO</option>
        </select>
      </div>
    </div>
    <button @click="emit('submit', searchQuery, geo, industry)" class="w-32 py-2 ml-2 text-center rounded-xl bg-gray-300 hover:bg-[#ede8e3] hover:text-yellow-900 ">Search</button>
  </header>
</template>
