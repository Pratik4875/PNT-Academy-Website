'use client'

import { useRef, useState } from 'react'
import { Image as DreiImage, Text, useCursor } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useRouter } from 'next/navigation'

interface CardProps {
    position: [number, number, number]
    rotation: [number, number, number]
    url: string
    title: string
    link: string
}

export const Card = ({ position, rotation, url, title, link }: CardProps) => {
    const ref = useRef<THREE.Group>(null)
    const [hovered, setHover] = useState(false)

    useCursor(hovered)
    const router = useRouter()

    useFrame((state, delta) => {
        if (!ref.current) return

        // Smooth scale on hover
        const targetScale = hovered ? 1.2 : 1
        ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 10)

        // Floating effect
        ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1
    })

    return (
        <group
            ref={ref}
            position={position}
            rotation={rotation}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
            onClick={() => {
                // Navigate or open link
                if (link.startsWith('http')) {
                    window.open(link, '_blank')
                } else {
                    router.push(link)
                }
            }}
        >
            {/* Frame */}
            <mesh position={[0, 0, -0.05]}>
                <planeGeometry args={[2.2, 3.2]} />
                <meshStandardMaterial color={hovered ? "#6366f1" : "#1e293b"} />
            </mesh>

            {/* Image Content */}
            <DreiImage
                url={url}
                transparent
                side={THREE.DoubleSide}
                scale={[2, 3, 1]}
            />

            {/* Title Text */}
            <Text
                position={[0, -1.8, 0]}
                fontSize={0.2}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                {title}
            </Text>
        </group>
    )
}
