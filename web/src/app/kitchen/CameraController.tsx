"use client";

import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CameraControllerProps {
    targetPosition: [number, number, number];
    targetLookAt: [number, number, number];
    speed?: number;
}

export function CameraController({
    targetPosition,
    targetLookAt,
    speed = 0.05
}: CameraControllerProps) {
    const { camera } = useThree();
    const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
    const targetPosRef = useRef(new THREE.Vector3(...targetPosition));
    const targetLookAtRef = useRef(new THREE.Vector3(...targetLookAt));

    // Update refs when props change to avoid stale closures
    useEffect(() => {
        targetPosRef.current.set(...targetPosition);
        targetLookAtRef.current.set(...targetLookAt);
    }, [targetPosition, targetLookAt]);

    useFrame(() => {
        camera.position.lerp(targetPosRef.current, speed);
        currentLookAt.current.lerp(targetLookAtRef.current, speed);
        camera.lookAt(currentLookAt.current);
    });

    return null;
}
