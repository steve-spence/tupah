"use client";

import { useRef } from "react";
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

    useFrame(() => {
        camera.position.lerp(new THREE.Vector3(...targetPosition), speed);

        currentLookAt.current.lerp(new THREE.Vector3(...targetLookAt), speed);
        camera.lookAt(currentLookAt.current);
    });

    return null;
}
