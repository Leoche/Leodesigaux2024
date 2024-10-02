<template>
    <div class="rootPage">
        <div class="container mx-auto px-4 py-8 md:px-6 md:py-12 pb-16 md:pb-32">
            <div class="flex justify-between h-[67px] md:h-[136px] mb-3 md:mb-6">
                <div class="h1-container md:-translate-x-4">
                    <h1 class="h1-heading pr-4 ~text-[4rem]/[8rem] max-h-[67px] md:max-h-[136px] pb-3 md:pb-5 flex relative overflow-hidden bold text-center tracking-tighter bg-[radial-gradient(white,rgb(120,125,219)_60%,rgb(193,159,219)_100%)] [background-position:-10%_65%] bg-[length:150%_200%] bg-clip-text text-transparent font-bold">
                        <span class="h1-heading-span" v-for="letter in $t('Blog').split('')" :key="letter">{{ letter }}</span>
                    </h1>
                </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-8" v-if="data">
                <!-- Blog Post 1 -->
                <NuxtLink :to="{ name: 'blog-slug', params: { slug: post.slug } }" class="cursor-link blog-card p-2 md:p-4 translate-y-32 opacity-0 flex md:flex-col backdrop-blur bg-[#00000073] hover:bg-[#ffffff06] group hover:y-4 hover:transition-none transition duration-1000 border-2 border-[#a5a5a51c] rounded-lg md:rounded-2xl shadow-md overflow-hidden active:translate-y-2 active:transition" v-for="post in data.posts.nodes" :key="post.id">
                    <div class="flex-shrink-0 w-20 md:w-full">
                        <figure class="rounded md:rounded-xl w-full aspect-square relative flex-shrink-0 select-none">
                            <img v-bind:src="post.featuredImage.node.sourceUrl" v-bind:alt="post.title" class="absolute w-full h-full t-0 l-0 z-20 rounded md:rounded-xl object-cover blur-xl brightness-150 opacity-50">
                            <img v-bind:src="post.featuredImage.node.sourceUrl" v-bind:alt="post.title" class="absolute w-full h-full t-0 l-0 z-20 rounded md:rounded-xl object-cover">
                        </figure>
                    </div>
                    <div class="pl-3 md:pl-0 md:pt-4 md:flex-col md:flex flex-grow">
                        <a href="#" class="~text-[.6rem]/[.775rem] text-ld-400 uppercase md:tracking-wide opacity-70 select-none">{{ post.categories.edges[0].node.name }}</a>
                        <h2 class="md:mt-2 md:mb-auto ~text-[1rem]/[1.25rem] ~leading-[1.25rem]/[1.75rem] font-semibold text-ld-50 select-none">{{ post.localTitle }}</h2>
                        <div class="flex items-end mt-4 select-none">
                            <img class="h-6 w-6 md:h-10 md:w-10 rounded-full object-cover" v-bind:src="post.author.node.avatar.url" v-bind:alt="post.author.node.name">
                            <div class="ml-2 md:ml-3">
                                <p class="~text-[.7rem]/[.875rem] font-medium text-ld-100 leading-3 md:leading-5">{{ post.author.node.name }}</p>
                                <div class="flex ~text-[.6rem]/[.75rem] text-ld-400 leading-3 md:leading-5">
                                    <time datetime="2023-01-01">{{ readableMin(post.localContent) }}{{ $t("min read") }}</time>
                                </div>
                            </div>
                            <div class="ml-auto inline-flex">
                                <Icon name="iconamoon:arrow-bottom-right-1-light" class="cursor-arrow group-hover:translate-y-2 group-hover:translate-x-2 group-hover:opacity-100 group-hover:transition-transform transition duration-1000 mt-auto opacity-50 w-6 h-6 md:w-9 md:h-9"></Icon>
                            </div>
                        </div>
                    </div>
                </NuxtLink>
            </div>

        </div>
    </div>
</template>
<script setup>
import * as he from 'he'
import data from '/content/posts.json'
import gsap from "gsap";
const { t, locale } = useI18n({ useScope: "global" });
const head = ref();
useHead(head);

const changeLocale = () => {
    head.value = {
        title: t('Blog') + ' - Léo DESIGAUX, ' + t('Webdevelopper')
    }
    data.posts.nodes.forEach(post => {
        post.localTitle = (locale.value.includes("en")) ? post.title : post.translations[0].title;
        post.localContent = (locale.value.includes("en")) ? post.content : post.translations[0].content;
    });
};
watch(locale, changeLocale, { immediate: true });
const readableMin = (htmlText) => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlText;

    const textContent = tempElement.textContent || tempElement.innerText;
    const words = textContent.trim().split(/\s+/);

    const wordCount = words.length;

    const readingSpeed = 200; // average reading speed (words per minute)
    const readingTime = Math.ceil(wordCount / readingSpeed);

    return readingTime
}
onMounted(() => {
    changeLocale();
    head.value = {
        title: 'Blog - Léo DESIGAUX, ' + t('Webdevelopper')
    }
    gsap.fromTo(
        ".h1-heading",
        { opacity: 0.2 },
        { opacity: 1, duration: 1, delay: 1.5, ease: "power1.inOut" }
    );

    gsap.fromTo(
        ".h1-heading-span",
        { lineHeight: 3 },
        { lineHeight: 0.9, duration: .8, stagger: .1, delay: 0.1, ease: "expo.out" }
    );
    
  gsap.fromTo(
    ".blog-card",
    {
      opacity: 0,
      y: 32,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.4,
      delay: 1,
      ease: "back.out(1.2)",
      stagger: 0.1,
    }
  );
});
</script>