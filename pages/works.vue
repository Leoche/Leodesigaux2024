<template>
  <div class="rootPage">
    <div class="container mx-auto md:pt-32">
      <div class="p-8 gap-4">
        <div class="flex pb-8 justify-between">
          <div class="flex toolbar">
            <div>
              <input type="radio" v-model="categoryModel" name="category" id="category_all" value="all" class="hidden peer/category_all" checked />
              <label for="category_all" class="peer-checked/category_all:text-ldwhite peer-checked/category_all:bg-[#26253acc] transition active:scale-90 hover:bg-[#26253acc] select-none bg-[#0a0919CC] backdrop-blur-sm cursor-link py-2 px-3 inline-flex items-center justify-center rounded-l-xl bg-primary text-ldforeground gap-2 shadow-[0px_0px_0px_1px_#ffffff11]">
                <Icon name="material-symbols:asterisk-rounded"></Icon>
                <span>{{ $t('All') }}</span>
              </label>
            </div>
            <div>
              <input type="radio" v-model="categoryModel" name="category" id="category_web" value="web" class="hidden peer/category_web" />
              <label for="category_web" class="peer-checked/category_web:text-ldwhite peer-checked/category_web:bg-[#26253acc] transition active:scale-90 hover:bg-[#26253acc] select-none bg-[#0a0919CC] backdrop-blur-sm cursor-link py-2 px-3 inline-flex items-center justify-center bg-primary text-ldforeground gap-2 shadow-[0px_0px_0px_1px_#ffffff11]">
                <Icon name="material-symbols:globe"></Icon>
                <span>{{ $t('Web') }}</span>
              </label>
            </div>
            <div>
              <input type="radio" v-model="categoryModel" name="category" id="category_games" value="games" class="hidden peer/category_games" />
              <label for="category_games" class="peer-checked/category_games:text-ldwhite peer-checked/category_games:bg-[#26253acc] transition active:scale-90 hover:bg-[#26253acc] select-none bg-[#0a0919CC] backdrop-blur-sm cursor-link py-2 px-3 inline-flex items-center justify-center bg-primary text-ldforeground gap-2 shadow-[0px_0px_0px_1px_#ffffff11]">
                <Icon name="material-symbols:videogame-asset"></Icon>
                <span>{{ $t('Games') }}</span>
              </label>
            </div>
            <div>
              <input type="radio" v-model="categoryModel" name="category" id="category_softwares" value="softwares" class="hidden peer/category_softwares" />
              <label for="category_softwares" class="peer-checked/category_softwares:text-ldwhite active:scale-90 peer-checked/category_softwares:bg-[#26253acc] transition hover:bg-[#26253acc] select-none bg-[#0a0919CC] backdrop-blur-sm cursor-link py-2 px-3 inline-flex items-center justify-center bg-primary text-ldforeground gap-2 shadow-[0px_0px_0px_1px_#ffffff11]">
                <Icon name="material-symbols:package-2-outline"></Icon>
                <span>{{ $t('Softwares') }}</span>
              </label>
            </div>
            <div>
              <input type="radio" v-model="categoryModel" name="category" id="category_prints" value="prints" class="hidden peer/category_prints" />
              <label for="category_prints" class="peer-checked/category_prints:text-ldwhite peer-checked/category_prints:bg-[#26253acc] transition active:scale-90 hover:bg-[#26253acc] select-none bg-[#0a0919CC]  backdrop-blur-sm cursor-link py-2 px-3 inline-flex items-center justify-center rounded-r-xl bg-primary text-ldforeground gap-2 shadow-[0px_0px_0px_1px_#ffffff11]">
                <Icon name="material-symbols:imagesmode-rounded"></Icon>
                <span>{{ $t('Prints') }}</span>
              </label>
            </div>
          </div>
          <div class="flex toolbar">
            <div>
              <input type="checkbox" v-on:change="handleType" name="pro" id="pro" class="hidden peer/pro" />
              <label for="pro" :class="{ activeTag: typeFilter.includes('pro') }" class="transition active:scale-90 hover:bg-[#26253acc] select-none bg-[#0a0919CC] backdrop-blur-sm cursor-link py-2 px-3 inline-flex items-center rounded-l-xl justify-center bg-primary text-ldforeground gap-2 shadow-[0px_0px_0px_1px_#ffffff11]">
                <Icon name="mdi:briefcase-variant"></Icon>
                <span>Pro</span>
              </label>
            </div>
            <div>
              <input type="checkbox" v-on:change="handleType" name="perso" id="perso" class="hidden peer/perso" />
              <label for="perso" :class="{ activeTag: typeFilter.includes('perso') }" class="transition active:scale-90 hover:bg-[#26253acc] select-none bg-[#0a0919CC] backdrop-blur-sm cursor-link py-2 px-3 inline-flex items-center justify-center rounded-r-xl bg-primary text-ldforeground gap-2 shadow-[0px_0px_0px_1px_#ffffff11]">
                <Icon name="material-symbols:imagesmode-rounded"></Icon>
                <span>Personal</span>
              </label>
            </div>
          </div>
        </div>
        <TransitionGroup name="list" class="flex flex-wrap relative" tag="div" @before-leave="beforeLeave">
          <div class="card max-w-sm flex shadow relative backdrop-blur transition bg-[#00000000] border-2 border-[#a5a5a51c] rounded-2xl group" v-for="work in dataFilter" :key="work.workId" :data-id="work.workId">
            <div class="p-4 box-border flex flex-col gap-4 flex-grow">
              <figure class="w-full relative h-48 rounded-lg">
                <img v-bind:src="work.acf.previewUrl.node.mediaItemUrl" v-bind:alt="work.title" class="absolute w-full h-full t-0 l-0 z-20 rounded-xl object-cover blur-xl brightness-150 opacity-50">
                <img v-bind:src="work.acf.previewUrl.node.mediaItemUrl" v-bind:alt="work.title" class="absolute w-full h-full t-0 l-0 z-20 rounded-xl object-cover">
              </figure>
              <div class="card-body flex flex-col gap-2 relative h-auto flex-grow">
                <h2 class="card-title text-white line-clamp-2">{{ work.title }}</h2>
                <p class="text-pink-100 text-opacity-70 text-sm font-light group-hover:opacity-15 transition duration-400" v-html="work.content"></p>
                <div class="tags group-hover:opacity-5 transition duration-400 mt-auto inline-flex gap-2 flex-wrap justify-end">
                  <span v-for="tag in work.acf.tags.tagList" :key="tag.tag.slug" class="bg-purple-200/10 text-xs text-pink/60 p-2 py-1 rounded-lg">{{ tag.tag.name }}</span>
                </div>
                <div class="absolute inset-0 flex gap-2 justify-center items-center mt-auto opacity-0 transition duration-400 group-hover:opacity-100 group-hover:translate-y-0 translate-y-3">
                  <a target="_blank" :href="work.acf.link" v-if="work.acf.link" class="bg-white/10 text-white flex gap-2 items-center justify-center hover:text-opacity-100 hover:bg-white/20 transition text-opacity-90 text-sm mt-auto flex-grow text-center backdrop-blur rounded py-3">
                    <ActionIcon :action="work.acf.label" />
                    <span class="mr-1">{{ $t(work.acf.label) }}</span>
                  </a>
                  <a target="_blank" :href="work.acf.link2" v-if="work.acf.link2" class="bg-white/10 text-white flex gap-2 items-center justify-center hover:text-opacity-100 hover:bg-white/20 transition text-opacity-90 text-sm mt-auto flex-grow text-center backdrop-blur rounded py-3">
                    <ActionIcon :action="work.acf.label2" />
                    <span class="mr-1">{{ $t(work.acf.label2) }}</span>
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
let typeFilter = ref([
  "pro",
  "perso",
]);
import data from '/content/works.json'
import { onMounted, defineModel } from 'vue'
import gsap from 'gsap'

