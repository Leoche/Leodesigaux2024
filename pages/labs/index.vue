<template>
    <div class="rootPage">
        <div class="wrapper-pin relative md:h-[300vh] -mt-16 md:-mt-24">
            <div class="pin sticky top-0 left-0 w-full">
                <div class="wrapper-container-labs relative pb-16 md:pb-0 md:h-screen overflow-clip">
                    <div class="md:absolute titles select-none top-0 left-0 pl-0 sm:pl-4 right-0 md:h-full container-info md:origin-left xl:container mx-auto flex flex-col md:justify-center">
                        <h1 class="inline translate-y-16 opacity-0 mt-24 md:mt-0 mx-4 md:mr-auto md:ml-0 ~text-[2rem]/[6rem] ~leading-[2rem]/[6rem] text-left tracking-tighter bg-[radial-gradient(white,rgb(120,125,219)_60%,rgb(193,159,219)_100%)] [background-position:-10%_65%] bg-[length:150%_200%] bg-clip-text text-transparent font-bold">{{ $t('Welcome') }} <br class="hidden md:block">{{ $t('to the Lab.') }}</h1>
                        <h2 class="inline translate-y-16 opacity-0 mx-4 md:mr-auto md:ml-0 ~text-[1rem]/[1.875rem] font-light text-ld-400/70 mt-2 md:mt-4">{{ $t('My collection of experiments') }}</h2>
                    </div>
                    <div class="md:absolute md:top-0 md:left-[40vw] md:h-full md:w-[400vw] flex items-center container-items swiper w-full">
                        <div class="item flex flex-shrink swiper-wrapper pb-6 md:pb-0 pt-4 md:pt-0  ">
                            <div class="swiper-slide md:translate-x-32 md:opacity-0 mt-4 md:mt-0 md:mr-16 flex-shrink-0 md:max-w-72 flex-grow-0 max-w-68 origin-center inline-flex flex-col shadow hover:z-10 relative backdrop-blur duration-500 bg-[#00000073] border-2 border-[#a5a5a51c] rounded-[24px]" v-for="(experiment, index) in localLabs">
                                <div class="p-4 flex flex-col flex-grow">
                                    <figure v-bind:dataSrc="experiment.labsAcf.preview.node.mediaItemUrl" v-bind:dataSrcMp4="experiment.labsAcf.preview.node.mediaItemUrl" class="relative aspect-square rounded-xl overflow-hidden w-full md:hover:scale-[1.50] md:hover:translate-y-[-60px] md:active:translate-y-[-30px] duration-500 transition w-full figure-video" :data-video="experiment.labsAcf.preview.node.mediaItemUrl" :data-videomp4="experiment.labsAcf.previewmp4.node.mediaItemUrl" @mouseover="playVideo($event)" @touchstart="playVideo($event)" @touchmove="playVideo($event, false)" @touchend="pauseVideo($event)" @mouseleave="pauseVideo($event)">
                                        <LoaderImage class="absolute inset-0 aspect-square rounded-xl" v-bind:container-class="'md:h-64'" v-bind:src="experiment.labsAcf.img.node.mediaItemUrl" v-bind:alt="experiment.localTitle" />
                                    </figure>
                                    <div class="mt-4 flex flex-col gap-1 flex-grow select-none">
                                        <div class="flex justify-between items-end">
                                            <h3 class="text-ld-100">{{ experiment.localTitle }}</h3>
                                            <div class="date text-sm text-ld-600">{{ experiment.labsAcf.year }}</div>
                                        </div>
                                        <div class="mt-auto flex items-center justify-between">
                                            <div class="inline-flex gap-1">
                                                <span class="px-2 py-1 text-xs bg-ld-600/10 text-ld-300 rounded mr-auto" v-for="tag in experiment.tags.nodes">{{ tag.name }}</span>
                                            </div>
                                            <NuxtLink :to="'/labs/' + experiment.slug" class="cursor-link inline-flex gap-1 group items-center py-2">
                                                <span class="text-xs tracking-tighter opacity-80 text-ld-50 group-hover:opacity-100">{{ $t("VIEW") }}</span>
                                                <Icon name="iconamoon:arrow-right-1-light" class="md:group-hover:translate-x-1 md:group-hover:opacity-100 opacity-80 text-ld-50 group-hover:transition-transform transition duration-1000 mt-auto md:w-4 md:h-4"></Icon>
                                            </NuxtLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="swiper-scrollbar md:hidden bottom-4 mx-16 max-w-[calc(100vw-128px)]"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import Swiper from 'swiper';
