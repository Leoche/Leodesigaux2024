<template>
    <div>
        <LayoutHeader @menuopen="menuopened" />
        <div class="slot transition origin-top relative z-10 duration-[2000ms]" :class="{ 'scale-95': isMenuOpen }">
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
const isMenuOpen = ref(false)
const menuopened = (isOpened: boolean) => {
  isMenuOpen.value = isOpened
}
</script>