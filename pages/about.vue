<template>
  <div class="rootPage">
    <div class="min-h-screen w-full">
      <div class="container px-4 ~text-[1rem]/[1.25rem] ~leading-[1.3rem]/[1.7rem] max-w-[760px] pt-12 md:pt-24 pb-16 md:pb-48 flex flex-col mx-auto">
          <div class="about-text backdrop-blur bg-[#00000066] border-2 border-[#a5a5a51c] px-5 md:px-8 pt-9 pb-4 md:py-9 md:py-12 rounded-xl translate-y-10 opacity-0">
            <p class="sentence pb-6 md:pb-12 flex flex-wrap gap-x-2 ~text-[2rem]/[3rem] text-ld-100">{{ $t('Hello!') }}
            </p>
            <p class="sentence pb-5 md:pb-7 flex flex-wrap gap-x-2 text-ld-500"><span class="word" :class="{ higlighted: word.includes('*') }" v-for="(word, index) in $t('I am *Leo, a web developer since I was 13 years old. *A *passion that has accompanied me throughout my life.').split(' ')" :key="'0' + word + index">{{ word.replace('*', '') }}</span></p>
            <p class="sentence pb-5 md:pb-7 flex flex-wrap gap-x-2 text-ld-500"><span class="word" :class="{ higlighted: word.includes('*') }" v-for="(word, index) in $t('Today, with over *17 *years *of *experience, I have turned this passion into a career that I love.').split(' ')" :key="'0' + word + index">{{ word.replace('*', '') }}</span></p>
            <p class="sentence pb-5 md:pb-7 flex flex-wrap gap-x-2 text-ld-500"><span class="word" :class="{ higlighted: word.includes('*') }" v-for="(word, index) in $t('Always looking for new technologies to explore and push the limits of what is possible through experimentation.').split(' ')" :key="'0' + word + index">{{ word.replace('*', '') }}</span></p>
            <p class="sentence pb-8 md:pb-12 flex flex-wrap gap-x-2 text-ld-500"><span class="word" :class="{ higlighted: word.includes('*') }" v-for="(word, index) in $t('I also develop *video *games, which allows me to add a playful touch to my projects.').split(' ')" :key="'0' + word + index">{{ word.replace('*', '') }}</span></p>


            <p class="sentence sentencehiglighted pb-8 md:pb-10 flex flex-wrap gap-x-2 ~text-[1.25rem]/[1.5rem] ~leading-[1.5rem]/[1.9rem]"><span class="word" v-for="(word, index) in $t('Want to bring your ideas to life or discuss your next project?').split(' ')" :key="'0' + word + index">
                <span class="letter higlighted" v-for="(letter, index) in word.replace('*', '').split('')" :key="'0' + letter + index">{{ letter == " " ? "&nbsp;" : letter }}</span>
              </span>
            </p>
            <div class="sentence sentencehiglighted flex flex-col md:flex-row gap-4 md:justify-between md:gap-0">
              <a href="mailto:leo@desigaux.fr" class="flex gap-2 items-center hover:gap-3 transition-all text-ld-300 rounded-full">
                <span class="word" v-for="(word, index) in $t('Contact-me at *leodesigaux.fr').split(' ')" :key="'0' + word + index">
                  <span class="letter higlighted" v-for="(letter, index) in word.replace('*', '').split('')" :key="'0' + letter + index">{{ letter == " " ? "&nbsp;" : letter }}</span>
                </span>
                <span class="letter inline-flex">
                  <Icon name="iconamoon:arrow-right-1"></Icon>
                </span>
              </a>
              <div class="signature w-6/12 md:w-auto ml-auto mr-4 md:mr-unset">
                <svg class="w-full" version="1.1" id="signature" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 280.12 86.24" style="enable-background:new 0 0 280.12 86.24;" xml:space="preserve" width="280.1199951171875" height="86.23999786376953">
                  <path style="fill:none;stroke:#d2cde5;stroke-width:2;stroke-miterlimit:10;" class="st0 svg-elem-1" d="M17.18,35.31c40.46,4.36,80.84,0.73,120.33-8.88c9.58-2.33,19.22-4.89,27.94-9.25
                    c2.86-1.43,5.71-3.15,7.32-5.67c4.3-6.73-3.4-10.11-9.79-10.4c-5.87-0.27-11.85-0.06-17.56,1.35c-11.8,2.93-21.38,10.75-28.86,19.34
                    c-7.49,8.6-13.38,18.18-20.96,26.72C74.28,72.57,41.13,85.81,6.93,85.23c-1.94-0.03-6.93-0.41-5.75-3.25
                    c0.48-1.15,1.79-1.86,3.02-2.44c6.58-3.07,13.71-5.07,20.86-6.84c19.53-4.85,39.45-8.21,59.34-11.54
                    c64.74-10.82,129.96-21.3,195.59-21.66c-1.72,0.23-5.87,1.49-7.59,1.72"></path>
                  <path style="fill:none;stroke:#d2cde5;stroke-width:2;stroke-miterlimit:10;" class="st0 svg-elem-2" d="M101.46,52.16c9.68-1.31,19.11-4.45,27.65-9.2c-10.34,1.65-20.24,5.93-28.52,12.34
                    c4.46,2.14,9.71,1.46,14.59,0.66c18.13-2.99,36.04-7.18,53.91-11.5c-5.23,0.61-10.31,2.4-14.78,5.19"></path>
                  <path style="fill:none;stroke:#d2cde5;stroke-width:2;stroke-miterlimit:10;" class="st0 svg-elem-3" d="M149.02,42.12c-2.51-0.36-3.62,3.82-1.59,5.35c2.02,1.53,5.11,0.51,6.73-1.45c0.69-0.83,1.21-1.88,1.14-2.95
                    c-0.2-3.07-4.79-3.77-7.31-2c26.29-4.45,52.59-8.9,78.88-13.35"></path>
                </svg>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { gsap } from 'gsap';
