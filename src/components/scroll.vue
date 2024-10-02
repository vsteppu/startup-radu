<script setup>
import { onMounted, ref } from 'vue';
import { defineProps, defineEmits } from 'vue';
import { useJobStore } from '@/stores/jobStore';

const visibleJobId = ref(null);
const store = useJobStore();

const emit = defineEmits(['select', 'save']);
const props = defineProps(['jobList']);
const savedJobs = ref([])

const toggleDetails = (job) => {
  visibleJobId.value = (visibleJobId.value === job.id) ? null : job.id;
};

// Function to handle button click
const handleButtonClick = (job) => {
  toggleDetails(job);
  emit('select', job);
};


const fetchCheckJob = async (job) => {
  const checkJob = await store.checkIfJobIsSaved(job)
  savedJobs.value = checkJob
  console.log(savedJobs.value)
}

const saveJob = async (job) => {
  if (!isSaved(job.id)) { //first add job to saved and display value of save
    savedJobs.value.push(job);
  }
  const result = await store.saveJob(job); //then execute  save function
  if (!result.success) {
    savedJobs.value = savedJobs.value.filter(savedJob => savedJob.id !== job.id);
  }
};


/* const saveJob = async (job) => {
  const result = await store.saveJob(job); // Assuming this returns success status
  if (result.success) {
    // Add job to savedJobs if it's successfully saved
    if (!isSaved(job.id)) {
      savedJobs.value.push(job);
      }
      }
      };
      */
const isSaved = (jobId) => savedJobs.value.some(job => job.id === jobId);

onMounted(() =>
  isSaved(job.id),
  fetchCheckJob()
)
</script>

<template>
  <div>
    <p v-for="(job, index) in props.jobList" :key="job.id">
      {{ job.jobTitle }} <br>
      <button @click="handleButtonClick(job)">
        {{ visibleJobId === job.id ? 'Hide Details' : 'Show Details' }}
      </button>
      <button @click="saveJob(job)">
        {{ isSaved(job.id) ? 'Saved' : 'Save' }}
      </button>
    </p>
  </div>
</template>
