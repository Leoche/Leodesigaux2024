import * as THREE from 'three';
import { State } from './State.js';
import { createNoise2D } from 'simplex-noise';
import { lerp } from '../utils/lerp.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { gsap } from 'gsap';
class BlogState extends State {
    constructor(theater) {
        super();
        this.theater = theater;
        this.sphere = null;
        this.texts = [];
        this.text = "Abc";
        this.textOffsets = [
            20,
            110,
            35,
            100,
        ];
        this.offsetX = 0;
        this.baseOffsetX = -100;
        this.baseOffsetY = 200;
        this.group = new THREE.Group();
        this.rotationZ = 0;
        this.rotationX = 0;
        this.initiated = false;
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
                    z: 0,
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

        const geometry = new THREE.SphereGeometry(120, 32, 16);
        this.sphere = new THREE.Mesh(geometry, this.material);
        this.sphere.position.x = 500;
        this.sphere.position.z = 0;
        this.sphere.position.y = -300;
        this.sphere.animationFinished = false;
        this.theater.scene.add(this.sphere);
        gsap.fromTo(this.sphere.position, {
            z: -400,
        }, {
            z: 0,
            duration: 5,
            delay: 1,
            ease: "back.out(2)"
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
        this.sphere.rotation.x += 0.003 + 0.001 * window.theater.settings.timeScaleRatio * 100;
        this.sphere.rotation.z += 0.002 + 0.001 * window.theater.settings.timeScaleRatio * 100;
        this.cube.rotation.x += 0.002 + 0.001 * window.theater.settings.timeScaleRatio * 100;
        this.cube.rotation.z -= 0.003 + 0.001 * window.theater.settings.timeScaleRatio * 100;
        this.thorus.rotation.x += 0.002 + 0.001 * window.theater.settings.timeScaleRatio * 100;
        this.thorus.rotation.z -= 0.003 + 0.001 * window.theater.settings.timeScaleRatio * 100;
        if (window.location.pathname.length > 6) {
            this.group.position.y = lerp(this.group.position.y, 300, 0.015);
        } else {
            this.group.position.y = lerp(this.group.position.y, 0, 0.015);
        }
        const scrollTop = document.documentElement.scrollTop;
        this.sphere.position.y = lerp(this.sphere.position.y, scrollTop * 0.2, 0.05);
        this.cube.position.y = lerp(this.cube.position.y, -400 + scrollTop * 0.3, 0.01);
        this.thorus.position.y = lerp(this.thorus.position.y, -800 + scrollTop * 0.2, 0.01);
    }
    leave() {
        this.theater.scene.remove(this.group);
        this.theater.scene.remove(this.cube);
        this.theater.scene.remove(this.thorus);
        this.theater.scene.remove(this.sphere);
        this.texts.forEach(text => {
            text.geometry.dispose();
            text.material.dispose();
        });
        this.texts = [];
        this.text = "Blog";
        this.group = new THREE.Group();
        this.offsetX = 0;
    }
}

export { BlogState };