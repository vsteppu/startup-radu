<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import { defineProps, defineEmits } from 'vue';
import { useJobStore } from '@/stores/jobStore';

const visibleJobId = ref(null);
const store = useJobStore();

const emit = defineEmits(['select', 'save']);
const props = defineProps(['jobList']);

const savedStatus = ref({});

const checkIfJobIsSaved = async (jobId) => {
  const check = await store.getSavedJobsForUser();
  return check.some(savedJob => savedJob.id === jobId);
};

const toggleDetails = (job) => {
  visibleJobId.value = (visibleJobId.value === job.id) ? null : job.id;
};

onMounted(async () => {
  await store.loadSavedJobs();
  for (const job of props.jobList) {
    savedStatus.value[job.id] = await checkIfJobIsSaved(job.id);
  }
});

// Function to handle button click
const handleButtonClick = (job) => {
  toggleDetails(job);
  emit('select', job);
};
</script>

<template>
  <div>
    <p v-for="(job, index) in props.jobList" :key="job.id">
      {{ job.jobTitle }} <br>
      <button @click="handleButtonClick(job)">
        {{ visibleJobId === job.id ? 'Hide Details' : 'Show Details' }}
      </button>
      <button @click="emit('save', job)">
        {{ savedStatus[job.id] ? 'Saved' : 'Save' }}
      </button>
    </p>
  </div>
</template>
