<script setup>
import { onMounted, ref } from 'vue';
import { defineProps, defineEmits } from 'vue';
import { useJobStore } from '@/stores/jobStore';

const visibleJobId = ref(null);
const store = useJobStore();

const emit = defineEmits(['select', 'save']);
const props = defineProps(['jobList']);
const savedJobs = ref([])

const savedJobsList = ref([])

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
}

const removeSaved = (jobId) => {
  savedJobsList.value = savedJobsList.value.filter(job => job.id !== jobId);
  store.removeJob(jobId);
};

const isSaved = (jobId) => savedJobs.value.some(job => job.id === jobId);

onMounted(() =>
  isSaved(job.id),
  fetchCheckJob()
)
</script>

<template>

  <div v-for="(job, index) in props.jobList" :key="job.id" class=" flex justify-between my-2 px-6 bg-gray-200 rounded-xl">
    <div>
      <p> {{ job.jobTitle }}</p>
      <p class=" flex ">
        <button @click="handleButtonClick(job)"
          class=" w-32 p-1 mr-1 my-2 rounded-lg bg-gray-300  hover:hover:bg-[#ede8e3] hover:shadow-lg">
          {{ visibleJobId === job.id ? 'Hide Details' : 'Show Details' }}
        </button>
      </p>
    </div>
    <button @click="saveJob(job)">
      <!--         {{ isSaved(job.id) ? 'Saved' : 'Save'}} -->
      <div v-if="isSaved(job.id)" @click="() => removeSaved(job.id)"><img src="../media/Saved.png" alt="Saved"
          class=" h-8 p-1 opacity-50 rounded-lg border-[1px] hover:bg-[#ede8e3]"></div>
      <div v-else-if="!isSaved(job.id)"><img src="../media/Save.png" alt="Save" class=" h-8 p-1 opacity-50 rounded-lg ">
      </div>
    </button>
  </div>
</template>
