<template>
    <div ref="menuwrapper" class="w-full text-white flex items-center h-12 md:px-12 md:h-24 fixed z-50 top-0 left-0 bg-[#0a091900]">
        <div class="logo">
            <NuxtLink to="/" class="text-xl flex gap-2 items-center">
                <div class="circles flex gap-1">
                    <span class="w-4 h-4 bg-[#14cac4] rounded-full flex"></span>
                    <span class="w-4 h-4 bg-[#fc2e79] rounded-full flex"></span>
                    <span class="w-4 h-4 bg-[#fbb635] rounded-full flex"></span>
                </div>
                <div class="text-logo">
                    <span class="font-light text-blue-50">Léo</span><span class="font-bold text-white">DESIGAUX</span>
                </div>
            </NuxtLink>
        </div>
        <nav class="ml-auto flex gap-4 text- text-slate-400">
            <LangSwitcher />
            <a v-on:click="menuhandler" class="hover:text-white transition hover:transition-none duration-500 text-sm" to="/about"><span class="cursor-link">MENU</span></a>
            <NuxtLink class="hover:text-white transition hover:transition-none duration-500 text-sm" to="mailto:leodesigaux@gmail.com"><span class="cursor-link">CONTACT</span></NuxtLink>
            <!--        <NuxtLink class="hover:text-white transition hover:transition-none duration-500" to="/works"><span class="cursor-link">Works</span></NuxtLink>
            <NuxtLink class="hover:text-white transition hover:transition-none duration-500" to="/experiments"><span class="cursor-link">Experiments</span></NuxtLink>
            <NuxtLink class="hover:text-white transition hover:transition-none duration-500" to="/contact"><span class="cursor-link">Contact</span></NuxtLink> -->
        </nav>
    </div>
    <div ref="submenu" class="submenu w-full bg-primary text-white flex items-center h-0 overflow-clip top-24 fixed z-50 left-0 right-0 bg-[#0a0919CC] backdrop-blur-sm">
        <div class="flex h-full w-full relative">
            <NuxtLink v-on:click="menuhandler" to="/about" class="h-full w-full p-4 flex items-end relative transition-all menu-link group overflow-hidden">
                <div class="opacity-0 hover:opacity-100 transition duration-500 absolute inset-0 h-full w-full bg-gradient-to-tr from-[#FFFFFF00] to-[#FFFFFF08]"></div>
                <span class="menu-text shrink-0 text-4xl text-ldforegroundwhite transition-colors group-hover:text-[#ffffff] ">ABOUT</span>
                <span class="h-[1px] -translate-y-2 mx-4 w-full relative">
                    <span class="horizontal-subline h-[1px] w-full bg-[#ffffff30] origin-left absolute top-0 left-0"></span>
                    <span class="h-[1px] w-full bg-[#ffffff] transform origin-left	scale-x-0 group-hover:scale-x-100 absolute top-0 left-0 transition-all duration-500 ease-in-out"></span>
                </span>
                <span class="text-ldforeground text-xl counter group-hover:text-ldwhite transition group-hover:delay-300 group-hover:duration-200">.01</span>
                <span class="vertical-line origin-bottom absolute top-0 right-0 h-full w-[1px] bg-[#ffffff30] content-[''] z-10"></span>
            </NuxtLink>
            <NuxtLink v-on:click="menuhandler" to="/works" class="h-full w-full p-4 flex items-end relative transition-all menu-link group overflow-hidden">
                <div class="opacity-0 hover:opacity-100 transition duration-500 absolute inset-0 h-full w-full bg-gradient-to-tr from-[#FFFFFF00] to-[#FFFFFF08]"></div>
                <span class="menu-text shrink-0 text-4xl text-ldforegroundwhite transition-colors group-hover:text-[#ffffff] ">WORKS</span>
                <span class="h-[1px] -translate-y-2 mx-4 w-full relative">
                    <span class="horizontal-subline h-[1px] w-full bg-[#ffffff30] origin-left absolute top-0 left-0"></span>
                    <span class="h-[1px] w-full bg-[#ffffff] transform origin-left	scale-x-0 group-hover:scale-x-100 absolute top-0 left-0 transition-all duration-500 ease-in-out"></span>
                </span>
                <span class="text-ldforeground text-xl counter group-hover:text-ldwhite transition group-hover:delay-300 group-hover:duration-200">.02</span>
                <span class="vertical-line origin-bottom absolute top-0 right-0 h-full w-[1px] bg-[#ffffff30] content-[''] z-10"></span>
            </NuxtLink>
            <NuxtLink v-on:click="menuhandler" to="/labs" class="h-full w-full p-4 flex items-end relative transition-all menu-link group overflow-hidden">
                <div class="opacity-0 hover:opacity-100 transition duration-500 absolute inset-0 h-full w-full bg-gradient-to-tr from-[#FFFFFF00] to-[#FFFFFF08]"></div>
                <span class="menu-text shrink-0 text-4xl text-ldforegroundwhite transition-colors group-hover:text-[#ffffff] ">LABS</span>
                <span class="h-[1px] -translate-y-2 mx-4 w-full relative">
                    <span class="horizontal-subline h-[1px] w-full bg-[#ffffff30] origin-left absolute top-0 left-0"></span>
                    <span class="h-[1px] w-full bg-[#ffffff] transform origin-left	scale-x-0 group-hover:scale-x-100 absolute top-0 left-0 transition-all duration-500 ease-in-out"></span>
                </span>
                <span class="text-ldforeground text-xl counter group-hover:text-ldwhite transition group-hover:delay-300 group-hover:duration-200">.03</span>
                <span class="vertical-line origin-bottom absolute top-0 right-0 h-full w-[1px] bg-[#ffffff30] content-[''] z-10"></span>
            </NuxtLink>
            <NuxtLink v-on:click="menuhandler" to="/blog" class="h-full w-full p-4 flex items-end relative transition-all menu-link group overflow-hidden">
                <div class="opacity-0 hover:opacity-100 transition duration-500 absolute inset-0 h-full w-full bg-gradient-to-tr from-[#FFFFFF00] to-[#FFFFFF08]"></div>
                <span class="menu-text shrink-0 text-4xl text-ldforegroundwhite transition-colors group-hover:text-[#ffffff]">BLOG</span>
                <span class="h-[1px] -translate-y-2 mx-4 w-full relative">
                    <span class="horizontal-subline h-[1px] w-full bg-[#ffffff30] origin-left absolute top-0 left-0"></span>
                    <span class="h-[1px] w-full bg-[#ffffff] transform origin-left	scale-x-0 group-hover:scale-x-100 absolute top-0 left-0 transition-all duration-500 ease-in-out"></span>
                </span>
                <span class="text-ldforeground text-xl counter group-hover:text-ldwhite transition group-hover:delay-300 group-hover:duration-200">.04</span>
                <span class="vertical-line origin-bottom absolute top-0 right-0 h-full w-[1px] bg-[#ffffff30] content-[''] z-10"></span>
            </NuxtLink>
            <NuxtLink v-on:click="menuhandler" to="mailto:leodesigaux@gmail.com" class="h-full w-full p-4 flex items-end relative transition-all menu-link group overflow-hidden">
                <div class="opacity-0 hover:opacity-100 transition duration-500 absolute inset-0 h-full w-full bg-gradient-to-tr from-[#FFFFFF00] to-[#FFFFFF08]"></div>
                <span class="menu-text shrink-0 text-4xl text-ldforegroundwhite transition-colors group-hover:text-[#ffffff]">CONTACT</span>
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
</template>
<script setup>
import gsap from 'gsap'
const menu = ref()
const submenu = ref()
const menuwrapper = ref()

