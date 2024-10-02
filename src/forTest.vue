<template>
  <p>Saved items:</p>
  <div v-if="hasSavedItems">
    <div v-for="(job, index) in savedJobsList" :key="job.id">
      <p>{{ job.jobTitle }}</p>
      <button @click="handleJobClick(job)">
        {{ visibleJobId === job.id ? 'Hide Details' : 'Show Details' }}
      </button>
      <button @click="() => removeSaved(job.id)">Remove</button>

      <div v-if="visibleJobId === job.id">
        <div v-html="jobDescription"></div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>No saved jobs available.</p>
  </div>
</template>