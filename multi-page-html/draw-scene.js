function drawScene(gl, ctx2d, programInfo, buffers, presentationRotation, presentLeft, highlightedCube, highlightedCubeCorner, lCorners, lFlips, CurrentSolutionText) {

  ctx2d.clearRect(0, 0, ctx2d.canvas.width, ctx2d.canvas.height);
  ctx2d.font = "bold 24px verdana, sans-serif ";
  const CornerPieceTexts = [['Y','B','R'], ['Y','O','B'], ['Y','R','G'], ['Y','G','O'], ['W','R','B'], ['W','B','O'], ['W','G','R'], ['W','O','G']];
  for (let ixCube = 1; ixCube <= 8; ixCube++)
  {
	  ctx2d.fillStyle = highlightedCubeCorner == ixCube ? "#ffeedd" : "#887766";
	  let idRotation = lFlips[ixCube - 1];
	  let ix1 = idRotation == 1 ? 0 : idRotation == 2 ? 1 : 2;
	  let ix2 = idRotation == 1 ? 1 : idRotation == 2 ? 2 : 0;
	  let ix3 = idRotation == 1 ? 2 : idRotation == 2 ? 0 : 1;
	  let idCornerCube = lCorners[ixCube - 1];
	  let lCornerTexts = CornerPieceTexts[idCornerCube - 1];
	  let Text1 = lCornerTexts[ix1];
	  let Text2 = lCornerTexts[ix2];
	  let Text3 = lCornerTexts[ix3];
	  let strText = "" + Text1 + Text2 + Text3;
	  let xTextPos = ((-1 + ixCube * 2) * (1024 - (60 * 2)) / 15);
      ctx2d.fillText(strText, xTextPos, 100);
  }
  
  ctx2d.fillStyle = "#ffeedd";
  ctx2d.fillText(CurrentSolutionText, 50, 750);
	
	
  gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
  gl.clearDepth(1.0); // Clear everything
  gl.enable(gl.DEPTH_TEST); // Enable depth testing
  gl.depthFunc(gl.LEQUAL); // Near things obscure far things

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.

  const fieldOfView = (45 * Math.PI) / 180; // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  const modelViewMatrix = mat4.create();

  // Now move the drawing position a bit to where we want to
  // start drawing the square.
  mat4.translate(
    modelViewMatrix, // destination matrix
    modelViewMatrix, // matrix to translate
    [-0.0, -0.5, -6.0]
  ); // amount to translate

  mat4.rotate(
    modelViewMatrix, // destination matrix
    modelViewMatrix, // matrix to rotate
    presentationRotation, // amount to rotate in radians
    presentLeft ? [1, 1, 1] : [-1, -1, 1]
  ); // axis to rotate around (diagonal from origo to a corner on left/right side)

  mat4.rotate(
    modelViewMatrix, // destination matrix
    modelViewMatrix, // matrix to rotate
    Math.PI, // amount to rotate in radians
    [0, 1, 0]
  ); // axis to rotate around (diagonal from origo to a corner on left/right side)


  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute.
  setPositionAttribute(gl, buffers, programInfo);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

  // Tell WebGL to use our program when drawing
  gl.useProgram(programInfo.program);

  // Set the shader uniforms
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix
  );
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix
  );

  for (let ixCorner = 1; ixCorner <= 8; ixCorner++)
  {
      drawCorner(gl, buffers, programInfo, lCorners[ixCorner - 1], lFlips[ixCorner - 1], ixCorner, modelViewMatrix);
  }

  for (let ixCornerPiece = 1; ixCornerPiece <= 8; ixCornerPiece++)
  {
      drawCornerPiece(gl, buffers, programInfo, ixCornerPiece, lCorners[ixCornerPiece - 1], lFlips[ixCornerPiece - 1],  presentationRotation, presentLeft, highlightedCube);
  }

}

// idCorner = One of 1,8
// idCornerRotation = One of 1,2,3
// ixCorner = One of 1,8 based on the 8 positions of the Rubiks
function drawCorner(gl, buffers, programInfo, idCorner, idCornerRotation, ixCorner, modelViewMatrix)
{
  setColorAttribute(gl, buffers, programInfo, idCorner - 1);
  const destMatrix = mat4.create();

  // Then use x rotation (in GL, first is last...)
  let x = (ixCorner > 4) ? 2 : 0; // Flip to bottom if position is bottom half
  mat4.rotate(
    destMatrix, // destination matrix
    modelViewMatrix, // matrix to rotate
    x * 0.5 * Math.PI, // amount to rotate in radians
    [1, 0, 0] // axis to rotate around (X)
  );

  // First use y rotation (in GL, first is last...
  let y = ((ixCorner == 2) | (ixCorner == 8)) ? 1 : ((ixCorner == 3) || (ixCorner == 5)) ? -1 : ((ixCorner == 4) || (ixCorner == 6)) ? 2 : 0;
  mat4.rotate(
   destMatrix, // destination matrix
   destMatrix, // matrix to rotate
   -Math.PI * 0.5 * y, // amount to rotate in radians
   [0, 1, 0]  // axis to rotate around (Y)
  ); 

  // Flip corners if required
  let flip = (idCornerRotation == 2) ? -1 : (idCornerRotation == 3) ? 1 : 0;
  mat4.rotate(
   destMatrix, // destination matrix
   destMatrix, // matrix to rotate
   Math.PI * 2 / 3 * flip , // amount to rotate in radians
   [1, 1, 1]  // axis to rotate around (origo to top corner)
  ); 

  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    destMatrix
  );

  const vertexCount = 3 * 2 * 3; // Number of squares x 2 triangles/square x 3 vertices/triangle
  const type = gl.UNSIGNED_SHORT;
  const offset = 0;
  gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
}

