<template>
    <div class="[--footer-size:400px] relative h-[var(--footer-size)]" style="clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);">
        <div class="relative h-[calc(100vh+var(--footer-size))] -top-[100vh]">
            <div class="sticky top-[calc(100vh-var(--footer-size))] h-[var(--footer-size)]">
                <div class="w-full h-full bg-[#0a0919CC] backdrop-blur absolute top-0 left-0 right-0 bottom-0 text-white flex flex-col">
                    <div class="container mx-auto h-full shadow-[1px_0px_0px_#ffffff11,-1px_0px_0px_#ffffff11]">
                        <div class="flex p-8 gap-8 pt-16">
                            <div class="informations flex gap-2 flex-col w-4/12">
                                <NuxtLink to="/" class="text-xl flex gap-2 items-center">
                                    <div class="circles flex gap-1">
                                        <span class="w-4 h-4 bg-[#14cac4] rounded-full flex"></span>
                                        <span class="w-4 h-4 bg-[#fc2e79] rounded-full flex"></span>
                                        <span class="w-4 h-4 bg-[#fbb635] rounded-full flex"></span>
                                    </div>
                                </NuxtLink>
                                <div class="text-logo">
                                    <span class="font-light text-blue-50">Léo</span><span class="font-bold text-white">DESIGAUX</span>
                                </div>
                                <p class="text-ldforeground">Développeur web depuis plus de 10 ans, je suis un passionné autodidacte de 25 ans.</p>
                            </div>
                            <div class="w-4/12"></div>
                            <div class="w-4/12"></div>
                            <nav class="ml-auto flex flex-col gap-2 text-sm text-slate-400 w-4/12">
                                <span class="text-ldwhite pb-4">NAVIGATION</span>
                                <NuxtLink class="link-brutal mr-auto" to="/about"><span class="cursor-link">About</span></NuxtLink>
                                <NuxtLink class="link-brutal mr-auto" to="/works"><span class="cursor-link">Works</span></NuxtLink>
                                <NuxtLink class="link-brutal mr-auto" to="/experiments"><span class="cursor-link">Experiments</span></NuxtLink>
                                <NuxtLink class="link-brutal mr-auto" to="/contact"><span class="cursor-link">Contact</span></NuxtLink>
                            </nav>
                        </div>
                    </div>
                    <div class="container mx-auto shadow-[1px_0px_0px_#ffffff11,-1px_0px_0px_#ffffff11]">
                        <div class="subfooter flex p-8 gap-8 container mx-auto mt-auto justify-between shadow-[0px_-1px_0px_#ffffff11] items-center">
                            <div class="socials flex gap-4 mt-auto">
                                <a class="cursor-link" href="google.com" target="_blank">
                                    <Icon name="ri:github-fill" size="24" />
                                </a>
                                <a class="cursor-link" href="google.com" target="_blank">
                                    <Icon name="ri:linkedin-fill" size="24" />
                                </a>
                                <a class="cursor-link" href="google.com" target="_blank">
                                    <Icon name="ri:twitter-fill" size="24" />
                                </a>
                                <a class="cursor-link" href="google.com" target="_blank">
                                    <Icon name="ri:soundcloud-fill" size="24" />
                                </a>
                                <a class="cursor-link" href="google.com" target="_blank">
                                    <Icon name="ri:steam-fill" size="24" />
                                </a>
                                <a class="cursor-link" href="google.com" target="_blank">
                                    <Icon name="ri:twitch-fill" size="24" />
                                </a>
                            </div>
                            <div class="copyright flex gap-2 text-xs">
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