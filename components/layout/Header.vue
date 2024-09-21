<template>
    <div class="menubase">
        <div ref="menuwrapper" class="w-full text-white flex items-center h-12 md:px-12 md:h-24 fixed z-50 top-0 left-0 bg-[#0a091900]">
            <div class="logo">
                <NuxtLink to="/" class="text-xl flex gap-2 items-center" v-on:click="menuClose">
                    <div class="circles flex gap-1">
                        <span class="w-4 h-4 bg-[#14cac4] rounded-full flex"></span>
                        <span class="w-4 h-4 bg-[#fc2e79] rounded-full flex"></span>
                        <span class="w-4 h-4 bg-[#fbb635] rounded-full flex"></span>
                    </div>
                    <div class="text-logo">
                        <span class="font-light text-ld-300">Léo</span><span class="font-bold text-ld-100">DESIGAUX</span>
                    </div>
                </NuxtLink>
            </div>
            <nav class="ml-auto flex gap-4 text- text-ld-400">
                <LangSwitcher />
                <a v-on:click="menuhandler" class="hover:text-ld-50 transition hover:transition-none duration-500 text-sm" to="/about"><span class="cursor-link">
                        <Slotmachine title1="MENU " title2="CLOSE" ref="menuSlot" title2Class="text-ld-50" />
                    </span></a>
            </nav>
        </div>
        <div ref="submenu" class="submenu w-full bg-primary text-white flex items-center h-0 overflow-clip top-24 fixed z-50 left-0 right-0 bg-[#0a0919CC] backdrop-blur-sm">
            <div class="flex h-full w-full relative flex-col xl:flex-row">
                <NuxtLink v-on:click="menuhandler" to="/about" class="h-full w-full p-4 flex items-end relative transition-all menu-link group overflow-hidden">
                    <div class="opacity-0 hover:opacity-100 transition duration-500 absolute inset-0 h-full w-full bg-gradient-to-tr from-[#FFFFFF00] to-[#FFFFFF08]"></div>
                    <span class="menu-text shrink-0 text-4xl text-ld-400 transition-colors group-hover:text-[#ffffff] ">
                        <span aria-hidden='true' v-for="(letter, index) in $t('ABOUT').split('')" :key="'0' + letter + index" class='relative inline-block pointer-events-none'>{{ letter == " " ? "&nbsp;" : letter }}</span>
                    </span>
                    <span class="h-[1px] -translate-y-2 mx-4 w-full relative">
                        <span class="horizontal-subline h-[1px] w-full bg-[#ffffff30] origin-left absolute top-0 left-0"></span>
                        <span class="h-[1px] w-full bg-[#ffffff] transform origin-left	scale-x-0 group-hover:scale-x-100 absolute top-0 left-0 transition-all duration-500 ease-in-out"></span>
                    </span>
                    <span class="text-ldforeground text-xl counter group-hover:text-ldwhite transition group-hover:delay-300 group-hover:duration-200">.01</span>
                    <span class="vertical-line origin-bottom absolute top-0 right-0 h-full w-[1px] bg-[#ffffff30] content-[''] z-10"></span>
                </NuxtLink>
                <NuxtLink v-on:click="menuhandler" to="/works" class="h-full w-full p-4 flex items-end relative transition-all menu-link group overflow-hidden">
                    <div class="opacity-0 hover:opacity-100 transition duration-500 absolute inset-0 h-full w-full bg-gradient-to-tr from-[#FFFFFF00] to-[#FFFFFF08]"></div>
                    <span class="menu-text shrink-0 text-4xl text-ld-400 transition-colors group-hover:text-[#ffffff] ">
                        <span aria-hidden='true' v-for="(letter, index) in $t('WORKS').split('')" :key="'0' + letter + index" class='relative inline-block pointer-events-none'>{{ letter == " " ? "&nbsp;" : letter }}</span></span>
                    <span class="h-[1px] -translate-y-2 mx-4 w-full relative">
                        <span class="horizontal-subline h-[1px] w-full bg-[#ffffff30] origin-left absolute top-0 left-0"></span>
                        <span class="h-[1px] w-full bg-[#ffffff] transform origin-left	scale-x-0 group-hover:scale-x-100 absolute top-0 left-0 transition-all duration-500 ease-in-out"></span>
                    </span>
                    <span class="text-ldforeground text-xl counter group-hover:text-ldwhite transition group-hover:delay-300 group-hover:duration-200">.02</span>
                    <span class="vertical-line origin-bottom absolute top-0 right-0 h-full w-[1px] bg-[#ffffff30] content-[''] z-10"></span>
                </NuxtLink>
                <NuxtLink v-on:click="menuhandler" to="/labs" class="h-full w-full p-4 flex items-end relative transition-all menu-link group overflow-hidden">
                    <div class="opacity-0 hover:opacity-100 transition duration-500 absolute inset-0 h-full w-full bg-gradient-to-tr from-[#FFFFFF00] to-[#FFFFFF08]"></div>
                    <span class="menu-text shrink-0 text-4xl text-ld-400 transition-colors group-hover:text-[#ffffff] ">
                        <span aria-hidden='true' v-for="(letter, index) in $t('LABS').split('')" :key="'0' + letter + index" class='relative inline-block pointer-events-none'>{{ letter == " " ? "&nbsp;" : letter }}</span></span>
                    <span class="h-[1px] -translate-y-2 mx-4 w-full relative">
                        <span class="horizontal-subline h-[1px] w-full bg-[#ffffff30] origin-left absolute top-0 left-0"></span>
                        <span class="h-[1px] w-full bg-[#ffffff] transform origin-left	scale-x-0 group-hover:scale-x-100 absolute top-0 left-0 transition-all duration-500 ease-in-out"></span>
                    </span>
                    <span class="text-ldforeground text-xl counter group-hover:text-ldwhite transition group-hover:delay-300 group-hover:duration-200">.03</span>
                    <span class="vertical-line origin-bottom absolute top-0 right-0 h-full w-[1px] bg-[#ffffff30] content-[''] z-10"></span>
                </NuxtLink>
                <NuxtLink v-on:click="menuhandler" to="/blog" class="h-full w-full p-4 flex items-end relative transition-all menu-link group overflow-hidden">
                    <div class="opacity-0 hover:opacity-100 transition duration-500 absolute inset-0 h-full w-full bg-gradient-to-tr from-[#FFFFFF00] to-[#FFFFFF08]"></div>
                    <span class="menu-text shrink-0 text-4xl text-ld-400 transition-colors group-hover:text-[#ffffff]">
                        <span aria-hidden='true' v-for="(letter, index) in $t('BLOG').split('')" :key="'0' + letter + index" class='relative inline-block pointer-events-none'>{{ letter == " " ? "&nbsp;" : letter }}</span></span>
                    <span class="h-[1px] -translate-y-2 mx-4 w-full relative">
                        <span class="horizontal-subline h-[1px] w-full bg-[#ffffff30] origin-left absolute top-0 left-0"></span>
                        <span class="h-[1px] w-full bg-[#ffffff] transform origin-left	scale-x-0 group-hover:scale-x-100 absolute top-0 left-0 transition-all duration-500 ease-in-out"></span>
                    </span>
                    <span class="text-ldforeground text-xl counter group-hover:text-ldwhite transition group-hover:delay-300 group-hover:duration-200">.04</span>
                    <span class="vertical-line origin-bottom absolute top-0 right-0 h-full w-[1px] bg-[#ffffff30] content-[''] z-10"></span>
                </NuxtLink>
                <NuxtLink v-on:click="menuhandler" to="mailto:leodesigaux@gmail.com" class="h-full w-full p-4 flex items-end relative transition-all menu-link group overflow-hidden">
                    <div class="opacity-0 hover:opacity-100 transition duration-500 absolute inset-0 h-full w-full bg-gradient-to-tr from-[#FFFFFF00] to-[#FFFFFF08]"></div>
                    <span class="menu-text shrink-0 text-4xl text-ld-400 transition-colors group-hover:text-[#ffffff]">
                        <span aria-hidden='true' v-for="(letter, index) in $t('CONTACT').split('')" :key="'0' + letter + index" class='relative inline-block pointer-events-none'>{{ letter == " " ? "&nbsp;" : letter }}</span></span>
                    <span class="h-[1px] -translate-y-2 mx-4 w-full relative">
                        <span class="horizontal-subline h-[1px] w-full bg-[#ffffff30] origin-left absolute top-0 left-0"></span>
                        <span class="h-[1px] w-full bg-[#ffffff] transform origin-left	scale-x-0 group-hover:scale-x-100 absolute top-0 left-0 transition-all duration-500 ease-in-out"></span>
                    </span>
                    <span class="text-ldforeground text-xl counter group-hover:text-ldwhite transition group-hover:delay-300 group-hover:duration-200">.05</span>
                </NuxtLink>
                <span class="horizontal-line origin-left absolute bottom-0 left-0 w-full h-[1px] bg-[#ffffff30] content-[''] z-10"></span>
                <span class="horizontal-line origin-right absolute top-0 left-0 w-full h-[1px] bg-[#ffffff30] content-[''] z-10"></span>
            </div>
        </div>
        <div ref="overlaymenu" v-on:click="menuClose" :class="{ 'h-screen': menuOpened, 'h-0': !menuOpened }" class="duration-1000 overlay w-full bg-primary text-white flex items-center overflow-clip top-0 fixed z-40 left-0 right-0 transition-all bg-[#0a091933] backdrop-blur-sm"></div>
    </div>
