<template>
  <div class="rootPage">
    <div id="sur-theater" class="h-[85vh] w-full -mt-12 md:-mt-24 relative">
      <div class="container mx-auto h-screen overflow-clip">
        <div class="h-full flex flex-col justify-center">
          <h1 ref="lettering_job" class="lettering_job" aria-label="Hi, I'm Léo DESIGAUX, a fullStack Webdevelopper">
            <div class="subtitle overflow-hidden max-h-[43px] flex">
              <span v-for="(letter, index) in $t('Hi, I\'m ').split('')" :key="'0' + letter + index" class="relative text-ld-400 text-5xl/[1]">{{ letter == " " ? "&nbsp;" : letter }}</span>
              <span v-for="(letter, index) in 'Léo DESIGAUX'.split('')" :key="'1' + letter + index" class="relative text-ld-300 text-5xl/[1] font-bold text-shadowed">{{ letter == " " ? "&nbsp;" : letter }}</span>
              <span v-for="(letter, index) in $t(', a fullStack').split('')" :key="'2' + letter + index" class="relative text-ld-400 text-5xl/[1]">{{ letter == " " ? "&nbsp;" : letter }}</span>
            </div>
            <div class="h1-heading pr-4 text-9xl max-h-[145px] flex relative text-transparent overflow-hidden bold text-center tracking-tighter bg-[radial-gradient(white,rgb(120,125,219)_60%,rgb(193,159,219)_100%)] [background-position:105%_75%] bg-[length:150%_200%] bg-clip-text text-transparent font-bold h1-heading">
              <span v-for="(letter, index) in $t('Webdevelopper').split('')" :key="'3' + letter + index" class="font-extrabold tracking-tighter uppercase text-[145px]">{{ letter }}</span>
            </div>
          </h1>
        </div>
      </div>
    </div>
    <div id="toolbelt" class="relative pt-32 bg-[#000000bd] backdrop-blur clip-pathed lined-content overflow-clip">
      <div class="container mx-auto flex flex-col gap-2 py-16 pt-40 max-w-6xl">
        <div class="grid grid-cols-2">
          <div class="flex flex-col justify-center gap-8">
            <div class="origin-left line bg-ld-200 h-1 w-24 rounded-full shadow-[0_16px_32px_#c19fdb,0_32px_48px_#c19fdb,0_1px_5px_#c19fdb]"></div>
            <h2 class="title text-7xl/[1.1] bg-[radial-gradient(white,#8b75b2_50%)] bg-clip-text [background-position:140%_70%] bg-[length:200%_400%] text-transparent font-bold">What’s in my <br /> tool belt ?</h2>
            <p class="subtitle text-2xl text-ld-500">The tools i work with</p>
          </div>
          <div class="flex flex-col gap-4 py-16 -ml-16">
            <div class="logos-container inline-flex ml-32 flex-col p-6 gap-4 rounded-xl bg-gradient-to-r from-ld-500/20 mr-auto">
              <h4 class="text-ld-300/80">FRAMEWORKS</h4>
              <div class="flex gap-8 items-center">
                <img class="w-auto h-12 object-contain" :src="'/img/logos/symfony.svg'" alt="">
                <img class="w-auto h-8 object-contain" :src="'/img/logos/laravel.png'" alt="">
              </div>
            </div>
            <div class="logos-container inline-flex ml-16 flex-col p-6 gap-4 rounded-xl bg-gradient-to-r from-ld-500/20 mr-auto">
              <h4 class="text-ld-300/80">FRONT-END</h4>
              <div class="flex gap-8 items-center">
                <img class="w-auto h-6 object-contain" :src="'/img/logos/tailwindcss.svg'" alt="">
                <img class="w-auto h-12 object-contain" :src="'/img/logos/vuejs.svg'" alt="">
                <img class="w-auto h-12 object-contain" :src="'/img/logos/gsap.svg'" alt="">
                <img class="w-auto h-12 object-contain" :src="'/img/logos/webgl.svg'" alt="">
              </div>
            </div>
            <div class="logos-container inline-flex flex-col p-6 gap-4 rounded-xl bg-gradient-to-r from-ld-500/20 mr-auto">
              <h4 class="text-ld-300/80">E-COMMERCE & CMS</h4>
              <div class="flex gap-8 items-center">
                <img class="w-auto h-4 object-contain" :src="'/img/logos/prestashop.png'" alt="">
                <img class="w-auto h-14 object-contain" :src="'/img/logos/wordpress.png'" alt="">
                <img class="w-auto h-8 object-contain" :src="'/img/logos/magento.png'" alt="">
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script setup>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n({ useScope: "global" });

const lettering_job = ref();
const route = useRoute();
let isRevisited = false;

const changeLocale = () => {
  head.value = {
    title: 'Léo DESIGAUX, ' + t('Webdevelopper')
  }
};
const head = ref({});
useHead(head);
watch(locale, changeLocale, { immediate: true });

// Check if session is already set
if (localStorage.getItem("ldinit")) {
  isRevisited = true;
} else {
  localStorage.setItem("ldinit", Math.random().toString(36).substring(2));
}
definePageMeta({
  pageTransition: {
    name: localStorage.getItem("ldinit") ? 'page-out' : 'page',
    mode: 'out-in',
  },
});

