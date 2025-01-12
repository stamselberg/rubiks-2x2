// RubiksCube.js
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import RubiksCorner from './RubiksCorner.js'

function RubiksCube({ position, border, cubeRotation, cubeId }) {
  const rubiksCubeRef = useRef();

  useFrame(() => {
    if (cubeRotation[0] == "dynamic") {
      rubiksCubeRef.current.rotation.x += cubeRotation[1];
      rubiksCubeRef.current.rotation.y += cubeRotation[2];
    }
    else {
      rubiksCubeRef.current.rotation.x = cubeRotation[1];
      rubiksCubeRef.current.rotation.y = cubeRotation[2];
    }
  });

  const scale = 0.5;

  return (
    <group ref={rubiksCubeRef} position={position}>
      {Array.from({length:8}, (_, ix) => (
        <RubiksCorner key={ix} cubeId={cubeId} cornerId={ix + 1} border={border} scale={scale} />
      ))}
    </group>
  );
}

export default RubiksCube;