</template>
<script setup>
import gsap from 'gsap'
const { t, locale } = useI18n({ useScope: "global" });
const menu = ref()
const submenu = ref()
const menuwrapper = ref()
const menuSlot = ref()

let tl = null;;
const isMobile = () => {
    return window.innerWidth < 768;
}
const buildTransition = () => {
    nextTick(() => {
        tl = gsap.timeline({
            defaults: {
                duration: 0.3,
            }
        });
        const menuHeight = isMobile() ? 420 : 192;
        tl.fromTo(submenu.value, {
            height: 0,
            opacity: 0,
        }, {
            height: menuHeight,
            opacity: 1,
        }, 0)
        tl.fromTo(submenu.value, {
            height: 0,
            opacity: 0,
        }, {
            height: menuHeight,
            opacity: 1,
        }, 0)
        tl.fromTo(".horizontal-line", {
            scaleX: 0,
        }, {
            scaleX: 1,
            duration: 0.6,
        }, 0.5);
        tl.fromTo(".vertical-line", {
            scaleY: 0,
        }, {
            scaleY: 1,
            stagger: 0.3,
        }, 0.5);

        tl.fromTo(".menu-text span", {
            y: 64,
        }, {
            y: 0,
            ease: "circ.out",
            stagger: 0.05,
        }, 0.5/*  + index * 0.1 */);
        tl.fromTo(".horizontal-subline", {
            scaleX: 0,
        }, {
            scaleX: 1,
            stagger: 0.2,
        }, 0.8);
        tl.fromTo(menuwrapper.value, {
            backgroundColor: "#0a091900",
            backdropFilter: "blur(0px)",
        }, {
            backgroundColor: "#0a0919CC",
            backdropFilter: "blur(8px)",
        }, 0);
        tl.fromTo(".counter", {
            x: 64,
        }, {
            x: 0,
            stagger: 0.1,
            ease: "circ.out"
        }, 0.8);
        tl.pause()
        if(menuOpened.value) {
            tl.progress(1)
        }
    })
}
onMounted(() => {
    buildTransition();
})

