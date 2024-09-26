import { lerp } from './utils/lerp.js';
class MouseManager {
    constructor(theater) {
        this.theater = theater;
        this.position = {
            x: 0,
            y: 0
        }
        this.positionReal = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        }
        this.cursormousePosition = {
            x: 0,
            y: 0
        }
        this.cursormousePointPosition = {
            x: 0,
            y: 0
        }
        this.cursormouseLookAt = null;
        this.cursormouseWidth = 32;
        this.cursormouseHeight = 32;
        this.cursormouseDx = 50
        this.cursormouseR = 16
        this.events = {
            mousemove: [],
            mousedown: [],
            mouseenter: [],
            mouseup: [],
            linkenter: [],
            linkleave: []
        }
        this.initialized = false

        this.dom = {
            cursor: document.querySelector('.cursor'),
            cursorCircle: document.querySelector('.cursor circle'),
            cursorText: document.querySelector('.cursor text'),
            textCursor: document.querySelector('#textCursor'),
            textCircle: document.querySelector('#textCircle'),
            cursorpoint: document.querySelector('.cursorpoint'),
        }
        if (this.initialized) return;
        if (window.isMobile) {
            // For mobile devices, use touch events
            console.log("asda");
            this.initialized = true;

            window.addEventListener("touchmove", event => { this.mousemove(event) }, false);
            window.addEventListener("touchstart", event => { this.mousedown(event) }, false);
            window.addEventListener("touchend", event => { this.mouseup(event) }, false);
        } else {
            // For non-mobile devices, use mouse events
            window.addEventListener("mousemove", event => { this.mousemove(event) }, false);
            window.addEventListener("mousedown", event => { this.mousedown(event) }, false);
            window.addEventListener("mouseup", event => { this.mouseup(event) }, false);
            window.addEventListener("mouseenter", event => { this.mouseenter(event) }, false);
            document.addEventListener('mousemove', (event) => {
                if (!event.target.closest(".cursor-link")) {
                    this.linkleave(event);
                } else {
                    this.linkenter(event.target.closest(".cursor-link"));
                }
            });
        }
    }
    addEvent(event, callback) {
        this.events[event].push(callback);
    }
    removeAllEvents() {
        this.events.mousemove = [];
        this.events.mousedown = [];
        this.events.mouseup = [];
        this.events.linkenter = [];
        this.events.linkleave = [];
    }
    mousemove(event) {
        this.updateMousePosition(event);
        this.events.mousemove.forEach(callback => callback(event));
    }
    mousedown(event) {
        this.events.mousedown.forEach(callback => callback(event));
    }
    mouseup(event) {
        this.events.mouseup.forEach(callback => callback(event));
    }
    mouseenter(event) {
        this.updateMousePosition(event);
        this.events.mouseenter.forEach(callback => callback(event));
    }
    linkenter(event) {
        this.cursormouseLookAt = event;
        this.events.linkenter.forEach(callback => callback(event));
    }
    linkleave(event) {
        this.cursormouseLookAt = null;
        this.events.linkleave.forEach(callback => callback(event));
    }
    updateMousePosition(event) {
        if (event.touches) {
            this.position = {
                x: ((event.touches[0].clientX / window.innerWidth) * 2) - 1,
                y: ((event.touches[0].clientY / window.innerHeight) * 2) - 1
            }
            this.positionReal = {
                x: event.touches[0].clientX,
                y: event.touches[0].clientY
            }
        } else {
            this.position = {
                x: ((event.clientX / window.innerWidth) * 2) - 1,
                y: ((event.clientY / window.innerHeight) * 2) - 1
            }
            this.positionReal = {
                x: event.clientX,
                y: event.clientY
            }
        }
    }
    animate(time) {
        if (window.isMobile) return;
        if (this.cursormouseLookAt != null) {
            if (this.cursormouseLookAt.classList.contains("circle_container")) {
                this.cursormouseR = lerp(this.cursormouseR, this.cursormouseLookAt.getBoundingClientRect().width / 2 * 1.05, 0.2);
                this.dom.cursorCircle.setAttribute("stroke-width", 2);
                this.dom.textCursor.textContent = `${Math.round(this.positionReal.x)} x ${Math.round(this.positionReal.y)}`;
            } else {
                this.dom.cursorCircle.setAttribute("stroke-width", 1);
                this.cursormouseR = lerp(this.cursormouseR, this.cursormouseLookAt.getBoundingClientRect().width / 2 + 6, 0.2);
            }
            this.dom.textCursor.textContent = ``;
            this.cursormousePosition.x = lerp(this.cursormousePosition.x, this.cursormouseLookAt.getBoundingClientRect().left + this.cursormouseLookAt.getBoundingClientRect().width / 2, 0.2);
            this.cursormousePosition.y = lerp(this.cursormousePosition.y, this.cursormouseLookAt.getBoundingClientRect().top + 1 + this.cursormouseLookAt.getBoundingClientRect().height / 2, 0.2);
            this.cursormouseDx = lerp(this.cursormouseDx, 0, 0.2);
        } else {
            this.dom.cursorCircle.setAttribute("stroke-width", 1);
            this.cursormouseHeight = lerp(this.cursormouseHeight, 32, 0.2);
            this.cursormouseWidth = lerp(this.cursormouseWidth, 32, 0.2);
            this.dom.cursorText.setAttribute("fill", "#8f8da9");
            this.cursormousePosition.x = lerp(this.cursormousePosition.x, this.positionReal.x, 0.15);
            this.cursormousePosition.y = lerp(this.cursormousePosition.y, this.positionReal.y, 0.15);
            this.dom.textCursor.textContent = `${Math.round(this.positionReal.x)} x ${Math.round(this.positionReal.y)}`;
            this.cursormouseDx = lerp(this.cursormouseDx, 50, 0.2);
            this.cursormouseR = lerp(this.cursormouseR, 16, 0.2);
        }
        this.dom.cursorCircle.setAttribute("r", this.cursormouseR);
        this.dom.cursorText.setAttribute("dx", this.cursormouseDx);
        this.dom.cursorpoint.style.transform = `translate(${this.positionReal.x}px, ${this.positionReal.y}px)`;
        this.dom.cursor.style.transform = `translate(${this.cursormousePosition.x}px, ${this.cursormousePosition.y}px)`;
    }
}

export { MouseManager };