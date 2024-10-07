<script setup>
import { defineProps } from 'vue';

const props = defineProps(['jobDescription', 'jobGeo', 'jobIndustry','jobType','visibleJobId','jobTitle'])
</script>

<template>
    <div v-if="visibleJobId" class="py-3 px-5 rounded-xl  bg-gray-200">
        <p class=" font-bold text-2xl  my-2 " v-if="jobTitle" v-html="props.jobTitle "></p>
        <p class=" my-2 " v-if="jobIndustry" v-html="props.jobIndustry"></p>
        <p class=" my-2 " v-if="jobType" v-html="props.jobType"></p>
        <p class=" my-2 " v-if="jobGeo" v-html="props.jobGeo"></p>
        <p class=" font-bold text-md ">Job Description</p>
        <p class=" my-2 " v-if="jobDescription" v-html="props.jobDescription"></p>
    </div>
</template>
