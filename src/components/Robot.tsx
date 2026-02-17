
'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'
import * as THREE from 'three'

export const Robot = () => {
    const headRef = useRef<Group>(null)
    const groupRef = useRef<Group>(null)
    const leftArmRef = useRef<Group>(null)
    const rightArmRef = useRef<Group>(null)

    useFrame((state) => {
        if (!headRef.current || !groupRef.current || !leftArmRef.current || !rightArmRef.current) return

        // Smooth mouse follow
        const t = state.clock.getElapsedTime()
        const mouseX = state.mouse.x * 2
        const mouseY = state.mouse.y * 1

        // Head rotation (Look at mouse)
        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, mouseX * 0.5, 0.1)
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -mouseY * 0.5, 0.1)

        // Body gentle float
        groupRef.current.position.y = Math.sin(t) * 0.1
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX * 0.1, 0.05)

        // Arms follow mouse (simulate reaching)
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, -mouseY * 0.5 - 0.5, 0.1)
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, -mouseY * 0.5 - 0.5, 0.1)
    })

    return (
        <group ref={groupRef} position={[0, -1, 0]}>
            {/* Head */}
            <group ref={headRef} position={[0, 1.7, 0]}>
                <mesh castShadow receiveShadow>
                    <boxGeometry args={[0.8, 0.6, 0.6]} />
                    <meshStandardMaterial color="#4f46e5" roughness={0.3} metalness={0.8} />
                </mesh>
                {/* Antennas */}
                <mesh position={[0.2, 0.4, 0]}>
                    <cylinderGeometry args={[0.02, 0.02, 0.4]} />
                    <meshStandardMaterial color="#94a3b8" />
                </mesh>
                <mesh position={[-0.2, 0.4, 0]}>
                    <cylinderGeometry args={[0.02, 0.02, 0.4]} />
                    <meshStandardMaterial color="#94a3b8" />
                </mesh>

                {/* Eyes */}
                <mesh position={[0.2, 0, 0.31]}>
                    <sphereGeometry args={[0.08, 16, 16]} />
                    <meshStandardMaterial color="#00ffcc" emissive="#00ffcc" emissiveIntensity={2} />
                </mesh>
                <mesh position={[-0.2, 0, 0.31]}>
                    <sphereGeometry args={[0.08, 16, 16]} />
                    <meshStandardMaterial color="#00ffcc" emissive="#00ffcc" emissiveIntensity={2} />
                </mesh>
            </group>

            {/* Body */}
            <group position={[0, 0.5, 0]}>
                <mesh castShadow receiveShadow>
                    <cylinderGeometry args={[0.4, 0.6, 1.4, 32]} />
                    <meshStandardMaterial color="#cbd5e1" roughness={0.4} metalness={0.6} />
                </mesh>

                {/* Details */}
                <mesh position={[0, 0, 0.41]}>
                    <boxGeometry args={[0.4, 0.6, 0.02]} />
                    <meshStandardMaterial color="#0f172a" />
                </mesh>
                {/* Glowing Core */}
                <mesh position={[0, 0.1, 0.42]}>
                    <circleGeometry args={[0.1, 32]} />
                    <meshBasicMaterial color="#3b82f6" />
                </mesh>
            </group>

            {/* Arms */}
            <group ref={rightArmRef} position={[0.7, 1, 0]} rotation={[0, 0, -0.2]}>
                <mesh castShadow>
                    <capsuleGeometry args={[0.12, 1.2, 4, 8]} />
                    <meshStandardMaterial color="#475569" roughness={0.5} />
                </mesh>
                <mesh position={[0, -0.7, 0]}>
                    <sphereGeometry args={[0.15]} />
                    <meshStandardMaterial color="#334155" />
                </mesh>
            </group>
            <group ref={leftArmRef} position={[-0.7, 1, 0]} rotation={[0, 0, 0.2]}>
                <mesh castShadow>
                    <capsuleGeometry args={[0.12, 1.2, 4, 8]} />
                    <meshStandardMaterial color="#475569" roughness={0.5} />
                </mesh>
                <mesh position={[0, -0.7, 0]}>
                    <sphereGeometry args={[0.15]} />
                    <meshStandardMaterial color="#334155" />
                </mesh>
            </group>
        </group>
    )
}
