// CubeSolutionInfo.js
import React from 'react';
import { Html } from '@react-three/drei';
import { useCubeContext } from './CubeContext';
import { cubeCorners } from './cubedata.js'
import { solveRubiks2x2 } from './SolveRubiks2x2.js'

// This is where the solution will go. This class needs to analyse
// the 24 faces, mapping each three to a cube corner (if one exists)
// If all 8 are mapped (and all 8 are used) the solver should activate
// and output the solution
// The HTML needs some work (should not use absolute positioning, should possibly use CSS, or use 3D objects instead)
function CubeSolutionInfo() {
  const { cubeColours } = useCubeContext();

  // Based on current colours, determine which corner (if any) and rotation in the
  // cube solving model this object represents.
  // The solving model corners are defined in the cubeCorners array, where
  // Index (one based) = CornerID's first digit, Colours are the default rotation (1)
  // And the next two are the clockwise (2), anticlockwise (3) rotation from there.
  // E.g. the second item in cubeCorners is yob, and therefore
  // 21 = YOB, 22 = OBY, 23 = BYO (colours defined going anti-clockwise starting at the top)
  // Consequently, if this corner has the three colours OBY, it would be ID 22
  const lidModelCorners = Array.from({ length: 8 }, (_, ixPhysicalCorner) => {
    const ixColor = ixPhysicalCorner * 3;

    const coloursForPos1 = cubeColours[ixColor] + cubeColours[ixColor + 1] + cubeColours[ixColor + 2];
    const coloursForPos2 = cubeColours[ixColor + 2] + cubeColours[ixColor] + cubeColours[ixColor + 1];
    const coloursForPos3 = cubeColours[ixColor + 1] + cubeColours[ixColor + 2] + cubeColours[ixColor + 0];

    let idModelCorner = 0;
    const ixMatchPos1 = cubeCorners.indexOf(coloursForPos1);
    const ixMatchPos2 = cubeCorners.indexOf(coloursForPos2);
    const ixMatchPos3 = cubeCorners.indexOf(coloursForPos3);
    if (ixMatchPos1 !== -1) {
      idModelCorner = (10 * (ixMatchPos1 + 1)) + 1;
    }
    else if (ixMatchPos2 !== -1) {
      idModelCorner = (10 * (ixMatchPos2 + 1)) + 2;
    }
    if (ixMatchPos3 !== -1) {
      idModelCorner = (10 * (ixMatchPos3 + 1)) + 3;
    }
    return idModelCorner;

  });

  const bAllCornersValid = !lidModelCorners.includes(0);

  //const cornerInfo = lidModelCorners.join(' ');
  let solution = 'No cube exists that looks like this';

  if (bAllCornersValid) {
    const lBestPath = solveRubiks2x2(lidModelCorners);
    if (lBestPath) {
      solution = 'Solution: ' + lBestPath.join(' ');
    }
  }

  return (
    <Html>
      <div
        style={{
          position: 'absolute',
          top: '100px',
          left: '-400px',
          color: 'white',
          zIndex: '1',
        }}
      >
        {solution}
      </div>
    </Html>
  );
}




export default CubeSolutionInfo;