import { Scrollbar } from 'swiper/modules';
import LoaderImage from "~/components/LoaderImage.vue";
import data from "/content/labs.json";
const { t, locale } = useI18n();
const localLabs = ref({});
import { nextTick } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
const elements_circles = [];
definePageMeta({
    pageTransition: {
        name: 'page',
        mode: 'out-in',
    },
});

const head = ref({});
let swiper = null;
useHead(head);
onMounted(async () => {
    changeLocale();
    await nextTick();
    init()
    window.addEventListener('breakpointChanged', (event) => {
        init()
    });
});
let wrapperGsap = null;
let titleGsap = null;
let mobileSwiper = null;
const init = () => {
    console.log("init")
    if (titleGsap) titleGsap.kill();
    if (wrapperGsap) wrapperGsap.kill();
    if (mobileSwiper) { mobileSwiper.destroy(); console.log(mobileSwiper) }
    gsap.registerPlugin(ScrollTrigger);
    if (!window.isMobile) {
        let sections = gsap.utils.toArray(".container-items .item");
        gsap.to(".titles .inline", {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            ease: "power1.inOut",
        });
        gsap.to(".container-items div.swiper-slide", {
            x: 0,
            opacity: 1,
            stagger: 0.1,
            ease: "power1.inOut",
            delay: 1,
        });
        wrapperGsap = gsap.to(".container-items > div.item", {
            x: -document.querySelector(".container-items .item").getBoundingClientRect().width + window.innerWidth * 0.2,
            ease: "none",
            scrollTrigger: {
                trigger: ".pin",
                scrub: 1,
                start: "top top",
                end: "top -=180%",
                invalidateOnRefresh: true,
            }
        });
        titleGsap = gsap.to(".container-info", {
            scale: 0.5,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
                trigger: ".pin",
                scrub: 1,
                start: "top top",
                end: "top -=150px",
                invalidateOnRefresh: true,
            }
        });
    } else {
        mobileSwiper = new Swiper('.swiper', {
            modules: [Scrollbar],
            scrollbar: {
                el: ".swiper-scrollbar",
            },
            slidesPerView: 1.4,
            freeMode: true,
            centeredSlides: true,
            spaceBetween: 16,
            on: {
                slideChangeTransitionEnd: (event) => {
                    pauseVideoInFigure();
                    playVideoInFigure(document.querySelector('.swiper-slide-active figure'));
                },
                afterInit: (event) => {
                    playVideoInFigure(document.querySelector('.swiper-slide-active figure'));
                }
            }
        });
    }
}

const changeLocale = () => {
    head.value = {
        title: 'Labs - Léo DESIGAUX, ' + t('Webdevelopper')
    }
    localLabs.value = data;
    if (locale.value.includes("fr")) {
        localLabs.value.experiments.nodes.forEach((experiment) => {
            experiment.localTitle = experiment.translations[0].title;
            experiment.localContent = experiment.translations[0].content;
        });
    } else {
        localLabs.value.experiments.nodes.forEach((experiment) => {
            experiment.localTitle = experiment.title;
            experiment.localContent = experiment.content;
        });
    }
    localLabs.value.experiments.nodes.sort((a, b) => {
        return b.labsAcf.year - a.labsAcf.year;
    });
    localLabs.value = localLabs.value.experiments.nodes
};

const playVideo = (event) => {
    if (window.isMobile) return;
    const figure = event.target.closest(".figure-video");
    playVideoInFigure(figure);
};
const pauseVideo = (event) => {
    if (window.isMobile) return;
    event.preventDefault();
    pauseVideoInFigure();
}

const playVideoInFigure = (figure) => {
    if (figure.querySelector('video')) return;
    // Create the <video> element
    const video = document.createElement('video');
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.classList.add("absolute", "inset-0", "aspect-square", "rounded-xl");

    // Create the MP4 <source> element
    const mp4Source = document.createElement('source');
    mp4Source.src = figure.dataset.videomp4;
    mp4Source.type = 'video/mp4';

    // Create the WebM <source> element
    const webmSource = document.createElement('source');
    webmSource.src = figure.dataset.video;
    webmSource.type = 'video/webm';

    // Append the <source> elements to the <video> element
    video.appendChild(mp4Source);
    video.appendChild(webmSource);

    // Append the <video> element to the .figure-video container
    figure.appendChild(video);
    if (video) video.play();
};
const pauseVideoInFigure = () => {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => video.remove());
}
</script>
<style>
.swiper-slide-active {
    transition: .2s all;
    ;
    transform: translateY(-8px) scale(1.05) !important;
}
</style>