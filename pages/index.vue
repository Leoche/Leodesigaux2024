<template>
  <div class="rootPage">
    <div id="sur-theater" class="h-[80vh] md:h-[85vh] w-full -mt-12 md:-mt-24 relative">
      <div class="container mx-auto h-full overflow-clip px-6 md:px-8">
        <div class="h-full flex flex-col justify-center select-none">
          <h1 ref="lettering_job" class="lettering_job" aria-label="Hi, I'm Léo DESIGAUX, a fullStack Webdevelopper">
            <div class="subtitle flex ~text-[1.3rem]/[3rem] flex-wrap tracking-[-0.05em]">
              <span v-for="(letter, index) in $t('Hi, I\'m ').split('')" :key="'0' + letter + index" class="relative font-light	 text-ld-400 overflow-hidden pb-[2px] ~max-h-[1.3rem]/[3.5rem] ~leading-[1rem]/[3rem] mb-[2px] md:mb-0" :class="{bred: index == 3 && locale.includes('en') || index == 6 && locale.includes('fr')}"><span class="block">{{ letter == " " ? "&nbsp;" : letter }}</span></span>
              <span v-for="(letter, index) in 'Léo DESIGAUX'.split('')" :key="'1' + letter + index" class="relative text-ld-300 font-medium text-shadowed overflow-hidden ~max-h-[1.3rem]/[3.5rem] ~leading-[1rem]/[3rem] "><span class="block">{{ letter == " " ? "&nbsp;" : letter }}</span></span>
              <span v-for="(letter, index) in $t(', a fullStack').split('')" :key="'2' + letter + index" class="relative font-light	 text-ld-400 overflow-hidden ~max-h-[1.3rem]/[3.5rem] ~leading-[1rem]/[3rem]"><span class="block">{{ letter == " " ? "&nbsp;" : letter }}</span></span>
            </div>
            <div :class="getTitleClasses" class="h1-heading pr-4 flex relative bold mt-[2px] md:mt-0 text-center bg-[radial-gradient(white,rgb(120,125,219)_60%,rgb(193,159,219)_100%)] md:[background-position:105%_75%] bg-[length:150%_200%] bg-clip-text text-transparent font-bold h1-heading tracking-[-0.1em]">
              <span v-for="(letter, index) in $t('Webdevelopper').split('')" :key="'3' + letter + index" class="font-extrabold uppercase">{{ letter }}</span>
            </div>
          </h1>
        </div>
      </div>
    </div>
    <div class="relative md:pt-32 bg-[#0000008a] md:bg-[#000000bd] backdrop-blur-sm md:backdrop-blur clip-pathed lined-content overflow-clip -mb-1">
      <div class="container mx-auto flex flex-col gap-4 md:gap-16 py-16 pt-24 md:pt-40 max-w-6xl px-6 md:px-8">
        <div id="toolbelt" class="grid md:grid-cols-2">
          <div class="flex flex-col justify-center gap-4 md:gap-8">
            <div class="origin-left line bg-ld-200 h-1 w-24 rounded-full shadow-[0_16px_32px_#c19fdb,0_32px_48px_#c19fdb,0_1px_5px_#c19fdb]"></div>
            <h2 class="title ~text-[2.4rem]/[4.5rem] select-none ~leading-[2.6rem]/[4.5rem] bg-[radial-gradient(white,#8b75b2_40%)] bg-clip-text [background-position:140%_60%] bg-[length:200%_400%] text-transparent font-bold">{{ $t("What’s in my ") }}<br />{{ $t(" tool belt ?") }}</h2>
            <p class="subtitle ~text-[1rem]/[2rem] select-none text-ld-500">{{ $t("The tools i work with") }}</p>
          </div>
          <div class="flex flex-col gap-4 py-8 md:py-16 md:-ml-16 -mx-2 md:mx-0">
            <div class="logos-container inline-flex md:ml-32 flex-col py-4 md:py-6 md:pb-4 px-4 md:px-8 gap-1 rounded-xl bg-gradient-to-r from-ld-500/20 mr-auto">
              <h4 class="text-ld-500/80 text-xs tracking-widest">FRAMEWORKS</h4>
              <div class="flex gap-4 md:gap-8 items-center">
                <img class="w-auto h-7 md:h-12 object-contain" :src="'/img/logos/symfony.svg'" alt="">
                <img class="w-auto h-6 md:h-8 object-contain" :src="'/img/logos/laravel.png'" alt="">
              </div>
            </div>
            <div class="logos-container inline-flex md:ml-16 flex-col py-4 md:py-6 md:pb-4 px-4 md:px-8 gap-1 rounded-xl bg-gradient-to-r from-ld-500/20 mr-auto">
              <h4 class="text-ld-500/80 text-xs tracking-widest">FRONT-END</h4>
              <div class="flex gap-4 md:gap-8 items-center">
                <img class="w-auto h-4 md:h-6 object-contain" :src="'/img/logos/tailwindcss.svg'" alt="">
                <img class="w-auto h-7 md:h-12 object-contain" :src="'/img/logos/vuejs.svg'" alt="">
                <img class="w-auto h-7 md:h-12 object-contain" :src="'/img/logos/gsap.svg'" alt="">
                <img class="w-auto h-7 md:h-12 object-contain" :src="'/img/logos/webgl.svg'" alt="">
              </div>
            </div>
            <div class="logos-container inline-flex flex-col py-4 md:py-6 md:pb-4 px-4 md:px-8 gap-1 rounded-xl bg-gradient-to-r from-ld-500/20 mr-auto">
              <h4 class="text-ld-500/80 text-xs tracking-widest">E-COMMERCE & CMS</h4>
              <div class="flex gap-4 md:gap-8 items-center">
                <img class="w-auto h-2 md:h-4 object-contain" :src="'/img/logos/prestashop.png'" alt="">
                <img class="w-auto h-11 md:h-14 object-contain" :src="'/img/logos/wordpress.png'" alt="">
                <img class="w-auto h-6 md:h-8 object-contain" :src="'/img/logos/magento.png'" alt="">
              </div>
            </div>
          </div>
        </div>
        <div id="sayhello" class="flex flex-col items-center justify-center gap-4 md:mt-10 md:mb-32 py-16">
          <div class="relative after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-px after:bg-gradient-to-r after:from-[rgba(255,255,255,0)] after:via-[#c19fdb66] after:to-[rgba(255,255,255,0)] wrapper flex flex-col items-center px-4 md:px-12 pt-7 md:pt-12 pb-6 md:pb-14 -mx-2 md:mx-0 bg-[radial-gradient(at_center_bottom,_rgb(222_178_255_/_27%),_rgb(235_208_255_/_7%),_#03020600_80%)] [background-position:50%_50%] bg-[length:200%_200%] rounded-xl">
            <div class="title_wrapper relative pb-4 md:px-12">
              <div class="liner absolute w-20 bottom-0 rounded-full origin-center bg-ld-200 h-[2px] md:h-1 -ml-10 shadow-[0_0_32px_#c19fdb,0_0_48px_#c19fdb,0_0_5px_#c19fdb]"></div>
              <h2 class="title bg-clip-text ~leading-[2.3rem]/[3.5rem] text-center pb-1 ~text-[1.8rem]/[2.7rem] w-full bg-[radial-gradient(white,#8b75b2_40%)] [background-position:-50%_160%] bg-[length:200%_400%] text-transparent font-bold tracking-tighter">{{ $t("Let's make something bright together") }}</h2>
            </div>
            <p class="px-4 md:px-0 pt-4 pb-2 bg-clip-text subtitle w-full text-center ~text-[1rem]/[1.25rem] bg-[radial-gradient(white,#8b75b2_40%)] [background-position:150%_200%] bg-[length:200%_400%] text-transparent ">{{ $t("Have a project or want to talk about your ideas?") }}</p> <!-- -250% -->
            <p class="mailto text-ld-700 ~text-[0.8rem]/[1rem]">{{ $t("Contact me at ") }}<a class="email inline-block relative" href="mailto:leo@desigaux.com"><span class="absolute h-[1px] w-full bg-ld-400 bottom-0 right-0 scale-x-0 emailline origin-right"></span>leo@desigaux.com</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n({ useScope: "global" });

