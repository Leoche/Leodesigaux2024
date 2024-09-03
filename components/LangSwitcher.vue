<template>
    <a v-if="$i18n.locale.includes('fr')" class="hover:text-white transition hover:transition-none duration-500 text-sm" @click="setLocale('en')">EN</a>
    <a v-if="$i18n.locale.includes('en')" class="hover:text-white transition hover:transition-none duration-500 text-sm" @click="setLocale('fr')">FR</a>
</template>
<script setup>
const { setLocale } = useI18n()
</script>