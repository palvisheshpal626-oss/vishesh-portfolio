"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  Power,
  Play,
  Pause,
  Flame,
  Zap,
  Sun,
  Layers,
  Eye,
  Maximize2,
  Minimize2,
  RotateCw,
  RotateCcw,
  Sliders,
  ChevronUp,
  ChevronDown,
  X,
  Sparkles,
  Shield,
  Move3D,
  Gauge
} from "lucide-react";

// ============================================================
// IRON MAN HELMET FRACTION
// 0.88 = face/visor center is at 88% of body height from feet
// This positions the helmet face at world y = 0 (screen center)
// ============================================================
const HELMET_FRACTION = 0.88;

export default function IronManBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // ============================================================
  // 12 REQUIRED CONTROL STATES
  // ============================================================
  const [ironManEnabled, setIronManEnabled] = useState<boolean>(true);       // 1. ON/OFF
  const [animationPlaying, setAnimationPlaying] = useState<boolean>(true);   // 2. PLAY/PAUSE
  const [redArmorGlow, setRedArmorGlow] = useState<boolean>(true);           // 3. ON/OFF
  const [arcReactorGlow, setArcReactorGlow] = useState<boolean>(true);       // 4. ON/OFF
  const [bgBrightness, setBgBrightness] = useState<number>(115);             // 5. Slider 50%-200%
  const [bgOpacity, setBgOpacity] = useState<number>(20);                    // 6. Slider 0%-80%
  const [contentVisibility, setContentVisibility] = useState<number>(90);    // 7. Slider 50%-100%
  const [modelScale, setModelScale] = useState<number>(1.0);                 // 8. Slider 0.6x-1.6x
  const [autoRotate, setAutoRotate] = useState<boolean>(false);              // 9. ON/OFF
  // 10. Reset Camera (action button)
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);          // 11. Fullscreen
  const [panelCollapsed, setPanelCollapsed] = useState<boolean>(true);       // 12. starts collapsed

  // Additional UX state
  const [interactive3D, setInteractive3D] = useState<boolean>(false);
  const [modelReady, setModelReady] = useState<boolean>(false);
  const [currentFps, setCurrentFps] = useState<number>(60);

  // Ref snapshot — all control values readable in the animation loop without re-render
  const stateRef = useRef({
    ironManEnabled,
    animationPlaying,
    redArmorGlow,
    arcReactorGlow,
    bgBrightness,
    bgOpacity,
    contentVisibility,
    modelScale,
    autoRotate,
    interactive3D,
    isFullscreen,
  });

  useEffect(() => {
    stateRef.current = {
      ironManEnabled,
      animationPlaying,
      redArmorGlow,
      arcReactorGlow,
      bgBrightness,
      bgOpacity,
      contentVisibility,
      modelScale,
      autoRotate,
      interactive3D,
      isFullscreen,
    };
  }, [
    ironManEnabled, animationPlaying, redArmorGlow, arcReactorGlow,
    bgBrightness, bgOpacity, contentVisibility, modelScale,
    autoRotate, interactive3D, isFullscreen,
  ]);

  // ── Three.js object refs ──────────────────────────────────────
  const rendererRef        = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef           = useRef<THREE.Scene | null>(null);
  const cameraRef          = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef        = useRef<OrbitControls | null>(null);
  const modelHolderRef     = useRef<THREE.Group | null>(null);
  const loadedModelRef     = useRef<THREE.Group | null>(null);
  const baseScaleRef       = useRef<number>(1.0);
  // modelReadyRef — synchronous flag for animation loop (no React re-render cost)
  const modelReadyRef      = useRef<boolean>(false);
  // computedCamDistRef — camera distance derived from actual model BB after load
  const computedCamDistRef = useRef<number>(0); // 0 = not yet computed

  // ── Light refs ───────────────────────────────────────────────
  const keyLightRef            = useRef<THREE.DirectionalLight | null>(null);
  const fillLightRef           = useRef<THREE.DirectionalLight | null>(null);
  const rimGoldLightRef        = useRef<THREE.DirectionalLight | null>(null);
  const rimRedLightRef         = useRef<THREE.DirectionalLight | null>(null);
  const ambientLightRef        = useRef<THREE.AmbientLight | null>(null);
  const redArmorLight1Ref      = useRef<THREE.PointLight | null>(null);
  const redArmorLight2Ref      = useRef<THREE.PointLight | null>(null);
  const arcLightRef            = useRef<THREE.PointLight | null>(null);
  const eyeLightRef            = useRef<THREE.PointLight | null>(null);
  const arcSpriteRef           = useRef<THREE.Sprite | null>(null);
  const repulsorLeftSpriteRef  = useRef<THREE.Sprite | null>(null);
  const repulsorRightSpriteRef = useRef<THREE.Sprite | null>(null);

  // ── Camera / target refs ─────────────────────────────────────
  // After repositioning: helmet IS at world (0,0,0) → camera target always = (0,0,0)
  const defaultCamPosRef    = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 8.5));
  const defaultTargetPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  // Model's hover offset stored so lights can track it
  const modelHoverOffsetRef = useRef<number>(0);

  // ── CSS variable sync ────────────────────────────────────────
  useEffect(() => {
    const cardAlpha = 0.45 + ((contentVisibility - 50) / 50) * 0.5;
    document.documentElement.style.setProperty("--card-bg-opacity", cardAlpha.toFixed(2));
  }, [contentVisibility]);

  // ── Brightness / glow sync (no scene rebuild) ────────────────
  useEffect(() => {
    const mult = bgBrightness / 100;
    if (rendererRef.current) rendererRef.current.toneMappingExposure = 1.35 * mult;
    if (keyLightRef.current)     keyLightRef.current.intensity     = 4.5  * mult;
    if (fillLightRef.current)    fillLightRef.current.intensity    = 2.5  * mult;
    if (rimGoldLightRef.current) rimGoldLightRef.current.intensity = 3.8  * mult;
    if (rimRedLightRef.current)  rimRedLightRef.current.intensity  = (redArmorGlow ? 3.2 : 0.6) * mult;
    if (ambientLightRef.current) ambientLightRef.current.intensity = 2.2  * mult;
    if (redArmorLight1Ref.current && redArmorLight2Ref.current) {
      redArmorLight1Ref.current.visible = redArmorGlow;
      redArmorLight2Ref.current.visible = redArmorGlow;
    }
    if (arcLightRef.current && eyeLightRef.current && arcSpriteRef.current) {
      arcLightRef.current.visible  = arcReactorGlow;
      eyeLightRef.current.visible  = arcReactorGlow;
      arcSpriteRef.current.visible = arcReactorGlow;
      if (repulsorLeftSpriteRef.current)  repulsorLeftSpriteRef.current.visible  = arcReactorGlow;
      if (repulsorRightSpriteRef.current) repulsorRightSpriteRef.current.visible = arcReactorGlow;
    }
  }, [bgBrightness, redArmorGlow, arcReactorGlow]);

  // ── Model scale slider sync ──────────────────────────────────
  useEffect(() => {
    if (modelHolderRef.current) {
      modelHolderRef.current.scale.setScalar(baseScaleRef.current * modelScale);
    }
  }, [modelScale]);

  // ── OrbitControls interactivity sync ────────────────────────
  // .enabled stays TRUE always (wheel zoom works in all modes).
  // Only rotate/pan are toggled by interactive3D / fullscreen.
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.enableRotate = interactive3D || isFullscreen;
      controlsRef.current.enablePan    = interactive3D || isFullscreen;
      controlsRef.current.autoRotate      = autoRotate;
      controlsRef.current.autoRotateSpeed = 2.0;
    }
  }, [interactive3D, autoRotate, isFullscreen]);

  // ============================================================
  // MAIN THREE.JS SETUP — RUNS ONCE ON MOUNT
  // ============================================================
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 1. SCENE
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. CAMERA — FOV 45°, starts at z=8.5; recalculated after model loads
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 80);
    camera.position.set(0, 0, 8.5);
    cameraRef.current = camera;

    // 3. RENDERER
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
      depth: true,
      stencil: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping       = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.outputColorSpace  = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. ORBIT CONTROLS
    // .enabled = true ALWAYS — required for wheel zoom even in passive mode.
    // enableRotate / enablePan are toggled separately by the interactive3D effect above.
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping  = true;
    controls.dampingFactor  = 0.06;
    controls.enableZoom     = true;   // Always ON
    controls.enableRotate   = false;  // Off until Interactive 3D enabled
    controls.enablePan      = false;  // Off until Interactive 3D enabled
    controls.enabled        = true;   // MUST stay true for wheel events to fire
    controls.minDistance    = 1.5;    // Close zoom: fills with helmet
    controls.maxDistance    = 10.0;   // Far zoom: full body + margin
    controls.maxPolarAngle  = Math.PI / 1.6;
    controls.minPolarAngle  = Math.PI / 6;
    controls.target.set(0, 0, 0);    // Always look at helmet (world origin after repositioning)
    controlsRef.current = controls;

    let isUserOrbiting = false;
    controls.addEventListener("start", () => { isUserOrbiting = true; });
    controls.addEventListener("end",   () => { isUserOrbiting = false; });

    // 5. LIGHTING
    const ambientLight = new THREE.AmbientLight(0x16203a, 2.2);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    const keyLight = new THREE.DirectionalLight(0xffffff, 4.5);
    keyLight.position.set(0, 3.5, 5.0);
    scene.add(keyLight);
    keyLightRef.current = keyLight;

    const fillLight = new THREE.DirectionalLight(0x00f0ff, 2.5);
    fillLight.position.set(-4.0, 2.0, 3.0);
    scene.add(fillLight);
    fillLightRef.current = fillLight;

    const rimGoldLight = new THREE.DirectionalLight(0xffb833, 3.8);
    rimGoldLight.position.set(4.0, 3.0, -2.5);
    scene.add(rimGoldLight);
    rimGoldLightRef.current = rimGoldLight;

    const rimRedLight = new THREE.DirectionalLight(0xff1744, 3.2);
    rimRedLight.position.set(-3.5, 1.5, -2.0);
    scene.add(rimRedLight);
    rimRedLightRef.current = rimRedLight;

    // 6. IRON MAN HOLDER — world origin = helmet face position after model repositioning
    const ironManHolder = new THREE.Group();
    ironManHolder.position.set(0, 0, 0);
    scene.add(ironManHolder);
    modelHolderRef.current = ironManHolder;

    // Placeholder light positions (corrected after model loads from real BB)
    const redArmorLight1 = new THREE.PointLight(0xff1744, 3.5, 4.5, 1.4);
    redArmorLight1.position.set(0.45, 0.35, 0.40);
    ironManHolder.add(redArmorLight1);
    redArmorLight1Ref.current = redArmorLight1;

    const redArmorLight2 = new THREE.PointLight(0xff2200, 3.0, 4.5, 1.4);
    redArmorLight2.position.set(-0.45, 0.35, 0.40);
    ironManHolder.add(redArmorLight2);
    redArmorLight2Ref.current = redArmorLight2;

    const arcLight = new THREE.PointLight(0x00f0ff, 5.5, 6.0, 1.3);
    arcLight.position.set(0, -0.65, 0.42); // below helmet; recalculated after BB
    ironManHolder.add(arcLight);
    arcLightRef.current = arcLight;

    const eyeLight = new THREE.PointLight(0x00f0ff, 2.8, 3.5, 1.8);
    eyeLight.position.set(0, 0.0, 0.38); // at helmet level; recalculated
    ironManHolder.add(eyeLight);
    eyeLightRef.current = eyeLight;

    // Glow canvas texture helper
    const createGlowTexture = (innerColor: string, outerColor: string) => {
      const canvas = document.createElement("canvas");
      canvas.width = 128; canvas.height = 128;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
        grad.addColorStop(0,    innerColor);
        grad.addColorStop(0.35, outerColor);
        grad.addColorStop(0.7,  "rgba(0, 200, 255, 0.2)");
        grad.addColorStop(1,    "rgba(0, 0, 0, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 128, 128);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const arcGlowTexture = createGlowTexture("rgba(255,255,255,1)", "rgba(0,240,255,0.95)");
    const arcMaterial = new THREE.SpriteMaterial({
      map: arcGlowTexture,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.95,
    });

    const arcSprite = new THREE.Sprite(arcMaterial);
    arcSprite.position.set(0, -0.65, 0.42);
    arcSprite.scale.set(0.46, 0.46, 1);
    ironManHolder.add(arcSprite);
    arcSpriteRef.current = arcSprite;

    const repulsorLeftSprite = new THREE.Sprite(arcMaterial.clone());
    repulsorLeftSprite.position.set(-0.88, -3.0, 0.10);
    repulsorLeftSprite.scale.set(0.32, 0.32, 1);
    ironManHolder.add(repulsorLeftSprite);
    repulsorLeftSpriteRef.current = repulsorLeftSprite;

    const repulsorRightSprite = new THREE.Sprite(arcMaterial.clone());
    repulsorRightSprite.position.set(0.88, -3.0, 0.10);
    repulsorRightSprite.scale.set(0.32, 0.32, 1);
    ironManHolder.add(repulsorRightSprite);
    repulsorRightSpriteRef.current = repulsorRightSprite;

    // 7. HUD RINGS
    const hudGroup = new THREE.Group();
    scene.add(hudGroup);

    const ringGeo1 = new THREE.RingGeometry(1.8, 1.85, 32);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x00f0ff, side: THREE.DoubleSide, transparent: true, opacity: 0.18 });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 2.3;
    hudGroup.add(ringMesh1);

    const ringGeo2 = new THREE.RingGeometry(2.2, 2.24, 32);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xff1744, side: THREE.DoubleSide, transparent: true, opacity: 0.14 });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.x = Math.PI / 2.1;
    hudGroup.add(ringMesh2);

    // 8. PARTICLES (GPU-rotated — no per-vertex CPU updates)
    const particleCount = 60;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3]     = (Math.random() - 0.5) * 14;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0x00f0ff, size: 0.04, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // ============================================================
    // 9. RESPONSIVE LAYOUT — camera distance uses computed value
    //    after model loads; falls back to safe defaults before.
    // ============================================================
    const updateLayout = () => {
      const width  = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      // Iron Man holder and HUD always at world origin (helmet is there)
      ironManHolder.position.set(0, 0, 0);
      hudGroup.position.set(0, 0, 0);
      // Camera target always = helmet = world origin
      controls.target.copy(defaultTargetPosRef.current); // (0,0,0)

      const baseDist = computedCamDistRef.current; // 0 until model loads

      if (width < 768) {
        // Mobile — slightly farther to fit full body
        const dist = baseDist > 0 ? baseDist * 1.15 : 9.0;
        camera.position.set(0, 0, dist);
        defaultCamPosRef.current.set(0, 0, dist);
        baseScaleRef.current = 0.85;
      } else if (width < 1200) {
        const dist = baseDist > 0 ? baseDist * 1.08 : 8.8;
        camera.position.set(0, 0, dist);
        defaultCamPosRef.current.set(0, 0, dist);
        baseScaleRef.current = 0.95;
      } else {
        const dist = baseDist > 0 ? baseDist : 8.5;
        camera.position.set(0, 0, dist);
        defaultCamPosRef.current.set(0, 0, dist);
        baseScaleRef.current = 1.0;
      }
      ironManHolder.scale.setScalar(baseScaleRef.current * stateRef.current.modelScale);
      controls.update();
    };
    updateLayout();

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateLayout, 100);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // 10. MOUSE PARALLAX
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth)  *  2 - 1;
      mouse.targetY = (e.clientY / window.innerHeight) * -2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // ============================================================
    // 11. LOAD GLTF MODEL
    //
    // POSITIONING STRATEGY — HELMET AT SCREEN CENTER (0, 0, 0):
    //
    //  After scaling to 3.6 units height:
    //    • Geometric center → y = 0 (feet at −1.8, crown at +1.8)
    //    • Helmet face center is at HELMET_FRACTION (0.88) from bottom
    //      → helmet in centered space = size.y × (0.88 − 0.50) = size.y × 0.38 above center
    //    • Shift model DOWN by that amount → helmet lands at world y = 0
    //    • Feet end up at world y ≈ −3.17  (below screen center)
    //    • Crown ends up at world y ≈ +0.43 (above screen center)
    //
    //  Camera at (0, 0, camDist) looking at (0, 0, 0) = helmet:
    //    • Wheel zoom moves along z-axis toward (0,0,0) → face-centered by definition
    //    • No target shifting needed in the render loop
    // ============================================================
    const loader = new GLTFLoader();
    loader.load(
      "/models/ironman/scene.gltf",
      (gltf) => {
        const model = gltf.scene;
        loadedModelRef.current = model;

        // ── Step 1: Measure raw model ──────────────────────────
        const rawBox  = new THREE.Box3().setFromObject(model);
        const rawSize = rawBox.getSize(new THREE.Vector3());

        // ── Step 2: Scale so total body height = 3.6 world units ─
        const targetBodyHeight = 3.6;
        const scaleFactor = targetBodyHeight / (rawSize.y || 1);
        model.scale.setScalar(scaleFactor);
        model.updateMatrixWorld(true);

        // ── Step 3: Compute scaled bounding box ───────────────
        const scaledBox    = new THREE.Box3().setFromObject(model);
        const scaledCenter = scaledBox.getCenter(new THREE.Vector3());
        const scaledSize   = scaledBox.getSize(new THREE.Vector3());

        // ── Step 4: HELMET-CENTERED POSITIONING ───────────────
        // helmetOffsetFromCenter = how far helmet is above geometric center
        const helmetOffsetFromCenter = scaledSize.y * (HELMET_FRACTION - 0.5);
        //   = 3.6 × 0.38 ≈ 1.37

        model.position.x = -scaledCenter.x;
        // Shift down by helmetOffset so helmet sits at world y = 0
        model.position.y = -scaledCenter.y - helmetOffsetFromCenter;
        model.position.z = -scaledCenter.z;
        model.updateMatrixWorld(true);

        // ── Step 5: Verify final bounding box in world space ──
        const finalBox  = new THREE.Box3().setFromObject(model);
        const feetY     = finalBox.min.y;  // should be ≈ −(scaledSize.y × HELMET_FRACTION) ≈ −3.17
        const crownY    = finalBox.max.y;  // should be ≈ +(scaledSize.y × (1 − HELMET_FRACTION)) ≈ +0.43
        const helmetY   = finalBox.min.y + scaledSize.y * HELMET_FRACTION; // should be ≈ 0

        console.log("[IronMan] Helmet world Y (should be ~0):", helmetY.toFixed(4));
        console.log("[IronMan] Feet world Y:",  feetY.toFixed(4));
        console.log("[IronMan] Crown world Y:", crownY.toFixed(4));
        console.log("[IronMan] Body height:", scaledSize.y.toFixed(4));

        // ── Step 6: Compute camera distance ───────────────────
        // Camera at (0, 0, D) looking at (0, 0, 0).
        // Frustum half-height at target = D × tan(FOV/2).
        // Both feet and crown must fit: need D × tan(22.5°) > max(|feetY|, |crownY|)
        const halfFovRad = (45 * Math.PI / 180) / 2; // 22.5°
        const tanHalfFov = Math.tan(halfFovRad);       // ≈ 0.4142
        const maxExtent  = Math.max(Math.abs(feetY), Math.abs(crownY));
        const rawDist    = maxExtent / tanHalfFov;      // exact fit
        const camDist    = Math.min(Math.max(rawDist * 1.12, 4.0), 10.0); // 12% padding, clamped

        console.log("[IronMan] Required camDist:", rawDist.toFixed(3), "→ used:", camDist.toFixed(3));

        computedCamDistRef.current = camDist;

        // Set camera to look at helmet from the computed distance
        camera.position.set(0, 0, camDist);
        defaultCamPosRef.current.set(0, 0, camDist);
        defaultTargetPosRef.current.set(0, 0, 0);
        controls.target.set(0, 0, 0);
        controls.maxDistance = camDist * 1.15; // slight extra out-zoom allowed

        // ── Step 7: PBR material enhancement ──────────────────
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow    = false;
            mesh.receiveShadow = false;
            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.roughness        = 0.28;
              mat.metalness        = 0.88;
              mat.envMapIntensity  = 2.4;
            }
          }
        });

        ironManHolder.add(model);

        // ── Step 8: Reposition lights to match real geometry ──
        // All Y values are relative to world origin (= helmet face = 0).
        // Arc reactor: 72% of body height from feet
        const arcWorldY       = feetY + scaledSize.y * 0.72;
        // Eye visor: same as helmet (y≈0) but slightly forward
        const eyeWorldY       = feetY + scaledSize.y * HELMET_FRACTION; // ≈ 0
        // Red armor accent: between arc and helmet
        const redArmorWorldY  = arcWorldY + (eyeWorldY - arcWorldY) * 0.5;
        // Hand repulsors: low on body (~8% from feet)
        const repulsorWorldY  = feetY + scaledSize.y * 0.08;

        arcLight.position.set(0,     arcWorldY,  0.42);
        arcSprite.position.set(0,    arcWorldY,  0.42);
        eyeLight.position.set(0,     eyeWorldY,  0.38);
        redArmorLight1.position.set( 0.45, redArmorWorldY, 0.40);
        redArmorLight2.position.set(-0.45, redArmorWorldY, 0.40);
        repulsorLeftSprite.position.set( -0.88, repulsorWorldY, 0.10);
        repulsorRightSprite.position.set( 0.88, repulsorWorldY, 0.10);

        // ── Step 9: Trigger layout update with computed distance ─
        updateLayout();

        modelReadyRef.current = true;
        setModelReady(true);

        controls.update();
      },
      undefined,
      (err) => { console.error("Failed to load Iron Man GLTF:", err); }
    );

    // 12. TAB VISIBILITY — pause GPU when hidden
    let isTabActive = true;
    const handleVisibility = () => { isTabActive = !document.hidden; };
    document.addEventListener("visibilitychange", handleVisibility);

    // ============================================================
    // 13. ADAPTIVE 60 FPS RENDER LOOP
    //
    // FACE-CENTERED ZOOM:
    //   • controls.target is ALWAYS (0,0,0) = helmet face.
    //   • Wheel zoom changes camera distance along z-axis.
    //   • Zooming in naturally focuses on the face — no target
    //     shifting needed. OrbitControls handles it correctly.
    // ============================================================
    let animationFrameId: number;
    const clock = new THREE.Clock();
    let lastRenderTime = performance.now();
    let frameCount     = 0;
    let lastFpsCheck   = performance.now();

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);

      if (!stateRef.current.ironManEnabled || !isTabActive) return;

      const delta = currentTime - lastRenderTime;
      if (delta < 15) return; // 60 FPS cap
      lastRenderTime = currentTime;

      // FPS counter + adaptive pixel ratio
      frameCount++;
      if (currentTime - lastFpsCheck >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastFpsCheck));
        setCurrentFps(fps);
        if (fps < 28 && renderer.getPixelRatio() > 1.0) renderer.setPixelRatio(1.0);
        frameCount   = 0;
        lastFpsCheck = currentTime;
      }

      const elapsedTime = clock.getElapsedTime();

      // OrbitControls update — required for damping, zoom, auto-rotate
      controls.update();

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // PROCEDURAL HOVERING, BREATHING, GLOW PULSES
      if (stateRef.current.animationPlaying && !prefersReducedMotion && loadedModelRef.current) {
        const hoverY   = Math.sin(elapsedTime * 1.5) * 0.06;
        const breathing = 1.0 + Math.sin(elapsedTime * 2.2) * 0.012;

        // Hovering offsets the model in Y — shift is relative to its repositioned origin
        loadedModelRef.current.position.y = -hoverY;
        modelHoverOffsetRef.current = -hoverY;

        if (stateRef.current.arcReactorGlow) {
          arcSprite.scale.set(0.46 * breathing, 0.46 * breathing, 1);
          repulsorLeftSprite.scale.set(0.32  * breathing, 0.32  * breathing, 1);
          repulsorRightSprite.scale.set(0.32 * breathing, 0.32  * breathing, 1);
          const bm = stateRef.current.bgBrightness / 100;
          arcLight.intensity = (4.5 + Math.sin(elapsedTime * 3.5) * 1.2) * bm;
          eyeLight.intensity = (2.4 + Math.sin(elapsedTime * 2.0) * 0.6) * bm;
        }

        if (stateRef.current.redArmorGlow) {
          const bm = stateRef.current.bgBrightness / 100;
          const redPulse = (2.8 + Math.sin(elapsedTime * 3.0) * 1.0) * bm;
          redArmorLight1.intensity = redPulse;
          redArmorLight2.intensity = redPulse;
        }

        // Subtle mouse-tracking head tilt (disabled when user is dragging)
        if (!isUserOrbiting && !stateRef.current.autoRotate) {
          ironManHolder.rotation.y = mouse.x * 0.18 + Math.sin(elapsedTime * 0.8) * 0.02;
          ironManHolder.rotation.x = -mouse.y * 0.06;
        }

        ringMesh1.rotation.z += 0.003;
        ringMesh2.rotation.z -= 0.002;
        particleSystem.rotation.y += 0.0008;
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // 14. CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      clearTimeout(resizeTimer);
      if (container && renderer.domElement) container.removeChild(renderer.domElement);
      controls.dispose();
      renderer.dispose();
      particleGeo.dispose(); particleMat.dispose();
      ringGeo1.dispose();    ringMat1.dispose();
      ringGeo2.dispose();    ringMat2.dispose();
    };
  }, []);

  // 10. RESET CAMERA — returns to full-body centered view with helmet at screen center
  const handleResetCamera = useCallback(() => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.copy(defaultCamPosRef.current);
      controlsRef.current.target.copy(defaultTargetPosRef.current);
      controlsRef.current.update();
      setAutoRotate(false);
    }
  }, []);

  return (
    <>
      {/* ============================================================ */}
      {/* LAYER 1 — 3D IRON MAN CANVAS                                 */}
      {/*   z-0  : behind all website content                          */}
      {/*   pointer-events-none: does NOT intercept clicks or scroll   */}
      {/*   Only gains pointer-events when Interactive 3D is enabled   */}
      {/* ============================================================ */}
      <div
        className={`fixed inset-0 overflow-hidden transition-opacity duration-500 ${
          ironManEnabled ? "opacity-100" : "opacity-0 pointer-events-none"
        } ${interactive3D || isFullscreen ? "pointer-events-auto z-40" : "pointer-events-none z-0"}`}
        style={{ isolation: "auto" }}
        aria-hidden="true"
      >
        <div ref={containerRef} className="absolute inset-0" />
      </div>

      {/* ============================================================ */}
      {/* LAYER 2 — CYBER BACKGROUND (shown when Iron Man is OFF)       */}
      {/* ============================================================ */}
      {!ironManEnabled && (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden transition-opacity duration-700">
          <div className="absolute inset-0 bg-[#050711]" />
          <div className="absolute inset-0 tech-grid opacity-20" />
          <div className="absolute top-1/4 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/3 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px]" />
          <div className="absolute top-2/3 left-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-16 right-16 text-right opacity-30 select-none hidden md:block">
            <div className="text-3xl font-extrabold font-mono tracking-widest text-[#00f0ff]/25">
              STARK TECH // STANDBY
            </div>
            <div className="text-xs font-mono text-gray-500 mt-1">
              IRON MAN 3D BACKGROUND OFF • 100% GPU CONSERVED
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* LAYER 3 — SUBTLE DARK OVERLAY (adjustable opacity)           */}
      {/* ============================================================ */}
      {ironManEnabled && (
        <div
          className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-300"
          style={{ opacity: bgOpacity / 100 }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#050711]/50 via-transparent to-[#050711]/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050711]/70 via-transparent to-[#050711]/30" />
        </div>
      )}

      {/* ============================================================ */}
      {/* FULLSCREEN EXIT BANNER                                        */}
      {/* ============================================================ */}
      {isFullscreen && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-2.5 rounded-full bg-[#080d21]/95 backdrop-blur-2xl border border-[#00f0ff]/60 shadow-neon-cyan text-xs font-mono text-white animate-bounce">
          <Sparkles className="w-4 h-4 text-[#00f0ff]" />
          <span>FULLSCREEN 3D — SCROLL TO ZOOM • DRAG TO ORBIT</span>
          <button
            onClick={() => setIsFullscreen(false)}
            className="px-3 py-1 rounded-full bg-[#00f0ff] text-black font-bold hover:scale-105 transition-transform"
          >
            Exit 3D View
          </button>
        </div>
      )}

      {/* ============================================================ */}
      {/* LAYER 5 — COMPACT FLOATING CONTROLS PANEL (z-50)             */}
      {/* ============================================================ */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-2 font-mono select-none">

        {/* EXPANDED CONSOLE */}
        {!panelCollapsed && (
          <div className="w-72 sm:w-80 max-h-[min(520px,65vh)] overflow-y-auto rounded-2xl bg-[#080e23]/95 backdrop-blur-2xl border border-[#00f0ff]/40 p-4 shadow-2xl shadow-black/90 space-y-3 transition-all duration-300 scrollbar-thin">

            {/* Panel Header */}
            <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${ironManEnabled ? "bg-[#00f0ff] animate-ping" : "bg-gray-500"}`} />
                <span className="font-bold text-white tracking-wider text-[12px]">Iron Man 3D Controls</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-400 font-mono flex items-center gap-1">
                  <Gauge className="w-3 h-3 text-emerald-400" />
                  {currentFps} FPS
                </span>
                <button onClick={() => setPanelCollapsed(true)} className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors" title="Close controls">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 1. IRON MAN ON/OFF */}
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-2 text-white">
                  <Power className={`w-4 h-4 ${ironManEnabled ? "text-[#00f0ff]" : "text-gray-400"}`} />
                  <span>Iron Man 3D Background</span>
                </div>
                <button
                  onClick={() => setIronManEnabled(!ironManEnabled)}
                  className={`px-3 py-1 rounded-full text-xs font-extrabold tracking-wider transition-all ${
                    ironManEnabled ? "bg-[#00f0ff] text-black shadow-neon-cyan" : "bg-red-500/20 text-red-400 border border-red-500/40"
                  }`}
                >
                  {ironManEnabled ? "ON" : "OFF"}
                </button>
              </div>
              <p className="text-[10px] text-gray-400 leading-tight">
                {ironManEnabled
                  ? "Helmet face at screen center • scroll to zoom toward face"
                  : "3D model hidden • 100% GPU paused • Clean cyber theme"}
              </p>
            </div>

            {ironManEnabled && (
              <>
                {/* 2 / 3 / 4 / 9 TOGGLE GRID */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {/* 2. Motion */}
                  <button
                    onClick={() => setAnimationPlaying(!animationPlaying)}
                    className={`flex items-center justify-between p-2 rounded-xl border text-left transition-all ${
                      animationPlaying
                        ? "bg-[#00f0ff]/15 border-[#00f0ff]/50 text-cyan-300"
                        : "bg-white/5 border-white/10 text-gray-400"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      {animationPlaying ? <Play className="w-3.5 h-3.5 text-[#00f0ff]" /> : <Pause className="w-3.5 h-3.5" />}
                      <span className="text-[11px] font-semibold">Motion</span>
                    </div>
                    <span className="text-[10px] font-bold">{animationPlaying ? "PLAY" : "PAUSE"}</span>
                  </button>

                  {/* 3. Red Glow */}
                  <button
                    onClick={() => setRedArmorGlow(!redArmorGlow)}
                    className={`flex items-center justify-between p-2 rounded-xl border text-left transition-all ${
                      redArmorGlow
                        ? "bg-red-500/15 border-red-500/50 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                        : "bg-white/5 border-white/10 text-gray-400"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-red-500" />
                      <span className="text-[11px] font-semibold">Red Glow</span>
                    </div>
                    <span className="text-[10px] font-bold">{redArmorGlow ? "ON" : "OFF"}</span>
                  </button>

                  {/* 4. Arc Reactor */}
                  <button
                    onClick={() => setArcReactorGlow(!arcReactorGlow)}
                    className={`flex items-center justify-between p-2 rounded-xl border text-left transition-all ${
                      arcReactorGlow
                        ? "bg-cyan-500/15 border-cyan-500/50 text-cyan-300 shadow-neon-cyan"
                        : "bg-white/5 border-white/10 text-gray-400"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-[#00f0ff]" />
                      <span className="text-[11px] font-semibold">Reactor</span>
                    </div>
                    <span className="text-[10px] font-bold">{arcReactorGlow ? "ON" : "OFF"}</span>
                  </button>

                  {/* 9. Auto Rotate */}
                  <button
                    onClick={() => setAutoRotate(!autoRotate)}
                    className={`flex items-center justify-between p-2 rounded-xl border text-left transition-all ${
                      autoRotate
                        ? "bg-purple-500/20 border-purple-500 text-purple-300 shadow-neon-purple"
                        : "bg-white/5 border-white/10 text-gray-400"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? "animate-spin text-purple-400" : ""}`} />
                      <span className="text-[11px] font-semibold">Rotate</span>
                    </div>
                    <span className="text-[10px] font-bold">{autoRotate ? "ON" : "OFF"}</span>
                  </button>
                </div>

                {/* SLIDERS */}
                <div className="space-y-2.5 pt-1 border-t border-white/10 text-xs">
                  {/* 5. Brightness */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-gray-300 text-[11px]">
                      <span className="flex items-center gap-1.5"><Sun className="w-3.5 h-3.5 text-amber-400" /><span>Background Brightness</span></span>
                      <span className="font-bold text-amber-400">{bgBrightness}%</span>
                    </div>
                    <input type="range" min="50" max="200" step="5" value={bgBrightness}
                      onChange={(e) => setBgBrightness(Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer h-1.5 bg-white/10 rounded-lg" />
                  </div>

                  {/* 6. Overlay Opacity */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-gray-300 text-[11px]">
                      <span className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5 text-cyan-400" /><span>Dark Overlay Opacity</span></span>
                      <span className="font-bold text-cyan-400">{bgOpacity}%</span>
                    </div>
                    <input type="range" min="0" max="80" step="5" value={bgOpacity}
                      onChange={(e) => setBgOpacity(Number(e.target.value))}
                      className="w-full accent-[#00f0ff] cursor-pointer h-1.5 bg-white/10 rounded-lg" />
                  </div>

                  {/* 7. Card Opacity */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-gray-300 text-[11px]">
                      <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5 text-purple-400" /><span>Card Surface Opacity</span></span>
                      <span className="font-bold text-purple-400">{contentVisibility}%</span>
                    </div>
                    <input type="range" min="50" max="100" step="5" value={contentVisibility}
                      onChange={(e) => setContentVisibility(Number(e.target.value))}
                      className="w-full accent-[#8b5cf6] cursor-pointer h-1.5 bg-white/10 rounded-lg" />
                  </div>

                  {/* 8. Model Scale */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-gray-300 text-[11px]">
                      <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-red-400" /><span>Iron Man Scale</span></span>
                      <span className="font-bold text-red-400">{modelScale.toFixed(2)}x</span>
                    </div>
                    <input type="range" min="0.6" max="1.6" step="0.05" value={modelScale}
                      onChange={(e) => setModelScale(Number(e.target.value))}
                      className="w-full accent-red-500 cursor-pointer h-1.5 bg-white/10 rounded-lg" />
                  </div>
                </div>

                {/* CAMERA ACTIONS */}
                <div className="pt-2 border-t border-white/10 space-y-2">
                  {/* Interactive 3D Orbit toggle */}
                  <button
                    onClick={() => setInteractive3D(!interactive3D)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                      interactive3D
                        ? "bg-[#00f0ff] text-black shadow-neon-cyan"
                        : "bg-white/5 border border-white/10 text-gray-200 hover:border-[#00f0ff]/40 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Move3D className="w-4 h-4" />
                      <span>Interactive 3D Orbit &amp; Zoom</span>
                    </div>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-black/20">
                      {interactive3D ? "ACTIVE" : "OFF"}
                    </span>
                  </button>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {/* 10. Reset Camera */}
                    <button
                      onClick={handleResetCamera}
                      className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-all text-center"
                      title="Reset Camera — helmet at screen center"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="text-[11px]">Reset View</span>
                    </button>

                    {/* 11. Fullscreen */}
                    <button
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-[#00f0ff] transition-all text-center"
                      title="Fullscreen 3D View"
                    >
                      {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />}
                      <span className="text-[11px]">{isFullscreen ? "Exit Full" : "Fullscreen"}</span>
                    </button>
                  </div>
                </div>

                {/* Model status */}
                {modelReady && (
                  <p className="text-[9px] text-emerald-400/70 text-center">
                    ✓ Helmet centered at screen center • scroll to zoom toward face
                  </p>
                )}
              </>
            )}

            {/* Attribution */}
            <div className="pt-2 border-t border-white/10 text-[9px] text-gray-400 flex items-center justify-between">
              <span>Model: Sketchfab (Grant Riley)</span>
              <span className="text-cyan-400">CC-BY-NC-4.0</span>
            </div>
          </div>
        )}

        {/* 12. FLOATING TOGGLE BUTTON */}
        <button
          onClick={() => setPanelCollapsed(!panelCollapsed)}
          className={`flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full backdrop-blur-xl border text-xs font-bold transition-all shadow-xl hover:scale-105 ${
            ironManEnabled
              ? "bg-[#080e23]/95 border-[#00f0ff]/50 text-white shadow-neon-cyan"
              : "bg-[#0f172a]/95 border-gray-600 text-gray-300 hover:border-[#00f0ff]"
          }`}
          title="Toggle Iron Man 3D Controls"
        >
          <Sliders className={`w-4 h-4 ${ironManEnabled ? "text-[#00f0ff]" : "text-gray-400"}`} />
          <span>{panelCollapsed ? "Iron Man 3D Controls" : "Close Controls"}</span>
          {panelCollapsed ? <ChevronUp className="w-4 h-4 text-cyan-400" /> : <ChevronDown className="w-4 h-4 text-cyan-400" />}
        </button>
      </div>
    </>
  );
}
