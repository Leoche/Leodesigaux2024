import { HomeState } from './HomeState.js';
import { WorkState } from './WorkState.js';
import { BlogState } from './BlogState.js';
import { AboutState } from './AboutState.js';
import { gsap } from 'gsap';

class StateManager {
    constructor(theater) {
        this.theater = theater;        
        this.states = {
            "home": new HomeState(this.theater),
            "works": new WorkState(this.theater),
            "blog": new BlogState(this.theater),
            "about": new AboutState(this.theater),
        };
        let cleanest = window.location.pathname.split("/");
        if(cleanest[1] == "") {
            cleanest[1] = "home";
        }
        this.startState = cleanest[1];
        this.activeState = null;
    }
    init(){
        if(!this.theater.settings.debug){
            this.theater.pointLight1.intensity = 0;
            this.theater.pointLight2.intensity = 0;
            this.theater.pointLight3.intensity = 0;
        }
        this.enter(this.startState);
        window.addEventListener('mousedown', ()=> {
            return;
            if(this.activeState == "work"){
                this.switch("home");
            }
            else {
                this.switch("work");
            }
        });
    }
    render(time){
        this.states[this.activeState].animate(time);
    }
    async switch(state){
        let cleanest = state.split("/");
        if(cleanest[1] == "") {
            cleanest[1] = "home";
        }
        if(cleanest[1] == this.activeState) return;
        await this.leave();
        await this.enter(cleanest[1]);
    }
    async enter(state){
        if(typeof this.states[state] == "undefined") {
            console.info("State " + state + " does not exist, reverting to home");
            state = "home";
        }
        let delay = 0.5;
        let duration = 1;
        if(state == "home"){
            delay = 4;
            duration = 4;
        }
        this.activeState = state;
        this.states[this.activeState].enter();
        gsap.to(this.theater.pointLight1, {
            duration: duration,
            delay:delay,
            intensity: 50,
            ease: "power1.inOut",
            onStart: () => {
                if(state == "home"){
                    this.theater.settings.timeScaleRatioOpening = 0.05;
                }
            },
        });
        gsap.to(this.theater.pointLight2, {
            duration: duration,
            delay:delay,
            intensity: 50,
            ease: "power1.inOut",
        });
        await gsap.to(this.theater.pointLight3, {
            duration: duration,
            delay:delay,
            intensity: 50,
            ease: "power1.inOut",
        });
    }
    async leave(){
        gsap.to(this.theater.pointLight1, {
            duration: 1,
            intensity: 0,
            ease: "power1.inOut",
        });
        gsap.to(this.theater.pointLight2, {
            duration: 1,
            intensity: 0,
            ease: "power1.inOut",
        });
        await gsap.to(this.theater.pointLight3, {
            duration: 1,
            intensity: 0,
            ease: "power1.inOut",
        });
        this.states[this.activeState].leave();
    }
}

export { StateManager };