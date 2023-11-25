function initBuffers(gl) {
  vertices = vertices;
  positionBuffer = initPositionBuffer(gl);
  const colorBuffer = initColorBuffer(gl);
const indexBuffer = initIndexBuffer(gl);

return {
  vertices: vertices,
  position: positionBuffer,
  color: colorBuffer,
  indices: indexBuffer,
};

}

let vertices = null;
let positionBuffer = null;

function initPositionBuffer(gl) {
  // Create a buffer for the 8 cube's positions.
  positionBuffer = gl.createBuffer();

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

const gap = 0.07;
const sidelength = (2 - 3*gap) / 2;
const pA = -1.0;
const pB = pA + gap;
const pC = pB + sidelength;
const pD = pC + gap;
const pE = pD + sidelength;
const pF = pE + gap;


vertices = [
  // Top face
  pD, pF, pD, pE, pF, pD, pE, pF, pE, pD, pF, pE,

  // Front face
  pD, pD, pF, pE, pD, pF, pE, pE, pF, pD, pE, pF,

  // Right face
  pF, pD, pD, pF, pE, pD, pF, pE, pE, pF, pD, pE
                                      
];

  // Now pass the list of vertices into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

  return positionBuffer;
}

function initColorBuffer(gl) {
	
const faceColors = {
  r : [0.9, 0.2, 0.2, 0.7], // Front face: red
  o : [0.9, 0.5, 0.2, 0.7], // Back face: orange
  w : [0.9, 0.9, 0.9, 0.7], // Top face: white
  y : [0.9, 0.9, 0.2, 0.7], // Bottom face: yellow
  b : [0.2, 0.2, 0.9, 0.7], // Right face: blue
  g : [0.2, 0.9, 0.2, 0.7], // Left face: green
  u : [1.0, 1.0, 1.0, 0.1],  // Unselected face: grey
  h : [1.0, 1.0, 1.0, 0.4]  // Highlighted face: grey
};

const cubeCornerColours = [
  faceColors.y, faceColors.b, faceColors.r,
  faceColors.y, faceColors.o, faceColors.b,
  faceColors.y, faceColors.r, faceColors.g,
  faceColors.y, faceColors.g, faceColors.o,
  faceColors.w, faceColors.r, faceColors.b,
  faceColors.w, faceColors.b, faceColors.o,
  faceColors.w, faceColors.g, faceColors.r,
  faceColors.w, faceColors.o, faceColors.g,
  faceColors.u, faceColors.u, faceColors.u,
  faceColors.h, faceColors.h, faceColors.h
];
  
// Convert the array of colors into a table for all the vertices.
var colors = [];
for (var j = 0; j < cubeCornerColours.length; ++j) {
  const c = cubeCornerColours[j];
  // Repeat each color four times for the four vertices of the face
  colors = colors.concat(c, c, c, c);
}

 const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  return colorBuffer;

}

function initIndexBuffer(gl) {
  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  // This array defines each face as two triangles, using the
  // indices into the vertex array to specify each triangle's
  // position.

  const indices = [
    0 + 0,
    0 + 1,
    0 + 2,
    0 + 0,
    0 + 2,
    0 + 3,

    4 + 0,
    4 + 1,
    4 + 2,
    4 + 0,
    4 + 2,
    4 + 3,

    8 + 0,
    8 + 1,
    8 + 2,
    8 + 0,
    8 + 2,
    8 + 3
  ];

  // Now send the element array to GL

  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indices),
    gl.STATIC_DRAW
  );

  return indexBuffer;
}


export { initBuffers };