let tl = gsap.timeline({
    defaults: {
        duration: 0.3,
    }
});
 
onMounted(() => {
    document.querySelectorAll(".menu-text").forEach(item => {
        let splitted = item.innerText.split('');
        item.innerText = "";
        for (var i in splitted) {
            let letter = splitted[i];
            item.setAttribute("aria-label", splitted.join());
            item.innerHTML += "<span aria-hidden='true' style='position: relative;display: inline-block;pointer-events:none;'>" + letter + "</span>";
        }
    });
    tl.pause()
    tl.fromTo(submenu.value, {
        height: 0,
        opacity: 0,
    }, {
        height: 192,
        opacity: 1,
    }, 0)
    tl.fromTo(submenu.value, {
        height: 0,
        opacity: 0,
    }, {
        height: 192,
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
    document.querySelectorAll(".menu-text").forEach((item, index) => {
        tl.fromTo(item.querySelectorAll("span"), {
            y: 64,
        }, {
            y: 0,
            ease: "circ.out",
            stagger: 0.05,
        }, 0.5 + index * 0.1);
    });
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
})

function menuhandler() {
    if (!submenu.value.classList.contains("opened")) {
        submenu.value.classList.add("opened")
        submenu.value.classList.remove("pointer-events-none")
        tl.play()
    } else {
        submenu.value.classList.remove("opened")
        submenu.value.classList.remove("pointer-events-none")
        tl.reverse()
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