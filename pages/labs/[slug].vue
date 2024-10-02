<template>
    <div class="rootPage">
        <div class="container mx-auto md:py-3 md:px-6">
            <div class="mx-auto px-6 md:px-6 py-6 md:py-6 md:mb-12 bg-[#0a0919CC] backdrop-blur-sm rounded-xl">

                <!-- Navigation -->
                <nav class="mb-4" aria-label="Breadcrumb">
                    <NuxtLink to="/labs" class="inline-flex gap-2 items-center uppercase custom text-xs md:text-sm text-ld-500 hover:text-ld-200">
                        <Icon name="ri:arrow-left-line"></Icon>{{ $t("backtolabs") }}
                    </NuxtLink>
                </nav>

                <!-- Title and Meta Information -->
                <header class="mb-6 md:mb-12">
                    <div class="flex md:justify-between flex-col gap-2 md:gap-0">
                        <h1 class="~text-[1.875rem]/[2.25rem] ~leading-[2.25rem]/[2.5rem] font-bold text-ld-100 md:leading-relaxed">{{ localLab.localTitle }}</h1>
                        <time class="~text-[1rem]/[1.25rem] capitalize text-ld-800"><span class="md:hidden">Date: </span>{{ localLab.labsAcf.year }}</time>
                    </div>
                    <div class="flex md:flex-row flex-col gap-8 md:gap-0 md:justify-between md:items-center">
                        <div class="flex flex-row items-center text-xs md:text-sm text-ld-400 mt-4 md:mt-2 ">
                            <span class="mr-2 text-ld-400 text-xs">TAGS : </span>
                            <div class="inline-flex gap-1">
                                <span class="px-2 py-1 text-xs bg-ld-600/10 text-ld-300 rounded mr-auto" v-for="tag in localLab.tags.nodes">{{ tag.name }}</span>
                            </div>
                        </div>
                        <div class="inline-flex justify-center md:justify-end gap-1 md:gap-2">
                            <a v-if="localLab.labsAcf.codepen" target="_blank" :href="localLab.labsAcf.codepen" type="button" class="text-white bg-ld-700/30 hover:bg-ld-700/50 transition active:scale-95 focus:outline-none font-medium rounded-full text-sm px-3 py-2 text-center me-2 mb-2 inline-flex items-center gap-2">
                                <Icon name="iconoir:codepen" class="w-6 h-6" /> Codepen
                            </a>
                            <a v-if="localLab.labsAcf.github" target="_blank" :href="localLab.labsAcf.github" type="button" class="text-white bg-ld-700/30 hover:bg-ld-700/50 transition active:scale-95 focus:outline-none font-medium rounded-full text-sm px-3 py-2 text-center me-2 mb-2 inline-flex items-center gap-2">
                                <Icon name="mdi:github" class="w-6 h-6" /> Github
                            </a>
                            <a v-if="localLab.labsAcf.iframe" target="_blank" :href="localLab.labsAcf.iframe" type="button" class="text-white bg-ld-700/30 hover:bg-ld-700/50 transition active:scale-95 focus:outline-none font-medium rounded-full text-sm px-3 py-2 text-center me-2 mb-2 inline-flex items-center gap-2">
                                <Icon name="material-symbols:fullscreen" class="w-6 h-6" /> {{ $t("Fullscreen") }}
                            </a>
                        </div>
                    </div>
                </header>
                <section class="flex flex-col md:flex-row bg-[#04021f21] w-full min-h-[60vh] rounded-xl">
                    <div v-show="editorEnabled()" class="basis-6/12 md:w-6/12 editor h-6/12 md:h-auto flex flex-col flex-grow flex-shrink-0 border border-ld-800/30 rounded-t-xl md:rounded-r-none md:rounded-l-lg">
                        <div class="flex border-b border-ld-800/30 items-center justify-between">
                            <div @click="setTabActive('html')" :class="classTabActive('html')" class="rounded-tl-lg transition w-full text-sm text-center h-12 flex justify-center items-center border-r border-ld-800/30">HTML</div>
                            <div @click="setTabActive('css')" :class="classTabActive('css')" class="transition w-full text-sm text-center h-12 flex justify-center items-center border-r border-ld-800/30">CSS</div>
                            <div @click="setTabActive('js')" :class="classTabActive('js')" class="md:rounded-tr-none rounded-tr-lg transition w-full text-sm text-center h-12 flex justify-center items-center">JS</div>
                        </div>
                        <div class="editor text-sm md:flex-shrink-0 md:flex-grow md:h-full flex-shrink max-h-[40vh] md:max-h-[30vw] p-2 md:p-4 overflow-y-scroll" data-lenis-prevent>
                            <pre v-if="isTabActive('html')"><code class="language-html">{{ localLab.labsAcf.html }}</code></pre>
                            <pre v-if="isTabActive('css')"><code class="language-css">{{ localLab.labsAcf.css }}</code></pre>
                            <pre v-if="isTabActive('js')"><code class="language-js">{{ localLab.labsAcf.js }}</code></pre>
                        </div>
                    </div>
                    <div :class="{ 'rounded-xl': !editorEnabled(), 'rounded-b-xl': editorEnabled() }" class="relative bg-black basis-6/12 preview h-6/12 md:h-auto flex-grow min-h-[60vh] flex-shrink-0 overflow-hidden border-b md:border-t border-l md:border-l-0 border-r md:rounded-l-none md:rounded-r-lg border-ld-800/30">
                        <iframe v-if="localLab.labsAcf.iframe" :src="localLab.labsAcf.iframe" class="absolute inset-0 w-full h-full" frameborder="0" />
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>
<script setup>
import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import { onMounted, computed } from 'vue'
import alldata from '/content/labs.json'
const { t, locale } = useI18n({ useScope: "global" });
const head = ref();
useHead(head);
const route = useRoute()
const lab = ref(alldata.experiments.nodes.find(post => post.slug === route.params.slug));
const localLab = ref({});
const tabActive = ref("html");
const classTabActive = (tab) => {
    return (tabActive.value === tab) ? "bg-ld-500/10 text-ld-50" : "text-ld-400 hover:bg-ld-500/5 hover:text-ld-200";
}
const editorEnabled = () => {
    if (!localLab.value.labsAcf.html && !localLab.value.labsAcf.css && !localLab.value.labsAcf.js) {
        return false;
    }
    return true;
}
const isTabActive = (tab) => {
    return tabActive.value === tab;
}
const setTabActive = async (tab) => {
    tabActive.value = tab;
    await nextTick();
    hljs.highlightAll();
}

onMounted(async () => {
    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('css', css);
    hljs.registerLanguage('xml', xml);
    changeLocale();
    await nextTick();
    hljs.highlightAll();
});
const changeLocale = async () => {
    localLab.value = lab.value;
    if (locale.value.includes("fr")) {
        localLab.value.localTitle = localLab.value.translations[0].title;
        localLab.value.localContent = localLab.value.translations[0].content;
    } else {
        localLab.value.localTitle = localLab.value.title;
        localLab.value.localContent = localLab.value.content;
    }
    head.value = {
        title: localLab.value.localTitle + ' - Blog -  Léo DESIGAUX, ' + t('Webdevelopper')
    }
    await nextTick();
    hljs.highlightAll();
};
watch(locale, changeLocale, { immediate: true });
</script>
<style>
.editor *::-webkit-scrollbar,
.editor::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.editor *,
.editor {
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}

iframe {
    zoom: 0.5;
}

@media screen {}
</style>