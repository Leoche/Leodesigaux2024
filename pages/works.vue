<template>
  <div class="rootPage">
    <div class="container mx-auto works">
      <div class="p-4 md:p-8 gap-4">
        <div class="flex pb-6 justify-between">
          <div class="h1-container md:-translate-x-4">
            <h1 class="h1-heading pr-4 ~text-[4rem]/[8rem] max-h-[120px] flex relative overflow-hidden bold text-center tracking-tighter bg-[radial-gradient(white,rgb(120,125,219)_60%,rgb(193,159,219)_100%)] [background-position:-10%_65%] bg-[length:150%_200%] bg-clip-text text-transparent font-bold">
              <span class="h1-heading-span" v-for="letter in $t('Works').split('')" :key="letter">{{ letter }}</span>
            </h1>
          </div>
        </div>
        <div class="flex gap-2 flex-col md:flex-row pb-8 items-center md:justify-between text-sm md:text-base">
          <div class="flex toolbar">
            <div>
              <input type="radio" v-model="categoryModel" name="category" id="category_all" value="all" class="hidden peer/category_all" checked />
              <label for="category_all" class="peer-checked/category_all:text-ld-200 peer-checked/category_all:bg-[#26253a33] transition active:scale-90 hover:bg-[#26253a33] select-none bg-[#0a0919CC] backdrop-blur-sm cursor-link py-2 px-3 inline-flex items-center justify-center rounded-l-xl bg-primary text-ld-400/60 gap-2 shadow-[0px_0px_0px_1px_#ffffff11]">
                <Icon name="material-symbols:asterisk-rounded"></Icon>
                <span>{{ $t("All") }}</span>
              </label>
            </div>
            <div>
              <input type="radio" v-model="categoryModel" name="category" id="category_web" value="web" class="hidden peer/category_web" />
              <label for="category_web" class="peer-checked/category_web:text-ld-200 peer-checked/category_web:bg-[#26253a33] transition active:scale-90 hover:bg-[#26253a33] select-none bg-[#0a0919CC] backdrop-blur-sm cursor-link py-2 px-3 inline-flex items-center justify-center bg-primary text-ld-400/60 gap-2 shadow-[0px_0px_0px_1px_#ffffff11]">
                <Icon name="material-symbols:globe"></Icon>
                <span>{{ $t("Web") }}</span>
              </label>
            </div>
            <div>
              <input type="radio" v-model="categoryModel" name="category" id="category_games" value="games" class="hidden peer/category_games" />
              <label for="category_games" class="peer-checked/category_games:text-ld-200 peer-checked/category_games:bg-[#26253a33] transition active:scale-90 hover:bg-[#26253a33] select-none bg-[#0a0919CC] backdrop-blur-sm cursor-link py-2 px-3 inline-flex items-center justify-center bg-primary text-ld-400/60 gap-2 shadow-[0px_0px_0px_1px_#ffffff11]">
                <Icon name="material-symbols:videogame-asset"></Icon>
                <span>{{ $t("Games") }}</span>
              </label>
            </div>
            <div>
              <input type="radio" v-model="categoryModel" name="category" id="category_softwares" value="softwares" class="hidden peer/category_softwares" />
              <label for="category_softwares" class="peer-checked/category_softwares:text-ld-200 active:scale-90 peer-checked/category_softwares:bg-[#26253a33] transition rounded-r-xl  hover:bg-[#26253a33] select-none bg-[#0a0919CC] backdrop-blur-sm cursor-link py-2 px-3 inline-flex items-center justify-center bg-primary text-ld-400/60 gap-2 shadow-[0px_0px_0px_1px_#ffffff11]">
                <Icon name="material-symbols:package-2-outline"></Icon>
                <span>{{ $t("Softwares") }}</span>
              </label>
            </div>
            <div class="hidden">
              <input type="radio" v-model="categoryModel" name="category" id="category_prints" value="prints" class="hidden peer/category_prints" />
              <label for="category_prints" class="peer-checked/category_prints:text-ld-200 peer-checked/category_prints:bg-[#26253a33] transition active:scale-90 hover:bg-[#26253a33] select-none bg-[#0a0919CC] backdrop-blur-sm cursor-link py-2 px-3 inline-flex items-center justify-center rounded-r-xl bg-primary text-ld-400/60 gap-2 shadow-[0px_0px_0px_1px_#ffffff11]">
                <Icon name="material-symbols:imagesmode-rounded"></Icon>
                <span>{{ $t("Prints") }}</span>
              </label>
            </div>
          </div>
          <div class="flex toolbar">
            <div>
              <input type="checkbox" v-model="typeModel" value="pro" name="pro" id="pro" class="hidden peer/pro" />
              <label for="pro" :class="{ activeTag: typeModel.includes('pro') }" class="transition active:scale-90 hover:bg-[#26253a33] select-none bg-[#0a0919CC] backdrop-blur-sm cursor-link py-2 px-3 inline-flex items-center rounded-l-xl justify-center bg-primary text-ld-400/60 gap-2 shadow-[0px_0px_0px_1px_#ffffff11]">
                <Icon name="mdi:briefcase-variant"></Icon>
                <span>Pro</span>
              </label>
            </div>
            <div>
              <input type="checkbox" v-model="typeModel" value="perso" name="perso" id="perso" class="hidden peer/perso" />
              <label for="perso" :class="{ activeTag: typeModel.includes('perso') }" class="transition active:scale-90 hover:bg-[#26253a33] select-none bg-[#0a0919CC] backdrop-blur-sm cursor-link py-2 px-3 inline-flex items-center justify-center rounded-r-xl bg-primary text-ld-400/60 gap-2 shadow-[0px_0px_0px_1px_#ffffff11]">
                <Icon name="material-symbols:imagesmode-rounded"></Icon>
                <span>{{ $t("Personnal")}}</span>
              </label>
            </div>
          </div>
        </div>
        <TransitionGroup name="grid" class="work-grid grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" tag="div" @before-leave="beforeLeave"> 
          <div class="card md:max-w-[356px] min-h-[376px] md:min-h-[376px] origin-center flex shadow relative backdrop-blur transition-all duration-500 bg-[#00000073] border-2 border-[#a5a5a51c] rounded-[24px] group" v-for="work in dataFilter" :key="work.workId" :data-id="work.workId">
            <div class="p-4 box-border flex flex-col gap-4 flex-grow">
              <figure class="w-full relative md:h-48 rounded-[4px] aspect-[1.7_/_1] md:aspect-auto">
                <img v-bind:src="work.workAcf.previewUrl.node.mediaItemUrl" v-bind:alt="work.localTitle" class="absolute w-full h-full t-0 l-0 z-20 rounded-[12px] object-cover blur-xl brightness-150 opacity-30" />
                <img v-bind:src="work.workAcf.previewUrl.node.mediaItemUrl" v-bind:alt="work.localTitle" class="absolute w-full h-full t-0 l-0 z-20 rounded-[12px] object-cover" />
              </figure>
              <div class="card-body flex flex-col gap-2 relative h-auto flex-grow">
                <h2 class="card-title text-white line-clamp-2 flex justify-between items-center">
                  <span class="text-lg text-ld-100 ">{{ work.localTitle }}</span>
                  <span class="text-ld-600 text-sm">{{ new Date(work.workAcf.date).getFullYear() }}</span>
                </h2>
                <p class="text-ld-300 text-opacity-70 text-sm font-light transition duration-400 mb-auto" v-html="work.localContent"></p>
                <div class="tags group-hover:opacity-5 transition duration-400 mt-auto inline-flex gap-2 flex-wrap justify-end pt-2">
                  <span v-for="tag in work.workAcf.tags.tagList" :key="tag.tag.slug" class="bg-ld-400/10 text-xs tracking-tight uppercase text-ld-400 p-2 py-1 rounded-lg">{{ tag.tag.name }}</span>
                </div>
                <div class="absolute inset-0 flex gap-2 justify-center items-center mt-auto opacity-0 transition duration-400 group-hover:opacity-100 group-hover:translate-y-0 translate-y-3">
                  <a rel="nofollow" target="_blank" :href="work.workAcf.link" v-if="work.workAcf.link" class="bg-white/10 text-white flex gap-2 items-center justify-center hover:text-opacity-100 hover:bg-white/20 transition text-opacity-90 text-sm mt-auto flex-grow text-center backdrop-blur rounded py-3">
                    <ActionIcon :action="work.workAcf.label" />
                    <span class="mr-1">{{ $t(work.workAcf.label) }}</span>
                  </a>
                  <a rel="nofollow" target="_blank" :href="work.workAcf.link2" v-if="work.workAcf.link2" class="bg-white/10 text-white flex gap-2 items-center justify-center hover:text-opacity-100 hover:bg-white/20 transition text-opacity-90 text-sm mt-auto flex-grow text-center backdrop-blur rounded py-3">
                    <ActionIcon :action="work.workAcf.label2" />
                    <span class="mr-1">{{ $t(work.workAcf.label2) }}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>
