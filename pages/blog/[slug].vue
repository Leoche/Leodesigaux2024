<template>
    <div class="rootPage">
        <div class="container mx-auto md:py-6 md:px-6">
            <div class="max-w-4xl mx-auto px-6 md:px-6 py-6 md:py-12 bg-[#0a0919CC] backdrop-blur-sm rounded-xl">

                <!-- Navigation -->
                <nav class="mb-4" aria-label="Breadcrumb">
                    <NuxtLink to="/blog" class="inline-flex gap-2 items-center uppercase custom text-xs md:text-sm text-ld-500 hover:text-ld-200">
                        <Icon name="ri:arrow-left-line"></Icon>{{ $t("backtoblog") }}
                    </NuxtLink>
                </nav>

                <!-- Title and Meta Information -->
                <header class="mb-6 md:mb-12">
                    <h1 class="~text-[1.875rem]/[2.25rem] ~leading-[2.25rem]/[2.5rem] font-bold text-gray-100 md:leading-relaxed">{{ localPost.title }}</h1>
                    <div class="flex flex-col md:flex-row md:items-center text-xs md:text-sm text-gray-400 mt-4 md:mt-2 gap-3 md:gap-0">
                        <time class="capitalize" :datetime="localPost.date"><span class="md:hidden">Date: </span>{{ useDate(localPost.date, $i18n.locale) }}</time>
                        <span class="hidden md:inline mx-2 text-ld-800">/</span>
                        <span><span class="md:hidden">{{ $t("Readtime") }}: </span>{{ readingTime}} {{ $t('minread') }}</span>
                        <span class="hidden md:inline mx-2 text-ld-800">/</span>
                        <span class="px-2 py-1 bg-violet-600/10 text-violet-300 rounded mr-auto">
                            {{ $t("lastupdated") }}: <time class="capitalize" :datetime="localPost.modified">{{ useDate(localPost.modified, $i18n.locale) }}</time>
                        </span>
                    </div>
                </header>

                <!-- Content -->
                <article class="prose-sm md:prose-base prose prose-invert max-w-none leading-relaxed highlight_wrapper" v-html="localPost.content">
                </article>
                <!-- Structured Data -->
                <div class="hidden">
                    <span itemprop="headline">{{ localPost.title }}</span>
                    <time itemprop="datePublished" :datetime="localPost.date">{{ localPost.date }}</time>
                    <time v-if="localPost.modified !== localPost.date" itemprop="dateModified" :datetime="localPost.modified">{{ localPost.modified }}</time>
                    <span itemprop="author">{{ localPost.author }}</span>
                    <link itemprop="mainEntityOfPage" :href="'/blog' + localPost.slug">
                    <img v-if="localPost.image" :src="localPost.image" itemprop="image" :alt="localPost.title">
                    <meta itemprop="description" :content="localPost.excerpt">
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import { useDate } from '../composables/date.js'
import { onMounted, computed } from 'vue'
import alldata from '/content/posts.json'
const { t, locale } = useI18n({ useScope: "global" });
const head = ref();
useHead(head);
const route = useRoute()
const post = ref(alldata.posts.nodes.find(post => post.slug === route.params.slug));
const localPost = ref({});

onMounted(() => {
    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('css', css);
    changeLocale();
});
onUpdated(() => {
    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('css', css);
});
const changeLocale = async () => {
    if (locale.value.includes("en")) {
        localPost.value = {
            title: post.value.title,
            content: post.value.content,
            excerpt: post.value.excerpt,
            date: post.value.modified,
            locale: locale.value,
            modified: post.value.modified,
            author: post.value.author,
            image: post.value.image,
        };
    } else {
        localPost.value = {
            title: post.value.translations[0].title,
            content: post.value.translations[0].content,
            excerpt: post.value.translations[0].excerpt,
            date: post.value.modified,
            locale: locale.value,
            modified: post.value.modified,
            author: post.value.author,
            image: post.value.image,
        };
    }
    head.value = {
        title: localPost.value.title + ' - Blog -  Léo DESIGAUX, ' + t('Webdevelopper')
    }
    await nextTick(); 
    hljs.highlightAll();
};
watch(locale, changeLocale, { immediate: true });

const readingTime = computed(() => {
    const plainText = localPost.value.content.replace(/<[^>]+>/g, '');
    const words = plainText.trim().split(/\s+/).length;
    const wordsPerMinute = 200;
    return Math.ceil(words / wordsPerMinute);
});
const calculateReadingTime = () => {
    const plainText = content.value.replace(/<[^>]+>/g, '');
    const words = plainText.trim().split(/\s+/).length;
    const wordsPerMinute = 200;
    return Math.ceil(words / wordsPerMinute);
};
</script>