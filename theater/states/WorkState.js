import * as THREE from 'three';
import { State } from './State.js';
import { createNoise2D } from 'simplex-noise';
import { lerp } from '../utils/lerp.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { gsap } from 'gsap';
class WorkState extends State {
    constructor(theater) {
        super();
        this.theater = theater;
        this.sphere = null;
        this.texts = [];
        this.text = "Works";
        this.textOffsets = [
            0,
            160,
            115,
            80,
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

        loader.load( 'fonts/helvetiker_regular.typeface.json', ( font ) => {
            this.text.split('').forEach((letter, index) => {
                const geometry = new TextGeometry( letter, {
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
                let text = new THREE.Mesh( geometry, this.material );
                if(this.texts.length != 0){
                    this.offsetX += this.textOffsets[index];
                }
                text.position.x = -200 + this.baseOffsetX + this.offsetX;
                text.position.y = this.baseOffsetY;
                this.texts.push(text);
                this.group.add(text);
                gsap.fromTo(text.rotation, {
                    x: Math.PI / 2,
                },{
                    x: -0.2,
                    duration: 2,
                    delay: index * .2 + .1,
                    ease: "back.out(8)",
                });
                gsap.fromTo(text.position, {
                    z: -800,
                },{
                    z: 0,
                    duration: 4,
                    delay: index * .4,
                    ease: "power3.out",
                });
                const tl = gsap.timeline();
                tl.add("anim_start", "+=0")
                
                tl.fromTo(text.position,{
                    y: "-=30" 
                },{
                    y: "+=30",
                    repeat: -1,
                    yoyo: true,
                    delay: index * .2,
                    duration: 2,
                    ease: "power2.inOut"
                }, "anim_start");
            });
        } );
        this.theater.scene.add(this.group);

        const geometry = new THREE.SphereGeometry( 120, 32, 16 );
        this.sphere = new THREE.Mesh( geometry, this.material );
        this.sphere.position.x = 350;
        this.sphere.position.z = 0;
        this.sphere.position.y = -200;
        this.sphere.animationFinished = false;
        this.theater.scene.add(this.sphere);
        gsap.fromTo(this.sphere.position, {
            y: -400,
            z: -400,
        },{
            y: -100,
            z: 0,
            duration: 5,
            delay: 1,
            ease: "back.out(2)"
        });
    }
    animate(time) {
        if(this.texts.length == 0) return;
        this.rotationZ = this.theater.mouseposition.x * Math.PI / 4;
        this.group.rotation.y = lerp(this.group.rotation.y, this.rotationZ, 0.01);
        this.rotationX = -this.theater.mouseposition.y * Math.PI / 8;
        this.group.rotation.x = lerp(this.group.rotation.x, this.rotationX, 0.01);
        this.sphere.rotation.x = Date.now() * 0.0003;
        this.sphere.rotation.z = Date.now() * 0.0002;

    }
    leave() {
        this.theater.scene.remove(this.group);
        this.theater.scene.remove(this.sphere);
        this.texts.forEach(text => {
            text.geometry.dispose();
            text.material.dispose();
        });
        this.texts = [];
        this.text = "Works";
        this.group = new THREE.Group();
        this.offsetX = 0;
    }
}

export { WorkState };