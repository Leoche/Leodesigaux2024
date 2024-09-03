<template>
    <div class="rootPage">
        <div class="container mx-auto px-6 py-12">
            <div class="max-w-4xl mx-auto px-6 py-12 bg-[#0a0919CC] backdrop-blur-sm">

                <!-- Navigation -->
                <nav class="mb-4" aria-label="Breadcrumb">
                    <NuxtLink to="/blog" class="inline-flex gap-2 items-center uppercase custom text-sm text-gray-400 hover:text-gray-200">
                        <Icon name="ri:arrow-left-line"></Icon>{{ $t("backtoblog") }}
                    </NuxtLink>
                </nav>

                <!-- Title and Meta Information -->
                <header class="mb-12">
                    <h1 class="text-4xl font-bold text-gray-100 leading-relaxed">{{ localPost.title }}</h1>
                    <div class="flex items-center text-sm text-gray-400 mt-2">
                        <time class="capitalize" :datetime="localPost.date">{{ useDate(localPost.date, $i18n.locale) }}</time>
                        <span class="mx-2 text-gray-600">/</span>
                        <span>{{ readingTime}} {{ $t('minread') }}</span>
                        <span class="mx-2 text-gray-600">/</span>
                        <span class="px-2 py-1 bg-violet-600/10 text-violet-300 rounded">
                            {{ $t("lastupdated") }}: <time class="capitalize" :datetime="localPost.modified">{{ useDate(localPost.modified, $i18n.locale) }}</time>
                        </span>
                    </div>
                </header>

                <!-- Content -->
                <article class="prose prose-invert max-w-none leading-relaxed highlight_wrapper" v-html="localPost.content">
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
const { locale } = useI18n()

const route = useRoute()
const post = ref(alldata.posts.nodes.find(post => post.slug === route.params.slug));
const localPost = ref({});

onMounted(() => {
    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('css', css);
    hljs.highlightAll();
    changeLocale();
});
onUpdated(() => {
    hljs.highlightAll();
});
const changeLocale = () => {
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
    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('css', css);
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