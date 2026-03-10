"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, OrbitControls, Float, useGLTF } from "@react-three/drei";
import { Suspense, useRef, useState, useCallback, useMemo } from "react";
import * as THREE from "three";

/**
 * Robo-PNT — A curious little robot with personality.
 * 
 * Personality traits:
 * - Curious: follows your mouse like it's watching you
 * - Playful: bounces and wobbles when you click it
 * - Alive: breathes, sways, and occasionally looks around on its own
 * - Shy: slightly recoils then perks up on hover
 * - Chatty: shows different messages each time you click
 */
function RoboPNTModel() {
    const groupRef = useRef<THREE.Group>(null);
    const { scene } = useGLTF("/models/robo-pnt.glb");
    const [bounce, setBounce] = useState(0);
    const [hovered, setHovered] = useState(false);
    const bounceTime = useRef(0);
    const idlePhase = useRef(Math.random() * 100); // random start so it feels natural

    // Configure metallic materials at runtime for maximum shine
    useMemo(() => {
        scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                if (mesh.material) {
                    const mat = mesh.material as THREE.MeshStandardMaterial;
                    mat.metalness = 0.92;
                    mat.roughness = 0.1;
                    mat.envMapIntensity = 2.0;
                }
            }
        });
    }, [scene]);

    const handleClick = useCallback(() => {
        setBounce(b => b + 1);
        bounceTime.current = 0;
    }, []);

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        const t = state.clock.getElapsedTime();
        const g = groupRef.current;

        // ──────────────────────────────────────────────
        // 1. CURIOUS MOUSE FOLLOWING
        // The robot tracks your cursor like a curious pet
        // ──────────────────────────────────────────────
        const targetRotY = state.pointer.x * 0.5;
        const targetRotX = -state.pointer.y * 0.25;

        g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, targetRotY + Math.PI, 0.05);
        g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, targetRotX, 0.05);

        // ──────────────────────────────────────────────
        // 2. IDLE PERSONALITY — "Looking around"
        // Every few seconds, the robot looks around as if curious
        // ──────────────────────────────────────────────
        const idleT = t + idlePhase.current;
        const lookCycle = Math.sin(idleT * 0.3) * Math.sin(idleT * 0.17); // irregular
        g.rotation.y += lookCycle * 0.08;

        // Head bob — like nodding or bobbing to music
        g.position.y = -1.1 + Math.sin(t * 1.2) * 0.03;

        // ──────────────────────────────────────────────
        // 3. BREATHING — subtle scale pulse
        // ──────────────────────────────────────────────
        const breathe = Math.sin(t * 1.6) * 0.02;
        const baseScale = hovered ? 2.4 : 2.2;
        g.scale.setScalar(baseScale + breathe);

        // ──────────────────────────────────────────────
        // 4. BODY SWAY — gentle side-to-side rocking
        // ──────────────────────────────────────────────
        g.rotation.z = Math.sin(t * 0.6) * 0.04 + Math.sin(t * 1.3) * 0.02;

        // ──────────────────────────────────────────────
        // 5. CLICK BOUNCE — squash & stretch physics
        // ──────────────────────────────────────────────
        if (bounce > 0) {
            bounceTime.current += delta;
            const bt = bounceTime.current;
            if (bt < 1.5) {
                const decay = Math.max(0, 1 - bt / 1.5);
                // Jump arc
                const jumpHeight = Math.sin(bt * Math.PI / 0.35) * 0.5 * decay;
                g.position.y = -1.1 + Math.abs(jumpHeight);

                // Squash & stretch
                const squash = 1 + Math.sin(bt * Math.PI * 5) * 0.1 * decay;
                g.scale.x = baseScale * (2 - squash);
                g.scale.y = baseScale * squash;
                g.scale.z = baseScale * (2 - squash);

                // Spin during bounce
                g.rotation.y += delta * 4 * decay;
            } else {
                g.position.y = -1.1;
                setBounce(0);
            }
        }
    });

    return (
        <group
            ref={groupRef}
            position={[0, -1.1, 0]}
            onClick={handleClick}
            onPointerOver={() => { setHovered(true); document.body.style.cursor = "pointer"; }}
            onPointerOut={() => { setHovered(false); document.body.style.cursor = "auto"; }}
        >
            <primitive object={scene} />
            {/* Purple rim glow on hover */}
            {hovered && (
                <pointLight position={[0, 1, 2]} intensity={3} color="#7c3aed" distance={5} />
            )}
        </group>
    );
}