// ixCornerPiece = One of 1,8 - drawing the piece on the big cube.
// idSelectedPiece = Id of selected corner piece (1/8)
// ixCorner = One of 1,8 based on the 8 positions of the Rubiks
function drawCornerPiece(gl, buffers, programInfo, ixCornerPiece, idSelectedPiece, idSelectedRotation, presentationRotation, presentLeft, highlightedCube)
{
  const modelViewMatrix = mat4.create();

  // Now move the drawing position a bit to where we want to
  // start drawing the square.
  mat4.translate(
    modelViewMatrix, // destination matrix
    modelViewMatrix, // matrix to translate
    [(ixCornerPiece - 4.5) * 5, 10, -40.0]
  ); // amount to translate

  mat4.rotate(
    modelViewMatrix, // destination matrix
    modelViewMatrix, // matrix to rotate
    presentationRotation, // amount to rotate in radians
    presentLeft ? [1, 1, 1] : [-1, -1, 1]
  ); // axis to rotate around (diagonal from origo to a corner)

  mat4.rotate(
    modelViewMatrix, // destination matrix
    modelViewMatrix, // matrix to rotate
    Math.PI, // amount to rotate in radians
    [0, 1, 0]
  ); // axis to rotate around (diagonal from origo to a corner on left/right side)
	
  for (let ix = 1; ix <= 8; ix++)
  {
	  drawCornerPieceFace(gl, buffers, programInfo, ixCornerPiece, idSelectedPiece, ix, idSelectedRotation, highlightedCube, modelViewMatrix);
  }
}


// idCorner = One of 1,8
// idCornerRotation = One of 1,2,3
// ixCorner = One of 1,8 based on the 8 positions of the Rubiks
function drawCornerPieceFace(gl, buffers, programInfo, ixCornerPiece, idSelectedPiece, ixCubePosition, idCornerRotation, highlightedCube, modelViewMatrix)
{
  //setColorAttribute(gl, buffers, programInfo, ixCornerPiece);
  setColorAttribute(gl, buffers, programInfo, ixCornerPiece == ixCubePosition ? idSelectedPiece - 1: (ixCornerPiece == highlightedCube) ? 9 : 8);
  const destMatrix = mat4.create();

  // Then use x rotation (in GL, first is last...)
  let x = (ixCubePosition > 4) ? 2 : 0; // Flip to bottom if position is bottom half
  mat4.rotate(
    destMatrix, // destination matrix
    modelViewMatrix, // matrix to rotate
    x * 0.5 * Math.PI, // amount to rotate in radians
    [1, 0, 0] // axis to rotate around (X)
  );

  // First use y rotation (in GL, first is last...
  let y = ((ixCubePosition == 2) | (ixCubePosition == 8)) ? 1 : ((ixCubePosition == 3) || (ixCubePosition == 5)) ? -1 : ((ixCubePosition == 4) || (ixCubePosition == 6)) ? 2 : 0;
  mat4.rotate(
   destMatrix, // destination matrix
   destMatrix, // matrix to rotate
   -Math.PI * 0.5 * y, // amount to rotate in radians
   [0, 1, 0]  // axis to rotate around (Y)
  ); 

  // Flip corners if required
  let flip = (idCornerRotation == 2) ? -1 : (idCornerRotation == 3) ? 1 : 0;
  mat4.rotate(
   destMatrix, // destination matrix
   destMatrix, // matrix to rotate
   Math.PI * 2 / 3 * flip , // amount to rotate in radians
   [1, 1, 1]  // axis to rotate around (origo to top corner)
  ); 

  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    destMatrix
  );

  const vertexCount = 3 * 2 * 3; // Number of squares x 2 triangles/square x 3 vertices/triangle
  const type = gl.UNSIGNED_SHORT;
  const offset = 0;
  gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
}





// Tell WebGL how to pull out the positions from the position
// buffer into the vertexPosition attribute.
function setPositionAttribute(gl, buffers, programInfo) {
  const numComponents = 3; // pull out 2 values per iteration
  const type = gl.FLOAT; // the data in the buffer is 32bit floats
  const normalize = false; // don't normalize
  const stride = 0; // how many bytes to get from one set of values to the next
  // 0 = use type and numComponents above
  const offset = 0; // how many bytes inside the buffer to start from
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
  gl.vertexAttribPointer(
    programInfo.attribLocations.vertexPosition,
    numComponents,
    type,
    normalize,
    stride,
    offset
  );
  gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
}

// Tell WebGL how to pull out the colors from the color buffer
// into the vertexColor attribute.
function setColorAttribute(gl, buffers, programInfo, ixCube) {
  const numComponents = 4;
  const type = gl.FLOAT;
  const normalize = false;
  const stride = 0;
  const offset = ixCube * 3 * 4 * 4 * 4; // 3 faces per cube, 4 vertices per face, 4 bytes in a float
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
  gl.vertexAttribPointer(
    programInfo.attribLocations.vertexColor,
    numComponents,
    type,
    normalize,
    stride,
    offset
  );
  gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
}

export { drawScene };