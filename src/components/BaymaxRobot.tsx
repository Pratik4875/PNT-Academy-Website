"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Procedural Baymax-inspired friendly robot built entirely from Three.js primitives.
 * - Round, white, friendly aesthetic
 * - Eyes follow mouse / react to hover
 * - Gentle floating animation
 * - Waves on click
 */
export default function BaymaxRobot({ onClick, ...props }: { onClick?: () => void } & JSX.IntrinsicElements["group"]) {
    const groupRef = useRef<THREE.Group>(null);
    const leftEyeRef = useRef<THREE.Mesh>(null);
    const rightEyeRef = useRef<THREE.Mesh>(null);
    const leftArmRef = useRef<THREE.Group>(null);
    const rightArmRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);
    const [waving, setWaving] = useState(false);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        // Gentle floating bob
        if (groupRef.current) {
            groupRef.current.position.y = Math.sin(t * 0.8) * 0.15;
            // Slight rotation toward mouse
            const mouseX = state.pointer.x * 0.3;
            const mouseY = state.pointer.y * 0.15;
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX, 0.05);
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouseY * 0.2, 0.05);
        }

        // Eyes follow mouse slightly
        if (leftEyeRef.current && rightEyeRef.current) {
            const eyeX = state.pointer.x * 0.08;
            const eyeY = state.pointer.y * 0.05;
            leftEyeRef.current.position.x = -0.25 + eyeX;
            leftEyeRef.current.position.y = 0.1 + eyeY;
            rightEyeRef.current.position.x = 0.25 + eyeX;
            rightEyeRef.current.position.y = 0.1 + eyeY;
        }

        // Waving animation for right arm
        if (rightArmRef.current) {
            if (waving) {
                rightArmRef.current.rotation.z = Math.sin(t * 8) * 0.4 - 1.2;
            } else {
                rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, -0.3, 0.05);
            }
        }

        // Subtle arm sway
        if (leftArmRef.current && !waving) {
            leftArmRef.current.rotation.z = Math.sin(t * 0.5) * 0.05 + 0.3;
        }
    });

    const handleClick = () => {
        setWaving(true);
        setTimeout(() => setWaving(false), 2000);
        onClick?.();
    };

    // Materials
    const bodyMat = (
        <meshStandardMaterial
            color={hovered ? "#f0f8ff" : "#ffffff"}
            roughness={0.3}
            metalness={0.05}
            envMapIntensity={0.5}
        />
    );

    return (
        <group
            ref={groupRef}
            {...props}
            onClick={handleClick}
            onPointerOver={() => { setHovered(true); document.body.style.cursor = "pointer"; }}
            onPointerOut={() => { setHovered(false); document.body.style.cursor = "auto"; }}
        >
            {/* ─── BODY (big round marshmallow) ─── */}
            <mesh position={[0, -0.8, 0]} castShadow>
                <sphereGeometry args={[1.3, 32, 32]} />
                {bodyMat}
            </mesh>

            {/* ─── HEAD ─── */}
            <mesh position={[0, 0.7, 0]} castShadow>
                <sphereGeometry args={[0.8, 32, 32]} />
                {bodyMat}
            </mesh>

            {/* ─── EYE LINE (the connecting line between eyes, Baymax style) ─── */}
            <mesh position={[0, 0.8, 0.76]}>
                <boxGeometry args={[0.7, 0.03, 0.02]} />
                <meshStandardMaterial color="#2a2a2a" />
            </mesh>

            {/* ─── LEFT EYE ─── */}
            <mesh ref={leftEyeRef} position={[-0.25, 0.8, 0.76]}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial color="#1a1a1a" />
            </mesh>

            {/* ─── RIGHT EYE ─── */}
            <mesh ref={rightEyeRef} position={[0.25, 0.8, 0.76]}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial color="#1a1a1a" />
            </mesh>

            {/* ─── LEFT ARM ─── */}
            <group ref={leftArmRef} position={[-1.3, -0.5, 0]} rotation={[0, 0, 0.3]}>
                {/* Upper arm */}
                <mesh position={[0, -0.3, 0]} castShadow>
                    <capsuleGeometry args={[0.22, 0.6, 8, 16]} />
                    {bodyMat}
                </mesh>
                {/* Hand */}
                <mesh position={[0, -0.8, 0]} castShadow>
                    <sphereGeometry args={[0.25, 16, 16]} />
                    {bodyMat}
                </mesh>
            </group>

            {/* ─── RIGHT ARM ─── */}
            <group ref={rightArmRef} position={[1.3, -0.5, 0]} rotation={[0, 0, -0.3]}>
                {/* Upper arm */}
                <mesh position={[0, -0.3, 0]} castShadow>
                    <capsuleGeometry args={[0.22, 0.6, 8, 16]} />
                    {bodyMat}
                </mesh>
                {/* Hand */}
                <mesh position={[0, -0.8, 0]} castShadow>
                    <sphereGeometry args={[0.25, 16, 16]} />
                    {bodyMat}
                </mesh>
            </group>

            {/* ─── LEFT LEG ─── */}
            <mesh position={[-0.5, -2.2, 0]} castShadow>
                <capsuleGeometry args={[0.28, 0.5, 8, 16]} />
                {bodyMat}
            </mesh>

            {/* ─── RIGHT LEG ─── */}
            <mesh position={[0.5, -2.2, 0]} castShadow>
                <capsuleGeometry args={[0.28, 0.5, 8, 16]} />
                {bodyMat}
            </mesh>

            {/* ─── CHEST CIRCLE (health scanner, Baymax trademark) ─── */}
            <mesh position={[0, -0.5, 1.28]} rotation={[0.1, 0, 0]}>
                <ringGeometry args={[0.12, 0.15, 32]} />
                <meshStandardMaterial color="#4ade80" emissive="#22c55e" emissiveIntensity={hovered ? 1.5 : 0.5} side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0, -0.5, 1.27]} rotation={[0.1, 0, 0]}>
                <circleGeometry args={[0.12, 32]} />
                <meshStandardMaterial color="#22c55e" emissive="#16a34a" emissiveIntensity={hovered ? 2 : 0.8} transparent opacity={0.4} side={THREE.DoubleSide} />
            </mesh>
        </group>
    );
}
