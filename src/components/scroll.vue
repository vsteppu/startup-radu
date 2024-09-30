<script setup>
import { ref, onMounted, watch } from 'vue';
import { defineProps, defineEmits } from 'vue';
import { useJobStore } from '@/stores/jobStore';

const visibleJobId = ref(null);
const store = useJobStore();

const emit = defineEmits(['select', 'save']);
const props = defineProps(['jobList']);

const isSaved = (jobId) => store.savedItems.some(job => job.id === jobId);

const toggleDetails = (job) => {
  visibleJobId.value = (visibleJobId.value === job.id) ? null : job.id;
};

onMounted(async () => {
  await store.checkJobExistance()
  store.getSavedJobsForUser() // Load saved jobs
  store.saveJobForUser()

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
        {{ isSaved(job.id) ? 'Saved' : 'Save' }}
      </button>
    </p>
  </div>
</template>
