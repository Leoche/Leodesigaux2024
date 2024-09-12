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

        this.dom = {
            cursor: document.querySelector('.cursor'),
            cursorCircle: document.querySelector('.cursor circle'),
            cursorText: document.querySelector('.cursor text'),
            textCursor: document.querySelector('#textCursor'),
            textCircle: document.querySelector('#textCircle'),
            cursorpoint: document.querySelector('.cursorpoint'),
        }
        window.addEventListener("mousemove", this.mousemove.bind(this), false);
        window.addEventListener("mousedown", this.mousedown.bind(this), false);
        window.addEventListener("mouseup", this.mouseup.bind(this), false);
        window.addEventListener("mouseenter", this.mouseenter.bind(this), false);
        const linkItems = document.querySelectorAll(".cursor-link");
        linkItems.forEach(item => {
            item.addEventListener("mouseenter", (event) => { this.linkenter(event); });
            item.addEventListener("mouseleave", (event) => { this.linkleave(event); });
        });
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
        this.cursormouseLookAt = event.target;
        this.events.linkenter.forEach(callback => callback(event));
    }
    linkleave(event) {
        this.cursormouseLookAt = null;
        this.events.linkleave.forEach(callback => callback(event));
    }
    updateMousePosition(event) {
        this.position = {
            x: ((this.position.x / window.innerWidth) * 2) - 1,
            y: ((this.position.y / window.innerHeight) * 2) - 1
        }
        this.positionReal = {
            x: event.clientX,
            y: event.clientY
        }
    }
    animate(time) {
        if (this.cursormouseLookAt != null) {
            if (this.cursormouseLookAt.classList.contains("circle_container")) {
                this.cursormouseR = lerp(this.cursormouseR, this.cursormouseLookAt.getBoundingClientRect().width / 2 * 1.25, 0.2);
                this.dom.textCursor.textContent = `${Math.round(this.positionReal.x)} x ${Math.round(this.positionReal.y)}`;
            } else {
                this.cursormouseR = lerp(this.cursormouseR, this.cursormouseLookAt.getBoundingClientRect().width / 2 + 6, 0.2);
            }
            this.dom.textCursor.textContent = ``;
            this.cursormousePosition.x = lerp(this.cursormousePosition.x, this.cursormouseLookAt.getBoundingClientRect().left + this.cursormouseLookAt.getBoundingClientRect().width / 2, 0.2);
            this.cursormousePosition.y = lerp(this.cursormousePosition.y, this.cursormouseLookAt.getBoundingClientRect().top + 1 + this.cursormouseLookAt.getBoundingClientRect().height / 2, 0.2);
            this.cursormouseDx = lerp(this.cursormouseDx, 0, 0.2);
        } else {
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