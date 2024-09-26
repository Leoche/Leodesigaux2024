import fluid, { extract, screens, fontSize } from 'fluid-tailwind'
export default {
    theme: {
        screens,
        fontSize,
        extend: {
            colors: {
                ldbackground: "#0a0919",
                ldsemibackground: "#484655",
                ldforeground: "#8f8da9",
                ldforegroundwhite: "#c7c6cc",
                ldwhite: "#f7f6ff",
                ldline: "#ffffff11",
                'ld': {
                    '50': '#f8f7fb',
                    '100': '#f1f0f7',
                    '200': '#e6e3f1',
                    '300': '#d2cde5',
                    '400': '#b8b0d5',
                    '500': '#a698c8',
                    '600': '#8b75b2',
                    '700': '#79629f',
                    '800': '#655285',
                    '900': '#54456d',
                    '950': '#362c49',
                },
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
    content: {
        files: ['./pages/**/*.vue', './components/**/*.vue', './layouts/**/*.vue', './app.vue'],
        extract
    },
    plugins: [require('@tailwindcss/typography'), fluid({
        checkSC144: false
      })]
}