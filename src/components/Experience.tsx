'use client'
import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { Computer } from '@/components/Computer'
import { HelloTriangle } from '@/components/HelloTriangle'

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
            enableRotate={!isMobile}
        />
    );
}

export const Experience = () => {
    return (
        <Canvas
            camera={{ position: [0, 2, 8], fov: 45 }}
            shadows
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        >
            <color attach="background" args={['#1e1b4b']} />
            {/* Dark blue background for tech feel */}

            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={1} />

            <Suspense fallback={null}>
                {/* <Computer />  Currently replaced by Hello Triangle Demo */}
                <HelloTriangle />
                <Environment preset="city" />
                <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2.5} far={4} />
            </Suspense>
            {/* Allow looking around but limit interaction to keep PC in view */}
            <ResponsiveOrbitControls
                enableZoom={true}
                minDistance={5}
                maxDistance={15}
                minPolarAngle={Math.PI / 2.5}
                maxPolarAngle={Math.PI / 2}
            />
        </Canvas>
    )
}
