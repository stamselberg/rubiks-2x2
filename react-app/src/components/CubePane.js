// CubePane.js
import React from 'react';
import { useFrame } from '@react-three/fiber';

const CubePane = ({ vertices, colour, position }) => {
  return (
<mesh position={position}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attachObject={['attributes', 'position']}
          array={vertices}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={['index']}
          array={[0, 1, 2, 0, 2, 3]}
        />
      </bufferGeometry>
      <meshBasicMaterial attach="material" color={colour} />
    </mesh>  );
};

export default CubePane;
