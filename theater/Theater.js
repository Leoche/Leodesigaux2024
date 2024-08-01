import * as THREE from 'three';
import { AsciiEffect } from './postprocessing/AsciiEffect.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

import { lerp } from './utils/lerp.js';
import { asciiShader } from './utils/asciiShader.js';

import { StateManager } from './states/StateManager.js';
import { gsap } from 'gsap';

class Theater {

    constructor() {
        window.theater = this;
        document.querySelector('.appLayout').style.cursor = `none`;
        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 3000);;
        this.controls = null;
        this.scene = new THREE.Scene();
        this.clock = new THREE.Clock();
        this.stateManager = new StateManager(this);
        this.time = 0;
        this.asciiShader = asciiShader;
        this.materialParams = {
            flatShading: true,
            color: 0x7800ff,
            shininess: 7,
            specular: 0xff3c
        };
        this.settings = {
            debug: false,
            orbitControls: false,
            timeScale: 0.3,
            vertexScale: 0.0075,
            noiseScale: 50,
            savedY: 100,
            timeScaleRatioBase: 0.01,
            timeScaleRatio: 0.01,
            timeScaleRatioOpening: 0,
        };
        this.mouseposition = {
            x: 0,
            y: 0
        }
        this.mousepositionReal = {
            x: window.innerWidth/2,
            y: window.innerHeight/2
        }
        this.cursormouseposition = {
            x: 0,
            y: 0
        }
        this.cursormousepointposition = {
            x: 0,
            y: 0
        }
        this.cursormouseLookAt = null;
        this.cursormouseWidth = 32;
        this.cursormouseHeight = 32;
        this.cursormouseDx = 50
        this.cursormouseR = 16

        this.camera.position.y = 135;
        this.camera.position.z = 500;
        this.camera.zoom = 0.85;

        this.scene.fog = new THREE.Fog(0x000000, 0, 800);
        this.scene.background = 0xff0000;

