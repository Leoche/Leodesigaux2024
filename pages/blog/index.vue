<template>
    <div class="rootPage">
        <div class="container mx-auto px-6 py-12">
            <div class="flex pb-4 justify-between h-[160px]">
            <h1 class="h1-heading text-9xl flex relative bold text-center -translate-x-2 tracking-tighter bg-[radial-gradient(white,rgb(120,125,219)_60%,rgb(193,159,219)_100%)] [background-position:-10%_65%] bg-[length:150%_200%] bg-clip-text text-transparent font-bold w-[400px]"> 
                <span class="h1-heading-span">B</span>
                <span class="h1-heading-span">l</span>
                <span class="h1-heading-span">o</span>
                <span class="h1-heading-span">g</span>
            </h1>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8" v-if="data">
                <!-- Blog Post 1 -->
                <NuxtLink :to="{ name: 'blog-slug', params: { slug: post.slug }}" class="backdrop-blur bg-[#00000000] hover:bg-[#ffffff06] group hover:y-4 hover:transition-none transition duration-1000 border-2 border-[#a5a5a51c] rounded-2xl shadow-md overflow-hidden active:translate-y-2 active:transition" v-for="post in data.posts.nodes" :key="post.id">
                    <div class="p-4">
                        <figure class="rounded-xl w-full aspect-square relative">
                            <img v-bind:src="post.featuredImage.node.sourceUrl" v-bind:alt="post.title" class="absolute w-full h-full t-0 l-0 z-20 rounded-xl object-cover blur-xl brightness-150 opacity-50">
                            <img v-bind:src="post.featuredImage.node.sourceUrl" v-bind:alt="post.title" class="absolute w-full h-full t-0 l-0 z-20 rounded-xl object-cover">
                        </figure>
                    </div>
                    <div class="px-6 pb-6">
                        <a href="#" class="text-xs font-semibold text-pink-300 uppercase tracking-wide opacity-50">{{ post.categories.edges[0].node.name }}</a>
                        <h2 class="mt-2 text-xl font-semibold text-white-800">{{ post.title }}</h2>
                        <div class="mt-4 flex items-end">
                            <img class="h-10 w-10 rounded-full object-cover" v-bind:src="post.author.node.avatar.url" v-bind:alt="post.author.node.name">
                            <div class="ml-3">
                                <p class="text-sm font-medium text-white-800">{{ post.author.node.name }}</p>
                                <div class="flex text-sm text-slate-400">
                                    <time datetime="2023-01-01">5min read</time>
                                </div>
                            </div>
                            <div class="ml-auto inline-flex">
                                <Icon name="iconamoon:arrow-bottom-right-1-light" class="group-hover:translate-y-2 group-hover:translate-x-2 group-hover:opacity-100 group-hover:transition-transform transition duration-1000 mt-auto opacity-50" size="36px"></Icon>
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
onMounted(() => {
  gsap.fromTo(
    ".h1-heading",
    { opacity: 0.2 },
    { opacity: 1, duration: 1, delay:1.5, ease: "power1.inOut" }
  );
  
  gsap.fromTo(
    ".h1-heading-span",
    { lineHeight: 3 },
    { lineHeight: 0.9, duration: .8, stagger: .1, delay:0.1, ease: "expo.out" }
  );
});
</script>