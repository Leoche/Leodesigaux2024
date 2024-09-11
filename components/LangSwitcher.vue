<template>
  <a
    v-on:click="switchLocale"
    class="hover:text-white transition hover:transition-none duration-500 text-sm"
    ><span class="cursor-link">
      <Slotmachine title1="EN" title2="FR" ref="langSlot" /> </span
  ></a>
</template>
<script setup>
const { setLocale, locale } = useI18n();
const langSlot = ref(null);
const switchLocale = () => {
  setLocale(locale.value.includes("en") ? "fr" : "en");
  if (locale.value.includes("fr")) {
    langSlot.value.toggle(false);
  } else {
    langSlot.value.toggle(true);
  }
};
onMounted(() => {
  if (locale.value.includes("fr")) {
    langSlot.value.toggle(false);
  }
});
</script>