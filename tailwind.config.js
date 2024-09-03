export default {
    theme: {
        extend: {
            colors: {
                ldbackground: "#0a0919",
                ldsemibackground: "#484655",
                ldforeground: "#8f8da9",
                ldforegroundwhite: "#c7c6cc",
                ldwhite: "#f7f6ff",
                ldline: "#ffffff11",
            },
            backgroundSize: {
                'size-200': '200% 200%',
            },
            backgroundPosition: {
                'pos-0': '0% 0%',
                'pos-100': '100% 100%',
            },
        }
    },
    plugins: [require('@tailwindcss/typography')]
}