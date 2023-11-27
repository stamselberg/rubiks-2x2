// RubiksCube.js
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { faceColours } from './colours.js'
import RubiksCorner from './RubiksCorner.js'

function RubiksCube({ colours, position, border, cubeRotation, cubeId }) {
  const rubiksCubeRef = useRef();

  // Use react-three-fiber's useFrame to rotate the group
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

  // TODO: Not right to have colours here like this... as we'll allow user to alter this...
  // NOTE: The normal corner definitions from other files in the rubiks project (11,12,13,21,22,23, etc...) 
  // don't match the order below due to how the rendering has been done. E.g. YBO is actually YOB (going anti-clockwise around the corner).
  // The difference will be whether the corner is "read" clockwise or anti-clockwise later on.
  const cornerData = [
    { id: 1, colours: [faceColours.y, faceColours.b, faceColours.r], position: [-scale, scale, -scale] },
    { id: 2, colours: [faceColours.y, faceColours.b, faceColours.o], position: [scale, scale, -scale] },
    { id: 3, colours: [faceColours.y, faceColours.g, faceColours.r], position: [-scale, scale, scale] },
    { id: 4, colours: [faceColours.y, faceColours.g, faceColours.o], position: [scale, scale, scale] },
    { id: 5, colours: [faceColours.w, faceColours.b, faceColours.r], position: [-scale, -scale, -scale] },
    { id: 6, colours: [faceColours.w, faceColours.b, faceColours.o], position: [scale, -scale, -scale] },
    { id: 7, colours: [faceColours.w, faceColours.g, faceColours.r], position: [-scale, -scale, scale] },
    { id: 8, colours: [faceColours.w, faceColours.g, faceColours.o], position: [scale, -scale, scale] }
  ];

  return (
    <group ref={rubiksCubeRef} position={position}>
      {cornerData.map((cornerData) => (
        <RubiksCorner key={cornerData.id} cubeId={cubeId} cornerId={cornerData.id} colours={cornerData.colours} position={cornerData.position} border={border} />
      ))}
    </group>
  );
}


export default RubiksCube;