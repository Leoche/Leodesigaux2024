export default defineNuxtRouteMiddleware((to, from) => {
    console.log("Middleware to " + to.path);
    if(process.browser){
        if(typeof window.theater != "undefined"){
            window.theater.switch(to.path);
        }
    }
})