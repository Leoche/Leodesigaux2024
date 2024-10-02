<template>
    <div ref="lazyImage" :class="containerClass" class="relative md:min-w-64 w-full bg-ld-900/5 rounded select-none">
        <div class="absolute w-full h-full inset-0 flex items-center justify-center bg-ld-900/20">
            <svg class="w-10 h-10 text-ld-400/30" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18"> 
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
        </div>
        <img class="absolute inset-0 w-full h-full object-cover transition duration-1000 object-center" ref="imgElement" :alt="alt" :class="{'opacity-0': !loaded}" />
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
    src: {
        type: String,
        required: true,
    },
    alt: {
        type: String,
        default: '',
    },
    imageClass: {
        type: String,
        default: '',
    },
    containerClass: {
        type: String,
        default: '',
    },
});

let observer = null;
const lazyImage = ref(null);  // Reference to the container
const imgElement = ref(null); // Reference to the img element
const loaded = ref(false); // Reference to the img element

const onImageLoad = () => {
    if (observer) {
        observer.disconnect(); // Disconnect observer after image is fully loaded
        observer = null; // Clean up reference to avoid memory leaks
        loaded.value = true
    }
};

const loadImage = (entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            imgElement.value.setAttribute('src', props.src);
            imgElement.value.addEventListener('load', onImageLoad); // Listen for image load event
        }
    });
};

onMounted(() => {
    observer = new IntersectionObserver(loadImage, {
        root: null,
        rootMargin: "100px",
    });
    if (lazyImage.value) {
        observer.observe(lazyImage.value); // Start observing the container div
    }
});

onUnmounted(() => {
    if (observer) observer.disconnect(); // Cleanup observer if component is unmounted
});
</script>

<style scoped>
/* Add any additional styles if needed */
</style>