<script setup>
import { ref, computed, onMounted  } from 'vue';
import { useJobStore } from '@/stores/jobStore';
import { useAuthStore } from '@/stores/authStore';

const jobDescription = ref('');
const visibleJobId = ref(null);
const store = useJobStore();
const userStore = useAuthStore();

// Computed property to determine if there are any saved items
const hasSavedItems = computed(() => store.savedItems.length > 0);

// Method to handle job click
const handleJobClick = (job) => {
  if (visibleJobId.value === job.id) {
    visibleJobId.value = null;
    jobDescription.value = '';
  } else {
    visibleJobId.value = job.id;
    jobDescription.value = job.jobDescription;
  }
};

// Method to remove a saved job
const removeSaved = (index) => {
  store.removeSaved(index);
};

onMounted(() => {
  store.loadItems(); // Load items when component is mounted
});
</script>

<template>
  <!--
  <h2 v-if="!userStore.user">Please log in or register to freely navigate <br>
    <router-link to="/Login">Log in</router-link>
    <router-link to="/Register">Register</router-link>
  </h2>
  -->
  <p>There are saved items:

    <p v-if="!hasSavedItems">No items added yet.</p>
    
    <ul v-else>
      <div v-for="(job, index) in store.savedItems" :key="job.id">
        {{ job.jobTitle }}
        <button @click="handleJobClick(job)">
          {{ visibleJobId === job.id ? 'Hide Details' : 'Show Details' }}
        </button>
        <button @click="() => removeSaved(index)">Remove</button>
        <div v-if="visibleJobId === job.id">
          
          <div v-html="jobDescription"></div>
        </div>
      </div>
    </ul>
  </p>
</template>
