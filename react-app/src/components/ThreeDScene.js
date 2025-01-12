// src/components/ThreeDScene.js
import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { CubeProvider } from './CubeContext.js';
import CubeSolutionInfo from './CubeSolutionInfo.js';
import RubiksCube from './RubiksCube.js'

function ThreeDScene() {

  return (
    <Canvas
	  style={{ backgroundColor: 'black', width: '100vw', height: '100vh' }}
      camera={{ position: [0, 0, 10], near: 0.1, far: 1000, fov: 45 }}
	>
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} />
      <CubeProvider>
        <RubiksCube cubeId="LeftStillView" border="0.02" position={[-5, 3, -12]} cubeRotation={["fixed", Math.PI / 4, Math.PI / 4]} />
        <RubiksCube cubeId="Rotating"  border="0.02" position={[ 0, 3, -6]} cubeRotation={["dynamic", 0.0101, 0.0161]}  />
        <RubiksCube cubeId="RightStillView" border="0.02" position={[ 5, 3, -12]} cubeRotation={["fixed", 5 * Math.PI / 4, Math.PI / 4]}  />
        <RubiksCube cubeId="SolutionStart"  border="0.02" position={[ 0, -1, -6]} cubeRotation={["fixed", Math.PI / 16, Math.PI / 16]}  />
        <CubeSolutionInfo position={[-2.5, -1]} />
      </CubeProvider>
    </Canvas>
  );
}

export default ThreeDScene;
