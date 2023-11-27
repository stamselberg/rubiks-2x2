// RubiksCorner.js
import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { faceColours, toggleColour } from './colours.js'
import { useCubeContext } from './CubeContext.js';

function RubiksCorner({ cubeId, cornerId, scale, border }) {
	const rubiksCornerRef = useRef();

	const { cubeColours, setCubeColours } = useCubeContext();

  // Clockwise indicates whether for data-modelling reasons (that could be addressed...), the faces are defined
  // Clockwise or Anticlockwise. Anticlockwise = TLR, Clockwise = TRL
  const cornerData = {
    1: { position: [-scale,  scale, -scale], clockwise : false },
    2: { position: [ scale,  scale, -scale], clockwise :  true },
    3: { position: [-scale,  scale,  scale], clockwise :  true },
    4: { position: [ scale,  scale,  scale], clockwise : false },
    5: { position: [-scale, -scale, -scale], clockwise :  true },
    6: { position: [ scale, -scale, -scale], clockwise : false },
    7: { position: [-scale, -scale,  scale], clockwise : false },
    8: { position: [ scale, -scale,  scale], clockwise :  true }
  };

	// Data using knowledge about how the cube was built, used to determine if a click is for a face we care about.
	// (as click events will be received for both front and back faces.
	// Could be done better. The info here needs standardising.
	// Also - the numbers 10,11,12 don't correspond to the number 11,12,13 in Rubiks notation used elsewhere.
	// The first digit is correct (the corner in question), but the second one is the face (not the rotation of the corner)
	// It will be an interesting challenge to map - as we have known corners on the cube (e.g. YRB)
	// So if a corner is defined by user (colouring in the cube) to have YRB it might depend on which corner
	// is chosen what rotation the corner has.
	// Furthermore, there MIGHT actually be a problem with the mapping. There are 8 positions and 8 corner pieces.
	// Care needs to be taken to not confuse the two (might have been done above, revise as needed...)
	// TODO: Remove this lengthy comment and live with the array.
	// Or if deemed better: Define for each corner data which faces belong in Left/Right cube...
	const LeftStillViewClickableFaces = new Map([
		[10, { name: 'TOP-LEFT-BACK:      Top face    (Top)' }],
		[12, { name: 'TOP-LEFT-BACK:      Left face   (Side)' }],
		[20, { name: 'TOP-RIGHT-BACK:     Top face    (Top)' }],
		[30, { name: 'TOP-LEFT-FRONT:     Top face    (Top)' }],
		[32, { name: 'TOP-LEFT-FRONT:     Left face   (Side)' }],
		[31, { name: 'TOP-LEFT-FRONT:     Front face  (Front)' }],
		[40, { name: 'TOP-RIGHT-FRONT:    Top face    (Top)' }],
		[41, { name: 'TOP-RIGHT-FRONT:    Front face  (Front)' }],
		[52, { name: 'BOTTOM-LEFT-BACK:   Left face   (Side)' }],
		[72, { name: 'BOTTOM-LEFT-FRONT:  Left face   (Side)' }],
		[71, { name: 'BOTTOM-LEFT-FRONT:  Front face  (Front)' }],
		[81, { name: 'BOTTOM-RIGHT-FRONT: Front face  (Front)' }]
	]);

	const RightStillViewClickableFaces = new Map([
		[50, { name: 'BOTTOM-LEFT-BACK:   Bottom face (Top)' }],
		[51, { name: 'BOTTOM-LEFT-BACK:   Back face   (Front)' }],
		[70, { name: 'BOTTOM-LEFT-FRONT:  Bottom face (Top)' }],
		[60, { name: 'BOTTOM-LEFT-BACK:   Bottom face (Top)' }],
		[61, { name: 'BOTTOM-LEFT-BACK:   Back face   (Front)' }],
		[62, { name: 'BOTTOM-LEFT-BACK:   Right face  (Side)' }],
		[80, { name: 'BOTTOM-RIGHT-FRONT: Bottom face (Top)' }],
		[82, { name: 'BOTTOM-RIGHT-FRONT: Right face  (Side)' }],
		[11, { name: 'TOP-LEFT-BACK:      Back face   (Front)' }],
		[21, { name: 'TOP-RIGHT-BACK:     Back face   (Front)' }],
		[22, { name: 'TOP-RIGHT-BACK:     Right face  (Side)' }],
		[42, { name: 'TOP-RIGHT-FRONT:    Right face  (Side)' }]
	]);

	const thisCornerData = cornerData[cornerId];

	const handleClickTop = (event) => { handleClick(event, 0) }
	const handleClickFront = (event) => { handleClick(event, 1) }
	const handleClickSide = (event) => { handleClick(event, 2) }
	const handleClick = (event, ix) => {
		//console.log('Click: cubeId: ', cubeId, 'Corner: ', cornerId, ' face (todo: depends...): ', ix, 'point:', event.point);
		const LookUpMap = cubeId == 'LeftStillView' ? LeftStillViewClickableFaces : cubeId == 'RightStillView' ? RightStillViewClickableFaces : null;
		if (LookUpMap) {
			const lookupPoint = cornerId * 10 + ix;
			const lookedUp = LookUpMap.get(lookupPoint);
			if (lookedUp) {
				//console.log('Accepted: ', lookedUp, lookedUp.name);
				// Toggle the colour corresponding to the clicked face

				if (thisCornerData.clockwise && (ix > 0))
				{
					ix = (ix == 1) ? 2 : 1;
				}
				const newCubeColours = [...cubeColours];

				const ixColour = ((cornerId - 1) * 3) + ix;
				const oldColour = newCubeColours[ixColour];
				const newColour = toggleColour(oldColour);
				//console.log('For ', cubeId, '[',cornerId,'].',ix,' changing from ', oldColour, ' to ', newColour);
				newCubeColours[ixColour] = newColour;
				setCubeColours(newCubeColours);
			}
		}
	}

	let size = 1 - 2 * border;

  const getFaceColour = (ixFace) =>
  {
	// Handle the clockwise/anticlockwise peculiarity in the data model...
	// Map 0=>0 1=>2 and 2=>1
	if (thisCornerData.clockwise && (ixFace > 0))
	{
		ixFace = (ixFace == 1) ? 2 : 1;
	}
	// Map Corner 1 to ix 012/021 - Corner 2 to 345/354, etc....
	const ixColour = ((cornerId - 1) * 3) + ixFace;
    const chColour = cubeColours[ixColour];
	const argbColour = faceColours[chColour];
	return argbColour;
  }


	return (
		<group ref={rubiksCornerRef} position={thisCornerData.position}>
			{/* Top face */}
			<mesh position={[0, thisCornerData.position[1], 0]} rotation={[Math.PI / 2, 0, 0]} onClick={handleClickTop}>
				<planeGeometry args={[size, size]} />
				<meshBasicMaterial color={getFaceColour(0)} transparent={true} opacity="0.94" side={THREE.DoubleSide} />
			</mesh>

			{/* Front face */}
			<mesh position={[0, 0, thisCornerData.position[2]]} onClick={handleClickFront}>
				<planeGeometry args={[size, size]} />
				<meshBasicMaterial color={getFaceColour(1)} transparent={true} opacity="0.94" side={THREE.DoubleSide} />
			</mesh>

			{/* Right face */}
			<mesh position={[thisCornerData.position[0], 0, 0]} rotation={[0, Math.PI / 2, 0]} onClick={handleClickSide}>
				<planeGeometry args={[size, size]} />
				<meshBasicMaterial color={getFaceColour(2)} transparent={true} opacity="0.94" side={THREE.DoubleSide} />
			</mesh>

		</group>
	);

}

export default RubiksCorner;