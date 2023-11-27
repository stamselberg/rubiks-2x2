// src/components/ThreeDScene.js
import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import RubiksCube from './RubiksCube.js'
import * as THREE from 'three';

function ThreeDScene() {

  return (
    <Canvas
	  style={{ backgroundColor: 'black', width: '100vw', height: '100vh' }}
      camera={{ position: [0, 0, 10], near: 0.1, far: 1000, fov: 45 }}
	>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <RubiksCube cubeId="LeftStillView" border="0.02" position={[-5, 1, -12]} cubeRotation={["fixed", Math.PI / 4, Math.PI / 4]} />
      <RubiksCube cubeId="Rotating"  border="0.02" position={[ 0, 1, -6]} cubeRotation={["dynamic", 0.001, 0.005]}  />
      <RubiksCube cubeId="RightStillView" border="0.02" position={[ 5, 1, -12]} cubeRotation={["fixed", 5 * Math.PI / 4, Math.PI / 4]}  />
    </Canvas>
  );
}

export default ThreeDScene;
