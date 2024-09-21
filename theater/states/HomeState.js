import * as THREE from 'three';
import { State } from './State.js';
import { createNoise2D } from 'simplex-noise';
import { lerp } from '../utils/lerp.js';
class HomeState extends State {
    constructor(theater) {
        super();
        this.geometry = null;
        this.plane = null;
        this.theater = theater;
        this.noise2D = createNoise2D();
        this.rotationZ = 0;
        this.title = document.querySelector('.lettering_job');
        this.titleY = 0;
        this.planeY = 0;
    }
    enter() {
        const meshDetails = 2
        this.geometry = new THREE.PlaneGeometry(1600, 1600, 200 * meshDetails, 200 * meshDetails);
        this.geometry.rotateX(0.001);
        this.material = new THREE.MeshPhongMaterial(this.theater.materialParams);
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.plane.rotation.x = - Math.PI / 2;
        this.theater.scene.add(this.plane);
    }
    animate(time) {
        if(this.geometry == null) return; 
        const positions = this.geometry.attributes.position;
        for (let i = 0; i < positions.count; i++) {
            const vertex = new THREE.Vector3();
            vertex.fromBufferAttribute(positions, i);
            let noiseScale = this.theater.settings.noiseScale * 0.75 + this.theater.settings.noiseScale * this.theater.settings.timeScaleRatioBase * 10;
            const smallNoiseValue = this.noise2D(vertex.x * this.theater.settings.vertexScale * 0.75 + time * this.theater.settings.timeScale * 1.2, vertex.y * this.theater.settings.vertexScale * 0.75 - time * this.theater.settings.timeScale * 1.2, time * this.theater.settings.timeScale) * noiseScale / 2;
            const bigNoiseValue = this.noise2D(vertex.x * this.theater.settings.vertexScale / 4 - time * this.theater.settings.timeScale, vertex.y * this.theater.settings.vertexScale / 4 + time * this.theater.settings.timeScale, time * this.theater.settings.timeScale) * noiseScale * 2;
            const combinedNoiseValue = bigNoiseValue * 0.5 + smallNoiseValue * 0.3;
            positions.setXYZ(i, vertex.x, vertex.y, combinedNoiseValue);
        }
        positions.needsUpdate = true;
        this.rotationZ = this.theater.mouseManager.position.x * Math.PI / 4;
        this.plane.rotation.z = lerp(this.plane.rotation.z, this.rotationZ, 0.02);
        const scrollTop = document.documentElement.scrollTop;
        this.titleY = lerp(this.titleY, scrollTop * -0.4, 0.05);
        this.planeY = lerp(this.planeY, scrollTop * 0.05, 0.05);
        this.title.style.transform = "translateY(" + (this.titleY) + "px)";
        this.plane.position.y = this.planeY;
    }
    leave() {
        this.theater.scene.remove(this.plane);
        this.geometry.dispose();
        this.material.dispose();
    }
}

export { HomeState };