import { ref, onMounted, computed } from 'vue';
const { t, locale } = useI18n({ useScope: "global" });
import ScrollTrigger from "gsap/ScrollTrigger";

const head = ref({});
useHead(head);
const changeLocale = () => {
  head.value = {
    title: t('About') + ' - Léo DESIGAUX, ' + t('Webdevelopper')
  }
}
watch(locale, changeLocale, { immediate: true });
onMounted(() => {
  gsap.to(".about-text", {
    opacity: 1,
    y: 0,
    ease: "circ.out",
    duration: 2,
  });
  nextTick(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(document.querySelectorAll('.sentencehiglighted .letter'), {
      opacity: 1,
      y: -5,
      ease: "back.out(8)",
      delay: 1,
      stagger: 0.02,
      onComplete: () => {
        if (document.querySelector("#signature").classList.contains("signature-enter")) return;
        document.querySelector("#signature").querySelectorAll("path").forEach((element, index) => {
          setTimeout(() => {
            document.querySelector("#signature").classList.add("signature-enter")
            element.classList.add("signature-enter");
          }, 800);
        });
      }
    });
  });
});
</script>
<style scoped>
.letter {
  color: #a698c8;
  opacity: 0.2;
  display: inline-flex;
}

.higlighted {
  color: #f8f7fb;
}

@-webkit-keyframes animate-svg-stroke-1 {
  0% {
    stroke-dashoffset: 665.0624389648438px;
    stroke-dasharray: 665.0624389648438px;
  }

  100% {
    stroke-dashoffset: 0;
    stroke-dasharray: 665.0624389648438px;
  }
}

@keyframes animate-svg-stroke-1 {
  0% {
    stroke-dashoffset: 665.0624389648438px;
    stroke-dasharray: 665.0624389648438px;
  }

  100% {
    stroke-dashoffset: 0;
    stroke-dasharray: 665.0624389648438px;
  }
}

.svg-elem-1.signature-enter {
  -webkit-animation: animate-svg-stroke-1 1s cubic-bezier(0.215, 0.61, 0.355, 1) 0s both;
  animation: animate-svg-stroke-1 1s cubic-bezier(0.215, 0.61, 0.355, 1) 0s both;
}

@-webkit-keyframes animate-svg-stroke-2 {
  0% {
    stroke-dashoffset: 148.48011779785156px;
    stroke-dasharray: 148.48011779785156px;
  }

  100% {
    stroke-dashoffset: 0;
    stroke-dasharray: 148.48011779785156px;
  }
}

@keyframes animate-svg-stroke-2 {
  0% {
    stroke-dashoffset: 148.48011779785156px;
    stroke-dasharray: 148.48011779785156px;
  }

  100% {
    stroke-dashoffset: 0;
    stroke-dasharray: 148.48011779785156px;
  }
}

.svg-elem-2.signature-enter {
  -webkit-animation: animate-svg-stroke-2 1s cubic-bezier(0.215, 0.61, 0.355, 1) 0.22s both;
  animation: animate-svg-stroke-2 1s cubic-bezier(0.215, 0.61, 0.355, 1) 0.22s both;
}

@-webkit-keyframes animate-svg-stroke-3 {
  0% {
    stroke-dashoffset: 108.99293518066406px;
    stroke-dasharray: 108.99293518066406px;
  }

  100% {
    stroke-dashoffset: 0;
    stroke-dasharray: 108.99293518066406px;
  }
}

@keyframes animate-svg-stroke-3 {
  0% {
    stroke-dashoffset: 108.99293518066406px;
    stroke-dasharray: 108.99293518066406px;
  }

  100% {
    stroke-dashoffset: 0;
    stroke-dasharray: 108.99293518066406px;
  }
}

.svg-elem-1 {
  stroke-dashoffset: 665.0624389648438px;
  stroke-dasharray: 665.0624389648438px;
}

.svg-elem-2 {
  stroke-dashoffset: 148.48011779785156px;
  stroke-dasharray: 148.48011779785156px;
}

.svg-elem-3 {
  stroke-dashoffset: 108.99293518066406px;
  stroke-dasharray: 108.99293518066406px;
}

.svg-elem-3.signature-enter {
  -webkit-animation: animate-svg-stroke-3 1s cubic-bezier(0.215, 0.61, 0.355, 1) 0.84s both;
  animation: animate-svg-stroke-3 1s cubic-bezier(0.215, 0.61, 0.355, 1) 0.84s both;
}
</style>