        this.createLights();
        this.stateManager.init();

        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);


        this.effect = new AsciiEffect(this.renderer, ' .,:;i1tfLCG08@', {
            invert: true,
            resolution: 0.125
        });
        this.effect.setSize(window.innerWidth, window.innerHeight);
        this.effect.domElement.style.color = '#999999';
        this.effect.domElement.style.backgroundColor = 'black';

        document.querySelector('#background').appendChild(this.effect.domElement);
        window.addEventListener('resize', () => this.onWindowResize());

        this.renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
            format: THREE.RGBAFormat,  // Ensure RGBA format to include alpha channel
            type: THREE.UnsignedByteType,
            stencilBuffer: false
        });
        this.composer = new EffectComposer(this.renderer, this.renderTarget);
        this.renderPass = new RenderPass(this.scene, this.camera);
        this.composer.addPass(this.renderPass);
        this.asciiPass = new ShaderPass(this.asciiShader);
        this.composer.addPass(this.asciiPass);
        this.setupMouse();
        this.updateRenderer();
        this.setupOrbit();

        this.animate();
    }
    switch(state) {
        this.stateManager.switch(state);
    }
    createLights() {
        this.pointLight1 = new THREE.PointLight(0x9bafff, 50, 0, 0);
        this.pointLight1.position.set(0, 100, -600);
        this.scene.add(this.pointLight1);

        this.pointLight2 = new THREE.PointLight(0xf9fff2, 10, 0, 0);
        this.pointLight2.position.set(600, 100, 0);
        this.scene.add(this.pointLight2);

        this.pointLight3 = new THREE.PointLight(0xfff2fa, 50, 0, 0);
        this.scene.add(this.pointLight3);
    }

    setupOrbit() {
        if (this.settings.orbitControls) {
            if (this.settings.debug) {
                this.controls = new OrbitControls(this.camera, this.renderer.domElement);
            } else {
                this.controls = new OrbitControls(this.camera, this.effect.domElement);
            }
        }

    }

    setupMouse() {
        window.addEventListener("mousemove", (event) => {
            this.mouseposition = {
                x: ((event.clientX / window.innerWidth) * 2) - 1,
                y: ((event.clientY / window.innerHeight) * 2) - 1
            }
            this.mousepositionReal = {
                x: event.clientX,
                y: event.clientY
            }
        }, false);
        window.addEventListener("mousedown", (event) => {
            this.settings.timeScaleRatio = 0.1;
        }, false);
        window.addEventListener("mouseup", (event) => {
            this.settings.timeScaleRatio = 0;
        }, false);
        const linkItems = document.querySelectorAll(".cursor-link");
        linkItems.forEach(item => {
            item.addEventListener("mouseenter", (event) => { this.onMouseEnter(event); });
            item.addEventListener("mouseleave", (event) => { this.onMouseLeave(event); });
        });
        window.addEventListener("mouseenter", (event) => {
            this.settings.timeScaleRatio = 0.1;
        }, false);
    }
    onMouseEnter(event) {
        this.cursormouseLookAt = event.target;
    }
    onMouseLeave(event) {
        this.cursormouseLookAt = null;
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.effect.setSize(window.innerWidth, window.innerHeight);
        this.composer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.asciiShader.uniforms.iResolution.value.set(window.innerWidth, window.innerHeight, 1);
        this.renderTarget.setSize(window.innerWidth, window.innerHeight);
        this.composer.removePass(this.composer.passes[1]);
        this.asciiPass = new ShaderPass(this.asciiShader);
        this.composer.addPass(this.asciiPass);
    }

    updateRenderer() {
        if (this.settings.debug) {
            document.querySelector('#background').removeChild(this.effect.domElement);
            document.querySelector('#background').appendChild(this.renderer.domElement);
        } else {
            document.querySelector('#background').removeChild(this.renderer.domElement);
            document.querySelector('#background').appendChild(this.effect.domElement);
        }
        this.onWindowResize();
    }
    animate() {
        requestAnimationFrame(() => this.animate());
        this.settings.timeScaleRatioBase = lerp(this.settings.timeScaleRatioBase, this.settings.timeScaleRatioOpening + this.settings.timeScaleRatio / 2, 0.1);
        this.time += this.clock.getDelta() * this.settings.timeScale + this.settings.timeScaleRatioBase;
        this.camera.lookAt(new THREE.Vector3(0, this.settings.savedY / 1.5, 0));
        if (this.settings.debug) {
            this.renderer.render(this.scene, this.camera);
        } else {
            this.composer.render();
        }
        this.stateManager.render(this.time);
        this.updateCursor();
        if(this.settings.timeScaleRatioOpening > 0) {
            this.settings.timeScaleRatioOpening -= 0.0003;
        }
        if(this.settings.timeScaleRatioOpening < 0) {
            this.settings.timeScaleRatioOpening = 0;
        }
    }
    updateCursor (){
        if(this.cursormouseLookAt != null){
            this.cursormouseHeight = lerp(this.cursormouseHeight, 0, 0.4);
            this.cursormouseWidth = lerp(this.cursormouseWidth, this.cursormouseLookAt.getBoundingClientRect().width, 0.2);
            this.cursormouseposition.x = lerp(this.cursormouseposition.x, this.cursormouseLookAt.getBoundingClientRect().left + this.cursormouseLookAt.getBoundingClientRect().width/2, 0.2);
            this.cursormouseposition.y = lerp(this.cursormouseposition.y, this.cursormouseLookAt.getBoundingClientRect().top + 2 + this.cursormouseLookAt.getBoundingClientRect().height/2, 0.2);
            document.querySelector('#textCursor').textContent  = ``;
            document.querySelector('.cursor text').setAttribute("fill", "white");
            this.cursormouseDx = lerp(this.cursormouseDx, 0, 0.2);
            this.cursormouseR = lerp(this.cursormouseR, this.cursormouseLookAt.getBoundingClientRect().width/2 + 6 , 0.2);
        } else {
            this.cursormouseHeight = lerp(this.cursormouseHeight, 32, 0.2);
            this.cursormouseWidth = lerp(this.cursormouseWidth, 32, 0.2);
            document.querySelector('.cursor text').setAttribute("fill", "#8f8da9");
            this.cursormouseposition.x = lerp(this.cursormouseposition.x, this.mousepositionReal.x, 0.15);
            this.cursormouseposition.y = lerp(this.cursormouseposition.y, this.mousepositionReal.y, 0.15);
            document.querySelector('#textCursor').textContent  = `${Math.round(this.mousepositionReal.x)} x ${Math.round(this.mousepositionReal.y)}`;
            this.cursormouseDx = lerp(this.cursormouseDx, 50, 0.2);
            this.cursormouseR = lerp(this.cursormouseR, 16, 0.2);
        }
        document.querySelector('.cursor circle').setAttribute("r", this.cursormouseR);
        document.querySelector('.cursor text').setAttribute("dx", this.cursormouseDx);
        document.querySelector('.cursorpoint').style.transform = `translate(${this.mousepositionReal.x}px, ${this.mousepositionReal.y}px)`;
        document.querySelector('.cursor').style.transform = `translate(${this.cursormouseposition.x}px, ${this.cursormouseposition.y}px)`;
    }
}

export { Theater };