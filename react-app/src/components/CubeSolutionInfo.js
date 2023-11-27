// CubeSolutionInfo.js
import React from 'react';
import { Html } from '@react-three/drei';
import { useCubeContext } from './CubeContext';

// This is where the solution will go. This class needs to analyse
// the 24 faces, mapping each three to a cube corner (if one exists)
// If all 8 are mapped (and all 8 are used) the solver should activate
// and output the solution
// The HTML needs some work (should not use absolute positioning, should possibly use CSS, or use 3D objects instead)
function CubeSolutionInfo() {
  const { cubeColours } = useCubeContext();

  const colourInfo = cubeColours?.join(',');

  return (
    <Html>
      <div
        style={{
          position: 'absolute',
          top: '100px',
          left: '-100px',
          color: 'white',
          zIndex: '1',
        }}
      >
        {colourInfo}
      </div>
    </Html>
  );
}

export default CubeSolutionInfo;