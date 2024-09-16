<script setup>
import { ref } from 'vue';
import { useJobStore } from '@/stores/jobStore';
import { defineProps } from 'vue';

import Search from '@/components/search.vue';
import Scroll from '@/components/scroll.vue';
import Description from '@/components/description.vue';

const props = defineProps(['submit']);

const jobList = ref([]);
const errorMessage = ref('');
const jobDescription = ref('');
const visibleJobId = ref(null);
const store = useJobStore();

const handleSearch = async (searchQuery, geo, industry) => {
  try {
    const response = await fetch(`https://jobicy.com/api/v2/remote-jobs?tag=${searchQuery}&geo=${geo}&industry=${industry}`);
    const data = await response.json();

    if (data.jobCount === 0) {
      errorMessage.value = 'Job not found';
      jobList.value = [];
    } else {
      jobList.value = data.jobs;
      errorMessage.value = '';
    }
  } catch (error) {
    errorMessage.value = 'An error occurred. Please try again.';
    console.error(error);
  }
}

const handleJobClick = (job) => {
  if (visibleJobId.value === job.id) {
    visibleJobId.value = null;
    jobDescription.value = null;
  } else {
    visibleJobId.value = job.id;
    jobDescription.value = job.jobDescription;

  }
};

const handleSave = (job) => {
  store.addToSaved(job);
};

</script>

<template>
    <Search @submit="handleSearch" />
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <Scroll v-if="jobList.length" :jobList="jobList" @select="handleJobClick" @save="handleSave" />
    <Description :selectJob="jobDescription" />
</template>
