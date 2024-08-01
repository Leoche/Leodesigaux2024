import * as THREE from 'three';
let asciiShader = {
    uniforms: {
        "tDiffuse": { value: null },
        "iResolution": { value: new THREE.Vector3(window.innerWidth, window.innerHeight, 1) },
        "iChannel0": { value: null }
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        #define HAS_GREENSCREEN

        uniform sampler2D tDiffuse;
        uniform vec3 iResolution;
        varying vec2 vUv;

        float character(float n, vec2 p) {
            p = floor(p * vec2(4.0, 4.0) + 2.5);
            if (clamp(p.x, 0.0, 4.0) == p.x && clamp(p.y, 0.0, 4.0) == p.y) {
                if (int(mod(n / exp2(p.x + 5.0 * p.y), 2.0)) == 1) return 1.0;
            }
            return 0.0;
        }

        void main() {
            vec2 uv = vUv * iResolution.xy;
            vec2 scaledUV = floor(uv / vec2(8.0)) * vec2(8.0) / iResolution.xy;
            vec3 col = texture2D(tDiffuse, scaledUV).rgb;

            float gray = (col.r + col.g + col.b) / 4.0;

            float n = 65536.0;             // .
            if (gray > 0.2) n = 65600.0;    // :
            if (gray > 0.3) n = 332772.0;   // *
            if (gray > 0.4) n = 15255086.0; // o 
            if (gray > 0.5) n = 23385164.0; // &
            if (gray > 0.6) n = 15252014.0; // 8
            if (gray > 0.7) n = 13199452.0; // @
            if (gray > 0.8) n = 11512810.0; // #

            vec2 p = mod(uv / 6.0, 2.0) - vec2(1.0);
            float charVal = character(n, p);

            col *= charVal;

            // Bloom effect
            vec3 blurredCol = vec3(0.0);
            float blurSize = 0.5; // Adjust this for different blur intensity

            for (float i = -4.0; i <= 4.0; i += 1.0) {
                for (float j = -4.0; j <= 4.0; j += 1.0) {
                    vec2 offset = vec2(i, j) * blurSize;
                    blurredCol += texture2D(tDiffuse, (uv + offset) / iResolution.xy).rgb;
                }
            }
            blurredCol /= 81.0; // Adjust divisor based on the number of samples

            // Combine original color with blurred color
            col = mix(col, blurredCol, 0.1);
            col = col + vec3(10.0 / 255.0, 9.0 / 255.0, 25.0 / 255.0);
            gl_FragColor = vec4(col, 1.0);
        }
    `
};
export { asciiShader };