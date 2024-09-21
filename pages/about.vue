<template>
  <div class="rootPage">
    <div class="min-h-screen w-full">
      <div class="container mx-auto">
        <div class="text-2xl px-96 pt-72 pb-96 flex flex-col">
          <div class="about-text backdrop-blur bg-[#00000000] border-2 border-[#a5a5a51c] px-8 py-12 rounded-xl">
            <p class="pb-12 flex flex-wrap gap-x-2 text-5xl"><span class="word" v-for="(word, index) in $t('*Hello!').split(' ')" :key="'0' + word + index">
                <span class="letter" :class="{higlighted: word.includes('*')}" v-for="(letter, index) in word.replace('*','').split('')" :key="'0' + letter + index">{{ letter == " " ? "&nbsp;" : letter }}</span>
              </span></p>
            <p class="pb-8 flex flex-wrap gap-x-2"><span class="word" v-for="(word, index) in $t('Je suis *Léo, développeur web depuis mes 13 ans. *Une *passion qui m\'a accompagné tout au long de ma vie.').split(' ')" :key="'0' + word + index">
                <span class="letter" :class="{higlighted: word.includes('*')}" v-for="(letter, index) in word.replace('*','').split('')" :key="'0' + letter + index">{{ letter == " " ? "&nbsp;" : letter }}</span>
              </span></p>

            <p class="pb-8 flex flex-wrap gap-x-2"><span class="word" v-for="(word, index) in $t('Aujourd\'hui, avec plus de *17 *ans *d\'expérience, j\'ai transformé cette passion en une carrière que j\'adore.').split(' ')" :key="'0' + word + index">
                <span class="letter" :class="{higlighted: word.includes('*')}" v-for="(letter, index) in word.replace('*','').split('')" :key="'0' + letter + index">{{ letter == " " ? "&nbsp;" : letter }}</span>
              </span></p>

            <p class="pb-8 flex flex-wrap gap-x-2"><span class="word" v-for="(word, index) in $t('Toujours à la recherche de nouvelles techs à explorer et repousser les limites du possible en expérimentant.').split(' ')" :key="'0' + word + index">
                <span class="letter" :class="{higlighted: word.includes('*')}" v-for="(letter, index) in word.replace('*','').split('')" :key="'0' + letter + index">{{ letter == " " ? "&nbsp;" : letter }}</span>
              </span></p>

            <p class="pb-16 flex flex-wrap gap-x-2"><span class="word" v-for="(word, index) in $t('Je développe aussi des *jeux *vidéo, ce qui me permet d’ajouter une touche ludique à mes projets.').split(' ')" :key="'0' + word + index">
                <span class="letter" :class="{higlighted: word.includes('*')}" v-for="(letter, index) in word.replace('*','').split('')" :key="'0' + letter + index">{{ letter == " " ? "&nbsp;" : letter }}</span>
              </span></p>

            <p class="pb-8 flex flex-wrap gap-x-2"><span class="word" v-for="(word, index) in $t('Envie de donner vie à vos idées ou de discuter de votre prochain projet ?').split(' ')" :key="'0' + word + index">
                <span class="letter higlighted" v-for="(letter, index) in word.replace('*','').split('')" :key="'0' + letter + index">{{ letter == " " ? "&nbsp;" : letter }}</span>
              </span></p>
            <p>
              <a href="#" class="flex gap-2 items-center hover:gap-3 transition-all text-ld-300 rounded-full justify-center">
                <span class="word" v-for="(word, index) in $t('Contactez-moi').split(' ')" :key="'0' + word + index">
                  <span class="letter higlighted" v-for="(letter, index) in word.replace('*','').split('')" :key="'0' + letter + index">{{ letter == " " ? "&nbsp;" : letter }}</span>
                </span>
                <span class="letter inline-flex"><Icon name="iconamoon:arrow-right-1"></Icon></span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { gsap } from 'gsap';
import { ref, onMounted, computed } from 'vue';
import ScrollTrigger from "gsap/ScrollTrigger";
onMounted(() => {
  // next tick
  nextTick(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to('.letter', {
      opacity: 1,
      y: -5,
      ease: "back.out(8)",
      scrollTrigger: {
        trigger: '.about-text',
        pin: true,
        start: 'top 100px', // when the top of the trigger hits the top of the viewport
        end: 'bottom 70%', // end after scrolling 500px beyond the start
        scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar,
        markers: { fontSize: "18px", fontWeight: "bold", indent: 20 }
      },
      stagger: 0.1,
    });
  });
});
</script>
<style scoped>
.letter {
  color: #a698c8;
  opacity: 0.2;
  display: inline-flex;
}
.higlighted{
  color: #f8f7fb;
}
</style>