<script setup>
import data from "/content/works.json";
const { t, locale } = useI18n({ useScope: "global" });
const localWorks = ref({});
import { onMounted, defineModel } from "vue";
import gsap from "gsap";

const head = ref({});
useHead(head);

const categoryModel = defineModel({ default: "all" });
const typeModel = ref(["perso", "pro"]);

definePageMeta({
  pageTransition: {
    name: 'page-out',
    mode: 'out-in',
  },
});

onMounted(() => {
  changeLocale();
  gsap.fromTo(
    ".toolbar",
    { opacity: 0 },
    { opacity: 1, duration: 0.4, delay: 0.5 }
  );
  gsap.fromTo(
    ".card",
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
      onComplete: function () {
        gsap.set(this.targets(), { clearProps: "all" });
      },
    }
  );

  gsap.fromTo(
    ".h1-heading",
    { opacity: 0.2 },
    { opacity: 1, duration: 1, delay: 1.5, ease: "power1.inOut" }
  );

  gsap.fromTo(
    ".h1-heading-span",
    { lineHeight: 3 },
    { lineHeight: 1, duration: .8, stagger: .1, delay: 0.1, ease: "expo.out" }
  );
});

const dataFilter = computed(() => {
  let filteredData = null;
  if (categoryModel.value === "all") {
    filteredData = localWorks.value.works.nodes;
  } else {
    filteredData = localWorks.value.works.nodes.filter(
      (work) => work.workAcf.category.toLowerCase() === categoryModel.value
    );
  }
  if (typeModel.value.length != 2) {
    if (typeModel.value.includes("pro")) {
      filteredData = filteredData.filter(
        (work) => work.workAcf.type.toLowerCase() === "pro"
      );
    } else if (typeModel.value.includes("perso")) {
      filteredData = filteredData.filter(
        (work) => work.workAcf.type.toLowerCase() === "perso"
      );
    } else {
      return [];
    }
  }
  return filteredData;
});

