<script setup>
import { ref, computed, onMounted } from 'vue';
import { useJobStore } from '@/stores/jobStore';
import { useAuthStore } from '@/stores/authStore';

const jobDescription = ref('');
const visibleJobId = ref(null);
const store = useJobStore();
const userStore = useAuthStore();

// Computed property to determine if there are any saved items
const hasSavedItems = computed(() => store.savedItems.length > 0);

const handleJobClick = (job) => {
  if (visibleJobId.value === job.id) {
    visibleJobId.value = null;
    jobDescription.value = '';
  } else {
    visibleJobId.value = job.id;
    jobDescription.value = job.jobDescription;
  }
};

const removeSaved = (job) => {
  store.removeSaved(job);
};

onMounted(async () =>{
  const loadSavedJobs = await store.loadSavedJobs()
  console.log(loadSavedJobs)
}
);
</script>

<template>
  <p>Saved items:
  <div v-for="(job, index) in store.savedItems" :key="job.id">
    {{ job.jobTitle }} <br>
    <button @click="handleJobClick(job)">
      {{ visibleJobId === job.id ? 'Hide Details' : 'Show Details' }}
    </button>
    <button @click="() => removeSaved(job.id)">Remove</button>
    <div v-if="visibleJobId === job.id">
      <div v-html="jobDescription"></div>
    </div>
  </div>
  </p>
</template>
