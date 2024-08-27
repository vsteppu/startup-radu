<script setup>
import { defineProps } from 'vue';

const props = defineProps(['selectJob'])
</script>

<template>
<p v-if="selectJob" v-html="props.selectJob"></p>
</template>
