export default defineNuxtRouteMiddleware((to, from) => {
    if(import.meta.browser){
        if(typeof window.theater != "undefined"){
            window.theater.switch(to.path);
        }
    }
})