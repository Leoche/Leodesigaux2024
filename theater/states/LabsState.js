import * as THREE from 'three';
import { State } from './State.js';
import { lerp } from '../utils/lerp.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { MarchingCubes } from 'three/addons/objects/MarchingCubes.js';
import { gsap } from 'gsap';
class LabsState extends State {
    constructor(theater) {
        super();
        this.theater = theater;
        this.group = null;
        this.maxBlobs = 50;
    }
    enter() {
        this.maxBlobs = window.isMobile ? 15 : 75;
        this.group = new THREE.Group();
        this.material = new THREE.MeshPhongMaterial(this.theater.materialParams);
        // add random spheres and adds to the group
        for (let i = 0; i < this.maxBlobs; i++) {
            this.group.add(this.getRandomShape());
        }
        this.theater.scene.add(this.group);
        gsap.from(this.group.position, {
            duration: 2,
            delay: 0.5,
            z: -600,
        });
    }
    getRandomShape() {
        const shapes = [
            this.createSphere.bind(this),
            this.createBox.bind(this),
            this.createCylinder.bind(this),
            this.createTorus.bind(this),
            this.createCone.bind(this)
        ];

        // Randomly select a shape from the list
        const randomShapeIndex = Math.floor(Math.random() * shapes.length);
        return shapes[randomShapeIndex]();
    }
    createSphere() {
        const sphere = new THREE.Mesh(new THREE.SphereGeometry(Math.random() * 100 + 10, 8, 8), this.material);
        const ratioZ = 500;
        const ratioX = 200;
        sphere.position.x = window.isMobile ? Math.random() * 400 - 200 : Math.random() * 3000 - 800;
        sphere.position.y = window.isMobile ? Math.random() * 600 - 300 : (Math.random() * ratioX + 100) * 2 + 20;
        sphere.position.z = Math.random() * ratioZ - ratioZ / 2;
        sphere.newz = Math.random() * ratioZ - ratioZ;
        sphere.position.y = (Math.random() > 0.5) ? sphere.position.y : -sphere.position.y;
        sphere.rotationAdds = new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
        sphere.speed = 0.005 * Math.random();
        return sphere;
    }
    createBox() {
        const box = new THREE.Mesh(
            new THREE.BoxGeometry(Math.random() * 100 + 10, Math.random() * 100 + 10, Math.random() * 100 + 10),
            this.material
        );
        const ratioZ = 500;
        const ratioX = 200;
        box.position.x = window.isMobile ? Math.random() * 400 - 200 : Math.random() * 3000 - 800;
        box.position.y = window.isMobile ? Math.random() * 600 - 300 : (Math.random() * ratioX + 100) * 2 + 20;
        box.position.z = Math.random() * ratioZ - ratioZ / 2;
        box.newz = Math.random() * ratioZ - ratioZ;
        box.position.y = (Math.random() > 0.5) ? box.position.y : -box.position.y;
        box.rotationAdds = new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
        box.speed = 0.005 * Math.random();
        return box;
    }
    createCylinder() {
        const cylinder = new THREE.Mesh(
            new THREE.CylinderGeometry(Math.random() * 50 + 10, Math.random() * 50 + 10, Math.random() * 100 + 20, 8),
            this.material
        );
        const ratioZ = 500;
        const ratioX = 200;
        cylinder.position.x = window.isMobile ? Math.random() * 400 - 200 : Math.random() * 3000 - 800;
        cylinder.position.y = window.isMobile ? Math.random() * 600 - 300 : (Math.random() * ratioX + 100) * 2 + 20;
        cylinder.position.z = Math.random() * ratioZ - ratioZ / 2;
        cylinder.newz = Math.random() * ratioZ - ratioZ;
        cylinder.position.y = (Math.random() > 0.5) ? cylinder.position.y : -cylinder.position.y;
        cylinder.rotationAdds = new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
        cylinder.speed = 0.005 * Math.random();
        return cylinder;
    }
    createCone() {
        const cone = new THREE.Mesh(
            new THREE.ConeGeometry(Math.random() * 50 + 10, Math.random() * 100 + 20, 8),
            this.material
        );
        const ratioZ = 500;
        const ratioX = 200;
        cone.position.x = window.isMobile ? Math.random() * 400 - 200 : Math.random() * 3000 - 800;
        cone.position.y = window.isMobile ? Math.random() * 600 - 300 : (Math.random() * ratioX + 100) * 2 + 20;
        cone.position.z = Math.random() * ratioZ - ratioZ / 2;
        cone.newz = Math.random() * ratioZ - ratioZ;
        cone.position.y = (Math.random() > 0.5) ? cone.position.y : -cone.position.y;
        cone.rotationAdds = new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
        cone.speed = 0.005 * Math.random();
        return cone;
    }

    createTorus() {
        const torus = new THREE.Mesh(
            new THREE.TorusGeometry(Math.random() * 50 + 10, Math.random() * 10 + 5, 8, 100),
            this.material
        );
        const ratioZ = 500;
        const ratioX = 200;
        torus.position.x = window.isMobile ? Math.random() * 400 - 200 : Math.random() * 3000 - 800;
        torus.position.y = window.isMobile ? Math.random() * 600 - 300 : (Math.random() * ratioX + 100) * 2 + 20;
        torus.position.z = Math.random() * ratioZ - ratioZ / 2;
        torus.newz = Math.random() * ratioZ - ratioZ;
        torus.position.y = (Math.random() > 0.5) ? torus.position.y : -torus.position.y;
        torus.rotationAdds = new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
        torus.speed = 0.005 * Math.random();
        return torus;
    }
    animate(time) {
        const scrollTop = document.documentElement.scrollTop;
        const pageHeight = (function () {
            return Math.max(
                document.body.scrollHeight,
                document.documentElement.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.offsetHeight,
                document.body.clientHeight,
                document.documentElement.clientHeight
            );
        })();
        if (document.querySelector('.wrapper-pin')) {
            if (!window.isMobile) {
                if (scrollTop < document.querySelector('.wrapper-pin').scrollHeight - window.innerHeight) {
                    this.group.position.x = lerp(this.group.position.x, -scrollTop * .9, 0.05);
                } else {
                    this.group.position.x = lerp(this.group.position.x, -(document.querySelector('.wrapper-pin').scrollHeight - window.innerHeight) * .9, 0.05);
                }
            }
        }
        this.group.children.forEach(sphere => {
            sphere.rotation.x += sphere.rotationAdds.x * sphere.speed;
            sphere.rotation.y += sphere.rotationAdds.y * sphere.speed;
            sphere.rotation.z += sphere.rotationAdds.z * sphere.speed;
        });
    }
    leave() {
        this.theater.scene.remove(this.group);

        this.group.children.forEach(child => {
            if (child.geometry) {
                child.geometry.dispose(); // Dispose of geometry to free memory
            }
            if (child.material) {
                // If the material has textures, they should be disposed of as well
                if (Array.isArray(child.material)) {
                    child.material.forEach(mat => {
                        if (mat.map) mat.map.dispose();
                        mat.dispose(); // Dispose of material
                    });
                } else {
                    if (child.material.map) child.material.map.dispose();
                    child.material.dispose(); // Dispose of material
                }
            }
        });

        this.group.clear(); // Clear the children from the group
        this.group = null; // Remove reference to the group to allow garbage collection
    }
}

export { LabsState };