"use client"

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface HeroRevealProps {
  imageUrl?: string;
  spotlightRadius?: number; // 0..1 relative to min(canvasWidth, canvasHeight)
  starCount?: number;
}

export default function Component({
  imageUrl = "https://cdn.shopify.com/s/files/1/0633/2714/2125/files/D_Diamond_Logo_White_Full.png?v=1747429316",
  spotlightRadius = 0.28,
  starCount = 500,
}: HeroRevealProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);

  const mouseUniform = useRef(new THREE.Vector2(-10, -10));
  const timeUniform = useRef({ value: 0 });
  const aspectUniform = useRef({ value: 1 });

  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const isMouseInside = useRef(false);

  // Store image aspect locally to recompute rect on resize
  const imageAspectRef = useRef(1);
  const rectCenterUniform = useRef({ value: new THREE.Vector2(0.5, 0.5) });
  const rectSizeUniform = useRef({ value: new THREE.Vector2(0.5, 0.2) });

  // Mobile detection
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    // On mobile, skip WebGL entirely for performance
    if (isMobile) {
      setIsLoaded(true);
      return;
    }

    const mount = mountRef.current;
    if (!mount) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;

    // Camera
    const width = mount.clientWidth;
    const height = mount.clientHeight;
    const aspect = width / height;
    const camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0.1, 10);
    camera.position.z = 1;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    rendererRef.current = renderer;
    mount.appendChild(renderer.domElement);

    // ---------- Starfield (GPU animated points) ----------
    // Dots (soft circles)
    const dotsGeom = new THREE.BufferGeometry();
    const dotsCount = Math.floor(starCount * 0.6);
    const dPositions = new Float32Array(dotsCount * 3);
    const dPhases = new Float32Array(dotsCount);
    const dSpeeds = new Float32Array(dotsCount);
    const dSizes = new Float32Array(dotsCount);
    for (let i = 0; i < dotsCount; i++) {
      dPositions[i * 3 + 0] = (Math.random() - 0.5) * 4.0;
      dPositions[i * 3 + 1] = (Math.random() - 0.5) * 4.0;
      dPositions[i * 3 + 2] = Math.random() * 0.1;
      dPhases[i] = Math.random() * Math.PI * 2;
      dSpeeds[i] = 0.6 + Math.random() * 1.4;
      dSizes[i] = 2 + Math.random() * 3;
    }
    dotsGeom.setAttribute("position", new THREE.BufferAttribute(dPositions, 3));
    dotsGeom.setAttribute("aPhase", new THREE.BufferAttribute(dPhases, 1));
    dotsGeom.setAttribute("aSpeed", new THREE.BufferAttribute(dSpeeds, 1));
    dotsGeom.setAttribute("aSize", new THREE.BufferAttribute(dSizes, 1));

    const dotsMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: timeUniform.current,
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      vertexShader: `
        attribute float aPhase;
        attribute float aSpeed;
        attribute float aSize;
        uniform float uTime;
        uniform float uPixelRatio;
        varying float vAlpha;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          float twinkle = 0.6 + 0.4 * sin(uTime * aSpeed + aPhase);
          vAlpha = twinkle;
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = aSize * twinkle * uPixelRatio;
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);
          float alpha = smoothstep(0.5, 0.0, d) * vAlpha; // soft circle
          gl_FragColor = vec4(vec3(1.0), alpha);
        }
      `,
    });
    const dots = new THREE.Points(dotsGeom, dotsMaterial);
    scene.add(dots);

    // Stars (4-point sparkle)
    const starsGeom = new THREE.BufferGeometry();
    const starsCount = Math.max(50, Math.floor(starCount * 0.4));
    const sPositions = new Float32Array(starsCount * 3);
    const sPhases = new Float32Array(starsCount);
    const sSpeeds = new Float32Array(starsCount);
    const sSizes = new Float32Array(starsCount);
    const sRotate = new Float32Array(starsCount);
    for (let i = 0; i < starsCount; i++) {
      sPositions[i * 3 + 0] = (Math.random() - 0.5) * 4.0;
      sPositions[i * 3 + 1] = (Math.random() - 0.5) * 4.0;
      sPositions[i * 3 + 2] = Math.random() * 0.1;
      sPhases[i] = Math.random() * Math.PI * 2;
      sSpeeds[i] = 0.6 + Math.random() * 1.4;
      sSizes[i] = 6 + Math.random() * 10; // larger than dots (px)
      sRotate[i] = Math.random() * Math.PI; // rotation variability
    }
    starsGeom.setAttribute("position", new THREE.BufferAttribute(sPositions, 3));
    starsGeom.setAttribute("aPhase", new THREE.BufferAttribute(sPhases, 1));
    starsGeom.setAttribute("aSpeed", new THREE.BufferAttribute(sSpeeds, 1));
    starsGeom.setAttribute("aSize", new THREE.BufferAttribute(sSizes, 1));
    starsGeom.setAttribute("aRot", new THREE.BufferAttribute(sRotate, 1));

    const starsMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: timeUniform.current,
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      vertexShader: `
        attribute float aPhase;
        attribute float aSpeed;
        attribute float aSize;
        attribute float aRot;
        uniform float uTime;
        uniform float uPixelRatio;
        varying float vTwinkle;
        varying float vRot;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          float tw = 0.7 + 0.5 * sin(uTime * aSpeed + aPhase);
          vTwinkle = tw;
          vRot = aRot + uTime * 0.15; // slow rotation
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = aSize * tw * uPixelRatio;
        }
      `,
      fragmentShader: `
        precision highp float;
        varying float vTwinkle;
        varying float vRot;
        // 4-pointed star using angular spokes
        float star4(vec2 p) {
          // center
          vec2 uv = p - 0.5;
          // rotate
          float s = sin(vRot), c = cos(vRot);
          vec2 r = vec2(c*uv.x - s*uv.y, s*uv.x + c*uv.y);
          float rlen = length(r);
          float a = atan(r.y, r.x);
          float spokes = abs(cos(2.0*a)); // 4 spokes
          float beam = pow(spokes, 8.0);
          float fall = exp(-rlen * 10.0);
          float core = smoothstep(0.45, 0.0, rlen);
          return clamp(core + beam * fall * 1.5, 0.0, 1.0);
        }
        void main() {
          float alpha = star4(gl_PointCoord) * vTwinkle;
          gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
        }
      `,
    });
    const stars = new THREE.Points(starsGeom, starsMaterial);
    scene.add(stars);

    // ---------- Spotlight image reveal ----------
    const quadGeom = new THREE.PlaneGeometry(2, 2); // full screen in NDC with ortho camera

    const revealUniforms = {
      uTexture: { value: null as THREE.Texture | null },
      uMouse: { value: mouseUniform.current },
      uTime: timeUniform.current,
      uAspect: aspectUniform.current, // canvas aspect (width/height)
      uImageAspect: { value: 1.0 },
      uRadius: { value: spotlightRadius },
      uRectCenter: rectCenterUniform.current, // 0..1
      uRectSize: rectSizeUniform.current,     // 0..1 (width, height)
    };

    const revealMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthTest: false,
      uniforms: revealUniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv; // 0..1 across the screen
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform vec2 uMouse; // in 0..1 screen space, with (0,0) bottom-left
        uniform float uAspect; // canvas W/H
        uniform float uImageAspect; // image W/H
        uniform float uRadius; // relative to min(W,H)
        uniform vec2 uRectCenter; // where the image is placed (screen uv)
        uniform vec2 uRectSize;   // width,height as fractions of screen
        varying vec2 vUv;

        vec2 coverUv(vec2 uv, float canvasAspect, float imageAspect) {
          float scale = (canvasAspect > imageAspect) ? canvasAspect / imageAspect : 1.0;
          vec2 centered = uv * 2.0 - 1.0;
          centered.x *= canvasAspect;
          centered /= scale;
          centered.x /= imageAspect;
          vec2 outUv = centered * 0.5 + 0.5;
          return outUv;
        }

        void main() {
          // Distance in screen uv space, normalized by min dimension
          vec2 p = vUv; // 0..1
          float dx = (p.x - uMouse.x) * uAspect; // scale x by aspect so circle is round
          float dy = (p.y - uMouse.y);
          float dist = length(vec2(dx, dy));
          float spot = 1.0 - smoothstep(uRadius * 0.9, uRadius, dist);

          // Rect where the image is placed
          vec2 rectMin = uRectCenter - 0.5 * uRectSize;
          vec2 rectMax = rectMin + uRectSize;
          vec2 insideMask = step(rectMin, p) * step(p, rectMax);
          float inside = insideMask.x * insideMask.y;

          // Local uv 0..1 inside rect
          vec2 local = (p - rectMin) / uRectSize;

          // Aspect for the rect itself (in pixels): (rectWidth*W)/(rectHeight*H) = (uRectSize.x * uAspect) / uRectSize.y
          float rectAspect = (uRectSize.x * uAspect) / max(uRectSize.y, 1e-6);
          vec2 uvImg = coverUv(local, rectAspect, uImageAspect);
          vec4 tex = texture2D(uTexture, uvImg) * inside;

          // Slight glow edge
          float glow = smoothstep(uRadius, uRadius * 0.6, dist) * 0.35;
          vec3 color = tex.rgb + vec3(glow);
          gl_FragColor = vec4(color, tex.a * spot);
        }
      `,
    });

    const quad = new THREE.Mesh(quadGeom, revealMaterial);
    quad.renderOrder = 1; // after stars
    scene.add(quad);

    // Helper to compute rect size/position
    const updateRectPlacement = () => {
      const a = aspectUniform.current.value as number;
      const imgA = imageAspectRef.current;
      const widthFrac = isMobile ? 0.6 : 0.42; // desktop bigger by ~20%
      const heightFrac = widthFrac * (a / imgA);
      rectSizeUniform.current.value.set(widthFrac, heightFrac);
      const marginX = isMobile ? 0.0 : 0.06;
      const centerX = isMobile ? 0.5 : (1.0 - marginX - widthFrac * 0.5);
      const centerY = 0.5;
      rectCenterUniform.current.value.set(centerX, centerY);
    };

    // Load image texture
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = "anonymous";
    loader.load(
      imageUrl,
      (tex) => {
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        imageAspectRef.current = tex.image.width / tex.image.height;
        revealUniforms.uTexture.value = tex;
        revealUniforms.uImageAspect.value = imageAspectRef.current;
        updateRectPlacement();
        setIsLoaded(true);
      },
      undefined,
      () => {
        // Still allow scene without texture
        setIsLoaded(true);
      }
    );

    // Resize handler
    const handleResize = () => {
      if (!rendererRef.current || !cameraRef.current || !mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      const a = w / h;
      const cam = cameraRef.current;
      cam.left = -a;
      cam.right = a;
      cam.top = 1;
      cam.bottom = -1;
      cam.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
      aspectUniform.current.value = a;
      updateRectPlacement();
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Mouse handlers (no React state updates on move)
    const handleMouseMove = (e: MouseEvent) => {
      if (!rendererRef.current) return;
      const rect = rendererRef.current.domElement.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height; // bottom-left origin
      mouseUniform.current.set(x, y);
      // Move custom cursor
      if (cursorRef.current) {
        const cx = e.clientX - rect.left;
        const cy = e.clientY - rect.top;
        cursorRef.current.style.transform = `translate(${cx - 16}px, ${cy - 16}px)`;
      }
    };
    const handleEnter = () => {
      isMouseInside.current = true;
      if (cursorRef.current && !isMobile) cursorRef.current.style.opacity = "1";
    };
    const handleLeave = () => {
      isMouseInside.current = false;
      mouseUniform.current.set(-10, -10);
      if (cursorRef.current) cursorRef.current.style.opacity = "0";
    };

    renderer.domElement.addEventListener("mousemove", handleMouseMove);
    renderer.domElement.addEventListener("mouseenter", handleEnter);
    renderer.domElement.addEventListener("mouseleave", handleLeave);

    // Animation loop
    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      timeUniform.current.value = performance.now() * 0.001;
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("mousemove", handleMouseMove);
      renderer.domElement.removeEventListener("mouseenter", handleEnter);
      renderer.domElement.removeEventListener("mouseleave", handleLeave);

      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).geometry) (obj as THREE.Mesh).geometry.dispose();
        // @ts-ignore
        if (obj.material) {
          // @ts-ignore
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          // @ts-ignore
          else obj.material.dispose();
        }
      });

      renderer.dispose();
      if (mount && renderer.domElement.parentElement === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [imageUrl, spotlightRadius, starCount, isMobile]);

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Three mount only on desktop */}
      {!isMobile && (
        <div
          ref={mountRef}
          className="absolute inset-0 w-full h-full cursor-none"
          style={{ touchAction: "none" }}
        />
      )}


      {/* Custom cursor (no re-renders on move) */}
      {!isMobile && (
        <div
          ref={cursorRef}
          className="absolute z-20 pointer-events-none opacity-0 transition-opacity duration-150"
          style={{ width: 32, height: 32 }}
        >
          <div className="w-8 h-8 rounded-full border-2 border-white/40 backdrop-blur-sm bg-white/10 relative">
            <div className="w-full h-full rounded-full border border-white/60 animate-pulse" />
            <div className="w-2 h-2 bg-white/80 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
      )}

      {/* Loading (desktop only) */}
      {!isMobile && !isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-white/60 text-sm animate-pulse">Loading…</div>
        </div>
      )}

      {/* Overlay content */}
      <div className="relative z-10 container mx-auto px-4 py-20 flex items-start min-h-screen pointer-events-none">
        <div className="max-w-2xl space-y-8 mt-20">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight uppercase text-center md:text-left">
            Explore the Legacy of Diamonds
          </h1>
          <p className="text-xl md:text-2xl text-white/70 max-w-xl leading-relaxed text-center md:text-left">
            Best in class service and diamonds provided in Ontario, Canada. Explore our collection or book a meeting!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-16 pointer-events-auto">
            <Link href="/search" className="px-8 py-4 text-black bg-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border border-white/10">
              Discover More
            </Link>
            <Link target="_blank" href="https://calendly.com/dubai-diamonds103/30min" className="px-8 py-4 bg-white/5 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/20 hover:bg-white/10 transition-all duration-200">
              Book a Consultation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}