function SubtleGlow() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.4, 0]}>
            <circleGeometry args={[3, 64]} />
            <meshStandardMaterial
                color="#7c3aed"
                transparent
                opacity={0.08}
                metalness={0.5}
                roughness={0.8}
            />
        </mesh>
    );
}

function FloatingParticles() {
    const particlesRef = useRef<THREE.Points>(null);
    const count = 60;

    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            arr[i * 3] = (Math.random() - 0.5) * 10;
            arr[i * 3 + 1] = Math.random() * 6 - 2;
            arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
        }
        return arr;
    }, []);

    useFrame((state) => {
        if (!particlesRef.current) return;
        const t = state.clock.getElapsedTime();
        particlesRef.current.rotation.y = t * 0.03;
        const posArr = particlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < count; i++) {
            posArr[i * 3 + 1] += Math.sin(t * 0.5 + i * 0.7) * 0.002;
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial size={0.04} color="#818cf8" transparent opacity={0.5} sizeAttenuation />
        </points>
    );
}

useGLTF.preload("/models/robo-pnt.glb");

export default function ContactBaymax3DScene() {
    const [clickCount, setClickCount] = useState(0);

    // Personality messages — the robot says different things each click
    const messages = [
        "👋 Hey there! I'm Robo-PNT!",
        "🤖 I was built by PNT Academy",
        "💬 I love answering questions — try the chatbot!",
        "🚀 We teach Robotics, AI & IoT to kids!",
        "✨ Click me again, I dare you!",
        "🎓 Want to learn robotics? You're in the right place!",
        "🤝 Let's connect — fill the form below!",
    ];

    return (
        <div className="h-full w-full relative">
            <Canvas
                camera={{ position: [0, 0.3, 5], fov: 36 }}
                gl={{ alpha: true, antialias: true, toneMappingExposure: 1.3 }}
                onClick={() => setClickCount(c => c + 1)}
            >
                <Suspense fallback={null}>
                    {/* Dramatic studio lighting for metallic robot */}
                    <ambientLight intensity={0.25} />
                    <directionalLight position={[4, 8, 3]} intensity={1.8} color="#e0e7ff" castShadow />
                    <directionalLight position={[-4, 3, -2]} intensity={0.6} color="#c084fc" />
                    <spotLight position={[0, 12, 5]} angle={0.2} penumbra={1} intensity={1.5} color="#ffffff" castShadow />
                    <pointLight position={[-4, -1, 4]} intensity={0.5} color="#60a5fa" />
                    <pointLight position={[4, 0, -3]} intensity={0.3} color="#a78bfa" />
                    <Environment preset="night" />

                    <Float speed={1.2} rotationIntensity={0} floatIntensity={0.2}>
                        <RoboPNTModel />
                    </Float>

                    <FloatingParticles />
                    <SubtleGlow />

                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        minPolarAngle={Math.PI / 3}
                        maxPolarAngle={Math.PI / 1.8}
                    />
                </Suspense>
            </Canvas>

            {/* Speech bubble */}
            {clickCount > 0 && (
                <div
                    key={clickCount}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-2xl px-5 py-3 shadow-2xl border border-violet-200/50 dark:border-violet-500/30 text-sm font-medium text-slate-700 dark:text-slate-200 z-10"
                    style={{ animation: "speechBubble 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
                >
                    {messages[(clickCount - 1) % messages.length]}
                </div>
            )}

            <style jsx>{`
                @keyframes speechBubble {
                    0% { opacity: 0; transform: translate(-50%, 12px) scale(0.9); }
                    100% { opacity: 1; transform: translate(-50%, 0) scale(1); }
                }
            `}</style>
        </div>
    );
}