const categoryModel = defineModel({ default: "all" });
onMounted(() => {
  gsap.fromTo(".toolbar", { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 2.5 })
  /* gsap.fromTo(".card", {
    opacity: 0,
    y: 32,
  }, {
    opacity: 1,
    y: 0,
    duration: 0.4,
    delay: 1,
    ease: "back.out(1.2)",
    stagger: 0.1
  }) */
})
function handleType(e) {
  if (e.target.checked) {
    typeFilter.value.push(e.target.name.toLowerCase());
  } else {
    typeFilter.value = typeFilter.value.filter(item => item !== e.target.name.toLowerCase());
  }
}

const dataFilter = computed(() => {
  if (categoryModel.value === "all") {
    return data.works.nodes;
  } else {
    return data.works.nodes.filter(work => work.acf.category.toLowerCase() === categoryModel.value);
  }
})


const beforeLeave = function (el) {
  const { marginLeft, marginTop, width, height } = window.getComputedStyle(el)

  el.style.left = `${el.offsetLeft - parseFloat(marginLeft, 10)}px`
  el.style.top = `${el.offsetTop - parseFloat(marginTop, 10)}px`
  el.style.width = width
  el.style.height = height
}

</script>
<style>
.activeTag {
  background: #26253acc;
  color: #fff;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);

}

.list-leave-active {
  position: absolute;
  z-index: -1;
}
</style>