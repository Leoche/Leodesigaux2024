<template>
  <div class="appLayout">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <div class="hidden md:block cursorpoint"></div>
    <svg class="hidden md:block cursor" width="600" height="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
      <!-- 32x32 centered circle with white border -->
      <circle cx="300" cy="300" r="32" stroke="white" stroke-width="1" fill="none" />

      <!-- Invisible 96x96 centered circle for text path -->
      <path id="textCircle" fill="none" d="
    M 270, 300
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
window.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
import Lenis from 'lenis'
const lenis = new Lenis()
useHead({
  link: [
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'manifest', href: '/site.webmanifest' },
    { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' }
  ],
  meta: [
    { name: 'msapplication-TileColor', content: '#05050e' },
    { name: 'theme-color', content: '#05050e' }
  ]
})
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