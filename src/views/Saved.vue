<script setup>
import { ref, computed, onMounted } from 'vue';
import { useJobStore } from '@/stores/jobStore';

const jobDescription = ref('');
const visibleJobId = ref(null);
const store = useJobStore();

const savedJobsList = ref([])

const hasSavedItems = computed(() => savedJobsList.value.length > 0);

const handleJobClick = (job) => {
  if (visibleJobId.value === job.id) {
    visibleJobId.value = null;
    jobDescription.value = '';
  } else {
    visibleJobId.value = job.id;
    jobDescription.value = job.jobDescription;
  }
};

const getSavedJobs = async () => {
  const savedJobs = await store.checkIfJobIsSaved();
  savedJobsList.value = savedJobs
};

const removeSaved = (jobId) => {
  store.removeJob(jobId);
  savedJobsList.value = savedJobsList.value.filter(job => job.id !== jobId);
};


onMounted(() => {
  getSavedJobs()
}
);
</script>
<template>
  <p>Saved items: </p>
  <div v-if="hasSavedItems">
    <div v-for="(job, index) in savedJobsList" :key="job.id">
      {{ job.jobTitle }} <br>
      <button @click="handleJobClick(job)">
        {{ visibleJobId === job.id ? 'Hide Details' : 'Show Details' }}
      </button>
      <button @click="() => removeSaved(job.id)">Remove</button>
      <div v-if="visibleJobId === job.id">
        <div v-html="jobDescription"></div>
      </div>
    </div>
  </div>
  <p v-else>No jobs added</p>
</template>
