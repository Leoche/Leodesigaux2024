import * as THREE from 'three';
import { State } from './State.js';
import { lerp } from '../utils/lerp.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { gsap } from 'gsap';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
class AboutState extends State {
    constructor(theater) {
        super();
        this.theater = theater;
        this.sphere = null;
        this.plane = null;
        this.texts = [];
        this.text = "About";
        this.textOffsets = [
            -30,
            120,
            95,
            110,
            110,
        ];
        this.offsetX = 0;
        this.baseOffsetX = -35;
        this.baseOffsetY = window.isMobile ? 500 : 150;
        this.gltfOffsetY = window.isMobile ? window.screen.height * -0.3 : 0;
        this.group = new THREE.Group();
        this.rotationZ = 0;
        this.rotationX = 0;
        this.initiated = false;
        this.headScale = 300.0;

        
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.pointOfIntersection = new THREE.Vector3();
    }
    enter() {
        this.material = new THREE.MeshPhongMaterial(this.theater.materialParams);
        const loader = new FontLoader();

        loader.load( 'fonts/helvetiker_regular.typeface.json', ( font ) => {
            "About".split('').forEach((letter, index) => {
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
                    duration: 3,
                    delay: index * .2 + .1,
                    ease: "back.out(8)",
                });
                gsap.fromTo(text.position, {
                    z: -500,
                },{
                    z: 0,
                    duration: 5,
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
                tl.fromTo(text.rotation,{
                    x: "0.1" 
                },{
                    x: "-=0.5",
                    repeat: -1,
                    yoyo: true,
                    delay: index * .2,
                    duration: 2,
                    ease: "power2.inOut"
                }, "anim_start");
            });
        } );
        this.theater.scene.add(this.group);
        if(window.isMobile) {
            this.group.scale.set(0.5, 0.5, 0.5);
        }
        this.gltf = null;
        this.gltfGroup = new THREE.Group();

        const loaderGltf = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderConfig({ type: 'js' });
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
        loaderGltf.setDRACOLoader( dracoLoader );
        loaderGltf.load("/models/head3.glb", (gltf) => {
            gltf.scenes[0].children[0].scale.set(this.headScale, this.headScale, this.headScale);
            gltf.scenes[0].children[0].material = this.material;
            if(window.isMobile) {
                gltf.scenes[0].children[0].position.x = 0;
            } else {
                gltf.scenes[0].children[0].position.x = -600;
            }
            gltf.scenes[0].children[0].children.forEach(child => {
                child.material = this.material;
            });
            this.gltf = gltf.scenes[0].children[0];
            gsap.fromTo(this.gltf.position, {
                z: -800,
            },{
                z: -200,
                duration: 5,
                ease: "power3.out",
            });
            this.theater.scene.add(this.gltf);
        });

        this.plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -10);
        this.plane.translate = new THREE.Vector3(0, 0, -100);
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.pointOfIntersection = new THREE.Vector3();
    }
    animate(time) {
        if(this.texts.length == 0) return;
        this.rotationZ = this.theater.mouseManager.position.x * Math.PI / 4;
        this.group.rotation.y = lerp(this.group.rotation.y, this.rotationZ, 0.01);
        this.rotationX = -this.theater.mouseManager.position.y * Math.PI / 8;
        this.group.rotation.x = lerp(this.group.rotation.x, this.rotationX, 0.01);

        if(!this.gltf) return;
        const scrollTop = document.documentElement.scrollTop;
        if(!window.isMobile) {
            this.mouse.x = lerp(this.mouse.x, ( this.theater.mouseManager.positionReal.x / window.innerWidth ) * 2 - 1, 0.025);
            this.mouse.y = lerp(this.mouse.y, -( this.theater.mouseManager.positionReal.y / window.innerHeight ) * 2 + 1, 0.025);
            this.raycaster.setFromCamera(this.mouse, this.theater.camera);
            this.raycaster.ray.intersectPlane(this.plane, this.pointOfIntersection);
            this.pointOfIntersection.y *= .5;
            
            this.gltf.lookAt(this.pointOfIntersection);
            this.gltf.position.y = lerp(this.gltf.position.y, this.gltfOffsetY +scrollTop * 0.2 + Math.sin(time)*50, 0.05);

        } else {
            const scrollMax = -window.screen.height + Math.max( document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
            this.gltf.position.y = lerp(this.gltf.position.y, this.gltfOffsetY + Math.sin(time)*50, 0.05);
            this.gltf.rotation.x = gsap.utils.mapRange(0, scrollMax, 0, -0.90, scrollTop);
        }

        this.group.position.y = lerp(this.group.position.y, scrollTop * 0.3, 0.05);
    }
    leave() {
        this.texts.forEach(text => {
            this.theater.scene.remove(text);
    
            gsap.killTweensOf(text.position);
            gsap.killTweensOf(text.rotation);
    
            text.geometry.dispose();
            text.material.dispose();
        });
    
        this.texts = [];
        this.theater.scene.remove(this.gltf);
        this.theater.scene.remove(this.group);
        this.group = new THREE.Group();
        this.offsetX = 0;
        this.initiated = false;
    }
}

export { AboutState };