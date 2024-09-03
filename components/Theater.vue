<template>
    <div></div>
</template>
<script setup>
import { Theater } from '../theater/Theater.js';


if (import.meta.browser) {
    new Theater();
}
</script>