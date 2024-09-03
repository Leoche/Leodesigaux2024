import * as THREE from 'three';
import { State } from './State.js';
import { createNoise2D } from 'simplex-noise';
import { lerp } from '../utils/lerp.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { MarchingCubes } from 'three/addons/objects/MarchingCubes.js';
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
            105,
            60,
            90,
        ];
        this.offsetX = 0;
        this.baseOffsetX = -70;
        this.baseOffsetY = 175;
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

        let resolution = 48;
        this.effect = new MarchingCubes( resolution, this.material, false, false, 100000 );
        this.effect.position.set( 0, 0, -250 );
        this.effect.scale.set( 1200, 1200, 100 );
        this.effect.enableUvs = false;
        this.effect.enableColors = false;
        this.theater.scene.add( this.effect );
        gsap.fromTo(this.effect.position, {
            z: -600,
        }, {
            z: -260,
            duration: 5,
            delay: 2,
            ease: "back.out(2)"
        });
    }
    animate(time) {
        if(this.texts.length == 0) return;
        this.rotationZ = this.theater.mouseposition.x * Math.PI / 4;
        this.group.rotation.y = lerp(this.group.rotation.y, this.rotationZ, 0.01);
        this.rotationX = -this.theater.mouseposition.y * Math.PI / 8;
        this.group.rotation.x = lerp(this.group.rotation.x, this.rotationX, 0.01);
        this.updateCubes( this.effect, time, 48 )
    }
    leave() {
        this.theater.scene.remove(this.group);
        this.theater.scene.remove(this.effect);
        this.texts.forEach(text => {
            text.geometry.dispose();
            text.material.dispose();
        });
        this.texts = [];
        this.text = "Works";
        this.group = new THREE.Group();
        this.offsetX = 0;
    }
    updateCubes( object, time, numblobs) {

        object.reset();
        const subtract = 12;
        const strength = 1.2 / ( ( Math.sqrt( numblobs ) - 1 ) / 4 + 1 );

        for ( let i = 0; i < numblobs; i ++ ) {
            const ballx = Math.sin( i + 1.26 * (time * 0.25) * ( 1.03 + 0.5 * Math.cos( 0.21 * i ) ) ) * 0.27 + 0.5;
            const bally = Math.abs( Math.cos( i + 1.12 * (time * 0.5) * Math.cos( 1.22 + 0.1424 * i ) ) ) * 0.77; // dip into the floor
            const ballz = Math.cos( i + 1.32 * (time * 0.25) * 0.1 * Math.sin( ( 0.92 + 0.53 * i ) ) ) * 0.27 + 0.5;

            object.addBall( ballx, bally, ballz, strength, subtract );

        }

        object.update();

    }
}

export { WorkState };