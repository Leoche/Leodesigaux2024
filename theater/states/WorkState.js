import * as THREE from 'three';
import { State } from './State.js';
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
        this.maxBlobs = 24;
    }
    enter() {
        this.material = new THREE.MeshPhongMaterial({
            flatShading: false,
            color: 0x7800ff,
            shininess: 7,
            specular: 0xff3c
        });
        this.effect = new MarchingCubes(32, this.material, false, false);
        this.effect.position.set( 0, 0, -600 );
        this.effect.scale.set( 1000, 1000, 100 );
        this.effect.enableUvs = false;
        this.effect.enableColors = false;
        this.theater.scene.add( this.effect );
        gsap.fromTo(this.effect.position, {
            z: -600,
        }, {
            z: -60,
            duration: 5,
            delay: 1,
            ease: "back.out(2)"
        });
    }
    animate(time) {
        this.updateCubes( this.effect, time, this.maxBlobs )
        const scrollTop = document.documentElement.scrollTop;
        //this.effect.position.y = lerp(this.effect.position.y, scrollTop * 0.5, 0.05);
        this.rotationZ = this.theater.mouseManager.position.x * Math.PI / 16;
        this.effect.rotation.z = lerp(this.effect.rotation.z, this.rotationZ, 0.1);
    }
    leave() {
        this.theater.scene.remove(this.effect);
        this.offsetX = 0;
    }
    updateCubes( object, time, numblobs) {
        object.reset();
        const subtract = 12;
        const strength = 1.2 / ( ( Math.sqrt( numblobs ) - 1 ) / 4 + 1 );
        const scrollTop = document.documentElement.scrollTop;

        for ( let i = 0; i < numblobs; i ++ ) {
            const ballx = Math.sin( i + 1.26 * (time * 0.25) * ( 1.03 + 0.5 * Math.cos( 0.21 * i ) ) ) * 0.27 + 0.5;
            const bally =  - 0.2 + (scrollTop * 0.0001) + Math.abs( Math.cos( i + 1.12 * (time * 0.5) * Math.cos( 1.22 + 0.1424 * i ) ) ) * 0.77; // dip into the floor
            const ballz = Math.cos( i + 1.32 * (time * 0.25) * 0.1 * Math.sin( ( 0.92 + 0.53 * i ) ) ) * 0.27 + 0.5;

            object.addBall( ballx, bally, ballz, strength, subtract );

        }

        object.update();

    }
}

export { WorkState };