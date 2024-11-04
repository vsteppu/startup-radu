<script setup>
import Warning from '@/components/Warning.vue';
import { socialButtonStyle, fadedSocialButtonStyle, isSocialMediaAppBrowser } from '@/utilities/utilities';
import { ref } from 'vue';

const message = ref("To sign in with Google, tap the three dots (\u22EE) and select 'Open in Browser'");


const handleSocialLogin = () => {
    if (isSocialMediaAppBrowser()) {
        window.location.href = 'intent://search-for-jobs.netlify.app/#Intent;scheme=https;end';
    } else {
        console.log('nothing')
    }
}


</script>

<template>

    <button class='top-56 relative bg-slate-400 p-9'
        @click="handleSocialLogin">
        Button
    </button>
<!--     <div class="sm:mt-8 sm:mx-auto sm:w-full h-screen sm:h-auto sm:max-w-md">
        <div class="pt-14 pb-9 sm:shadow-card sm:rounded-xl h-full sm:h-auto bg-gray-100 px-6 sm:px-10">
            <button :class="isSocialMediaAppBrowser() ? fadedSocialButtonStyle : socialButtonStyle"
                @click="handleSocialLogin">
                Button
            </button>
            <div v-if="isSocialMediaAppBrowser()"
                class="bg-[#FFD98C] flex items-center rounded-lg border-[2px] border-[#FFD98C]">
                <Warning class="m-2 h-auto w-20" />
                <p class="bg-[#FBEECD] rounded-r-lg py-4 px-4">
                    {{ message }}
                </p>
            </div>
        </div>
    </div> -->
</template>