watch(locale, buildTransition, { immediate: true });
const emit = defineEmits(['menuopen'])
const menuOpened = ref(false)
function menuhandler() {
    if (!submenu.value.classList.contains("opened")) {
        submenu.value.classList.add("opened")
        submenu.value.classList.remove("pointer-events-none")
        tl.duration(2)
        tl.play()
        menuOpened.value = true
        menuSlot.value.toggle(menuOpened.value)
        emit('menuopen', menuOpened.value)
    } else {
        submenu.value.classList.remove("opened")
        submenu.value.classList.remove("pointer-events-none")
        tl.duration(.8)
        tl.reverse()
        menuOpened.value = false
        menuSlot.value.toggle(menuOpened.value)
        emit('menuopen', menuOpened.value)
    }
}

function menuClose() {
    if (submenu.value.classList.contains("opened")) {
        submenu.value.classList.remove("opened")
        submenu.value.classList.add("pointer-events-none")
        tl.reverse()
        menuOpened.value = false
        menuSlot.value.toggle(menuOpened.value)
        emit('menuopen', menuOpened.value)
    }
}
</script>
<style>
.submenu {
    pointer-events: none;
}

.opened {
    pointer-events: all;
}

.mask-image {
    mask-image: linear-gradient(180deg, rgb(0 0 0 / 100%) 0, transparent 100%);
}
</style>