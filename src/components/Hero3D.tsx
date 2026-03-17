"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense, useState, useEffect } from "react";
import { AGV } from "./AGV";

// Helper component to disable OrbitControls on mobile
function ResponsiveOrbitControls(props: any) {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <OrbitControls 
            {...props} 
            enableZoom={false} 
            enablePan={false}
            enableRotate={!isMobile} // Disable rotation on mobile so scrolling works
        />
    );
}

export default function Hero3D() {
    return (
        <div className="absolute inset-0 z-0 h-full w-full">
            <Canvas
                shadows
                camera={{ position: [0, 2, 10], fov: 45 }}
                gl={{ alpha: true, antialias: true, toneMappingExposure: 0.9 }}
            >
                <Suspense fallback={null}>
                    {/* Lighting setup for a dark, high-contrast aesthetic */}
                    <ambientLight intensity={0.4} />
                    <directionalLight position={[10, 10, 10]} castShadow intensity={1.2} />
                    <spotLight position={[-10, 10, 10]} angle={0.2} penumbra={1} intensity={0.8} />
                    <pointLight position={[-10, -10, -10]} intensity={0.3} />

                    {/* Environment map adds realistic reflections onto the GLB (like metal parts) */}
                    <Environment preset="night" />

                    {/* Adjusted scale strictly to fit within borders while maintaining prominent size */}
                    <AGV scale={6} position={[0, 0, 0]} />

                    {/* Let the user rotate the camera slightly, but restrict dramatic zooms/pans */}
                    <ResponsiveOrbitControls
                        minPolarAngle={Math.PI / 3}
                        maxPolarAngle={Math.PI / 1.5}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}
