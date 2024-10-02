import * as THREE from 'three';
import { State } from './State.js';
import { createNoise2D } from 'simplex-noise';
import { lerp } from '../utils/lerp.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { gsap } from 'gsap';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
class BlogState extends State {
    constructor(theater) {
        super();
        this.theater = theater;
        this.gltf = null;
        this.texts = [];
        this.text = "Abc";
        this.textOffsets = [
            20,
            130,
            100,
            100,
        ];
        this.offsetX = 0;
        this.baseOffsetY = window.isMobile ? 550 : 200;
        this.baseOffsetX = window.isMobile ? 150 : 0;
        
        this.group = new THREE.Group();
        this.rotationZ = 0;
        this.rotationX = 0;
        this.initiated = false;
        this.gltfScale = window.isMobile ? 0.5 : 1;
        this.gltfY = window.isMobile ? 0 : 0;
        this.rotationPenX = 0;
        this.rotationPenY = 0;
    }
    enter() {
        this.material = new THREE.MeshPhongMaterial(this.theater.materialParams);
        const loader = new FontLoader();

        loader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
            this.text.split('').forEach((letter, index) => {
                const geometry = new TextGeometry(letter, {
                    font: font,
                    size: 120,
                    depth: 5,
                    curveSegments: 12,
                    bevelEnabled: true,
                    bevelThickness: 10,
                    bevelSize: 4,
                    bevelOffset: 0,
                    bevelSegments: 5
                });
                let text = new THREE.Mesh(geometry, this.material);
                if (this.texts.length != 0) {
                    this.offsetX += this.textOffsets[index];
                }
                text.position.x = -200 + this.baseOffsetX + this.offsetX;
                text.position.y = this.baseOffsetY;
                this.texts.push(text);
                this.group.add(text);
                if(window.isMobile) this.group.scale.set(0.4, 0.4, 0.4);
                gsap.fromTo(text.rotation, {
                    x: Math.PI / 2,
                }, {
                    x: -0.2,
                    duration: 2,
                    delay: index * .2 + .1,
                    ease: "back.out(8)",
                });
                gsap.fromTo(text.position, {
                    z: -800,
                }, {
                    z: window.isMobile ? 100 : 0,
                    duration: 4,
                    delay: index * .4,
                    ease: "power3.out",
                });
                const tl = gsap.timeline();
                tl.add("anim_start", "+=0")

                tl.fromTo(text.position, {
                    y: "-=30"
                }, {
                    y: "+=30",
                    repeat: -1,
                    yoyo: true,
                    delay: index * .2,
                    duration: 2,
                    ease: "power2.inOut"
                }, "anim_start");
            });
        });
        this.theater.scene.add(this.group);

        const loaderGltf = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderConfig({ type: 'js' });
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
        loaderGltf.setDRACOLoader( dracoLoader );
        loaderGltf.load("/models/blog.glb", (gltf) => {
            gltf.scenes[0].children[0].material = this.material;
            gltf.scenes[0].children[1].material = this.material;
            
            this.gltf = gltf.scenes[0]
            this.gltf.scale.set(this.gltfScale, this.gltfScale, this.gltfScale);
            this.gltf.position.y = this.gltfY;
            if(window.isMobile) {
                this.gltf.position.x = 100;
            } else {
                this.gltf.position.x = 300;
            } 
            gsap.fromTo(this.gltf.position, {
                z: -800,
            },{
                z: 0,
                duration: 5,
                ease: "power3.out",
            });
            this.theater.scene.add(this.gltf);
        });

        const cubegeometry = new THREE.BoxGeometry(120, 120, 120);
        this.cube = new THREE.Mesh(cubegeometry, this.material);
        this.cube.position.x = -450;
        this.cube.position.z = 0;
        this.cube.position.y = -200;
        this.cube.animationFinished = false;
        this.theater.scene.add(this.cube);
        gsap.fromTo(this.cube.position, {
            z: -400,
        }, {
            z: 0,
            duration: 5,
            delay: 1.5,
            ease: "back.out(2)"
        });

        const thorusgeometry = new THREE.TorusGeometry(120, 40, 48);
        this.thorus = new THREE.Mesh(thorusgeometry, this.material);
        this.thorus.position.x = 400;
        this.thorus.position.z = 0;
        this.thorus.position.y = -800;
        this.thorus.animationFinished = false;
        this.theater.scene.add(this.thorus);
        gsap.fromTo(this.cube.position, {
            z: -400,
        }, {
            z: 0,
            duration: 5,
            delay: 1.5,
            ease: "back.out(2)"
        });
    }
    animate(time) {
         if (this.texts.length == 0) return;
        this.rotationZ = this.theater.mouseManager.position.x * Math.PI / 4;
        this.group.rotation.y = lerp(this.group.rotation.y, this.rotationZ, 0.01);
        this.rotationX = -this.theater.mouseManager.position.y * Math.PI / 8;
        this.group.rotation.x = lerp(this.group.rotation.x, this.rotationX, 0.01);
        if(this.gltf){
            this.gltf.rotation.x = lerp(this.gltf.rotation.x, this.rotationPenX + this.rotationX, 0.01);
            this.gltf.rotation.y = lerp(this.gltf.rotation.y, this.rotationPenY + -Math.PI / 4 + this.rotationZ, 0.01);
            this.gltf.children[1].rotation.y = (Math.sin(time * 50 / 2) * Math.PI / 50) - Math.PI / 4;
            this.gltf.children[1].rotation.x = (Math.sin(time * 40 / 2) * Math.PI / 50);
        }
        this.cube.rotation.x += 0.002 + 0.001 * window.theater.settings.timeScaleRatio * 100;
        this.cube.rotation.z -= 0.003 + 0.001 * window.theater.settings.timeScaleRatio * 100;
        this.thorus.rotation.x += 0.002 + 0.001 * window.theater.settings.timeScaleRatio * 100;
        this.thorus.rotation.z -= 0.003 + 0.001 * window.theater.settings.timeScaleRatio * 100;
        const scrollTop = document.documentElement.scrollTop;
        if (window.location.pathname.length > 6) {
            this.group.position.y = lerp(this.group.position.y, 300, 0.015);
            if(this.gltf) this.gltf.position.y = lerp(this.gltf.position.y, this.gltfY + 100 + scrollTop * 0.3, 0.015);
        } else {
            this.group.position.y = lerp(this.group.position.y, 0, 0.015);
            if(this.gltf) this.gltf.position.y = lerp(this.gltf.position.y,  this.gltfY + scrollTop * 0.3, 0.015);
        }
        this.cube.position.y = lerp(this.cube.position.y, -400 + scrollTop * 0.3, 0.01);
        this.thorus.position.y = lerp(this.thorus.position.y, -800 + scrollTop * 0.2, 0.01);
    }
    leave() {
        this.theater.scene.remove(this.group);
        this.theater.scene.remove(this.cube);
        this.theater.scene.remove(this.thorus);
        this.theater.scene.remove(this.gltf);
        this.texts.forEach(text => {
            text.geometry.dispose();
            text.material.dispose();
        });
        this.texts = [];
        this.group = new THREE.Group();
        this.offsetX = 0;
    }
}

export { BlogState };