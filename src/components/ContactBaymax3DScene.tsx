"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, Float, useGLTF } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";

function RoboPNTModel({ onClick }: { onClick?: () => void }) {
    const groupRef = useRef<THREE.Group>(null);
    const { scene } = useGLTF("/models/robo-pnt.glb");
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (!groupRef.current) return;
        const t = state.clock.getElapsedTime();

        // Gentle breathing / idle animation
        groupRef.current.scale.y = 1 + Math.sin(t * 1.5) * 0.02;

        // Slight rotation following mouse
        const mouseX = state.pointer.x * 0.3;
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
            groupRef.current.rotation.y,
            mouseX + Math.PI,  // face front
            0.05
        );
    });

    return (
        <group
            ref={groupRef}
            onClick={onClick}
            onPointerOver={() => { setHovered(true); document.body.style.cursor = "pointer"; }}
            onPointerOut={() => { setHovered(false); document.body.style.cursor = "auto"; }}
            scale={hovered ? 2.2 : 2}
            position={[0, -1.2, 0]}
        >
            <primitive object={scene} />
        </group>
    );
}

// Preload the model
useGLTF.preload("/models/robo-pnt.glb");

export default function ContactBaymax3DScene() {
    const [clicked, setClicked] = useState(false);

    return (
        <div className="h-full w-full relative">
            <Canvas
                camera={{ position: [0, 0.5, 5], fov: 40 }}
                gl={{ alpha: true, antialias: true }}
            >
                <Suspense fallback={null}>
                    <ambientLight intensity={0.7} />
                    <directionalLight position={[5, 8, 5]} intensity={1.2} />
                    <spotLight position={[-5, 5, 5]} angle={0.3} penumbra={1} intensity={0.6} color="#a78bfa" />
                    <pointLight position={[0, -2, 3]} intensity={0.3} color="#60a5fa" />
                    <Environment preset="city" />

                    <Float speed={2} rotationIntensity={0.15} floatIntensity={0.5}>
                        <RoboPNTModel onClick={() => setClicked(!clicked)} />
                    </Float>

                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        minPolarAngle={Math.PI / 3}
                        maxPolarAngle={Math.PI / 1.8}
                        autoRotate
                        autoRotateSpeed={0.8}
                    />
                </Suspense>
            </Canvas>

            {clicked && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 rounded-xl px-4 py-2 shadow-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 whitespace-nowrap z-10 animate-fade-in">
                    👋 Hello! I&apos;m Robo-PNT — click the chat icon to talk!
                </div>
            )}
        </div>
    );
}
