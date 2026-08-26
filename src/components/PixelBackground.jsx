import { useEffect, useRef } from "react";
import * as THREE from "three";

function PixelBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const container = canvas.parentElement;

    if (!container) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uTime: {
        value: 0,
      },

      uResolution: {
        value: new THREE.Vector2(1, 1),
      },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,

      transparent: true,

      depthWrite: false,

      vertexShader: `
        varying vec2 vUv;

        void main() {
          vUv = uv;

          gl_Position = vec4(
            position,
            1.0
          );
        }
      `,

      fragmentShader: `
        precision highp float;

        uniform float uTime;
        uniform vec2 uResolution;

        varying vec2 vUv;

        float random(vec2 p) {
          return fract(
            sin(
              dot(
                p,
                vec2(
                  127.1,
                  311.7
                )
              )
            ) * 43758.5453123
          );
        }

        void main() {

          /*
           * Pixel grid spacing.
           */

          float gridSize = 18.0;

          /*
           * Convert screen coordinates
           * into pixel-grid coordinates.
           */

          vec2 pixelPosition =
            gl_FragCoord.xy / gridSize;

          vec2 cell =
            floor(pixelPosition);

          vec2 cellPosition =
            fract(pixelPosition);

          /*
           * Small square pixel.
           */

          float pixelSize = 0.18;

          float pixel =
            step(
              cellPosition.x,
              pixelSize
            )
            *
            step(
              cellPosition.y,
              pixelSize
            );

          /*
           * Create deterministic
           * random value for every cell.
           */

          float randomValue =
            random(cell);

          /*
           * Slowly change the random
           * brightness over time.
           */

          float wave =
            sin(
              uTime * 1.5
              +
              randomValue * 20.0
            );

          /*
           * Convert to brightness.
           */

          float brightness =
            smoothstep(
              -0.8,
              0.8,
              wave
            );

          /*
           * Give every pixel a minimum
           * visibility.
           */

          float alpha =
            pixel *
            (
              0.15
              +
              brightness * 0.55
            );

          /*
           * Fade the edges of the panel.
           */

          vec2 centered =
            vUv - 0.5;

          float distanceFromCenter =
            length(centered);

          float vignette =
            1.0 -
            smoothstep(
              0.25,
              0.75,
              distanceFromCenter
            );

          alpha *=
            0.45 +
            vignette * 0.55;

          /*
           * White / grayscale pixels.
           */

          vec3 color =
            vec3(1.0);

          gl_FragColor =
            vec4(
              color,
              alpha
            );
        }
      `,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);

    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    const resize = () => {
      const width = container.clientWidth;

      const height = container.clientHeight;

      if (!width || !height) {
        return;
      }

      renderer.setSize(width, height, false);

      uniforms.uResolution.value.set(width, height);
    };

    resize();

    const resizeObserver = new ResizeObserver(resize);

    resizeObserver.observe(container);

    let animationFrame;

    const startTime = performance.now();

    const animate = () => {
      animationFrame = requestAnimationFrame(animate);

      uniforms.uTime.value = (performance.now() - startTime) / 1000;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);

      resizeObserver.disconnect();

      geometry.dispose();

      material.dispose();

      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  );
}

export default PixelBackground;
