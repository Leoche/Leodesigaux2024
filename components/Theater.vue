<template>
    <div></div>
</template>
<script setup>
import { Theater } from '../theater/Theater.js';


if (process.browser) {
    new Theater();
}
</script>