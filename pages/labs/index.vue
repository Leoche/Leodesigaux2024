<template>
    <div class="xl:container mx-auto py-12 labs">
        <section class="flex flex-col items-center gap-4">
            <h1 class="bg-radial from-white to-[#11175e] [background-position:50%_70%] [background-size:150%_200%] bg-clip-text text-transparent font-bold w-[400px] mx-auto">Welcome<br>to the Lab.</h1>
            <h2 class="text-2xl font-light">A collection of experiments</h2>
        </section>
        <div class="container-labs" v-for="experiments in localLabs">
            <div class="circle_container cursor-link" v-for="(experiment, index) in experiments" :class="'circle-' + (index + 1)" @mouseover="playVideo($event)" @mouseleave="pauseVideo($event)">
                <div class="circle">
                    <figure>
                        <img v-if="!experiment.labsAcf.preview" v-bind:src="experiment.labsAcf.img.node.mediaItemUrl" v-bind:alt="experiment.localTitle" />
                        <video v-if="experiment.labsAcf.preview" loop muted playsinline>
                            <source :src="experiment.labsAcf.preview.node.mediaItemUrl">
                            <source :src="experiment.labsAcf.previewmp4.node.mediaItemUrl">
                        </video>
                    </figure>
                </div>
            </div>
        </div>
        <section>SCROLL UP</section>
    </div>
</template>
<script setup>
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
useHead(head);
onMounted(() => {
    changeLocale();
    // next tick
    nextTick(() => {
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.batch(".circle_container", {
            onEnter: (elements) => {
                gsap.to(elements, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    ease: "back.out(1.2)",
                    delay: 0.1,
                    stagger: 0.1,
                    onComplete: function () {
                        this.targets().forEach((element) => {
                            if (!element.initialized) {
                                const size = element.querySelector(".circle").offsetWidth;
                                const originalX =
                                    element.querySelector(".circle").offsetLeft + size / 2;
                                const originalY =
                                    element.querySelector(".circle").offsetTop + size / 2;
                                const circ = element.querySelector(".circle");
                                const rect = circ.getBoundingClientRect();
                                const data = {
                                    element: circ,
                                    radius: rect.width / 2,
                                    originalX: rect.left + window.scrollX,
                                    originalY: rect.top + window.scrollY,
                                    currentX: rect.left + window.scrollX,
                                    currentY: rect.top + window.scrollY,
                                };
                                elements_circles.push(data);
                                element.initialized = true;
                            }
                        });
                    },
                });
            },
        });
    });
});

const changeLocale = () => {
    head.value = {
        title: 'Labs - Léo DESIGAUX, ' + t('Webdevelopper')
    }
    localLabs.value = data;
    if (locale.value.includes("fr")) {
        localLabs.value.experiments.nodes.forEach((experiment) => {
            console.log(experiment.title)
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
    let chunkedLocalLabs = [];
    let size = 12;
    if (localLabs.value.experiments.nodes.length < size) {
        chunkedLocalLabs = [localLabs.value.experiments.nodes];
    } else {
        for (let i = 0; i < localLabs.value.experiments.nodes.length; i += size) {
            chunkedLocalLabs.push(localLabs.value.experiments.nodes.slice(i, i + size));
        }
    }
    localLabs.value = chunkedLocalLabs
};

const playVideo = (event) => {
    const video = event.currentTarget.querySelector('video');
    if (video) {
        console.log(video);
        video.play();
    }
};
const pauseVideo = (event) => {
    const video = event.currentTarget.querySelector('video');
    if (video) {
        video.pause();
        video.currentTime = 0;
    }
}
</script>