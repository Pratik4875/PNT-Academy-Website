"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Float } from "@react-three/drei";
import { Suspense, useState } from "react";
import { AGV } from "./AGV";
import BaymaxRobot from "./BaymaxRobot";

export default function Hero3D() {
    const [baymaxClicked, setBaymaxClicked] = useState(false);

    return (
        <div className="absolute inset-0 z-0 h-full w-full">
            <Canvas
                shadows
                camera={{ position: [0, 1, 10], fov: 45 }}
                gl={{ alpha: true, antialias: true, toneMappingExposure: 0.9 }}
            >
                <Suspense fallback={null}>
                    {/* Lighting setup */}
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 10]} castShadow intensity={1.2} />
                    <spotLight position={[-10, 10, 10]} angle={0.2} penumbra={1} intensity={0.8} />
                    <pointLight position={[-10, -10, -10]} intensity={0.3} />

                    {/* Environment map for reflections */}
                    <Environment preset="night" />

                    {/* AGV Robot model (existing) — shifted left */}
                    <AGV scale={5} position={[-2.5, -1, 0]} />

                    {/* Baymax Robot — shifted right, floating */}
                    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
                        <BaymaxRobot
                            scale={1.2}
                            position={[2.5, 0, 0]}
                            onClick={() => setBaymaxClicked(!baymaxClicked)}
                        />
                    </Float>

                    {/* Camera controls */}
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        minPolarAngle={Math.PI / 3}
                        maxPolarAngle={Math.PI / 1.5}
                    />
                </Suspense>
            </Canvas>

            {/* Baymax speech bubble */}
            {baymaxClicked && (
                <div className="absolute bottom-8 right-8 bg-white dark:bg-slate-900 rounded-2xl px-6 py-4 shadow-2xl border border-slate-200 dark:border-slate-700 max-w-xs animate-fade-in z-20">
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                        👋 Hello! I am <strong>Robo-PNT</strong>. Click the chat icon below to talk to me!
                    </p>
                    <div className="absolute -bottom-2 right-12 w-4 h-4 bg-white dark:bg-slate-900 border-b border-r border-slate-200 dark:border-slate-700 rotate-45" />
                </div>
            )}
        </div>
    );
}
