<template>
  <div class="rootPage">
    <div class="container mx-auto md:pt-8">
      <div class="p-8 gap-4">
        <div class="flex pb-8 justify-between">
          <div class="flex">
            <div>
              <input type="checkbox" name="type_all" id="type_all" class="hidden peer/type_all" />
              <label for="type_all" class="peer-checked/type_all:text-ldwhite peer-checked/type_all:bg-[#26253acc] transition active:scale-90 hover:bg-[#26253acc] select-none bg-[#0a0919CC] backdrop-blur-sm cursor-link py-2 px-3 inline-flex items-center justify-center rounded-l-xl bg-primary text-ldforeground gap-2 shadow-[0px_0px_0px_1px_#ffffff11]">
                <Icon name="material-symbols:asterisk-rounded"></Icon>
                <span>All</span>
              </label>
            </div>
            <div>
              <input type="checkbox" name="type_web" id="type_web" class="hidden peer/type_web" />
              <label for="type_web" class="peer-checked/type_web:text-ldwhite peer-checked/type_web:bg-[#26253acc] transition active:scale-90 hover:bg-[#26253acc] select-none bg-[#0a0919CC] backdrop-blur-sm cursor-link py-2 px-3 inline-flex items-center justify-center bg-primary text-ldforeground gap-2 shadow-[0px_0px_0px_1px_#ffffff11]">
                <Icon name="material-symbols:globe"></Icon>
                <span>Web</span>
              </label>
            </div>
            <div>
              <input type="checkbox" name="type_games" id="type_games" class="hidden peer/type_games" />
              <label for="type_games" class="peer-checked/type_games:text-ldwhite peer-checked/type_games:bg-[#26253acc] transition active:scale-90 hover:bg-[#26253acc] select-none bg-[#0a0919CC] backdrop-blur-sm cursor-link py-2 px-3 inline-flex items-center justify-center bg-primary text-ldforeground gap-2 shadow-[0px_0px_0px_1px_#ffffff11]">
                <Icon name="material-symbols:videogame-asset"></Icon>
                <span>Games</span>
              </label>
            </div>
            <div>
              <input type="checkbox" name="type_softwares" id="type_softwares" class="hidden peer/type_softwares" />
              <label for="type_softwares" class="peer-checked/type_softwares:text-ldwhite active:scale-90 peer-checked/type_softwares:bg-[#26253acc] transition hover:bg-[#26253acc] select-none bg-[#0a0919CC] backdrop-blur-sm cursor-link py-2 px-3 inline-flex items-center justify-center bg-primary text-ldforeground gap-2 shadow-[0px_0px_0px_1px_#ffffff11]">
                <Icon name="material-symbols:package-2-outline"></Icon>
                <span>Softwares</span>
              </label>
            </div>
            <div>
              <input type="checkbox" name="type_print" id="type_print" class="hidden peer/type_print" />
              <label for="type_print" class="peer-checked/type_print:text-ldwhite peer-checked/type_print:bg-[#26253acc] transition active:scale-90 hover:bg-[#26253acc] select-none bg-[#0a0919CC]  backdrop-blur-sm cursor-link py-2 px-3 inline-flex items-center justify-center rounded-r-xl bg-primary text-ldforeground gap-2 shadow-[0px_0px_0px_1px_#ffffff11]">
                <Icon name="material-symbols:imagesmode-rounded"></Icon>
                <span>Print</span>
              </label>
            </div>
          </div>
          <div class="flex">
            <div>
              <input type="checkbox" name="category_pro" id="category_pro" class="hidden peer/category_pro" />
              <label for="category_pro" class="peer-checked/category_pro:text-ldwhite peer-checked/category_pro:bg-[#26253acc] transition active:scale-90 hover:bg-[#26253acc] select-none bg-[#0a0919CC] backdrop-blur-sm cursor-link py-2 px-3 inline-flex items-center rounded-l-xl justify-center bg-primary text-ldforeground gap-2 shadow-[0px_0px_0px_1px_#ffffff11]">
                <Icon name="mdi:briefcase-variant"></Icon>
                <span>Pro</span>
              </label>
            </div>
            <div>
              <input type="checkbox" name="category_perso" id="category_perso" class="hidden peer/category_perso" />
              <label for="category_perso" class="peer-checked/category_perso:text-ldwhite peer-checked/category_perso:bg-[#26253acc] transition active:scale-90 hover:bg-[#26253acc] select-none bg-[#0a0919CC] backdrop-blur-sm cursor-link py-2 px-3 inline-flex items-center justify-center rounded-r-xl bg-primary text-ldforeground gap-2 shadow-[0px_0px_0px_1px_#ffffff11]">
                <Icon name="material-symbols:imagesmode-rounded"></Icon>
                <span>Personal</span>
              </label>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6" v-if="data">
          <div class="card max-w-sm shadow relative backdrop-blur bg-[#00000000] border-2 border-[#a5a5a51c] rounded-2xl" v-for="work in data.works.nodes" :key="work.id">
            <div class="p-4 box-border flex flex-col gap-4">
              <figure class="w-full relative h-48 rounded-lg after:t-0 after:l-0 after:w-full after:h-full after:blur after:content-[''] after:absolute after:bg-[url(https://images.ctfassets.net/h9l0gdn8tp2b/6lKVCDW4xyAG0IwAUAgUA0/b289e27dc708e17a42ba4fb1cc8837d6/ld42.png)] after:bg-cover after:bg-center after:rounded-t-lg">
                <img class="absolute w-full h-full t-0 l-0 z-20 rounded-lg object-cover" :src="work.acf.previewUrl.node.mediaItemUrl" alt="{{ work.title }}">
              </figure>
              <div class="card-body flex flex-col gap-2">
                <h2 class="card-title text-pink-100 line-clamp-2">{{ work.title }}</h2>
                <p class="text-pink-100 text-opacity-70 text-sm font-light" v-html="work.content"></p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const query = gql`query allWorks {
  works {
    nodes {
      title
      slug
      acf {
        date
        link
        link2
        previewUrl: preview {
          node {
            mediaItemUrl
          }
        }
        tags {
          tagList: edges {
            tag: node {
              name
              slug
            }
          }
        }
        category {
          categoryList: edges {
            category: node {
              name
              slug
            }
          }
        }
      }
      content(format: RENDERED)
    }
  }
}
`
const { data } = await useAsyncQuery(query, { limit: 5 })
</script>