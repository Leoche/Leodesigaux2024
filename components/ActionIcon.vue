<template>
    <Icon size="20px" v-if="action === 'DOWNLOAD'" name="ri:download-line" />
    <Icon size="20px" v-if="action === 'GITHUB'" name="ri:github-fill" />
    <Icon size="20px" v-if="action === 'PLAY'" name="material-symbols:videogame-asset" />
    <Icon size="20px" v-if="action === 'VISIT'" name="gridicons:external" />
    <Icon size="20px" v-if="action === 'LDJAM'" name="gridicons:external" />
    <Icon size="20px" v-if="action === 'SEEMORE'" name="ri:information-2-line" />
</template>
<script setup>
defineProps(['action'])
</script>