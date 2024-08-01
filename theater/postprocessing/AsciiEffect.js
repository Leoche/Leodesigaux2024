import * as THREE from 'three';

class AsciiEffect {
    constructor(renderer, charSet = ' .:-=+*#%@') {

        let width, height;

        this.domElement = renderer.domElement;

        this.setSize = function(w, h) {
            width = w;
            height = h;
            renderer.setSize(w, h);
        };

        this.render = function(scene, camera) {
            renderer.render(scene, camera);
        };
    }
}

export { AsciiEffect };