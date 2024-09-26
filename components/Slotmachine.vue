<template>
    <div class="inline-flex flex-col overflow-hidden h-4">
        <div class="inline-flex justify-center" ref="title1Container" :aria-label="title1">
            <span v-for="(letter, index) in title1.split('')" v-bind:key="letter+index">{{ letter }}</span>
        </div>
        <div class="inline-flex justify-center" ref="title2Container" :aria-label="title2" :class="title2Class">
            <span v-for="(letter, index) in title2.split('')" v-bind:key="letter+index">{{ letter }}</span>
        </div>
    </div>
</template>
<script setup>
import gsap from 'gsap'
defineProps(['title1', 'title2', 'title2Class'])
const title1Container = ref(null)
const title2Container = ref(null)
const toggle = (active) => {
    const stagger = 0.05
    const delay = 0
    const duration = 0.3
    const ease = "power1.out"
    if(!active) {
        gsap.to(title1Container.value.querySelectorAll('span'), {
            y: 0,
            duration: duration,
            stagger: stagger,
            delay:delay,
            ease:ease
        })
        gsap.to(title2Container.value.querySelectorAll('span'), {
            y: 0,
            duration: duration,
            stagger: stagger,
            ease:ease
        })
    } else {
        gsap.to(title1Container.value.querySelectorAll('span'), {
            y: "-100%",
            duration: duration,
            stagger: stagger,
            ease:ease
        })
        gsap.to(title2Container.value.querySelectorAll('span'), {
            y: "-100%",
            duration: duration,
            stagger: stagger,
            delay:delay,
            ease:ease
        })
    }
}
defineExpose({toggle})
</script>