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
import { MouseManager } from './MouseManager.js';
import Stats from 'stats.js'
class Theater {

    constructor() {
        window.theater = this;
        if(document.querySelector('canvas')) {
            document.querySelectorAll("canvas").forEach(el => el.remove());
        }
        document.querySelector('.appLayout').style.cursor = `none`;
        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 3000);;
        this.controls = null;
        this.scene = new THREE.Scene();
        this.clock = new THREE.Clock();
        this.mouseManager = new MouseManager(this);
        this.stateManager = new StateManager(this);
        this.time = 0;
        this.debug = false;
        this.debugFps = false;
        this.asciiShader = asciiShader;
        if(this.debugFps) {
            this.stats = new Stats()
            this.stats.showPanel(0)
            document.body.appendChild(this.stats.dom)
        }
        this.materialParams = {
            flatShading: true,
            color: 0x7800ff,
            shininess: 7,
            specular: 0xff3c
        };
        this.settings = {
            debug: this.debug,
            orbitControls: this.debug,
            timeScale: 0.3,
            vertexScale: 0.0075,
            noiseScale: 50,
            savedY: 100,
            timeScaleRatioBase: 0.01,
            timeScaleRatio: 0,
            timeScaleRatioOpening: 0,
        };

        this.camera.position.y = 135;
        this.camera.position.z = 500;
        this.camera.zoom = 0.85;

        if(!this.debug) this.scene.fog = new THREE.Fog(0x000000, 0, 800);
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
        this.asciiShader.uniforms.ratioiResolution.value = window.isMobile ? 2.0 : 1.0;
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
        this.mouseManager = new MouseManager();
        if(window.isMobile) return;
        this.mouseManager.addEvent("mousedown", (event) => {
            this.settings.timeScaleRatio = 0.1;
        }, false);
        this.mouseManager.addEvent("mouseup", (event) => {
            this.settings.timeScaleRatio = 0;
        }, false);
        this.mouseManager.addEvent("mouseenter", (event) => {
            this.settings.timeScaleRatio = 0;
        });
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
        if(this.debugFps) {
            this.stats.begin()
        }
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
        if(this.settings.timeScaleRatioOpening > 0) {
            this.settings.timeScaleRatioOpening -= 0.0003;
        }
        if(this.settings.timeScaleRatioOpening < 0) {
            this.settings.timeScaleRatioOpening = 0;
        }
        this.mouseManager.animate(this.time);
        if(this.debugFps) {
            this.stats.end()
        }
    }
}

export { Theater };