onMounted(() => {
  changeLocale();
  if (route.name === 'index') {
    let animStarted = false;
    const tlName = gsap.timeline({ defaults: { ease: "expo.out" } });
    const tlTitle = gsap.timeline({
      defaults: { stagger: 0.05, ease: "expo.out" }, onUpdate: () => {
        if (tlTitle.progress() > 0.5 && !animStarted) {
          animStarted = true;
          tlName.play();
        }
      }
    });
    const animationDuration = isRevisited ? 0 : 0.6;
    const logoAnimationDuration = isRevisited ? 0 : 0.6;

    tlTitle.fromTo("#sur-theater .subtitle span", {
      lineHeight: 3.5,
    }, {
      lineHeight: 1,
      duration: animationDuration,
      delay: .8,
      stagger: function (index, target, list) {
        let stag = index * 0.03;
        if (index > 1) {
          stag += .5;
        }
        if (index > 19) {
          stag += .5;
        }
        return stag;
      }
    }, "<")
    tlTitle.fromTo("#sur-theater .h1-heading span", {
      lineHeight: 3,
    }, {
      lineHeight: 1,
      duration: 0.5,
      duration: logoAnimationDuration,
      stagger: 0.05,
      delay: 0.4
    }, "-=90%")
    tlTitle.play();

    tlName.fromTo("#sur-theater .text-shadowed", {
      y: 0,
    }, {
      y: -20,
      ease: "power4.out",
      duration: .5,
      stagger: {
        from: 6,
        amount: .1
      },
      onStart: function () {
        document.querySelector(".subtitle").classList.remove("overflow-hidden");
        document.querySelector(".h1-heading").classList.remove("overflow-hidden");
      }
    }, 1.6)
    let animchildStarted = false;
    tlName.to("#sur-theater .text-shadowed", {
      y: 0,
      ease: "back.out(8)",
      stagger: {
        from: 6,
        amount: .1
      },
      duration: .3,
      onUpdate: function (self) {
        if (this.progress() > 0.1 && !animchildStarted) {
          animchildStarted = true;
          gsap.to(".text-shadowed", {
            color: "#f1f0f7",
            textShadow: "0 0 1rem #ffffff44",
            ease: "back.out(1.2)",
            duration: .1,
          });
          var color = { value: "rgb(163, 166, 216)" };
          gsap.to(color, {
            value: "#f1f0f7",
            ease: "back.out(1.2)",
            duration: .1,
            onUpdate: function () {
              document.querySelector(".h1-heading").style.backgroundImage = "radial-gradient(" + color.value + " 10%, rgb(102, 108, 189) 40%, rgb(193 159 219) 60%, rgba(255, 255, 255, 0) 100%)";
            }
          });
          gsap.to(".h1-heading span", {
            lineHeight: 1.2,
            stagger: {
              from: 2,
              amount: .2
            },
            ease: "circ.out",
            duration: .4,
          });
          gsap.to(".h1-heading span", {
            lineHeight: 1,
            stagger: {
              from: 2,
              amount: .2
            },
            ease: "circ.in",
            duration: .8,
            delay: .4
          });
        }
      }
    }, ">")
    tlName.pause();

    isRevisited = true;
    gsap.registerPlugin(ScrollTrigger);
    let tlToolbelt = gsap.timeline({
      defaults: {
        ease: "circ.out"
      },
      scrollTrigger: {
        scrub:1,
        trigger: '#toolbelt',
        start: '-=500px top', // when the top of the trigger hits the top of the viewport
        end: '+=90%', // end after scrolling 500px beyond the start
        markers: { fontSize: "18px", fontWeight: "bold", indent: 20 }
      }
    });
    tlToolbelt.fromTo("#toolbelt .logos-container", {
      opacity: 0,
      x: 128,
    }, {
      opacity: 1,
      x: 0,
      duration: 0.4,
      stagger: 0.1,
    }, .1);
    tlToolbelt.fromTo("#toolbelt .title", {
      opacity:0,
    }, {
      opacity:1,
      duration: 0.4,
    }, "<");
    tlToolbelt.fromTo("#toolbelt .subtitle", {
      opacity:0,
      y: -32,
    }, {
      opacity:1,
      y: 0,
      duration: 0.4,
    }, .3);

    tlToolbelt.fromTo("#toolbelt .line", {
      width: 0,
    }, {
      width: 128,
      duration: 0.4,
    }, .2);
    tlToolbelt.fromTo("#toolbelt .title", {
      backgroundPositionX: "150%",
    }, {
      backgroundPositionX: "90%",
      duration: 0.4,
    }, .2);
    
  }
});
</script>
<style scoped>
#webdev_logo path {
  stroke-width: 0.1px;
}

.clip-pathed {
  clip-path: polygon(100% 100%, 0% 100%, 0.00% 5.24%, 6.67% 8.31%, 13.33% 11.68%, 20.00% 14.87%, 26.67% 17.43%, 33.33% 19.01%, 40.00% 19.37%, 46.67% 18.48%, 53.33% 16.45%, 60.00% 13.57%, 66.67% 10.24%, 73.33% 6.94%, 80.00% 4.13%, 86.67% 2.19%, 93.33% 1.41%, 100.00% 1.89%);
}

.marquee {
  --gap: 0.4rem;
  display: flex;
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent 0, rgb(0 0 0 / 100%) 10%, rgb(0 0 0 / 100%) 90%, transparent 100%);
  user-select: none;
  padding: 16px;
}

.marquee__content {
  flex-shrink: 0;
  display: flex;
  justify-content: space-around;
  gap: var(--gap);
  min-width: 100%;
  animation: scroll 20s linear infinite;
}

.marquee__content img {
  object-fit: contain;
  object-position: center;
  width: 200px;
  height: 50px;
  padding-left: 32px;
  padding-right: 32px;
}

@keyframes scroll {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(calc(-100% - var(--gap)));
  }
}
</style>