<template>
    <div class="[--footer-size:550px] md:[--footer-size:400px] backdrop-blur-sm md:backdrop-blur relative h-[var(--footer-size)]" style="clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);">
        <div class="relative h-[calc(100vh+var(--footer-size))] -top-[100vh]">
            <div class="sticky top-[calc(100vh-var(--footer-size))] h-[var(--footer-size)]">
                <div class="w-full h-full bg-[#0a0919CC] absolute top-0 left-0 right-0 bottom-0 text-white flex flex-col">
                    <div class="container mx-auto h-full shadow-[1px_0px_0px_#ffffff11,-1px_0px_0px_#ffffff11]">
                        <div class="flex p-8 gap-8 pt-12 md:pt-16 flex-col md:flex-row">
                            <div class="informations flex gap-2 flex-col md:w-4/12">
                                <NuxtLink to="/" class="text-xl flex gap-2 items-center">
                                    <div class="circles flex gap-1">
                                        <span class="w-4 h-4 bg-[#14cac4] rounded-full flex"></span>
                                        <span class="w-4 h-4 bg-[#fc2e79] rounded-full flex"></span>
                                        <span class="w-4 h-4 bg-[#fbb635] rounded-full flex"></span>
                                    </div>
                                </NuxtLink>
                                <div class="text-logo">
                                    <span class="font-light text-ld-50 text-xl">Léo</span><span class="font-bold text-white text-xl">DESIGAUX</span>
                                </div>
                                <p class="text-ld-400 text-sm md:text-base">{{ $t('Web developer for over 10 years, I am a self-taught enthusiast of 25 years old.')}}</p>
                            </div>
                            <div class="hidden md:block md:w-4/12"></div>
                            <div class="hidden  md:block md:w-4/12"></div>
                            <nav class="md:ml-auto flex flex-col gap-2 text-sm text-slate-400 md:w-4/12">
                                <span class="pb-1 md:pb-4">NAVIGATION</span>
                                <NuxtLink class="link-brutal mr-auto" to="/about"><span class="cursor-link">{{ $t('About') }}</span></NuxtLink>
                                <NuxtLink class="link-brutal mr-auto" to="/works"><span class="cursor-link">{{ $t('Works') }}</span></NuxtLink>
                                <NuxtLink class="link-brutal mr-auto" to="/blog"><span class="cursor-link">{{ $t('Blog') }}</span></NuxtLink>
                                <NuxtLink class="link-brutal mr-auto" to="/labs"><span class="cursor-link">{{ $t('Labs') }}</span></NuxtLink>
                                <NuxtLink class="link-brutal mr-auto" to="/contact"><span class="cursor-link">{{ $t('Contact') }}</span></NuxtLink>
                            </nav>
                        </div>
                    </div>
                    <div class="container mx-auto shadow-[1px_0px_0px_#ffffff11,-1px_0px_0px_#ffffff11]">
                        <div class="subfooter flex flex-col md:flex-row p-8 gap-8 container mx-auto mt-auto justify-between shadow-[0px_-1px_0px_#ffffff11] items-center">
                            <div class="socials flex gap-4 mt-auto text-ld-300/60">
                                <a class="cursor-link w-6 h-6 flex mb-auto hover:text-ld-50 transition" href="google.com" target="_blank">
                                    <Icon name="ri:github-fill" size="24" />
                                </a>
                                <a class="cursor-link w-6 h-6 flex mb-auto hover:text-ld-50 transition" href="google.com" target="_blank">
                                    <Icon name="ri:linkedin-fill" size="24" />
                                </a>
                                <a class="cursor-link w-6 h-6 flex mb-auto hover:text-ld-50 transition" href="google.com" target="_blank">
                                    <Icon name="ri:twitter-fill" size="24" />
                                </a>
                                <a class="cursor-link w-6 h-6 flex mb-auto hover:text-ld-50 transition" href="google.com" target="_blank">
                                    <Icon name="ri:soundcloud-fill" size="24" />
                                </a>
                                <a class="cursor-link w-6 h-6 flex mb-auto hover:text-ld-50 transition" href="google.com" target="_blank">
                                    <Icon name="ri:steam-fill" size="24" />
                                </a>
                                <a class="cursor-link w-6 h-6 flex mb-auto hover:text-ld-50 transition" href="google.com" target="_blank">
                                    <Icon name="ri:twitch-fill" size="24" />
                                </a>
                                <a class="cursor-link w-6 h-6 flex mb-auto hover:text-ld-50 transition" href="https://discordapp.com/users/495297000481357834" target="_blank">
                                    <Icon name="ri:discord-fill" size="24" />
                                </a>
                            </div>
                            <div class="copyright flex flex-col md:flex-row gap-2 text-xs text-center md:text-left">
                                <span class="text-ldsemibackground uppercase">Made in France - © 2024 Léo Desigaux</span>
                                <span class="text-ldsemibackground uppercase">All rights reserved</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>