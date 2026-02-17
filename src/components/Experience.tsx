
'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Robot } from './Robot'
import { CardRing } from './CardRing'

export const Experience = () => {
    return (
        <Canvas camera={{ position: [0, 2, 8], fov: 45 }} shadows>
            <color attach="background" args={['#1e1b4b']} />
            {/* Dark blue background for tech feel */}

            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={1} />

            <Robot />
            <CardRing />

            <Environment preset="city" />
            <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 2} />
        </Canvas>
    )
}
