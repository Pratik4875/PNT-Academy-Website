"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Float } from "@react-three/drei";
import { Suspense, useState } from "react";
import BaymaxRobot from "./BaymaxRobot";

export default function ContactBaymax3DScene() {
    const [clicked, setClicked] = useState(false);

    return (
        <div className="h-full w-full relative">
            <Canvas
                camera={{ position: [0, 0.5, 6], fov: 40 }}
                gl={{ alpha: true, antialias: true }}
            >
                <Suspense fallback={null}>
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[5, 8, 5]} intensity={1} />
                    <spotLight position={[-5, 5, 5]} angle={0.3} penumbra={1} intensity={0.6} />
                    <Environment preset="city" />

                    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.4}>
                        <BaymaxRobot
                            scale={1}
                            position={[0, -0.5, 0]}
                            onClick={() => setClicked(!clicked)}
                        />
                    </Float>

                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        minPolarAngle={Math.PI / 3}
                        maxPolarAngle={Math.PI / 1.8}
                        autoRotate
                        autoRotateSpeed={0.5}
                    />
                </Suspense>
            </Canvas>

            {clicked && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 rounded-xl px-4 py-2 shadow-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 whitespace-nowrap z-10 animate-fade-in">
                    👋 Hello! I&apos;m Robo-PNT — here to help!
                </div>
            )}
        </div>
    );
}