const changeLocale = () => {
  head.value = {
    title: t('Works') + ' - Léo DESIGAUX, ' + t('Webdevelopper')
  }
  localWorks.value = data;
  if (locale.value.includes("fr")) {
    localWorks.value.works.nodes.forEach((work) => {
      work.localTitle = work.translations[0].title;
      work.localContent = work.translations[0].content;
    });
  } else {
    localWorks.value.works.nodes.forEach((work) => {
      work.localTitle = work.title;
      work.localContent = work.content;
    });
  }
  localWorks.value.works.nodes.sort((a, b) => {
    return Date.parse(b.workAcf.date) - Date.parse(a.workAcf.date);
  });
};
watch(locale, changeLocale, { immediate: true });
const beforeLeave = (el) => {
  const { marginLeft, marginTop, width, height } = window.getComputedStyle(el);

  el.style.left = `${el.offsetLeft - parseFloat(marginLeft, 10)}px`;
  el.style.top = `${el.offsetTop - parseFloat(marginTop, 10)}px`;
  el.style.width = width;
  el.style.height = height;
  el.style.position = "absolute";
};
</script>
<style>
.activeTag {
  background: #26253a33;
  color: rgb(230 227 241);
}

.grid-leave-active,
.grid-enter-active {
  transform: scale(0);
  opacity: 0;
  transform: translateY(32px);
  position: relative;
}
</style>