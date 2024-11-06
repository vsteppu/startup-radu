<script setup>
import Warning from '@/components/Warning.vue';
import { socialButtonStyle, fadedSocialButtonStyle, isSocialMediaAppBrowser } from '@/utilities/utilities';
import { ref } from 'vue';

const message = ref("To sign in with Google, tap the three dots (\u22EE) and select 'Open in Browser'");

const isSocialMediaBrowser = isSocialMediaAppBrowser();



</script>

<template>
{{ isSocialMediaBrowser }}
</template>
