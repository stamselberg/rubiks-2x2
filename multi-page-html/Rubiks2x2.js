import { initBuffers } from "./init-buffers.js";
import { drawScene } from "./draw-scene.js";
import { solveRubiks2x2 } from "./SolveRubiks2x2.js";

let bFreeze = false;
let xrot = 0.0;
let yrot = 0.0;
let zrot = 0.0;
let cubeRotation = 0.0;
let presentationRotation = 0;
let deltaTime = 0;
let presentCube = false;
let presentLeft = false;
let then = 0;

let highlightedCube = 0;
let highlightedCubeCorner = 0;
let CurrentSolutionText = '';



main();

let CubeCornerPieces = [1, 2, 3, 4, 5, 6, 7, 8];

window.onFlipChange = function onFlipChange(ix, ctlSelect)
{
	if (ix == 5)
	{
		return;
	}
		
	CubeCornerFlips[ix - 1] = ctlSelect.value;
	printSolution();
}

let CubeCornerFlips = [1, 1, 1, 1, 1, 1, 1, 1];

function UpdateSolution()
{
	let CubeToSolve = [];
	for (var ix = 0; ix < 8; ix++)
	{
		let CornerPiece = CubeCornerPieces[ix];
		let CornerFlip = CubeCornerFlips[ix];
		CubeToSolve.push(CornerPiece * 10 + CornerFlip);
	}
	let Solution = solveRubiks2x2(CubeToSolve);
	if (Solution != null)
	{
		CurrentSolutionText = Solution.join();
	}
	else
	{
		CurrentSolutionText = 'There is no solution - cube is not possible';
	}
		
}

//
// start here
//
function main() {
  const canvas = document.querySelector("#glcanvas");
  // Initialize the GL context
  const gl = canvas.getContext("webgl");

  const textCanvas = document.querySelector("#text");
  const ctx2d = textCanvas.getContext("2d");
  
  textCanvas.addEventListener('mousemove', function (event) {
	highlightedCube = 0;
	highlightedCubeCorner = 0;
	 if ((event.clientY > 80) && (event.clientY < 200))
	 {
	    let xpos = Math.round((15 * (event.clientX - 60))  / (1024 - (60*2)));
		if ((xpos % 2) == 1)
		{
			let cubeId = (xpos + 1) / 2;
			if (cubeId != 5)
			{
				if (event.clientY < 130)
				{
					highlightedCubeCorner = cubeId;
				}
				else
				{
					highlightedCube = cubeId;
				}
			}
		}
	 }
  });

  textCanvas.addEventListener('mousedown', function (event) {
	 if ((highlightedCube == 0) && (highlightedCubeCorner == 0))
	 {
		presentCube = true;
		presentLeft = event.clientX < 512;
		presentationRotation = 0;
	 }
	 else
	 {
		 if (highlightedCube != 0)
		 {
			 // Cycle chosen  piece of highlighted cube...
			 let idCube = CubeCornerPieces[highlightedCube - 1];
			 idCube++;
			 if (idCube > 8)
			 {
				 idCube = 1;
			 }
			 CubeCornerPieces[highlightedCube - 1] = idCube;
			 UpdateSolution();
		 }
		 else // (i.e. highlightedCubeCorner != 0
		 {
			 // Cycle chosen  piece of highlighted cube...
			 let idRotation = CubeCornerFlips[highlightedCubeCorner - 1];
			 idRotation++;
			 if (idRotation > 3)
			 {
				 idRotation = 1;
			 }
			 CubeCornerFlips[highlightedCubeCorner - 1] = idRotation;
			 UpdateSolution();
		 }
	 }
  });
  

  // Only continue if WebGL is available and working
  if (gl === null) {
    alert(
      "Unable to initialize WebGL. Your browser or machine may not support it."
    );
    return;
  }

  // Set clear color to black, fully opaque
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // Clear the color buffer with specified clear color
  gl.clear(gl.COLOR_BUFFER_BIT);
  
// Vertex shader program
const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying lowp vec4 vColor;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vColor = aVertexColor;
    }
  `;

// Fragment shader program

const fsSource = `
    varying lowp vec4 vColor;

    void main(void) {
      gl_FragColor = vColor;
    }
  `;
  
  
const shaderProgram = initShaderProgram(gl, vsSource, fsSource);


// Collect all the info needed to use the shader program.
// Look up which attributes our shader program is using
// for aVertexPosition, aVertexColor and also
// look up uniform locations.
const programInfo = {
  program: shaderProgram,
  attribLocations: {
    vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
    vertexColor: gl.getAttribLocation(shaderProgram, "aVertexColor"),
  },
  uniformLocations: {
    projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
    modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
  },
};

// Here's where we call the routine that builds all the
// objects we'll be drawing.
const buffers = initBuffers(gl);


// Draw the scene repeatedly
function render(now) {
  now *= 0.001; // convert to seconds
  deltaTime = now - then;
  then = now;
  drawScene(gl, ctx2d, programInfo, buffers, presentationRotation, presentLeft, highlightedCube, highlightedCubeCorner, CubeCornerPieces, CubeCornerFlips, CurrentSolutionText);
  if (presentCube)
  {
      presentationRotation += (deltaTime * 2.5);
	  if (presentationRotation > 2 * Math.PI)
	  {
		  presentCube = false;
		  presentationRotation = 0;
	  }
	  
  }

  requestAnimationFrame(render);
}

requestAnimationFrame(render);
}

//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert(
      `Unable to initialize the shader program: ${gl.getProgramInfoLog(
        shaderProgram
      )}`
    );
    return null;
  }

  return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(
      `An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`
    );
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}