const lettering_job = ref();
const route = useRoute();
let isRevisited = false;
let mounted = false;
const changeLocale = async () => {
  head.value = {
    title: 'Léo DESIGAUX, ' + t('Webdevelopper')
  }
  await nextTick()
  enterAnimate()
};
const head = ref({});
let tlName = null;
let tlTitle = null;
useHead(head);
watch(locale, changeLocale, { immediate: false });

const getTitleClasses = computed(() => {
  return locale.value.includes('fr') ? '~text-[2.4rem]/[9rem] ~max-h-[2.4rem]/[8.8rem] [background-position:80%_75%]' : '~text-[2.6rem]/[9rem] ~max-h-[2.6rem]/[8.8rem] [background-position:90%_75%]'
})
// Check if session is already set
if (localStorage.getItem("ldinit")) {
  isRevisited = true;
} else {
  localStorage.setItem("ldinit", Math.random().toString(36).substring(2));
}
isRevisited = false;
definePageMeta({
  pageTransition: {
    name: localStorage.getItem("ldinit") ? 'page-out' : 'page',
    mode: 'out-in',
  },
});
const enterAnimate = () => {
  if (route.name === 'index') {
    let animStarted = false;
    if(tlName) tlName.kill();
    if(tlTitle) tlTitle.kill();
    tlName = gsap.timeline({ defaults: { ease: "expo.out" } });
    tlTitle = gsap.timeline({
      defaults: { stagger: 0.05, ease: "expo.out" }, onUpdate: () => {
        if (isRevisited || (tlTitle.progress() > 0.5 && !animStarted)) {
          animStarted = true;
          tlName.play();
        }
      }
    });
    const logoAnimationDuration = isRevisited ? 0 : 0.6;

    tlTitle.fromTo("#sur-theater .subtitle span.block", {
      y: "130%",
    }, {
      y: 0,
      duration: isRevisited ? 0 : 0.6,
      delay: isRevisited ? 0 : .8,
      stagger: function (index, target, list) {
        let stag = index * 0.03;
        if(locale.value.includes("fr")){
          if (index > 5) {
            stag += .5;
          }
          if (index > 26) {
            stag += .5;
          }
        } else {
          if (index > 1) {
            stag += .5;
          }
          if (index > 19) {
            stag += .5;
          }
        }
        return stag;
      }
    }, "<")
    tlTitle.fromTo("#sur-theater .h1-heading span", {
      lineHeight: 3,
    }, {
      lineHeight: 1,
      duration: logoAnimationDuration,
      stagger: 0.05,
      delay: isRevisited ? 0 : 0.4
    }, "-=90%")
    tlTitle.play();
    console.log(isRevisited)
    tlName.fromTo("#sur-theater .text-shadowed", {
      y: 0,
    }, {
      y: window.isMobile ? -10 : -20,
      ease: "power4.out",
      duration: isRevisited ? 0 : .5,
      stagger: {
        from: 6,
        amount: isRevisited ? 0 : .1
      },
      onStart: function () {
        document.querySelectorAll(".subtitle span").forEach(item => {item.classList.remove("overflow-hidden")});
        document.querySelector(".h1-heading").classList.remove("overflow-hidden");
      }
    }, isRevisited ? 0 : 1.6)
    let animchildStarted = false;
    tlName.to("#sur-theater .text-shadowed", {
      y: 0,
      ease: "back.out(8)",
      stagger: {
        from: 6,
        amount: isRevisited ? 0 : .1
      },
      duration: isRevisited ? 0 : .3,
      onUpdate: function (self) {
        if ((isRevisited || this.progress() > 0.1) && !animchildStarted) {
          console.log(isRevisited)
          animchildStarted = true;
          gsap.to(".text-shadowed", {
            color: "#f1f0f7",
            textShadow: "0 0 1rem #ffffff44, 0 0 1rem #ffffff44",
            ease: "back.out(1.2)",
            duration: isRevisited ? 0 : .1,
          });
          var color = { value: "rgb(163, 166, 216)" };
          gsap.to(color, {
            value: "#f1f0f7",
            ease: "back.out(1.2)",
            duration: isRevisited ? 0 : .1,
            onUpdate: function () {
              isRevisited = true
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
            duration: isRevisited ? 0 : .4,
          });
          gsap.to(".h1-heading span", {
            lineHeight: 1,
            stagger: {
              from: 2,
              amount: .2
            },
            ease: "circ.in",
            duration: isRevisited ? 0 : .8,
            delay: isRevisited ? 0 : .3
          });
        }
      }
    }, ">")
    tlName.pause();

    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(CustomEase);
    let tlToolbelt = gsap.timeline({
      defaults: {
        ease: "circ.out"
      },
      scrollTrigger: {
        scrub: 1,
        trigger: '#toolbelt',
        start: window.isMobile ? 'top 100%' : 'top 70%',
        end: window.isMobile ? '100% 70%' : '100% center',
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
      opacity: 0,
      y:64,
    }, {
      opacity: 1,
      y:0,
      duration: 0.4,
    }, "<");
    tlToolbelt.fromTo("#toolbelt .subtitle", {
      opacity: 0,
      y: -32,
    }, {
      opacity: 1,
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


    let duration = .2;
    let tlSayhello = gsap.timeline({
      defaults: {
        ease: "circ.out"
      },
      scrollTrigger: {
        scrub: 1,
        trigger: '#sayhello',
        start: window.isMobile ? 'top 100%' : 'top 70%',
        end: window.isMobile ? '100% 60%' : '100% 60%',
      }
    });
    tlSayhello.fromTo("#sayhello", {
      opacity: 0,
    }, {
      opacity: 1,
      duration: 0.1,
    }, 0);
    tlSayhello.fromTo("#sayhello .title, #sayhello .subtitle, #sayhello .mailto", {
      y: 32,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 0.2,
      stagger: 0.1,
    }, .05);
    tlSayhello.fromTo("#sayhello .liner", {
      left: 0,
    }, {
      left: "100%",
      duration: duration,
      ease: "circ.inOut"
    }, .3);
    tlSayhello.fromTo("#sayhello .liner", {
      scaleX: 0,
    }, {
      scaleX: 1,
      duration: duration,
      ease: CustomEase.create("custom", "M0,0 C0.197,-0.094 0.243,1 0.5,1 0.744,1 0.808,-0.099 1,0 "),
    }, .3);
    tlSayhello.fromTo("#sayhello .liner", {
      opacity:0,
    }, {
      opacity:1,
      duration: duration,
      ease: CustomEase.create("custom", "M0,0 C0.3,0 0,1 0.5,1 1.01,1 0.702,0 1,0 "),
    }, .3);
    tlSayhello.fromTo("#sayhello .title", {
      backgroundPositionX: "-50%",
    }, {
      backgroundPositionX: "-250%",
      duration: duration,
      ease: "linear",
    }, 0.3);
    tlSayhello.fromTo("#sayhello .subtitle", {
      backgroundPositionX: "150%",
    }, {
      backgroundPositionX: "-50%",
      duration: duration,
      ease: "linear",
    }, 0.3);
    tlSayhello.fromTo("#sayhello .emailline", {
      scaleX: 0,
    }, {
      scaleX: 1,
      duration: duration,
      ease: "linear",
    }, 0.3);
    tlSayhello.to("#sayhello .email", {
      color: "#f1f0f7",
      duration: duration,
      ease: "linear",
    }, 0.3);
  }
} 

onMounted(() => {
  mounted = true;
  changeLocale();
});
</script>
<style scoped>
#webdev_logo path {
  stroke-width: 0.1px;
}
.clip-pathed {
  clip-path: polygon(
    0% 0%,
    0% 100%,
    100% 100%,
    100% calc(1.89% * var(--wave-height-factor)), /* Adjusting wave with CSS variable */
    93.33% calc(1.41% * var(--wave-height-factor)),
    86.67% calc(2.19% * var(--wave-height-factor)),
    80% calc(4.13% * var(--wave-height-factor)),
    73.33% calc(6.94% * var(--wave-height-factor)),
    66.67% calc(10.24% * var(--wave-height-factor)),
    60% calc(13.57% * var(--wave-height-factor)),
    53.33% calc(16.45% * var(--wave-height-factor)),
    46.67% calc(18.48% * var(--wave-height-factor)),
    40% calc(19.37% * var(--wave-height-factor)),
    33.33% calc(19.01% * var(--wave-height-factor)),
    26.67% calc(17.43% * var(--wave-height-factor)),
    20% calc(14.87% * var(--wave-height-factor)),
    13.33% calc(11.68% * var(--wave-height-factor)),
    6.67% calc(8.31% * var(--wave-height-factor)),
    0% calc(5.24% * var(--wave-height-factor))
  );
}
@media (min-width: 1400px) {
  .clip-pathed {
    --wave-height-factor: 0.65; /* Default for large screens */
  }
}
@media (max-width: 1399px) and (min-width: 1200px) {
  .clip-pathed {
    --wave-height-factor: 0.65; /* Reduce wave height */
  }
}
@media (max-width: 1199px) and (min-width: 768px) {
  .clip-pathed {
    --wave-height-factor: 0.5; /* Reduce wave height */
  }
}
@media (max-width: 767px) and (min-width: 480px) {
  .clip-pathed {
    --wave-height-factor: 0.3; /* Reduce wave height */
  }
}
@media (max-width: 479px) and (min-width: 320px) {
  .clip-pathed {
    --wave-height-factor: 0.15; /* Reduce wave height */
  }
}
@media (max-width: 319px) {
  .clip-pathed {
    --wave-height-factor: 0.1; /* Further reduce wave height */
  }
}

@media (max-width: 767px) {
.bred{
  flex-basis: 100%;
  height: 0;
}
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