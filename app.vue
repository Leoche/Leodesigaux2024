<template>
  <div class="appLayout">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <div class="cursorpoint"></div>
    <svg class="cursor" width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <!-- 32x32 centered circle with white border -->
      <circle cx="100" cy="100" r="32" stroke="white" stroke-width="2" fill="none" />

      <!-- Invisible 96x96 centered circle for text path -->
      <path id="textCircle" fill="none" d="
    M 70, 100
    a 30,30 0 1,1 60,0
    30,30 0 1,1 -60,0
    " />
      <!-- Example text following the invisible circle path -->
      <text font-size="10" fill="#8f8da9" text-baseline="middle" dx="100px">
        <textPath href="#textCircle" startOffset="0%" id="textCursor">
          <!-- Your text here -->
        </textPath>
      </text>
    </svg>
  </div>
</template>
<script setup>
import Lenis from 'lenis'
const lenis = new Lenis()

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)
useHead({
  title: 'My App',
  meta: [
    { name: 'description', content: 'My amazing site.' }
  ],
  bodyAttrs: {
    class: 'bg-[#060012] text-white mt-12 md:mt-24'
  },
  script: [{ innerHTML: 'console.log(\'Hello world\')' }]
})
if(import.meta.client){
  window.addEventListener('beforeunload', () => {
    localStorage.removeItem("ldinit");
  });
}
</script>