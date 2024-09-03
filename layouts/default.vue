<template>
    <div>
        <LayoutHeader />
        <div class="slot">
            <slot />
        </div>
        <ClientOnly>
            <div class="background fixed top-0 left-0 right-0 bottom-0 z-1" id="background"></div>
            <Theater />
        </ClientOnly>
        <LayoutFooter />
    </div>
</template>
<style lang="scss">
@use "~/assets/scss/main.scss";
</style>
<script setup lang="ts">
definePageMeta({
  pageTransition: {
    name: 'page',
    mode: 'out-in'
  }
})
</script>